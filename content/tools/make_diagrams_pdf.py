#!/usr/bin/env python3
"""make_diagrams_pdf.py — regenerates MAINTENANCE-DIAGRAMS.pdf from the
diagrams in maintenance.html. Run after editing the HTML diagrams:

    pip install cairosvg pypdf   (once)
    python3 content/tools/make_diagrams_pdf.py
"""
import re, io, os, sys
import cairosvg
from pypdf import PdfReader, PdfWriter

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
SRC = os.path.join(ROOT, "maintenance.html")
OUT = os.path.join(ROOT, "MAINTENANCE-DIAGRAMS.pdf")

html = io.open(SRC, encoding="utf-8").read()
sections = re.findall(r'<h2>(.*?)</h2>\s*<p class="note">(.*?)</p>\s*<div class="fig">\s*(<svg.*?</svg>)', html, re.S)
if len(sections) < 5:
    sys.exit("expected 5+ diagram sections, found %d — check maintenance.html structure" % len(sections))

EMOJI = re.compile("[\U0001F000-\U0001FAFF☀-➿️⬀-⯿\U0001F1E6-\U0001F1FF]+")
clean = lambda s: re.sub(r"\s{2,}", " ", EMOJI.sub("", s)).strip()
strip_tags = lambda s: re.sub(r"<[^>]+>", "", s)

def wrap(text, width=110):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > width: lines.append(cur); cur = w
        else: cur = (cur + " " + w).strip()
    if cur: lines.append(cur)
    return lines[:3]

def marker(mid, color):
    return ('<marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
            'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="%s"/></marker>' % (mid, color))
DEFS = "<defs>" + "".join([marker("a","#6aa0ff"), marker("ag","#34d399"), marker("ay","#fbbf24"),
    marker("b","#9aa6d4"), marker("c","#6aa0ff"), marker("d","#fbbf24"), marker("e","#9aa6d4")]) + "</defs>"

pages = []
for i, (title, note, svg) in enumerate(sections):
    title, note = clean(strip_tags(title)), clean(strip_tags(note))
    m = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg)
    w, h = int(m.group(1)), int(m.group(2))
    body = re.sub(r"<defs>.*?</defs>", "", EMOJI.sub("", svg), flags=re.S)
    body = body.split(">", 1)[1][: -len("</svg>")]
    notes = "".join('<text x="40" y="%d" font-size="12.5" fill="#9aa6d4">%s</text>' % (56 + n * 17, ln)
                    for n, ln in enumerate(wrap(note)))
    composed = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" font-family="Helvetica, Arial, sans-serif">'
                '%s<rect width="%d" height="%d" fill="#0a1130"/>'
                '<text x="40" y="34" font-size="19" font-weight="bold" fill="#fbbf24">%s</text>%s'
                '<g transform="translate(0,92)">%s</g></svg>'
                % (w, h + 112, DEFS, w, h + 112, title, notes, body))
    out = "/tmp/diag_%d.pdf" % i
    cairosvg.svg2pdf(bytestring=composed.encode(), write_to=out, output_width=w * 1.2)
    pages.append(out)
    print("rendered:", title[:60])

title_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" font-family="Helvetica, Arial, sans-serif">
<rect width="900" height="520" fill="#0a1130"/>
<polygon points="0,520 250,300 420,400 620,220 750,140 830,300 900,260 900,520" fill="#161d44"/>
<polygon points="722,172 750,140 782,186 758,172 740,186" fill="#eaf0ff" opacity="0.9"/>
<circle cx="780" cy="80" r="28" fill="#fde68a" opacity="0.9"/><circle cx="792" cy="72" r="25" fill="#10163a"/>
<text x="60" y="120" font-size="34" font-weight="bold" fill="#eaeeff">MaaS360 Expedition</text>
<text x="60" y="158" font-size="22" fill="#fbbf24">Visual Maintenance Guide</text>
<text x="60" y="210" font-size="14" fill="#9aa6d4">The system on five diagrams:</text>
<text x="80" y="240" font-size="14" fill="#eaeeff">1 - How the whole system fits together</text>
<text x="80" y="266" font-size="14" fill="#eaeeff">2 - The three editing layers and who wins</text>
<text x="80" y="292" font-size="14" fill="#eaeeff">3 - Publishing a change</text>
<text x="80" y="318" font-size="14" fill="#eaeeff">4 - How an email alert happens</text>
<text x="80" y="344" font-size="14" fill="#eaeeff">5 - Troubleshooting: where to start</text>
<text x="60" y="400" font-size="12.5" fill="#9aa6d4">Written companion: MAINTENANCE.md in the repository root.</text>
<text x="60" y="422" font-size="12.5" fill="#9aa6d4">Content format: content/README.md - Cloud setup: supabase/SETUP-GUIDE.md</text>
</svg>'''
cairosvg.svg2pdf(bytestring=title_svg.encode(), write_to="/tmp/diag_title.pdf", output_width=1080)

writer = PdfWriter()
for f in ["/tmp/diag_title.pdf"] + pages:
    for p in PdfReader(f).pages:
        writer.add_page(p)
with open(OUT, "wb") as f:
    writer.write(f)
print("wrote", OUT, "-", len(PdfReader(OUT).pages), "pages")
