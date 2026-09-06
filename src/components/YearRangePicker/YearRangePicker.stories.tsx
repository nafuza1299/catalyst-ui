import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { YearRangePicker } from './YearRangePicker'

// Controlled: each story holds the range itself. These args only satisfy the
// required props on the type.
const meta = {
  component: YearRangePicker,
  args: { label: 'Years', value: [2018, 2024], onChange: () => {}, min: 2000, max: 2026 },
} satisfies Meta<typeof YearRangePicker>

export default meta
type Story = StoryObj<typeof meta>

// Stateful stories live in named components, not inline `render` closures —
// hooks in an anonymous callback are invisible to React's rules-of-hooks.
//
// Two clicks make a range, in either order: the first sets one endpoint, the
// second sets the other, and the pair is normalised before it commits.
const TwoClickRangeDemo = () => {
  const [years, setYears] = useState<[number, number]>([2018, 2024])
  return <YearRangePicker label="Years" value={years} onChange={setYears} min={2000} max={2026} />
}

// The panel is portalled to <body> precisely so an overflow-hidden ancestor
// like this one cannot clip it.
const InsideAClippingAncestorDemo = () => {
  const [years, setYears] = useState<[number, number]>([2020, 2022])
  return (
    <div className="h-24 w-72 overflow-hidden rounded-lg border border-border p-4">
      <YearRangePicker label="Years" value={years} onChange={setYears} min={2010} max={2026} />
    </div>
  )
}

export const TwoClickRange: Story = { render: () => <TwoClickRangeDemo /> }
export const InsideAClippingAncestor: Story = { render: () => <InsideAClippingAncestorDemo /> }
