/* Phase 6: Summit — generated from content/phase6.md by content/tools/build.js. */
/* Edit content/phase6.md, then run: node content/tools/build.js */
/* IBM Docs reference: https://www.ibm.com/docs/en/maas360 */
window.PHASE6_DATA = {
  "id": "phase6",
  "title": "Phase 6: Summit",
  "subtitle": "Live scenarios — lead real demos, onboardings, and POCs.",
  "icon": "🏅",
  "tasks": [
    {
      "id": "task-role-play-demo",
      "phaseId": "phase6",
      "title": "Role Play Demo",
      "description": "Maintenance rep under maximum difficulty — the hardest personas the team can throw, before your solo phase.",
      "url": "phase6/task-role-play-demo.html",
      "learn": [
        {
          "id": "p1",
          "title": "Why keep role-playing when demos are live",
          "body": "<p>Live customers are usually politer than the worst case — which means live reps alone under-train you for the evaluator who's hostile, the CISO who interrogates, or the admin who knows a competitor's console better than you know yours. Phase 6 role plays exist to keep the ceiling rising while real reps build the floor.</p>"
        },
        {
          "id": "p2",
          "title": "The maximum-difficulty personas",
          "body": "<p>Ask two different teammates (not your usual buddy — new styles matter) to each run one: <b>the hostile evaluator</b> (interrupts, disputes claims, demands proof of everything) and <b>the competitor expert</b> (\"Intune does this natively — why are you better?\"). The competitive handling rule: never disparage, always redirect to demonstrated depth — \"let me show you how we handle that exact case\" beats any comparison chart.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Recruit two teammates and brief the personas; schedule both sessions.",
          "Run demo one against the hostile evaluator; hold composure and structure.",
          "Run demo two against the competitor expert; practice acknowledge-and-demonstrate, never disparage.",
          "Debrief both: collect one \"you should steal this\" from each teammate's own repertoire."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Role plays continue in Phase 6 because…",
            "options": [
              "Live customers under-train the worst case; role plays keep raising the ceiling",
              "Managers require ritual",
              "Live demos don't count",
              "They're easier"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"Competitor X does this natively\" gets…",
            "options": [
              "Acknowledge, then demonstrate your depth on that exact case — never disparagement",
              "A list of competitor flaws",
              "Agreement and a subject change",
              "Panic"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Using different teammates as personas matters because…",
            "options": [
              "New styles stress different weaknesses than your usual partner",
              "Your buddy is tired",
              "It spreads the workload",
              "It doesn't"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What did the hostile evaluator break that real customers hadn't yet, and what's your fix?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "After both sessions, update your demo script and handling repertoire with what the maximum-difficulty reps exposed. File the two stolen moves. These upgrades ride into every live session from here on."
      }
    },
    {
      "id": "task-mock-onboarding",
      "phaseId": "phase6",
      "title": "Mock Onboarding",
      "description": "Final onboarding rehearsal — full session, hardest complications, run exactly as you'll run the two live ones this phase.",
      "url": "phase6/task-mock-onboarding.html",
      "learn": [
        {
          "id": "p1",
          "title": "The dress rehearsal",
          "body": "<p>This phase you lead two real onboardings; this mock is their dress rehearsal, run under performance conditions: full 60-minute structure, the complications page live (existing MDM, blocked plumbing, why-questions), and a session that must end with written next steps regardless of what breaks. Treat scheduling, pre-checks, and follow-up exactly as you will with the real customer — the rehearsal includes the logistics, not just the meeting.</p>"
        },
        {
          "id": "p2",
          "title": "The self-check that matters",
          "body": "<p>After the mock, grade yourself against the live bar: Did the customer admin drive their console most of the session? Did the first-device moment land? Were blocked items converted to owned next steps? Would a real admin leave this session confident rather than overwhelmed? Your mentor grades the same four; compare notes.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Schedule the mock with full logistics: invite, agenda in advance, pre-check ritual, demo environment ready.",
          "Have your mentor pick the persona and complications without telling you in advance.",
          "Run the full session under performance conditions.",
          "Grade yourself on the four-point bar; compare with your mentor's grades."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "This mock includes real logistics because…",
            "options": [
              "The live sessions' failure modes include scheduling, prep, and follow-up — not just the meeting",
              "Calendars need testing",
              "It fills the phase",
              "Logistics are graded separately"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Complications arrive unannounced because…",
            "options": [
              "Real onboardings don't send warnings",
              "Mentors enjoy surprises",
              "The runbook forbids preparation",
              "They don't"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The session-end invariant, no matter what broke, is…",
            "options": [
              "Written, owned next steps and a customer who knows what happens next",
              "A completed plumbing setup",
              "An apology",
              "A reschedule"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Where did your grade and your mentor's grade differ, and what does that gap tell you?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Close the gap the grading exposed, then confirm with your manager which two live onboardings you're taking this phase (the Lead 2 Onboarding task). The rehearsal is over when the real invites are on your calendar."
      }
    },
    {
      "id": "task-mock-poc-2",
      "phaseId": "phase6",
      "title": "Mock POC 2",
      "description": "Second full POC cycle — messier customer, mid-course scope pressure, and a competitive shadow.",
      "url": "phase6/task-mock-poc-2.html",
      "learn": [
        {
          "id": "p1",
          "title": "What changes from Mock POC 1",
          "body": "<p>Same lifecycle, three new stressors. <b>Scope pressure</b>: mid-POC, the customer asks to add criteria (\"can we also test our old Windows tablets?\") — practice the trade: add it and extend, swap it for something, or park it for the rollout, but never silently absorb scope. <b>Competitive shadow</b>: the customer is running a parallel evaluation of a competitor — your check-ins must reinforce differentiated value without ever attacking. <b>Ambiguous results</b>: one criterion half-passes (works, but clunky for their workflow) — practice honest framing: what's true today, what the path is, and letting the customer weigh it.</p>"
        },
        {
          "id": "p2",
          "title": "The discipline being trained",
          "body": "<p>All three stressors attack the same muscle: keeping the POC an <em>evidence-generating machine</em> rather than a drifting feature tour. The written criteria are your anchor in every conversation — additions renegotiate the writing, competitors are answered by evidence against criteria, and ambiguity is documented truthfully in the close.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Have your mentor run the customer with all three stressors scripted secretly.",
          "Run the full cycle: kickoff, criteria, setup, check-ins, close.",
          "Handle the scope request with an explicit trade conversation, in writing.",
          "Write the close document including the honest half-pass framing.",
          "Retro against Mock POC 1: what process marks improved, what's still soft?"
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Mid-POC scope additions are…",
            "options": [
              "Renegotiated explicitly — add-and-extend, swap, or park; never silently absorbed",
              "Always accepted",
              "Always refused",
              "Ignored"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Against a parallel competitor evaluation, your instrument is…",
            "options": [
              "Evidence against the written criteria — demonstrated, not claimed",
              "Competitor disparagement",
              "A discount",
              "Speed"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "A half-passing criterion goes in the close as…",
            "options": [
              "The honest truth: what works, what's clunky, what the path is",
              "A pass",
              "A fail",
              "Omitted"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Write the exact two sentences you used (or would use) to renegotiate the scope addition."
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Deliver the close to your mentor as if the customer's decision committee were in the room, ambiguity included. Sign-off here means Mock POC 3 (Phase 7) is run as a formality check — the process should now be yours."
      }
    },
    {
      "id": "task-lead-demo",
      "phaseId": "phase6",
      "title": "Lead Demo",
      "description": "Lead live customer demos with a thinner net — mentor present but silent unless invited.",
      "url": "phase6/task-lead-demo.html",
      "learn": [
        {
          "id": "p1",
          "title": "The thinner net",
          "body": "<p>Phase 5's first lead demo had an active net. This phase the protocol changes: your mentor attends but stays silent unless you explicitly invite them — no unprompted saves short of factual error with deal risk. You own the briefing with the AE, the pre-checks, the delivery, the Q&A, and the follow-up notes into the CRM. The training-wheel torque is nearly zero; what remains is the habit of a second set of eyes and the debrief.</p>"
        },
        {
          "id": "p2",
          "title": "Volume with reflection",
          "body": "<p>Aim for more than one this phase — reps are the point now. After each: the 24-hour debrief shrinks to fifteen focused minutes (one thing that landed, one to fix, net moments if any), plus your CRM notes filed same-day. The demos should start feeling different from each other — customer-shaped rather than script-shaped. That differentiation is the skill maturing.</p>\n<!-- PLACEHOLDER: confirm expected demo count for Phase 6 sign-off. -->"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Take at least two live demos this phase with the silent-net protocol agreed.",
          "Own the full cycle each time: AE briefing, tailoring, pre-checks, delivery, Q&A, CRM notes same-day.",
          "Hold the 15-minute debrief after each.",
          "Track one metric across demos: unprompted mentor interventions (target: zero)."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The Phase 6 net protocol is…",
            "options": [
              "Mentor present and silent unless invited (or factual error with deal risk)",
              "Mentor co-presents",
              "No mentor at all",
              "Mentor runs Q&A"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "CRM notes are filed…",
            "options": [
              "Same-day — the account team works off them",
              "Eventually",
              "Only for wins",
              "By the AE"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Demos becoming customer-shaped rather than script-shaped signals…",
            "options": [
              "The skill maturing — tailoring is now instinct",
              "Loss of discipline",
              "A broken script",
              "Overconfidence"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "Across your demos this phase: what changed between the first and the last, and what does your mentor say changed?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Complete your demos with zero unprompted interventions, then ask your mentor the Phase 7 question directly: \"would you send me alone next time?\" Their unqualified yes is this task's real completion state."
      }
    },
    {
      "id": "task-lead-2-onboarding",
      "phaseId": "phase6",
      "title": "Lead 2 Onboarding",
      "description": "Lead two real customer onboarding sessions end to end — the rehearsed runbook meeting real admins.",
      "url": "phase6/task-lead-2-onboarding.html",
      "learn": [
        {
          "id": "p1",
          "title": "The real thing, twice",
          "body": "<p>Two live onboardings, you leading: real customer admins, real plumbing (their actual Apple ID, their actual directory), real complications. Everything rehearsed applies — the 60-minute structure, admins driving their own console, blocked items becoming owned next steps — but now the confusion is genuine and the stakes are a customer's first impression of life with MaaS360. Your mentor attends the first with the silent-net protocol; the second, per their judgment.</p>"
        },
        {
          "id": "p2",
          "title": "Between the two sessions",
          "body": "<p>Treat session one as data for session two: within 24 hours, note where the real admin diverged from every persona you practiced (they will), update the runbook, and adjust. Real admins ask logistics questions mocks under-produce (\"who do we call when this breaks at 2am?\") — have the support-path answer (Phase 2's Support vs BTS boundary) ready and crisp.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Get your two assigned onboardings from your manager; read each account's history first.",
          "Run session one with the silent net; file follow-up notes and next steps same-day.",
          "Update the runbook within 24 hours from real-admin data.",
          "Run session two; compare how the update performed.",
          "Collect one piece of direct feedback from each customer admin."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "Real onboardings differ from mocks most in…",
            "options": [
              "Genuine confusion, real plumbing custody, and unscripted logistics questions",
              "Length",
              "The console used",
              "Nothing"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "\"Who do we call at 2am?\" is answered from…",
            "options": [
              "The Support vs BTS boundary — the real support path, crisply",
              "Your personal phone number",
              "\"Good question\"",
              "The AE's number"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The between-sessions update exists because…",
            "options": [
              "Session one is field data; session two should benefit from it immediately",
              "Runbooks expire",
              "It's tradition",
              "Session two is identical"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What did a real admin do that no persona predicted, and how did you handle it live?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "After both sessions: send each customer a written summary (done, next, who to contact), and present your manager the two-session story — what the runbook survived, what it gained. Two real customers now run because you set them running."
      }
    },
    {
      "id": "task-phase6-check",
      "phaseId": "phase6",
      "title": "Phase 6 Check",
      "description": "The summit review — live demos and onboardings delivered with minimal support; the case for near-solo Phase 7.",
      "url": "phase6/task-phase6-check.html",
      "learn": [
        {
          "id": "p1",
          "title": "What this check certifies",
          "body": "<p>Phase 6 was the summit: real demos with a silent net, two real onboardings, and a POC cycle under pressure stressors. This check certifies the shift from \"can perform with support\" to \"performs, support optional.\" The evidence is concrete: intervention counts, customer feedback, same-day CRM hygiene, and the runbook's field revisions.</p>"
        },
        {
          "id": "p2",
          "title": "The forward conversation",
          "body": "<p>Phase 7 is near-solo: solo onboarding volume, reverse shadowing (you run everything, someone watches), seller syncs you drive. The check conversation should end with explicit scope: which session types you now run alone, which keep an observer, and the specific triggers that would bring support back into a call.</p>"
        }
      ],
      "practice": {
        "iframePlaceholder": true,
        "steps": [
          "Compile the Phase 6 evidence: demo count and intervention metric, onboarding summaries, customer feedback quotes, Mock POC 2 close doc.",
          "Write your own solo-scope proposal: alone / observed / supported, by session type.",
          "Book the review; walk the evidence, then negotiate the scope.",
          "Confirm your Phase 7 volume targets with your manager."
        ]
      },
      "assess": {
        "questions": [
          {
            "type": "mc",
            "question": "The Phase 6 → 7 shift is…",
            "options": [
              "From performing with support to performing with support optional",
              "From learning to reading",
              "From customers to mocks",
              "Cosmetic"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "Evidence beats self-assessment here because…",
            "options": [
              "Intervention counts, feedback, and field artifacts are checkable claims",
              "Feelings are forbidden",
              "Managers distrust everyone",
              "It's faster"
            ],
            "correct": 0
          },
          {
            "type": "mc",
            "question": "The solo-scope agreement includes…",
            "options": [
              "What you run alone, what keeps an observer, and the triggers that bring support back",
              "A blanket \"solo everything\"",
              "Only a date",
              "Secret conditions"
            ],
            "correct": 0
          },
          {
            "type": "text",
            "question": "What's your proposed solo scope, and which single session type do you most want one more observed rep on?"
          }
        ]
      },
      "apply": {
        "isRealScenario": false,
        "scenario": "Hold the review, agree the scope, set the Phase 7 targets. Then take a breath and look down the mountain — from Basecamp to here is the whole distance. Phase 7 is proving you can guide others up."
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
