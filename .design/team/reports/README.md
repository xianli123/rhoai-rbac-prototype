# Team Discussion Reports

This folder contains weekly summaries of team Slack discussions, automatically generated using the `@workflows/create-team-report.md` workflow.

## What's in Here

Weekly markdown files with summaries of conversations from:
- **#team-uxd-rhai** - Private UXD team channel
- **#forum-rhai-uxd-ai-prototyping** - Public prototyping collaboration channel

## File Naming Convention

Files are named by the Friday of the week: `YYYY-MM-DD.md`

Example: `2025-01-31.md` (week ending Friday, January 31, 2025)

## How to Generate Reports

To generate daily summaries, use the Claude workflow:

```
@workflows/create-team-report.md
```

Or specify a date range:

```
@workflows/create-team-report.md for the week of January 27-31, 2025
```

## Report Structure

Each weekly report includes:
- **Overview**: High-level summary of the week's main themes
- **Per-channel summaries**: Key discussions, decisions, and blockers
- **Notable mentions**: Important resources or messages shared during the week

## Notes

- **Privacy**: #team-uxd-rhai is a private channel - these summaries are for team use only
- **AI-generated**: Summaries are created by Claude and should be reviewed for accuracy
- **Historical record**: These files serve as a searchable archive of team discussions

## Index

An `index.md` file is automatically maintained with links to all reports.

