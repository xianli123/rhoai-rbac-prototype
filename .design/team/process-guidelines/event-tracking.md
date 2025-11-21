title: Event Tracking Process
source: https://docs.google.com/document/d/1ervNH2czXMUMoijA88ejVGS79d0eJSneb4vfqVnXDkQ/edit
owner: rlombard
----

# Event tracking process — a designer’s guide

## About

This doc is to act as a guide for the RHAI UX design team for the event tracking process, outlining what event tracking is, why we are using it, and how to include this process during our design work.

This work should begin when the PM confirms that the feature’s designs are important to capture analytics on.

---

## Job stories

* Design for Tracking: Ensure key interactions are tracked in new features to assess intuitiveness.  
    
* Collaborate with Stakeholders: Define the problem/question and KPIs, outline key interactions (events) to be tracked, create a UI example with the UI components and interactions, review and prioritize events list with a timeline.  
    
* Handoff to Engineering: Hand off documentation for development, highlighting details to be captured for each event, event name and properties.  
    
* Document Events: Use the [RH AI events and metrics repository ](https://docs.google.com/spreadsheets/d/1UYWoa7BrOdxl4ibvfUZ3HqbuXf8Od1qYe1dmsAkyDNg/edit?gid=587638435#gid=587638435) as a single source of truth for clear, consistent, and accessible event details.  
    
* Update Repository: After handoff, update the event status in the repository based on implementation.  
    
* Stay Informed about Analytics: Connect data insights to design decisions and identify opportunities for iteration.

---

## What is event tracking and why use it

* Event tracking helps us understand what users actually *do*. By tracking actions like clicks and scrolls, and visualizing them in tools like Amplitude, we can make smarter, faster decisions based on real logical data, instead of just guessing (ad hoc analysis). This builds a strong foundation for creating better products that truly meet user needs.

* We track events in a tool called [Amplitude](https://app.amplitude.com/data/redhat/RHODS%20Instances/events/main/latest?view=All&eventsTab=Events) which allows us to visualize the information we want to know about. This can be done through charts, funnels (sequence of steps) etc.   
  For information on what we currently track, refer to the 'live' pages in the[RH AI events and metrics repository ](https://docs.google.com/spreadsheets/d/1UYWoa7BrOdxl4ibvfUZ3HqbuXf8Od1qYe1dmsAkyDNg/edit?gid=587638435#gid=587638435). [1]


1. Seeing the Invisible Pain Points: 

* By tracking events, we gain visibility into critical user journeys. For instance, tracking the paths users took after clicking the "deploy" button on a form provided [direct insights](https://docs.google.com/document/d/1tXycxKmmpxdnxeBbhdpkozFO2WywKNKRUn7-gg9IC84/edit?tab=t.0) into user preferences. For UX designers, funnels are the perfect tool to visualize drop-off, showing exactly where users abandon a process, such as during onboarding. 

2. Focusing on Goals first:

* We prioritize clear business questions to guide our event tracking, ensuring data collection drives value. High-level goals are translated into KPI metrics using frameworks like HEART [2], which then map to specific events, preventing "vanity metrics" and instead focusing on strategic objectives.

3. Building Trustworthy Data: 

* To build trustworthy data, we need standardized processes for defining and capturing events. This ensures consistency, accuracy, and comparability across all analyses, creating a reliable dataset that directly informs product investment decisions.

---

## How to do the event tracking process

The steps below are to provide guidance on the designer’s role and responsibilities during the event tracking process. 

### RACI chart

See [this RACI chart](https://miro.com/app/board/uXjVJMs2eLU=/?share_link_id=714986926459) [3] which outlines who should be Responsible, Accountable, Consulted and Informed during each step described below.

---

### Step 1: Planning and Definition

1. Determine meeting readiness. 

* The initial meeting should begin when the PM has identified and confirmed that the designs are important to capture analytics on, and the designer/PM knows enough about the final solution to the designs to identify details like specific UI elements and event properties.   
  * Note that before the point above, designers can initiate and propose relevant designs/features that may require analytics. This conversation should be had with the PM and research, once agreed, the initial meeting process outlined above is the first step. 

2. Create a meeting with relevant stakeholders (Eng, PM, UX, Research). 

* When the designer is ready to discuss KPIs and event tracking, stakeholders who have already been working on the designs from engineering, PM, and design are important to include in the meeting. Additionally, the research team is essential in this conversation and will need to be added too. 


3. Identify the problem/question and KPIs with stakeholders. 

* In the first meeting, define the problem to solve and what you want to learn. Create the business/design question.   
    
* Frame the business/design question as a user story or a question. See examples below:  
  * Design questions help frame how the technology should be built or experienced. They are tied to user behaviour, experience, interface, or system usability. For e.g. “Which filters do users engage with most often, and how can we use that insight to simplify or prioritize our filter design?”  
  * Business questions help frame how data, technology, or user behaviour connects to business outcomes such as revenue, growth, efficiency, or customer satisfaction. For e.g. “Which filters are most commonly used by users, and what do those usage patterns reveal about the key business metrics we should optimize for?”


* (Nice-to-have) Define KPIs (key performance indicators), e.g. percentage rates of adoption [2]. Relating a design/business question to a HEART metric is a nice-to-have and not essential. The research team will be able to group the question into a HEART metric [2] if desired.   
  * Research can help to formalize and group KPIs and metrics to help standardize them so that they align with KPIs from other feature areas we’re tracking, which will allow Red Hat AI to eventually speak the same metrics language across the board.    
    * Adoption metrics are tracked at both project level (e.g., % of projects with playground enabled) and user level (e.g., % of users with access to a playground). Confirm with research on whether this needs to be handled with your task. 

    

---

### Step 2: Define events

1. Create a list of events with the associated data. 

* Review the set of currently tracked events to confirm if any are already tracked. Current tracked events are outlined in the Live Events tab within the [RH AI metrics repository ](https://docs.google.com/spreadsheets/d/1UYWoa7BrOdxl4ibvfUZ3HqbuXf8Od1qYe1dmsAkyDNg/edit?usp=sharing)[1].   
    
* Create a list of new events to track and of any existing events that require updates. Link back to the problem/question and KPIs already identified in Step 1. Some things are automatically tracked in Amplitude so refer to [Basics about Amplitude](https://docs.google.com/document/d/1ff7LaPoWmMtLCufSRtbPlVa58KBgE9ZPJ3S8zN-KoPU/edit?usp=sharing)[4] and/or [Allie the Amplitude helper](https://gemini.google.com/gem/6eafb212e631?usp=sharing) [5].  
  In a document, include the business/design question, KPI metric, state the location, highlight the UI component you want to track in an example of the UI, provide a link to the artifact and also include the criteria listed below. This can also be used as a handover document to engineering, seen in the examples below, any suggestions or other feedback on these templates are welcome -     
  * [Handoff example 1 - Miro board](https://miro.com/app/board/uXjVJykbhH0=/?moveToWidget=3458764646320133915&cot=10)  
  * [Handoff example 2 - Google doc](https://docs.google.com/document/d/1d33r97xlqsWmQj6yHx3_YEr0Ya8yGhyWDlzLMlKSgJI/edit?tab=t.0)  
  * [Handoff example 3 - Figma](https://www.figma.com/design/9IZPkgwSKcKor0tVSjgJ8k/Ideation?node-id=2022-11747&t=EyGNSvb9G3urBv5f-1)     
    * [This example](https://miro.com/app/board/uXjVIqNrEgA=/?moveToWidget=3458764638667669512&cot=14) is not documentation but illustrates the types of details we can track. For instance, we want to find out which is the most commonly used source type (YAML or Hugging Face) when an admin is adding a repo to the Model Catalog. Note that this format is outdated and is only to highlight the types of things we can track.   
    * Another example of the types of things we can track are negative usage signals (e.g., users given access that never create a workbench) captured where feasible.

* Define the criteria and associated data for tracking events. Each event should follow the Amplitude format and include the details listed below. Refer to [Basics about Amplitude](https://docs.google.com/document/d/1ff7LaPoWmMtLCufSRtbPlVa58KBgE9ZPJ3S8zN-KoPU/edit?usp=sharing)[4] and [Allie the Amplitude helper](https://gemini.google.com/gem/6eafb212e631?usp=sharing) [5] for guidance and see the brief essentials below:

  * Event trigger: 

    Provide a quick description of what causes the event to happen to make it clear to the team what exactly the user is doing, for e.g., "User clicks submit button in chatbot to send a query". 

  * Event name: 

    Outline the specific user actions (events) that must be tracked within the UI. Give it a name, use a clear consistent object-action format, for e.g., "Playground Query Submitted". Use Title Case and past tense for completed actions.

  * Event description: 

    Mention what the event is measuring. For e.g., "Counts the number of chats submitted from the playground". 

  * Properties:

    There are user and event properties which provide context about that specific action. You need to define a property, see examples below. The types (user and event) are described to provide context, you do not need to specify if a property is user or event related. 

    * There is no specific case format, however camelCase and/or snake\_case are preferred.   
    * An example of a user property which is tied to the user (actor), is “roleType”, to find out whether the person using the platform is an admin user or a regular user.  
    * An example of an event property which is tied to the event (action), is “filterAppliedPage”, used to find out which page a filter was used.  
    * There can be multiple properties per event, and there can be a main property and a value property, it depends what you want to find out. There are various property values tied to a main property, for example, you can check if something has been enabled by having the boolean “= true/false”, for e.g., “isRAG \= true/false”. Additionally, to check the number of something you can have, use  “= count”, for e.g., “countOfMCP \= count”. In these examples, the main property is “isRAG” and “countOfMCP”, and the value properties are “= true/false” or “= count”. You can discuss details of this with the analytics/research team, check the Amplitude doc and the examples above to provide more context.   
      * Note: a limitation is that event tracking may not reliably capture success states if the user isn’t in the app when an action completes. Long or background processes can finish without triggering a success event, so designers should consider this if using success properties.  
      * Note for awareness: all tracked events automatically include customer IDs that allow segmentation by adoption, organization, and user counts in Amplitude. 


---

### Step 3: Review events list

1. Follow up with PM and design to review.

* Review the events with PM and design, prioritize the events list e.g. (must have, nice to have), and identify the target release date for implementation. Confirm with the PM that event tracking is captured in the STRAT.

---

### Step 4: Documentation

1. Hand off documentation for the engineering team. 

* Events must be reviewed and agreed by PM and research stakeholders before handing off to development for implementation.    
    
* If you haven't used one of the templates outlined in Step 2, you can edit the documentation used in previous review meetings with stakeholders to outline the essential criteria needed when handing off to engineering. Essential criteria includes event trigger, event name, description and any properties. It is also useful to include the business/design question, KPI metric, state the location, provide an example of the UI highlighting the component to track, with any links to the artifact.  
  * Current examples of what you will need to put in the handoff document as mentioned in Step 2:   
    * [Handoff example 1 - Miro board](https://miro.com/app/board/uXjVJykbhH0=/?moveToWidget=3458764646320133915&cot=10)  
    * [Handoff example 2 - Google doc](https://docs.google.com/document/d/1d33r97xlqsWmQj6yHx3_YEr0Ya8yGhyWDlzLMlKSgJI/edit?tab=t.0)  
    * [Handoff example 3 - Figma](https://www.figma.com/design/9IZPkgwSKcKor0tVSjgJ8k/Ideation?node-id=2022-11747&t=EyGNSvb9G3urBv5f-1)     
  * Earlier/outdated examples showing the UI element in the UI:   
    * [Handoff example 1 - Model Catalog Figma](https://www.figma.com/design/du09SzVaT3Xjh5E3YsRtyt/-Handoff--Enhance-Model-Catalog-with-Model-Validation-Data?node-id=88-133239&t=SDnWRkZ3S9KudBXI-1)   
      * Note that currently this does not include an example UI, KPIs or event details.   
    * [Handoff example 2 - AI Playground Figma](https://www.figma.com/design/KrJFDxzvq2iD1wmfZnSk07/AI-Playground?node-id=1314-114488&t=01kAVEs4Weh9Kdk4-1)   
      * Note that currently this does not include KPIs or event details.   
    * [Handoff example 3 - Model Registry Miro](https://miro.com/app/board/uXjVIqNrEgA=/?moveToWidget=3458764636103010781&cot=14)   
      * Note that this is outdated but highlights a documentation format. 

2. Document the data in the repository. 

* Work in progress events need to be added to the[RH AI metrics repository ](https://docs.google.com/spreadsheets/d/1UYWoa7BrOdxl4ibvfUZ3HqbuXf8Od1qYe1dmsAkyDNg/edit?usp=sharing)[1]. This is putting together the details you have already defined in previous steps. Put these events in the ‘WIP’ events page of the repository.   
    
* There is a description page which includes the details of what you must add.   
    
* This sheet enables the team to easily view what is being tracked, why it is being tracked, and its current status. 

---

### Step 5: After the hand off

1. Update the repository. 

* Access the PR that engineering updated with the events to see which ones were implemented and update the Status in the ‘WIP’ page  from ‘prioritized by PM’ (completed in Step 3.2) to ‘Implemented by Eng’.   
    
* Make sure a link to the parent STRAT and implementation PR are included in the repo. This enables the research team to track which release the events are available in.  
    
* If there are events that were not implemented because they will be in a future release, use the ‘Future release’ status. If the events were de-prioritized indefinitely, delete it from the repo but keep a record of it somewhere.   
    
* Members from the research team will be able to create a live events page, indicating that these events are now live in the product and are currently being tracked. 

---

### Step 6: Next steps

* After implementation, the research team will be able to build dashboards in Amplitude and analyze the results to share with the team for possible further action. Based on the results, more informed decisions can be made and provide opportunities for growth and improvement. 

---

## Jira information

* Examples of an event tracking epic and task are outlined below. Key information such as acceptance criteria and definition of done are shown. Additionally, link your Jira to the parent STRAT. Ensure there are engineering and research Jiras for implementing this work.   
  Examples of UX Jiras:   
  [Epic example \- Gen AI](https://issues.redhat.com/browse/RHOAIUX-1240)  
  [Task example \- Playground](https://issues.redhat.com/browse/RHOAIUX-1250)  


---

## Know-how resources

[1] [RH AI metrics repository ](https://docs.google.com/spreadsheets/d/1UYWoa7BrOdxl4ibvfUZ3HqbuXf8Od1qYe1dmsAkyDNg/edit?usp=sharing)

* Repository that holds your tracking information defined in Step 1 and 2. It also gives guidance on what an event, trigger, property is in the description page. This sheet enables the team to easily view what is being tracked, why it is being tracked, and its current status. 

[2] Key performance indicators (KPI) 

* Note that the [HEART framework](https://userpilot.com/blog/goals-signals-metrics/) and others may be used to help create KPIs by the research/analytics team.   
  * Metrics Category (HEART)    
    * Happiness: Users find the product helpful, fun and easy to use  
    * Engagement: Users enjoy the product and keep engaging with it   
    * Adoption: New users see the value in the product or new feature   
    * Retention: Users stay loyal to the product to get their job done  
    * Task success: Users complete their goal quickly and easily 

[3] [RACI chart](https://miro.com/app/board/uXjVJMs2eLU=/?share_link_id=714986926459)

* A responsibility assignment matrix that clarifies who is Responsible, Accountable, Consulted, and Informed throughout each task. 

[4] [Basics about Amplitude](https://docs.google.com/document/d/1ff7LaPoWmMtLCufSRtbPlVa58KBgE9ZPJ3S8zN-KoPU/edit?usp=sharing)  

* Provides the need to know about event tracking in Amplitude, this will help guide you in creating event names or what kind of events to track. 

[5] [Allie the Amplitude helper](https://gemini.google.com/gem/6eafb212e631?usp=sharing)

* A Gem from Gemini to help with any processes related to event tracking. 
