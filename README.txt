# 🎂 Bindhu Birthday Surprise Website

A responsive, no-backend birthday surprise made with HTML5, CSS3 and vanilla JavaScript.

## Files
- `index.html` — page structure and all birthday text
- `style.css` — design, responsive layout and animations
- `script.js` — music, countdown, confetti, gift interaction and particles
- `assets/bindhu-photo.jpg` — replace this with Bindhu's photo
- `assets/birthday-song.mp3` — replace this with your MP3

## Customize in 3 easy steps

### 1. Photo
Put your image in `assets/` and name it:
`bindhu-photo.jpg`

### 2. Music
Put your MP3 in `assets/` and name it:
`birthday-song.mp3`

The browser will NOT autoplay music on page load. The music starts when the visitor clicks **Open Your Surprise 🎁**.

If you use a different filename, change the `<source>` in `index.html`.

### 3. Birthday date
Open `script.js` and edit:
`const BIRTHDAY_DATE = "2026-09-07T00:00:00";`

For a different birthday, use `YYYY-MM-DDTHH:MM:SS`.

## Personal messages
The main birthday letter is inside `index.html` under:
`<section class="section message-section">`

The gift message is also in `index.html` under:
`<div id="giftMessage">`

## Memories
The current version intentionally has ONE photo as requested. If you later want a memories gallery, duplicate the `.polaroid` block and replace the images/captions.

## How to run
The simplest option: open `index.html` in Chrome/Safari.

For the most reliable audio behavior, use a small local server (for example VS Code Live Server) and keep the `assets` folder beside `index.html`.

No backend or database is required.
