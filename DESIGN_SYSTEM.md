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

### Tag colors

Tag colors are a separate categorical palette, not action or status tokens for
buttons. Use them only through `Tag` so light and dark values remain paired.

| Token pair | Category |
|---|---|
| `bg-tag-blue-bg` / `text-tag-blue-text` | Blue |
| `bg-tag-green-bg` / `text-tag-green-text` | Green |
| `bg-tag-amber-bg` / `text-tag-amber-text` | Amber |
| `bg-tag-red-bg` / `text-tag-red-text` | Red |
| `bg-tag-purple-bg` / `text-tag-purple-text` | Purple |
| `bg-tag-gray-bg` / `text-tag-gray-text` | Gray |

Radius scale: `rounded-sm` (6px), `rounded-md` (8px, default for buttons/inputs), `rounded-lg` (12px, default for cards/panels).

## Components

| Component | Status | Spec |
|---|---|---|
| Button | ✅ built | `src/components/Button/Button.spec.md` |
| Card | ✅ built | `src/components/Card/Card.spec.md` |
| Tag | ✅ built | `src/components/Tag/Tag.spec.md` — non-interactive categorical metadata label with optional dismiss control. |
| Table | planned | — |
| Row/Col | ✅ built | `src/components/Grid/Row.tsx`, `Col.tsx` — simple flex-based responsive grid using Tailwind's natural `md:` / `lg:` breakpoints and `gap` utility. |
| Side Nav | ✅ built | `src/components/SideNav/SideNav.spec.md` — routing-agnostic, data-driven nav that accepts `items`, `activeKey`, and `onSelect` without depending on React Router or Next.js `Link`. |
| Menu Bar | ✅ built | `src/components/MenuBar/MenuBar.spec.md` — top-level app navigation with hybrid slot-based layout (Brand/Nav/Actions) and data-driven dropdown menus. Responsive: desktop horizontal bar, mobile hamburger-triggered sheet. Shares focus-trap and overlay patterns with Side Nav. |
| Layout | ✅ built | `src/components/Layout/Layout.spec.md` — app-shell scaffolding that arranges Header, Sider, Content, and Footer. Compound component; delegates responsive behavior to SideNav and MenuBar. |
| Modal | ✅ built | `src/components/Modal/Modal.spec.md` — controlled portal dialog with compound slots, focus trapping, scroll lock, and focus restoration. |
| Tooltip | ✅ built | `src/components/Tooltip/Tooltip.spec.md` — delayed hover/focus plain-text hint; uses Floating UI for automatic flip and shift positioning. |
| Popover | ✅ built | `src/components/Popover/Popover.spec.md` — controlled, non-modal rich-content panel; uses Floating UI for positioning and dismissal. |

## Loading states

Use `Skeleton` for loading content, wrapped in a region with `aria-busy="true"`. Content-bearing components accept `loading` where appropriate: `Card`, `Tag`, `SideNav`, `MenuBar`, `Layout`, `Modal`, `Popover`, and `Tooltip`. Compound components expose a matching `.Skeleton` variant for composing custom layouts. `Button` retains its spinner-based `loading` state.

## Rules for AI-generated UI using this system

1. Only use the semantic tokens listed above — never introduce new colors. Tag color tokens are reserved for categorical `Tag` usage.
2. Reuse existing components before writing new markup that duplicates one (e.g. don't hand-roll a button with `<div onClick>`).
3. Mobile-first: write base (unprefixed) classes for mobile, layer `sm:` / `md:` / `lg:` up.
4. Every interactive element needs a visible focus state — components already handle this; don't strip `focus-visible:` classes.
5. When a new component is needed, follow the existing pattern: generate all of the following in the same folder:
   - `ComponentName.tsx` — implementation
   - `ComponentName.spec.md` — AI-readable usage contract, written in the same template as Button's
   - `ComponentName.test.tsx` — Jest unit test covering the component's core behavior
   - `ComponentName.playwright.md` — Playwright CLI instructions for validating the component in the browser
6. Do not treat the component as complete until the implementation, unit test, and Playwright instruction file are all present and aligned with the design system contract.

## Assembling a full page with Layout

Layout is the outermost container; it orchestrates Header (menu bar), optional Sider (side nav drawer), Content (main area), and Footer. Use this pattern for most app shells:

```jsx
import { Layout } from "./components/Layout/Layout";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { SideNav } from "./components/SideNav/SideNav";
import { Card } from "./components/Card/Card";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <Layout>
      {/* Top navigation bar */}
      <Layout.Header>
        <MenuBar mobileOpen={menuBarOpen} onMobileOpenChange={setMenuBarOpen}>
          <MenuBar.Brand>Brand Name</MenuBar.Brand>
          <MenuBar.Nav>
            <MenuBar.Link href="/">Home</MenuBar.Link>
            <MenuBar.Link href="/docs">Docs</MenuBar.Link>
          </MenuBar.Nav>
          <MenuBar.Actions>
            {/* theme toggle, profile, etc. */}
          </MenuBar.Actions>
        </MenuBar>
      </Layout.Header>

      {/* Inner layout: sidebar + content row */}
      <Layout hasSider>
        <Layout.Sider width={240} collapsible collapsed={false} breakpoint="lg">
          <SideNav
            items={[
              { key: "dashboard", label: "Dashboard", icon: <Icon /> },
              { key: "settings", label: "Settings", icon: <Icon /> },
            ]}
            activeKey={activeNav}
            onSelect={setActiveNav}
          />
        </Layout.Sider>

        <Layout.Content>
          {/* Your page content: Cards, Tables, Forms, etc. */}
          <Card>
            <Card.Header>
              <Card.Title>Page Title</Card.Title>
            </Card.Header>
            <Card.Body>Page content here</Card.Body>
          </Card>
        </Layout.Content>
      </Layout>

      {/* Footer */}
      <Layout.Footer>© 2026 Your Company. All rights reserved.</Layout.Footer>
    </Layout>
  );
}
```

Key patterns:
- Outer `Layout` stacks Header/body/Footer vertically.
- Inner `Layout hasSider` arranges Sider + Content horizontally.
- `Layout.Sider` and `SideNav` must use the **same breakpoint** for consistent mobile behavior.
- Layout itself doesn't handle responsive collapse — that's delegated to `SideNav` and `MenuBar`, which each own their own mobile drawer/sheet logic.
- Footer is optional.

This nesting approach (vs. a single component with many props) keeps the contract simple and makes arbitrary combinations (header-only, sidebar-only, both, sider-on-right) possible without an explosion of conditional styling.
