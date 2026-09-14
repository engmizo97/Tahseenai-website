import shutil
from PIL import Image, ImageDraw

# 1. Ensure tab logo and brand mark are the exact, unaltered file
source_logo = 'C:/Users/sakju/Downloads/logo (3).png'
shutil.copyfile(source_logo, 'C:/Users/sakju/tahseen-ai/src/app/icon.png')
shutil.copyfile(source_logo, 'C:/Users/sakju/tahseen-ai/public/icon.png')
shutil.copyfile(source_logo, 'C:/Users/sakju/tahseen-ai/public/brand-mark.png')
shutil.copyfile(source_logo, 'C:/Users/sakju/tahseen-ai/public/favicon.png')
print("Direct unaltered copies saved to icon.png, brand-mark.png, favicon.png")

# 2. Use unaltered logo (3).png as the brand mark in the composite master logo
emblem = Image.open(source_logo).convert('RGBA')

# Target height for master logo emblem
target_emblem_h = 100
scale_e = target_emblem_h / emblem.height
emblem_scaled = emblem.resize((int(emblem.width * scale_e), target_emblem_h), Image.Resampling.LANCZOS)

LH = 30
ST = 4 # stroke width

def create_glyph(w, h):
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)

def build_master_logo(is_light=False):
    text_color = (15, 23, 42, 255) if is_light else (255, 255, 255, 255)
    slogan_color = (71, 85, 105, 255) if is_light else (203, 213, 225, 255)
    teal_color = (0, 134, 136, 255) # Brand Teal #008688
    divider_color = (15, 23, 42, 100) if is_light else (255, 255, 255, 140)

    # T (Upright)
    img_T, d = create_glyph(20, LH)
    d.line([(0, 2), (20, 2)], fill=text_color, width=ST)
    d.line([(10, 2), (10, LH - 2)], fill=text_color, width=ST)

    # A (Upright futuristic / \)
    img_A, d = create_glyph(22, LH)
    d.line([(2, LH - 2), (11, 2), (20, LH - 2)], fill=text_color, width=ST, joint='miter')

    # H (Upright)
    img_H, d = create_glyph(20, LH)
    d.line([(2, 2), (2, LH - 2)], fill=text_color, width=ST)
    d.line([(18, 2), (18, LH - 2)], fill=text_color, width=ST)
    d.line([(2, LH // 2), (18, LH // 2)], fill=text_color, width=ST)

    # S (Upright clean geometric)
    img_S, d = create_glyph(20, LH)
    d.line([(18, 4), (6, 4)], fill=text_color, width=ST)
    d.line([(3, 4), (3, LH // 2 - 1)], fill=text_color, width=ST)
    d.line([(3, LH // 2 - 1), (17, LH // 2 + 1)], fill=text_color, width=ST)
    d.line([(17, LH // 2 + 1), (17, LH - 4)], fill=text_color, width=ST)
    d.line([(17, LH - 4), (3, LH - 4)], fill=text_color, width=ST)

    # E (Three parallel horizontal bars)
    img_E, d = create_glyph(20, LH)
    d.line([(2, 3), (18, 3)], fill=text_color, width=ST)
    d.line([(2, LH // 2), (16, LH // 2)], fill=text_color, width=ST)
    d.line([(2, LH - 3), (18, LH - 3)], fill=text_color, width=ST)

    # N (Upright)
    img_N, d = create_glyph(22, LH)
    d.line([(2, 2), (2, LH - 2)], fill=text_color, width=ST)
    d.line([(2, 2), (20, LH - 2)], fill=text_color, width=ST)
    d.line([(20, 2), (20, LH - 2)], fill=text_color, width=ST)

    # I (Upright)
    img_I, d = create_glyph(6, LH)
    d.line([(3, 2), (3, LH - 2)], fill=text_color, width=ST)

    # < (Teal chevron #008688)
    img_BO, d = create_glyph(14, LH)
    d.line([(11, 4), (3, LH // 2), (11, LH - 4)], fill=teal_color, width=ST, joint='miter')

    # > (Teal chevron #008688)
    img_BC, d = create_glyph(14, LH)
    d.line([(3, 4), (11, LH // 2), (3, LH - 4)], fill=teal_color, width=ST, joint='miter')

    letter_gap = 10
    word_gap = 18

    glyphs = [
        img_T, img_A, img_H, img_S, img_E, img_E, img_N,
        'WORD_GAP',
        img_BO, img_A, img_I, img_BC
    ]

    total_top_w = 0
    for g in glyphs:
        if g == 'WORD_GAP':
            total_top_w += word_gap
        else:
            total_top_w += g.width + letter_gap

    top_line = Image.new('RGBA', (total_top_w, LH), (0, 0, 0, 0))
    cx = 0
    for g in glyphs:
        if g == 'WORD_GAP':
            cx += word_gap
        else:
            top_line.paste(g, (cx, 0), g)
            cx += g.width + letter_gap

    # Slogan: ENHANCE YOUR WORK
    SH = 10
    SST = 2

    def create_slogan_glyph(w, h):
        img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        return img, ImageDraw.Draw(img)

    s_E, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (7, 1)], fill=slogan_color, width=SST)
    d.line([(1, 5), (6, 5)], fill=slogan_color, width=SST)
    d.line([(1, 9), (7, 9)], fill=slogan_color, width=SST)

    s_N, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (1, 9)], fill=slogan_color, width=SST)
    d.line([(1, 1), (7, 9)], fill=slogan_color, width=SST)
    d.line([(7, 1), (7, 9)], fill=slogan_color, width=SST)

    s_H, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (1, 9)], fill=slogan_color, width=SST)
    d.line([(7, 1), (7, 9)], fill=slogan_color, width=SST)
    d.line([(1, 5), (7, 5)], fill=slogan_color, width=SST)

    # A (Upright futuristic / \ with NO crossbar - matching TAHSEEN A)
    s_A, d = create_slogan_glyph(8, SH)
    d.line([(1, 9), (4, 1), (7, 9)], fill=slogan_color, width=SST, joint='miter')

    s_C, d = create_slogan_glyph(8, SH)
    d.line([(7, 1), (2, 1), (2, 9), (7, 9)], fill=slogan_color, width=SST)

    s_Y, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (4, 5)], fill=slogan_color, width=SST)
    d.line([(7, 1), (4, 5)], fill=slogan_color, width=SST)
    d.line([(4, 5), (4, 9)], fill=slogan_color, width=SST)

    s_O, d = create_slogan_glyph(8, SH)
    d.line([(2, 1), (6, 1)], fill=slogan_color, width=SST)
    d.line([(1, 2), (1, 8)], fill=slogan_color, width=SST)
    d.line([(7, 2), (7, 8)], fill=slogan_color, width=SST)
    d.line([(2, 9), (6, 9)], fill=slogan_color, width=SST)

    s_U, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (1, 8), (7, 8), (7, 1)], fill=slogan_color, width=SST)

    s_R, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (1, 9)], fill=slogan_color, width=SST)
    d.line([(1, 1), (6, 1), (7, 3), (6, 5), (1, 5)], fill=slogan_color, width=SST)
    d.line([(4, 5), (7, 9)], fill=slogan_color, width=SST)

    s_W, d = create_slogan_glyph(10, SH)
    d.line([(1, 1), (3, 9), (5, 4), (7, 9), (9, 1)], fill=slogan_color, width=SST)

    s_K, d = create_slogan_glyph(8, SH)
    d.line([(1, 1), (1, 9)], fill=slogan_color, width=SST)
    d.line([(7, 1), (1, 5), (7, 9)], fill=slogan_color, width=SST)

    slogan_items = [
        s_E, s_N, s_H, s_A, s_N, s_C, s_E,
        'SLOGAN_SPACE',
        s_Y, s_O, s_U, s_R,
        'SLOGAN_SPACE',
        s_W, s_O, s_R, s_K
    ]

    s_letter_gap = 7
    s_word_gap = 18

    slogan_w = 0
    for it in slogan_items:
        if it == 'SLOGAN_SPACE':
            slogan_w += s_word_gap
        else:
            slogan_w += it.width + s_letter_gap

    slogan_line = Image.new('RGBA', (slogan_w, SH), (0, 0, 0, 0))
    scx = 0
    for it in slogan_items:
        if it == 'SLOGAN_SPACE':
            scx += s_word_gap
        else:
            slogan_line.paste(it, (scx, 0), it)
            scx += it.width + s_letter_gap

    gap_y = 12
    text_block_w = max(top_line.width, slogan_line.width)
    text_block_h = top_line.height + gap_y + slogan_line.height

    text_block = Image.new('RGBA', (text_block_w, text_block_h), (0, 0, 0, 0))
    text_block.paste(top_line, (0, 0), top_line)
    text_block.paste(slogan_line, (0, top_line.height + gap_y), slogan_line)

    # Divider bar |
    div_w = 2
    div_h = int(target_emblem_h * 0.72)
    divider = Image.new('RGBA', (div_w, div_h), divider_color)

    # Composite Master
    gap_master = 24
    master_w = emblem_scaled.width + gap_master + div_w + gap_master + text_block.width + 30
    master_h = max(target_emblem_h, text_block.height) + 20

    master = Image.new('RGBA', (master_w, master_h), (0, 0, 0, 0))
    e_y = (master_h - emblem_scaled.height) // 2
    master.paste(emblem_scaled, (10, e_y), emblem_scaled)

    div_x = 10 + emblem_scaled.width + gap_master
    div_y = (master_h - div_h) // 2
    master.paste(divider, (div_x, div_y), divider)

    tb_x = div_x + div_w + gap_master
    tb_y = (master_h - text_block.height) // 2
    master.paste(text_block, (tb_x, tb_y), text_block)

    mbbox = master.getbbox()
    if mbbox:
        master = master.crop((mbbox[0] - 4, mbbox[1] - 4, mbbox[2] + 4, mbbox[3] + 4))

    return master

dark_logo = build_master_logo(is_light=False)
dark_logo.save('C:/Users/sakju/tahseen-ai/public/tahseen-logo.png', format='PNG', optimize=True)
dark_logo.save('C:/Users/sakju/tahseen-ai/public/logo.png', format='PNG', optimize=True)

light_logo = build_master_logo(is_light=True)
light_logo.save('C:/Users/sakju/tahseen-ai/public/tahseen-logo-light.png', format='PNG', optimize=True)

print("Master logos generated with authentic logo (3).png emblem brand mark! Sizes:", dark_logo.size, light_logo.size)
