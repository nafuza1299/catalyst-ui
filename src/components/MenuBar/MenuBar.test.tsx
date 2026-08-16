import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuBar } from './MenuBar';

describe('MenuBar Component', () => {
  it('renders brand section', () => {
    render(
      <MenuBar>
        <MenuBar.Brand>Logo</MenuBar.Brand>
        <MenuBar.Nav />
        <MenuBar.Actions />
      </MenuBar>
    );

    const logos = screen.getAllByText('Logo');
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders with brand, nav, and actions', () => {
    render(
      <MenuBar>
        <MenuBar.Brand>Catalyst</MenuBar.Brand>
        <MenuBar.Nav>
          <MenuBar.Link href="#home">Home</MenuBar.Link>
        </MenuBar.Nav>
        <MenuBar.Actions>
          <button>Sign up</button>
        </MenuBar.Actions>
      </MenuBar>
    );

    const signUp = screen.getByRole('button', { name: /sign up/i });
    expect(signUp).toBeInTheDocument();
  });

  it('renders link with active state', () => {
    render(
      <MenuBar.Link href="#home" active>
        Home
      </MenuBar.Link>
    );

    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('renders dropdown menu', () => {
    render(
      <MenuBar.Dropdown
        label="Menu"
        items={[
          { key: 'item1', label: 'Item 1' },
          { key: 'item2', label: 'Item 2' },
        ]}
      />
    );

    const trigger = screen.getByRole('button', { name: /menu/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens dropdown menu on click', async () => {
    const user = userEvent.setup();
    render(
      <MenuBar.Dropdown
        label="Menu"
        items={[
          { key: 'item1', label: 'Item 1' },
          { key: 'item2', label: 'Item 2' },
        ]}
      />
    );

    const trigger = screen.getByRole('button', { name: /menu/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders controlled mobile sheet state', () => {
    render(
      <MenuBar mobileOpen={true} onMobileOpenChange={() => {}}>
        <MenuBar.Brand>Logo</MenuBar.Brand>
        <MenuBar.Nav />
        <MenuBar.Actions />
      </MenuBar>
    );

    // Component renders without error with controlled props
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('renders nav links as anchors when href is provided', () => {
    const { container } = render(
      <MenuBar.Link href="/about">About</MenuBar.Link>
    );

    const link = container.querySelector('a[href="/about"]');
    expect(link).toBeInTheDocument();
  });

  it('renders nav link as button when no href is provided', () => {
    render(
      <MenuBar.Link>Action</MenuBar.Link>
    );

    const button = screen.getByRole('button', { name: /action/i });
    expect(button).toBeInTheDocument();
  });

  it('renders brand component', () => {
    const { container } = render(
      <MenuBar.Brand>My Brand</MenuBar.Brand>
    );

    expect(container.textContent).toContain('My Brand');
  });

  it('renders nav component', () => {
    const { container } = render(
      <MenuBar.Nav>
        <MenuBar.Link href="#item">Item</MenuBar.Link>
      </MenuBar.Nav>
    );

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders actions component', () => {
    render(
      <MenuBar.Actions>
        <button>Action</button>
      </MenuBar.Actions>
    );

    const button = screen.getByRole('button', { name: /action/i });
    expect(button).toBeInTheDocument();
  });
});
