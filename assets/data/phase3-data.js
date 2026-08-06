/* Phase 3: Ascent — generated from content/phase3.md by content/tools/build.js. */
/* Edit content/phase3.md, then run: node content/tools/build.js */
/* IBM Docs reference: https://www.ibm.com/docs/en/maas360 */
window.PHASE3_DATA = {
  "id": "phase3",
  "title": "Phase 3: Ascent",
  "subtitle": "Go deeper on identity, platform management, and enrollment types.",
  "icon": "⛏️",
  "tasks": [
    {
      "id": "task-identity-100",
      "phaseId": "phase3",
      "title": "Identity 101",
      "description": "Learn how MaaS360 integrates with corporate directories like Active Directory and Azure AD to manage user authentication and access.",
      "url": "phase3/task-identity-100.html",
      "learn": [
        {
          "id": "p1",
          "title": "The big picture",
          "body": "<p>Identity in MaaS360 means connecting the platform to a corporate directory (Active Directory, Azure AD / Entra ID) so users sign in with their existing work credentials and devices map to the right person and groups.</p>"
        },
        {
          "id": "p2",
          "title": "Why integrate identity",
          "body": "<p>Linking MaaS360 to the corporate directory means you don't create users twice. When someone joins or leaves, the directory is the source of truth, and MaaS360 grants or revokes access automatically.</p>"
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
          "Open the MaaS360 directory / identity settings (placeholder).",
          "Identify whether a directory (AD/Azure AD) is connected.",
          "Find where user groups sync from the directory.",
          "Note one policy that targets a directory group."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Identity 100 is mainly about integrating MaaS360 with…",
            "options": [
              "A printer",
              "Corporate directories like AD / Azure AD",
              "A payment gateway",
              "A CDN"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "Azure AD is now also branded as…",
            "options": [
              "Entra ID",
              "Okta",
              "Ping",
              "LDAP Cloud"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Integrating identity means users sign in with…",
            "options": [
              "A brand-new MaaS360 password",
              "Their existing corporate credentials",
              "A one-time code only",
              "No login at all"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "The directory acts as the…",
            "options": [
              "Source of truth for users/groups",
              "Antivirus engine",
              "Wi-Fi router",
              "App store"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A benefit of directory integration is…",
            "options": [
              "Automatic access changes when staff join/leave",
              "Faster phone cameras",
              "More storage",
              "Cheaper licensing"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Why is the corporate directory considered the 'source of truth' for user access?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "A customer wants new employees to get device policies automatically on day one. Explain how directory integration and group-based policies make that happen."
      }
    },
    {
      "id": "task-supervised-vs-unsupervised",
      "phaseId": "phase3",
      "title": "Explain Supervised vs Unsupervised",
      "description": "'Supervision' on iOS gives the organization deeper control over the device, preventing users from removing the MDM profile. Unsupervised is typically for BYOD.",
      "url": "phase3/task-supervised-vs-unsupervised.html",
      "learn": [
        {
          "id": "p1",
          "title": "The big picture",
          "body": "<p>On iOS, 'supervision' is a management mode that gives the organization deeper control of a device (extra restrictions, the user can't remove the MDM profile). Unsupervised devices have lighter control and are typical for BYOD.</p>"
        },
        {
          "id": "p2",
          "title": "When to use which",
          "body": "<p>Supervised = corporate-owned devices where the company needs strong control. Unsupervised = personal (BYOD) devices where you respect the user's privacy and only manage work data.</p>"
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
          "Open MaaS360 and find an iOS device record (placeholder).",
          "Locate the field showing supervised vs unsupervised.",
          "List two restrictions only available when supervised.",
          "Note which ownership type usually maps to each mode."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Supervision is a concept on which platform?",
            "options": [
              "Windows",
              "iOS",
              "Linux",
              "ChromeOS"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "A supervised device…",
            "options": [
              "Gives the org deeper control",
              "Cannot be managed",
              "Is always personal",
              "Has no MDM profile"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "On a supervised device the user typically…",
            "options": [
              "Can remove the MDM profile freely",
              "Cannot remove the MDM profile",
              "Has no restrictions",
              "Owns the device personally"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "Unsupervised mode is most common for…",
            "options": [
              "Corporate kiosks",
              "BYOD / personal devices",
              "Servers",
              "Routers"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "Supervision is usually applied to…",
            "options": [
              "Corporate-owned devices",
              "Random public devices",
              "Devices with no owner",
              "Only Android devices"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Why might a company choose unsupervised management for an employee's personal phone?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "A customer asks whether they should supervise employee personal phones. Recommend an approach and justify it in terms of control vs privacy."
      }
    },
    {
      "id": "task-apple-200",
      "phaseId": "phase3",
      "title": "Apple 201",
      "description": "Process depth — how Apple devices actually get enrolled in MaaS360: over-the-air vs automated enrollment, what the MDM profile does, and how apps arrive.",
      "url": "phase3/task-apple-200.html",
      "learn": [
        {
          "id": "p1",
          "title": "The two roads into management",
          "body": "<p>Apple devices reach MaaS360 by one of two roads. <b>Over-the-air (OTA) enrollment</b>: the user visits an enrollment URL or uses the MaaS360 app, authenticates, and accepts the MDM profile — typical for BYOD, and removable by the user. <b>Automated Device Enrollment</b> via ABM (historically called DEP): corporate devices purchased through Apple's channel are assigned to MaaS360 in ABM, and enrollment happens during the device's Setup Assistant — no user opt-in, supervision applied automatically, and the management profile can be made non-removable.</p>"
        },
        {
          "id": "p2",
          "title": "What actually happens at enrollment",
          "body": "<p>During enrollment the device installs an <b>MDM profile</b> — a trust anchor containing certificates and the address of MaaS360's MDM server. From then on the flow is: MaaS360 sends a push through <b>APNs</b> → the device wakes and checks in with the MDM server over its own secure channel → commands and policies execute (APNs itself carries no payload — it's just the doorbell). This is why APNs health is existential: no push, no timely management.</p>"
        },
        {
          "id": "p3",
          "title": "How apps arrive",
          "body": "<p>Through ABM's <b>Apps and Books</b> (the successor to VPP), a customer buys app licenses centrally, connects the location token to MaaS360, and MaaS360 assigns apps to devices or users. On supervised devices apps can install silently; on BYOD enrollments the user is prompted. App licenses are owned by the organization and reclaimable when a device leaves.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find where enrollment requests are generated (device enrollment / add device) and walk through creating one without completing it.",
          "Under Setup → Services, locate the ABM/DEP token area and identify the enrollment profile settings available.",
          "Trace the push path out loud: portal action → APNs → device check-in → command execution.",
          "Find where Apps and Books licenses appear in the Apps section of the portal.",
          "Read the DEP configuration guide at ibm.com/docs/en/maas360 and note one detail you didn't expect."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The key difference between OTA and Automated Device Enrollment is…",
            "options": [
              "OTA needs user action and is removable; automated enrollment happens at Setup Assistant, applies supervision, and can be locked in",
              "OTA is for Macs only",
              "Automated enrollment requires a USB cable",
              "There is no difference"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "APNs' role in management is…",
            "options": [
              "A wake-up push telling the device to check in — the actual commands travel on the device's channel to the MDM server",
              "Carrying the full policy payload",
              "Backing up the device",
              "Installing apps directly"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A corporate iPhone bought through Apple's business channel gets into MaaS360 by…",
            "options": [
              "ABM assignment → automatic enrollment during Setup Assistant",
              "The user finding the App Store",
              "Emailing IBM",
              "Jailbreaking"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Apps and Books (VPP) licenses are…",
            "options": [
              "Organization-owned and reclaimable when a device leaves",
              "Tied forever to a user's personal Apple ID",
              "Free for all apps",
              "Only for macOS"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Walk through what happens, step by step, from \"admin clicks Lock Device in the portal\" to the iPhone locking. Name every actor."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Whiteboard the two enrollment roads side by side (OTA vs automated) for your buddy, including where supervision and non-removability come from. Then answer their follow-up: \"which road do we recommend for a 500-device corporate fleet, and why?\" Apple 301 will add the certificate lifecycle underneath all of this."
      }
    },
    {
      "id": "task-android-200",
      "phaseId": "phase3",
      "title": "Android 201",
      "description": "Process depth — how Android devices enroll in each Android Enterprise mode: QR and identifier enrollment, zero-touch, KME, and the managed Google Play binding.",
      "url": "phase3/task-android-200.html",
      "learn": [
        {
          "id": "p1",
          "title": "One binding first",
          "body": "<p>Before any Android Enterprise management, the customer's MaaS360 account is <b>bound to managed Google Play</b> once (Setup → Services). That binding creates the enterprise relationship with Google that all modes — work profile, fully managed, dedicated — hang off. In demos it's already done; in customer onboarding it's step one.</p>"
        },
        {
          "id": "p2",
          "title": "How each mode gets provisioned",
          "body": "<p><b>Work profile (BYOD)</b>: the user installs the MaaS360 app or follows an enrollment link; the OS creates the work profile — personal side untouched, badge icons mark work apps. <b>Fully managed</b>: provisioning must start on a factory-reset device — commonly by scanning a <b>QR code</b> at the welcome screen or entering a DPC identifier (the afw# style token) — which makes MaaS360 the device owner. <b>Dedicated/kiosk</b> is fully managed plus a locked-down policy (single app or approved set). <b>Zero-touch</b>: Google's program (and Samsung's KME, which you connected in Phase 2) pre-registers corporate devices so they enroll automatically out of the box — the Android analog of ABM automated enrollment.</p>"
        },
        {
          "id": "p3",
          "title": "Ownership maps to mode",
          "body": "<p>The BYOD-vs-corporate conversation from Phase 2 lands here concretely: employee-owned → work profile; corporate general-purpose → fully managed (via zero-touch/KME at scale); corporate single-purpose → dedicated. When a customer describes their fleet, you should hear the mode mix in your head.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find the Android enrollment configuration area and identify how a QR enrollment is generated.",
          "Locate the managed Google Play binding under Setup → Services and confirm what it shows about the demo account.",
          "Write the provisioning story for each mode in one sentence each: work profile, fully managed, dedicated, zero-touch/KME.",
          "In the device inventory, identify one device per mode if the demo hierarchy has them; note visual differences in their device views."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The managed Google Play binding is…",
            "options": [
              "The one-time link between the customer's MaaS360 account and Google that all Android Enterprise management depends on",
              "A per-device setting",
              "Samsung-only",
              "Optional for fully managed mode"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Fully managed provisioning must begin…",
            "options": [
              "On a factory-reset device (QR code or DPC identifier at the welcome screen)",
              "After the user sets up their personal account",
              "With a USB cable only",
              "In the Play Store"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The Android analog of Apple's automated device enrollment is…",
            "options": [
              "Zero-touch enrollment (and KME for Samsung)",
              "The work profile",
              "QR codes",
              "There isn't one"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A customer fleet of employee-owned phones plus corporate delivery scanners maps to…",
            "options": [
              "Work profile for the phones, dedicated mode for the scanners",
              "Fully managed for everything",
              "Work profile for everything",
              "No management needed"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A prospect asks: \"How would enrollment actually work for our 300 corporate Samsungs?\" Give the KME answer in three sentences."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Using the demo portal, generate (but don't deploy) a QR enrollment configuration and screenshot it. Then explain to your buddy the full journey of one corporate Samsung: reseller registers in KME → device ships → user unboxes → auto-enrolls into MaaS360 fully managed → policies land. Android 301 adds the deeper technical controls on top."
      }
    },
    {
      "id": "task-windows-100",
      "phaseId": "phase3",
      "title": "Windows 101",
      "description": "High-level overview — how MaaS360 manages Windows 10/11 devices, and the enrollment options including the Bulk Provisioning Tool.",
      "url": "phase3/task-windows-100.html",
      "learn": [
        {
          "id": "p1",
          "title": "Windows in a UEM world",
          "body": "<p>Windows 10/11 has MDM management built into the OS — the same idea as Apple's and Google's frameworks. MaaS360 manages Windows laptops through this channel: policies for passwords, encryption (BitLocker), updates, restrictions, plus app distribution and compliance visibility in the same console as the mobile fleet. This is the \"U\" in UEM made tangible — one portal, phones and laptops together.</p>"
        },
        {
          "id": "p2",
          "title": "Getting Windows devices enrolled",
          "body": "<p>For individual devices, a user can enroll through a straightforward MDM enrollment flow (work account / enrollment URL). At scale, MaaS360 provides the <b>Windows Bulk Provisioning Tool</b>: admins prepare a provisioning package so a large quantity of Windows devices enroll automatically — either baked into the disk image used for new machines or pushed through an existing client-management tool. User association can then be applied afterwards (including via CSV upload) so each device maps to its owner.</p>"
        },
        {
          "id": "p3",
          "title": "What customers ask at this level",
          "body": "<p>Common 101-level questions: \"Can we manage laptops with the same tool as phones?\" (yes — that's the pitch), \"Does it replace our existing Windows imaging?\" (it complements it — the bulk tool rides along with imaging), and \"What about BitLocker and updates?\" (policy-controlled from the portal).</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find an enrolled Windows device and open its device view; compare available data and actions against an iOS device.",
          "Locate the Windows policy area and skim its main categories (security, encryption, updates).",
          "Find where Windows enrollment options live and identify the Bulk Provisioning Tool references.",
          "Read the bulk provisioning docs at ibm.com/docs/en/maas360 and note the two rollout paths (image-based vs client-management tool)."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "MaaS360 manages Windows laptops through…",
            "options": [
              "The MDM management channel built into Windows 10/11",
              "Screen sharing",
              "A custom Windows build",
              "It can't manage laptops"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The Windows Bulk Provisioning Tool exists to…",
            "options": [
              "Enroll large quantities of Windows devices automatically via a provisioning package",
              "Replace Windows Update",
              "Manage iPhones",
              "Create user accounts"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The strongest Windows-related pitch line for MaaS360 is…",
            "options": [
              "Laptops and mobile devices managed in one console with one policy model",
              "Windows is unsupported",
              "It's a faster antivirus",
              "It replaces Active Directory"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "After bulk enrollment, devices get mapped to their owners by…",
            "options": [
              "User association — including bulk CSV upload",
              "Guesswork",
              "Device serial numbers only",
              "They stay unassigned forever"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A customer manages phones in MaaS360 and laptops with a separate tool. Make the consolidation case in three sentences."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Add Windows to your platform sketch collection: enrollment (individual vs bulk provisioning), policy categories, and where it appears in the console. You now hold the three-platform 101 set — Apple, Android, Windows — which is the backbone of every \"what can you manage?\" conversation."
      }
    },
    {
      "id": "task-user-device-groups",
      "phaseId": "phase3",
      "title": "User and Device Groups",
      "description": "Groups are how anything scales in MaaS360 — learn how devices and users are grouped and how policies and apps target those groups.",
      "url": "phase3/task-user-device-groups.html",
      "learn": [
        {
          "id": "p1",
          "title": "Why groups exist",
          "body": "<p>No admin assigns policies to 5,000 devices one at a time. In MaaS360, <b>groups</b> are the targeting layer: you define a group, then aim policies, apps, and rules at it. New devices that match the group inherit everything automatically — that inheritance is what makes management scale.</p>"
        },
        {
          "id": "p2",
          "title": "The two flavors",
          "body": "<p><b>User groups</b> collect people — often synced from the corporate directory (the Identity 101 connection: AD/Entra groups flow in and stay updated). <b>Device groups</b> collect devices by attributes — platform, ownership, OS version, compliance state, and other criteria. A typical pattern: the \"Sales\" user group gets the CRM app wherever they log in, while an \"iOS supervised\" device group gets the corporate restrictions policy.</p>"
        },
        {
          "id": "p3",
          "title": "The demo power move",
          "body": "<p>Groups turn abstract policy talk into a story: \"when HR hires someone, the directory adds them to a group, MaaS360 sees it, and their device gets every app and policy they need — nobody touched the console.\" That end-to-end automation story is one of the most reliable \"aha\" moments in demos.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "In the demo portal, find the Groups area and list which user and device groups exist in the demo hierarchy.",
          "Open one device group and identify its membership criteria.",
          "Find one policy or app distribution that targets a group, and trace the chain: group → assignment → affected devices.",
          "Sketch the new-hire automation story (directory → group → policy/apps → device) in four boxes."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Groups exist in MaaS360 because…",
            "options": [
              "They're the targeting layer that lets policies and apps scale to thousands of devices automatically",
              "Devices like company",
              "Policies require exactly one group",
              "They're cosmetic folders"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "User groups typically come from…",
            "options": [
              "The corporate directory (AD/Entra), synced and kept current",
              "Manual entry only",
              "Device serial numbers",
              "The App Store"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A device group collecting \"all iOS devices on an outdated OS version\" enables…",
            "options": [
              "Targeting them with a policy or action automatically as devices drift in and out",
              "Nothing useful",
              "Only reporting",
              "Deleting the devices"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The new-hire automation story lands because…",
            "options": [
              "It shows policy/app delivery happening end-to-end with zero console work per hire",
              "It mentions HR",
              "Customers like boxes and arrows",
              "It's fictional"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Design the group structure for a 2,000-employee retailer: corporate iPads in stores, BYOD phones for office staff, rugged scanners in warehouses. Name your groups and what targets each."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Build your retailer design from the quiz in the demo portal on paper first, then walk your buddy through it group by group. If the demo hierarchy allows sandbox changes, create one harmless test device group with a clear name and delete it after — the create-target-verify loop is a core demo motion."
      }
    },
    {
      "id": "task-wpp",
      "phaseId": "phase3",
      "title": "WPP",
      "description": "Windows provisioning packages — how bulk Windows enrollment payloads are built and applied at scale.",
      "url": "phase3/task-wpp.html",
      "learn": [
        {
          "id": "p1",
          "title": "What a provisioning package is",
          "body": "<p>A Windows provisioning package is a portable bundle of configuration that Windows can consume during or after setup — it's how settings and enrollment instructions get applied to a machine without a person clicking through screens. MaaS360's Windows Bulk Provisioning Tool builds on this idea: prepare the enrollment payload once, apply it to many machines.</p>"
        },
        {
          "id": "p2",
          "title": "The two rollout paths",
          "body": "<p>From Windows 101 you know the destination; here's the mechanics. <b>Image path</b>: the provisioning payload is included in the base disk image IT uses for new laptops — every machine imaged from it enrolls into MaaS360 on first boot. <b>Client-management path</b>: an existing software distribution tool pushes the enrollment payload to already-running machines — useful for bringing an existing fleet under management without reimaging. Afterwards, user association (manual or CSV bulk upload) maps each enrolled device to its owner.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Re-open the Windows Bulk Provisioning docs at ibm.com/docs/en/maas360 and identify where the tool is downloaded and configured.",
          "Write the image path and client-management path as two 3-step sequences.",
          "Identify which questions a customer must answer before choosing a path (existing imaging process? existing distribution tool? fleet already deployed?).",
          "Confirm with your mentor what WPP refers to on this team and whether a demo asset exists for it."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "A provisioning package's job is…",
            "options": [
              "Applying configuration and enrollment to Windows machines without manual clicking",
              "Compressing files",
              "Replacing the OS license",
              "Managing iPhones"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The image path suits…",
            "options": [
              "New machines built from a standard corporate image",
              "Devices already in users' hands",
              "Android tablets",
              "Nothing"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The client-management path exists because…",
            "options": [
              "Existing deployed fleets can be enrolled by the customer's current distribution tool without reimaging",
              "Images are illegal",
              "It's faster than the internet",
              "Windows requires two enrollments"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "A customer has 2,000 existing laptops managed by a software-distribution tool and images all new laptops. Which path(s) do you propose, and why?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Answer the quiz-4 scenario out loud to your buddy as if on a discovery call, including the one clarifying question you'd ask first. Then confirm the WPP placeholder above with your mentor so this card can be finalized."
      }
    },
    {
      "id": "task-portal-scavenger-hunt",
      "phaseId": "phase3",
      "title": "Portal Scavenger Hunt",
      "description": "A timed navigation drill across the whole portal — prove you can find anything fast, under mild pressure.",
      "url": "phase3/task-portal-scavenger-hunt.html",
      "learn": [
        {
          "id": "p1",
          "title": "Why a scavenger hunt",
          "body": "<p>Demos die on navigation fumbles. This drill converts your Phase 2 portal tour into speed: a list of finds, done fast, from memory. The point isn't trivia — every item below is something a customer has asked to see on a real call.</p>"
        },
        {
          "id": "p2",
          "title": "The hunt list",
          "body": "<p>Find each of these from the portal home, no search engine, no notes: (1) a specific device's OS version and last check-in; (2) which policy applies to that device; (3) the APNs certificate status and expiry; (4) the ABM/DEP token area; (5) the managed Google Play binding; (6) a device group's membership criteria; (7) an app assigned to a group; (8) a compliance/security dashboard view; (9) where a device wipe is triggered (don't trigger it); (10) where enrollment requests are generated.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Run the full hunt once untimed, noting where you hesitated.",
          "Run it again timed — target under 10 minutes for all ten.",
          "Have your buddy call out three items in random order; find each in under 30 seconds.",
          "Write down your slowest item and drill just that path three times."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The APNs certificate status lives under…",
            "options": [
              "Setup → Services (Mobile Device Management area)",
              "The Devices list",
              "The Apps catalog",
              "Home dashboard"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "To see which policy a specific device receives, you look…",
            "options": [
              "In that device's device view",
              "In the billing page",
              "In Salesloft",
              "You can't"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The scavenger hunt exists because…",
            "options": [
              "Every item on it is something customers ask to see live — speed equals credibility",
              "Portals enjoy being browsed",
              "It's a memory test for its own sake",
              "Navigation doesn't matter with slides"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which item was slowest for you, and what's the exact click path now that you've drilled it?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Final round: your buddy plays a customer who interrupts a demo with \"wait — can you show me where you'd see if a device is out of compliance?\" and two similar curveballs of their choosing. Field all three without breaking conversational stride. That's the real exam."
      }
    },
    {
      "id": "task-compare-android-enrollment",
      "phaseId": "phase3",
      "title": "Compare Android Enrollment Types",
      "description": "Synthesis exercise — put every Android enrollment path side by side and know exactly when to recommend which.",
      "url": "phase3/task-compare-android-enrollment.html",
      "learn": [
        {
          "id": "p1",
          "title": "The comparison table",
          "body": "<p>You've met all the pieces (Android 101, Android 201, KME). Now force them into one table. Rows: <b>work profile</b>, <b>fully managed (QR/identifier)</b>, <b>fully managed (zero-touch)</b>, <b>fully managed (KME)</b>, <b>dedicated</b>. Columns: who owns the device, factory reset required?, user effort, IT effort at scale, privacy posture, typical customer. Building the table yourself — rather than reading one — is what makes it stick.</p>"
        },
        {
          "id": "p2",
          "title": "The recommendation reflexes",
          "body": "<p>The patterns to internalize: employee-owned → work profile, always. Corporate at small scale or mixed sourcing → QR provisioning. Corporate at scale bought through resellers → zero-touch (or KME for Samsung fleets). Single-purpose hardware → dedicated. When a customer's answer is \"some of each,\" the answer is a mode mix — and MaaS360 handles all modes from one console, which is itself a selling point.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Build the full table from memory; check it against Android 101/201 and fix gaps.",
          "For each row, write the one customer sentence you'd use to recommend it.",
          "Quiz yourself with fleet descriptions (\"400 BYOD + 200 corporate Samsungs + 50 kiosks\") until mode-mix answers come instantly.",
          "Review the table with your mentor for anything the team's real deals add."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "A fleet of employee-owned devices always maps to…",
            "options": [
              "Work profile",
              "Fully managed",
              "Dedicated",
              "Zero-touch"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Zero-touch/KME beats QR provisioning at scale because…",
            "options": [
              "Devices enroll automatically out of the box with no per-device manual step",
              "QR codes expire",
              "It's cheaper per QR",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"400 BYOD phones, 200 corporate Samsungs via reseller, 50 lobby kiosks\" maps to…",
            "options": [
              "Work profile + KME fully managed + dedicated",
              "All fully managed",
              "All work profile",
              "Unmanageable"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The meta-selling-point behind the mode comparison is…",
            "options": [
              "One console handles every mode, so mixed fleets don't need mixed tools",
              "Android is complicated",
              "Modes change monthly",
              "Comparisons impress procurement"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write your table's \"typical customer\" column — one line per mode."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Deliver the comparison as a five-minute whiteboard talk to your buddy, table drawn live from memory, ending with a mode-mix recommendation for a fleet they invent on the spot. This talk is a reusable demo asset — most Android conversations eventually need it."
      }
    },
    {
      "id": "task-phase3-readiness",
      "phaseId": "phase3",
      "title": "Phase 3 Readiness Check",
      "description": "Confirm you're ready for Phase 4 — enrollment mechanics, groups, identity basics, and fast portal navigation all in place.",
      "url": "phase3/task-phase3-readiness.html",
      "learn": [
        {
          "id": "p1",
          "title": "What \"ready\" means here",
          "body": "<p>Phase 3 took you from \"knows what things are\" to \"knows how they happen\": Apple and Android enrollment flows, Windows enrollment at scale, groups as the targeting layer, identity basics, and speed navigation. Ready for Phase 4 means you can explain any enrollment path end to end, design a sensible group structure, and find anything in the portal in seconds — because Phase 4 starts pointing you at demos and customers.</p>"
        },
        {
          "id": "p2",
          "title": "How the check works",
          "body": "<p>Self-review, then the manager walkthrough. The bar rises here: Phase 4 tasks (practice demos, shadowing, mock onboarding) consume this knowledge live, so anything shaky gets exposed in front of an audience. Better to find it in this room first.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Deliver the Apple enrollment story (OTA vs automated) and Android mode comparison without notes.",
          "Re-run the scavenger hunt under 10 minutes.",
          "Explain the new-hire automation story (directory → group → policy → device) in under two minutes.",
          "Book the Phase 3 review with your manager; bring your comparison table and group design."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The bar for Phase 4 is higher because…",
            "options": [
              "Phase 4 uses this knowledge live in demos and shadowed customer work",
              "Phase 4 is graded",
              "Phase 3 was optional",
              "It isn't"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "If your Android mode comparison is still shaky, the right move is…",
            "options": [
              "Drill it with your buddy this week before starting Phase 4",
              "Hope no customer has Androids",
              "Skip Phase 4 demos",
              "Memorize the quiz answers"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"Explain any enrollment path end to end\" means…",
            "options": [
              "Every actor and step from unboxing (or opt-in) to policies landing on the device",
              "Naming the enrollment types",
              "Quoting the docs URL",
              "Drawing one box"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which enrollment path can you explain most fluently, and which needs another rep? Be specific about the weak step."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "At the manager review, have them pick one platform and one scale (\"Android, 1,000 corporate devices\") and deliver the full enrollment-to-managed story cold. Agree Phase 4 starts. The mountain gets fun from here — next phase you're demoing."
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
