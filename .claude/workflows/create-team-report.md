# Slack Weekly Summary Workflow

## Purpose

Generate weekly summary reports of team discussions from our Red Hat AI UXD Slack channels. This workflow helps the team stay informed about conversations they may have missed and provides a historical record of team discussions.

## When to Use This Workflow

Run this workflow to:
- Create end-of-week summaries of team discussions
- Catch up after being away
- Generate a weekly digest for stakeholders
- Create a historical record of design decisions and discussions

## How to Invoke

```
@workflows/create-team-report.md
```

Or with a specific week:
```
@workflows/create-team-report.md for the week of January 27-31, 2025
```

## Workflow Steps

### 1. Identify Slack Channels

Read the team context sources file to get the list of Slack channels to monitor:
- File: `.design/team/team-context-sources.md`
- Extract channel IDs from the Slack section
- Current channels:
  - `C055FE3QDEE` (#team-uxd-rhai) - Private UXD team channel
  - `C09FKGDQ66A` (#forum-rhai-uxd-ai-prototyping) - Public prototyping collaboration channel

### 2. Retrieve Messages from Slack

For each channel identified:
1. Use the `mcp_slack_get_channel_history` tool to retrieve recent messages
2. By default, retrieve messages from the past 7 days
3. If a specific date range is requested, adjust accordingly

### 3. Organize Messages by Week

Group all messages by week:
- Parse message timestamps
- Determine the week's date range (Monday-Sunday or user-specified)
- Sort chronologically within the week

### 4. Generate Weekly Summary

For the week that has messages:

1. **Create a summary file** in `.design/team/reports/` with format: `YYYY-MM-DD.md`
   - Use Friday as the last day of the week for the filename
   - Example: `2025-01-31.md` for the week ending Friday, January 31, 2025

2. **Structure the summary**:
   ```markdown
   # Team Discussion Summary - Week of [Month DD-DD, YYYY]
   
   ## Overview
   [2-3 sentence summary of the week's main themes or highlights]
   
   ## #team-uxd-rhai
   ### Key Discussions
   - [Topic 1]: [Concise summary of discussion]
   - [Topic 2]: [Concise summary of discussion]
   
   ### Decisions Made
   - [Any decisions or action items identified]
   
   ### Questions or Blockers
   - [Any open questions or blockers mentioned]
   
   ## #forum-rhai-uxd-ai-prototyping
   ### Key Discussions
   - [Topic 1]: [Concise summary of discussion]
   - [Topic 2]: [Concise summary of discussion]
   
   ### Decisions Made
   - [Any decisions or action items identified]
   
   ### Questions or Blockers
   - [Any open questions or blockers mentioned]
   
   ## Notable Mentions
   - [Any particularly important messages, links, or resources shared]
   ```

3. **Summary Guidelines**:
   - Be concise - aim for brevity while capturing key points across the week
   - Group related messages into discussion topics/themes
   - Organize chronologically within each channel when helpful
   - Highlight decisions, action items, and blockers
   - Include links to important resources shared
   - Note who raised important questions or made key decisions (use @mentions)
   - Skip routine/administrative messages unless important
   - Look for themes or topics that spanned multiple days

### 5. Create Index

After generating weekly summary:
1. Check if `.design/team/reports/index.md` exists
2. If not, create it with a list of all generated reports
3. If it exists, update it with the new report
4. Format:
   ```markdown
   # Team Discussion Reports
   
   Weekly summaries of team Slack discussions from #team-uxd-rhai and #forum-rhai-uxd-ai-prototyping.
   
   ## 2025
   
   ### January
   - [Week of January 27-31, 2025](2025-01-31.md)
   - [Week of January 20-26, 2025](2025-01-26.md)
   ```

### 6. Confirm Completion

After generating summary, provide a brief report:
- Week date range covered
- Total number of messages processed
- Key themes identified across the week
- Location of generated file
- Any notable patterns or trends

## Output Location

All summary files are saved to: `.design/team/reports/`

## Notes

- **Privacy**: Be mindful that #team-uxd-rhai is a private channel. Don't share summaries outside the team without permission.
- **Accuracy**: Summaries are AI-generated interpretations. Review important decisions or quotes for accuracy.
- **Timezone**: All dates are in local timezone.
- **No Messages**: If a week has no messages in any channel, note this in the summary rather than skipping the file.
- **Week Definition**: By default, weeks run Monday-Friday. Files are named using the Friday date. Adjust if user specifies different dates.

## Future Enhancements

Potential improvements to this workflow:
- Automatic weekly email digest
- Sentiment analysis of discussions
- Trend identification across weeks
- Integration with calendar events and Figma updates
- Tagging system for categorizing discussions

