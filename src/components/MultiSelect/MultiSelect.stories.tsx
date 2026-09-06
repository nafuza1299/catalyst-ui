import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { MultiSelect, type MultiSelectOption } from './MultiSelect'

const options: MultiSelectOption[] = [
  { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' },
  { value: 'amer', label: 'Americas' },
  { value: 'latam', label: 'LATAM' },
]

// Controlled: each story holds the value itself. These args only satisfy the
// required props on the type.
const meta = {
  component: MultiSelect,
  args: { label: 'Regions', options, value: [], onChange: () => {} },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
//
// Edits buffer while the menu is open and commit once on close, so a parent
// bound to `onChange` re-renders (and refetches) once per menu session rather
// than once per click. Watch the counter: the label moves on every pick, the
// commit count only when the menu closes.
const BuffersUntilCloseDemo = () => {
  const [value, setValue] = useState(['emea'])
  const [commits, setCommits] = useState(0)
  return (
    <div className="space-y-3">
      <MultiSelect
        label="Regions"
        options={options}
        value={value}
        onChange={(next) => {
          setValue(next)
          setCommits((c) => c + 1)
        }}
      />
      <p className="text-sm text-text-muted">onChange fired {commits} time(s)</p>
    </div>
  )
}

// min and max are enforced against the in-progress selection, not the committed
// one — so a blocked option goes aria-disabled the moment the buffer hits the
// limit, not after the menu closes.
const WithLimitsDemo = () => {
  const [value, setValue] = useState(['emea', 'apac'])
  return (
    <MultiSelect label="Regions" options={options} value={value} onChange={setValue} min={1} max={3} />
  )
}

export const BuffersUntilClose: Story = { render: () => <BuffersUntilCloseDemo /> }
export const WithLimits: Story = { render: () => <WithLimitsDemo /> }
