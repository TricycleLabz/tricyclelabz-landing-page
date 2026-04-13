# Tricycle Labz — Landing Page

> Project-level instructions for Claude Code. Every session, every collaborator.

---

## Project Overview

This is the **Tricycle Labz landing page** ... a static site built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no npm. It is designed for direct deployment to GitHub Pages.

### File Structure

```
/
├── index.html      ← Page structure and content
├── styles.css      ← All visual styling (uses CSS variables)
├── script.js       ← Minimal interactions (scroll, nav, reveal)
├── CLAUDE.md       ← This file (project instructions)
└── .claude/        ← Local Claude Code config (not deployed)
```

**These three files are the entire product.** There is no build step, no compilation, no bundling. What you edit is what ships.

---

## Technology Constraints (non-negotiable)

This project uses **only**:
- Semantic HTML
- CSS (with CSS variables for theming)
- Vanilla JavaScript (no libraries, no frameworks)

**Do NOT introduce:**
- React, Vue, Svelte, or any JavaScript framework
- npm, yarn, or any package manager
- Webpack, Vite, Rollup, or any build tool
- Tailwind, Bootstrap, or any CSS framework
- TypeScript
- Any external JavaScript dependency

If a feature cannot be built with plain HTML/CSS/JS, it does not belong in this project.

---

## Deployment

This site is hosted on **GitHub Pages**. Deployment happens automatically when code is pushed to `main`.

- The `main` branch **is production**
- Anything merged to `main` goes live immediately
- There is no staging environment

This means: **never push directly to `main`.** Always use a branch and PR.

---

## Guard Rails — Protecting Existing Work

### CRITICAL: Branch-Only Workflow

**Every change, no matter how small, must happen on a branch.**

```
# CORRECT — always branch first
git checkout -b feature/update-hero-text
# ... make changes ...
# ... commit ...
# ... push and create PR ...

# WRONG — never do this
git add . && git commit -m "quick fix" && git push  ← on main
```

The sequence is always:
1. Pull latest `main`: `git pull origin main`
2. Create a branch: `git checkout -b <type>/<short-description>`
3. Make changes
4. Commit with a clear message
5. Push the branch: `git push -u origin <branch-name>`
6. Create a PR via `gh pr create`
7. Review, then merge

Branch name format: `feature/<descriptor>`, `fix/<descriptor>`, or `content/<descriptor>`

### CRITICAL: Never Overwrite All Three Files at Once

If Claude is asked to "rebuild the site" or "start fresh" or "redesign everything" ... **do not do it.** The current implementation represents significant design work.

Instead:
- Ask the user which **specific section** they want to change
- Make targeted edits to the relevant parts of the existing files
- Preserve everything that isn't explicitly being changed

**The Edit tool is almost always the right choice. The Write tool should be rare.**

### CRITICAL: Never Delete Content Without Confirmation

Before removing any section, component, or significant block of code:
- State exactly what will be removed
- Explain what will be affected
- Wait for explicit confirmation

This applies to:
- Removing or replacing HTML sections
- Deleting CSS rules or variables
- Removing JavaScript functions
- Changing the colour palette or typography

### CRITICAL: Preserve the Design System

The site uses a carefully chosen design system defined as CSS variables in `styles.css`. These variables control the entire visual identity:

- **Colour palette:** `--bg-deep`, `--sand`, `--ochre`, `--rust`, `--copper`, `--ivory`, etc.
- **Typography:** `--font-sans` (Inter), `--font-serif` (Playfair Display)
- **Spacing scale:** `--space-xs` through `--space-5xl`
- **Border and radius tokens:** `--border-subtle`, `--radius-md`, etc.
- **Motion tokens:** `--ease-out`, `--duration-slow`, etc.

**Rules:**
- Always use CSS variables ... never hardcode colours, fonts, or spacing values
- Do not rename existing CSS variables without updating every usage
- New variables are fine, but they must follow the existing naming convention
- Do not change the font families without explicit approval

### Avoid Destructive Git Operations

**Never run these commands:**
- `git push --force` or `git push -f`
- `git reset --hard`
- `git checkout .` or `git restore .` (discards all uncommitted changes)
- `git clean -f`
- `git branch -D main`
- `git rebase` (on shared branches)

If you encounter a merge conflict, **ask the user for guidance** rather than resolving it autonomously. The user may have important context about which version to keep.

---

## How to Make Changes Safely

### Content Changes (text, copy, wording)

Content lives in `index.html`. To update text:
1. Read the file first to understand the current structure
2. Use the Edit tool to make targeted replacements
3. Preserve the surrounding HTML structure
4. Do not change class names or IDs unless also updating CSS/JS references

### Style Changes (colours, spacing, layout)

Styles live in `styles.css`. To update visuals:
1. Read the relevant section of the CSS file
2. Prefer changing CSS variable values over hardcoding new values
3. Test at both desktop and mobile breakpoints (640px, 1024px)
4. Do not remove media queries or responsive rules

### Interaction Changes (animations, scroll behaviour)

Interactions live in `script.js`. To update behaviour:
1. Read the file ... it's small and self-contained
2. Keep JavaScript minimal ... this is a landing page, not a web app
3. Do not add external libraries or CDN scripts
4. All DOM queries should be defensive (check for null before accessing)

### Adding a New Section

To add a new section to the page:
1. Add the HTML in `index.html` following the existing section pattern
2. Add corresponding styles in `styles.css` following the existing naming convention
3. Use the `.reveal` class on elements that should animate on scroll
4. Use existing CSS variables for all colours, spacing, and typography
5. Ensure the section is responsive at all breakpoints

---

## Coding Standards

### HTML
- Use semantic elements (`<section>`, `<nav>`, `<footer>`, `<h1>`-`<h4>`)
- Every section should have a clear class name following the `.section--name` pattern
- Keep nesting shallow and readable
- Use meaningful class names that describe purpose, not appearance

### CSS
- All values that might change (colours, spacing, fonts) must use CSS variables
- Follow the existing naming convention: `.component`, `.component-element`, `.component--modifier`
- Keep selectors specific but not overly nested
- Mobile styles use `max-width` media queries at 1024px and 640px breakpoints

### JavaScript
- Vanilla JS only ... no jQuery, no lodash, no external libraries
- Wrap everything in an IIFE to avoid global scope pollution
- Use `var` for consistency with the existing codebase (not a modern ES6 project)
- Keep it minimal ... no JavaScript for things CSS can handle

### Copy and Tone
- Use Canadian English spelling (colour, centre, behaviour, analyse, etc.)
- Use ellipses (...) instead of em-dashes in all copy
- Tone should be: intelligent, grounded, quietly ambitious, credible
- Avoid hype language: "revolutionary," "cutting-edge," "disrupting," "world-class," "game-changing"
- Do not invent metrics, funding amounts, client names, or partnerships

---

## Git Workflow

### Commit Messages

```
Short imperative title (~50 chars)

- Bullet describing first logical change
- Bullet describing second logical change
```

Examples:
- `Update hero headline and subheadline copy`
- `Add testimonials section below products`
- `Fix mobile nav toggle not closing on link click`

### Pull Requests

PRs must include:
- **Summary:** What changed and why (bullet points)
- **Test plan:** How to verify the change (checklist)
- Use `gh pr create` to create PRs from the CLI

### GitHub Account

All work in this repo goes through the `98ChimpInc` GitHub organisation.
Before any `gh` command, switch to the correct account:

```bash
gh auth switch --user 98chimp
```

---

## Review Checklist

Before presenting any change as ready:

- [ ] Change is on a branch, not `main`
- [ ] HTML is valid and semantic
- [ ] CSS uses variables, not hardcoded values
- [ ] Page looks correct at desktop (1280px+)
- [ ] Page looks correct at tablet (768px-1024px)
- [ ] Page looks correct at mobile (375px)
- [ ] No horizontal scroll at any breakpoint
- [ ] Navigation links work (anchor scroll)
- [ ] Mobile menu opens and closes properly
- [ ] Scroll reveal animations fire on scroll
- [ ] No JavaScript console errors
- [ ] Copy uses Canadian English spelling
- [ ] No placeholder text (lorem ipsum, TBD, etc.)
- [ ] Commit messages follow the format above

---

## What "Done" Means for This Project

A change is done when:
- It solves the stated problem and nothing more
- It preserves everything that wasn't explicitly asked to change
- It looks correct at all screen sizes
- It follows the existing code patterns
- It's committed on a branch with a clean message
- It could be merged to `main` without breaking anything

---

## Scope Control

**Do not:**
- Rewrite the entire page when asked to change one section
- Add features that weren't requested
- Refactor working code that isn't related to the current task
- Introduce new architectural patterns (components, modules, etc.)
- Convert the project to a framework or add a build step
- Add analytics, tracking scripts, or third-party integrations without approval

**Do:**
- Make the smallest change that satisfies the request
- Preserve existing design decisions
- Ask clarifying questions when the request is ambiguous
- Flag if a request might break existing functionality

---

*Last updated: April 2026*
