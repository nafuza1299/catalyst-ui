import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Tooltip } from './Tooltip'

const meta = {
  component: Tooltip,
  args: {
    content: 'Shows above the control',
    children: <Button variant="secondary">Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-16">
      <Tooltip content="Shows above the control" side="top">
        <Button variant="ghost" iconOnly aria-label="Top tooltip">T</Button>
      </Tooltip>
      <Tooltip content="Shows to the right" side="right">
        <Button variant="ghost" iconOnly aria-label="Right tooltip">R</Button>
      </Tooltip>
      <Tooltip content="Shows below the control" side="bottom">
        <Button variant="ghost" iconOnly aria-label="Bottom tooltip">B</Button>
      </Tooltip>
      <Tooltip content="Shows to the left" side="left">
        <Button variant="ghost" iconOnly aria-label="Left tooltip">L</Button>
      </Tooltip>
    </div>
  ),
}

// `side` is a preference, not a guarantee: Floating UI flips and shifts the
// tooltip when the preferred side would overflow the viewport. Narrow the
// preview pane to watch this one turn around.
export const FlipsWhenItWouldOverflow: Story = {
  render: () => (
    <div className="flex justify-end">
      <Tooltip content="Prefers the right, flips left when there is no room" side="right">
        <Button variant="secondary">Near the edge</Button>
      </Tooltip>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="p-16">
      <Tooltip content="Loaded hint" loading>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  ),
}
