import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Card } from './Card'

const meta = { component: Card } satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const WithSections: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <Card.Header>
        <Card.Title>Team members</Card.Title>
        <Card.Description>Manage who has access to this workspace.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-text-muted">Two people can edit this project.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  ),
}

// `interactive` only supplies the hover and focus affordance. The caller still
// owns the role, tabIndex and label that make the card actually operable.
export const Interactive: Story = {
  render: (args) => (
    <Card
      {...args}
      interactive
      role="button"
      tabIndex={0}
      aria-label="Open workspace settings"
      className="max-w-md"
    >
      <Card.Body>
        <p className="text-sm text-text-muted">Workspace</p>
        <h3 className="mt-1 text-lg font-semibold text-text">Q3 rollout planning</h3>
      </Card.Body>
    </Card>
  ),
}

export const Loading: Story = {
  args: { loading: true },
  render: (args) => <Card {...args} className="max-w-md" />,
}
