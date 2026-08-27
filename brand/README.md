# Keyline Visuals — logo

The logotype from the site header: the keyline mark, then `KEYLINE VISUALS`.

**The type is converted to outlines**, so no font needs to be installed anywhere
and nothing will reflow or substitute when someone else opens it. The glyph paths
come straight from the same Archivo variable font the website uses, at the same
700/400 weight and 118% width, so the letterfit matches the site exactly.

## Files

| File | For |
| --- | --- |
| `keyline-horizontal-fullcolor.svg` | Dark backgrounds. White wordmark, grey-blue "VISUALS", blue mark edge. |
| `keyline-horizontal-white.svg` | Dark backgrounds, one colour. |
| `keyline-horizontal-ink.svg` | Light backgrounds, one colour. |
| `…-3600px.png` | Same three, as 300 DPI transparent PNGs (12" wide). |

Send the **SVG** anywhere someone asks for vector — print, signage, embroidery,
another designer. Send the **PNG** when something only takes a raster file.

The SVGs contain no raster data and scale to any size, from a business card to a
truck door, off the one file.

## Colours

| Name | Hex | RGB |
| --- | --- | --- |
| Paper | `#E9EDF5` | 233, 237, 245 |
| Muted | `#8A99B5` | 138, 153, 181 |
| Signal | `#5B9DFF` | 91, 157, 255 |
| Ink | `#060A14` | 6, 10, 20 |

Paper is an off-white and Ink is a blue-black, not pure `#FFFFFF` or `#000000` —
deliberate, and it matches the site. The `-white` file does use pure white,
because a slightly grey "white" ink on a dark surface just reads as dirty.

For anything printed, hand over the hex values and let the printer pull a Pantone
match against a physical swatch book. A Pantone number picked off a screen is a
guess.

## Sizing

- **Clear space:** one mark-width of empty space on all four sides.
- **Minimum width:** 3" for screen printing — below that the 1-unit outline on
  the mark falls under a 1pt stroke and the screen won't hold it. About half that
  for digital printing or anything on screen.
- Scale proportionally. Don't stretch it.

The lockup is roughly 9:1, so it wants to sit somewhere wide and short.

## Regenerating

These are generated, not hand-drawn.

- `build-logo.py` pulls the glyph outlines from
  `public/fonts/archivo-variable-latin.woff2` and composes the SVGs. It needs
  `fonttools`, `brotli`, and `uharfbuzz`. It can also emit a stacked lockup and a
  mark-only file if you ever want them.
- `export.mjs` rasterises the SVGs to 300 DPI PNGs:

```bash
node brand/export.mjs
```

Nothing in `brand/` is part of the website build or gets deployed.
