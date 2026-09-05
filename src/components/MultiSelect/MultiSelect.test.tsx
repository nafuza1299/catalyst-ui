import { render, screen } from '@testing-library/react'
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
})
