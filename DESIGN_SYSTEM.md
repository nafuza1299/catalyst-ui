# Catalyst UI Reference

This is the single file to give an AI as context when asking it to build UI
with this system. It contains the token reference and links to every
component's usage contract.

## Tokens

All components use these semantic Tailwind tokens exclusively — never raw
palette classes (`bg-blue-600`) or hex values. Tokens automatically adapt
between light and dark mode via `[data-theme]` on `<html>`.

| Token | Purpose |
|---|---|
| `bg-bg` / `text-bg` | Page background |
| `bg-surface` | Card/panel background, one step up from page bg |
| `bg-surface-hover` | Hover state for surfaces and ghost buttons |
| `border-border` | All borders/dividers |
| `text-text` | Primary text |
| `text-text-muted` | Secondary/caption text |
| `bg-primary` / `text-primary` | Brand blue — primary actions, active states, focus rings |
| `bg-primary-hover` | Primary hover state |
| `text-primary-fg` | Text/icon color on top of `bg-primary` |
| `bg-danger` / `text-danger` | Destructive actions |

Radius scale: `rounded-sm` (6px), `rounded-md` (8px, default for buttons/inputs), `rounded-lg` (12px, default for cards/panels).

## Components

| Component | Status | Spec |
|---|---|---|
| Button | ✅ built | `src/components/Button/Button.spec.md` |
| Card | planned | — |
| Table | planned | — |
| Side Nav | planned | — |
| Menu Bar | planned | — |

## Rules for AI-generated UI using this system

1. Only use the semantic tokens listed above — never introduce new colors.
2. Reuse existing components before writing new markup that duplicates one (e.g. don't hand-roll a button with `<div onClick>`).
3. Mobile-first: write base (unprefixed) classes for mobile, layer `sm:` / `md:` / `lg:` up.
4. Every interactive element needs a visible focus state — components already handle this; don't strip `focus-visible:` classes.
5. When a new component is needed, follow the existing pattern: `ComponentName.tsx` + `ComponentName.spec.md` in the same folder, spec written in the same template as Button's.
