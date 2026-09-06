# YearRangePicker

Two-click year range selector in a popover. Use where a date picker would be
overkill — annual reporting filters, cohort ranges, anything whose granularity
is a whole year.

## Props

| Prop       | Type                                   | Default | Notes                                            |
|------------|----------------------------------------|---------|--------------------------------------------------|
| `label`    | `string`                               | —       | Required. Shown above the trigger and used in the panel's `aria-label`. |
| `value`    | `[number, number]`                     | —       | Controlled. Always ordered `[start, end]`.        |
| `onChange` | `(next: [number, number]) => void`     | —       | Fires once, on the second click.                  |
| `min`      | `number`                               | —       | First selectable year, inclusive.                 |
| `max`      | `number`                               | —       | Last selectable year, inclusive.                  |

## The two-click range

The first click sets one endpoint and leaves the panel open; hovering then
previews the range that the second click would produce. The second click sets
the other endpoint, normalises the pair, and closes the panel — so clicking
2020 then 2012 commits `[2012, 2020]`, exactly as clicking them the other way
around does. `onChange` fires once, on the second click; a range abandoned with
Escape or an outside click commits nothing.

## Positioning

The panel is portalled to `<body>` and positioned in viewport coordinates, so
an ancestor with `overflow-hidden` (a `Card`, for instance) cannot clip it. It
tracks scroll and resize while open.

It is anchored directly below the trigger and does not flip. A trigger near the
bottom of the viewport will push the panel past the fold — keep it clear of the
last screenful, or scroll it into view before opening.

## Responsive behavior

Fixed `w-72` with a six-column year grid that scrolls internally past
`max-h-80`, so a wide `min`/`max` span never grows the panel beyond the screen.

## Dark / light mode

Automatic. Endpoints use `bg-primary` with `text-primary-fg`; in-range years use
`bg-primary/10`. Both flip with `[data-theme]` — the `-fg` token is what keeps
the endpoint label legible in dark mode, where the fill stays bright.

## Do / Don't

- ✅ Do treat it as fully controlled; it holds only the in-progress endpoint.
- ✅ Do keep `min`/`max` to a range a person will actually scan.
- ❌ Don't reach for it when the user needs a specific date — this only ever emits years.
- ❌ Don't place it flush against the bottom of a tall page (see Positioning).

## Usage

```tsx
import { YearRangePicker } from "@/components/YearRangePicker/YearRangePicker";

const [years, setYears] = useState<[number, number]>([2018, 2024]);

<YearRangePicker
  label="Years"
  value={years}
  onChange={setYears}
  min={2000}
  max={2026}
/>
```
