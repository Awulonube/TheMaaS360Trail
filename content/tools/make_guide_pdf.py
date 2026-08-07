#!/usr/bin/env python3
"""make_guide_pdf.py — builds MaaS360-Expedition-Guide.pdf

Two parts: how the website works, and how an employee uses it.
Every diagram box is sized from measured text, and all prose flows through
ReportLab's layout engine, so text can never clip or overflow a box.

    pip install reportlab      (once)
    python3 content/tools/make_guide_pdf.py
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Flowable, Table, TableStyle, PageBreak,
                                KeepTogether, NextPageTemplate)

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
OUT = os.path.join(ROOT, "MaaS360-Expedition-Guide.pdf")

# ---------- palette (light document, navy/gold accents: prints cleanly) ----------
NAVY   = colors.HexColor("#0f1a3d")
INK    = colors.HexColor("#1c2440")
BODY   = colors.HexColor("#333a52")
DIM    = colors.HexColor("#5f6885")
GOLD   = colors.HexColor("#b3830c")
GOLDBG = colors.HexColor("#fdf5e0")
BLUE   = colors.HexColor("#2c5fb8")
BLUEBG = colors.HexColor("#eaf1fc")
GREEN  = colors.HexColor("#1f7a55")
GREENBG= colors.HexColor("#e8f6ef")
LINE   = colors.HexColor("#c9d1e4")
PAPER  = colors.HexColor("#ffffff")
SOFT   = colors.HexColor("#f5f7fc")

F  = "Helvetica"
FB = "Helvetica-Bold"

# ---------- text styles ----------
def S(name, **kw):
    base = dict(fontName=F, fontSize=10, leading=14.5, textColor=BODY,
                spaceAfter=7, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)

ST = {
 "title":   S("title",   fontName=FB, fontSize=27, leading=31, textColor=NAVY, spaceAfter=6),
 "sub":     S("sub",     fontSize=12.5, leading=17, textColor=DIM, spaceAfter=20),
 "part":    S("part",    fontName=FB, fontSize=11, leading=14, textColor=GOLD, spaceAfter=3),
 "h1":      S("h1",      fontName=FB, fontSize=18, leading=22, textColor=NAVY, spaceAfter=9),
 "h2":      S("h2",      fontName=FB, fontSize=13, leading=17, textColor=NAVY,
                          spaceBefore=13, spaceAfter=5),
 "h3":      S("h3",      fontName=FB, fontSize=10.5, leading=14, textColor=INK,
                          spaceBefore=9, spaceAfter=3),
 "body":    S("body"),
 "small":   S("small",   fontSize=9, leading=12.5, textColor=DIM),
 "bullet":  S("bullet",  leftIndent=13, bulletIndent=3, spaceAfter=4.5),
 "cellh":   S("cellh",   fontName=FB, fontSize=9, leading=12, textColor=NAVY, spaceAfter=0),
 "cell":    S("cell",    fontSize=9, leading=12.4, textColor=BODY, spaceAfter=0),
 "note":    S("note",    fontSize=9.5, leading=13.5, textColor=INK, spaceAfter=0),
 "caption": S("caption", fontSize=8.5, leading=11.5, textColor=DIM, spaceAfter=0),
}

def P(t, s="body"):  return Paragraph(t, ST[s])
def B(t):            return Paragraph(t, ST["bullet"], bulletText="•")

# ---------- page furniture ----------
PAGE_W, PAGE_H = LETTER
MARGIN = 0.82 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

def on_page(canv, doc):
    canv.saveState()
    canv.setFont(F, 8)
    canv.setFillColor(DIM)
    canv.drawString(MARGIN, 0.5 * inch, "MaaS360 Expedition — How the site works & how to use it")
    canv.drawRightString(PAGE_W - MARGIN, 0.5 * inch, "Page %d" % doc.page)
    canv.setStrokeColor(LINE); canv.setLineWidth(0.5)
    canv.line(MARGIN, 0.68 * inch, PAGE_W - MARGIN, 0.68 * inch)
    canv.restoreState()

def on_cover(canv, doc):
    canv.saveState()
    canv.setFillColor(NAVY)
    canv.rect(0, PAGE_H - 3.1 * inch, PAGE_W, 3.1 * inch, stroke=0, fill=1)
    # simple ridge motif, drawn well clear of any text
    canv.setFillColor(colors.HexColor("#1b2a55"))
    p = canv.beginPath()
    p.moveTo(0, PAGE_H - 3.1 * inch)
    pts = [(0,0.0),(90,0.62),(180,0.30),(300,0.86),(400,0.50),(520,0.98),(612,0.66)]
    for x, h in pts: p.lineTo(x, PAGE_H - 3.1 * inch + h * inch)
    p.lineTo(PAGE_W, PAGE_H - 3.1 * inch); p.close()
    canv.drawPath(p, stroke=0, fill=1)
    canv.setFillColor(GOLD); canv.circle(505, PAGE_H - 1.0 * inch, 17, stroke=0, fill=1)
    canv.restoreState()

# ---------- diagram helpers (all boxes measured, never clipped) ----------
def wrap(text, font, size, maxw):
    """Greedy word wrap that guarantees each line fits maxw."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if stringWidth(trial, font, size) <= maxw:
            cur = trial
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

class Diagram(Flowable):
    """Canvas diagram with a fixed box and a draw callback."""
    def __init__(self, width, height, fn):
        Flowable.__init__(self); self.width = width; self.height = height; self.fn = fn
    def draw(self):
        self.fn(self.canv, self.width, self.height)

def draw_box(c, x, y, w, h, title, lines, fill, stroke, tsize=9.6, lsize=8.2):
    """Box with auto-wrapped, vertically-centred text. Never overflows."""
    c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(1.1)
    c.roundRect(x, y, w, h, 6, stroke=1, fill=1)
    pad = 8
    inner = w - 2 * pad
    tl = wrap(title, FB, tsize, inner) if title else []
    bl = []
    for ln in lines:
        bl.extend(wrap(ln, F, lsize, inner))
    total = len(tl) * (tsize + 2.4) + (3 if tl and bl else 0) + len(bl) * (lsize + 2.4)
    cy = y + h / 2 + total / 2 - tsize
    c.setFillColor(stroke); c.setFont(FB, tsize)
    for ln in tl:
        c.drawCentredString(x + w / 2, cy, ln); cy -= (tsize + 2.4)
    if tl and bl: cy -= 3
    c.setFillColor(BODY); c.setFont(F, lsize)
    for ln in bl:
        c.drawCentredString(x + w / 2, cy, ln); cy -= (lsize + 2.4)

def arrow(c, x1, y1, x2, y2, col=DIM, label=None, lw=1.2):
    c.setStrokeColor(col); c.setLineWidth(lw); c.line(x1, y1, x2, y2)
    import math
    ang = math.atan2(y2 - y1, x2 - x1); L, S_ = 7, 0.42
    c.setFillColor(col)
    p = c.beginPath(); p.moveTo(x2, y2)
    p.lineTo(x2 - L * math.cos(ang - S_), y2 - L * math.sin(ang - S_))
    p.lineTo(x2 - L * math.cos(ang + S_), y2 - L * math.sin(ang + S_)); p.close()
    c.drawPath(p, stroke=0, fill=1)
    if label:
        c.setFont(F, 7.6); c.setFillColor(col)
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        for i, ln in enumerate(wrap(label, F, 7.6, 130)):
            c.drawCentredString(mx, my + 5 + (len(wrap(label, F, 7.6, 130)) - 1 - i) * 9, ln)

# ---------- the three diagrams ----------
def diagram_pieces(c, W, H):
    bw, bh = (W - 2 * 26) / 3.0, 74
    y = H - bh - 26
    draw_box(c, 0, y, bw, bh, "The website",
             ["Pages you read and click.", "Lives on GitHub Pages."], BLUEBG, BLUE)
    draw_box(c, bw + 26, y, bw, bh, "Your account",
             ["Who you are, and your", "progress, saved in the cloud."], GREENBG, GREEN)
    draw_box(c, 2 * (bw + 26), y, bw, bh, "The reminder service",
             ["Runs on a schedule and", "emails you and your manager."], GOLDBG, GOLD)
    arrow(c, bw + 6, y + bh / 2, bw + 20, y + bh / 2)
    arrow(c, 2 * bw + 32, y + bh / 2, 2 * bw + 46, y + bh / 2)
    c.setFont(F, 8.4); c.setFillColor(DIM)
    msg = ("These three work together. You only ever touch the first one — the other two "
           "run by themselves in the background.")
    yy = y - 16
    for ln in wrap(msg, F, 8.4, W):
        c.drawString(0, yy, ln); yy -= 11

def diagram_tick(c, W, H):
    n = 4
    gap = 16
    bw = (W - gap * (n - 1)) / n
    bh = 66
    y = H - bh - 30
    items = [
        ("1. You tick a step", ["on a task page"], BLUEBG, BLUE),
        ("2. Saved instantly", ["to your account"], GREENBG, GREEN),
        ("3. Manager sees it", ["on their dashboard"], SOFT, INK),
        ("4. Phase completes", ["next phase unlocks"], GOLDBG, GOLD),
    ]
    for i, (t, ls, f, s) in enumerate(items):
        x = i * (bw + gap)
        draw_box(c, x, y, bw, bh, t, ls, f, s, tsize=9.0, lsize=8.0)
        if i < n - 1:
            arrow(c, x + bw + 2, y + bh / 2, x + bw + gap - 2, y + bh / 2)
    c.setFont(F, 8.4); c.setFillColor(DIM)
    msg = "Nothing to save, submit or send. Ticking the box is the whole action."
    c.drawString(0, y - 16, msg)

def diagram_task(c, W, H):
    n = 4
    gap = 14
    bw = (W - gap * (n - 1)) / n
    bh = 96
    y = H - bh - 26
    items = [
        ("LEARN", ["Read the cards.", "Open each one to", "mark it read."], BLUEBG, BLUE),
        ("PRACTICE", ["Do the steps for", "real, ticking each", "as you go."], GREENBG, GREEN),
        ("ASSESS", ["Short quiz.", "70% to pass.", "Retake freely."], GOLDBG, GOLD),
        ("APPLY", ["A real scenario.", "Mark it done when", "you've done it."], SOFT, INK),
    ]
    for i, (t, ls, f, s) in enumerate(items):
        x = i * (bw + gap)
        draw_box(c, x, y, bw, bh, t, ls, f, s, tsize=9.6, lsize=8.2)
        if i < n - 1:
            arrow(c, x + bw + 1, y + bh / 2, x + bw + gap - 1, y + bh / 2)
    c.setFont(F, 8.4); c.setFillColor(DIM)
    c.drawString(0, y - 16, "Sections unlock in order — finish one to open the next.")

# ---------- table helper ----------
def table(rows, widths, header=True):
    data = []
    for r_i, row in enumerate(rows):
        data.append([Paragraph(cell, ST["cellh"] if (header and r_i == 0) else ST["cell"])
                     for cell in row])
    t = Table(data, colWidths=widths, hAlign="LEFT")
    style = [
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("LINEBELOW", (0,0), (-1,-2), 0.4, LINE),
        ("BOX", (0,0), (-1,-1), 0.6, LINE),
    ]
    if header:
        style += [("BACKGROUND", (0,0), (-1,0), SOFT),
                  ("LINEBELOW", (0,0), (-1,0), 0.8, LINE)]
    t.setStyle(TableStyle(style))
    return t

def callout(title, text, tint=GOLDBG, edge=GOLD):
    inner = [[Paragraph("<b>%s</b>" % title, ST["note"])], [Paragraph(text, ST["note"])]]
    t = Table(inner, colWidths=[CONTENT_W - 4], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), tint),
        ("BOX", (0,0), (-1,-1), 0.9, edge),
        ("LEFTPADDING", (0,0), (-1,-1), 11), ("RIGHTPADDING", (0,0), (-1,-1), 11),
        ("TOPPADDING", (0,0), (0,0), 9), ("BOTTOMPADDING", (0,0), (0,0), 1),
        ("TOPPADDING", (0,1), (0,1), 0), ("BOTTOMPADDING", (0,1), (-1,-1), 9),
    ]))
    return t

# ---------- build ----------
def build():
    doc = BaseDocTemplate(OUT, pagesize=LETTER,
                          leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=MARGIN, bottomMargin=0.85 * inch,
                          title="MaaS360 Expedition — Guide", author="MaaS360 Expedition")
    frame = Frame(MARGIN, 0.85 * inch, CONTENT_W, PAGE_H - MARGIN - 0.85 * inch, id="f")
    cover_frame = Frame(MARGIN, 0.85 * inch, CONTENT_W, PAGE_H - 3.5 * inch, id="c")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=on_cover),
        PageTemplate(id="main", frames=[frame], onPage=on_page),
    ])

    S_ = []
    # ============ COVER ============
    S_ += [
        Spacer(1, 26),
        P("MaaS360 Expedition", "title"),
        P("How the website works, and how to use it as a new hire.", "sub"),
        callout("Read this first",
                "Part 1 explains what the site is and how the pieces fit together — about five "
                "minutes. Part 2 walks through using it day to day, from your first sign-in to "
                "finishing the programme. If you only read one part, read Part 2.", BLUEBG, BLUE),
        Spacer(1, 16),
        table([
            ["Part", "What it covers", "Who it's for"],
            ["Part 1", "How the website works: the pieces, where your progress goes, "
                       "who can see what.", "Everyone"],
            ["Part 2", "Using the site: signing in, working through a task, unlocking phases, "
                       "reminders.", "New hires"],
        ], [0.7*inch, CONTENT_W - 2.35*inch, 1.65*inch]),
        NextPageTemplate("main"),
        PageBreak(),
    ]

    # ============ PART 1 ============
    S_ += [
        P("PART 1", "part"),
        P("How the website works", "h1"),
        P("The MaaS360 Expedition is an onboarding programme laid out as a mountain climb. "
          "It contains nine phases and 76 tasks. You work through them in order, and the site "
          "keeps track of exactly where you are.", "body"),

        P("The three pieces", "h2"),
        P("There are three moving parts. As an employee you only ever interact with the first.",
          "body"),
        Diagram(CONTENT_W, 132, diagram_pieces),
        Spacer(1, 4),

        P("What happens when you tick something", "h2"),
        P("Every checkbox you tick is saved to your account the moment you click it.",
          "body"),
        Diagram(CONTENT_W, 122, diagram_tick),
        Spacer(1, 4),

        P("Where your progress lives", "h2"),
        P("Your progress is stored against your account in the cloud, not on the computer you "
          "happen to be using. Sign in on a different machine and everything follows you — the "
          "tasks you have completed, the phases you have unlocked, and your place on the trail. "
          "There is no save button anywhere on the site, because there is nothing to save "
          "manually.", "body"),

        P("Who can see what", "h2"),
        table([
            ["", "You", "Your manager"],
            ["Your progress and quiz results", "Yes", "Yes"],
            ["Other people's progress", "No", "Yes"],
            ["Your written reflections", "Yes", "Not shown in the dashboard"],
            ["Your password", "Only you — it is never visible to anyone", "No"],
            ["Phase dates and deadlines", "View", "View and edit"],
        ], [CONTENT_W - 3.2*inch, 1.15*inch, 2.05*inch]),
        Spacer(1, 10),

        P("Reminders", "h2"),
        P("The site sends scheduled email reminders — a midweek nudge partway through each "
          "phase, an alert if a phase runs past its due date, and a note to your manager when "
          "you finish a phase. These are sent by a service that runs on a schedule in the "
          "cloud, so they arrive whether or not you have the site open. You do not need to do "
          "anything to receive them.", "body"),
        callout("Your manager can adjust your dates",
                "If you are away, or a phase realistically needs longer, your manager can move "
                "your start and due dates. The reminders follow the new dates automatically. "
                "Ask them rather than working to a deadline that no longer makes sense.",
                GOLDBG, GOLD),
        PageBreak(),
    ]

    # ============ PART 2 ============
    S_ += [
        P("PART 2", "part"),
        P("Using the site as a new hire", "h1"),
        P("This is everything you need, in the order you will need it.", "body"),

        P("Step 1 — Create your account", "h2"),
        B("Open the site link your manager sent you and choose <b>Create account</b>."),
        B("Enter your name, work email, and a password of at least eight characters. "
          "You will be asked to type the password twice — the second box confirms it matches, "
          "and shows a green tick when it does."),
        B("Add your manager's email so your progress notices reach the right person."),
        B("If a confirmation email arrives, click the link in it, then sign in."),
        Spacer(1, 3),
        P("From then on you just sign in. Your progress is tied to this account, so use the "
          "same one every time.", "small"),

        P("Step 2 — The Trailhead", "h2"),
        P("Signing in brings you to the Trailhead: the map of all nine phases. Each card shows "
          "the phase name, how far through it you are, and whether it is open or still locked. "
          "Phases unlock one at a time — finish the one you are on and the next opens. Locked "
          "phases cannot be opened early, and that is deliberate: each phase builds on the one "
          "before it.", "body"),
        P("The sidebar on the left is always available. It shows every phase, your overall "
          "progress, <b>My Timeline</b> (your dates), and the <b>Gear Room</b> (links and "
          "tools).", "body"),

        P("Step 3 — Working through a task", "h2"),
        P("Open a phase and you will see its task cards. Each task has four sections, and they "
          "unlock in order.", "body"),
        Diagram(CONTENT_W, 138, diagram_task),
        Spacer(1, 6),
        P("Learn", "h3"),
        P("Short explanatory cards. Open each one — opening it marks it read, and the section "
          "completes when you have opened them all.", "body"),
        P("Practice", "h3"),
        P("A checklist of things to actually do: open a portal, run a command, ask your buddy "
          "something. Do them for real, then tick each one. Some tasks also embed a video or a "
          "walkthrough here.", "body"),
        P("Assess", "h3"),
        P("A short quiz. You need 70% to pass, and you can retake it as many times as you "
          "like — it is there to check your understanding, not to catch you out. Some questions "
          "ask for a written reflection instead; those are for your own thinking and are not "
          "marked.", "body"),
        P("Apply", "h3"),
        P("A realistic scenario that puts the task to work. Do it, then mark it complete. This "
          "is the part that makes the knowledge stick, so it is worth not rushing.", "body"),
        PageBreak(),

        P("Step 4 — Finishing a phase", "h2"),
        P("When every task in a phase is complete, three things happen automatically: the phase "
          "shows as complete on the Trailhead, the next phase unlocks, and your manager is "
          "emailed to let them know. There is nothing to submit.", "body"),

        P("Step 5 — Keeping to the schedule", "h2"),
        P("Each phase is normally allotted about a week. You can see your own dates any time "
          "under <b>My Timeline</b> in the sidebar: when each phase started, its midweek "
          "check-in, and when it is due.", "body"),
        table([
            ["What you will receive", "When"],
            ["A midweek check-in reminder", "Partway through each phase"],
            ["An overdue notice", "If a phase passes its due date unfinished"],
            ["(Your manager) a completion notice", "Each time you finish a phase"],
        ], [CONTENT_W - 2.5*inch, 2.5*inch]),
        Spacer(1, 10),

        KeepTogether([P("Step 6 — If something goes wrong", "h2"), table([
            ["Situation", "What to do"],
            ["You cannot sign in", "Use the same email you registered with. If a confirmation "
             "email never arrived, check spam, then ask your manager to re-send it."],
            ["Your progress looks empty", "Check you are signed in — your name appears at the "
             "bottom of the sidebar. Progress is tied to your account, not the browser."],
            ["A phase is locked and you need it", "Finish the phase before it. If you genuinely "
             "need to work out of order, ask your manager."],
            ["You are behind schedule", "Tell your manager early. They can move your dates, and "
             "the reminders adjust automatically."],
            ["Something on a page looks wrong", "Refresh the page first. If it persists, tell "
             "your manager so it can be fixed for everyone."],
        ], [1.9*inch, CONTENT_W - 1.9*inch])]),
        Spacer(1, 12),

        callout("The one habit that matters",
                "Tick things as you actually do them, not in a batch at the end of the week. "
                "The site's reminders, your manager's view of your progress, and your own sense "
                "of pace all depend on it being honest and current.", GREENBG, GREEN),
        Spacer(1, 14),

        KeepTogether([
            P("Quick reference", "h2"),
            table([
                ["Where", "What it is for"],
                ["Trailhead (home)", "The map of all nine phases and your overall progress."],
                ["A phase page", "The task cards for that phase."],
                ["A task page", "Learn, Practice, Assess and Apply for one topic."],
                ["My Timeline", "Your phase dates: started, midweek check-in, due."],
                ["Gear Room", "Links, tools and reference material."],
                ["Sidebar footer", "Who you are signed in as, and sign out."],
            ], [1.9*inch, CONTENT_W - 1.9*inch]),
        ]),
    ]

    doc.build(S_)
    print("wrote", os.path.abspath(OUT))

if __name__ == "__main__":
    build()
