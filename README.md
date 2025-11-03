# Iconic Whisper – Cybersecurity Portfolio

Static, single‑page portfolio showcasing projects, CTF writeups, and contact info. No build tools required—just open `index.html` in a browser or serve the folder with any static host.

## Features
- Responsive, dark theme UI with subtle animations
- Sections: whoami, about, skills, projects, CTF resources, blog, contact
- Projects rendered in JS from a local array (edit in `scripts.js`)
- Blog list loaded from `blog.json`
- CTF resources section linking to OverTheWire Bandit, RootMe, PortSwigger (HTB/THM placeholders)

## Quick start
1. Clone or download this repo.
2. Open `index.html` directly, or run a tiny server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Project structure
```
portfolio/
  index.html      # markup and sections
  style.css       # styles and animations
  scripts.js      # interactivity, project/blog rendering
  blog.json       # blog entries
  blog/           # optional local HTML writeups
  iconic.jpg      # avatar
  background.jpg  # hero background
```

## Editing content
- Header/nav labels: `index.html`
- About/Skills text: `index.html`
- Projects: edit the `projects` array in `scripts.js`
- CTF resources (Bandit/RootMe/PortSwigger/HTB/THM): section `#ctf` in `index.html`
- Contact info: `#contact` section in `index.html`

### Add a blog post
`blog.json` is an array of posts. Example entry:

```json
[
  {
    "title": "ROP (Return Oriented Programming): A Practical Primer",
    "date": "2025-09-02",
    "summary": "From stack resources and janitorial gadgets to stack pivots, syscalls, and modern defenses.",
    "tags": ["pwn", "rop", "exploitation"],
    "readTime": 9,
    "url": "blog/rop.html"
  }
]
```

Notes:
- `date` should be ISO format (`YYYY-MM-DD`) for correct sorting.
- `url` can be an external link or a local file under `/blog`.

## Styling tweaks
- Project card line/marker styles: `.project-card::before/::after` in `style.css`
- Grid spacing between project cards: `.projects-grid { gap: ... }`

## Deployment
Any static hosting works. For GitHub Pages:
1. Push to a public repo
2. In repository settings → Pages → set Source to `main` branch (root)
3. Visit the provided URL when it finishes building

## Credits
- Icons: Boxicons
- Typed effect: `typed.js`

## License
Personal portfolio content © Iconic Whisper. Code portions can be reused for personal sites; please replace images/content with your own.
