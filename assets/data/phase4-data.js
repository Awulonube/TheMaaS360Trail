/* Phase 4: High Camp — generated from content/phase4.md by content/tools/build.js. */
/* Edit content/phase4.md, then run: node content/tools/build.js */
/* IBM Docs reference: https://www.ibm.com/docs/en/maas360 */
window.PHASE4_DATA = {
  "id": "phase4",
  "title": "Phase 4: High Camp",
  "subtitle": "Threat defense, advanced platform skills, demos, and your first mock onboarding.",
  "icon": "🏔️",
  "tasks": [
    {
      "id": "task-mtd-100",
      "phaseId": "phase4",
      "title": "MTD 101",
      "description": "Mobile Threat Defense (MTD) secures devices against network, device, app, and phishing attacks natively within the MaaS360 app.",
      "url": "phase4/task-mtd-100.html",
      "learn": [
        {
          "id": "p1",
          "title": "The big picture",
          "body": "<p>Mobile Threat Defense (MTD) is MaaS360's built-in protection against mobile threats — malicious networks, compromised devices, risky apps, and phishing — detected natively inside the MaaS360 app.</p>"
        },
        {
          "id": "p2",
          "title": "The four threat vectors",
          "body": "<p>MTD watches four areas: <b>network</b> (e.g. man-in-the-middle Wi-Fi), <b>device</b> (e.g. jailbreak/root), <b>app</b> (e.g. malware), and <b>phishing</b> (malicious links). When it detects a threat it can warn the user or trigger a policy action.</p>"
        },
        {
          "id": "p3",
          "title": "Check your understanding",
          "body": "<p>Before moving on, make sure you could explain this to a teammate in two sentences.</p><!-- PLACEHOLDER: insert diagram or short video here -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Open the MaaS360 MTD / threat section (placeholder).",
          "Identify the four threat categories MTD covers.",
          "Find where a detected threat would appear.",
          "Note one automated action MTD can take on detection."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "MTD stands for…",
            "options": [
              "Mobile Threat Defense",
              "Managed Test Device",
              "Multi-Tenant Database",
              "Mobile Transfer Daemon"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Which is NOT one of MTD's threat vectors?",
            "options": [
              "Network",
              "Device",
              "App",
              "Printer"
            ],
            "correct": 3
          },
          {
            "type": "mc",
            "question": "MTD runs…",
            "options": [
              "On a separate server only",
              "Natively within the MaaS360 app",
              "As a browser plugin",
              "Only on desktops"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "A phishing protection in MTD guards against…",
            "options": [
              "Malicious links/sites",
              "Slow Wi-Fi",
              "Low battery",
              "Cracked screens"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "When MTD detects a threat it can…",
            "options": [
              "Do nothing ever",
              "Warn the user or enforce a policy action",
              "Reboot the router",
              "Cancel the SIM"
            ],
            "correct": 1
          },
          {
            "type": "text",
            "question": "Why is phishing protection on mobile increasingly important compared to a few years ago?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "A security-conscious customer worries about employees joining rogue Wi-Fi. Explain how MTD's network protection helps and what action it can take."
      }
    },
    {
      "id": "task-teamviewer",
      "phaseId": "phase4",
      "title": "Teamviewer",
      "description": "Remote support from the console — how the TeamViewer integration lets admins see and control managed devices, and how to demo it.",
      "url": "phase4/task-teamviewer.html",
      "learn": [
        {
          "id": "p1",
          "title": "What the integration does",
          "body": "<p>MaaS360 integrates with TeamViewer to provide remote support to managed devices directly from the portal: from a device's view, an admin starts a remote session to see — and on supported platforms control — the device for troubleshooting. It works across Android, iOS, Windows, and macOS, with the depth of control varying by platform (mobile OSes restrict full control more than desktops; iOS support centers on screen sharing).</p>"
        },
        {
          "id": "p2",
          "title": "Why it demos brilliantly",
          "body": "<p>Remote support is one of the most relatable moments in any demo: every IT team lives the \"can you tell me what you see on your screen?\" pain. Showing a session launched from the same console that manages the device — no separate tool, no reading codes over the phone — lands with helpdesk-minded evaluators immediately. Know the honest caveats: the integration must be enabled for the account, and platform capabilities differ.</p>\n<!-- PLACEHOLDER: confirm whether the demo environment has TeamViewer integration enabled and which demo device to use for it. -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find where the TeamViewer integration is enabled (Setup → Services area) and whether the demo account has it active.",
          "From a device view, locate where a remote support session would be initiated.",
          "Write down the platform capability differences (view vs control) at the level you'd state them to a customer.",
          "If the demo environment supports it, run one practice session end to end with your buddy's test device."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The TeamViewer integration lets an admin…",
            "options": [
              "Start a remote support session on a managed device from the MaaS360 portal",
              "Read user emails",
              "Bypass enrollment",
              "Flash device firmware"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Platform depth varies: the honest way to state it is…",
            "options": [
              "Desktops support full control; mobile platforms are more restricted, with iOS centered on screen sharing",
              "Everything is fully controllable everywhere",
              "Only Windows works",
              "Never discuss limits"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The demo power of this feature comes from…",
            "options": [
              "Helpdesk pain everyone recognizes, solved from the same console that manages the device",
              "Its rarity",
              "Its price",
              "Animation quality"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Script your 60-second demo narration for launching a remote session, including one honest caveat sentence."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Add remote support to your demo repertoire: practice the narration with the portal open, twice. If the integration isn't active in the demo environment, flag it to your mentor now — it's a demo asset worth having ready before Phase 5's lead demos."
      }
    },
    {
      "id": "task-apple-300",
      "phaseId": "phase4",
      "title": "Apple 301",
      "description": "Deep technicalities — the APNs certificate lifecycle, DEP token mechanics, supervision internals, and the Apple plumbing a BTS engineer must never get wrong.",
      "url": "phase4/task-apple-300.html",
      "learn": [
        {
          "id": "p1",
          "title": "The APNs MDM certificate lifecycle",
          "body": "<p>Before MaaS360 can manage a single Apple device, the customer creates an <b>APNs MDM certificate</b>: in the portal (Setup → Services → Mobile Device Management → Apple MDM Certificate) MaaS360 generates a <b>CSR</b> (certificate signing request); the customer takes it to Apple's push-certificate portal (identity.apple.com/pushcert) signed in with a <b>company Apple ID</b>, gets the certificate issued, and uploads it back to MaaS360.</p>\n<p>Two facts customers get burned by, and you must always land: the certificate is <b>valid for one year</b> and must be renewed every 365 days — and renewal must use the <b>same Apple ID that created it</b>. Renewing with a different Apple ID issues a <em>different</em> certificate, which breaks the trust chain with every enrolled device: the fleet must be re-enrolled. Always advise a shared corporate Apple ID (never a personal one) documented in more than one place.</p>"
        },
        {
          "id": "p2",
          "title": "What expiry actually does",
          "body": "<p>If the APNs certificate lapses, MaaS360 can no longer push wake-ups: devices stop receiving timely commands and drift out of contact — management is effectively down until renewal, and if the cert was replaced rather than renewed, re-enrollment awaits. Symptoms: fleet-wide \"last check-in\" going stale at the same time. This is the first thing to check in Apple troubleshooting.</p>"
        },
        {
          "id": "p3",
          "title": "DEP tokens and supervision internals",
          "body": "<p>The ABM link runs on a <b>server token</b>: created in ABM against an \"MDM server\" entry, uploaded to MaaS360 (Apple Device Enrollment Program → Tokens), and — like APNs — subject to annual renewal. Devices assigned to that MDM server in ABM receive their enrollment during Setup Assistant per the assigned <b>DEP enrollment profile</b>, which controls supervision, whether the MDM profile is removable, and which Setup Assistant screens are skipped. Supervision itself is what unlocks the deeper controls you demo on corporate devices: silent app installs, tighter restrictions, and always-on management the user can't remove. Devices not bought through Apple's channel can be added to ABM with Apple Configurator.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, locate the APNs certificate entry and note its expiry date and the Apple ID hint if shown.",
          "Locate the DEP token area and identify the token's expiry and its linked ABM server name.",
          "Write the APNs renewal runbook as five numbered steps a customer admin could follow, including the same-Apple-ID warning.",
          "Open a DEP enrollment profile (view only) and list which Setup Assistant options and removability settings it controls.",
          "Read the APNs renewal page and DEP configuration guide at ibm.com/docs/en/maas360; note anything version-specific."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The APNs certificate renewal rule that prevents fleet re-enrollment is…",
            "options": [
              "Renew with the same Apple ID that created the certificate, before the 365-day expiry",
              "Renew from any Apple ID",
              "APNs certificates don't expire",
              "Only Apple can renew it"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A fleet where every Apple device's last check-in went stale on the same date suggests…",
            "options": [
              "The APNs certificate expired",
              "Every user quit",
              "A Wi-Fi outage",
              "iOS update"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The DEP server token…",
            "options": [
              "Links ABM to MaaS360 and also requires annual renewal",
              "Never expires",
              "Is the same as the APNs certificate",
              "Lives on each device"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Supervision is the prerequisite for…",
            "options": [
              "Silent app installs, deepest restrictions, and non-removable management",
              "Any enrollment at all",
              "BYOD privacy",
              "APNs delivery"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The Setup Assistant experience during automated enrollment is controlled by…",
            "options": [
              "The DEP enrollment profile assigned in MaaS360",
              "The user's preferences",
              "The carrier",
              "Random chance"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A customer renewed APNs with a new Apple ID and management broke. Explain to their frustrated IT director what happened and what has to happen now — with the empathy you'd actually use."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Write the two-page \"Apple plumbing health check\" you'd run at the start of any POC or onboarding: APNs cert (expiry, Apple ID custody), DEP token (expiry, ABM linkage), enrollment profile settings, and one test device end to end. Review it with your mentor — this becomes a real artifact you'll reuse in Phase 5+."
      }
    },
    {
      "id": "task-android-300",
      "phaseId": "phase4",
      "title": "Android 301",
      "description": "Deep technicalities — zero-touch and KME mechanics, dedicated-device lockdown, app management internals, and the Android details that decide technical wins.",
      "url": "phase4/task-android-300.html",
      "learn": [
        {
          "id": "p1",
          "title": "Zero-touch and KME under the hood",
          "body": "<p>Both programs work by registering device identifiers with an enrollment service before the device ever boots: resellers upload the devices they sell (zero-touch for the Google ecosystem, KME for Samsung), the customer's console maps those devices to a provisioning configuration pointing at MaaS360, and first boot pulls that config — making MaaS360 device owner with no human step. The technical gotchas worth knowing: registration is tied to purchase channel (devices bought outside participating resellers must be added manually or via QR), and a factory reset re-triggers the enrollment — which is a feature: stolen or wiped corporate devices come back managed.</p>"
        },
        {
          "id": "p2",
          "title": "Dedicated devices, properly locked",
          "body": "<p>Dedicated (kiosk) mode is fully managed plus a lockdown policy: single-app or multi-app kiosk, pinned launcher, restricted hardware keys and status bar. The design questions that matter in real deals: what happens on reboot (auto-return to the kiosk app), how updates reach the kiosk app without user interaction, and how a technician exits kiosk mode for service (admin-controlled exit, not a user backdoor).</p>"
        },
        {
          "id": "p3",
          "title": "App management internals",
          "body": "<p>Through managed Google Play, apps are approved into the customer's private catalog and assigned to groups; on fully managed and dedicated devices installs are silent, and app configuration (<b>managed configurations</b>) lets MaaS360 push settings into apps — server URLs, feature flags — so apps arrive pre-configured. Private (in-house) apps can be published to the customer's managed Play catalog without going public. The demo moment: an app appearing and configuring itself on a device with zero user taps.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find the kiosk/dedicated policy settings and list what they control (launcher, allowed apps, hardware restrictions).",
          "Locate managed configurations for an app in the catalog if the demo hierarchy has one.",
          "Write the zero-touch/KME first-boot sequence as numbered steps from unboxing to policies applied.",
          "Note the answer to each dedicated-device design question above for a hypothetical kiosk fleet.",
          "Skim the Android Enterprise sections at ibm.com/docs/en/maas360 for anything team demos rely on that isn't covered here."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Zero-touch/KME survive a factory reset because…",
            "options": [
              "Enrollment is anchored to the device's registration with the program, re-applied at first boot",
              "The apps hide from the reset",
              "They don't survive resets",
              "Resets are blocked entirely"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A device bought from a non-participating reseller…",
            "options": [
              "Won't auto-enroll — it needs manual registration or QR provisioning",
              "Enrolls anyway",
              "Can never be managed",
              "Becomes a kiosk"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Managed configurations let MaaS360…",
            "options": [
              "Push settings into apps so they arrive pre-configured",
              "Read app data",
              "Rewrite app code",
              "Only uninstall apps"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A kiosk device rebooting should…",
            "options": [
              "Return automatically to the kiosk app with no user-visible escape",
              "Show the normal launcher",
              "Ask the user what to do",
              "Factory reset"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Silent app install requires…",
            "options": [
              "Fully managed or dedicated mode (or the work profile side for work apps)",
              "Any personal device",
              "User approval every time",
              "Rooting"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A logistics prospect asks: \"If a driver factory-resets our scanner to sell it, what happens?\" Answer precisely, then add the one-sentence business takeaway."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Design the technical rollout for 500 KME scanners on paper: registration, provisioning config, dedicated policy contents, app + managed configuration, and the reset/theft story. Present it to your mentor as if to a customer's technical evaluator — this is Android 301's version of the plumbing health check."
      }
    },
    {
      "id": "task-practice-demos",
      "phaseId": "phase4",
      "title": "Practice Demos",
      "description": "Build and rehearse your first full demo — a 20-minute story from enrollment to policy to app to action.",
      "url": "phase4/task-practice-demos.html",
      "learn": [
        {
          "id": "p1",
          "title": "A demo is a story, not a tour",
          "body": "<p>Weak demos walk through menus; strong demos follow a narrative. The reliable spine: <b>a day in the life of a managed device</b> — enroll it (or show one enrolling), watch policies land, push an app, run a device action, show the compliance view. Each stop answers a question the customer actually has: how hard is rollout? what control do we get? how do apps arrive? what happens when a device is lost?</p>"
        },
        {
          "id": "p2",
          "title": "Craft rules that separate pros",
          "body": "<p>Open with the customer's problem, not the product (\"you said rollout across 3 sites is the pain — let me show you enrollment first\"). One idea per screen; say what they're seeing before clicking. Keep a <b>recovery plan</b> for every step: know what you'll say if the device doesn't respond in demo time (real answer: push timing varies — narrate it honestly and move on, returning when it lands). Close each chapter with the \"so what\": \"that's zero-touch — your 3-site rollout without a technician on site.\"</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Script your 20-minute demo using the day-in-the-life spine and your Phase 2 hero examples.",
          "Rehearse alone twice with the portal live — out loud, clicking everything for real.",
          "Note every moment something felt slow or fragile; build your recovery line for each.",
          "Deliver it to your buddy; collect three pieces of feedback: pace, clarity, and the weakest chapter."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The day-in-the-life spine works because…",
            "options": [
              "Each stop answers a real customer question in a natural order",
              "It shows the most menus",
              "It's the shortest option",
              "Stories are for executives only"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "When a pushed action doesn't land instantly on the demo device…",
            "options": [
              "Narrate honestly that push timing varies, continue, and return when it lands",
              "Click it repeatedly",
              "Blame the Wi-Fi and end the demo",
              "Pretend it worked"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"One idea per screen\" means…",
            "options": [
              "Saying what the customer is about to see, showing it, landing the point — then moving",
              "Using one monitor",
              "Never scrolling",
              "Small fonts"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Every chapter should close with…",
            "options": [
              "The \"so what\" tied to the customer's stated problem",
              "A joke",
              "The price",
              "A menu recap"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write your demo's opening 30 seconds, verbatim, for a customer whose stated pain is device rollout across many sites."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Record yourself (screen + voice) delivering the full 20 minutes. Watch it back — it's uncomfortable and it's the fastest improvement tool that exists. Fix the two worst moments and deliver it once more to your buddy before calling this done."
      }
    },
    {
      "id": "task-troubleshooting-100",
      "phaseId": "phase4",
      "title": "Troubleshooting 101",
      "description": "A first triage method — the systematic questions and checks for the problems you'll actually meet in demos, POCs, and onboarding.",
      "url": "phase4/task-troubleshooting-100.html",
      "learn": [
        {
          "id": "p1",
          "title": "Triage beats knowledge",
          "body": "<p>You can't memorize every failure mode, but you can own a method. The BTS triage ladder: (1) <b>scope</b> — one device or many? one platform or all? when did it start? (2) <b>recent change</b> — certificate expiry, policy edit, OS update, network change? (3) <b>the plumbing</b> — for fleet-wide Apple issues check APNs first; Android-wide, the managed Google Play binding; a single device, its last check-in and enrollment state. (4) <b>reproduce</b> — can you make it happen on a test device? A calm, visible method also reassures customers even before the fix.</p>"
        },
        {
          "id": "p2",
          "title": "The classics you'll actually meet",
          "body": "<p><b>Device not checking in</b>: single device → network, power, user removed profile (BYOD can), device off; fleet-wide same-day → certificate/token expiry. <b>Enrollment fails</b>: credentials, enrollment mode mismatch (trying work profile on a device that needs factory-reset provisioning), unsupported OS version. <b>Policy not applying</b>: is the device in the targeted group? has it checked in since the change? is another policy taking precedence? <b>App not installing</b>: license availability, supervision/mode requirements for silent install, store connectivity. Each classic maps to the ladder — scope, change, plumbing, reproduce.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Write the triage ladder on a card (physical or digital) in your own words.",
          "For each classic above, list the first three checks in order.",
          "Ask your mentor for the two most common real issues the team hits in POCs and add them to your list.",
          "In the demo portal, practice finding the evidence for each check: last check-in, group membership, policy assignment, APNs status."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The first triage question is always…",
            "options": [
              "Scope — one device or many, one platform or all, since when?",
              "Whose fault is it?",
              "Which competitor caused this?",
              "Should we reinstall everything?"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Every Apple device stopped checking in around the same date. Your first check is…",
            "options": [
              "APNs certificate status",
              "Each device's Wi-Fi",
              "The user's password",
              "App licenses"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A policy isn't applying to one device. Early checks include…",
            "options": [
              "Group membership, check-in since the change, and policy precedence",
              "Reboot the portal",
              "Wipe the device",
              "Ignore it"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Showing a calm method in front of a customer matters because…",
            "options": [
              "Visible systematic triage builds confidence even before the fix lands",
              "It stalls for time",
              "Customers enjoy suspense",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A POC customer says \"the app you pushed yesterday isn't on the test iPad.\" Write your first three questions, in order, and why each."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Have your buddy break something benign in the demo environment (or describe a broken scenario in detail) and run live triage with the ladder, narrating as you go. Twenty minutes of this converts the card into reflex — which is what Phase 5's real POCs will demand."
      }
    },
    {
      "id": "task-shadow-demos",
      "phaseId": "phase4",
      "title": "Shadow Demos",
      "description": "Watch real demos with a structured observation method — steal what works before you lead your own.",
      "url": "phase4/task-shadow-demos.html",
      "learn": [
        {
          "id": "p1",
          "title": "Shadowing with intent",
          "body": "<p>Passive watching teaches little. Shadow with an observation sheet split in three: <b>structure</b> (how did they open? what order did chapters run? how did they close and set next steps?), <b>customer handling</b> (how were questions fielded, parked, or turned into discovery? what did they do when something broke?), and <b>micro-moves</b> (phrases, transitions, honest caveats that landed well). Steal shamelessly — every good demo voice starts as a collage.</p>"
        },
        {
          "id": "p2",
          "title": "Logistics done right",
          "body": "<p>Ask the demo owner in advance if you can shadow and whether you'll be introduced (usually a one-line \"Jordan from our technical team is joining\"). Stay muted, camera per team norm, and never jump in unless invited. Afterwards, a 10-minute debrief with the presenter — \"why did you skip the app chapter?\" — is where half the learning lives.</p>\n<!-- PLACEHOLDER: confirm how many shadows are expected in this phase and how new hires get added to demo invites. -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Get yourself invited to at least two upcoming demos through your buddy, mentor, or aligned AEs.",
          "Prepare the observation sheet before each; fill it during.",
          "Hold the 10-minute debrief with each presenter within a day.",
          "Compare both demos: what did both presenters do despite different styles? That intersection is the team's real playbook."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The observation sheet exists because…",
            "options": [
              "Structured watching (structure / customer handling / micro-moves) converts demos into usable technique",
              "Notes look professional",
              "It's required paperwork",
              "Memory is perfect anyway"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "During someone else's demo, you speak…",
            "options": [
              "Only if invited",
              "Whenever you know the answer",
              "To correct small errors",
              "Never, even if invited"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The post-demo debrief matters because…",
            "options": [
              "The presenter's reasoning (\"why I skipped X\") is invisible from the outside",
              "It's polite",
              "It extends the meeting",
              "Debriefs are for failures only"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "From your first shadow: one structural choice, one customer-handling move, and one exact phrase you're stealing."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "After both shadows, revise your own practice demo script with at least three stolen improvements — and note which presenter each came from. Show your mentor the before/after. That's shadowing converted into your own demo, which is the whole point."
      }
    },
    {
      "id": "task-how-to-run-poc",
      "phaseId": "phase4",
      "title": "How to Run a POC",
      "description": "The POC playbook — success criteria, scoping, cadence, and closing, learned before you're handed a live one.",
      "url": "phase4/task-how-to-run-poc.html",
      "learn": [
        {
          "id": "p1",
          "title": "POCs are won at the start",
          "body": "<p>A proof of concept succeeds or fails at its kickoff, not its end. The non-negotiable: <b>written success criteria</b> agreed with the customer before anything is configured — typically 5–10 specific, testable statements (\"corporate iPhones enroll via ABM with no user interaction,\" \"a lost device is locked within minutes\"). Without them, POCs drift into endless \"one more thing\" evaluations that close nothing. With them, the final meeting is a checklist review that naturally asks: \"everything passed — what's between us and moving forward?\"</p>"
        },
        {
          "id": "p2",
          "title": "The shape of a healthy POC",
          "body": "<p><b>Scope</b>: small and representative — a handful of devices per platform in play, the customer's real use cases, a defined time window (a few weeks, not months). <b>Setup</b>: run your Apple/Android plumbing health checks (301 artifacts) on day one; most \"MaaS360 is broken\" moments in POCs are certificate or binding setup gaps. <b>Cadence</b>: a short weekly check-in — progress against criteria, blockers, next steps — keeps momentum and surfaces problems while they're small. <b>Close</b>: walk the criteria one by one, capture results in writing, and hand the AE a clean technical-win narrative.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Draft a success-criteria template: 8 example criteria covering enrollment, policy, apps, security actions, and reporting.",
          "Ask your mentor for a real past POC's criteria (or war story) and compare against your template.",
          "Write the kickoff-meeting agenda you'd run: intros, criteria agreement, environment plan, timeline, cadence.",
          "Draft the weekly check-in format: three sections, ten minutes."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Success criteria must be agreed…",
            "options": [
              "In writing, at the start, before configuration begins",
              "At the end, to match results",
              "Verbally is fine",
              "Never — flexibility wins"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A good criterion reads like…",
            "options": [
              "\"Corporate iPhones enroll via ABM with no user interaction\" — specific and testable",
              "\"MaaS360 works well\"",
              "\"The customer is happy\"",
              "\"Devices are secure\""
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The POC's first technical day should include…",
            "options": [
              "The plumbing health checks — APNs, tokens, bindings — before anything user-facing",
              "The hardest use case",
              "A pricing discussion",
              "Nothing planned"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Weekly check-ins exist to…",
            "options": [
              "Track criteria progress and catch blockers while they're small",
              "Fill calendars",
              "Renegotiate scope weekly",
              "Replace the final review"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The close of a passed POC should end with…",
            "options": [
              "Written results against criteria and a clear \"what's between us and moving forward?\"",
              "A thank-you and silence",
              "More criteria",
              "A restart"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write three success criteria for a hospital POC: 200 shared iPads, BYOD nurse phones, and a lost-device concern."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Assemble your complete POC kit: criteria template, kickoff agenda, weekly check-in format, and closing checklist. Review it with your mentor and refine. Phase 5's mock POC will run this kit end to end — build it like it's real, because it's about to be."
      }
    },
    {
      "id": "task-identity-200",
      "phaseId": "phase4",
      "title": "Identity 201",
      "description": "Process depth on identity — directory sync in practice, authentication flows at enrollment, and conditional access conversations.",
      "url": "phase4/task-identity-200.html",
      "learn": [
        {
          "id": "p1",
          "title": "Directory integration in practice",
          "body": "<p>Identity 101 gave you the why; here's the how it plays in deals. The customer connects MaaS360 to their directory (Active Directory / Entra ID), and users plus groups flow into the console and stay synced. Enrollment then authenticates against corporate credentials — the user proves who they are with the account they already have, and group membership drives which policies and apps land (the Groups task's automation story, now with its identity engine visible).</p>"
        },
        {
          "id": "p2",
          "title": "Authentication at enrollment, concretely",
          "body": "<p>Walk the moment a user enrolls: they hit the enrollment URL, authenticate with corporate credentials (plus MFA if configured), MaaS360 matches them to their directory identity, and everything downstream — group targeting, app entitlements, certificate identity — hangs off that match. When SSO is configured, the enrollment sign-in is the same experience as every other corporate app, which users and admins both notice favorably.</p>"
        },
        {
          "id": "p3",
          "title": "The conditional access conversation",
          "body": "<p>Customers increasingly ask for device state to gate access: \"only enrolled, compliant devices reach email and corporate apps.\" At 201 level you should hold the shape of the conversation — enrollment and compliance become signals that access decisions can use, tying device management into the customer's broader zero-trust posture — and know that the specific integration details depend on the customer's identity stack, which is a design conversation to bring your mentor or a specialist into.</p>\n<!-- PLACEHOLDER: confirm which conditional-access integrations the team actively demos, and any demo environment prerequisites for showing them. -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find the directory/identity configuration area under Setup and identify what's connected in the demo environment.",
          "Trace one demo user from directory group → MaaS360 group → assigned policy/apps.",
          "Write the enrollment authentication moment as a four-step story you can tell on a call.",
          "Draft your two-sentence answer to \"can you block unenrolled devices from email?\" ending with a qualifying question about their identity stack."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Directory sync means user and group changes…",
            "options": [
              "Flow into MaaS360 automatically and keep targeting current",
              "Require nightly manual import",
              "Only apply to new devices",
              "Break enrollment"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "At enrollment, the user authenticates with…",
            "options": [
              "Their existing corporate credentials (plus MFA where configured)",
              "A MaaS360-only password",
              "The admin's account",
              "No authentication"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "In conditional access conversations, device enrollment/compliance acts as…",
            "options": [
              "A signal that access decisions can require",
              "A replacement for identity",
              "A firewall rule",
              "Marketing language"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "When a conditional-access question gets deep into the customer's identity stack, the right BTS move is…",
            "options": [
              "Hold the shape, qualify their stack, and bring in your mentor/specialist for the design detail",
              "Improvise specifics",
              "Change the subject",
              "Promise anything"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write your qualifying answer to \"can you block unenrolled devices from email?\" exactly as you'd say it."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Run the identity thread through a mock discovery with your buddy: they play an IT director with Entra ID and an MFA mandate. Cover sync, enrollment auth, and the conditional-access shape, and practice the handoff line for the deep end. Note what you couldn't answer — that's your question list for your mentor."
      }
    },
    {
      "id": "task-mock-onboarding",
      "phaseId": "phase4",
      "title": "Mock Onboarding",
      "description": "Run a full new-customer onboarding session against a practice environment, with your buddy as the customer admin.",
      "url": "phase4/task-mock-onboarding.html",
      "learn": [
        {
          "id": "p1",
          "title": "What an onboarding session is",
          "body": "<p>When a deal closes, someone walks the customer's admin through standing up their MaaS360 environment: platform plumbing (APNs certificate, ABM token, managed Google Play binding), first policies, first enrollments, and admin basics. As a BTS engineer you'll support and eventually lead these sessions — they're where the technical win becomes a live customer.</p>"
        },
        {
          "id": "p2",
          "title": "The session structure that works",
          "body": "<p>A reliable 60-minute shape: <b>orient</b> (5 min — what we'll accomplish today), <b>plumbing</b> (20 min — walk the customer admin through certificate/token setup on their side, since these steps need their Apple ID and Google account), <b>first device</b> (15 min — enroll one device together and watch policies land; the emotional peak of the session), <b>admin tour</b> (15 min — where devices, policies, and support live), <b>next steps</b> (5 min — what they'll do before the next session, written down). The customer admin drives their own console wherever possible — people keep what they did, not what they watched.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Build your onboarding runbook from the structure above, with the exact clicks for each plumbing step.",
          "Dry-run the plumbing section against the demo environment yourself.",
          "Schedule the mock: your buddy plays a mildly nervous customer admin who's never seen the console.",
          "Run the full 60 minutes, having them drive wherever a real customer would.",
          "Debrief: where did they get lost, and what would you change?"
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The plumbing steps (APNs, ABM token) involve the customer directly because…",
            "options": [
              "They require the customer's own Apple ID and accounts — and they must know custody matters for renewals",
              "It fills time",
              "IBM can't do them",
              "They're optional"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The customer admin should drive their console because…",
            "options": [
              "People retain what they did, not what they watched",
              "It's less work for you",
              "It's a test",
              "Insurance requires it"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The emotional peak of a first onboarding session is…",
            "options": [
              "The first device enrolling and policies landing live",
              "The pricing recap",
              "The admin tour",
              "The calendar invite"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Next steps at session end should be…",
            "options": [
              "Written, specific, and owned by the customer before the next session",
              "Implied",
              "Optional",
              "Sent a week later"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "During the mock: what confused your \"customer\" that you hadn't predicted, and how will your runbook change?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Revise your runbook from the debrief and run the mock once more — same structure, different invented customer (new industry, new device mix). Two reps with revision between them is the minimum before Phase 5 puts you in front of the real thing."
      }
    },
    {
      "id": "task-phase4-readiness",
      "phaseId": "phase4",
      "title": "Phase 4 Readiness Check",
      "description": "Confirm you're ready for Phase 5 — deep platform knowledge, a rehearsed demo, a POC kit, and onboarding reps done.",
      "url": "phase4/task-phase4-readiness.html",
      "learn": [
        {
          "id": "p1",
          "title": "What \"ready\" means here",
          "body": "<p>Phase 4 was the high camp: 301-level Apple and Android depth (certificates, tokens, zero-touch mechanics), identity at working depth, triage method, and — critically — your first performing assets: a rehearsed demo, a POC kit, an onboarding runbook, and shadow notes. Phase 5 points all of this at real deal motions with training wheels. Ready means the assets exist, have survived at least one rep with feedback, and you can field the classic hard questions (APNs renewal gone wrong, factory-reset theft story, mode mixes) cold.</p>"
        },
        {
          "id": "p2",
          "title": "How the check works",
          "body": "<p>Self-review, then the manager session — which for this phase should include a 10-minute demo excerpt delivered live and one triage scenario answered on the spot. From Phase 5 on, your audience includes customers; this review is the last all-internal checkpoint.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Confirm your four assets are current: demo script (with stolen improvements), POC kit, onboarding runbook, plumbing health checks.",
          "Drill the three classic hard questions out loud: APNs same-Apple-ID story, KME reset/theft story, conditional access qualifying answer.",
          "Re-run one triage scenario with your buddy cold.",
          "Book the Phase 4 review; agree the demo excerpt you'll deliver in it."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Phase 4's real output is…",
            "options": [
              "Performing assets — demo, POC kit, runbook — that survived feedback reps",
              "Read documentation",
              "Portal hours logged",
              "Quiz scores"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The manager review includes a live demo excerpt because…",
            "options": [
              "It's the last all-internal audience before customers see your work",
              "Managers enjoy demos",
              "It's tradition",
              "It replaces Phase 5"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "If the APNs hard-question answer still requires notes…",
            "options": [
              "Drill it this week — it's a fluency item, not a reference item",
              "Notes are fine forever",
              "Skip Apple deals",
              "Memorize the docs URL"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which of your four assets is weakest, what feedback shaped the others, and what's the plan before Phase 5?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Run the review: 10-minute demo excerpt, one cold triage scenario, assets walkthrough. Agree Phase 5 starts. From here the mountain has customers on it — everything you built in Phase 4 is about to earn its keep."
      }
    }
  ]
};

/* ---------------------------------------------------------------------------
   Learn-panel writing templates (convert IBM Docs -> readable prose).
   Source for all educational content: https://www.ibm.com/docs/en/maas360
   1. Metaphor:    Rewrite an IBM Docs paragraph as a 3-sentence everyday analogy.
   2. Bullet sum:  5 verb-first bullets a non-technical hire reads in <90s.
   3. Narrative:   Turn a step list into 2nd-person 'You click...' under 150 words.
   4. Concept:     Explain [concept] to someone new to enterprise software.
   5. Comparison:  A 2-column plain-language table contrasting [A] vs [B].
   --------------------------------------------------------------------------- */
