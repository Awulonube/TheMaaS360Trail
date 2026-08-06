/* Phase 2: Acclimation — generated from content/phase2.md by content/tools/build.js. */
/* Edit content/phase2.md, then run: node content/tools/build.js */
/* IBM Docs reference: https://www.ibm.com/docs/en/maas360 */
window.PHASE2_DATA = {
  "id": "phase2",
  "title": "Phase 2: Acclimation",
  "subtitle": "Get access to the core portals and learn the MDM/UEM fundamentals.",
  "icon": "🧭",
  "tasks": [
    {
      "id": "task-access-kme",
      "phaseId": "phase2",
      "title": "Access to KME",
      "description": "KME stands for Knox Mobile Enrollment. It is Samsung's zero-touch enrollment solution for bulk-deploying corporate-owned Android devices.",
      "url": "phase2/task-access-kme.html",
      "learn": [
        {
          "id": "p1",
          "title": "The big picture",
          "body": "<p>Knox Mobile Enrollment (KME) is Samsung's zero-touch enrollment service. It automatically enrolls corporate-owned Samsung/Android devices into MaaS360 the first time they connect to the internet.</p>"
        },
        {
          "id": "p2",
          "title": "Why zero-touch matters",
          "body": "<p>Without zero-touch, IT would unbox and configure every phone by hand. KME lets a reseller register devices by IMEI so that when the employee powers on the phone, it enrolls into MaaS360 automatically — no manual setup.</p>"
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
          "Open the Samsung Knox / KME console (placeholder).",
          "Locate where devices are listed by IMEI or serial.",
          "Find the MDM profile that points devices to MaaS360.",
          "Confirm you can read (not edit) the enrollment configuration."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "KME is a service from which vendor?",
            "options": [
              "Apple",
              "Google",
              "Samsung",
              "IBM"
            ],
            "correct": 2
          },
          {
            "type": "mc",
            "question": "KME is best described as…",
            "options": [
              "A billing tool",
              "A zero-touch Android enrollment service",
              "An antivirus",
              "A VPN"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "KME is used for which device ownership type?",
            "options": [
              "Personal BYOD phones",
              "Corporate-owned Android devices",
              "Customer laptops",
              "Public kiosks only"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "When does a KME device typically enroll?",
            "options": [
              "After 30 days",
              "When it first connects to the internet on setup",
              "Only when plugged into a PC",
              "Never automatically"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "KME registers devices using their…",
            "options": [
              "Phone number",
              "IMEI / serial number",
              "Email address",
              "Wi-Fi password"
            ],
            "correct": 1
          },
          {
            "type": "text",
            "question": "Why does zero-touch enrollment save time for a large customer rolling out 5,000 phones?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "A customer is deploying 500 Samsung devices. Outline how KME removes the need to touch each phone, and which MaaS360 setting the devices point to."
      }
    },
    {
      "id": "task-access-abm",
      "phaseId": "phase2",
      "title": "Access to ABM",
      "description": "Apple Business Manager (ABM) is a portal for IT teams to automate device deployment, purchase apps, and distribute content. It integrates directly with MaaS360.",
      "url": "phase2/task-access-abm.html",
      "learn": [
        {
          "id": "p1",
          "title": "The big picture",
          "body": "<p>Apple Business Manager (ABM) is Apple's web portal for organizations. It lets IT automate device enrollment (Automated Device Enrollment), buy and distribute apps in volume, and link Apple devices to MaaS360.</p>"
        },
        {
          "id": "p2",
          "title": "ABM + MaaS360",
          "body": "<p>ABM is the Apple equivalent of Samsung KME. You connect ABM to MaaS360 once; then any Apple device assigned to your MDM server in ABM enrolls automatically and can be supervised.</p>"
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
          "Open Apple Business Manager (placeholder).",
          "Find the 'Devices' section and how devices map to an MDM server.",
          "Locate 'Apps and Books' (volume purchasing).",
          "Confirm the MDM server entry that represents MaaS360."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "ABM stands for…",
            "options": [
              "Apple Business Manager",
              "Android Bulk Manager",
              "Apple Backup Mode",
              "Automated Build Machine"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "ABM is the Apple counterpart to which Samsung service?",
            "options": [
              "Knox Mobile Enrollment",
              "Samsung Pay",
              "SmartThings",
              "Bixby"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "ABM lets organizations do all EXCEPT…",
            "options": [
              "Automate device enrollment",
              "Buy apps in volume",
              "Assign devices to an MDM server",
              "Replace the App Store for consumers"
            ],
            "correct": 3
          },
          {
            "type": "mc",
            "question": "Linking ABM to MaaS360 enables…",
            "options": [
              "Automatic Apple device enrollment",
              "Cheaper iPhones",
              "Faster charging",
              "Free AppleCare"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Automated Device Enrollment via ABM allows a device to be…",
            "options": [
              "Supervised and auto-enrolled",
              "Jailbroken",
              "Unmanaged",
              "Shipped faster"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What is the advantage of supervision that comes from enrolling Apple devices through ABM?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "A customer bought 200 iPads through their Apple reseller. Explain how ABM assigns them to MaaS360 and why that enables supervision."
      }
    },
    {
      "id": "task-apple-101",
      "phaseId": "phase2",
      "title": "Apple 101",
      "description": "High-level overview — how Apple devices are managed in the enterprise, and the pieces MaaS360 plugs into: MDM, APNs, ABM, and supervision.",
      "url": "phase2/task-apple-101.html",
      "learn": [
        {
          "id": "p1",
          "title": "The Apple management model, from orbit",
          "body": "<p>Apple builds a management framework (<b>MDM</b>) into iOS, iPadOS, and macOS. An MDM server like MaaS360 doesn't hack into the device — it speaks Apple's own protocol, sending configuration profiles, app installs, and commands that the OS enforces. The upshot for customers: management is native, predictable, and privacy-respecting by design.</p>"
        },
        {
          "id": "p2",
          "title": "Four names you'll hear constantly",
          "body": "<p><b>MDM profile</b> — the trust relationship installed on a device that lets MaaS360 manage it. <b>APNs</b> (Apple Push Notification service) — Apple's push channel; MaaS360 uses it to tell a device \"check in for new instructions.\" Without a valid APNs certificate, Apple management doesn't work at all. <b>ABM</b> (Apple Business Manager) — Apple's business portal for automated enrollment and app purchasing, which you connected to in \"Access to ABM.\" <b>Supervision</b> — the elevated management mode for corporate-owned devices (covered in Phase 3's Supervised vs Unsupervised task).</p>"
        },
        {
          "id": "p3",
          "title": "Where MaaS360 fits",
          "body": "<p>MaaS360 is the console where the customer's admin defines policies (\"require a passcode,\" \"install these apps,\" \"block AirDrop on supervised devices\") and MaaS360 translates them into Apple's protocol. In conversations at this level, you just need the shape: Apple provides the rails, MaaS360 drives the train.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the MaaS360 demo portal, find an enrolled Apple device and open its device view — identify the installed MDM profile and last check-in time.",
          "Locate where iOS policies are configured (Security → Policies) and skim an iOS policy's categories without changing anything.",
          "Write down the one-sentence job of each: MDM profile, APNs, ABM, supervision.",
          "Read the IBM overview docs at ibm.com/docs/en/maas360 for iOS setup and note anything unfamiliar."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "MaaS360 manages Apple devices by…",
            "options": [
              "Speaking Apple's built-in MDM protocol, which the OS enforces",
              "Installing a jailbreak",
              "Replacing iOS with a custom build",
              "Reading the user's iCloud account"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "APNs matters because…",
            "options": [
              "It's the push channel MaaS360 uses to reach devices — no valid APNs certificate, no Apple management",
              "It hosts the app store",
              "It stores device backups",
              "It's optional for iOS"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Apple Business Manager is…",
            "options": [
              "Apple's business portal for automated enrollment and app purchasing, connected to MaaS360",
              "An iPhone model",
              "IBM's billing system",
              "A replacement for MDM"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "At 101 level, \"supervision\" means…",
            "options": [
              "An elevated management mode for corporate-owned Apple devices",
              "A manager watching your screen",
              "Any enrolled device",
              "An APNs setting"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "In two sentences, explain to a customer exec how Apple device management works with MaaS360 — no acronyms allowed."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Sketch the Apple management picture on one slide or sheet: device ↔ APNs ↔ MaaS360, with ABM feeding enrollment from the side. Explain it to your buddy in under two minutes. You'll go a level deeper on each arrow in Apple 201 (Phase 3) and 301 (Phase 4)."
      }
    },
    {
      "id": "task-android-101",
      "phaseId": "phase2",
      "title": "Android 101",
      "description": "High-level overview — Android Enterprise, the work profile idea, and how MaaS360 manages the Android ecosystem.",
      "url": "phase2/task-android-101.html",
      "learn": [
        {
          "id": "p1",
          "title": "Android Enterprise, from orbit",
          "body": "<p><b>Android Enterprise</b> is Google's built-in framework for managing Android devices — the modern replacement for the old \"device admin\" approach. Like Apple's MDM, it's native to the OS: MaaS360 registers with Google once, and then can manage devices through Google's framework with policies the OS enforces.</p>"
        },
        {
          "id": "p2",
          "title": "The core idea: profiles and ownership",
          "body": "<p>Android Enterprise's key design is separating <em>work</em> from <em>personal</em>. On a personal (BYOD) device, MaaS360 creates a <b>work profile</b> — a contained bubble holding work apps and data that IT fully controls, while the personal side stays private and untouched. On corporate-owned devices, the whole device can be managed (<b>fully managed</b> mode). There's also a kiosk-style <b>dedicated device</b> mode for single-purpose hardware like scanners and signage. The depth on each mode comes in Android 201.</p>"
        },
        {
          "id": "p3",
          "title": "Apps come from managed Google Play",
          "body": "<p>Work apps are distributed through <b>managed Google Play</b> — a curated, company-approved view of the Play Store connected to MaaS360. Admins approve apps in the console; users see only what's approved. Samsung devices add <b>Knox</b> capabilities on top, including the KME zero-touch enrollment you met in \"Access to KME.\"</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the MaaS360 demo portal, find an enrolled Android device and identify its enrollment mode in the device view.",
          "Locate the Android policy area and skim the work profile settings categories without changing anything.",
          "Find where managed Google Play apps appear in the Apps section.",
          "Write the one-sentence job of: work profile, fully managed mode, dedicated mode, managed Google Play."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Android Enterprise is…",
            "options": [
              "Google's native framework for managing Android devices, used by MaaS360",
              "A Samsung phone model",
              "A separate operating system",
              "IBM's Android app"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "On a BYOD Android device, the work profile means…",
            "options": [
              "Work apps and data live in a contained bubble IT controls; the personal side stays private",
              "IT sees everything on the device",
              "The user gets a second phone number",
              "Nothing can be enforced"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A warehouse barcode scanner running one locked-down app is a classic case for…",
            "options": [
              "Dedicated device mode",
              "Work profile",
              "No management",
              "Personal mode"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Work apps reach Android devices through…",
            "options": [
              "Managed Google Play — a company-curated view of the Play Store",
              "Email attachments",
              "USB cables",
              "The Apple App Store"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A customer asks: \"If we manage employees' personal Androids, can we see their photos and texts?\" Answer in two sentences."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Build the Android twin of your Apple sketch: device (work profile / fully managed / dedicated) ↔ Google's framework ↔ MaaS360, with managed Google Play feeding apps and KME feeding Samsung zero-touch enrollment. Present both sketches back-to-back to your buddy — spotting the parallels now makes the 201 depth much easier."
      }
    },
    {
      "id": "task-maas360-101",
      "phaseId": "phase2",
      "title": "MaaS360 101",
      "description": "High-level tour of the MaaS360 portal — the main sections, what lives where, and the vocabulary of the console you'll demo from.",
      "url": "phase2/task-maas360-101.html",
      "learn": [
        {
          "id": "p1",
          "title": "The console is your stage",
          "body": "<p>Every demo, POC, and onboarding you'll ever run happens inside the MaaS360 portal. This task is the guided tour: knowing where things live so you never fumble navigation on a live call. The portal is organized around a handful of top-level areas, and almost everything you'll show a customer is within two clicks of them.</p>"
        },
        {
          "id": "p2",
          "title": "The main neighborhoods",
          "body": "<p><b>Home / dashboards</b> — summary views of the fleet, alerts, and reports. <b>Devices</b> — the inventory: every enrolled device, searchable and filterable, each with a device view showing hardware, apps, compliance, and available actions. <b>Users</b> — the people, local or synced from a directory. <b>Security → Policies</b> — the rulebooks per platform (iOS, Android, Windows, macOS). <b>Apps</b> — the app catalog and distributions. <b>Setup / Services</b> — where platform plumbing lives: APNs certificate, ABM/DEP tokens, Android Enterprise binding, directory integration, and enabled services.</p>"
        },
        {
          "id": "p3",
          "title": "Two workhorse concepts",
          "body": "<p><b>Policies</b> are collections of settings assigned to devices or groups — one policy, many devices. <b>Device actions</b> are one-time commands to a specific device (lock, locate, wipe, message). Policy = standing rules; action = do this now. Most customer questions map to one or the other.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Log in to the demo portal and visit each area: Home, Devices, Users, Security → Policies, Apps, Setup.",
          "Open one device view and find: OS version, installed apps, compliance state, and the actions menu.",
          "Open (don't edit) one iOS and one Android policy and skim their category lists.",
          "Find where APNs, ABM/DEP tokens, and the Android Enterprise binding live under Setup → Services.",
          "Time yourself: from login, reach any named device's view in under 30 seconds."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "To see every enrolled device and drill into one, you go to…",
            "options": [
              "Devices — the inventory",
              "Setup",
              "Apps",
              "Home"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The difference between a policy and a device action is…",
            "options": [
              "Policy = standing rules for many devices; action = a one-time command to one device",
              "They're synonyms",
              "Actions apply only to iOS",
              "Policies are per-user only"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Platform plumbing like the APNs certificate and DEP tokens lives under…",
            "options": [
              "Setup → Services",
              "The Devices list",
              "The user's profile",
              "Home dashboards"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "On a live demo, fumbling navigation is costly because…",
            "options": [
              "It burns credibility and the customer's attention — smooth navigation is part of the pitch",
              "The portal locks after wrong clicks",
              "It's fine, nobody notices",
              "It resets the demo data"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which portal area do you feel least sure about, and what will you do this week to fix that?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Run a five-minute \"silent tour\" for your buddy: share your screen and navigate Home → a device view → an iOS policy → the app catalog → Setup → Services without saying a word — then repeat it narrating. The silent pass builds muscle memory; the narrated pass builds the demo voice."
      }
    },
    {
      "id": "task-access-m-portals",
      "phaseId": "phase2",
      "title": "Access to \"M\" Portals",
      "description": "Get working access to the MaaS360 portals you'll demo and practice in, and understand what each environment is for.",
      "url": "phase2/task-access-m-portals.html",
      "learn": [
        {
          "id": "p1",
          "title": "Environments, not just logins",
          "body": "<p>You'll work across multiple MaaS360 portal environments — typically at least a <b>demo/practice environment</b> (safe to change, used for demos and learning) and views into <b>customer or trial environments</b> during POCs and onboarding. Knowing which environment you're in before you click is a discipline that prevents the classic disaster: changing a real customer's policy while \"just showing something.\"</p>\n<!-- PLACEHOLDER: list the actual portal environments, URLs, and how access is requested/granted for each. Confirm names with the team — \"M portals\" specifics needed. -->"
        },
        {
          "id": "p2",
          "title": "Access hygiene",
          "body": "<p>Store each credential in 1Password as you receive it, label which environment it belongs to, and never reuse passwords across environments. If access requires a request/approval flow, start it now — access delays are the most common blocker for new-hire demos.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Request access to each portal environment on the team's list. <!-- PLACEHOLDER: link the access request process -->",
          "On first login to each, note the environment name, URL, and your role/permission level in 1Password.",
          "In the demo environment, confirm you can view devices, policies, and apps.",
          "Verify you can tell environments apart at a glance (account name, banner, URL) and describe how."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Before changing anything in a MaaS360 portal, you should always know…",
            "options": [
              "Which environment you're in — demo, trial, or customer",
              "The weather",
              "The portal's server location",
              "The customer's stock price"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The demo/practice environment is for…",
            "options": [
              "Learning and demos — safe to change",
              "Customer production data",
              "Nothing",
              "Billing"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Portal credentials should live in…",
            "options": [
              "1Password, labeled by environment",
              "A notes file",
              "Chat history",
              "Memory"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "List the portal environments you now have access to and what each is for. Flag any access still pending."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Complete every access request this week and do one full login round-trip in each environment. Anything still pending after a week goes to your manager — chasing access is a legitimate use of their time."
      }
    },
    {
      "id": "task-access-demo-hierarchy",
      "phaseId": "phase2",
      "title": "Access to Demo Hierarchy",
      "description": "Get into the team's shared demo account structure and learn the etiquette of a shared demo environment.",
      "url": "phase2/task-access-demo-hierarchy.html",
      "learn": [
        {
          "id": "p1",
          "title": "What the demo hierarchy is",
          "body": "<p>The demo hierarchy is the team's shared MaaS360 demo account structure — pre-built with devices, policies, apps, and users so demos look like a real production environment rather than an empty console. Because it's shared, it comes with etiquette: know what you may change, what you must reset after use, and what is look-don't-touch.</p>\n<!-- PLACEHOLDER: document the actual demo hierarchy structure — account names, what's pre-configured, which parts are shared vs personal, and the reset/cleanup rules. Needs team input. -->"
        },
        {
          "id": "p2",
          "title": "Make it yours before you demo",
          "body": "<p>Spend unhurried time clicking through the pre-built content: which devices are enrolled, which policies exist and why, what apps are in the catalog. In a live demo you want to navigate to a great example (a compliant iPhone, a kiosk Android) from memory, not discover it live.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Request access to the demo hierarchy. <!-- PLACEHOLDER: link request process -->",
          "Map what's pre-built: list the enrolled devices, the main policies, and the app catalog contents.",
          "Ask your buddy which parts are shared/fragile and what the cleanup expectations are.",
          "Bookmark (or note the path to) three \"hero\" examples you'd show a customer first."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The demo hierarchy exists so that…",
            "options": [
              "Demos run against a realistic, pre-built environment instead of an empty console",
              "Customers can log in",
              "It stores production data",
              "New hires have homework"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "In a shared demo environment, before changing anything you should…",
            "options": [
              "Know the team's rules on what may be changed and what must be reset",
              "Change freely — it's a demo",
              "Ask the customer",
              "Export everything first"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Preparing \"hero examples\" in advance matters because…",
            "options": [
              "Navigating from memory to a great example keeps live demos smooth",
              "Examples expire daily",
              "Customers demand surprises",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What are your three hero examples, and what story does each tell a customer?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Do a 10-minute practice walkthrough in the demo hierarchy for your buddy using only your three hero examples. Afterward, confirm you left the environment exactly as you found it — the cleanup rep matters as much as the demo rep."
      }
    },
    {
      "id": "task-sales-cloud-access",
      "phaseId": "phase2",
      "title": "Sales Cloud Access",
      "description": "Get access to the CRM where deals live, and learn to read an opportunity before you join its calls.",
      "url": "phase2/task-sales-cloud-access.html",
      "learn": [
        {
          "id": "p1",
          "title": "Why a BTS engineer needs the CRM",
          "body": "<p>The CRM (Sales Cloud) is where AEs track opportunities: account details, deal stage, history, and next steps. Before any customer call, five minutes reading the opportunity tells you who the customer is, what's been promised, and where the deal stands — so you never ask a customer something the record already answers.</p>\n<!-- PLACEHOLDER: confirm the exact CRM system/URL, the access request path, and what BTS engineers are expected to record in it (e.g. technical notes, POC status). Needs team input. -->"
        },
        {
          "id": "p2",
          "title": "Reading an opportunity, fast",
          "body": "<p>A quick pre-call scan covers: <b>stage</b> (early discovery vs late evaluation changes your role on the call), <b>history</b> (past activities and notes — what's already been discussed), <b>people</b> (who the champion is, who signs), and <b>open items</b> (anything technical promised and pending). Arriving with that context is the difference between \"joining a call\" and \"supporting a deal.\"</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Request CRM access and confirm you can open opportunities. <!-- PLACEHOLDER: link request process -->",
          "With your buddy, open one real (or example) opportunity and find: stage, last activity, key contacts, and any technical notes.",
          "Ask an AE to walk you through how they read a deal record in two minutes.",
          "Learn where BTS-relevant notes should be recorded, and add a practice note if appropriate."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Five minutes in the CRM before a customer call means…",
            "options": [
              "You arrive knowing the deal's stage, history, and people",
              "You can skip the call",
              "The demo builds itself",
              "Nothing — calls are improvised"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Deal stage matters to a BTS engineer because…",
            "options": [
              "Early discovery vs late evaluation completely changes what the call needs from you",
              "It sets your bonus",
              "Stages are cosmetic",
              "Only AEs care"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Recording your technical notes in the CRM matters because…",
            "options": [
              "The whole account team can see what was discussed and promised",
              "It's legally required for demos",
              "Notes are private to you",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "From the opportunity you reviewed: what stage is it at, and what would your role be if a call happened tomorrow?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Adopt the pre-call scan as a permanent habit starting now: for every shadowed call in later phases, read the opportunity first and write a three-line summary (who, stage, open technical items). Compare your summary with what actually happened on the call."
      }
    },
    {
      "id": "task-support-vs-bts",
      "phaseId": "phase2",
      "title": "Support vs BTS",
      "description": "Know the boundary — what IBM Support owns, what BTS owns, and how to route customers to the right door without dropping them.",
      "url": "phase2/task-support-vs-bts.html",
      "learn": [
        {
          "id": "p1",
          "title": "Two different jobs",
          "body": "<p><b>IBM Support</b> owns break/fix for live production customers: tickets, SLAs, escalation paths, defect handling. <b>BTS</b> owns the pre-sales technical journey: discovery, demos, POCs, and early onboarding of newly won customers. The line matters because doing Support's job badly (or at all, past a point) hurts both the customer and your pipeline time.</p>"
        },
        {
          "id": "p2",
          "title": "The grey zone, handled well",
          "body": "<p>Real life blurs the line: a POC customer hits a bug; a fresh customer you onboarded calls you (not Support) because they know you. The move is a <b>warm handoff</b>: acknowledge, capture the details, open or point them to the Support ticket path, and tell your AE. You stay the trusted face without becoming the permanent help desk — \"let me get this to the right team and make sure it's tracked\" serves the customer better than heroics.</p>\n<!-- PLACEHOLDER: link internal guidance on the Support case process and any BTS escalation contacts -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Write down three example requests and classify each: Support, BTS, or grey zone.",
          "Find where a customer opens a MaaS360 support case and what info a good case includes (environment, steps, device IDs).",
          "Ask your buddy for a real story where the line blurred and how they handled it.",
          "Draft your own two-sentence warm-handoff script."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "A production customer with a device-sync defect and an SLA belongs with…",
            "options": [
              "IBM Support",
              "BTS",
              "The AE",
              "Nobody"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Discovery, demos, and POCs are owned by…",
            "options": [
              "BTS",
              "IBM Support",
              "Legal",
              "Finance"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A POC customer hits a bug mid-evaluation. The best BTS move is…",
            "options": [
              "Capture details, route into the Support path, keep the AE informed, stay engaged on the POC outcome",
              "Debug it alone for a week",
              "Tell them POCs don't get help",
              "Close the POC"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Warm handoffs matter because…",
            "options": [
              "The customer keeps a trusted contact while the right team owns the fix",
              "They reduce your workload only",
              "Support requires them contractually",
              "They don't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write your warm-handoff script — the exact two sentences you'd say to a customer you're routing to Support."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "With your buddy, role-play the grey zone: they play a newly onboarded customer pinging you directly about a broken enrollment. Practice acknowledging, gathering the right details, and executing the warm handoff — without either dropping them or promising to personally fix it."
      }
    },
    {
      "id": "task-salesloft-setup",
      "phaseId": "phase2",
      "title": "Salesloft Setup",
      "description": "Get your Salesloft account working and connected, building on the cadence concepts from Phase 1.",
      "url": "phase2/task-salesloft-setup.html",
      "learn": [
        {
          "id": "p1",
          "title": "From concept to working account",
          "body": "<p>In Phase 1's Team Schedule and Cadences task you learned what cadences are. Now make the tool yours: sign in, connect your email and calendar so activity logs automatically, and find the daily task view where due cadence steps appear. A connected account means every call and email you log becomes visible history for the whole account team.</p>\n<!-- PLACEHOLDER: confirm how BTS engineers are expected to use Salesloft on this team — own cadences, logging AE-support activity, or view-only. Also link the account provisioning process. -->"
        },
        {
          "id": "p2",
          "title": "Settings worth two minutes",
          "body": "<p>Check your profile (name, title as customers should see it), confirm your email signature in Salesloft matches your Outlook one, and review notification settings so due-step reminders arrive somewhere you'll see them — without drowning your inbox.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Sign in to Salesloft and complete your profile. <!-- PLACEHOLDER: link provisioning/access instructions -->",
          "Connect your email and calendar integrations per the setup prompts.",
          "Locate the daily task view where due cadence steps appear.",
          "Open one cadence you can see and re-identify its steps and spacing (Phase 1 knowledge, now in your own account).",
          "Confirm with your buddy what BTS engineers actually log in Salesloft on this team."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Connecting email and calendar to Salesloft means…",
            "options": [
              "Your customer activity logs automatically and is visible to the account team",
              "Salesloft sends emails without asking",
              "Your personal email becomes public",
              "Nothing changes"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Due cadence steps appear in…",
            "options": [
              "The daily task view",
              "Your Outlook drafts",
              "The MaaS360 portal",
              "Slack"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Your Salesloft profile and signature should…",
            "options": [
              "Match how customers see you elsewhere — consistent name, title, signature",
              "Be blank for privacy",
              "Use a nickname",
              "Change weekly"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What did you confirm about how BTS uses Salesloft on this team, and what's still unclear?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Do one complete logged activity this week — even an internal test: log a call note or send a tracked email to your buddy. Seeing an activity flow into the record end-to-end makes the whole system click."
      }
    },
    {
      "id": "task-explain-uem-mdm",
      "phaseId": "phase2",
      "title": "Explain UEM/MDM",
      "description": "Nail the vocabulary of the industry — MDM, EMM, UEM — and deliver a clean explanation of each without notes.",
      "url": "phase2/task-explain-uem-mdm.html",
      "learn": [
        {
          "id": "p1",
          "title": "The three-letter ladder",
          "body": "<p>These terms describe an evolution. <b>MDM</b> (Mobile Device Management) — managing the device itself: enrollment, passcodes, wipe, restrictions. <b>EMM</b> (Enterprise Mobility Management) — MDM plus management of apps and content on those devices. <b>UEM</b> (Unified Endpoint Management) — the current era: one platform managing <em>all</em> endpoint types — phones, tablets, laptops (Windows/macOS), and IoT — under one console and policy model. MaaS360 is a UEM platform; MDM is the historical core it grew from.</p>"
        },
        {
          "id": "p2",
          "title": "Why the distinction sells",
          "body": "<p>Customers often arrive saying \"we need MDM\" while describing UEM problems (\"...and our laptops too\"). Hearing the difference lets you reframe: instead of a phone tool plus a separate laptop tool, one platform covers the fleet. That consolidation story — fewer consoles, consistent policy, one compliance view — is one of MaaS360's strongest openings.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Write one-sentence definitions of MDM, EMM, and UEM in your own words.",
          "Practice the ladder out loud until you can deliver it in under 60 seconds.",
          "Deliver it to your buddy and have them challenge you with \"so which one do we need?\"",
          "Find where MaaS360's laptop (Windows/macOS) management shows up in the portal — the proof of the U in UEM."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The correct evolution order is…",
            "options": [
              "MDM → EMM → UEM",
              "UEM → EMM → MDM",
              "EMM → MDM → UEM",
              "They're unrelated"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "What distinguishes UEM from MDM?",
            "options": [
              "UEM manages all endpoint types — including laptops and IoT — from one platform, not just mobile devices",
              "UEM is cheaper",
              "UEM only handles apps",
              "Nothing — same thing"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A customer says \"we need MDM for phones… oh and our 500 Windows laptops.\" Your best reframe is…",
            "options": [
              "One UEM platform can cover phones and laptops together — fewer consoles, one policy model",
              "Recommend two separate products",
              "Only discuss phones",
              "Correct their grammar"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Deliver your 60-second MDM→EMM→UEM ladder in writing, as you'd say it on a call."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Test the ladder on someone outside the industry (friend, family). If they can repeat the gist back, your version is clean. If they glaze over at \"endpoint,\" simplify again — the customer-exec version should survive a non-technical listener."
      }
    },
    {
      "id": "task-explain-byod-vs-corporate",
      "phaseId": "phase2",
      "title": "Explain BYOD vs Corporate",
      "description": "Explain the two ownership models — BYOD and corporate-owned — and how ownership drives every management decision.",
      "url": "phase2/task-explain-byod-vs-corporate.html",
      "learn": [
        {
          "id": "p1",
          "title": "Ownership is the first question",
          "body": "<p><b>BYOD</b> (Bring Your Own Device): the employee owns the device; the company manages only a work container on it. <b>Corporate-owned</b>: the company owns it and can manage the whole device. Nearly every design decision in device management — enrollment method, policy depth, privacy posture, what happens at offboarding — flows from this one distinction. It's usually the first discovery question you'll ask: \"who owns the devices?\"</p>"
        },
        {
          "id": "p2",
          "title": "The trade-offs each way",
          "body": "<p>BYOD: cheaper hardware, happier employees, but lighter control and a hard privacy line — IT manages the work bubble (Android work profile, iOS user-focused enrollment) and must not touch personal data. At offboarding, only work data is removed (selective wipe). Corporate-owned: full control, deep restrictions, supervision/zero-touch enrollment (ABM, KME) — but the company buys the hardware and owns lifecycle logistics. Most real customers run a mix, which is why platforms support both models side by side.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Write a two-column comparison: enrollment, policy depth, privacy, offboarding behavior for BYOD vs corporate-owned.",
          "Connect each column to what you learned in Apple 101 and Android 101 (work profile ↔ BYOD; supervision/KME ↔ corporate).",
          "Practice answering: \"we're worried about employee privacy on BYOD\" in two sentences.",
          "Ask your buddy which mix the team's typical customers actually run."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The single question that drives enrollment method, policy depth, and privacy posture is…",
            "options": [
              "Who owns the device?",
              "Which carrier is used?",
              "What color is the device?",
              "How old is the device?"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "On a BYOD device at employee offboarding, the right outcome is…",
            "options": [
              "Selective wipe — work data removed, personal data untouched",
              "Full device wipe",
              "Nothing removed",
              "Device confiscated"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Supervision and zero-touch enrollment (ABM/KME) belong to…",
            "options": [
              "Corporate-owned devices",
              "BYOD devices",
              "Both equally",
              "Neither"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Most real customers run…",
            "options": [
              "A mix of BYOD and corporate-owned, managed side by side",
              "Pure BYOD",
              "Pure corporate",
              "No devices"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A nurse asks: \"If I enroll my personal phone, can my employer read my texts?\" Answer as you would on a call."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Role-play with your buddy: they play an HR director worried about BYOD privacy, then switch to a logistics manager with 1,000 corporate scanners. Deliver the ownership story to each. Same facts, opposite emphasis — that pivot is the skill."
      }
    },
    {
      "id": "task-phase2-readiness",
      "phaseId": "phase2",
      "title": "Phase 2 Readiness Check",
      "description": "Confirm you're ready for Phase 3 — access everywhere, the 101 concepts solid, and the core vocabulary fluent.",
      "url": "phase2/task-phase2-readiness.html",
      "learn": [
        {
          "id": "p1",
          "title": "What \"ready\" means here",
          "body": "<p>Phase 2 built your foundation: access to every portal, the 101-level view of Apple, Android, and the MaaS360 console, and the industry vocabulary (UEM/MDM, BYOD vs corporate). Ready for Phase 3 means no pending access requests, smooth basic navigation of the demo portal, and the ability to deliver the Apple, Android, UEM, and ownership explanations without notes.</p>"
        },
        {
          "id": "p2",
          "title": "How the check works",
          "body": "<p>Self-review below, then a 30-minute walkthrough with your manager. Phase 3 goes a level deeper on everything (enrollment mechanics, identity, groups), so gaps in the 101 layer compound — better to close them now.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Confirm every access from this phase works: M portals, demo hierarchy, Sales Cloud, Salesloft, KME, ABM.",
          "Re-run your silent portal tour (MaaS360 101) and hit every area from memory.",
          "Deliver the four explanations without notes: Apple management, Android Enterprise, UEM/MDM ladder, BYOD vs corporate.",
          "Book the Phase 2 review with your manager."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Pending access requests at the end of Phase 2 should be…",
            "options": [
              "Escalated to your manager now — they block Phase 3 work",
              "Left to resolve themselves",
              "Cancelled",
              "Hidden"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The 101 layer matters for Phase 3 because…",
            "options": [
              "Phase 3 adds depth on the same topics — weak foundations compound",
              "Phase 3 is unrelated",
              "It's already graded",
              "Phase 3 repeats it identically"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"Ready\" for the vocabulary means…",
            "options": [
              "Delivering the explanations out loud without notes",
              "Recognizing the terms when read",
              "Having the definitions bookmarked",
              "Memorizing acronym spellings"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Rank your four explanations (Apple, Android, UEM, BYOD) from strongest to weakest. What's the fix for the weakest?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Hold the manager review: demo-portal navigation live, one explanation of their choice on the spot, and your access checklist. Agree Phase 3 starts — the enrollment deep-dives ahead are where the role starts feeling real."
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
