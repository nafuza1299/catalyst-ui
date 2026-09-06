import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'

// Stories are deliberately NOT wrapped in ThemeProvider: it writes data-theme
// from its own state and persists to localStorage, so it would fight this
// toolbar and leak a sticky theme between stories. The [data-theme] attribute
// on <html> is the contract src/styles/tokens.css actually consumes, so the
// decorator below sets it directly. ThemeToggle.stories.tsx opts back in
// locally, because the provider is the thing that story demonstrates.
const preview: Preview = {
  tags: ['autodocs'],
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Color theme applied via [data-theme] on <html>',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute('data-theme', String(context.globals.theme))
      return Story()
    },
  ],
}

export default preview
