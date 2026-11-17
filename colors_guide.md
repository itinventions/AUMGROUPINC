# Aum group inc — Color Guide (Light Mode, 4 Colors + White)

**Rule for the AI / developer: do not invent colors. Use only the five values below. If unsure, use the lookup table in Section 2. Do not interpolate, tint, darken, or add opacity to any color.**

## 1. The Palette

| Name | Hex | One job |
|---|---|---|
| **White** | `#FFFFFF` | Page and card background |
| **Emerald** | `#004438` | Actions and brand (buttons, links, header, footer) |
| **Oxblood** | `#402020` | All text, plus hover and badges |
| **Sand** | `#D6D1C4` | Soft sections, dividers, selected and disabled backgrounds |
| **Grey** | `#8C8C8C` | Input borders and inactive icons ONLY. Never text. |

Proportion: ~60% white, ~25% emerald, ~15% oxblood + sand.

---

## 2. Lookup Table (find the element, use the color, done)

| Element | Background | Text / Icon | Border |
|---|---|---|---|
| Page | White | Oxblood | — |
| Card, modal, dropdown | White | Oxblood | Sand 1px |
| Alternate section band | Sand | Oxblood | — |
| Header | White | Oxblood | Sand bottom 1px |
| Header (bold variant, pick ONE style site-wide) | Emerald | White | — |
| Footer | Emerald | White (links: Sand) | — |
| Hero / feature block | Emerald | White | — |
| Premium campaign block (max 1 per page) | Oxblood | White | — |
| Headings, body, labels | — | Oxblood | — |
| Secondary / helper text | — | Oxblood (use smaller size or lighter weight, not a lighter color) | — |
| Links | — | Emerald + underline | — |
| **Primary button** | Emerald | White | — |
| Primary button hover / pressed | Oxblood | White | — |
| Secondary button | White | Emerald | Emerald 1.5px |
| Secondary button hover | Sand | Emerald | Emerald 1.5px |
| Text button | none | Emerald, underline on hover | — |
| Button on Emerald background | Sand | Emerald | — |
| Disabled (button, input) | Sand | Grey | — |
| Input field | White | Oxblood | Grey 1px |
| Input focus | White | Oxblood | Emerald 2px |
| Placeholder | — | Oxblood (with the field label above it, so placeholder is optional) | — |
| Checkbox / radio / toggle ON | Emerald | White mark | — |
| Checkbox / radio / toggle OFF | White | — | Grey 1.5px |
| Nav link default | — | Oxblood | — |
| Nav link hover / active | — | Emerald + underline | — |
| Active icon | — | Oxblood | — |
| Inactive icon | — | Grey | — |
| Cart / notification badge | Oxblood | White | — |
| Product tag (New, Bestseller, Sale) | Oxblood | White | — |
| Filter chip default | White | Oxblood | Grey 1px |
| Filter chip selected | Sand | Emerald | Emerald 1px |
| Selected row / active item | Sand | Oxblood | Emerald left bar 3px |
| Tabs | — | active: Emerald + 2px underline; inactive: Oxblood | — |
| Divider / hairline | Sand | — | — |
| Progress bar | track Sand, fill Emerald | — | — |
| Rating stars | filled Emerald, empty Sand | — | — |
| Tooltip | Oxblood | White | — |
| Skeleton loader | Sand | — | — |
| Focus ring (every interactive element) | — | — | Emerald 2px, 2px offset (on Emerald/Oxblood backgrounds: Sand) |

---

## 3. Status Messages (no extra colors, so icons carry the meaning)

| State | Style |
|---|---|
| **Error** | White box, **Oxblood 2px border**, error icon (circled !) + bold message in Oxblood. Input border becomes Oxblood 2px. |
| **Success** | White box, **Emerald 2px border**, check icon + message in Emerald |
| **Warning / info** | Sand box, Oxblood text, triangle or "i" icon |

Rule: status is NEVER shown by color alone. Always icon + words.

---

## 4. Quick Decision Rules

1. Is it clickable and the main action? **Emerald.**
2. Is it text? **Oxblood.** (Exceptions: links = Emerald; text on Emerald/Oxblood = White.)
3. Is it a background? **White** by default; **Sand** to separate a section; **Emerald** for brand blocks.
4. Is it a divider or a light border? **Sand.**
5. Is it a form-field border or an inactive icon? **Grey.**
6. Is it a badge, tooltip or hover state? **Oxblood.**
7. Still unsure? **White background, Oxblood text, Emerald action.**

---

## 5. Forbidden (these fail contrast or look broken)

| Never | Why (contrast) |
|---|---|
| Grey as text on any background | 3.36 on white, 2.21 on sand |
| Grey on Sand | 2.21 |
| Emerald on Oxblood, or Oxblood on Emerald | 1.30, unreadable |
| White text on Sand, Sand text on White | 1.52 |
| Two emerald buttons competing in one view | Kills hierarchy. One primary per screen. |
| Colored overlays or filters on jewelry photos | The product is the color |
| Opacity, gradients, or tints of any palette color | Creates off-palette colors and breaks contrast |

## 6. Verified Contrast (for the pairs this guide uses)

| Pair | Ratio |
|---|---|
| Oxblood on White | 14.53 |
| Oxblood on Sand | 9.53 |
| Emerald on White | 11.15 |
| Emerald on Sand | 7.31 |
| White on Emerald | 11.15 |
| White on Oxblood | 14.53 |
| Sand on Emerald | 7.31 |
| Sand on Oxblood | 9.53 |
| Grey on White (borders/icons only) | 3.36 (passes the 3:1 rule for non-text UI) |

---

## 7. Code Tokens

```css
:root {
  --white:   #FFFFFF;
  --emerald: #004438;
  --oxblood: #402020;
  --sand:    #D6D1C4;
  --grey:    #8C8C8C;
}
```

```js
// tailwind.config.js
colors: { white:'#FFFFFF', emerald:'#004438', oxblood:'#402020', sand:'#D6D1C4', stone:'#8C8C8C' }
```