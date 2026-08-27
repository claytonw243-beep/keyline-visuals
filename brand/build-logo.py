"""Build print-ready Keyline Visuals logo files.

Type is converted to outlines (real vector paths), so nothing depends on the
font being installed on the printer's machine. Working units are the font's
em units: upem = 1000, cap height = 686.
"""
import io, os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

FONTS = '/Users/claytonwillis/Real estate/public/fonts'
OUT = '/Users/claytonwillis/Real estate/brand'
os.makedirs(OUT, exist_ok=True)

PAPER, MUTED, SIGNAL, INK = '#E9EDF5', '#8A99B5', '#5B9DFF', '#060A14'


def load(path, axes=None):
    f = TTFont(path)
    if axes:
        f = instancer.instantiateVariableFont(f, axes, inplace=True, updateFontNames=False)
    f.flavor = None
    buf = io.BytesIO()
    f.save(buf)
    return f, buf.getvalue()


def run(path, text, axes=None, tracking_em=0.0):
    """Outline `text`. Returns (svg path data, advance width, upem, capHeight).
    Baseline sits at y=0 with the glyphs above it (negative y)."""
    f, data = load(path, axes)
    upem = f['head'].unitsPerEm
    cap = getattr(f['OS/2'], 'sCapHeight', None) or int(upem * 0.7)

    face = hb.Face(data)
    hbfont = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf)

    glyphset = f.getGlyphSet()
    order = f.getGlyphOrder()
    track = tracking_em * upem

    parts, x = [], 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        pen = SVGPathPen(glyphset)
        # Flip Y: font units are y-up, SVG is y-down.
        tpen = TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset))
        glyphset[order[info.codepoint]].draw(tpen)
        d = pen.getCommands()
        if d:
            parts.append(d)
        x += pos.x_advance + track
    if parts:
        x -= track
    return ' '.join(parts), x, upem, cap


ARCHIVO = f'{FONTS}/archivo-variable-latin.woff2'
PLEX = f'{FONTS}/plex-mono-400.woff2'

# Matches the site: Archivo at 118% width, 700 for KEYLINE, 400 for VISUALS.
KEY_D, KEY_W, UPEM, CAP = run(ARCHIVO, 'KEYLINE', {'wght': 700, 'wdth': 118}, 0.01)
VIS_D, VIS_W, _, _ = run(ARCHIVO, 'VISUALS', {'wght': 400, 'wdth': 118}, 0.01)
TAG_D, TAG_W, _, TAG_CAP = run(PLEX, 'OXFORD, MISSISSIPPI', None, 0.08)

PX = UPEM / 16.0          # one CSS pixel at the site's 16px logo size
MARK_W, MARK_H = 12 * PX, 22 * PX
BORDER, BAR = 1 * PX, 3 * PX
GAP = 12 * PX             # mark-to-wordmark gap
WORD_GAP = 0.35 * UPEM    # KEYLINE-to-VISUALS gap


def rect(x, y, w, h):
    return f'M{x:.1f} {y:.1f}H{x + w:.1f}V{y + h:.1f}H{x:.1f}Z'


def mark(x, y, w=MARK_W, h=MARK_H, scale=1.0):
    """The keyline mark: a solid left bar plus a three-sided outline.
    Drawn as filled rects, never strokes, so it cannot go hairline when scaled."""
    b, br = BORDER * scale, BAR * scale
    return {
        'bar': rect(x, y, br, h),
        'frame': ' '.join([
            rect(x + br, y, w - br, b),               # top
            rect(x + w - b, y, b, h),                 # right
            rect(x + br, y + h - b, w - br, b),       # bottom
        ]),
    }


def svg(w, h, body, vb=None):
    box = vb or f'0 0 {w:.1f} {h:.1f}'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}" '
        f'width="{w:.1f}" height="{h:.1f}">\n{body}\n</svg>\n'
    )


def theme(name):
    if name == 'white':
        return dict(key='#FFFFFF', vis='#FFFFFF', frame='#FFFFFF', bar='#FFFFFF',
                    rule='#FFFFFF', tag='#FFFFFF')
    if name == 'ink':
        return dict(key=INK, vis=INK, frame=INK, bar=INK, rule=INK, tag=INK)
    return dict(key=PAPER, vis=MUTED, frame=PAPER, bar=SIGNAL, rule=MUTED, tag=MUTED)


# --------------------------------------------------------------------------
# Horizontal lockup:  [mark] KEYLINE VISUALS
# --------------------------------------------------------------------------
def horizontal(t):
    text_x = MARK_W + GAP
    total_w = text_x + KEY_W + WORD_GAP + VIS_W
    # Mark spans the full height; the cap box is centred inside it.
    baseline = CAP + (MARK_H - CAP) / 2
    m = mark(0, 0)
    return svg(total_w, MARK_H, '\n'.join([
        f'  <path fill="{t["bar"]}" d="{m["bar"]}"/>',
        f'  <path fill="{t["frame"]}" d="{m["frame"]}"/>',
        f'  <g transform="translate({text_x:.1f} {baseline:.1f})">'
        f'<path fill="{t["key"]}" d="{KEY_D}"/></g>',
        f'  <g transform="translate({text_x + KEY_W + WORD_GAP:.1f} {baseline:.1f})">'
        f'<path fill="{t["vis"]}" d="{VIS_D}"/></g>',
    ]))


# --------------------------------------------------------------------------
# Stacked lockup — mark over KEYLINE / VISUALS over a rule and the tagline.
# Sized for a chest or back print.
# --------------------------------------------------------------------------
def stacked(t):
    W = max(KEY_W, VIS_W)
    ms = 0.62                                     # mark reads heavy stacked; ease it down
    mw, mh = MARK_W * ms, MARK_H * ms
    tag_s = W / TAG_W                             # justify the tagline to the wordmark
    line_gap, block_gap, rule_h = 210, 300, 46

    y = 0
    m = mark((W - mw) / 2, y, mw, mh, ms)
    y += mh + block_gap
    key_base = y + CAP
    vis_base = key_base + CAP + line_gap
    y = vis_base + block_gap
    rule_y = y
    y += rule_h + block_gap * 0.85
    tag_base = y + TAG_CAP * tag_s
    total_h = tag_base

    return svg(W, total_h, '\n'.join([
        f'  <path fill="{t["bar"]}" d="{m["bar"]}"/>',
        f'  <path fill="{t["frame"]}" d="{m["frame"]}"/>',
        f'  <g transform="translate({(W - KEY_W) / 2:.1f} {key_base:.1f})">'
        f'<path fill="{t["key"]}" d="{KEY_D}"/></g>',
        f'  <g transform="translate({(W - VIS_W) / 2:.1f} {vis_base:.1f})">'
        f'<path fill="{t["vis"]}" d="{VIS_D}"/></g>',
        f'  <path fill="{t["rule"]}" d="{rect(0, rule_y, W, rule_h)}"/>',
        f'  <g transform="translate(0 {tag_base:.1f}) scale({tag_s:.4f})">'
        f'<path fill="{t["tag"]}" d="{TAG_D}"/></g>',
    ]))


# --------------------------------------------------------------------------
# Mark on its own — sleeve, hat, favicon, watermark.
# --------------------------------------------------------------------------
def markonly(t):
    m = mark(0, 0)
    return svg(MARK_W, MARK_H, '\n'.join([
        f'  <path fill="{t["bar"]}" d="{m["bar"]}"/>',
        f'  <path fill="{t["frame"]}" d="{m["frame"]}"/>',
    ]))


written = []
for name in ('fullcolor', 'white', 'ink'):
    t = theme(name)
    for kind, fn in (('horizontal', horizontal), ('stacked', stacked), ('mark', markonly)):
        p = f'{OUT}/keyline-{kind}-{name}.svg'
        open(p, 'w').write(fn(t))
        written.append(os.path.basename(p))

print('\n'.join(written))
print(f'\nhorizontal: {MARK_W + GAP + KEY_W + WORD_GAP + VIS_W:.0f} x {MARK_H:.0f} units')
