# Check PatternFly Compliance

## Usage
`@check-patternfly-compliance.md <PAGE_OR_FILE_PATH>`

Reviews a page or component to make sure it's using PatternFly correctly and consistently.

## Context
- Target to check: $ARGUMENTS
- Design system: PatternFly (Red Hat's design system)
- Project guidelines: `ai-documentation/guidelines/`
- **PatternFly Documentation**: Use the `patternfly-docs` MCP server to access the latest PatternFly component documentation, design guidelines, and accessibility standards

## Your Role
You're helping a designer ensure their design follows the PatternFly design system—using the right components, spacing, colors, and patterns that make the UI consistent and professional.

## Important
**Always reference the latest PatternFly documentation** using the PatternFly docs MCP server when checking compliance. This ensures you're comparing against current PatternFly standards and best practices.

## Process

1. **Get Latest PatternFly Documentation**
   - Use the PatternFly docs MCP server to fetch current documentation for components being reviewed
   - Reference design guidelines and accessibility standards from the MCP server
   - Compare the implementation against the latest PatternFly best practices

2. **Review the Code**
   - Read the target files
   - Identify all PatternFly components used
   - Check component configuration and usage patterns

## What to Check

PatternFly is Red Hat's design system. Using it correctly keeps the UI consistent, professional, and maintainable.

### PatternFly Checklist

**Are We Using the Right Components?**
- [ ] Using PatternFly components instead of custom ones
- [ ] Components are used for their intended purpose
- [ ] Not reinventing something PatternFly already provides

**Does It Look Like PatternFly?**
- [ ] Using PatternFly colors and color tokens
- [ ] Using PatternFly spacing (not custom gaps or margins)
- [ ] Layout follows PatternFly patterns
- [ ] Visual hierarchy matches PatternFly standards

**Is Everything Consistent?**
- [ ] Button styles match other buttons in the prototype
- [ ] Spacing is consistent throughout the page
- [ ] Typography follows PatternFly scale
- [ ] Component variants are used appropriately

**Are Components Configured Correctly?**
- [ ] Each component has a unique ID
- [ ] Component options (variants) are set properly
- [ ] No custom styling added on top of PatternFly
- [ ] Accessibility features aren't removed or overridden

## What You'll Get

1. **Summary**
   - Overall: Does this follow PatternFly correctly?
   - What's working well
   - What needs to be fixed

2. **Issues Found**
   For each problem:
   - **What's not PatternFly**: Plain description of the issue
   - **Where**: Which part of the page
   - **Why it matters**: How it affects consistency/maintainability
   - **The PatternFly way**: How to do it properly
   - **Priority**: Must fix / Should fix / Nice to fix

3. **Recommendations**
   - PatternFly components you could use instead
   - Better PatternFly patterns for this use case
   - Opportunities to improve consistency

4. **What to Do Next**
   A prioritized list of fixes to bring the design in line with PatternFly standards.

Note: Claude will make the actual code changes. You don't need to understand the technical details—just approve the fixes and Claude will implement them using proper PatternFly patterns.

