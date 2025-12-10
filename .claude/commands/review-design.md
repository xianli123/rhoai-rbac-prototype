# Review Design

## Usage
`@review-design.md <PAGE_OR_FILE_PATH>`

Get a comprehensive design review covering usability, visual design, accessibility, and PatternFly compliance.

## Context
- Target for review: $ARGUMENTS
- Project: Red Hat OpenShift AI prototype
- Design standards: PatternFly and WCAG 2.1 AA
- **PatternFly Documentation**: Use the `patternfly-docs` MCP server to access the latest PatternFly design guidelines, component documentation, and accessibility standards

## Your Role
You're providing a fresh perspective on the design, like having another designer review your work. You'll check usability, visual polish, accessibility, and whether it follows PatternFly standards.

## Important
Reference the latest PatternFly documentation using the PatternFly docs MCP server to ensure feedback aligns with current design system standards and best practices.

## What Gets Reviewed

Think of this as a design critique covering multiple perspectives:

### User Experience
- **Is it intuitive?** Can users figure out what to do without instructions?
- **Is it efficient?** Can users complete tasks quickly?
- **Is the hierarchy clear?** Do important things stand out?
- **Are interactions obvious?** Do buttons, links, and controls look clickable?
- **Is there helpful feedback?** Do users know what's happening?
- **Does it handle errors well?** Are error messages helpful and constructive?

### Visual Design
- **Does it look professional?** Is the visual design polished?
- **Is the hierarchy clear?** Do headings, body text, and labels have clear distinction?
- **Is spacing consistent?** Does everything feel balanced and organized?
- **Are colors used well?** Is color helping or distracting?
- **Do icons make sense?** Are icons clear and consistent?

### Content & Messaging
- **Is the copy clear?** Is text easy to understand?
- **Is the tone appropriate?** Does it sound professional but approachable?
- **Are labels helpful?** Do buttons and links say what they do?
- **Are empty states good?** When there's no data, does it explain why and what to do?

### Accessibility
- **Can everyone use it?** Does it work with keyboard and screen readers?
- **Is contrast good?** Is text easy to read?
- **Are interactive elements clear?** Can you tell what's clickable?

### PatternFly Compliance
- **Does it match the design system?** Is PatternFly used correctly?
- **Is it consistent?** Does it look like the rest of the prototype?
- **Are we using the right components?** Could PatternFly components work better?

## What You'll Get

1. **Overall Assessment**
   - **The Good**: What's working well
   - **The Concerns**: What needs attention
   - **The Verdict**: Ready to go / Needs some fixes / Needs rework

2. **Detailed Feedback**
   
   For each issue:
   - **What's the problem**: Plain description
   - **Where**: Which part of the page
   - **Why it matters**: Impact on users
   - **How to improve**: Specific suggestions
   - **Priority**: Must fix / Should fix / Consider for later

3. **Recommendations by Priority**
   
   **Fix Now** (High Priority)
   - Issues that seriously impact usability or accessibility
   
   **Fix Soon** (Medium Priority)
   - Polish and consistency improvements
   
   **Consider Later** (Nice to Have)
   - Enhancements for future iterations

4. **What to Do Next**
   Clear action items, starting with the most important improvements.

Note: This review covers usability, visual design, accessibility, and PatternFly compliance all in one go. Claude can implement any of the suggested fixes—just let me know which ones you want to tackle.

