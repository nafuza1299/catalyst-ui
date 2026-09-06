import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Modal } from './Modal'

// Modal is fully controlled, so every story owns its own open state. These args
// exist only to satisfy the required props on the type.
const meta = {
  component: Modal,
  args: { open: false, onOpenChange: () => {} },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
const ConfirmationDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete project</Button>
      <Modal open={open} onOpenChange={setOpen} size="sm">
        <Modal.Header>
          <Modal.Title>Delete project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-text-muted">
            This action cannot be undone. The project and its associated data will be
            permanently deleted.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// The body scrolls; the header and footer do not. Actions stay reachable no
// matter how long the content runs.
const ScrollingBodyDemo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>View activity details</Button>
      <Modal open={open} onOpenChange={setOpen} size="lg">
        <Modal.Header>
          <Modal.Title>Activity details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          {Array.from({ length: 18 }, (_, index) => (
            <div
              key={index}
              className="rounded-md border border-border bg-surface-hover px-3 py-3 text-sm text-text-muted"
            >
              Activity update {index + 1}: workspace changes were recorded.
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const LoadingDemo = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen} loading>
        <Modal.Header>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Never seen while loading.</Modal.Body>
      </Modal>
    </>
  )
}

export const Confirmation: Story = { render: () => <ConfirmationDemo /> }
export const ScrollingBody: Story = { render: () => <ScrollingBodyDemo /> }
export const Loading: Story = { render: () => <LoadingDemo /> }
