# Phase 4: High Camp

- id: phase4
- icon: 🏔️
- subtitle: Threat defense, advanced platform skills, demos, and your first mock onboarding.

<!-- Edit freely. Ask Claude to "rebuild the site from content" when done. -->

---

## MTD 101

- id: task-mtd-100
- url: phase4/task-mtd-100.html
- status: done
- description: Mobile Threat Defense (MTD) secures devices against network, device, app, and phishing attacks natively within the MaaS360 app.

### Learn

#### The big picture

<p>Mobile Threat Defense (MTD) is MaaS360's built-in protection against mobile threats — malicious networks, compromised devices, risky apps, and phishing — detected natively inside the MaaS360 app.</p>

#### The four threat vectors

<p>MTD watches four areas: <b>network</b> (e.g. man-in-the-middle Wi-Fi), <b>device</b> (e.g. jailbreak/root), <b>app</b> (e.g. malware), and <b>phishing</b> (malicious links). When it detects a threat it can warn the user or trigger a policy action.</p>

#### Check your understanding

<p>Before moving on, make sure you could explain this to a teammate in two sentences.</p><!-- PLACEHOLDER: insert diagram or short video here -->

### Practice

- Open the MaaS360 MTD / threat section (placeholder).
- Identify the four threat categories MTD covers.
- Find where a detected threat would appear.
- Note one automated action MTD can take on detection.

### Quiz

1. MTD stands for…
   - [x] Mobile Threat Defense
   - [ ] Managed Test Device
   - [ ] Multi-Tenant Database
   - [ ] Mobile Transfer Daemon

2. Which is NOT one of MTD's threat vectors?
   - [ ] Network
   - [ ] Device
   - [ ] App
   - [x] Printer

3. MTD runs…
   - [ ] On a separate server only
   - [x] Natively within the MaaS360 app
   - [ ] As a browser plugin
   - [ ] Only on desktops

4. A phishing protection in MTD guards against…
   - [x] Malicious links/sites
   - [ ] Slow Wi-Fi
   - [ ] Low battery
   - [ ] Cracked screens

5. When MTD detects a threat it can…
   - [ ] Do nothing ever
   - [x] Warn the user or enforce a policy action
   - [ ] Reboot the router
   - [ ] Cancel the SIM

6. (text) Why is phishing protection on mobile increasingly important compared to a few years ago?

### Apply

- type: guided

A security-conscious customer worries about employees joining rogue Wi-Fi. Explain how MTD's network protection helps and what action it can take.

---

## Teamviewer

- id: task-teamviewer
- url: phase4/task-teamviewer.html
- status: done
- description: Remote support from the console — how the TeamViewer integration lets admins see and control managed devices, and how to demo it.

### Learn

#### What the integration does

<p>MaaS360 integrates with TeamViewer to provide remote support to managed devices directly from the portal: from a device's view, an admin starts a remote session to see — and on supported platforms control — the device for troubleshooting. It works across Android, iOS, Windows, and macOS, with the depth of control varying by platform (mobile OSes restrict full control more than desktops; iOS support centers on screen sharing).</p>

#### Why it demos brilliantly

<p>Remote support is one of the most relatable moments in any demo: every IT team lives the "can you tell me what you see on your screen?" pain. Showing a session launched from the same console that manages the device — no separate tool, no reading codes over the phone — lands with helpdesk-minded evaluators immediately. Know the honest caveats: the integration must be enabled for the account, and platform capabilities differ.</p>
<!-- PLACEHOLDER: confirm whether the demo environment has TeamViewer integration enabled and which demo device to use for it. -->

### Practice

- In the demo portal, find where the TeamViewer integration is enabled (Setup → Services area) and whether the demo account has it active.
- From a device view, locate where a remote support session would be initiated.
- Write down the platform capability differences (view vs control) at the level you'd state them to a customer.
- If the demo environment supports it, run one practice session end to end with your buddy's test device.

### Quiz

1. The TeamViewer integration lets an admin…
   - [x] Start a remote support session on a managed device from the MaaS360 portal
   - [ ] Read user emails
   - [ ] Bypass enrollment
   - [ ] Flash device firmware

2. Platform depth varies: the honest way to state it is…
   - [x] Desktops support full control; mobile platforms are more restricted, with iOS centered on screen sharing
   - [ ] Everything is fully controllable everywhere
   - [ ] Only Windows works
   - [ ] Never discuss limits

3. The demo power of this feature comes from…
   - [x] Helpdesk pain everyone recognizes, solved from the same console that manages the device
   - [ ] Its rarity
   - [ ] Its price
   - [ ] Animation quality

4. (text) Script your 60-second demo narration for launching a remote session, including one honest caveat sentence.

### Apply

- type: guided

Add remote support to your demo repertoire: practice the narration with the portal open, twice. If the integration isn't active in the demo environment, flag it to your mentor now — it's a demo asset worth having ready before Phase 5's lead demos.

---

## Apple 301

- id: task-apple-300
- url: phase4/task-apple-300.html
- status: done
- description: Deep technicalities — the APNs certificate lifecycle, DEP token mechanics, supervision internals, and the Apple plumbing a BTS engineer must never get wrong.

### Learn

#### The APNs MDM certificate lifecycle

<p>Before MaaS360 can manage a single Apple device, the customer creates an <b>APNs MDM certificate</b>: in the portal (Setup → Services → Mobile Device Management → Apple MDM Certificate) MaaS360 generates a <b>CSR</b> (certificate signing request); the customer takes it to Apple's push-certificate portal (identity.apple.com/pushcert) signed in with a <b>company Apple ID</b>, gets the certificate issued, and uploads it back to MaaS360.</p>
<p>Two facts customers get burned by, and you must always land: the certificate is <b>valid for one year</b> and must be renewed every 365 days — and renewal must use the <b>same Apple ID that created it</b>. Renewing with a different Apple ID issues a <em>different</em> certificate, which breaks the trust chain with every enrolled device: the fleet must be re-enrolled. Always advise a shared corporate Apple ID (never a personal one) documented in more than one place.</p>

#### What expiry actually does

<p>If the APNs certificate lapses, MaaS360 can no longer push wake-ups: devices stop receiving timely commands and drift out of contact — management is effectively down until renewal, and if the cert was replaced rather than renewed, re-enrollment awaits. Symptoms: fleet-wide "last check-in" going stale at the same time. This is the first thing to check in Apple troubleshooting.</p>

#### DEP tokens and supervision internals

<p>The ABM link runs on a <b>server token</b>: created in ABM against an "MDM server" entry, uploaded to MaaS360 (Apple Device Enrollment Program → Tokens), and — like APNs — subject to annual renewal. Devices assigned to that MDM server in ABM receive their enrollment during Setup Assistant per the assigned <b>DEP enrollment profile</b>, which controls supervision, whether the MDM profile is removable, and which Setup Assistant screens are skipped. Supervision itself is what unlocks the deeper controls you demo on corporate devices: silent app installs, tighter restrictions, and always-on management the user can't remove. Devices not bought through Apple's channel can be added to ABM with Apple Configurator.</p>

### Practice

- In the demo portal, locate the APNs certificate entry and note its expiry date and the Apple ID hint if shown.
- Locate the DEP token area and identify the token's expiry and its linked ABM server name.
- Write the APNs renewal runbook as five numbered steps a customer admin could follow, including the same-Apple-ID warning.
- Open a DEP enrollment profile (view only) and list which Setup Assistant options and removability settings it controls.
- Read the APNs renewal page and DEP configuration guide at ibm.com/docs/en/maas360; note anything version-specific.

### Quiz

1. The APNs certificate renewal rule that prevents fleet re-enrollment is…
   - [x] Renew with the same Apple ID that created the certificate, before the 365-day expiry
   - [ ] Renew from any Apple ID
   - [ ] APNs certificates don't expire
   - [ ] Only Apple can renew it

2. A fleet where every Apple device's last check-in went stale on the same date suggests…
   - [x] The APNs certificate expired
   - [ ] Every user quit
   - [ ] A Wi-Fi outage
   - [ ] iOS update

3. The DEP server token…
   - [x] Links ABM to MaaS360 and also requires annual renewal
   - [ ] Never expires
   - [ ] Is the same as the APNs certificate
   - [ ] Lives on each device

4. Supervision is the prerequisite for…
   - [x] Silent app installs, deepest restrictions, and non-removable management
   - [ ] Any enrollment at all
   - [ ] BYOD privacy
   - [ ] APNs delivery

5. The Setup Assistant experience during automated enrollment is controlled by…
   - [x] The DEP enrollment profile assigned in MaaS360
   - [ ] The user's preferences
   - [ ] The carrier
   - [ ] Random chance

6. (text) A customer renewed APNs with a new Apple ID and management broke. Explain to their frustrated IT director what happened and what has to happen now — with the empathy you'd actually use.

### Apply

- type: guided

Write the two-page "Apple plumbing health check" you'd run at the start of any POC or onboarding: APNs cert (expiry, Apple ID custody), DEP token (expiry, ABM linkage), enrollment profile settings, and one test device end to end. Review it with your mentor — this becomes a real artifact you'll reuse in Phase 5+.

---

## Android 301

- id: task-android-300
- url: phase4/task-android-300.html
- status: done
- description: Deep technicalities — zero-touch and KME mechanics, dedicated-device lockdown, app management internals, and the Android details that decide technical wins.

### Learn

#### Zero-touch and KME under the hood

<p>Both programs work by registering device identifiers with an enrollment service before the device ever boots: resellers upload the devices they sell (zero-touch for the Google ecosystem, KME for Samsung), the customer's console maps those devices to a provisioning configuration pointing at MaaS360, and first boot pulls that config — making MaaS360 device owner with no human step. The technical gotchas worth knowing: registration is tied to purchase channel (devices bought outside participating resellers must be added manually or via QR), and a factory reset re-triggers the enrollment — which is a feature: stolen or wiped corporate devices come back managed.</p>

#### Dedicated devices, properly locked

<p>Dedicated (kiosk) mode is fully managed plus a lockdown policy: single-app or multi-app kiosk, pinned launcher, restricted hardware keys and status bar. The design questions that matter in real deals: what happens on reboot (auto-return to the kiosk app), how updates reach the kiosk app without user interaction, and how a technician exits kiosk mode for service (admin-controlled exit, not a user backdoor).</p>

#### App management internals

<p>Through managed Google Play, apps are approved into the customer's private catalog and assigned to groups; on fully managed and dedicated devices installs are silent, and app configuration (<b>managed configurations</b>) lets MaaS360 push settings into apps — server URLs, feature flags — so apps arrive pre-configured. Private (in-house) apps can be published to the customer's managed Play catalog without going public. The demo moment: an app appearing and configuring itself on a device with zero user taps.</p>

### Practice

- In the demo portal, find the kiosk/dedicated policy settings and list what they control (launcher, allowed apps, hardware restrictions).
- Locate managed configurations for an app in the catalog if the demo hierarchy has one.
- Write the zero-touch/KME first-boot sequence as numbered steps from unboxing to policies applied.
- Note the answer to each dedicated-device design question above for a hypothetical kiosk fleet.
- Skim the Android Enterprise sections at ibm.com/docs/en/maas360 for anything team demos rely on that isn't covered here.

### Quiz

1. Zero-touch/KME survive a factory reset because…
   - [x] Enrollment is anchored to the device's registration with the program, re-applied at first boot
   - [ ] The apps hide from the reset
   - [ ] They don't survive resets
   - [ ] Resets are blocked entirely

2. A device bought from a non-participating reseller…
   - [x] Won't auto-enroll — it needs manual registration or QR provisioning
   - [ ] Enrolls anyway
   - [ ] Can never be managed
   - [ ] Becomes a kiosk

3. Managed configurations let MaaS360…
   - [x] Push settings into apps so they arrive pre-configured
   - [ ] Read app data
   - [ ] Rewrite app code
   - [ ] Only uninstall apps

4. A kiosk device rebooting should…
   - [x] Return automatically to the kiosk app with no user-visible escape
   - [ ] Show the normal launcher
   - [ ] Ask the user what to do
   - [ ] Factory reset

5. Silent app install requires…
   - [x] Fully managed or dedicated mode (or the work profile side for work apps)
   - [ ] Any personal device
   - [ ] User approval every time
   - [ ] Rooting

6. (text) A logistics prospect asks: "If a driver factory-resets our scanner to sell it, what happens?" Answer precisely, then add the one-sentence business takeaway.

### Apply

- type: guided

Design the technical rollout for 500 KME scanners on paper: registration, provisioning config, dedicated policy contents, app + managed configuration, and the reset/theft story. Present it to your mentor as if to a customer's technical evaluator — this is Android 301's version of the plumbing health check.

---

## Practice Demos

- id: task-practice-demos
- url: phase4/task-practice-demos.html
- status: done
- description: Build and rehearse your first full demo — a 20-minute story from enrollment to policy to app to action.

### Learn

#### A demo is a story, not a tour

<p>Weak demos walk through menus; strong demos follow a narrative. The reliable spine: <b>a day in the life of a managed device</b> — enroll it (or show one enrolling), watch policies land, push an app, run a device action, show the compliance view. Each stop answers a question the customer actually has: how hard is rollout? what control do we get? how do apps arrive? what happens when a device is lost?</p>

#### Craft rules that separate pros

<p>Open with the customer's problem, not the product ("you said rollout across 3 sites is the pain — let me show you enrollment first"). One idea per screen; say what they're seeing before clicking. Keep a <b>recovery plan</b> for every step: know what you'll say if the device doesn't respond in demo time (real answer: push timing varies — narrate it honestly and move on, returning when it lands). Close each chapter with the "so what": "that's zero-touch — your 3-site rollout without a technician on site."</p>

### Practice

- Script your 20-minute demo using the day-in-the-life spine and your Phase 2 hero examples.
- Rehearse alone twice with the portal live — out loud, clicking everything for real.
- Note every moment something felt slow or fragile; build your recovery line for each.
- Deliver it to your buddy; collect three pieces of feedback: pace, clarity, and the weakest chapter.

### Quiz

1. The day-in-the-life spine works because…
   - [x] Each stop answers a real customer question in a natural order
   - [ ] It shows the most menus
   - [ ] It's the shortest option
   - [ ] Stories are for executives only

2. When a pushed action doesn't land instantly on the demo device…
   - [x] Narrate honestly that push timing varies, continue, and return when it lands
   - [ ] Click it repeatedly
   - [ ] Blame the Wi-Fi and end the demo
   - [ ] Pretend it worked

3. "One idea per screen" means…
   - [x] Saying what the customer is about to see, showing it, landing the point — then moving
   - [ ] Using one monitor
   - [ ] Never scrolling
   - [ ] Small fonts

4. Every chapter should close with…
   - [x] The "so what" tied to the customer's stated problem
   - [ ] A joke
   - [ ] The price
   - [ ] A menu recap

5. (text) Write your demo's opening 30 seconds, verbatim, for a customer whose stated pain is device rollout across many sites.

### Apply

- type: guided

Record yourself (screen + voice) delivering the full 20 minutes. Watch it back — it's uncomfortable and it's the fastest improvement tool that exists. Fix the two worst moments and deliver it once more to your buddy before calling this done.

---

## Troubleshooting 101

- id: task-troubleshooting-100
- url: phase4/task-troubleshooting-100.html
- status: done
- description: A first triage method — the systematic questions and checks for the problems you'll actually meet in demos, POCs, and onboarding.

### Learn

#### Triage beats knowledge

<p>You can't memorize every failure mode, but you can own a method. The BTS triage ladder: (1) <b>scope</b> — one device or many? one platform or all? when did it start? (2) <b>recent change</b> — certificate expiry, policy edit, OS update, network change? (3) <b>the plumbing</b> — for fleet-wide Apple issues check APNs first; Android-wide, the managed Google Play binding; a single device, its last check-in and enrollment state. (4) <b>reproduce</b> — can you make it happen on a test device? A calm, visible method also reassures customers even before the fix.</p>

#### The classics you'll actually meet

<p><b>Device not checking in</b>: single device → network, power, user removed profile (BYOD can), device off; fleet-wide same-day → certificate/token expiry. <b>Enrollment fails</b>: credentials, enrollment mode mismatch (trying work profile on a device that needs factory-reset provisioning), unsupported OS version. <b>Policy not applying</b>: is the device in the targeted group? has it checked in since the change? is another policy taking precedence? <b>App not installing</b>: license availability, supervision/mode requirements for silent install, store connectivity. Each classic maps to the ladder — scope, change, plumbing, reproduce.</p>

### Practice

- Write the triage ladder on a card (physical or digital) in your own words.
- For each classic above, list the first three checks in order.
- Ask your mentor for the two most common real issues the team hits in POCs and add them to your list.
- In the demo portal, practice finding the evidence for each check: last check-in, group membership, policy assignment, APNs status.

### Quiz

1. The first triage question is always…
   - [x] Scope — one device or many, one platform or all, since when?
   - [ ] Whose fault is it?
   - [ ] Which competitor caused this?
   - [ ] Should we reinstall everything?

2. Every Apple device stopped checking in around the same date. Your first check is…
   - [x] APNs certificate status
   - [ ] Each device's Wi-Fi
   - [ ] The user's password
   - [ ] App licenses

3. A policy isn't applying to one device. Early checks include…
   - [x] Group membership, check-in since the change, and policy precedence
   - [ ] Reboot the portal
   - [ ] Wipe the device
   - [ ] Ignore it

4. Showing a calm method in front of a customer matters because…
   - [x] Visible systematic triage builds confidence even before the fix lands
   - [ ] It stalls for time
   - [ ] Customers enjoy suspense
   - [ ] It doesn't

5. (text) A POC customer says "the app you pushed yesterday isn't on the test iPad." Write your first three questions, in order, and why each.

### Apply

- type: guided

Have your buddy break something benign in the demo environment (or describe a broken scenario in detail) and run live triage with the ladder, narrating as you go. Twenty minutes of this converts the card into reflex — which is what Phase 5's real POCs will demand.

---

## Shadow Demos

- id: task-shadow-demos
- url: phase4/task-shadow-demos.html
- status: done
- description: Watch real demos with a structured observation method — steal what works before you lead your own.

### Learn

#### Shadowing with intent

<p>Passive watching teaches little. Shadow with an observation sheet split in three: <b>structure</b> (how did they open? what order did chapters run? how did they close and set next steps?), <b>customer handling</b> (how were questions fielded, parked, or turned into discovery? what did they do when something broke?), and <b>micro-moves</b> (phrases, transitions, honest caveats that landed well). Steal shamelessly — every good demo voice starts as a collage.</p>

#### Logistics done right

<p>Ask the demo owner in advance if you can shadow and whether you'll be introduced (usually a one-line "Jordan from our technical team is joining"). Stay muted, camera per team norm, and never jump in unless invited. Afterwards, a 10-minute debrief with the presenter — "why did you skip the app chapter?" — is where half the learning lives.</p>
<!-- PLACEHOLDER: confirm how many shadows are expected in this phase and how new hires get added to demo invites. -->

### Practice

- Get yourself invited to at least two upcoming demos through your buddy, mentor, or aligned AEs.
- Prepare the observation sheet before each; fill it during.
- Hold the 10-minute debrief with each presenter within a day.
- Compare both demos: what did both presenters do despite different styles? That intersection is the team's real playbook.

### Quiz

1. The observation sheet exists because…
   - [x] Structured watching (structure / customer handling / micro-moves) converts demos into usable technique
   - [ ] Notes look professional
   - [ ] It's required paperwork
   - [ ] Memory is perfect anyway

2. During someone else's demo, you speak…
   - [x] Only if invited
   - [ ] Whenever you know the answer
   - [ ] To correct small errors
   - [ ] Never, even if invited

3. The post-demo debrief matters because…
   - [x] The presenter's reasoning ("why I skipped X") is invisible from the outside
   - [ ] It's polite
   - [ ] It extends the meeting
   - [ ] Debriefs are for failures only

4. (text) From your first shadow: one structural choice, one customer-handling move, and one exact phrase you're stealing.

### Apply

- type: guided

After both shadows, revise your own practice demo script with at least three stolen improvements — and note which presenter each came from. Show your mentor the before/after. That's shadowing converted into your own demo, which is the whole point.

---

## How to Run a POC

- id: task-how-to-run-poc
- url: phase4/task-how-to-run-poc.html
- status: done
- description: The POC playbook — success criteria, scoping, cadence, and closing, learned before you're handed a live one.

### Learn

#### POCs are won at the start

<p>A proof of concept succeeds or fails at its kickoff, not its end. The non-negotiable: <b>written success criteria</b> agreed with the customer before anything is configured — typically 5–10 specific, testable statements ("corporate iPhones enroll via ABM with no user interaction," "a lost device is locked within minutes"). Without them, POCs drift into endless "one more thing" evaluations that close nothing. With them, the final meeting is a checklist review that naturally asks: "everything passed — what's between us and moving forward?"</p>

#### The shape of a healthy POC

<p><b>Scope</b>: small and representative — a handful of devices per platform in play, the customer's real use cases, a defined time window (a few weeks, not months). <b>Setup</b>: run your Apple/Android plumbing health checks (301 artifacts) on day one; most "MaaS360 is broken" moments in POCs are certificate or binding setup gaps. <b>Cadence</b>: a short weekly check-in — progress against criteria, blockers, next steps — keeps momentum and surfaces problems while they're small. <b>Close</b>: walk the criteria one by one, capture results in writing, and hand the AE a clean technical-win narrative.</p>

### Practice

- Draft a success-criteria template: 8 example criteria covering enrollment, policy, apps, security actions, and reporting.
- Ask your mentor for a real past POC's criteria (or war story) and compare against your template.
- Write the kickoff-meeting agenda you'd run: intros, criteria agreement, environment plan, timeline, cadence.
- Draft the weekly check-in format: three sections, ten minutes.

### Quiz

1. Success criteria must be agreed…
   - [x] In writing, at the start, before configuration begins
   - [ ] At the end, to match results
   - [ ] Verbally is fine
   - [ ] Never — flexibility wins

2. A good criterion reads like…
   - [x] "Corporate iPhones enroll via ABM with no user interaction" — specific and testable
   - [ ] "MaaS360 works well"
   - [ ] "The customer is happy"
   - [ ] "Devices are secure"

3. The POC's first technical day should include…
   - [x] The plumbing health checks — APNs, tokens, bindings — before anything user-facing
   - [ ] The hardest use case
   - [ ] A pricing discussion
   - [ ] Nothing planned

4. Weekly check-ins exist to…
   - [x] Track criteria progress and catch blockers while they're small
   - [ ] Fill calendars
   - [ ] Renegotiate scope weekly
   - [ ] Replace the final review

5. The close of a passed POC should end with…
   - [x] Written results against criteria and a clear "what's between us and moving forward?"
   - [ ] A thank-you and silence
   - [ ] More criteria
   - [ ] A restart

6. (text) Write three success criteria for a hospital POC: 200 shared iPads, BYOD nurse phones, and a lost-device concern.

### Apply

- type: guided

Assemble your complete POC kit: criteria template, kickoff agenda, weekly check-in format, and closing checklist. Review it with your mentor and refine. Phase 5's mock POC will run this kit end to end — build it like it's real, because it's about to be.

---

## Identity 201

- id: task-identity-200
- url: phase4/task-identity-200.html
- status: done
- description: Process depth on identity — directory sync in practice, authentication flows at enrollment, and conditional access conversations.

### Learn

#### Directory integration in practice

<p>Identity 101 gave you the why; here's the how it plays in deals. The customer connects MaaS360 to their directory (Active Directory / Entra ID), and users plus groups flow into the console and stay synced. Enrollment then authenticates against corporate credentials — the user proves who they are with the account they already have, and group membership drives which policies and apps land (the Groups task's automation story, now with its identity engine visible).</p>

#### Authentication at enrollment, concretely

<p>Walk the moment a user enrolls: they hit the enrollment URL, authenticate with corporate credentials (plus MFA if configured), MaaS360 matches them to their directory identity, and everything downstream — group targeting, app entitlements, certificate identity — hangs off that match. When SSO is configured, the enrollment sign-in is the same experience as every other corporate app, which users and admins both notice favorably.</p>

#### The conditional access conversation

<p>Customers increasingly ask for device state to gate access: "only enrolled, compliant devices reach email and corporate apps." At 201 level you should hold the shape of the conversation — enrollment and compliance become signals that access decisions can use, tying device management into the customer's broader zero-trust posture — and know that the specific integration details depend on the customer's identity stack, which is a design conversation to bring your mentor or a specialist into.</p>
<!-- PLACEHOLDER: confirm which conditional-access integrations the team actively demos, and any demo environment prerequisites for showing them. -->

### Practice

- In the demo portal, find the directory/identity configuration area under Setup and identify what's connected in the demo environment.
- Trace one demo user from directory group → MaaS360 group → assigned policy/apps.
- Write the enrollment authentication moment as a four-step story you can tell on a call.
- Draft your two-sentence answer to "can you block unenrolled devices from email?" ending with a qualifying question about their identity stack.

### Quiz

1. Directory sync means user and group changes…
   - [x] Flow into MaaS360 automatically and keep targeting current
   - [ ] Require nightly manual import
   - [ ] Only apply to new devices
   - [ ] Break enrollment

2. At enrollment, the user authenticates with…
   - [x] Their existing corporate credentials (plus MFA where configured)
   - [ ] A MaaS360-only password
   - [ ] The admin's account
   - [ ] No authentication

3. In conditional access conversations, device enrollment/compliance acts as…
   - [x] A signal that access decisions can require
   - [ ] A replacement for identity
   - [ ] A firewall rule
   - [ ] Marketing language

4. When a conditional-access question gets deep into the customer's identity stack, the right BTS move is…
   - [x] Hold the shape, qualify their stack, and bring in your mentor/specialist for the design detail
   - [ ] Improvise specifics
   - [ ] Change the subject
   - [ ] Promise anything

5. (text) Write your qualifying answer to "can you block unenrolled devices from email?" exactly as you'd say it.

### Apply

- type: guided

Run the identity thread through a mock discovery with your buddy: they play an IT director with Entra ID and an MFA mandate. Cover sync, enrollment auth, and the conditional-access shape, and practice the handoff line for the deep end. Note what you couldn't answer — that's your question list for your mentor.

---

## Mock Onboarding

- id: task-mock-onboarding
- url: phase4/task-mock-onboarding.html
- status: done
- description: Run a full new-customer onboarding session against a practice environment, with your buddy as the customer admin.

### Learn

#### What an onboarding session is

<p>When a deal closes, someone walks the customer's admin through standing up their MaaS360 environment: platform plumbing (APNs certificate, ABM token, managed Google Play binding), first policies, first enrollments, and admin basics. As a BTS engineer you'll support and eventually lead these sessions — they're where the technical win becomes a live customer.</p>

#### The session structure that works

<p>A reliable 60-minute shape: <b>orient</b> (5 min — what we'll accomplish today), <b>plumbing</b> (20 min — walk the customer admin through certificate/token setup on their side, since these steps need their Apple ID and Google account), <b>first device</b> (15 min — enroll one device together and watch policies land; the emotional peak of the session), <b>admin tour</b> (15 min — where devices, policies, and support live), <b>next steps</b> (5 min — what they'll do before the next session, written down). The customer admin drives their own console wherever possible — people keep what they did, not what they watched.</p>

### Practice

- Build your onboarding runbook from the structure above, with the exact clicks for each plumbing step.
- Dry-run the plumbing section against the demo environment yourself.
- Schedule the mock: your buddy plays a mildly nervous customer admin who's never seen the console.
- Run the full 60 minutes, having them drive wherever a real customer would.
- Debrief: where did they get lost, and what would you change?

### Quiz

1. The plumbing steps (APNs, ABM token) involve the customer directly because…
   - [x] They require the customer's own Apple ID and accounts — and they must know custody matters for renewals
   - [ ] It fills time
   - [ ] IBM can't do them
   - [ ] They're optional

2. The customer admin should drive their console because…
   - [x] People retain what they did, not what they watched
   - [ ] It's less work for you
   - [ ] It's a test
   - [ ] Insurance requires it

3. The emotional peak of a first onboarding session is…
   - [x] The first device enrolling and policies landing live
   - [ ] The pricing recap
   - [ ] The admin tour
   - [ ] The calendar invite

4. Next steps at session end should be…
   - [x] Written, specific, and owned by the customer before the next session
   - [ ] Implied
   - [ ] Optional
   - [ ] Sent a week later

5. (text) During the mock: what confused your "customer" that you hadn't predicted, and how will your runbook change?

### Apply

- type: guided

Revise your runbook from the debrief and run the mock once more — same structure, different invented customer (new industry, new device mix). Two reps with revision between them is the minimum before Phase 5 puts you in front of the real thing.

---

## Phase 4 Readiness Check

- id: task-phase4-readiness
- url: phase4/task-phase4-readiness.html
- status: done
- description: Confirm you're ready for Phase 5 — deep platform knowledge, a rehearsed demo, a POC kit, and onboarding reps done.

### Learn

#### What "ready" means here

<p>Phase 4 was the high camp: 301-level Apple and Android depth (certificates, tokens, zero-touch mechanics), identity at working depth, triage method, and — critically — your first performing assets: a rehearsed demo, a POC kit, an onboarding runbook, and shadow notes. Phase 5 points all of this at real deal motions with training wheels. Ready means the assets exist, have survived at least one rep with feedback, and you can field the classic hard questions (APNs renewal gone wrong, factory-reset theft story, mode mixes) cold.</p>

#### How the check works

<p>Self-review, then the manager session — which for this phase should include a 10-minute demo excerpt delivered live and one triage scenario answered on the spot. From Phase 5 on, your audience includes customers; this review is the last all-internal checkpoint.</p>

### Practice

- Confirm your four assets are current: demo script (with stolen improvements), POC kit, onboarding runbook, plumbing health checks.
- Drill the three classic hard questions out loud: APNs same-Apple-ID story, KME reset/theft story, conditional access qualifying answer.
- Re-run one triage scenario with your buddy cold.
- Book the Phase 4 review; agree the demo excerpt you'll deliver in it.

### Quiz

1. Phase 4's real output is…
   - [x] Performing assets — demo, POC kit, runbook — that survived feedback reps
   - [ ] Read documentation
   - [ ] Portal hours logged
   - [ ] Quiz scores

2. The manager review includes a live demo excerpt because…
   - [x] It's the last all-internal audience before customers see your work
   - [ ] Managers enjoy demos
   - [ ] It's tradition
   - [ ] It replaces Phase 5

3. If the APNs hard-question answer still requires notes…
   - [x] Drill it this week — it's a fluency item, not a reference item
   - [ ] Notes are fine forever
   - [ ] Skip Apple deals
   - [ ] Memorize the docs URL

4. (text) Which of your four assets is weakest, what feedback shaped the others, and what's the plan before Phase 5?

### Apply

- type: guided

Run the review: 10-minute demo excerpt, one cold triage scenario, assets walkthrough. Agree Phase 5 starts. From here the mountain has customers on it — everything you built in Phase 4 is about to earn its keep.
