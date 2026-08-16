# Catalyst UI

Vercel-ish minimal Catalyst UI: rounded corners, blue accent, full dark/light mode, mobile-first responsive.

## Setup

```bash
npm install
npm run dev
```

Open the local dev URL — you'll see the Button component demo page with a
dark/light toggle in the top right.

## Structure

```
src/
  styles/tokens.css        ← single source of truth for all design tokens
  theme/ThemeProvider.tsx  ← dark/light mode context + localStorage persistence
  components/
    Button/
      Button.tsx           ← implementation
      Button.spec.md        ← AI-readable usage contract
DESIGN_SYSTEM.md            ← root reference — point an AI here for context
```

## Using this with an AI prompt

Paste `DESIGN_SYSTEM.md` (or point Claude/your AI tool at it as a file) as
context, then prompt normally, e.g.:

> "Using DESIGN_SYSTEM.md as the source of truth, build a settings page
> with a save button and a destructive delete button."

The AI should reuse the existing `Button` component and only use the
semantic tokens listed in the reference — never invent new colors.

## Adding a new component

Follow the Button pattern exactly:
1. `src/components/ComponentName/ComponentName.tsx`
2. `src/components/ComponentName/ComponentName.spec.md` (same template as Button's)
3. Add a row to the component table in `DESIGN_SYSTEM.md`

## Next components (planned, same pattern)

Card → Table → Side Nav → Menu Bar
