# catalyst-ui — working notes

`DESIGN_SYSTEM.md` is the reference: token table, component inventory, and a link to
every component's `.spec.md` prop contract. Read it first; this file does not repeat it.

## Commands

```bash
npm run dev            # Vite dev server (the showcase in src/App.tsx)
npm run storybook      # component explorer on :6006
npm run lint           # oxlint
npm test               # jest, no coverage — the inner loop
npm run test:coverage  # jest + the 80% gate; this is what CI runs
npm run test:e2e       # playwright against a real browser
npm run build          # tsc -b && vite build → dist/
npm run build:storybook  # → dist/storybook/  (must run AFTER build)
```

## Invariants

**Semantic tokens only.** Never a raw Tailwind palette class (`bg-blue-600`) or a hex
value in a component. Every color goes through `src/styles/tokens.css`. Tag colors are
a deliberately separate categorical family — they are not action or status colors and
belong only inside `Tag`.

**Dark mode is `[data-theme]` on `<html>`, and nothing else.** No class toggling, no
CSS-in-JS, no per-component theme prop. Three things honour that one contract:
`src/theme/ThemeProvider.tsx` (app), `.storybook/preview.ts` (toolbar), and
`e2e/a11y.spec.ts` (seeded via `localStorage['design-system-theme']`). Change the
mechanism and all three break together — which is the point.

**No barrel `index.ts`.** Consumers vendor this library by copying directories, not by
installing it, so deep relative imports (`./components/Button/Button`) are the contract.
A barrel would make a directory copy silently incomplete.

**Sub-components attach to their parent**, via `Object.assign(Root, { Header, Body })`
or property assignment — never as separate top-level exports. This is why
`react/only-export-components` is disabled in `.oxlintrc.json`: it flags the intended
architecture on 19 lines and would train you to ignore the linter.

**`vite build` empties `dist/`.** `build:storybook` writes into `dist/storybook`, so it
must run second or the app build is wiped. `vercel.json` and CI both order it correctly.

## Adding a component

Four files in `src/components/ComponentName/`, then one table row:

1. `ComponentName.tsx` — implementation, tokens only
2. `ComponentName.spec.md` — prop contract, same template as `Button/Button.spec.md`
3. `ComponentName.test.tsx` — Jest + Testing Library, core behaviour
4. `ComponentName.stories.tsx` — CSF3, one export per meaningful variant
5. Add a row to the component table in `DESIGN_SYSTEM.md`

Add a case to `e2e/showcase.spec.ts` only if the component has behaviour jsdom cannot
see — real hover, floating-ui positioning, scroll lock, focus restoration.

## Testing

Jest + Testing Library on jsdom. The 80% gate (statements/branches/functions/lines)
covers `src/components/**` and `src/theme/**`; `App.tsx` and `main.tsx` are excluded
because the e2e suite covers the showcase.

**jsdom has no `matchMedia`.** `ThemeProvider` calls it unguarded at init, so anything
mounting the provider must stub it first — copy the `Object.defineProperty` block at
the top of `src/components/ThemeToggle/ThemeToggle.test.tsx`.

**jsdom's `window.innerWidth` defaults to 1024**, which equals the `lg` breakpoint, so
`Layout.Sider` mounts in its *non*-mobile branch. Reaching the mobile branch takes an
explicit `window.innerWidth = 800` plus a dispatched `resize` event.

Playwright runs at 1280px on purpose. `SideNav` and `MenuBar` keep their closed mobile
drawers mounted, so below 1024px every nav item exists twice and bare role queries go
ambiguous. Those drawers also keep a focusable close button under `aria-hidden`, which
axe would flag as `aria-hidden-focus` at mobile widths — the fix when that matters is
`inert` on the drawer container, not a change to the test.
