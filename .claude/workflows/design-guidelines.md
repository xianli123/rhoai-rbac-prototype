# Design Guidelines

## PatternFly Design System

This project strictly adheres to the PatternFly design system. Always reference:
- **PatternFly docs MCP server** for the latest component documentation, design guidelines, and accessibility standards
- Component guidelines in `ai-documentation/components/`
- Styling standards in `ai-documentation/guidelines/styling-standards.md`

**Important**: Use the `patternfly-docs` MCP server to access up-to-date PatternFly documentation when working on any design or reviewing components.

## Visual Design

### Color
- Use PatternFly semantic design tokens
- Ensure sufficient color contrast (WCAG AA minimum)
- Reference PatternFly color palette

### Typography
- Use PatternFly typography scale
- Follow text hierarchy guidelines
- Ensure readable font sizes (minimum 14px for body text)

### Spacing
- Use PatternFly spacing tokens
- Maintain consistent spacing throughout the application
- Follow 8px grid system

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Proper ARIA labels and roles
- Focus indicators on all focusable elements

### Screen Reader Support
- Semantic HTML elements
- Descriptive alt text for images
- Proper heading hierarchy
- Form labels and error messages

## Component Usage

### Do's
- ✓ Use PatternFly components as-is
- ✓ Follow component documentation
- ✓ Add unique IDs to all components
- ✓ Use semantic HTML

### Don'ts
- ✗ Do not add custom CSS to PatternFly components
- ✗ Do not create custom components when PatternFly provides them
- ✗ Do not override PatternFly design tokens without justification
- ✗ Do not forget accessibility attributes

## Responsive Design

- Support mobile, tablet, and desktop viewports
- Use PatternFly's responsive utilities
- Test at breakpoints: 576px, 768px, 992px, 1200px, 1450px

