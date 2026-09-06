import { useState } from "react";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Layout } from "./components/Layout/Layout";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { Modal } from "./components/Modal/Modal";
import { Popover } from "./components/Popover/Popover";
import { SideNav, type SideNavItem } from "./components/SideNav/SideNav";
import { Tag, type TagColor } from "./components/Tag/Tag";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { MultiSelect } from "./components/MultiSelect/MultiSelect";
import { YearRangePicker } from "./components/YearRangePicker/YearRangePicker";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Col } from "./components/Grid/Col";
import { Row } from "./components/Grid/Row";

const HomeIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TeamIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="7" r="3" />
      <path d="M20 19v-1a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SettingsIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="3.25" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .94 1.7 1.7 0 0 0-.2 1.01V22a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-.2-1.01 1.7 1.7 0 0 0-1-.94 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.94-1 1.7 1.7 0 0 0-1.01-.2H2.56a2 2 0 1 1 0-4h.09c.37 0 .71-.07 1.01-.2.39-.16.72-.45.94-1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.94 1.7 1.7 0 0 0 .2-1.01V2.56a2 2 0 0 1 4 0v.09c0 .37.07.71.2 1.01.16.39.45.72 1 .94A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.16.39.45.72.94 1 .3.14.64.2 1.01.2h.09a2 2 0 0 1 0 4h-.09c-.37 0-.71.07-1.01.2-.39.16-.72.45-.94 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MenuIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const XIcon = () => {
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

const App = () => {
  const [activeKey, setActiveKey] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuBarMobileOpen, setMenuBarMobileOpen] = useState(false);
  const [showBugTag, setShowBugTag] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showLoadingPreview, setShowLoadingPreview] = useState(false);
  const [regions, setRegions] = useState(["emea", "apac"]);
  const [years, setYears] = useState<[number, number]>([2018, 2024]);

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
    <Layout>
      <Layout.Header>
        <MenuBar mobileOpen={menuBarMobileOpen} onMobileOpenChange={setMenuBarMobileOpen} loading={showLoadingPreview}>
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
            <ThemeToggle />
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
      </Layout.Header>

      <Layout hasSider>
        <Layout.Sider width={240} collapsible collapsed={false} breakpoint="lg">
          <SideNav
            items={navItems}
            activeKey={activeKey}
            onSelect={setActiveKey}
            open={mobileNavOpen}
            onOpenChange={setMobileNavOpen}
            loading={showLoadingPreview}
          />
        </Layout.Sider>

        <Layout.Content>
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                    {current.eyebrow}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold text-text">{current.title}</h1>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                aria-pressed={showLoadingPreview}
                onClick={() => setShowLoadingPreview((current) => !current)}
              >
                {showLoadingPreview ? "Show content" : "Preview loading"}
              </Button>
            </header>

            <section className="space-y-6">
              <Card as="article" loading={showLoadingPreview}>
                <Card.Body>
                  <p className="text-sm text-text-muted">{current.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Tag color="green">+12.4%</Tag>
                    <Tag color="blue">8 active projects</Tag>
                    <Tag color="amber">2 alerts</Tag>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Floating content</Card.Title>
                  <Card.Description>Hover hints and a controlled filter panel.</Card.Description>
                </Card.Header>
                <Card.Body className="flex flex-wrap items-center gap-3">
                  <Tooltip content="Shows above the control" side="top" loading={showLoadingPreview}><Button variant="ghost" iconOnly aria-label="Top tooltip">T</Button></Tooltip>
                  <Tooltip content="Shows to the right" side="right"><Button variant="ghost" iconOnly aria-label="Right tooltip">R</Button></Tooltip>
                  <Tooltip content="Shows below the control" side="bottom"><Button variant="ghost" iconOnly aria-label="Bottom tooltip">B</Button></Tooltip>
                  <Tooltip content="Shows to the left" side="left"><Button variant="ghost" iconOnly aria-label="Left tooltip">L</Button></Tooltip>
                  <Popover open={filtersOpen} onOpenChange={setFiltersOpen} loading={showLoadingPreview} trigger={<Button variant="secondary">Filters</Button>}>
                    <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); setFiltersOpen(false); }}>
                      <div><label htmlFor="status" className="block text-sm font-medium">Status</label><select id="status" className="mt-1 w-full rounded-md border border-border bg-bg px-2 py-1.5 text-sm"><option>All projects</option><option>Active</option><option>Archived</option></select></div>
                      <Button type="submit" size="sm">Apply filters</Button>
                    </form>
                  </Popover>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Filter controls</Card.Title>
                  <Card.Description>Both buffer their edits and commit on close.</Card.Description>
                </Card.Header>
                <Card.Body className="flex flex-wrap items-end gap-4">
                  <MultiSelect
                    label="Regions"
                    options={[
                      { value: "emea", label: "EMEA" },
                      { value: "apac", label: "APAC" },
                      { value: "amer", label: "Americas" },
                      { value: "latam", label: "LATAM" },
                    ]}
                    value={regions}
                    onChange={setRegions}
                    min={1}
                    max={3}
                  />
                  <YearRangePicker label="Years" value={years} onChange={setYears} min={2000} max={2026} />
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Modal examples</Card.Title>
                  <Card.Description>Focused confirmation and scrollable detail dialogs.</Card.Description>
                </Card.Header>
                <Card.Body className="flex flex-wrap gap-3">
                  <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>Delete project</Button>
                  <Button variant="secondary" onClick={() => setDetailsModalOpen(true)}>View activity details</Button>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Tag palette</Card.Title>
                  <Card.Description>Categorical metadata in both supported sizes.</Card.Description>
                </Card.Header>
                <Card.Body className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {(["blue", "green", "amber", "red", "purple", "gray"] as TagColor[]).map((color) => (
                      <Tag key={color} color={color} loading={showLoadingPreview}>{color}</Tag>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag size="sm" color="blue">Small</Tag>
                    <Tag size="md" color="purple">Medium</Tag>
                    {showBugTag && (
                      <Tag color="red" dismissible onDismiss={() => setShowBugTag(false)}>
                        Bug
                      </Tag>
                    )}
                    {!showBugTag && (
                      <Button variant="ghost" size="sm" onClick={() => setShowBugTag(true)}>
                        Restore bug tag
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Skeleton loading preview</Card.Title>
                  <Card.Description>Toggle the preview above to see loading placeholders across the interface.</Card.Description>
                </Card.Header>
                <Card.Body>
                  <div aria-busy="true" className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
                    <Skeleton shape="circle" className="h-12 w-12" />
                    <div className="space-y-2">
                      <Skeleton className="w-2/5" />
                      <Skeleton className="w-full" />
                      <Skeleton className="w-4/5" />
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Row gutter={[24, 24]}>
                <Col span={12} md={6}>
                  <Card loading={showLoadingPreview}>
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
                </Col>

                <Col span={12} md={6}>
                  <Card as="article" interactive role="button" tabIndex={0} aria-label="Open workspace settings" loading={showLoadingPreview}>
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
                </Col>
              </Row>
            </section>
          </div>
        </Layout.Content>
      </Layout>

      <Layout.Footer>
        © 2026 Catalyst. All rights reserved.
      </Layout.Footer>

      <Modal open={deleteModalOpen} onOpenChange={setDeleteModalOpen} size="sm" loading={showLoadingPreview}>
        <Modal.Header><Modal.Title>Delete project</Modal.Title></Modal.Header>
        <Modal.Body><p className="text-sm text-text-muted">This action cannot be undone. The project and its associated data will be permanently deleted.</p></Modal.Body>
        <Modal.Footer><Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => setDeleteModalOpen(false)}>Delete</Button></Modal.Footer>
      </Modal>
      <Modal open={detailsModalOpen} onOpenChange={setDetailsModalOpen} size="lg" loading={showLoadingPreview}>
        <Modal.Header><Modal.Title>Activity details</Modal.Title></Modal.Header>
        <Modal.Body className="space-y-4"><p className="text-sm text-text-muted">This longer example keeps actions visible while its body scrolls.</p>{Array.from({ length: 18 }, (_, index) => <div key={index} className="rounded-md border border-border bg-surface-hover px-3 py-3 text-sm text-text-muted">Activity update {index + 1}: workspace changes were recorded for the rollout plan.</div>)}</Modal.Body>
        <Modal.Footer><Button variant="primary" onClick={() => setDetailsModalOpen(false)}>Done</Button></Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default App;
