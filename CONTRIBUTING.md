# Contributing to TinyChaos

Thanks for helping keep the collection playful, usable, and accurate. TinyChaos is the parent gallery; each interactive experiment remains an independent repository.

## Report a problem

Open an issue in [SUDARSHANCHAUDHARI/TinyChaos](https://github.com/SUDARSHANCHAUDHARI/TinyChaos/issues) for gallery problems such as broken filtering, incorrect metadata, accessibility barriers, responsive layout issues, or dead links. Include:

- The page and control involved
- Clear steps to reproduce the problem
- Expected and actual behavior
- Browser, operating system, viewport width, and input method
- Console output when it is relevant and does not contain private data

Report behavior inside an individual experiment in that experiment's own repository.

## Suggest a project

Open an issue describing the project name, everyday object or interface, central interaction, unexpected reaction, category, difficulty, and estimated build time. A project should exist as its own public repository before it is proposed for this gallery.

Do not copy a project's files into `TinyChaos`. New projects must be added as Git submodules using the exact PascalCase repository name.

## Update project metadata

Project metadata lives in `projects.json`. The direct-file fallback metadata in `script.js` must contain the same values. Each entry needs:

- A unique integer `id`
- A unique PascalCase `repository` and matching `folder`
- A visible spaced `name`
- Description, category, difficulty, build time, and interaction type
- Boolean featured status and `Complete` status
- A lowercase-username GitHub Pages URL
- A personal-account source repository URL

Load the gallery through a local HTTP server and also open `index.html` directly to verify both metadata paths.

## Update submodules

Initialize missing submodules:

```bash
git submodule update --init --recursive
```

Update every project from its tracked remote branch:

```bash
git submodule update --remote --merge
```

Inspect each changed submodule pointer before committing it. Do not edit, reset, rename, or rewrite a submodule from the parent repository.

## Test locally

Run a static server from the repository root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000), then verify:

1. Search matches project title, repository, description, category, and interaction.
2. Every category and difficulty filter produces the expected count.
3. All five sort modes work.
4. “Surprise Me” does not repeat a project when alternatives exist.
5. The empty state and Clear Filters button work.
6. Every demo and source link opens the intended repository in a new tab.
7. Directly opening `index.html` still renders all 21 cards.

## Accessibility checks

- Navigate the complete page using only Tab, Shift+Tab, Enter, Space, and arrow keys.
- Confirm that focus is always visible and follows a logical order.
- Verify search-result and surprise-selection announcements with a screen reader.
- Confirm every project illustration has an accessible title.
- Test at 200% browser zoom without lost content or two-dimensional scrolling.
- Enable reduced motion and confirm non-essential animation stops.
- Check that category, difficulty, and featured information is understandable without color.

## Responsive checks

Test at 320px and 375px mobile widths, a tablet width, a laptop width, and a large desktop width. Look for clipped text, horizontal page overflow, overlapping controls, undersized targets, and card actions that cannot wrap.

## Verify links

For each project, confirm these exact patterns:

```text
https://sudarshanchaudhari.github.io/RepositoryName/
https://github.com/SUDARSHANCHAUDHARI/RepositoryName
```

Repository and Pages paths are case-sensitive. Do not convert PascalCase names to another naming style.

## Submit a pull request

1. Create a focused branch from `main`.
2. Make the smallest complete change needed.
3. Run the functional, accessibility, responsive, and link checks relevant to the change.
4. Stage files by explicit name.
5. Write a concise commit message that describes the behavior changed.
6. Open a pull request with the reason for the change and the checks you ran.

Do not add dependencies, frameworks, analytics, authentication, external asset libraries, or a backend.
