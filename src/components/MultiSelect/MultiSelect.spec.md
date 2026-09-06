# MultiSelect

Token-styled multi-value picker built on `react-select`. Selections render as
`Tag` chips, and edits made inside the open menu are buffered and committed as
one change when the menu closes. Use for filter controls where the parent
refetches on change.

## Props

| Prop       | Type                        | Default | Notes                                                          |
|------------|-----------------------------|---------|----------------------------------------------------------------|
| `label`    | `string`                    | —       | Required. Rendered above the control with a live count, and used as the input's `aria-label`. |
| `options`  | `MultiSelectOption[]`       | —       | `{ value: string; label: string }`.                             |
| `value`    | `string[]`                  | —       | Controlled. The committed selection.                            |
| `onChange` | `(next: string[]) => void`  | —       | Fires once per menu session, not once per click. See below.     |
| `min`      | `number`                    | `0`     | Floor. Picks cannot be removed below it, from chip or menu.     |
| `max`      | `number`                    | —       | Ceiling. Unselected options become `aria-disabled` at the limit. |

## The buffer

While the menu is open, edits accumulate in local state instead of calling
`onChange`. The label count and the chips both track the in-progress selection,
so the control looks live — but the parent is not told anything until the menu
closes. A parent that refetches on change therefore fires one request per menu
session rather than one per click.

Dismissing a chip while the menu is **closed** commits immediately; there is no
session to buffer into.

`min` and `max` are enforced against the in-progress selection, not the
committed one, so a limit takes effect the moment the buffer reaches it.

## Bulk actions

The menu footer holds `Select all` and `Clear all`. Each hides when it would be
a no-op: `Select all` disappears once everything selectable is selected (capped
by `max`), and `Clear all` disappears once the selection is down to `min`. Both
route through the same buffer as individual picks.

## Responsive behavior

Fixed `w-64`. The chip row scrolls internally (`max-h-20`) rather than growing
the control, so a long selection never pushes the surrounding layout around.
The menu is portalled to `<body>`, so an `overflow-hidden` ancestor cannot clip it.

## Dark / light mode

Automatic. Every surface, border and text color comes from semantic tokens via
`classNames`, and `unstyled` is set so react-select contributes no colors of its
own. Chips inherit `Tag`'s categorical palette.

## Do / Don't

- ✅ Do rely on the buffer — bind `onChange` straight to a refetch.
- ✅ Do set `min={1}` when the caller cannot handle an empty selection.
- ❌ Don't read the selection from anywhere but `value`; the in-progress buffer is deliberately private.
- ❌ Don't pass react-select props through — this is a narrowed contract, not a wrapper.

## Usage

```tsx
import { MultiSelect } from "@/components/MultiSelect/MultiSelect";

const [regions, setRegions] = useState(["emea", "apac"]);

<MultiSelect
  label="Regions"
  options={[
    { value: "emea", label: "EMEA" },
    { value: "apac", label: "APAC" },
    { value: "amer", label: "Americas" },
  ]}
  value={regions}
  onChange={setRegions}
  min={1}
  max={3}
/>
```
