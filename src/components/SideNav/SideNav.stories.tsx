import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SideNav, type SideNavItem } from './SideNav'

const items: SideNavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'team', label: 'Team' },
  { key: 'settings', label: 'Settings' },
]

const meta = { component: SideNav, args: { items } } satisfies Meta<typeof SideNav>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
//
// Routing-agnostic on purpose: it takes `activeKey` and `onSelect` rather than
// depending on React Router or Next's Link, so it drops into either.
const DesktopDemo = () => {
  const [activeKey, setActiveKey] = useState('overview')
  return (
    <div className="flex h-96">
      <SideNav items={items} activeKey={activeKey} onSelect={setActiveKey} />
    </div>
  )
}

// The desktop rail is `hidden lg:flex`, so below 1024px only the drawer
// renders. Narrow the preview pane to see this story do anything.
const MobileDrawerDemo = () => {
  const [open, setOpen] = useState(true)
  const [activeKey, setActiveKey] = useState('team')
  return (
    <div className="h-96">
      <SideNav
        items={items}
        activeKey={activeKey}
        onSelect={setActiveKey}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}

export const Desktop: Story = { render: () => <DesktopDemo /> }
export const MobileDrawer: Story = { render: () => <MobileDrawerDemo /> }

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="flex h-96">
      <SideNav {...args} />
    </div>
  ),
}
