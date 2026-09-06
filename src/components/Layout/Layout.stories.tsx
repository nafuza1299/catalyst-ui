import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Card } from '../Card/Card'
import { SideNav, type SideNavItem } from '../SideNav/SideNav'
import { Layout } from './Layout'

const items: SideNavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'team', label: 'Team' },
]

const meta = { component: Layout } satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
//
// The nesting is the API: the outer Layout stacks Header/body/Footer, and an
// inner `Layout hasSider` turns the body into a Sider + Content row. That is
// why there is no `siderPosition` prop — arrangement is composition.
const AppShellDemo = () => {
  const [activeKey, setActiveKey] = useState('overview')
  return (
    <Layout className="h-[32rem] min-h-0 border border-border">
      <Layout.Header className="border-b border-border bg-surface px-4 py-3 text-sm font-semibold">
        Catalyst
      </Layout.Header>

      <Layout hasSider className="min-h-0">
        <Layout.Sider width={200}>
          <SideNav items={items} activeKey={activeKey} onSelect={setActiveKey} />
        </Layout.Sider>
        <Layout.Content>
          <Card>
            <Card.Header>
              <Card.Title>Page content</Card.Title>
            </Card.Header>
            <Card.Body>Content scrolls; the header, sider and footer do not.</Card.Body>
          </Card>
        </Layout.Content>
      </Layout>

      <Layout.Footer>© 2026 Catalyst</Layout.Footer>
    </Layout>
  )
}

// Layout itself does no responsive collapsing — it only animates to width 0
// when told to. The breakpoint logic lives in SideNav and MenuBar.
const CollapsibleSiderDemo = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout hasSider className="h-64 border border-border">
      <Layout.Sider width={200} collapsible collapsed={collapsed}>
        <div className="p-4 text-sm text-text-muted">Sider</div>
      </Layout.Sider>
      <Layout.Content>
        <button
          type="button"
          className="rounded-md border border-border px-3 py-1.5 text-sm"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? 'Expand' : 'Collapse'} sider
        </button>
      </Layout.Content>
    </Layout>
  )
}

export const AppShell: Story = { render: () => <AppShellDemo /> }
export const CollapsibleSider: Story = { render: () => <CollapsibleSiderDemo /> }
