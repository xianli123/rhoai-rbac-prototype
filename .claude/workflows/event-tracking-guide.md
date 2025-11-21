# Event Tracking Assistant Workflow

## Purpose
This workflow helps UX designers identify and define valuable event tracking for their designs. It provides step-by-step guidance through the event tracking process, ensuring comprehensive coverage of user interactions and meaningful analytics.

## Context Files
Before starting this workflow, load these reference documents:
- `.design/team/process-guidelines/event-tracking.md` - Complete event tracking process guide

## Workflow Steps

### Step 1: Initial Assessment
Start by understanding the designer's project and readiness:

1. **Ask about the feature/design:**
   - "What feature or design are you working on?"
   - "Has your PM confirmed that this design is important to capture analytics on?"
   - "Do you know enough about the final solution to identify specific UI elements and event properties?"

2. **Verify stakeholder alignment:**
   - "Have you discussed this with your PM and confirmed it should be tracked?"
   - "Do you have engineering and research stakeholders identified for this work?"

**If not ready:** Advise the designer to confirm with PM and stakeholders before proceeding.

**If ready:** Move to Step 2.

---

### Step 2: Define the Problem and Goals
Help the designer articulate what they want to learn:

1. **Identify the core question:**
   - "What do you want to learn about how users interact with this feature?"
   - "Frame this as either a design question or business question:"
     - **Design question example:** "Which filters do users engage with most often, and how can we use that insight to simplify or prioritize our filter design?"
     - **Business question example:** "Which filters are most commonly used by users, and what do those usage patterns reveal about the key business metrics we should optimize for?"

2. **Define KPIs (optional but recommended):**
   - "What metrics would indicate success for this feature?"
   - "Which HEART framework category does this align with?"
     - Happiness: Users find it helpful, fun, easy to use
     - Engagement: Users enjoy and keep engaging
     - Adoption: New users see value in feature
     - Retention: Users stay loyal to product
     - Task success: Users complete goals quickly and easily

3. **Document:**
   - Record the problem/question
   - Record any KPIs identified
   - Note which HEART category applies

---

### Step 3: Identify Events to Track
Guide the designer through identifying specific user interactions:

1. **Review existing events:**
   - "Have you checked the Live Events tab in the RH AI metrics repository to see if any similar events are already tracked?"
   - "Are there any existing events that need to be updated or extended?"

2. **Identify new events - Ask about key interactions:**
   - "What are the main actions users will take in this feature?"
   - "What UI components will users interact with?" (buttons, forms, filters, toggles, etc.)
   - "Are there decision points where users choose between options?"
   - "Are there completion states or success indicators?"
   - "Are there any negative signals worth tracking?" (e.g., access given but never used)

3. **Consider the user journey:**
   - "What's the first thing a user does when they enter this feature?"
   - "What's the goal they're trying to accomplish?"
   - "What are the key steps in between?"
   - "Where might users get stuck or drop off?"

4. **Think about segmentation:**
   - "Do you want to track differences between user types?" (admin vs regular user)
   - "Do you want to track differences based on configuration?" (e.g., which options were selected)
   - "Are there different paths users might take?"

---

### Step 4: Define Event Details
For each event identified, help structure the complete definition:

For each event, gather:

1. **Event Trigger:**
   - "What exactly causes this event to fire?"
   - Format: "User [action] [component] in [location]"
   - Example: "User clicks submit button in chatbot to send a query"

2. **Event Name:**
   - Help create a clear, consistent name using object-action format
   - Format: "[Object] [Action in Past Tense]"
   - Use Title Case
   - Example: "Playground Query Submitted"

3. **Event Description:**
   - "What is this event measuring?"
   - Example: "Counts the number of chats submitted from the playground"

4. **Properties (context about the action):**
   - "What additional context would be valuable?"
   - Ask about:
     - **User-related properties:**
       - User role? (roleType = admin/user)
       - User segment?
       - User state?
     
     - **Event-related properties:**
       - Location/page? (filterAppliedPage = [page name])
       - Selection made? (sourceType = YAML/HuggingFace)
       - Feature enabled? (isRAG = true/false)
       - Count of items? (countOfMCP = count)
       - Configuration used?
       - Time-related data?
   
   - Format: Use camelCase or snake_case
   - Remember: Multiple properties per event are OK
   - Note: Success states may not be reliable for long/background processes

---

### Step 5: Organize and Prioritize
Help the designer organize their event list:

1. **Review completeness:**
   - "Let's review all the events we've identified. Does this cover the full user journey?"
   - "Are there any gaps in understanding user behavior?"

2. **Prioritize:**
   - "Which events are 'must have' vs 'nice to have'?"
   - "Which events directly answer your core question/KPI?"
   - "Are any events dependent on others being implemented first?"

3. **Create documentation structure:**
   - Business/design question
   - KPI metric
   - Location in UI
   - UI component to track (with screenshots/links)
   - For each event:
     - Event trigger
     - Event name
     - Event description
     - Properties (with value types)
   - Links to design artifacts

4. **Suggest documentation format:**
   - Miro board (visual, good for complex flows)
   - Google doc (detailed, good for lots of context)
   - Figma annotations (integrated with designs)

---

### Step 6: Next Steps and Handoff Preparation
Guide the designer on what happens next:

1. **Review meeting:**
   - "Schedule a review with PM and design team to prioritize"
   - "Confirm target release date"
   - "Verify event tracking is captured in STRAT"

2. **Repository documentation:**
   - "Add your events to the 'WIP' events page in the RH AI metrics repository"
   - "Include all the details we've defined"

3. **Engineering handoff:**
   - "Create handoff documentation with all event details"
   - "Include UI examples with highlighted components"
   - "Link to design artifacts"
   - "Wait for PM and research approval before handing off"

4. **Jira setup:**
   - "Create Jira epic and tasks"
   - "Link to parent STRAT"
   - "Ensure engineering and research Jiras are created"

5. **Follow-up:**
   - "After implementation, update repository status from 'prioritized by PM' to 'Implemented by Eng'"
   - "Add link to implementation PR"
   - "Research will build Amplitude dashboards for analysis"

---

## AI Assistant Guidelines

When running this workflow:

1. **Be conversational and supportive** - This is a collaborative process
2. **Ask one question at a time** - Don't overwhelm the designer
3. **Provide examples** - Use examples from the event-tracking.md doc
4. **Validate understanding** - Summarize and confirm before moving forward
5. **Be flexible** - Designers may jump around; help organize their thoughts
6. **Think critically** - Suggest events they might have missed
7. **Check for completeness** - Ensure full user journey coverage
8. **Reference best practices** - Point to examples and templates
9. **Document as you go** - Offer to create formatted output at the end
10. **Remind about resources** - Point to Amplitude docs, Allie helper, RACI chart

## Common Patterns to Suggest

When helping identify events, watch for these common tracking opportunities:

- **Entry points:** How users first access the feature
- **Navigation:** Moving between sections/tabs
- **Filters/Search:** What users are looking for
- **Form interactions:** Field completion, validation errors
- **Selections:** Dropdown choices, radio buttons, checkboxes
- **Primary actions:** Submit, create, deploy, save buttons
- **Secondary actions:** Cancel, delete, edit operations
- **Success states:** Completion confirmations
- **Error states:** Failures, timeouts
- **Drop-off points:** Where users might abandon the flow
- **Time-based:** Session duration, time to completion
- **Counts:** Number of items, attempts, retries

## Output Format

At the end of the workflow, offer to generate a formatted document containing:

```
# Event Tracking Plan: [Feature Name]

## Business/Design Question
[Question identified]

## KPI Metrics
[Metrics and HEART category]

## UI Location
[Where in the product]

## Events to Track

### Event 1: [Event Name]

**Event Trigger:** [What causes it]

**Event Name:** [Formatted name]

**Event Description:** [What it measures]

**Properties:**
- property_name: [description] = [value type]
- property_name: [description] = [value type]

**Priority:** [Must have / Nice to have]

**UI Component:** [Description + link to screenshot]

---

[Repeat for each event]

## Design Artifacts
- [Link to Figma/Miro/Doc]

## Target Release
[Release version/date]

## Next Steps
- [ ] Review with PM and design team
- [ ] Add to WIP page in RH AI metrics repository
- [ ] Create Jira epic and tasks
- [ ] Get PM and research approval
- [ ] Hand off to engineering
- [ ] Update repository after implementation
```

## Start the Workflow

Begin by loading the event tracking documentation and asking:

"Hi! I'm here to help you plan event tracking for your design. Let's start by understanding your project. What feature or design are you working on, and has your PM confirmed that capturing analytics for this is important?"

