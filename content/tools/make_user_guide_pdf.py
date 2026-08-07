#!/usr/bin/env python3
"""make_user_guide_pdf.py — builds MaaS360-Expedition-Guide-Employees.pdf

The new-hire guide: signing in, working through tasks, phases and reminders.

All prose flows through ReportLab's layout engine and every diagram box is
sized from measured text, so nothing can clip or overflow.

    pip install reportlab      (once)
    python3 content/tools/make_user_guide_pdf.py
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
                                KeepTogether)

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
OUT = os.path.join(ROOT, "MaaS360-Expedition-Guide-Employees.pdf")

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
SOFT   = colors.HexColor("#f5f7fc")
CODEBG = colors.HexColor("#f2f4f9")

F, FB, FM = "Helvetica", "Helvetica-Bold", "Courier"

def S(name, **kw):
    base = dict(fontName=F, fontSize=9.8, leading=13.6, textColor=BODY,
                spaceAfter=6, alignment=TA_LEFT)
    base.update(kw); return ParagraphStyle(name, **base)

ST = {
 "h1":     S("h1",     fontName=FB, fontSize=16, leading=20, textColor=NAVY, spaceAfter=3),
 "kick":   S("kick",   fontName=FB, fontSize=9.5, leading=12, textColor=GOLD, spaceAfter=2),
 "h2":     S("h2",     fontName=FB, fontSize=12, leading=15.5, textColor=NAVY,
                        spaceBefore=11, spaceAfter=4),
 "h3":     S("h3",     fontName=FB, fontSize=10, leading=13, textColor=INK,
                        spaceBefore=7, spaceAfter=2),
 "body":   S("body"),
 "small":  S("small",  fontSize=8.8, leading=12, textColor=DIM),
 "bullet": S("bullet", leftIndent=12, bulletIndent=2, spaceAfter=3.5),
 "cellh":  S("cellh",  fontName=FB, fontSize=8.8, leading=11.6, textColor=NAVY, spaceAfter=0),
 "cell":   S("cell",   fontSize=8.8, leading=11.8, textColor=BODY, spaceAfter=0),
 "note":   S("note",   fontSize=9.2, leading=12.8, textColor=INK, spaceAfter=0),
 "code":   S("code",   fontName=FM, fontSize=8.6, leading=12, textColor=NAVY, spaceAfter=0),
}
def P(t, s="body"): return Paragraph(t, ST[s])
def B(t):           return Paragraph(t, ST["bullet"], bulletText="•")
def N(i, t):        return Paragraph(t, ST["bullet"], bulletText="%d." % i)

PAGE_W, PAGE_H = LETTER
MARGIN = 0.78 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

def on_page(canv, doc):
    canv.saveState()
    canv.setFont(F, 7.8); canv.setFillColor(DIM)
    canv.drawString(MARGIN, 0.46 * inch, "MaaS360 Expedition — Guide for New Hires")
    canv.drawRightString(PAGE_W - MARGIN, 0.46 * inch, "Page %d" % doc.page)
    canv.setStrokeColor(LINE); canv.setLineWidth(0.5)
    canv.line(MARGIN, 0.62 * inch, PAGE_W - MARGIN, 0.62 * inch)
    canv.restoreState()

# ---------- helpers ----------
def wrap(text, font, size, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if stringWidth(t, font, size) <= maxw: cur = t
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

class Diagram(Flowable):
    def __init__(self, width, height, fn):
        Flowable.__init__(self); self.width = width; self.height = height; self.fn = fn
    def draw(self): self.fn(self.canv, self.width, self.height)

def draw_box(c, x, y, w, h, title, lines, fill, stroke, tsize=9.4, lsize=8.0):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(1.1)
    c.roundRect(x, y, w, h, 6, stroke=1, fill=1)
    pad = 7; inner = w - 2 * pad
    tl = wrap(title, FB, tsize, inner) if title else []
    bl = []
    for ln in lines: bl.extend(wrap(ln, F, lsize, inner))
    total = len(tl)*(tsize+2.3) + (3 if tl and bl else 0) + len(bl)*(lsize+2.3)
    cy = y + h/2 + total/2 - tsize
    c.setFillColor(stroke); c.setFont(FB, tsize)
    for ln in tl: c.drawCentredString(x+w/2, cy, ln); cy -= (tsize+2.3)
    if tl and bl: cy -= 3
    c.setFillColor(BODY); c.setFont(F, lsize)
    for ln in bl: c.drawCentredString(x+w/2, cy, ln); cy -= (lsize+2.3)

def arrow(c, x1, y1, x2, y2, col=DIM):
    import math
    c.setStrokeColor(col); c.setLineWidth(1.2); c.line(x1, y1, x2, y2)
    a = math.atan2(y2-y1, x2-x1); L, S_ = 6.5, 0.42
    c.setFillColor(col); p = c.beginPath(); p.moveTo(x2, y2)
    p.lineTo(x2-L*math.cos(a-S_), y2-L*math.sin(a-S_))
    p.lineTo(x2-L*math.cos(a+S_), y2-L*math.sin(a+S_)); p.close()
    c.drawPath(p, stroke=0, fill=1)

def diagram_task(c, W, H):
    n, gap = 4, 12
    bw = (W - gap*(n-1))/n; bh = 88; y = H - bh - 4
    items = [("LEARN",   ["Read the cards.","Open each to","mark it read."], BLUEBG, BLUE),
             ("PRACTICE",["Do the steps for","real, ticking","each as you go."], GREENBG, GREEN),
             ("ASSESS",  ["Short quiz.","70% to pass.","Retake freely."], GOLDBG, GOLD),
             ("APPLY",   ["A real scenario.","Mark done when","you've done it."], SOFT, INK)]
    for i,(t,ls,f,s) in enumerate(items):
        x = i*(bw+gap); draw_box(c, x, y, bw, bh, t, ls, f, s)
        if i < n-1: arrow(c, x+bw+1, y+bh/2, x+bw+gap-1, y+bh/2)

def table(rows, widths, header=True):
    data = [[Paragraph(cell, ST["cellh"] if (header and r==0) else ST["cell"]) for cell in row]
            for r, row in enumerate(rows)]
    t = Table(data, colWidths=widths, hAlign="LEFT")
    st = [("VALIGN",(0,0),(-1,-1),"TOP"),
          ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
          ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
          ("LINEBELOW",(0,0),(-1,-2),0.4,LINE),("BOX",(0,0),(-1,-1),0.6,LINE)]
    if header: st += [("BACKGROUND",(0,0),(-1,0),SOFT),("LINEBELOW",(0,0),(-1,0),0.8,LINE)]
    t.setStyle(TableStyle(st)); return t

def callout(title, text, tint=GOLDBG, edge=GOLD):
    t = Table([[Paragraph("<b>%s</b>" % title, ST["note"])],
               [Paragraph(text, ST["note"])]], colWidths=[CONTENT_W-4], hAlign="LEFT")
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),tint),("BOX",(0,0),(-1,-1),0.9,edge),
        ("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10),
        ("TOPPADDING",(0,0),(0,0),8),("BOTTOMPADDING",(0,0),(0,0),1),
        ("TOPPADDING",(0,1),(0,1),0),("BOTTOMPADDING",(0,1),(-1,-1),8)]))
    return t

def code(text):
    t = Table([[Paragraph(text, ST["code"])]], colWidths=[CONTENT_W-4], hAlign="LEFT")
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),CODEBG),("BOX",(0,0),(-1,-1),0.6,LINE),
        ("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10),
        ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8)]))
    return t

def section_header(kicker, title, blurb, tint, edge):
    """Compact banner — replaces a mostly-blank cover page."""
    inner = [[Paragraph(kicker, ST["kick"])],
             [Paragraph(title, ST["h1"])],
             [Paragraph(blurb, ST["note"])]]
    t = Table(inner, colWidths=[CONTENT_W-4], hAlign="LEFT")
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),tint),
        ("LINEABOVE",(0,0),(-1,0),2.4,edge),("BOX",(0,0),(-1,-1),0.6,LINE),
        ("LEFTPADDING",(0,0),(-1,-1),13),("RIGHTPADDING",(0,0),(-1,-1),13),
        ("TOPPADDING",(0,0),(0,0),11),("BOTTOMPADDING",(0,0),(0,0),0),
        ("TOPPADDING",(0,1),(0,1),0),("BOTTOMPADDING",(0,1),(0,1),2),
        ("TOPPADDING",(0,2),(0,2),0),("BOTTOMPADDING",(0,2),(-1,-1),12)]))
    return t

# ---------- build ----------
def build():
    doc = BaseDocTemplate(OUT, pagesize=LETTER, leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=MARGIN, bottomMargin=0.78*inch,
                          title="MaaS360 Expedition — Guide for New Hires", author="MaaS360 Expedition")
    doc.addPageTemplates([PageTemplate(id="main",
        frames=[Frame(MARGIN, 0.78*inch, CONTENT_W, PAGE_H-MARGIN-0.78*inch, id="f")],
        onPage=on_page)])
    s = []

    s += [
      section_header("GUIDE FOR NEW HIRES", "Using the Expedition",
        "Everything you need, in the order you will need it. The site is a nine-phase "
        "onboarding programme; you work through it in order and it remembers exactly "
        "where you are.", BLUEBG, BLUE),
      Spacer(1, 12),

      P("1. Create your account", "h2"),
      N(1, "Open the site link your manager sent you and choose <b>Create account</b>."),
      N(2, "Enter your name, work email, and a password of at least eight characters. "
           "You type it twice — the second box shows a green tick when they match."),
      N(3, "Add your manager's email so your progress notices reach the right person."),
      N(4, "If a confirmation email arrives, click the link, then sign in."),
      P("Use the same account every time — your progress is tied to it, not to the computer "
        "you are on, so it follows you between machines.", "small"),

      P("2. The Trailhead", "h2"),
      P("Signing in brings you to the map of all nine phases. Each card shows how far through "
        "you are and whether it is open or locked. Phases unlock one at a time: finish the one "
        "you are on and the next opens. Locked phases cannot be opened early — each builds on "
        "the one before it.", "body"),
      P("The sidebar is always there: every phase, your overall progress, <b>My Timeline</b> "
        "(your dates) and the <b>Gear Room</b> (links and tools).", "body"),

      P("3. Working through a task", "h2"),
      P("Open a phase to see its task cards. Every task has the same four sections, and they "
        "unlock in order.", "body"),
      Diagram(CONTENT_W, 96, diagram_task),
      Spacer(1, 8),
      table([
        ["Section", "What you do"],
        ["Learn", "Open each explanatory card. Opening it marks it read; the section completes "
                  "when you have opened them all."],
        ["Practice", "A checklist of things to actually do — open a portal, run a command, ask "
                     "your buddy. Do them for real, then tick each one. Some tasks embed a video "
                     "or walkthrough here."],
        ["Assess", "A short quiz; 70% passes and you can retake it as often as you like. Some "
                   "questions ask for a written reflection instead — those are for your own "
                   "thinking and are not marked."],
        ["Apply", "A realistic scenario that puts the task to work. Do it, then mark it "
                  "complete. This is the part that makes it stick."],
      ], [0.78*inch, CONTENT_W-0.78*inch]),

      P("4. Finishing a phase, and your schedule", "h2"),
      P("When every task in a phase is done, the phase shows complete, the next unlocks, and "
        "your manager is emailed automatically. Nothing to submit. Each phase is normally "
        "allotted about a week; see your own dates under <b>My Timeline</b>.", "body"),
      table([
        ["You will receive", "When"],
        ["A midweek check-in reminder", "Partway through each phase"],
        ["An overdue notice", "If a phase passes its due date unfinished"],
        ["(Your manager) a completion notice", "Each time you finish a phase"],
      ], [CONTENT_W-2.3*inch, 2.3*inch]),
      Spacer(1, 9),

      KeepTogether([
        P("5. If something goes wrong", "h2"),
        table([
          ["Situation", "What to do"],
          ["You cannot sign in", "Use the email you registered with. If the confirmation email "
           "never arrived, check spam, then ask your manager to re-send it."],
          ["Your progress looks empty", "Check you are signed in — your name shows at the "
           "bottom of the sidebar. Progress follows the account, not the browser."],
          ["A phase is locked and you need it", "Finish the phase before it, or ask your "
           "manager if you genuinely need to work out of order."],
          ["You are behind schedule", "Tell your manager early — they can move your dates and "
           "the reminders adjust automatically."],
        ], [1.75*inch, CONTENT_W-1.75*inch]),
      ]),
      Spacer(1, 10),
      callout("The one habit that matters",
              "Tick things as you actually do them, not in a batch at the end of the week. The "
              "reminders, your manager's view, and your own sense of pace all depend on it "
              "being current.", GREENBG, GREEN),
      Spacer(1, 12),
      KeepTogether([
        P("Quick reference — where things are", "h2"),
        table([
          ["Where", "What it is for"],
          ["Trailhead (home)", "The map of all nine phases and your overall progress."],
          ["A phase page", "The task cards for that phase."],
          ["A task page", "Learn, Practice, Assess and Apply for one topic."],
          ["My Timeline", "Your phase dates: started, midweek check-in, due."],
          ["Gear Room", "Links, tools and reference material."],
          ["Sidebar footer", "Who you are signed in as, and the sign-out link."],
        ], [1.55*inch, CONTENT_W-1.55*inch]),
      ]),
    ]


    doc.build(s)
    print("wrote", os.path.abspath(OUT))

if __name__ == "__main__":
    build()
