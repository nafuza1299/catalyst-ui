// Jest scaffold for Button component coverage.
// This project does not yet include a Jest runtime, but the generated test file
// follows the project convention for future unit-test generation.

export const buttonTestScaffold = {
  defaultVariant: "primary",
  supportedVariants: ["primary", "secondary", "ghost", "destructive"],
  supportedSizes: ["sm", "md", "lg"],
  checks: [
    "renders children",
    "applies the default variant",
    "applies the selected size",
    "disables interaction while loading",
    "respects iconOnly accessibility requirements",
  ],
};
