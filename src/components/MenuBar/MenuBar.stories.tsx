import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { MenuBar } from './MenuBar'

const meta = { component: MenuBar } satisfies Meta<typeof MenuBar>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
//
// Slot-based rather than prop-driven: Brand, Nav and Actions are composed as
// children, so an app can put anything in them without new props.
const DefaultDemo = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <MenuBar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen}>
      <MenuBar.Brand>
        <span className="text-lg font-semibold text-primary">Catalyst</span>
      </MenuBar.Brand>
      <MenuBar.Nav>
        <MenuBar.Link href="#overview" active>Overview</MenuBar.Link>
        <MenuBar.Link href="#team">Team</MenuBar.Link>
        <MenuBar.Dropdown
          label="Products"
          items={[
            { key: 'analytics', label: 'Analytics', href: '#analytics' },
            { key: 'reports', label: 'Reports', href: '#reports' },
            { key: 'insights', label: 'Insights', href: '#insights' },
          ]}
        />
      </MenuBar.Nav>
      <MenuBar.Actions>
        <Button variant="primary" size="sm">Sign up</Button>
      </MenuBar.Actions>
    </MenuBar>
  )
}

// The horizontal nav is `hidden md:flex`; below 768px it collapses into a
// hamburger-triggered sheet. Narrow the preview pane to reach it.
const MobileSheetDemo = () => {
  const [mobileOpen, setMobileOpen] = useState(true)
  return (
    <MenuBar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen}>
      <MenuBar.Brand>
        <span className="text-lg font-semibold text-primary">Catalyst</span>
      </MenuBar.Brand>
      <MenuBar.Nav>
        <MenuBar.Link href="#overview" active>Overview</MenuBar.Link>
        <MenuBar.Link href="#team">Team</MenuBar.Link>
      </MenuBar.Nav>
      <MenuBar.Actions>
        <Button
          variant="ghost"
          iconOnly
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          ☰
        </Button>
      </MenuBar.Actions>
    </MenuBar>
  )
}

export const Default: Story = { render: () => <DefaultDemo /> }
export const MobileSheet: Story = { render: () => <MobileSheetDemo /> }

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <MenuBar {...args}>
      <MenuBar.Brand>Catalyst</MenuBar.Brand>
    </MenuBar>
  ),
}
