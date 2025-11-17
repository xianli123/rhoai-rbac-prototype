# Primary Workflow: Design Prototyping

## How Designers Work in This Prototype

This prototype is a working design tool. Designers describe changes they want to see, and Claude implements them in code. Think of it as a collaborative prototyping session.

### Typical Workflow

1. **Describe the Change**
   - "I want to add a new section to the dashboard showing recent activity"
   - "Can we make the navigation more prominent?"
   - "Let's add a filter dropdown to this table"
   - "The spacing looks too tight on this page"

2. **Claude Implements It**
   - Figures out which files need to change
   - Adds or modifies PatternFly components
   - Ensures accessibility and design system compliance
   - Explains what was changed in design terms

3. **Review & Refine**
   - View the changes in your browser
   - Request adjustments as needed
   - Check accessibility with Claude's help
   - Verify it matches PatternFly patterns

4. **Iterate**
   - Try different approaches
   - Refine the interaction
   - Adjust visual hierarchy
   - Polish details

## Common Design Tasks

### Adding New UI Elements
"Add a button that opens a modal to create a new project"

### Modifying Layouts
"Can we make this content area wider and move the sidebar to the left?"

### Improving Information Hierarchy
"The heading should be more prominent and the description should be smaller"

### Adding Interactions
"When users click this card, show more details below it"

### Accessibility Improvements
"Review this page for accessibility issues"

### PatternFly Alignment
"Check if we're using PatternFly components correctly here"

## Design Language

When working with Claude, use design terms:
- "Component" not "React component"
- "Layout" not "DOM structure"  
- "Interaction" not "event handler"
- "Style" not "CSS"
- "Element" not "HTML tag"

Claude will translate these into the appropriate technical implementation.

