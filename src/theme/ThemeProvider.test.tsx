import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

const STORAGE_KEY = 'design-system-theme'

// jsdom ships no matchMedia at all, and ThemeProvider calls it unguarded during
// its very first render — so it has to exist before any test mounts a provider.
const stubPrefersDark = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener() {},
      removeEventListener() {},
    }),
  })
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  stubPrefersDark(false)
})

// Reads the live context so each test can assert on the resolved theme and
// drive setTheme/toggleTheme without going through ThemeToggle's markup.
const Probe = () => {
  const { theme, setTheme, toggleTheme } = useTheme()
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>set dark</button>
      <button onClick={toggleTheme}>toggle</button>
    </>
  )
}

const renderProbe = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  )

describe('initial theme resolution', () => {
  it.each(['light', 'dark'] as const)('honours a stored %s preference', (stored) => {
    localStorage.setItem(STORAGE_KEY, stored)
    // Opposite OS preference, to prove storage wins rather than coincides.
    stubPrefersDark(stored === 'light')

    renderProbe()

    expect(screen.getByTestId('theme')).toHaveTextContent(stored)
    expect(document.documentElement.dataset.theme).toBe(stored)
  })

  it('falls back to the OS preference when nothing is stored', () => {
    stubPrefersDark(true)

    renderProbe()

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('ignores a stored value that is not a theme', () => {
    localStorage.setItem(STORAGE_KEY, 'purple')
    stubPrefersDark(true)

    renderProbe()

    // Falls through to matchMedia rather than trusting the junk value.
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })
})

describe('updates', () => {
  it('persists the theme it resolves to, so the next load skips matchMedia', () => {
    stubPrefersDark(true)

    renderProbe()

    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
  })

  it('setTheme writes through to the document and storage', async () => {
    const user = userEvent.setup()
    renderProbe()

    await user.click(screen.getByRole('button', { name: 'set dark' }))

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
  })

  it('toggleTheme flips in both directions', async () => {
    const user = userEvent.setup()
    renderProbe()
    const toggle = screen.getByRole('button', { name: 'toggle' })

    await user.click(toggle)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')

    await user.click(toggle)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })
})

describe('useTheme', () => {
  it('refuses to resolve outside a provider', () => {
    // React logs the thrown error on its way up; silence it so the run stays readable.
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Probe />)).toThrow('useTheme must be used within ThemeProvider')

    consoleError.mockRestore()
  })
})
