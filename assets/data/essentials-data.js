/* Section 0: Onboarding Essentials — generated from content/essentials.md by content/tools/build.js. */
/* Edit content/essentials.md, then run: node content/tools/build.js */
/* IBM Docs reference: https://www.ibm.com/docs/en/maas360 */
window.ESSENTIALS_DATA = {
  "id": "essentials",
  "title": "Section 0: Onboarding Essentials",
  "subtitle": "Trailhead admin — get your accounts, device, and access sorted before the climb.",
  "icon": "⛺",
  "tasks": [
    {
      "id": "task-meet-the-team",
      "phaseId": "essentials",
      "title": "Meet the Team",
      "description": "Put names to faces — your manager, onboarding buddy, fellow BTS engineers, and the sellers you'll support every day.",
      "url": "essentials/task-meet-the-team.html",
      "learn": [
        {
          "id": "p1",
          "title": "Who's who around you",
          "body": "<p>Your day-to-day orbit has four groups: your <b>manager</b> (priorities, feedback, sign-offs on each phase), your <b>onboarding buddy</b> (first stop for questions big and small), the <b>BTS team</b> (peers who run the same plays you're learning), and the <b>Account Executives / sellers</b> whose deals you'll provide technical coverage for.</p>\n<!-- PLACEHOLDER: link team roster / org chart, and list actual names for manager, buddy, and aligned AEs -->"
        },
        {
          "id": "p2",
          "title": "Why meet everyone early",
          "body": "<p>The BTS role runs on borrowed context: you'll constantly ask \"has anyone seen this before?\" Knowing who owns what — and having exchanged a first hello — makes every later ask easier. People help faster when you're a person, not a name in a channel.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Ask your manager for the team roster and note each person's role.",
          "Introduce yourself to your onboarding buddy and agree how you'll communicate (Slack, calls, ad-hoc).",
          "Say hello to at least two BTS peers and one AE you'll support.",
          "Note each person's time zone and typical working hours."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Your first stop for everyday questions during onboarding is…",
            "options": [
              "The customer",
              "Your onboarding buddy",
              "IBM Support",
              "Nobody — figure it out alone"
            ],
            "correct": 1
          },
          {
            "type": "mc",
            "question": "Phase sign-offs and priorities come from…",
            "options": [
              "Your manager",
              "The AE",
              "Whoever is online",
              "The customer success team"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "AEs / sellers rely on a BTS engineer for…",
            "options": [
              "Payroll questions",
              "Technical coverage on their deals",
              "Legal review",
              "Office supplies"
            ],
            "correct": 1
          },
          {
            "type": "text",
            "question": "Who are your manager, your buddy, and one AE you'll support — and what's one thing you learned about each?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Set up short intro chats (15 minutes) with your buddy and one BTS peer this week. Come with two questions each: \"what do you wish you'd known in week 1?\" and \"what does great BTS support look like from your seat?\" Write down the answers — they become your working notes for Phase 1."
      }
    },
    {
      "id": "task-enroll-laptop",
      "phaseId": "essentials",
      "title": "Enroll Laptop",
      "description": "Get your work laptop through IT setup — enrolled, encrypted, updated, and signed in to core services.",
      "url": "essentials/task-enroll-laptop.html",
      "learn": [
        {
          "id": "p1",
          "title": "What \"enrolled\" means",
          "body": "<p>Company laptops are managed devices: IT enrolls them into a management platform so security policies, disk encryption, updates, and required software arrive automatically. You'll live this same concept from the admin side later — MaaS360 does for customers exactly what IBM IT does for your laptop.</p>\n<!-- PLACEHOLDER: link IBM internal laptop setup guide / IT onboarding portal -->"
        },
        {
          "id": "p2",
          "title": "What good setup looks like",
          "body": "<p>By the end of setup you should have: your corporate identity signed in, disk encryption on, OS fully updated, VPN working if required, and the standard security agents installed. If any step fails, IT is the right owner — don't work around a broken enrollment.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Complete the IT-provided setup steps for your laptop.",
          "Verify disk encryption is enabled and the OS shows no pending critical updates.",
          "Sign in to your corporate identity and confirm SSO works for at least one internal tool.",
          "Note the process a *customer's* employee would go through to enroll a device — you'll compare it to MaaS360 enrollment in Phase 2."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "A \"managed\" laptop means…",
            "options": [
              "IT can apply policies, updates, and security config automatically",
              "It runs slower on purpose",
              "You cannot install anything ever",
              "It has no password"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "If enrollment or setup fails, the right move is…",
            "options": [
              "Contact IT and get it fixed properly",
              "Work around it and continue",
              "Disable security tools",
              "Reinstall the OS yourself"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The reason this task matters for a future BTS engineer is…",
            "options": [
              "You'll sell and demo the same device-management concepts to customers",
              "Laptops are rare at IBM",
              "It replaces Phase 2 entirely",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "In one sentence: what did enrolling your own laptop teach you about what enrollment feels like for an end user?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "While your laptop finishes setup, write down every step you were asked to do and roughly how long it took. Keep the list — in Phase 2 you'll compare it against MaaS360's enrollment flow and use \"I've been the end user\" as a credibility line in demos."
      }
    },
    {
      "id": "task-setup-1password",
      "phaseId": "essentials",
      "title": "Setup 1Password",
      "description": "Set up your password manager — vault, browser extension, and strong unique passwords from day one.",
      "url": "essentials/task-setup-1password.html",
      "learn": [
        {
          "id": "p1",
          "title": "Why a password manager",
          "body": "<p>You're about to create accounts on a dozen portals (MaaS360, ABM, KME, Salesloft, and more). A password manager generates and stores a strong, unique password for each so a breach of one never cascades. 1Password unlocks with one primary password — make that one long, memorable, and never reused.</p>\n<!-- PLACEHOLDER: link IBM's 1Password enrollment/instructions page -->"
        },
        {
          "id": "p2",
          "title": "Working habits",
          "body": "<p>Install the browser extension so credentials autofill on the right domain — this also protects against phishing look-alike sites, because autofill won't offer credentials on the wrong URL. Store portal credentials as you create them in later phases; never keep passwords in notes files or chat.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Install 1Password (desktop + browser extension) and sign in / create your account per company instructions.",
          "Set a strong primary password you have never used anywhere else.",
          "Save your first credential and test autofill on that site.",
          "Turn on the app on your phone so passwords are available during demos and travel."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The main security win of a password manager is…",
            "options": [
              "A unique strong password per site, so one breach can't cascade",
              "Not needing passwords at all",
              "Sharing passwords with the team easily",
              "Remembering one password for every site"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Autofill from the browser extension also protects you because…",
            "options": [
              "It won't offer credentials on a look-alike phishing domain",
              "It types faster",
              "It disables cookies",
              "It hides your IP address"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Your primary (unlock) password should be…",
            "options": [
              "Long, memorable, and used nowhere else",
              "Your email password",
              "Written on a sticky note",
              "Rotated daily"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which portals do you expect to store credentials for during this onboarding? (Name at least three.)"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "As you complete the rest of the Essentials tasks, store every new credential in 1Password at the moment you create it. By the end of Section 0 your vault — not your memory or a notes file — should be the only place your passwords exist."
      }
    },
    {
      "id": "task-setup-verify",
      "phaseId": "essentials",
      "title": "Setup Verify",
      "description": "Set up IBM Verify for multi-factor authentication so you can approve sign-ins from your phone.",
      "url": "essentials/task-setup-verify.html",
      "learn": [
        {
          "id": "p1",
          "title": "What Verify does",
          "body": "<p>IBM Verify is the MFA app you'll use to approve sign-ins to IBM systems — a push notification or one-time code on your phone proves it's really you, even if a password leaks. Most internal tools will prompt it regularly, so it's worth setting up properly on day one.</p>\n<!-- PLACEHOLDER: link IBM Verify registration instructions for new hires -->"
        },
        {
          "id": "p2",
          "title": "MFA in one breath",
          "body": "<p>MFA combines something you <em>know</em> (password) with something you <em>have</em> (your phone). This is the same class of protection you'll later discuss with customers — identity and conditional access are recurring themes in MaaS360 conversations, and having lived it makes it easy to explain.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Install IBM Verify on your phone and register it against your IBM id per instructions.",
          "Test one sign-in end-to-end and confirm the push/code flow works.",
          "Set up the backup/recovery method offered during registration so a lost phone doesn't lock you out.",
          "Store any recovery codes in 1Password."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "MFA protects you because an attacker with your password still lacks…",
            "options": [
              "The second factor — your enrolled device",
              "Your email address",
              "Your username",
              "Your browser history"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The two factors in \"password + Verify push\" are…",
            "options": [
              "Something you know + something you have",
              "Two passwords",
              "Two devices",
              "A password + a security question"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "If you lose the phone with Verify on it, you can still get in because…",
            "options": [
              "You set up a backup/recovery method during registration",
              "MFA turns off automatically",
              "IT can read your mind",
              "You memorized the push notifications"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Where else have you seen MFA in daily life, and how would you explain its value to a non-technical customer in one sentence?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Do one full real sign-in with Verify, then explain to your buddy in under a minute what happened behind the scenes (password checked, push sent to enrolled device, approval completes the session). That one-minute version is a building block for later identity conversations with customers."
      }
    },
    {
      "id": "task-access-outlook",
      "phaseId": "essentials",
      "title": "Access Outlook",
      "description": "Get email working — sign in, set your signature, working hours, and time zone so scheduling works properly from day one.",
      "url": "essentials/task-access-outlook.html",
      "learn": [
        {
          "id": "p1",
          "title": "More than an inbox",
          "body": "<p>Outlook is also the team's scheduling backbone — your calendar's free/busy status is what teammates see in the Scheduling Assistant (covered properly in Phase 1's Team Schedule task). Getting your working hours and time zone right now means nobody books you at 7am by accident.</p>"
        },
        {
          "id": "p2",
          "title": "First-day setup that pays off",
          "body": "<p>Three settings matter most: a professional <b>signature</b> (name, role, team), your <b>working hours and time zone</b> (Settings → Calendar), and <b>calendar sharing defaults</b> so teammates can see your free/busy. Accept every recurring team invite you receive so your calendar reflects reality.</p>\n<!-- PLACEHOLDER: link internal signature template / branding guidance if one exists -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Sign in to Outlook (desktop and/or web) with your IBM id.",
          "Set your signature with name, role, and team.",
          "Set working hours and confirm your time zone is correct.",
          "Send a test email to your buddy and confirm your calendar shows free/busy to teammates."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Setting working hours and time zone matters because…",
            "options": [
              "Teammates use your free/busy in Scheduling Assistant to book you",
              "It changes your salary band",
              "Email won't send without it",
              "It's required for VPN"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "By default, teammates checking your calendar typically see…",
            "options": [
              "Free/busy availability, with detail depending on permissions",
              "The full text of all your meetings, always",
              "Nothing, ever",
              "Only meetings you flag"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Recurring team meeting invites should be…",
            "options": [
              "Accepted so your calendar reflects your real availability",
              "Ignored until the last minute",
              "Declined to keep the calendar clean",
              "Forwarded to customers"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What does your email signature say, and why does a consistent signature matter in customer-facing work?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Send your buddy one properly formatted email (signature included) proposing your intro chat, and attach a calendar invite for a slot their free/busy shows open. This tiny loop — check availability, propose, invite — is the same motion you'll run with customers constantly."
      }
    },
    {
      "id": "task-access-slack",
      "phaseId": "essentials",
      "title": "Access Slack",
      "description": "Get into the Slack workspace with a complete profile and sane notifications — channels come in Phase 1.",
      "url": "essentials/task-access-slack.html",
      "learn": [
        {
          "id": "p1",
          "title": "Slack is where the team lives",
          "body": "<p>Fast questions, deal chatter, and team announcements all happen in Slack. This task is just about access and setup — the specific channels to join are their own Phase 1 task. A complete profile (photo, role, time zone) helps people know who's asking before they answer.</p>\n<!-- PLACEHOLDER: link workspace URL / access request instructions -->"
        },
        {
          "id": "p2",
          "title": "Etiquette that earns goodwill",
          "body": "<p>Three habits: <b>search before asking</b> (most questions have been answered), <b>use threads</b> so channels stay readable, and <b>reserve @here/@channel</b> for genuinely urgent, everyone-relevant messages. Set notification hours so pings respect your working day.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Sign in to the workspace and complete your profile: photo, role title, time zone.",
          "Set notification hours to match your working hours.",
          "Send your buddy a DM and reply to something in a thread.",
          "Try the search bar on a topic you're curious about and note what already exists."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Before asking a question in a busy channel, first…",
            "options": [
              "Search — it may already be answered",
              "Use @channel to get attention",
              "DM five people the same question",
              "Email instead"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Threads exist so that…",
            "options": [
              "Replies stay attached to the message without flooding the channel",
              "Messages disappear faster",
              "Only admins can reply",
              "Notifications increase"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "@here / @channel is appropriate when…",
            "options": [
              "The message is urgent and relevant to everyone in the channel",
              "You want any reply faster",
              "You're new and introducing yourself",
              "It's Friday"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What notification setup did you choose, and why will it survive a week of real deal traffic?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Post a short introduction in your team's main channel when your buddy confirms which one it is (that list is a Phase 1 task): who you are, your role, and one non-work fact. Watch how teammates use threads and emoji reactions — you'll absorb the house style in a day."
      }
    },
    {
      "id": "task-building-tour",
      "phaseId": "essentials",
      "title": "Building Tour",
      "description": "Learn the physical basics — badge access, your desk area, meeting rooms, printers, and emergency exits.",
      "url": "essentials/task-building-tour.html",
      "learn": [
        {
          "id": "p1",
          "title": "The practical map",
          "body": "<p>One walk-through saves weeks of small friction. The things worth locating on day one: badge-access doors and what your badge opens, your team's seating area, bookable meeting rooms (and how booking works), printers, kitchen/coffee, restrooms, and emergency exits and assembly points.</p>\n<!-- PLACEHOLDER: add site-specific details — floor, desk policy (hot desk vs assigned), room booking tool, safety officer contact -->"
        },
        {
          "id": "p2",
          "title": "If you're remote or hybrid",
          "body": "<p>If you work mostly remote, the equivalent is knowing the virtual \"building\": where meetings happen by default (Teams/Webex), how room-plus-remote hybrid meetings are run, and whom to contact for facilities or access issues when you do come in.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Walk the floor with your buddy or a teammate; find your desk area, two meeting rooms, and the printer.",
          "Test your badge on the doors you'll actually use.",
          "Locate the nearest emergency exit and the assembly point.",
          "Book a meeting room once, end to end, using the official booking method."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The single most important safety item to locate on day one is…",
            "options": [
              "The nearest emergency exit and assembly point",
              "The best coffee machine",
              "The largest monitor",
              "The quietest desk"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "If your badge doesn't open a door you need, you should…",
            "options": [
              "Report it to facilities/security rather than tailgating",
              "Follow someone through and forget it",
              "Prop the door open",
              "Stop coming to the office"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Booking meeting rooms through the official method matters because…",
            "options": [
              "It prevents double-booking and lets hybrid attendees join properly",
              "It earns points",
              "Rooms are free otherwise",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Where is your assembly point, and what's one practical thing you learned on the tour that wasn't obvious?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Host your first booked meeting: reserve a room, invite your buddy, and run your 15-minute intro chat there (or the hybrid equivalent if remote). You've now exercised badge, booking, and meeting logistics in one pass."
      }
    },
    {
      "id": "task-setup-passkey",
      "phaseId": "essentials",
      "title": "Setup Passkey",
      "description": "Register a passkey for passwordless, phishing-resistant sign-in where IBM systems support it.",
      "url": "essentials/task-setup-passkey.html",
      "learn": [
        {
          "id": "p1",
          "title": "What a passkey is",
          "body": "<p>A passkey replaces a password with a cryptographic key pair: the private key stays on your device (unlocked by fingerprint, face, or device PIN) and the service holds only the public key. There's nothing to type, reuse, or steal in a database breach.</p>"
        },
        {
          "id": "p2",
          "title": "Why it resists phishing",
          "body": "<p>A passkey is bound to the real website's domain. A look-alike phishing site can't request it — the browser simply won't offer it — which kills the most common attack on passwords outright. Expect passkeys to come up in customer identity conversations too; being able to explain them plainly is a small superpower.</p>\n<!-- PLACEHOLDER: link IBM's passkey registration instructions and note which systems support it -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Register a passkey following the instructions for your IBM id (laptop biometric, phone, or security key as directed).",
          "Sign in once using the passkey instead of your password.",
          "Confirm your fallback method still works (password + Verify) in case you switch devices.",
          "Explain to your buddy in two sentences why a passkey can't be phished."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "With a passkey, the service you sign in to stores…",
            "options": [
              "Only your public key — useless to an attacker on its own",
              "Your private key",
              "Your fingerprint image",
              "Your password, encrypted"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A phishing site can't harvest your passkey because…",
            "options": [
              "The passkey is bound to the real domain, so the browser won't offer it elsewhere",
              "Phishing sites can't load JavaScript",
              "Passkeys expire hourly",
              "It can — passkeys don't help with phishing"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Your biometric (fingerprint/face) is used to…",
            "options": [
              "Unlock the private key locally on your device",
              "Get uploaded to IBM's servers",
              "Replace your username",
              "Encrypt your email"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "In one sentence each: how would you explain a passkey to a customer's CISO, and to a non-technical end user?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Use your passkey as the default sign-in for a full day. Note anywhere you were forced back to password + MFA — that map of \"what supports passkeys vs what doesn't\" mirrors what customers experience rolling out modern auth."
      }
    },
    {
      "id": "task-i9-forms",
      "phaseId": "essentials",
      "title": "i9 Forms",
      "description": "Complete Form I-9 employment eligibility verification — Section 1 on or before day one, identity documents shortly after.",
      "url": "essentials/task-i9-forms.html",
      "learn": [
        {
          "id": "p1",
          "title": "What the I-9 is",
          "body": "<p>Form I-9 verifies your identity and authorization to work in the United States — every US employee completes one. You fill in <b>Section 1</b> (personal attestation) no later than your first day of work, and present acceptable original documents so the employer can complete its section within the required window (three business days of your start date).</p>"
        },
        {
          "id": "p2",
          "title": "Documents that work",
          "body": "<p>You either present one <b>List A</b> document proving both identity and work authorization (e.g. a US passport or permanent resident card), or a combination of one <b>List B</b> identity document (e.g. driver's license) plus one <b>List C</b> work-authorization document (e.g. Social Security card or birth certificate). Originals are required — photocopies generally are not accepted.</p>\n<!-- PLACEHOLDER: link the internal HR portal / instructions for where and how IBM collects I-9 and whether remote verification applies -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Complete Section 1 in the HR system on or before your first day.",
          "Check the List A / List B+C options and gather the original documents you'll present.",
          "Follow the HR instructions for document verification (in person or remote, as directed).",
          "Confirm in the HR portal that your I-9 shows complete."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Section 1 of the I-9 must be completed…",
            "options": [
              "No later than your first day of work",
              "Within your first month",
              "Only if you're a contractor",
              "After your first paycheck"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A US passport on its own is sufficient because…",
            "options": [
              "It's a List A document proving both identity and work authorization",
              "It's a List B document",
              "Passports aren't accepted",
              "It only proves identity"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A driver's license alone is not enough because…",
            "options": [
              "It proves identity (List B) but not work authorization — you also need a List C document",
              "It's not a real ID",
              "Licenses expire",
              "It is enough"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Which document option are you using, and is anything blocking you from completing verification on time?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Complete the I-9 end to end this week. If any document is missing or expired, flag it to HR immediately rather than waiting — the three-business-day window is a legal requirement, not a guideline."
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
