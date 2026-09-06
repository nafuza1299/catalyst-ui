import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { MultiSelect, type MultiSelectOption } from './MultiSelect'

const options: MultiSelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

const Harness = ({ onChange, ...rest }: { onChange?: (next: string[]) => void; max?: number; min?: number }) => {
  const [value, setValue] = useState<string[]>(['a'])
  return (
    <MultiSelect
      label="Letters"
      options={options}
      value={value}
      onChange={(next) => {
        setValue(next)
        onChange?.(next)
      }}
      {...rest}
    />
  )
}

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByLabelText('Letters'))
}

// A selected option's label appears twice — once as a chip, once in the menu —
// so menu clicks have to be scoped to the listbox.
const option = (label: string) => within(screen.getByRole('listbox')).getByText(label)

describe('MultiSelect', () => {
  it('renders a chip per selection and removes one on dismiss', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Harness onChange={onChange} />)

    expect(screen.getByText('Letters (1)')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove Alpha tag' }))

    expect(onChange).toHaveBeenCalledWith([])
    expect(screen.getByText('Letters (0)')).toBeInTheDocument()
  })

  it('keeps the last chip when min is 1', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Harness onChange={onChange} min={1} />)

    await user.click(screen.getByRole('button', { name: 'Remove Alpha tag' }))

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByText('Letters (1)')).toBeInTheDocument()
  })

  it('selects all up to max and clears down to min', async () => {
    const user = userEvent.setup()
    render(<Harness min={1} max={2} />)

    await openMenu(user)
    await user.click(screen.getByText('Select all'))
    expect(screen.getByText('Letters (2)')).toBeInTheDocument()

    await user.click(screen.getByText('Clear all'))
    expect(screen.getByText('Letters (1)')).toBeInTheDocument()
  })

  // The whole point of the buffer: a parent bound to `onChange` re-renders (and
  // may refetch) once per menu session, not once per click. The live count is
  // the only thing that moves while the menu is open.
  //
  // Driven through "Select all" rather than two option clicks on purpose. In a
  // real browser (see e2e/showcase.spec.ts) clicking an option leaves the menu
  // open, but jsdom blurs the input on mousedown into the portalled menu and
  // closes it — so consecutive option clicks are untestable here.
  it('buffers a bulk pick while the menu is open and commits once on close', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Harness onChange={onChange} />)

    await openMenu(user)
    await user.click(screen.getByText('Select all'))

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByText('Letters (3)')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(['a', 'b', 'c'])
  })

  it('stops accepting picks at max without closing the menu', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Harness onChange={onChange} max={1} />)

    await openMenu(user)
    await user.click(option('Beta'))

    expect(screen.getByText('Letters (1)')).toBeInTheDocument()
    expect(screen.getByRole('listbox')).toBeInTheDocument() // menu stayed open

    await user.keyboard('{Escape}')
    expect(onChange).toHaveBeenCalledWith(['a'])
  })

  it('refuses to deselect the last pick from inside the menu when min is 1', async () => {
    const user = userEvent.setup()
    render(<Harness min={1} />)

    await openMenu(user)
    await user.click(option('Alpha'))

    expect(screen.getByText('Letters (1)')).toBeInTheDocument()
  })

  it('hides each bulk action once it would be a no-op', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await openMenu(user)
    await user.click(screen.getByText('Select all'))
    expect(screen.queryByText('Select all')).not.toBeInTheDocument()

    await user.click(screen.getByText('Clear all'))
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
    expect(screen.getByText('Letters (0)')).toBeInTheDocument()
  })
})
