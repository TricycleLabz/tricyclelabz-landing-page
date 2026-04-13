# Working on the Tricycle Labz Landing Page

> A practical guide for making changes using Claude Code.

---

## The Big Rule

**Never work directly on `main`.** Always create a branch first. Claude Code knows this rule and will follow it ... but it helps to understand why.

The `main` branch is what's live at [www.tricyclelabz.com](https://www.tricyclelabz.com). Anything merged into `main` goes live immediately. Working on a branch keeps your changes separate until they're reviewed and ready.

---

## Before You Start (One-Time Setup)

Make sure you have the repo cloned and you're in the right directory:

```bash
cd ~/path-to/tricyclelabz-landing-page
```

Make sure you're on the latest version of `main`:

```bash
git pull origin main
```

Switch to the correct GitHub account (do this at the start of every session):

```bash
gh auth switch --user 98chimp
```

---

## Making Changes — The Simple Version

### 1. Tell Claude what you want to change

Be specific. Good examples:

- "Update the hero subheadline to say ..."
- "Change the Loomi description to ..."
- "Add a new venture card for Resolve"
- "Make the CTA button text say 'Start a Conversation'"

Claude will:
- Create a branch for you
- Make the changes
- Show you what changed

### 2. Preview your changes locally

Ask Claude:

> "Can you start the local preview so I can see my changes?"

Claude will start a local server. Open the preview URL in your browser to see your changes before they go live.

### 3. Save your work (commit)

When you're happy with the changes, tell Claude:

> "Commit these changes"

Claude will create a save point (called a "commit") with a clear description of what changed.

### 4. Push and create a pull request

When you're ready for review, tell Claude:

> "Push this and create a PR"

Claude will:
- Push your branch to GitHub
- Create a pull request (PR) for review
- Give you a link to the PR

Share the PR link with the team. Once approved, it gets merged into `main` and goes live.

---

## Common Tasks

### Updating text content

> "Change the hero headline to 'Three brothers. One conviction. Products that matter.'"

> "Update the Roundtable venture description to say ..."

### Updating styles (colours, spacing, sizes)

> "Make the CTA section background lighter"

> "Increase the spacing between the venture cards"

Note: The site uses a specific colour palette. Claude knows the brand colours and will use them. If you want a specific colour, reference it by name (Signal Red, Saffron, Deep Navy, Forest, Warm Gray).

### Adding a new section or venture

> "Add a new venture card for Resolve with the description: AI feedback for understanding conflict before it turns into damage."

### Fixing something that looks wrong

> "The mobile menu isn't closing when I tap a link — can you fix that?"

> "The text is too small on mobile in the values section"

---

## What NOT to Do

These are guardrails to protect the work that's already been done:

- **Don't ask Claude to "rebuild the site" or "start fresh."** Ask for specific changes instead.
- **Don't ask Claude to change the fonts or colour palette** without checking with the team first.
- **Don't push directly to `main`.** Always use a branch and PR.
- **Don't delete sections** without discussing it first.

---

## If Something Goes Wrong

### "I made changes but I don't want them anymore"

Tell Claude:

> "Discard all my uncommitted changes and go back to main"

### "I'm on a weird branch and don't know what happened"

Tell Claude:

> "Switch me back to main and pull the latest"

### "The site looks broken"

Don't panic. If it's on your local branch, it won't affect the live site. Tell Claude:

> "Something looks broken — can you check what's wrong?"

### "I accidentally committed something wrong"

Tell Claude. Don't try to fix git yourself. Claude can sort it out safely.

---

## Quick Reference

| What you want to do | What to tell Claude |
|---|---|
| Start working | "Pull latest main and create a branch for [description]" |
| Preview changes | "Start the local preview" |
| Save progress | "Commit these changes" |
| Send for review | "Push and create a PR" |
| Undo changes | "Discard my changes and go back to main" |
| Check status | "What branch am I on? Are there uncommitted changes?" |

---

## Files You'll Be Editing

There are only three files that make up the entire site:

| File | What it controls |
|---|---|
| `index.html` | All the text, sections, and structure |
| `styles.css` | All the visual styling (colours, spacing, layout) |
| `script.js` | Interactions (scroll animations, nav, form) |

You'll almost never need to touch `script.js`. Most content changes are in `index.html`. Style tweaks are in `styles.css`.

---

*Last updated: April 2026*
