import { createRef } from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { Layout } from './Layout'

const setWidth = (px: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: px })
}

const resizeTo = (px: number) => {
  act(() => {
    setWidth(px)
    fireEvent(window, new Event('resize'))
  })
}

// jsdom defaults to 1024, which is exactly the `lg` breakpoint — restore it
// between tests so each one starts in the non-mobile branch.
afterEach(() => setWidth(1024))

describe('Layout root', () => {
  it('stacks vertically by default', () => {
    const { container } = render(<Layout>body</Layout>)
    const root = container.firstElementChild as HTMLElement

    expect(root).toHaveClass('flex', 'flex-col', 'min-h-screen')
    expect(root).not.toHaveClass('flex-row')
  })

  it('switches to a row that fills its parent when hasSider', () => {
    const { container } = render(<Layout hasSider className="custom">body</Layout>)
    const root = container.firstElementChild as HTMLElement

    expect(root).toHaveClass('flex', 'flex-row', 'flex-1', 'custom')
    expect(root).not.toHaveClass('min-h-screen')
  })
})

describe('Layout slots', () => {
  it.each([
    ['Header', Layout.Header, 'header'],
    ['Content', Layout.Content, 'main'],
    ['Footer', Layout.Footer, 'footer'],
  ] as const)('%s renders a <%s>, merges className and forwards ref', (_name, Slot, tag) => {
    const ref = createRef<HTMLElement & HTMLDivElement>()
    const { container } = render(
      <Slot ref={ref as never} className="mine">
        content
      </Slot>
    )
    const el = container.firstElementChild as HTMLElement

    expect(el.tagName.toLowerCase()).toBe(tag)
    // Content grows into the row; Header and Footer hold their intrinsic height.
    expect(el).toHaveClass('mine', tag === 'main' ? 'flex-1' : 'flex-shrink-0')
    expect(ref.current).toBe(el)
    expect(el).toHaveTextContent('content')
  })
})

describe('Layout.Sider', () => {
  it('keeps its computed width when a style prop is passed', () => {
    const { container } = render(<Layout.Sider width={240} style={{ background: 'red' }} />)
    const aside = container.querySelector('aside') as HTMLElement

    expect(aside).toHaveStyle({ width: '240px', background: 'red' })
  })

  it('defaults to 240px and honours a custom width', () => {
    const { container, rerender } = render(<Layout.Sider>nav</Layout.Sider>)
    const aside = container.querySelector('aside') as HTMLElement
    expect(aside).toHaveStyle({ width: '240px' })

    rerender(<Layout.Sider width={320}>nav</Layout.Sider>)
    expect(aside).toHaveStyle({ width: '320px' })
  })

  it('collapses to zero width when collapsible and collapsed', () => {
    const { container } = render(<Layout.Sider collapsible collapsed />)
    expect(container.querySelector('aside')).toHaveStyle({ width: '0px' })
  })

  it('ignores collapsed unless collapsible', () => {
    const { container } = render(<Layout.Sider collapsed />)
    expect(container.querySelector('aside')).toHaveStyle({ width: '240px' })
  })

  it('collapses below the breakpoint and reports the crossing', () => {
    const onCollapse = jest.fn()
    const { container } = render(<Layout.Sider collapsible onCollapse={onCollapse} />)
    const aside = container.querySelector('aside') as HTMLElement

    // Mount lands at 1024 === the `lg` breakpoint, i.e. not mobile.
    expect(onCollapse).not.toHaveBeenCalled()
    expect(aside).toHaveStyle({ width: '240px' })

    resizeTo(800)
    expect(onCollapse).toHaveBeenLastCalledWith(true)
    expect(aside).toHaveStyle({ width: '0px' })

    resizeTo(1200)
    expect(onCollapse).toHaveBeenLastCalledWith(false)
    expect(aside).toHaveStyle({ width: '240px' })
    expect(onCollapse).toHaveBeenCalledTimes(2)
  })

  it('does not report crossings when not collapsible', () => {
    const onCollapse = jest.fn()
    const { container } = render(<Layout.Sider onCollapse={onCollapse} />)

    resizeTo(800)

    expect(onCollapse).not.toHaveBeenCalled()
    // still hides itself, it just does not notify
    expect(container.querySelector('aside')).toHaveStyle({ width: '0px' })
  })

  it.each([
    ['sm', 640],
    ['md', 768],
  ] as const)('uses the %s breakpoint (%ipx)', (breakpoint, px) => {
    const onCollapse = jest.fn()
    render(<Layout.Sider collapsible breakpoint={breakpoint} onCollapse={onCollapse} />)

    resizeTo(px) // exactly at the breakpoint is still desktop
    expect(onCollapse).not.toHaveBeenCalled()

    resizeTo(px - 1)
    expect(onCollapse).toHaveBeenCalledWith(true)
  })

  it('forwards ref and merges className', () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = render(<Layout.Sider ref={ref} className="mine" />)
    const aside = container.querySelector('aside')

    expect(aside).toHaveClass('mine', 'bg-surface')
    expect(ref.current).toBe(aside)
  })
})
