# Phase 5: Summit Push

- id: phase5
- icon: 🚩
- subtitle: APIs, pipeline awareness, and leading practice demos and POCs.

<!-- Edit freely. Ask Claude to "rebuild the site from content" when done. -->

---

## API Awareness

- id: task-api-awareness
- url: phase5/task-api-awareness.html
- status: done
- description: Explore MaaS360 Web Services APIs to pull device data, trigger remote actions, and integrate with third-party tools like ServiceNow.

### Learn

#### The big picture

<p>MaaS360 Web Services (APIs) let other systems pull device data, push actions, and automate workflows — for example syncing device status into ServiceNow or triggering a remote wipe from a script.</p>

#### What APIs unlock

<p>APIs turn MaaS360 into something other tools can talk to. Instead of an admin clicking in the console, a system can ask MaaS360 for device data or tell it to act — enabling integrations and automation at scale.</p>

#### Check your understanding

<p>Before moving on, make sure you could explain this to a teammate in two sentences.</p><!-- PLACEHOLDER: insert diagram or short video here -->

### Practice

- Open the MaaS360 API / Web Services docs (placeholder).
- Find one API that returns a device inventory.
- Find one API that triggers a remote action.
- Note one third-party tool (e.g. ServiceNow) you could integrate.

### Quiz

1. MaaS360 APIs are mainly used to…
   - [ ] Charge devices
   - [x] Integrate and automate with other systems
   - [ ] Design logos
   - [ ] Send SMS to customers

2. An example integration target mentioned for APIs is…
   - [x] ServiceNow
   - [ ] Photoshop
   - [ ] Excel macros
   - [ ] A fax machine

3. APIs let an external system…
   - [x] Pull device data and trigger actions
   - [ ] Only read the help docs
   - [ ] Replace the admin console UI
   - [ ] Nothing useful

4. Automation via API reduces…
   - [x] Manual clicking in the console
   - [ ] Device battery life
   - [ ] Wi-Fi speed
   - [ ] Screen size

5. A remote action you might trigger via API is…
   - [x] A device wipe or lock
   - [ ] A firmware redesign
   - [ ] A new SIM contract
   - [ ] A hardware swap

6. (text) Give one workflow at a customer that would be faster if it were automated through the MaaS360 API.

### Apply

- type: guided

A customer's IT team wants device status to appear automatically in ServiceNow. Sketch, in plain terms, how the MaaS360 API makes that possible.

---

## Pipeline/Renewal Awareness

- id: task-pipeline-renewal-awareness
- url: phase5/task-pipeline-renewal-awareness.html
- status: done
- description: Read the team's pipeline like a BTS engineer — where deals stand, where renewals are at risk, and where technical work moves the needle.

### Learn

#### The pipeline through BTS eyes

<p>The pipeline is the list of open opportunities and their stages; renewals are existing customers approaching contract end. A BTS engineer reads both differently than an AE: you're scanning for <b>where technical work changes outcomes</b> — deals stalled at technical evaluation (needs a demo or POC push), renewals wobbling because of unresolved technical friction (needs a health check or a fix-it session), and upcoming deals whose device mix you should start preparing for.</p>

#### Renewals are technical work too

<p>A renewal at risk is often a technical story: adoption never finished, a feature was never rolled out, or an old irritation was never chased down. The BTS contribution is a pre-renewal technical touch — reviewing the customer's environment health and usage before the commercial conversation, so the AE walks in with problems already fixed. Ask your mentor how this team runs pre-renewal reviews.</p>
<!-- PLACEHOLDER: confirm where pipeline/renewal data lives for this team (Sales Cloud views/dashboards), what the stage names are, and the team's renewal-review rhythm. -->

### Practice

- With your buddy or an AE, review the current pipeline and identify two deals sitting at technical evaluation.
- For each: read the opportunity record and write the one technical action that would advance it.
- Identify one upcoming renewal and ask its AE what the customer's technical mood is.
- Learn the team's deal-stage names and what "technically won" corresponds to.

### Quiz

1. A BTS engineer scans the pipeline for…
   - [x] Deals where technical work — demo, POC, fix — changes the outcome
   - [ ] Total dollar value only
   - [ ] The oldest deals
   - [ ] Deals to avoid

2. A renewal at risk often traces to…
   - [x] Unfinished adoption or unresolved technical friction
   - [ ] The logo
   - [ ] Calendar season
   - [ ] Nothing technical, ever

3. The pre-renewal technical touch means…
   - [x] Reviewing environment health and fixing friction before the commercial conversation
   - [ ] Calling to ask for the renewal
   - [ ] A discount
   - [ ] Waiting for the AE to ask

4. (text) For one real deal at technical evaluation: what's the deal, what's blocking it, and what technical action would you propose this week?

### Apply

- type: guided

Bring your two-deal analysis to the AE(s) who own them and ask whether your proposed technical actions make sense. Where they say yes — offer to do it. That's the moment pipeline awareness becomes pipeline contribution.

---

## RFP Responses

- id: task-rfp-responses
- url: phase5/task-rfp-responses.html
- status: done
- description: Contribute to RFP/RFI responses — turning requirement lists into accurate, winning technical answers.

### Learn

#### What RFPs are and why BTS owns the technical half

<p>Larger customers evaluate through formal documents: RFI (information), RFP (proposal) — often hundreds of requirement rows: "Does the solution support X? Describe how." AEs own the commercial response; BTS drafts and reviews the technical answers. Accuracy is everything: answers become contractual expectations, so "yes" must be true, "partially" must be explained, and "no, but here's the approach" is a legitimate — often winning — answer that builds trust.</p>

#### The craft of a good answer

<p>Answer the question asked, in their vocabulary, at the depth requested — one crisp paragraph beats two vague pages. Reuse is the norm (most questions repeat across RFPs) but reuse <em>then verify</em>: features move, and last year's answer may be stale. When a requirement is ambiguous, log a clarifying question rather than guessing what they meant.</p>
<!-- PLACEHOLDER: confirm where the team's RFP answer library lives, who reviews BTS answers, and typical turnaround expectations. -->

### Practice

- Get one past RFP response from your mentor and read the technical sections end to end.
- Classify ten of its answers: clean yes / qualified / no-with-approach; note how each was phrased.
- Draft answers to three practice requirements (enrollment, BYOD privacy, lost-device response) using this phase's knowledge.
- Have your mentor review your three drafts against the team's house style.

### Quiz

1. RFP technical answers must be accurate because…
   - [x] They become contractual expectations after the win
   - [ ] Nobody reads them
   - [ ] Style matters more
   - [ ] They're disposable

2. A requirement the product doesn't fully meet deserves…
   - [x] An honest "partially" or "no, with approach" — trust-building and defensible
   - [ ] A creative "yes"
   - [ ] Silence
   - [ ] Deleting the row

3. Reusing past answers requires…
   - [x] Verifying they're still current — features move
   - [ ] Nothing, reuse is safe
   - [ ] Legal approval each time
   - [ ] Rewriting from scratch always

4. An ambiguous requirement gets…
   - [x] A logged clarifying question, not a guess
   - [ ] Your best guess
   - [ ] A yes to be safe
   - [ ] Skipped

5. (text) Draft the answer to: "Describe how the solution prevents corporate data access from non-compliant devices." Three sentences, house-style.

### Apply

- type: guided

Ask your mentor for a live or recent RFP and take three real rows end to end: draft, review, final. Track what the reviewer changed — the delta between your draft and the shipped answer is the house style, learned fastest by diff.

---

## Pre-checks

- id: task-pre-checks
- url: phase5/task-pre-checks.html
- status: done
- description: The pre-call ritual — environment, content, and context checks that make every customer session start clean.

### Learn

#### Why a ritual

<p>Most bad demos were lost before they began: dead demo device, expired session, wrong screen shared, no answer to "who are we talking to?" A written pre-check ritual, run identically every time, converts those risks into a five-minute routine. Pilots don't skip the checklist because the plane flew fine yesterday.</p>

#### The three check layers

<p><b>Environment</b> (T-30 min): demo portal logs in, demo devices charged/online/checking in, the specific features you'll show work right now, backup screenshots/recording exist for anything fragile. <b>Content</b> (T-1 day): agenda confirmed with the AE, demo story matched to this customer's stated pains, hero examples chosen, hard questions anticipated. <b>Context</b> (T-1 day): opportunity record read, attendees and roles known, prior conversations reviewed so nobody repeats or contradicts what's been said.</p>

### Practice

- Write your personal pre-check list in the three layers; keep it to one page.
- Run it for real against the demo environment as if a customer call were in 30 minutes; time it.
- Add the two failure modes you've personally hit (or seen in shadows) that the list would have caught.
- Have your mentor add the one they always check that new hires never do.

### Quiz

1. The pre-check ritual is run…
   - [x] Identically before every customer session, regardless of confidence
   - [ ] Only for big customers
   - [ ] After problems occur
   - [ ] Once per quarter

2. Backup screenshots of fragile features exist because…
   - [x] A live failure then costs a sentence, not the demo
   - [ ] Screenshots are prettier
   - [ ] Features fail constantly
   - [ ] Recording is mandatory

3. The context layer prevents…
   - [x] Repeating or contradicting what the customer already discussed with the team
   - [ ] Technical failures
   - [ ] Long meetings
   - [ ] Nothing

4. (text) What are your two personal-experience additions to the list, and what incident motivated each?

### Apply

- type: guided

Laminate it (literally or digitally): make your pre-check list a fixed artifact, and run it before every mock and real session from now on. In your Phase 6 live sessions, note each time an item catches something — that log is the ritual proving its worth.

---

## Weekly Call

- id: task-weekly-call
- url: phase5/task-weekly-call.html
- status: done
- description: Join the team's weekly rhythm — come prepared, contribute your pipeline view, and use the room well.

### Learn

#### What the weekly call is for

<p>The team call is where pipeline moves, blockers surface, and knowledge spreads. As a Phase 5 participant you're no longer just listening: you own updates on the deals you're supporting — status in two sentences, blockers named plainly, asks made explicitly ("I need someone who's done a Entra ID conditional-access demo").</p>
<!-- PLACEHOLDER: confirm the actual call day/time, who runs it, the standing agenda, and what's expected from BTS updates. -->

#### The update format that respects the room

<p>Deal updates follow a tight shape: <b>where it stands</b> ("POC week 2 of 3, criteria 6 of 8 passed"), <b>what changed</b> ("iOS enrollment issue resolved"), <b>what's next / any ask</b> ("closing review Friday; no blockers"). Twenty seconds per deal. Save the war story for after the call — and do share it there; corridor stories are how the team actually learns.</p>

### Practice

- Get the call details and standing agenda from your buddy; attend twice as preparation for contributing.
- Write practice updates for two deals (real ones you're near, or your mock POC) in the three-part shape.
- Deliver one real update on the call.
- Note how senior BTS engineers phrase asks — and steal the phrasing.

### Quiz

1. A good deal update contains…
   - [x] Where it stands, what changed, what's next / the ask — in about twenty seconds
   - [ ] The full history
   - [ ] Only good news
   - [ ] Technical detail for its own sake

2. Blockers are raised…
   - [x] Plainly and with a specific ask
   - [ ] Vaguely, to avoid blame
   - [ ] Never in public
   - [ ] Only to the manager privately

3. The war story belongs…
   - [x] After the call — where it still should be told
   - [ ] In the update
   - [ ] Nowhere
   - [ ] In email only

4. (text) Write your next weekly update in the three-part shape, exactly as you'd say it.

### Apply

- type: guided

Contribute updates for three consecutive weeks. After the third, ask your manager for one piece of feedback on your updates — sharpening this small skill compounds: it's how the whole team perceives your work.

---

## Role Play Demo

- id: task-role-play-demo
- url: phase5/task-role-play-demo.html
- status: done
- description: Deliver your full demo against an actively difficult audience — interruptions, skepticism, and curveballs included.

### Learn

#### Pressure-testing the demo

<p>Your Phase 4 demo ran in calm waters. Real customers interrupt, challenge, and derail: "how much does this cost?", "our current tool does that too," "can we skip to the Windows part?", plus the classic mid-demo technical failure. This role play adds those stressors deliberately, with a teammate briefed to push — because composure is trainable, but only under pressure.</p>

#### The handling repertoire

<p><b>Park</b>: "great question — pricing is [AE]'s domain; let me make sure it's covered after" (note it visibly). <b>Bridge</b>: "it does — and the difference worth showing is…" (acknowledge, don't argue). <b>Flex</b>: "let's jump to Windows now" (a demo is a conversation, not a script — but close the loop on what you skipped). <b>Recover</b>: narrate honestly, use the backup, move on. After each handled moment, return to your spine — the skill is bending without losing the story.</p>

### Practice

- Brief your buddy/mentor on the difficult-customer persona: three planned interruptions, one skeptical comparison, one request to skip ahead.
- Deliver the full demo under this pressure without stopping the session.
- Debrief against the repertoire: which moments were parked/bridged/flexed well, which rattled you?
- Re-run the two worst moments in isolation until the handling is smooth.

### Quiz

1. A pricing question mid-demo gets…
   - [x] Parked visibly for the AE, with the demo resuming
   - [ ] A price quote
   - [ ] Ignored
   - [ ] The demo ended

2. "Our current tool does that too" gets…
   - [x] Acknowledged, then bridged to a differentiating depth — never argued
   - [ ] "No it doesn't"
   - [ ] A feature war
   - [ ] Agreement and moving on silently

3. A request to skip ahead means…
   - [x] Flex to it — the demo serves the customer — then close the loop on skipped ground
   - [ ] Refuse; the script is the script
   - [ ] End the demo
   - [ ] Start over

4. Composure under interruption is built by…
   - [x] Deliberate practice under simulated pressure
   - [ ] Reading about it
   - [ ] Avoiding hard customers
   - [ ] Luck

5. (text) Which interruption rattled you most, and what's your exact recovery line for it now?

### Apply

- type: guided

Run the pressure demo twice with escalating difficulty (second run: your mentor plays a genuinely tough technical evaluator). Passing bar: the observer would let you in front of a real skeptical customer. Their word for it is the gate to Phase 6's live sessions.

---

## Practice Device Actions

- id: task-practice-device-actions
- url: phase5/task-practice-device-actions.html
- status: done
- description: Drill the security actions — locate, lock, message, selective wipe, full wipe — until the lost-device story is reflex.

### Learn

#### The actions and when each is right

<p>From any device view, MaaS360 offers one-time actions. The security ladder, in escalating order: <b>locate</b> (where is it? — subject to platform privacy rules on BYOD), <b>send message</b> ("call IT"), <b>lock</b> (immediate protective step for a misplaced device), <b>reset passcode</b> (owner recovery), <b>selective wipe</b> (remove corporate data and access, personal data untouched — the BYOD offboarding tool), <b>full wipe</b> (factory reset — corporate devices, theft, or terminal compromise). Choosing the <em>proportionate</em> action is the skill: a misplaced BYOD phone gets lock-and-locate, not a full wipe that nukes someone's family photos — a mistake that becomes an HR incident.</p>

#### The demo moment this feeds

<p>"An employee just reported their phone stolen" is the single most reliable demo scenario: locate → lock → message → escalate to wipe, narrated with the ownership distinction. It shows control, speed, and respect for the BYOD boundary in ninety seconds. Drill it until the clicks are automatic and the narration walks the escalation logic out loud.</p>

### Practice

- In the demo environment, run each action against a test device: locate, message, lock, and (if the environment allows) selective wipe.
- Time a full stolen-device sequence: report → locate → lock → message → decision point. Target under two minutes with narration.
- Write the decision table: scenario (misplaced BYOD / stolen corporate / departing employee / compromised device) → proportionate action.
- Check platform nuances in the demo portal: what locate shows on iOS vs Android, and how wipe options differ by ownership mode.

### Quiz

1. A departing employee's BYOD phone gets…
   - [x] Selective wipe — corporate data and access removed, personal untouched
   - [ ] Full wipe
   - [ ] Nothing
   - [ ] Locate only

2. Full wipe is proportionate for…
   - [x] Stolen or terminally compromised corporate devices
   - [ ] Every lost device
   - [ ] BYOD offboarding
   - [ ] Slow devices

3. A misplaced (probably-at-home) BYOD phone first gets…
   - [x] Lock and locate — reversible, proportionate steps
   - [ ] Full wipe immediately
   - [ ] Selective wipe
   - [ ] Public shaming

4. The stolen-device demo lands because…
   - [x] It shows control, speed, and the BYOD privacy boundary in one 90-second story
   - [ ] Theft is fun
   - [ ] It uses every menu
   - [ ] It's long

5. (text) Narrate your stolen-device sequence, action by action, including the escalation decision and the BYOD boundary sentence.

### Apply

- type: guided

Perform the stolen-device drill live for your buddy three times: corporate device, BYOD device, and one where the "customer" pressures you to full-wipe a BYOD phone — practice holding the proportionate line and explaining why. This 90 seconds belongs in every demo you'll ever run.

---

## Mock Onboarding

- id: task-mock-onboarding
- url: phase5/task-mock-onboarding.html
- status: done
- description: Second onboarding rep, harder — a customer admin with opinions, real-world constraints, and plumbing complications.

### Learn

#### Raising the difficulty

<p>Phase 4's mock taught the structure. This rep adds reality: the "customer admin" now has an existing environment ("we already use Entra ID and have 50 devices in an old MDM"), constraints ("security won't give us the Apple ID today"), and opinions ("why do we need ABM at all?"). Migration-shaped and blocked-plumbing situations are the norm in real onboardings — the runbook must bend around them without losing the session.</p>

#### Handling the real-world shapes

<p><b>Existing MDM</b>: acknowledge migration is a path many customers walk; sequence it — new devices into MaaS360 first, migrate the legacy fleet in waves. <b>Blocked plumbing</b>: never let a missing Apple ID kill a session; re-order to what's achievable today (Android binding, policies, portal orientation) and leave the blocked item as a written next step with an owner. <b>"Why do we need X?"</b>: answer with the consequence, not authority — "without ABM, every corporate iPhone needs hands-on setup; with it they enroll from the box."</p>

### Practice

- Update your runbook with a "complications" page: existing-MDM sequencing, blocked-plumbing re-ordering, and consequence-based answers to common why-questions.
- Brief your buddy on the harder persona and constraints.
- Run the full session; you must deliver value despite the blocked Apple ID.
- Debrief: did the session still end with real progress and written next steps?

### Quiz

1. A customer with an existing MDM gets…
   - [x] A sequenced migration story — new devices first, legacy fleet in waves
   - [ ] Told to wipe everything today
   - [ ] Refused
   - [ ] Ignored complexity

2. The Apple ID is blocked by their security team. The session…
   - [x] Re-orders to achievable work now; the blocked item becomes a written, owned next step
   - [ ] Is cancelled
   - [ ] Waits on hold
   - [ ] Uses your Apple ID instead

3. "Why do we need ABM?" is best answered with…
   - [x] The consequence: without it, every corporate iPhone needs hands-on setup
   - [ ] "Apple requires it"
   - [ ] "Trust me"
   - [ ] A docs link

4. (text) What did the harder persona expose in your runbook, and what's now on your complications page?

### Apply

- type: guided

Finalize the runbook with its complications page and file it with your POC kit and pre-check list. Your Phase 6 onboardings are live — this document is what you'll be holding when the real customer's real security team really hasn't released the Apple ID.

---

## Mock POC 1

- id: task-mock-poc-1
- url: phase5/task-mock-poc-1.html
- status: done
- description: Run your POC kit end to end — kickoff, criteria, weekly cadence, and close — against a realistic invented customer.

### Learn

#### The full arc, compressed

<p>This mock runs the whole POC lifecycle from your Phase 4 kit, compressed into about two weeks alongside your other work: a <b>kickoff</b> with your mentor/buddy playing the customer (agree 6–8 written success criteria), a <b>setup day</b> (plumbing health checks against the demo environment), at least two <b>weekly check-ins</b> (progress against criteria, one planted blocker to triage), and a <b>close</b> (walk the criteria, capture results, deliver the technical-win summary).</p>

#### What's being graded

<p>Not perfection — process. Did criteria exist in writing before configuration? Did check-ins actually track them? Did the planted blocker get triaged with your Phase 4 method and communicated honestly? Did the close produce a document an AE could take into a commercial conversation? These process marks are exactly what your mentor will watch for in the real POCs ahead.</p>

### Practice

- Have your mentor invent the customer: industry, fleet mix, two real pain points, one hidden constraint to discover.
- Run kickoff and produce the written criteria within a day.
- Execute setup day with your plumbing checklists; run two check-ins on schedule.
- Triage the planted blocker live, narrating your method.
- Deliver the close: criteria results table plus a half-page technical-win narrative.

### Quiz

1. Configuration begins…
   - [x] After written criteria are agreed — never before
   - [ ] Immediately at kickoff
   - [ ] Whenever convenient
   - [ ] After the close

2. The planted blocker exists to test…
   - [x] Your triage method and honest communication under way
   - [ ] Your patience
   - [ ] The demo environment
   - [ ] Nothing

3. The close document matters because…
   - [x] It's what the AE carries into the commercial conversation — the technical win, in writing
   - [ ] Paperwork is virtue
   - [ ] It restarts the POC
   - [ ] Nobody reads it

4. (text) Paste your mock POC's success criteria list. Which one was hardest to make testable, and how did you fix it?

### Apply

- type: guided

Hold a retro with your mentor against the process marks: criteria discipline, cadence quality, triage under way, close quality. Their sign-off on this mock is the gate to touching real POCs — Mock POC 2 (Phase 6) and 3 (Phase 7) raise the stakes from here.

---

## Lead Demo

- id: task-lead-demo
- url: phase5/task-lead-demo.html
- status: done
- description: Lead a real customer demo with your mentor as safety net — the first live rep of the motion you've drilled.

### Learn

#### Training wheels, real road

<p>This is a real customer, a real deal, and you at the wheel — with your mentor on the call, introduced as part of the team, ready to catch anything dropped. The AE briefs you; you run pre-checks, deliver the demo, and field questions, escalating to your mentor with a clean handoff line ("I'll let [mentor] add depth on that one") rather than guessing past your edge.</p>

#### Making the safety net invisible

<p>Agree the protocol with your mentor beforehand: when they'll step in unprompted (factual error, deal-risking moment), how you invite them in (the handoff line), and how they'll feed you notes silently (chat) versus aloud. A rehearsed net lets you take real risks — which is the point of the rep. Afterward: full debrief within 24 hours while it's fresh.</p>
<!-- PLACEHOLDER: confirm how first lead demos get scheduled on this team — who picks the deal, and any criteria for a "good first customer." -->

### Practice

- Get the deal: work with your manager/AE to pick an appropriate first customer.
- Read the opportunity, brief with the AE, and tailor your demo spine to their stated pains.
- Agree the safety-net protocol with your mentor.
- Run your full pre-check ritual; deliver the demo.
- Hold the 24-hour debrief: what landed, what was caught by the net, what's the one fix?

### Quiz

1. Questions past your knowledge edge get…
   - [x] The clean handoff line to your mentor — never a guess
   - [ ] Your best guess
   - [ ] "I don't know" and silence
   - [ ] Ignored

2. The safety-net protocol is agreed…
   - [x] Before the call, including when the mentor steps in unprompted
   - [ ] During the call
   - [ ] Never — improvise
   - [ ] After the call

3. The debrief happens within 24 hours because…
   - [x] The detail that teaches most evaporates fastest
   - [ ] Calendars require it
   - [ ] It's ceremonial
   - [ ] The customer expects minutes

4. (text) From your lead demo: what did the net catch, and what will you own solo next time?

### Apply

- type: guided

Schedule and deliver the demo. In the debrief, agree with your mentor the specific criteria for reducing the net next rep (fewer planned step-ins, you fielding the Q&A alone). Phase 6 makes this motion routine — this rep makes it real.

---

## Phase 5 Readiness Check

- id: task-phase5-readiness
- url: phase5/task-phase5-readiness.html
- status: done
- description: Confirm you're ready for Phase 6 — live motions rehearsed under pressure, kits proven in mocks, first real rep done.

### Learn

#### What "ready" means here

<p>Phase 5 was the summit push: pressure-tested demo, hardened onboarding runbook, a full mock POC with process sign-off, device-action fluency, pipeline contribution, and — the big one — your first customer-facing lead demo with the net. Ready for Phase 6 means those motions repeat without drama: Phase 6 is live demos, live onboardings, and Mock POC 2, all with thinner safety nets.</p>

#### How the check works

<p>Bring evidence, not claims: the mock POC close document, the revised runbook with complications page, the lead-demo debrief notes, and your weekly-call updates. The manager conversation here is less "are you ready?" and more "what support do you still want in Phase 6?" — name it honestly; nets exist to be requested.</p>

### Practice

- Assemble the evidence pack: POC close doc, runbook, debrief notes, pre-check list, decision table for device actions.
- Write your honest "still want support on" list for Phase 6.
- Confirm your three fluency items stay cold-callable: APNs story, stolen-device drill, Android mode mix.
- Book the Phase 5 review.

### Quiz

1. Phase 5's evidence pack matters because…
   - [x] Live-phase readiness is shown by artifacts and reps, not self-assessment
   - [ ] Managers like folders
   - [ ] It's graded by length
   - [ ] It replaces Phase 6

2. The "still want support on" list is…
   - [x] Honest and specific — nets exist to be requested
   - [ ] A weakness to hide
   - [ ] Empty if you're good
   - [ ] Someone else's job

3. Phase 6 differs from Phase 5 mainly by…
   - [x] Volume and thinner nets on the same live motions
   - [ ] All-new skills
   - [ ] Less customer contact
   - [ ] More reading

4. (text) What's on your support list for Phase 6, and what would make you take each item off it?

### Apply

- type: guided

Run the review with the evidence pack. Agree the Phase 6 plan: which live demos and onboardings you'll take, with what support. Then go — the summit is in sight and the remaining phases are made of real customers.
