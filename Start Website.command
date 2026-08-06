#!/bin/bash
# MaaS360 Expedition — local website launcher.
# Double-click this file to start the site at http://localhost:8000
# Keep the Terminal window open while using the site; close it (or press
# Ctrl+C) to stop the server.

cd "$(dirname "$0")"
echo "🏔️  MaaS360 Expedition running at http://localhost:8000"
echo "    (leave this window open; Ctrl+C to stop)"
( sleep 1 && open "http://localhost:8000" ) &
python3 -m http.server 8000
