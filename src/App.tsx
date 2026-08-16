import { useState } from "react";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { SideNav, type SideNavItem } from "./components/SideNav/SideNav";
import { useTheme } from "./theme/ThemeProvider";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="7" r="3" />
      <path d="M20 19v-1a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="3.25" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .94 1.7 1.7 0 0 0-.2 1.01V22a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-.2-1.01 1.7 1.7 0 0 0-1-.94 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.94-1 1.7 1.7 0 0 0-1.01-.2H2.56a2 2 0 1 1 0-4h.09c.37 0 .71-.07 1.01-.2.39-.16.72-.45.94-1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.94 1.7 1.7 0 0 0 .2-1.01V2.56a2 2 0 0 1 4 0v.09c0 .37.07.71.2 1.01.16.39.45.72 1 .94A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.16.39.45.72.94 1 .3.14.64.2 1.01.2h.09a2 2 0 0 1 0 4h-.09c-.37 0-.71.07-1.01.2-.39.16-.72.45-.94 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 1.5v3m0 15v3m10.5-10.5h-3m-15 0h-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.07 4.93l-2.12 2.12m-10.3 10.3l-2.12 2.12M19.07 19.07l-2.12-2.12m-10.3-10.3l-2.12-2.12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navItems: SideNavItem[] = [
  { key: "overview", label: "Overview", icon: <HomeIcon /> },
  { key: "team", label: "Team", icon: <TeamIcon /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon /> },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeKey, setActiveKey] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuBarMobileOpen, setMenuBarMobileOpen] = useState(false);

  const contentMap: Record<string, { title: string; eyebrow: string; description: string }> = {
    overview: {
      title: "Product overview",
      eyebrow: "Performance",
      description: "Your core metrics are healthy and trending upward across the last sprint.",
    },
    team: {
      title: "Team workspace",
      eyebrow: "People",
      description: "Cross-functional collaboration remains strong with two active initiatives in flight.",
    },
    settings: {
      title: "Workspace settings",
      eyebrow: "Controls",
      description: "Manage permissions, performance alerts, and personal preferences from one place.",
    },
  };

  const current = contentMap[activeKey] ?? contentMap.overview;

  return (
    <div className="min-h-screen bg-bg text-text">
      <MenuBar mobileOpen={menuBarMobileOpen} onMobileOpenChange={setMenuBarMobileOpen}>
        <MenuBar.Brand>
          <span className="text-lg font-semibold text-primary">Catalyst</span>
        </MenuBar.Brand>

        <MenuBar.Nav>
          <MenuBar.Link href="#overview" active>
            Overview
          </MenuBar.Link>
          <MenuBar.Link href="#team">Team</MenuBar.Link>
          <MenuBar.Dropdown
            label="Products"
            items={[
              { key: "analytics", label: "Analytics", href: "#analytics" },
              { key: "reports", label: "Reports", href: "#reports" },
              { key: "insights", label: "Insights", href: "#insights" },
            ]}
          />
        </MenuBar.Nav>

        <MenuBar.Actions>
          <Button
            variant="ghost"
            iconOnly
            aria-label={theme === "light" ? "Dark mode" : "Light mode"}
            onClick={toggleTheme}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button variant="primary" size="sm">
            Sign up
          </Button>
          <Button
            variant="ghost"
            iconOnly
            aria-label="Open navigation"
            aria-expanded={menuBarMobileOpen}
            onClick={() => setMenuBarMobileOpen(!menuBarMobileOpen)}
            className="md:hidden"
          >
            {menuBarMobileOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </MenuBar.Actions>
      </MenuBar>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <SideNav
          items={navItems}
          activeKey={activeKey}
          onSelect={setActiveKey}
          open={mobileNavOpen}
          onOpenChange={setMobileNavOpen}
        />

        <main className="flex-1 p-4 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:hidden"
                  aria-label="Open navigation"
                  onClick={() => setMobileNavOpen(true)}
                >
                  ☰
                </button>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                    {current.eyebrow}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold text-text">{current.title}</h1>
                </div>
              </div>
            </header>

            <section className="space-y-6">
              <Card as="article">
                <Card.Body>
                  <p className="text-sm text-text-muted">{current.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-text-muted">
                      +12.4%
                    </span>
                    <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-text-muted">
                      8 active projects
                    </span>
                    <span className="rounded-md bg-surface-hover px-2.5 py-1.5 text-xs font-medium text-text-muted">
                      2 alerts
                    </span>
                  </div>
                </Card.Body>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <Card.Header>
                    <Card.Title>Team members</Card.Title>
                    <Card.Description>Manage who has access</Card.Description>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border border-border bg-surface-hover px-3 py-2">
                        <div>
                          <p className="font-medium text-text">Alicia Gomez</p>
                          <p className="text-sm text-text-muted">Product lead</p>
                        </div>
                        <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-muted">
                          Owner
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border border-border bg-surface-hover px-3 py-2">
                        <div>
                          <p className="font-medium text-text">Liam Chen</p>
                          <p className="text-sm text-text-muted">Design systems</p>
                        </div>
                        <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-muted">
                          Editor
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="primary">Save</Button>
                  </Card.Footer>
                </Card>

                <Card as="article" interactive role="button" tabIndex={0} aria-label="Open workspace settings">
                  <Card.Body>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-text-muted">Workspace</p>
                        <h3 className="mt-1 text-lg font-semibold text-text">Q3 rollout planning</h3>
                      </div>
                      <span className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-muted">
                        View
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
