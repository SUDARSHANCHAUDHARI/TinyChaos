# TinyChaos

> Small interactions.<br>
> Unexpected reactions.<br>
> Everyday objects with terrible attitudes.

TinyChaos is the main gallery for 21 standalone interactive web experiments. Each project takes a familiar object or interface and gives it an inconvenient personality. The gallery adds search, filtering, sorting, random selection, collection statistics, and direct links without changing or combining any project.

**Live gallery:** [sudarshanchaudhari.github.io/TinyChaos](https://sudarshanchaudhari.github.io/TinyChaos/)

## The collection

| # | Project | Live demo | Source |
|---:|---|---|---|
| 1 | Impossible Light Bulb | [Open demo](https://sudarshanchaudhari.github.io/ImpossibleLightBulb/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ImpossibleLightBulb) |
| 2 | Runaway Button | [Open demo](https://sudarshanchaudhari.github.io/RunawayButton/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/RunawayButton) |
| 3 | Shy Doorbell | [Open demo](https://sudarshanchaudhari.github.io/ShyDoorbell/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ShyDoorbell) |
| 4 | Snooze Escape | [Open demo](https://sudarshanchaudhari.github.io/SnoozeEscape/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/SnoozeEscape) |
| 5 | Brew Later | [Open demo](https://sudarshanchaudhari.github.io/BrewLater/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/BrewLater) |
| 6 | Trash Dash | [Open demo](https://sudarshanchaudhari.github.io/TrashDash/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/TrashDash) |
| 7 | Mood Switch | [Open demo](https://sudarshanchaudhari.github.io/MoodSwitch/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/MoodSwitch) |
| 8 | Fridge Patrol | [Open demo](https://sudarshanchaudhari.github.io/FridgePatrol/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/FridgePatrol) |
| 9 | Cookie Guard | [Open demo](https://sudarshanchaudhari.github.io/CookieGuard/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/CookieGuard) |
| 10 | Five More Minutes | [Open demo](https://sudarshanchaudhari.github.io/FiveMoreMinutes/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/FiveMoreMinutes) |
| 11 | Window Wars | [Open demo](https://sudarshanchaudhari.github.io/WindowWars/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/WindowWars) |
| 12 | Login Chase | [Open demo](https://sudarshanchaudhari.github.io/LoginChase/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/LoginChase) |
| 13 | Elevator Drama | [Open demo](https://sudarshanchaudhari.github.io/ElevatorDrama/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ElevatorDrama) |
| 14 | Paper Monster | [Open demo](https://sudarshanchaudhari.github.io/PaperMonster/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/PaperMonster) |
| 15 | Drama Plant | [Open demo](https://sudarshanchaudhari.github.io/DramaPlant/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/DramaPlant) |
| 16 | Dismiss Me Not | [Open demo](https://sudarshanchaudhari.github.io/DismissMeNot/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/DismissMeNot) |
| 17 | Umbrella Problems | [Open demo](https://sudarshanchaudhari.github.io/UmbrellaProblems/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/UmbrellaProblems) |
| 18 | Shy Mirror | [Open demo](https://sudarshanchaudhari.github.io/ShyMirror/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/ShyMirror) |
| 19 | Keyception | [Open demo](https://sudarshanchaudhari.github.io/Keyception/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/Keyception) |
| 20 | Volume War | [Open demo](https://sudarshanchaudhari.github.io/VolumeWar/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/VolumeWar) |
| 21 | The Last Slice | [Open demo](https://sudarshanchaudhari.github.io/TheLastSlice/) | [Repository](https://github.com/SUDARSHANCHAUDHARI/TheLastSlice) |

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

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` deploys the parent gallery when `main` changes and can also be run manually.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main`, or open **Actions → Deploy TinyChaos to GitHub Pages → Run workflow**.
4. Wait for the `github-pages` environment deployment to finish.
5. Visit [https://sudarshanchaudhari.github.io/TinyChaos/](https://sudarshanchaudhari.github.io/TinyChaos/).

The workflow checks out submodules recursively as a repository integrity check, then publishes only `index.html`, `style.css`, `script.js`, `projects.json`, and gallery assets. Individual project demos remain independent GitHub Pages deployments.

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
- GitHub Pages and GitHub Actions

There is no framework, package manager, backend, database, analytics, authentication, or external image/icon library.

## Contributing

Bug reports, project suggestions, metadata corrections, and accessibility improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Changes to a standalone experiment belong in that experiment's repository, not in the parent gallery.

## License

TinyChaos is available under the [MIT License](LICENSE). Each submodule is a separate repository and retains its own license and history.
