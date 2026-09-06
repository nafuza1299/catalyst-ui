import { test, expect, type Page } from '@playwright/test'

// Everything here runs at the Desktop Chrome default (1280px) on purpose.
// SideNav and MenuBar keep their closed mobile drawers mounted, so below
// 1024px every nav item exists twice and the bare role queries below go
// ambiguous. Do not resize these tests.

const STORAGE_KEY = 'design-system-theme'

// ThemeProvider reads localStorage before it ever consults matchMedia, so
// seeding it makes the theme deterministic regardless of the runner's OS.
const seedTheme = (page: Page, theme: 'light' | 'dark') =>
  page.addInitScript(
    ([key, value]) => window.localStorage.setItem(key, value),
    [STORAGE_KEY, theme] as const
  )

test.beforeEach(async ({ page }) => {
  await seedTheme(page, 'light')
  await page.goto('/')
})

test('renders the app shell', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: 'Product overview' })).toBeVisible()
  await expect(page.getByText('Performance')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible()

  for (const tag of ['+12.4%', '8 active projects', '2 alerts']) {
    await expect(page.getByText(tag, { exact: true })).toBeVisible()
  }

  await expect(page.getByText('© 2026 Catalyst. All rights reserved.')).toBeVisible()
})

test('selecting a sidebar item swaps the content pane', async ({ page }) => {
  // SideNav items are buttons; the MenuBar's "Team" is a link.
  await page.getByRole('button', { name: 'Team' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Team workspace' })).toBeVisible()
  await expect(page.getByText('People')).toBeVisible()

  // exact: the "Q3 rollout planning" card is also a button, labelled
  // "Open workspace settings".
  await page.getByRole('button', { name: 'Settings', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Workspace settings' })).toBeVisible()
})

test('the menu bar dropdown opens, then Escape closes it and restores focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Products' })
  await trigger.click()

  const menu = page.getByRole('menu')
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('menuitem')).toHaveText(['Analytics', 'Reports', 'Insights'])

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()
})

// Floating UI positioning plus a real hover delay — the one thing the jsdom
// suite genuinely cannot see.
test('tooltips appear on hover and on keyboard focus', async ({ page }) => {
  await page.getByRole('button', { name: 'Top tooltip' }).hover()
  await expect(page.getByRole('tooltip', { name: 'Shows above the control' })).toBeVisible()

  // Queried by name, not by bare role: the pointer is still resting on the
  // first button, so its tooltip is legitimately still open too.
  await page.getByRole('button', { name: 'Right tooltip' }).focus()
  await expect(page.getByRole('tooltip', { name: 'Shows to the right' })).toBeVisible()
})

test('the filters popover submits and closes', async ({ page }) => {
  await page.getByRole('button', { name: 'Filters' }).click()

  const popover = page.getByRole('dialog')
  await expect(popover.getByLabel('Status')).toBeVisible()

  await popover.getByRole('button', { name: 'Apply filters' }).click()
  await expect(popover).toBeHidden()
})

test('the delete modal locks scroll, closes on Escape and restores focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Delete project' })
  await trigger.click()

  const modal = page.getByRole('dialog', { name: 'Delete project' })
  await expect(modal).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  await page.keyboard.press('Escape')
  await expect(modal).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

test('the year range commits on the second click, in either order', async ({ page }) => {
  const trigger = page.getByRole('button', { name: /2018 – 2024/ })
  // The panel is position:fixed and anchored under the trigger, so it hangs off
  // the bottom of the viewport (and page scroll cannot reach it) unless the
  // trigger is high on screen when it opens. See "Known trade-offs" in the README.
  await trigger.evaluate((el) => el.scrollIntoView({ block: 'start' }))
  await trigger.click()

  const panel = page.getByRole('dialog', { name: 'Years year picker' })
  await panel.getByRole('button', { name: '2010', exact: true }).click()
  await panel.getByRole('button', { name: '2015', exact: true }).click()

  await expect(panel).toBeHidden()
  await expect(page.getByRole('button', { name: /2010 – 2015/ })).toBeVisible()

  // Clicking the later year first must normalise to the same range.
  await page.getByRole('button', { name: /2010 – 2015/ }).click()
  await panel.getByRole('button', { name: '2020', exact: true }).click()
  await panel.getByRole('button', { name: '2012', exact: true }).click()

  await expect(page.getByRole('button', { name: /2012 – 2020/ })).toBeVisible()
})

// The jsdom suite can only drive this through "Select all": jsdom blurs the
// input on mousedown into the portalled menu and closes it, so consecutive
// option clicks are only observable in a real browser.
test('the multi-select buffers option picks and commits on close', async ({ page }) => {
  const label = page.getByText(/^Regions \(\d\)$/)
  await expect(label).toHaveText('Regions (2)')

  await page.getByLabel('Regions').click()
  const listbox = page.getByRole('listbox')

  await listbox.getByText('Americas').click()
  await expect(listbox).toBeVisible() // still open — closeMenuOnSelect={false}
  await expect(label).toHaveText('Regions (3)')

  // max is 3 of 4 options, so the last one is now refused.
  await listbox.getByText('LATAM').click()
  await expect(label).toHaveText('Regions (3)')

  await page.keyboard.press('Escape')
  await expect(listbox).toBeHidden()
  await expect(label).toHaveText('Regions (3)')

  await page.getByRole('button', { name: 'Remove EMEA tag' }).click()
  await expect(label).toHaveText('Regions (2)')
})

// A composed state that the per-component jsdom tests only ever see in
// isolation: one toggle puts seven components into their skeletons at once.
test('the loading preview swaps every component into a skeleton', async ({ page }) => {
  const toggle = page.getByRole('button', { name: 'Preview loading' })
  await expect(page.getByText('Alicia Gomez')).toBeVisible()

  await toggle.click()

  await expect(page.getByRole('button', { name: 'Show content' })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  // Four exist, two render: the MenuBar's and SideNav's mobile drawers stay
  // mounted but are display:none at this width. If this ever reads 4 visible,
  // a drawer stopped being hidden and every bare role query here is newly
  // ambiguous — which is exactly the regression worth catching.
  await expect(page.getByLabel('Loading navigation')).toHaveCount(4)
  await expect(page.getByLabel('Loading navigation').locator('visible=true')).toHaveCount(2)
  await expect(page.getByText('Alicia Gomez')).toBeHidden()
})
