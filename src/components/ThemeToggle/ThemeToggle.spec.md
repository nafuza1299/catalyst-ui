# ThemeToggle

Icon-only switch between light and dark mode. A thin `Button` over `useTheme` —
it holds no state of its own and takes no props.

## Props

None. All behaviour comes from the surrounding `ThemeProvider`.

## Requirements

Must be rendered inside `ThemeProvider`. `useTheme` throws outside one, by
design — a silent no-op toggle is worse than a loud failure.

`ThemeProvider` reads `localStorage` and `window.matchMedia` unguarded during
its first render. That is fine in a browser, but any test or SSR host has to
provide `matchMedia` first; jsdom does not ship it. See the stub at the top of
`ThemeToggle.test.tsx`.

## Behaviour

Toggling flips `theme` in context, which writes `data-theme` to
`document.documentElement` and persists the choice under the `design-system-theme`
key. Every token in `styles/tokens.css` keys off that one attribute, so nothing
else in the tree needs to know the theme changed.

The initial theme resolves as: stored preference → OS `prefers-color-scheme` →
light. A stored value that is not `"light"` or `"dark"` is ignored rather than
trusted.

The accessible name states the *destination*, not the current state — "Switch to
dark mode" while light — so a screen-reader user hears what the button will do.
The icon is `aria-hidden`.

## Responsive behavior

None. `iconOnly` at `size="md"` already meets the 44px touch target at every
breakpoint.

## Dark / light mode

It *is* the mechanism. The sun and moon glyphs swap on `theme`; both use
`currentColor` and inherit the ghost button's `text-text`.

## Do / Don't

- ✅ Do place one per app, usually in `MenuBar.Actions`.
- ✅ Do let it own the theme — read `useTheme().theme` elsewhere rather than tracking your own copy.
- ❌ Don't render more than one per view; they would all be correct but redundant.
- ❌ Don't set `data-theme` yourself while this is mounted. The one exception in this repo is `.storybook/preview.ts`, which drives the attribute directly *instead of* mounting the provider.

## Usage

```tsx
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

<ThemeProvider>
  <MenuBar>
    <MenuBar.Actions>
      <ThemeToggle />
    </MenuBar.Actions>
  </MenuBar>
</ThemeProvider>
```
