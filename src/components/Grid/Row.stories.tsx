import type { Meta, StoryObj } from '@storybook/react-vite'
import { Col } from './Col'
import { Row } from './Row'

const meta = { component: Row } satisfies Meta<typeof Row>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-border bg-surface-hover px-3 py-4 text-center text-sm text-text-muted">
    {children}
  </div>
)

// A 12-column grid. `span` applies at the base breakpoint, `sm`/`md`/`lg`
// override it upward — so this row is one column on a phone and three on a
// desktop. Resize the preview to see it fold.
export const Responsive: Story = {
  render: () => (
    <Row gutter={[16, 16]}>
      <Col span={12} md={4}><Cell>span 12, md 4</Cell></Col>
      <Col span={12} md={4}><Cell>span 12, md 4</Cell></Col>
      <Col span={12} md={4}><Cell>span 12, md 4</Cell></Col>
    </Row>
  ),
}

// The gutter is a tuple: horizontal first, then vertical.
export const Gutters: Story = {
  render: () => (
    <div className="space-y-8">
      <Row gutter={8}>
        <Col span={6}><Cell>gutter 8</Cell></Col>
        <Col span={6}><Cell>gutter 8</Cell></Col>
      </Row>
      <Row gutter={[32, 8]}>
        <Col span={6}><Cell>gutter [32, 8]</Cell></Col>
        <Col span={6}><Cell>gutter [32, 8]</Cell></Col>
      </Row>
    </div>
  ),
}

export const Offset: Story = {
  render: () => (
    <Row gutter={[16, 16]}>
      <Col span={4} offset={4}><Cell>span 4, offset 4</Cell></Col>
      <Col span={4}><Cell>span 4</Cell></Col>
    </Row>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Row gutter={16} align="middle" justify="center">
      <Col span={3}><Cell>short</Cell></Col>
      <Col span={3}>
        <Cell>
          a taller cell
          <br />
          with two lines
        </Cell>
      </Col>
    </Row>
  ),
}
