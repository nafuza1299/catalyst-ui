import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = { component: Skeleton } satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Shapes: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <Skeleton shape="text" />
      <Skeleton shape="circle" className="h-12 w-12" />
      <Skeleton shape="rect" className="h-20 w-full" />
    </div>
  ),
}

// The region announces itself, not each bar: one `role="status"` wrapper with
// aria-busy, rather than four placeholders all shouting at a screen reader.
export const AsALoadingRegion: Story = {
  render: () => (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading profile"
      className="grid w-80 gap-4 sm:grid-cols-[auto_1fr] sm:items-center"
    >
      <Skeleton shape="circle" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="w-2/5" />
        <Skeleton className="w-full" />
        <Skeleton className="w-4/5" />
      </div>
    </div>
  ),
}
