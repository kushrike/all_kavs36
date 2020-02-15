#!/bin/bash
google-chrome-stable localhost:5000/blink
python3 detect_blinks.py
xdg-open foo.pdf