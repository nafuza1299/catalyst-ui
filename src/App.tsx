import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { useTheme } from "./theme/ThemeProvider";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text p-8 sm:p-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">Catalyst UI — Card</h1>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </Button>
        </div>

        <section className="space-y-6">
          <div>
            <p className="mb-3 text-sm text-text-muted">Simple content card</p>
            <Card as="article">
              <Card.Body>
                <p className="text-sm text-text-muted">Performance overview</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold text-text">84%</p>
                    <p className="mt-1 text-sm text-text-muted">Activation rate</p>
                  </div>
                  <span className="rounded-md bg-surface-hover px-2 py-1 text-xs font-medium text-text-muted">
                    +12.4%
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div>
            <p className="mb-3 text-sm text-text-muted">Header + footer</p>
            <Card>
              <Card.Header>
                <Card.Title>Team members</Card.Title>
                <Card.Description>Manage who has access</Card.Description>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-md border border-border bg-surface-hover px-3 py-2">
                    <div>
                      <p className="font-medium text-text">Alicia Gomez</p>
                      <p className="text-sm text-text-muted">Product lead</p>
                    </div>
                    <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-muted">
                      Owner
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-border bg-surface-hover px-3 py-2">
                    <div>
                      <p className="font-medium text-text">Liam Chen</p>
                      <p className="text-sm text-text-muted">Design systems</p>
                    </div>
                    <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-muted">
                      Editor
                    </span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Save</Button>
              </Card.Footer>
            </Card>
          </div>

          <div>
            <p className="mb-3 text-sm text-text-muted">Interactive card</p>
            <Card
              as="article"
              interactive
              role="button"
              tabIndex={0}
              aria-label="Open workspace settings"
            >
              <Card.Body>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-text-muted">Workspace</p>
                    <h3 className="mt-1 text-lg font-semibold text-text">Q3 rollout planning</h3>
                  </div>
                  <span className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-muted">
                    View
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
