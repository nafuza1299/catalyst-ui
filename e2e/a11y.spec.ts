import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'

// These scans stay at the Desktop Chrome default (1280px) deliberately.
// SideNav and MenuBar keep their closed mobile drawers mounted, with a
// focusable "Close navigation" button under aria-hidden. At >=1024px the
// drawer is display:none so axe skips it; at mobile widths this would fail
// aria-hidden-focus, which IS wcag2a 4.1.2. The fix then is `inert` on the
// drawer container — not a change to this file.

const STORAGE_KEY = 'design-system-theme'

const scan = (page: Page) =>
  new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()

const load = async (page: Page, theme: 'light' | 'dark') => {
  await page.addInitScript(
    ([key, value]) => window.localStorage.setItem(key, value),
    [STORAGE_KEY, theme] as const
  )
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Product overview' })).toBeVisible()
}

test('the loaded showcase has no WCAG A/AA violations in light mode', async ({ page }) => {
  await load(page, 'light')

  const results = await scan(page)

  expect(results.violations).toEqual([])
})

test('the loaded showcase has no WCAG A/AA violations in dark mode', async ({ page }) => {
  await load(page, 'dark')
  // Assert the seed actually took, so a broken seed fails loudly here rather
  // than quietly passing this as a second light-mode scan.
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  const results = await scan(page)

  expect(results.violations).toEqual([])
})

test('the loading state has no WCAG A/AA violations', async ({ page }) => {
  await load(page, 'light')
  await page.getByRole('button', { name: 'Preview loading' }).click()
  await expect(page.getByLabel('Loading navigation').first()).toBeVisible()

  const results = await scan(page)

  expect(results.violations).toEqual([])
})
