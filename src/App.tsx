import { Button } from "./components/Button/Button";
import { useTheme } from "./theme/ThemeProvider";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text p-8 sm:p-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-semibold">Catalyst UI — Button</h1>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </Button>
        </div>

        <section className="space-y-6">
          <div>
            <p className="text-sm text-text-muted mb-3">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-text-muted mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-text-muted mb-3">States</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button loading>Saving…</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
