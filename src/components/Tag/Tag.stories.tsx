import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Tag, type TagColor } from './Tag'

const colors: TagColor[] = ['blue', 'green', 'amber', 'red', 'purple', 'gray']

const meta = {
  component: Tag,
  args: { children: 'Label' },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

// A categorical palette, deliberately separate from the action tokens: these
// colors carry no status meaning and are only reachable through Tag, so light
// and dark values stay paired.
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <Tag key={color} color={color}>
          {color}
        </Tag>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="sm" color="blue">Small</Tag>
      <Tag size="md" color="purple">Medium</Tag>
    </div>
  ),
}

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
const DismissibleDemo = () => {
  const [tags, setTags] = useState(['Bug', 'Regression', 'Blocked'])
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          color="red"
          dismissible
          onDismiss={() => setTags((current) => current.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span className="text-sm text-text-muted">All dismissed.</span>}
    </div>
  )
}

export const Dismissible: Story = { render: () => <DismissibleDemo /> }

export const Loading: Story = { args: { loading: true } }
