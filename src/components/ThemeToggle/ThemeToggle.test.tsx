import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../../theme/ThemeProvider'

// jsdom ships no matchMedia; ThemeProvider reads it for the OS default.
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }),
  })
})

beforeEach(() => localStorage.clear())

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )

describe('ThemeToggle', () => {
  it('flips the document theme and its own label', async () => {
    const user = userEvent.setup()
    renderToggle()

    const button = screen.getByRole('button', { name: 'Switch to dark mode' })
    await user.click(button)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBe(button)
  })
})
