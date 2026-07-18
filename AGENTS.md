# TinyChaos Repository Guidance

## Scope

TinyChaos is a dependency-free static gallery. Keep the implementation in HTML, CSS, vanilla JavaScript, JSON, and inline SVG.

## Project boundaries

- Treat every directory under `projects/` as a read-only Git submodule unless work in that specific repository is explicitly requested.
- Preserve exact PascalCase repository and folder names.
- Keep `projects.json` and the fallback metadata in `script.js` equivalent.
- Do not add frameworks, package managers, runtime dependencies, analytics, authentication, a backend, or external asset libraries.

## Quality

- Preserve semantic HTML, keyboard access, visible focus, labelled illustrations, 200% zoom support, and reduced-motion behavior.
- Verify layouts at 320px, 375px, tablet, laptop, and large-desktop widths without horizontal page overflow.
- Validate all project metadata and links before publishing.
- Stage files by explicit path and never commit changes inside submodules from the parent repository accidentally.
