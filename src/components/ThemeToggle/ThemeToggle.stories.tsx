import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { ThemeToggle } from './ThemeToggle'

const meta = {
  component: ThemeToggle,
  // The only story file that wraps in ThemeProvider. Everywhere else the
  // toolbar sets [data-theme] on <html> directly, because the provider owns
  // that attribute from its own state and would fight the toolbar. Here the
  // provider IS the subject, so it takes the wheel — and this story's toggle
  // will override the toolbar for the whole preview iframe.
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Every token below resolves through the same [data-theme] attribute the
// toggle flips — nothing here knows what theme it is in.
export const DrivingTheTokens: Story = {
  render: () => (
    <Card className="max-w-sm">
      <Card.Header>
        <Card.Title>Theme</Card.Title>
        <Card.Description>One attribute on &lt;html&gt; drives all of this.</Card.Description>
      </Card.Header>
      <Card.Body className="flex items-center gap-3">
        <ThemeToggle />
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </Card.Body>
    </Card>
  ),
}
