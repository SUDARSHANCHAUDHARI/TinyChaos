# TinyChaos

> Small interactions.<br>
> Unexpected reactions.<br>
> Everyday objects with terrible attitudes.

TinyChaos is the main gallery for 21 standalone interactive web experiments. Each project takes a familiar object or interface and gives it an inconvenient personality. The gallery adds search, filtering, sorting, random selection, collection statistics, and direct links without changing or combining any project.

**Live gallery:** [tinychaos.sudarshantechlabs.com](https://tinychaos.sudarshantechlabs.com/) · [GitHub Pages fallback](https://sudarshanchaudhari.github.io/TinyChaos/)<br>
**Source repository:** [github.com/SUDARSHANCHAUDHARI/TinyChaos](https://github.com/SUDARSHANCHAUDHARI/TinyChaos)

## Table of Contents

- [The collection](#the-collection)
- [Gallery features](#gallery-features)
- [Repository structure](#repository-structure)
- [Git submodules](#git-submodules)
- [Local development](#local-development)
- [Production deployment](#production-deployment)
- [Accessibility](#accessibility)
- [Technology](#technology)
- [Contributing](#contributing)
- [License](#license)
- [About](#about)

## The collection

| # | Project | Live demo | Source |
|---:|---|---|---|
| 1 | Impossible Light Bulb | [Open demo](https://impossiblelightbulb.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ImpossibleLightBulb) |
| 2 | Runaway Button | [Open demo](https://runawaybutton.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/RunawayButton) |
| 3 | Shy Doorbell | [Open demo](https://shydoorbell.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ShyDoorbell) |
| 4 | Snooze Escape | [Open demo](https://snoozeescape.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/SnoozeEscape) |
| 5 | Brew Later | [Open demo](https://brewlater.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/BrewLater) |
| 6 | Trash Dash | [Open demo](https://trashdash.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/TrashDash) |
| 7 | Mood Switch | [Open demo](https://moodswitch.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/MoodSwitch) |
| 8 | Fridge Patrol | [Open demo](https://fridgepatrol.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/FridgePatrol) |
| 9 | Cookie Guard | [Open demo](https://cookieguard.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/CookieGuard) |
| 10 | Five More Minutes | [Open demo](https://fivemoreminutes.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/FiveMoreMinutes) |
| 11 | Window Wars | [Open demo](https://windowwars.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/WindowWars) |
| 12 | Login Chase | [Open demo](https://loginchase.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/LoginChase) |
| 13 | Elevator Drama | [Open demo](https://elevatordrama.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ElevatorDrama) |
| 14 | Paper Monster | [Open demo](https://papermonster.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/PaperMonster) |
| 15 | Drama Plant | [Open demo](https://dramaplant.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/DramaPlant) |
| 16 | Dismiss Me Not | [Open demo](https://dismissmenot.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/DismissMeNot) |
| 17 | Umbrella Problems | [Open demo](https://umbrellaproblems.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/UmbrellaProblems) |
| 18 | Shy Mirror | [Open demo](https://shymirror.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ShyMirror) |
| 19 | Keyception | [Open demo](https://keyception.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/Keyception) |
| 20 | Volume War | [Open demo](https://volumewar.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/VolumeWar) |
| 21 | The Last Slice | [Open demo](https://thelastslice.sudarshantechlabs.com/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/TheLastSlice) |

## Gallery features

- Instant search across titles, repository names, descriptions, categories, and interaction types
- Category and difficulty filters with visible result counts and a guided empty state
- Sorting by original order, name, difficulty, build time, or featured status
- A “Surprise Me” picker that avoids the previous selection and reveals the chosen demo
- 21 distinct inline SVG illustrations, responsive layouts, and reduced-motion support
- Keyboard-accessible controls, visible focus indicators, semantic landmarks, and live announcements
- A direct-file metadata fallback for previews opened with `file://`

## Repository structure

```text
TinyChaos/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── assets/
│   └── illustrations/
├── projects/
│   ├── ImpossibleLightBulb/  # Git submodule
│   ├── RunawayButton/        # Git submodule
│   └── ...                   # 19 more Git submodules
├── .gitignore
├── .gitmodules
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── index.html
├── projects.json
├── script.js
└── style.css
```

## Git submodules

The directories inside `projects/` are Git submodules. The parent repository records a URL and an exact commit for each project; it does not copy, merge, or rewrite any project history.

> **Access note:** all 21 project repositories are public. Recursive clones work anonymously, and each project can also be opened directly from the gallery table above.

Clone the gallery and all projects in one command:

```bash
git clone --recurse-submodules https://github.com/SUDARSHANCHAUDHARI/TinyChaos.git
cd TinyChaos
```

If the repository was cloned without submodules, initialize them afterward:

```bash
git submodule update --init --recursive
```

To fetch the latest commit from every submodule's tracked branch:

```bash
git submodule update --remote --merge
```

Review and commit the resulting submodule pointer changes in `TinyChaos`; do not commit changes from inside a project unless that project's repository is intentionally being updated.

## Local development

The gallery has no build step and no runtime dependencies. From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). You can also open `index.html` directly; the embedded fallback in `script.js` supplies metadata when a browser blocks local JSON requests.

## Production deployment

The workflow at `.github/workflows/deploy-pages.yml` deploys the parent gallery when `main` changes and can also be run manually.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main`, or open **Actions → Deploy TinyChaos to GitHub Pages → Run workflow**.
4. Wait for the `github-pages` environment deployment to finish.
5. Visit the canonical gallery at [https://tinychaos.sudarshantechlabs.com/](https://tinychaos.sudarshantechlabs.com/), or use [the GitHub Pages fallback](https://sudarshanchaudhari.github.io/TinyChaos/).

The workflow requests a strict recursive checkout of the public submodules, then publishes only `index.html`, `style.css`, `script.js`, `projects.json`, and gallery assets. The canonical child demo pattern is `https://<lowercase-repository>.sudarshantechlabs.com/`; each GitHub Pages URL remains a fallback. No submodule token is required.

## Accessibility

TinyChaos uses semantic HTML, native form controls, descriptive link labels, labelled SVG illustrations, visible focus indicators, and an `aria-live` result count. All functionality is available by keyboard. Layouts reflow from large desktops down to 320px without horizontal page scrolling, and non-essential movement is disabled when `prefers-reduced-motion: reduce` is active.

When contributing, test keyboard order, 200% browser zoom, reduced-motion mode, high-contrast text, and both empty and populated filter states.

## Technology

- HTML5
- CSS with custom properties and responsive media queries
- Vanilla JavaScript
- JSON metadata
- Inline SVG illustrations
- Git submodules
- Cloudflare Pages custom domains (canonical demos), GitHub Pages fallback, and GitHub Actions

There is no framework, package manager, backend, database, analytics, authentication, or external image/icon library.

## Contributing

Bug reports, project suggestions, metadata corrections, and accessibility improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Changes to a standalone experiment belong in that experiment's repository, not in the parent gallery.

## License

TinyChaos is available under the [MIT License](LICENSE). Each submodule is a separate repository and retains its own license and history.

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)
