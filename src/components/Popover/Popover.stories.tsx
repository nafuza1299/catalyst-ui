import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Popover } from './Popover'

// Controlled: each story holds the open state in `render`. These args only
// satisfy the required props on the type.
const meta = {
  component: Popover,
  args: {
    open: false,
    onOpenChange: () => {},
    trigger: <Button variant="secondary">Filters</Button>,
    children: null,
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
const WithAFormDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-16">
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Filters</Button>}
      >
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
        >
          <div>
            <label htmlFor="sb-status" className="block text-sm font-medium">Status</label>
            <select
              id="sb-status"
              className="mt-1 w-full rounded-md border border-border bg-bg px-2 py-1.5 text-sm"
            >
              <option>All projects</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
          </div>
          <Button type="submit" size="sm">Apply filters</Button>
        </form>
      </Popover>
    </div>
  )
}

const LoadingDemo = () => {
  const [open, setOpen] = useState(true)
  return (
    <div className="p-16">
      <Popover
        open={open}
        onOpenChange={setOpen}
        loading
        trigger={<Button variant="secondary">Filters</Button>}
      >
        <p>Never seen while loading.</p>
      </Popover>
    </div>
  )
}

export const WithAForm: Story = { render: () => <WithAFormDemo /> }
export const Loading: Story = { render: () => <LoadingDemo /> }
