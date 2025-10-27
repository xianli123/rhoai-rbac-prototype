# Models-as-a-Service (MaaS)

Target version: 3.1
UXD Orientation doc: https://docs.google.com/document/d/10IIWRpETdRIDzQiPIvHSzCBj3bwq02fE0mGOEtVwjBw/edit?tab=t.0
NotebookLM: https://notebooklm.google.com/notebook/7c5d493a-85b8-438d-b1d9-aeab507c63a7
Journey map: https://miro.com/app/board/uXjVIgQDVWw=/





## Sources

### Notebooks

source: https://notebooklm.google.com/notebook/7c5d493a-85b8-438d-b1d9-aeab507c63a7
- description: UXD Orientation NotebookLM for Models-as-a-Service (MaaS)

### Slack

source: https://redhat.enterprise.slack.com/archives/C091QD3C3QT
- name: #maas-update Slack channel
- description: Channel for all MaaS-related updates
source: https://redhat.enterprise.slack.com/archives/C094HF5KD6E
- name: #wg-maas Slack channel
- description: Channel for the team developing MaaS for RHAI

### Docs

source: https://docs.google.com/document/d/1JhZ7jcBJH71nzvYWYCHk_EXEtxMFKkSyvkblmDL_KtU/edit
- title: Refinement - RHOAISTRAT-639
- description: contains a bunch of details for what's in and out of scope for 3.0, some of which is likely 3.2/3.3
source: https://docs.google.com/document/d/142X3mx_SIdSWMvgf3ppSW83J__ZtQ4EDmOiF0IKZYJc/edit?pli=1&tab=t.grnrd6dljv81
- title: Models-as-a-Service Worksheet
- description: Contains PM's source of truth for MaaS roadmap items, requirements, and more.
source: https://docs.google.com/document/d/12oZzzPyfrxiajvgfUsc4xPMwZFckGwC9Qqoi7u4DKK8/edit?tab=t.0#heading=h.djbgpzpj5t69
- title: Notes - llm-d in RHOAI model deployment wizard
source: https://docs.google.com/document/d/1ZZiSG58daRtUGcsofDU-Q5n8c-FzqxUXVx05Sil3p5M/edit?tab=t.0
- title: MaaS Stakeholders Sync
- description: Contains notes from our weekly MaaS Stakeholder meeting
source: https://docs.google.com/document/d/1iXOtTwmXhm582L3nYpFdaMXyZN8EEL_xMmCcgwpkGxk/edit?tab=t.0
- title: PRD Gen AI Studio - API Key UI
- description: Includes problem statement, user narrative, and an outline of features for the API Key area of the UI

### Decks

source: https://docs.google.com/presentation/d/1ORtU9uYWKxlOngo1Xj7atkLPYdUMUTZrua5v0OOtdOY/edit?slide=id.g2e86baf0a21_0_0#slide=id.g2e86baf0a21_0_0
- title: RHAI MaaS Master Deck
- date: 2025-08-01
- descrption: PM slide deck covering MaaS
source: https://docs.google.com/presentation/d/1ms_my1WI4l_-zBe6wBCAoeUA2dNnQAViZQYlgUkFlCY/edit?slide=id.p#slide=id.p
- title: MaaS: path to DevPreview
- date: 2025-09-03
- description: Summary of Dev Preview strategy and plan for MaaS in RHOAI, confirms that group filtering of models is a thing for the future and by default we can list models to everyone

### Repositories

source: https://github.com/opendatahub-io/maas-billing/tree/main
- title: ODH - Models as a Service with Policy Management
- description: Core GitHub repository for all MaaS-related infrastructure code (config, components)
source: https://github.com/rh-aiservices-bu/litemaas
- description Repository for LiteMaaS, helpful as a reference implementation of MaaS functionality, created by the CAI team

### Jira

source: https://issues.redhat.com/browse/RHAIRFE-476
- title: AI Available Assets -  Implement Quota Management and Visibility for Model Deployments
source: https://issues.redhat.com/browse/RHOAISTRAT-638
- title: MaaS UI for Admin
source: https://issues.redhat.com/browse/RHOAIUX-996
- title: User Experience For MaaS Admin
source: https://issues.redhat.com/browse/RHOAISTRAT-639
- title: Initial MaaS Offering (3.0)
source: https://issues.redhat.com/browse/RHAIRFE-151
- title: AI Available Assets - LLS Deployed Models, MCP Servers (via ConfigMap) - MVP
source: https://issues.redhat.com/browse/RHAIRFE-608
- title: AI Available Assets - MaaS Dev Preview Integration
source: https://issues.redhat.com/browse/RHOAISTRAT-703
- title: MaaS Offering Fast Follow
source: https://issues.redhat.com/browse/RHAIRFE-244
- title: API Keys UI - to enable API Endpoint consumption for Gen AI Studio components
source: https://issues.redhat.com/browse/RHAIRFE-138
- title: MaaS UI for Admin
source: https://issues.redhat.com/browse/RHOAISTRAT-650
- title: Observability for MaaS v1.0
source: https://issues.redhat.com/browse/RHAIRFE-137
- title: Basic Chargeback & Showback ($$$) Reporting for MaaS
- description: Not in scope for 3.0, but possibly 3.2 or 3.3

### Other

source: https://www.redhat.com/rhdc/managed-files/ma-models-as-a-service-overview-2669809OM-202509-en.pdf
- description: Introductory guide to Models-as-a-Service, customer-facing
source: https://maas.apps.prod.rhoai.rh-aiservices-bu.com
- title: Parasol MaaS
- description: MaaS UI powered by 3scale for internal Red Hat usage
source: https://litemaas-litemaas.apps.prod.rhoai.rh-aiservices-bu.com/home
- title: LiteMaaS
- description: MaaS demo UI powered by LiteLLM and created by the AI Customer Adoption and Innovation Team (CAI)
source: http://18.223.29.178:3000
- description: MaaS demo UI for policy management and observability, created by Noy
source: https://miro.com/app/board/uXjVIh6zvD0=/
- description: MaaS Architecture diagrams

## Open Questions

In 3.2 we intend to make the Models tab only include endpoints that are "gated" by an API Key. But this requires and assumes an API Gateway is involved, particularly RHCL. Is it okay to approach it this way?
- Yes

- (ENG/PM) Will we support Perses dashboards in 3.2?
- (USER) Should our platform allow AIEs to add and bring their own API key to the Playground and elsewhere?

## PRD

### Features

- API Gateway
-- Support external AI providers (e.g. OpenAI, Anthropic)
-- Support internal model inference server endpoint providers
- Token Validation
- API Keys list
-- One key can span multiple models, assets
-- One key might be scoped to a single model too (unsure)
-- Key management (list with columns for name, secret key value, date created, date last used, created by user, permissions)
- Usage Tracking
-- Requests per time period (1 hour, 24 hours, 7 days, 30 days, 1 year, custom range)
-- Tokens per user
-- Tokens per group
-- Tokens per key
-- Top consumers (per key)
- Observability
-- Link to view more detailed dashboards in Perses
-- Runtime: latency, GPU utilization, tokens per second
- Rate Limiting
-- Max tokens per minute
-- Max responses per minute
-- Max tokens per time period
- Security Enforcement
- Perses-based dashboards
- Administration User Interface
- Chargeback
- SLO-based workload management (dynamic routing using llm-d's intelligent scheduler)
-- Tenant Management
-- Usage Analytics / Observability
- Governance
-- Policies
--- Quality tiers
--- Over-limit behavior (soft throttle, hard throttle)
--- Date-based quota renewals
-- RBAC-based access to users/groups
-- Audit trails
-- Tenancy model that security team trusts
- GitOps configuration

### API Assets Features

- New "Add Asset" button to add a model

## Design

### Design Philosophy

The AI Assets area contains all “as‑a‑service” offerings that are available through the platform. It targets engineers and developers who need a quick, safe, ready‑to‑consume endpoint without having to understand the underlying infrastructure. The UI is intentionally simple for non‑experts but encourages best practices: every MaaS endpoint is routed through an API gateway that enforces API‑key authentication, provides observability, monitoring, and chargeback, and allows key revocation if a compromise occurs. This cautious default can be extended to future services such as MCP servers and Agents-as-a-Service, ensuring consistent security and operational controls across the AI Assets catalog.

### API Keys page

The API keys page is located within the Settings area of the left nav above User management.

The page title is "API keys" wiht a description of "Browse endpoints for available models and MCP servers."

The page includes a primary action button of "Create API key" and then a table showing all API keys. The table has columns for Name, API Key (e.g. sk-1234...), Assets (e.g. model names), and Owner (e.g. User, Service Account, Group).

Clicking "Create API key" reveals a modal with a form inside it to create a new API key. The form has fields for:
* Name (required)
* Description (freeform text box to "Describe the key's purpose)
* Owner (dropdown for User/Group/Service Account, and a dropdown to the right of it to select an actual username/group name/service account name)

It also includes a collapsible section (collapsed by default) for "Limits and Policies. When expanded this section has options to set:
* Token rate limit (tokens per minute)
* Request rate limit (requests per minute)
* Budget limit
* Expiration date

The last section of the modal for "AI Asset Access" provides a few multi-select dropdowns to let users select from lists of:
* Model Endpoints
* MCP Servers & tools
* Vector Databaes
* Agents

### API Key Details page

The API key details page has the name of the key at the top and a partially-hidden key that's copyable below it.

The page has five tabs:
* Details
* Assets
* Metrics
* Policies
* Settings

#### Details tab

The Details tab has a Description List that includes the key's:
* Name
* Description
* API key (partially-hidden and copyable)
* Date created
* Date last used

#### Assets tab

The Assets tab includes collapsible sections for the AI Assets that the API key enables access to. Each section has a table showing the assets of that type that are available:
* Models (with columns for Name, ID, and Endpoint)
* MCP Servers & tools (with columns for Name, Tools, and Endpoint)
* Vector Databases (with columns for Name and Size)
* Agents (with columns for Name and Endpoint)

For the models list, include examples like gpt-oss-20b and granite-3.1b.

For the MCP servers list, include examples like OpenShift, RHEL, Ansible.

#### Metrics tab

The Metrics tab includes various metrics and charts that help the API key owner better understand how the key is being used.

The top of the tab includes a controls area with a dropdown for "Time range" (e.g. 24 hours, 7 days, 30 days) and a link to "View Perses Dashboard"

Below those controls are cards (in a flexbox row) for:
* Total Requests
* Success rate (e.g. 98.2%)
* Total Tokens
* Total Cost

Below these cards is a fulldwidth card with a graph showing the "Total Requests."

#### Policies tab

This tab includes all policies, limits, controls, and constraints that are imposed on the API key.

It includes a table with the Names, IDs, and Descriptions of policies that have been applied by the Platform team. Policy IDs should be all lowercase with dashes for spaces like "devs-rate-limit-standard" and "devs-budget-standard."

#### Settings tab

This tab includes a "Danger Zone" card with a red action button to permanently delete the API key. If a user clicks the delete button a modal should appear to confirm that they want to delete the key, with a text field to type in the key's name manually and then "Confirm" to delete the key.

### Policies page

The Policies list/table page should be located in "Settings" in the left nav, below "User management." It should be a table page similar to the others, with columns for Name, Description, Status (Active or Inactive), Targets (e.g. Group names) and Rules (e.g. Token limit, Rate limit, Time limit).

### Create policy

A primary button to "Create policy" should be available on the Policies list page. Clicking it should display a PatternFly 6 modal similar to the others.

The modal should include fields for Name (required) and Description (optional).

Then a section heading for "Available assets" should have dropdowns similar to the ones from the "Create API key" modal for "Models" and "MCP Servers & tools". By default both dropdowns should be set to "All" (meaning they aren't restricting anything).

Then a section heading for "Limits" should display fields for

- Token limit (i.e. # tokens per # [time range like minute, hour, day]
- Rate limit (i.e. # requests per # [time range like minute, hour, day])
- Time limit (i.e. None or Start & End time controls)

Then a section heading for "Targets" that has multi-select dropdowns for "Groups" and "Users" and "Service Accounts" with some options in each.

The descriptive text for the Groups dropdown should say "This policy will apply to all users in these groups."

#### Policy Details page

The Policy Details page should have a tab for Details, which displays all of the details that were captured in the "Create policy" modal.





## Implementation Details

### Routing
- API Keys list page: `/settings/api-keys`
- API Key details page: `/settings/api-keys/:keyId`
- API Key details with tab: `/settings/api-keys/:keyId/:tab` (optional, defaults to Details tab)

### Data Management
- Use mock/dummy data for prototype
- Use appropriate local state management (React hooks/context as needed)
- No external API integration required

### User Experience
- After creating an API key, navigate user to the newly created key details page
- Delete confirmation modal should show the exact key name in plain text above the input field for easy copy/paste
- Use PatternFly Victory charts for the Metrics tab visualizations

### Mock Data Requirements
- Create realistic sample data for models (include examples like gpt-oss-20b, granite-3.1b)
- Create realistic sample data for MCP servers (include examples like OpenShift, RHEL, Ansible)
- Create realistic mock policy data for API gateway/MaaS policies in the Policies tab
- Include appropriate sample metrics data for charts and statistics