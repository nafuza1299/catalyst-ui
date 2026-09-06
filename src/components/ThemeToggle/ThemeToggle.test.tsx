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

beforeEach(() => {
  localStorage.clear()
  // ThemeProvider reads [data-theme] before localStorage, and every test shares one
  // jsdom document — so without this, one test's final theme becomes the next test's
  // initial theme and the failure looks like it belongs to the wrong test.
  document.documentElement.removeAttribute('data-theme')
})

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

  // The SSR contract. An SSR host sets [data-theme] from a blocking <script> before
  // React hydrates, so the attribute is what the server HTML was already rendered
  // against. It has to outrank localStorage, or the first client render disagrees
  // with the markup and React reports a hydration mismatch. Disagreeing values here
  // are the point, not a contrived setup.
  it('takes its initial theme from [data-theme], not localStorage', () => {
    localStorage.setItem('design-system-theme', 'light')
    document.documentElement.dataset.theme = 'dark'

    renderToggle()

    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeTruthy()
  })
})
