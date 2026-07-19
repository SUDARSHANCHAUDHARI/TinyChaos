# TinyChaos 21+1 Production Release Plan

**Planned execution date:** Monday, 20 July 2026 (Asia/Bangkok)
**Plan prepared:** 19 July 2026
**Owner and author:** Sudarshan Chaudhari (`SUDARSHANCHAUDHARI`)
**Organization:** SudarshanTechLabs
**Contact:** `sunny.sudarshan@gmail.com`
**Status:** Executed with 22 custom-domain checks on 19 July 2026 (Asia/Bangkok); custom domains are now the canonical demo URLs and GitHub Pages remains the fallback

## 1. Objective

Prepare the complete TinyChaos portfolio for a safe public release:

- Make the 21 individual project repositories public.
- Keep the already-public `TinyChaos` gallery public.
- Audit all 22 repositories and align them with one shared TinyChaos UI design system.
- Publish every project through GitHub Pages and verify its custom production domain.
- Confirm the TinyChaos gallery points to working public repositories and live custom-domain demos.
- Keep GitHub Pages available as the documented fallback for every gallery and child demo.

The release must preserve the exact repository names, static implementation, accessibility behavior, and repository history. It must not expose secrets or accidentally publish local-only files.

## 2. Release strategy

### Canonical hosting

Cloudflare Pages custom domains are the canonical production demo hosts. `projects.json` and the embedded fallback metadata use this format:

```text
https://repositoryname.sudarshantechlabs.com/
```

Every child repository will use:

- Default branch: `main`
- Cloudflare Pages production branch: `main`
- GitHub Pages source: `main` / repository root (fallback)
- Custom GitHub Actions workflow: none
- Canonical repository: `https://github.com/SUDARSHANCHAUDHARI/RepositoryName`

### Cloudflare position

Use **Cloudflare Pages**, not a custom Cloudflare Worker, for the Git-connected static sites. The owner connected all 22 repositories and configured the custom domains. A serial HTTPS check returned HTTP 200 and the expected local title for every domain.

GitHub Pages remains the fallback deployment path:

1. Child GitHub Pages sites stay enabled from `main` / repository root.
2. The parent GitHub Pages site remains available if the custom-domain host needs recovery.
3. New gallery metadata changes must preserve the custom-domain pattern in both metadata sources.

### Shared UI design system

All 22 repositories must feel like one TinyChaos product family. “Same UI style” means shared brand tokens, typography, controls, navigation, spacing, borders, focus treatment, and responsive behavior. It does not mean making every scene identical; each project keeps its unique illustration, interaction, story, and primary accent.

The `TinyChaos` parent stylesheet is the visual source of truth:

- Core colors: ink `#15152a`, paper `#fff5df`, coral `#ff5d5d`, blue `#4f7cff`, butter `#ffd166`, mint `#58d6a9`, and lilac `#b695ff`.
- Shapes: heavy dark outlines, rounded corners, and solid offset shadows.
- Typography: bold condensed display headings with a rounded system body stack; no external font dependency.
- Controls: consistent button proportions, readable labels, hover/active feedback, and a visible blue focus ring.
- Branding: a recognizable TinyChaos wordmark or gallery link and consistent author/project attribution.
- Layout: consistent spacing rhythm, no page-level horizontal overflow, and usable layouts from 320px through large desktop.
- Motion: playful movement may vary by project, but reduced-motion behavior is mandatory.

Each repository receives its own UI review result in the release matrix. A repository cannot move to public release until both its automated/code UI review and Sudarshan’s manual visual approval pass.

## 3. Current verified baseline

The following work was completed before this plan:

- The `TinyChaos` parent repository is public and its GitHub Pages site is live.
- All 21 child repositories are connected as Git submodules.
- All 21 child verification suites passed.
- Full-history secret scanning found no credentials or high-risk secret files.
- No `.env`, private keys, keystores, signing material, or runtime external-service credentials were found.
- The parent README includes Sudarshan Chaudhari’s author and contact details.
- Git commit metadata includes `sunny.sudarshan@gmail.com`; this disclosure has been reviewed and accepted.

These results were rechecked immediately before the visibility and deployment changes on 19 July 2026. The detailed evidence is recorded in `docs/PRODUCTION_RELEASE_REPORT_2026-07-19.md`.

## 4. Success criteria

The release is complete only when all of the following are true:

- [x] All 22 repositories report `PUBLIC` visibility.
- [x] Every repository has a clean working tree and the intended `main` commit is pushed.
- [x] Every existing repository-specific verification command passes.
- [x] No secret or private-file finding remains unresolved.
- [x] All 22 repositories pass the shared TinyChaos UI checklist.
- [x] All 22 repositories receive Sudarshan’s manual UI approval.
- [x] All 22 repositories use the common TinyChaos design language while retaining their unique project interaction.
- [x] All 21 child GitHub Pages fallback URLs return HTTP 200 and serve the expected project.
- [x] The TinyChaos GitHub Pages fallback URL returns HTTP 200 and lists all 21 projects.
- [x] All 22 custom-domain URLs return HTTPS 200 and serve the expected local title.
- [x] Every TinyChaos source link resolves to the matching public GitHub repository.
- [x] Every TinyChaos demo link resolves to the matching live custom-domain site.
- [x] The parent repository checks out all now-public submodules recursively without a private token.
- [x] The parent README no longer describes child repositories as private.
- [x] The parent Pages workflow succeeds after its private-submodule fallback is removed.
- [x] Cloudflare Pages custom domains are verified and canonical; GitHub Pages remains the fallback.
- [x] A final release report records evidence, exceptions, and follow-up work.

## 5. Scope boundaries

### Included

- Security and privacy preflight for all 21 child repositories and `TinyChaos`.
- Existing tests, checks, builds, metadata, and link validation.
- UI consistency audit and release-blocking visual remediation across all 22 repositories.
- Repository visibility changes from private to public.
- GitHub Pages configuration using `main` / root.
- Required TinyChaos README and existing workflow cleanup after submodules become public.
- Optional Cloudflare Pages pilot and mirroring.

### Excluded

- Changing the projects’ core concepts, stories, or interaction mechanics.
- Renaming repositories or changing PascalCase folder names.
- Rewriting Git history.
- Homogenizing or replacing the 21 repo-specific README files.
- Standardizing licenses without a separate explicit decision. (Sudarshan later approved MIT standardization as a follow-up.)
- Adding analytics, authentication, a backend, runtime dependencies, or third-party asset libraries.
- Creating new GitHub Actions workflows in the child repositories.
- Cloudflare Functions or Workers application logic.

## 6. Non-negotiable safety rules

- Stop immediately if a credential, private key, signing file, customer/work data, or unexpected personal data is found.
- Never copy GitHub or Cloudflare tokens into a repository, file, shell history, issue, or plan.
- Authenticate through GitHub CLI/macOS Keychain and the official Cloudflare GitHub App flow.
- Grant the Cloudflare GitHub App access to **only the selected TinyChaos repositories**, not every personal repository.
- Change visibility one repository at a time and verify the result before proceeding.
- Keep changes reversible; use new commits instead of destructive history changes.
- Stage parent files by explicit path. Never stage changes inside submodules from the parent repository.
- Do not add or expand GitHub Actions without explicit approval.
- Retain each repository’s current license status unless Sudarshan explicitly approves a license change; MIT standardization was explicitly approved after the core release.
- Use the TinyChaos parent design tokens as the shared visual baseline; repo-specific accents must remain compatible with that palette.
- Do not declare UI consistency from code alone; every repository also needs Sudarshan’s manual visual approval.

## 7. Tomorrow’s execution plan

### Phase 0 — Freeze and authenticate

- [ ] Confirm GitHub CLI is authenticated as `SUDARSHANCHAUDHARI` using Keychain-capable access.
- [ ] Confirm the local path is under `SUDARSHAN_CODE` and git identity is `SUDARSHANCHAUDHARI / sunny.sudarshan@gmail.com`.
- [ ] Confirm the parent remote is `SUDARSHANCHAUDHARI/TinyChaos`.
- [ ] Fetch parent and child remotes without merging or rewriting history.
- [x] Record each repository’s default branch, visibility, pushed SHA, license state, and Pages state.
- [ ] Confirm no unrelated local modifications exist.

**Gate 0:** Do not continue if authentication points to the wrong GitHub account, any worktree is dirty unexpectedly, or local and remote release commits differ.

### Phase 1 — Re-run production-readiness checks

For every repository:

- [ ] Run its existing verification command from the matrix below.
- [ ] Confirm a top-level `index.html` exists.
- [ ] Validate internal asset paths and required files.
- [ ] Confirm repository and demo metadata use the exact PascalCase name.
- [ ] Confirm no local-only or generated sensitive files are tracked.
- [ ] Re-run full-history secret scanning.
- [ ] Review README claims for release-blocking inaccuracies only; do not rewrite repo-specific documentation.
- [ ] If a production build exists, generate it and verify its allowlisted contents.

**Gate 1:** All 22 repositories must pass. Fix release-blocking issues before any visibility change, then repeat the affected checks.

### Phase 2 — Audit and align the UI across all 22 repositories

Review `TinyChaos` first to lock the shared reference, then process the child repositories in the same four waves used for release.

For every repository:

- [ ] Compare its color variables with the TinyChaos core palette and map incompatible values to shared tokens.
- [ ] Check display and body typography, heading hierarchy, line length, and readable text contrast.
- [ ] Check buttons, links, cards, panels, border weight, corner radii, and offset shadows for family consistency.
- [ ] Add or verify a consistent TinyChaos wordmark/gallery link and author attribution without obscuring the project experience.
- [ ] Verify a clear blue `:focus-visible` treatment and complete keyboard operation.
- [ ] Verify interaction targets, labels, disabled states, hover/active states, and error/status messaging.
- [ ] Verify the layout at 320px, 375px, tablet, laptop, and large-desktop widths without page-level horizontal overflow.
- [ ] Verify 200% zoom, readable reflow, and `prefers-reduced-motion` behavior.
- [ ] Preserve the project’s unique illustration, game mechanics, scene composition, and compatible accent color.
- [ ] Run the repository’s existing verification command again after any UI change.
- [ ] Review the final UI manually with Sudarshan and mark the repository’s `UI` cell only after approval.

Prefer shared design values and repeatable CSS conventions, but do not add a package, framework, external stylesheet, or runtime cross-repository dependency. Each static repository must continue working independently.

**Gate 2:** All 22 `UI` checks are approved. If meaningful visual remediation remains, stop the public release and continue the UI work rather than publishing an inconsistent collection.

### Phase 3 — Make the 21 child repositories public

Release in small waves to reduce blast radius:

1. Wave A: `ImpossibleLightBulb`, `RunawayButton`, `ShyDoorbell`, `SnoozeEscape`, `BrewLater`
2. Wave B: `TrashDash`, `MoodSwitch`, `FridgePatrol`, `CookieGuard`, `FiveMoreMinutes`
3. Wave C: `WindowWars`, `LoginChase`, `ElevatorDrama`, `PaperMonster`, `DramaPlant`
4. Wave D: `DismissMeNot`, `UmbrellaProblems`, `ShyMirror`, `Keyception`, `VolumeWar`, `TheLastSlice`

For each repository:

- [ ] Review the exact target name and current visibility.
- [ ] Change visibility using the explicit repository name:

  ```bash
  gh repo edit SUDARSHANCHAUDHARI/RepositoryName \
    --visibility public \
    --accept-visibility-change-consequences
  ```

- [ ] Query GitHub again and confirm the repository reports public.
- [ ] Confirm the repository page is anonymously accessible.
- [ ] Confirm HTTPS clone access works without private credentials.
- [ ] Record the timestamp and result in the release log.

Pause after every wave and review the results before continuing.

**Gate 3:** All 21 child repositories are public and anonymously readable. `TinyChaos` remains public.

### Phase 4 — Enable GitHub Pages

For each child repository:

- [ ] Set GitHub Pages to deploy from `main` / root.
- [ ] Do not add a child GitHub Actions workflow.
- [ ] Wait for the Pages deployment to finish.
- [ ] Confirm the canonical URL returns HTTP 200.
- [ ] Confirm the response is the matching project, not a generic GitHub 404.
- [ ] Check referenced CSS, JavaScript, SVG, manifest, and other local assets.
- [ ] Confirm there is no horizontal page overflow at the required sizes using non-capture validation and Sudarshan’s manual visual review.
- [ ] Confirm keyboard access, visible focus, labelled illustrations, 200% zoom support, and reduced-motion behavior.
- [ ] Record the Pages deployment result and URL.

GitHub Pages can take several minutes to become available. A temporary 404 while the first deployment is pending is not a release failure; a completed failed deployment or persistent 404 is.

**Gate 4:** All 21 child demo URLs and the parent gallery URL return the correct content.

### Phase 5 — Update and verify TinyChaos

Once all child repositories are public:

- [ ] Replace the parent README’s private-repository access note with accurate public access information.
- [ ] Simplify the existing Pages workflow to strict recursive public submodule checkout.
- [ ] Remove the optional private `SUBMODULE_TOKEN` path, fallback behavior, and private-submodule warning.
- [ ] Confirm `.gitmodules` uses HTTPS URLs for every public child repository.
- [ ] Validate equivalence between `projects.json` and the fallback metadata in `script.js`.
- [ ] Validate all 21 source URLs and all 21 demo URLs.
- [ ] Run the parent structural checks and `actionlint`.
- [ ] Review the diff for scope, secrets, and accidental submodule changes.
- [ ] Commit only the explicit parent files and push.
- [ ] Confirm the parent Pages workflow succeeds and the live gallery remains correct.

**Gate 5:** The parent builds without private credentials and all gallery links work.

### Phase 6 — Verify custom Cloudflare Pages domains

This phase was completed after Gate 5 with Sudarshan’s confirmation.

- [x] Connect the official Cloudflare Pages GitHub integration.
- [x] Configure the parent gallery plus all 21 child repositories.
- [x] Use production branch `main`.
- [x] Use no framework preset and repository-root output for the static sites.
- [x] Confirm deployments serve the intended repository content.
- [x] Configure the `sudarshantechlabs.com` custom domain for each repository.
- [x] Verify all 22 HTTPS custom-domain URLs return HTTP 200 and the expected local title.
- [x] Keep GitHub Pages deployments available as fallback URLs.

**Gate 6:** All 22 custom domains are verified and canonical. GitHub Pages remains the recovery path.

## 8. Repository release matrix

Legend: `Pre` = production/security preflight, `UI` = shared UI audit plus manual approval, `Pub` = public visibility, `GHP` = GitHub Pages fallback enabled, `200` = correct HTTP response, `CF` = custom-domain host verified.

| # | Repository | Existing verification command | Canonical custom-domain URL | Pre | UI | Pub | GHP | 200 | CF |
|---:|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | `ImpossibleLightBulb` | `node scripts/verify.mjs` | `https://impossiblelightbulb.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 2 | `RunawayButton` | `bash scripts/verify.sh` | `https://runawaybutton.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 3 | `ShyDoorbell` | `node scripts/verify.mjs` | `https://shydoorbell.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 4 | `SnoozeEscape` | `pnpm check` | `https://snoozeescape.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 5 | `BrewLater` | `pnpm check` | `https://brewlater.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 6 | `TrashDash` | `pnpm check` | `https://trashdash.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 7 | `MoodSwitch` | `bash scripts/verify.sh` | `https://moodswitch.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 8 | `FridgePatrol` | `pnpm verify` | `https://fridgepatrol.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 9 | `CookieGuard` | `pnpm check` | `https://cookieguard.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 10 | `FiveMoreMinutes` | `node scripts/verify.js` | `https://fivemoreminutes.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 11 | `WindowWars` | `pnpm verify` | `https://windowwars.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 12 | `LoginChase` | `pnpm verify` | `https://loginchase.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 13 | `ElevatorDrama` | `pnpm check` | `https://elevatordrama.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 14 | `PaperMonster` | `node scripts/verify.mjs` | `https://papermonster.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 15 | `DramaPlant` | `pnpm verify` | `https://dramaplant.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 16 | `DismissMeNot` | `pnpm check` | `https://dismissmenot.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 17 | `UmbrellaProblems` | `pnpm check` | `https://umbrellaproblems.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 18 | `ShyMirror` | `pnpm check` | `https://shymirror.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 19 | `Keyception` | `pnpm build` | `https://keyception.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 20 | `VolumeWar` | `pnpm check` | `https://volumewar.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 21 | `TheLastSlice` | `node scripts/verify.mjs` | `https://thelastslice.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |
| 22 | `TinyChaos` | Parent metadata, link, workflow, and `actionlint` checks | `https://tinychaos.sudarshantechlabs.com/` | [x] | [x] | [x] | [x] | [x] | [x] |

## 9. Suggested schedule

| Bangkok time | Work |
|---|---|
| 09:00–10:00 | Authentication, remote/SHA inventory, clean-tree checks, visibility and Pages baseline |
| 10:00–12:00 | Re-run security scans, checks, tests, and production builds across all repositories |
| 12:00–13:00 | Review failures and release hold points; lunch buffer |
| 13:00–16:00 | Audit all 22 UIs against the shared TinyChaos design system in four waves |
| 16:00–18:00 | Apply release-blocking UI alignment, re-run checks, and obtain manual UI approvals |
| 18:00 | UI and production go/no-go decision; do not publish unless all 22 pass |
| 18:00–19:00 | Make child repositories public in four verified waves |
| 19:00–21:00 | Enable GitHub Pages and verify all canonical URLs/assets |
| 21:00–22:00 | Clean up TinyChaos README/workflow, verify parent Pages, and prepare the release report |
| After Gate 5 | Run the optional three-repository Cloudflare Pages pilot, or schedule it separately if the core release used the available time |

The schedule is a guide. Security, UI quality, and release gates take precedence over time targets. If aligning all 22 UIs requires more work, continue that work and move publication rather than weakening the shared-style requirement.

## 10. Stop conditions

Stop the release and keep the remaining repositories private if any of these occurs:

- Secret scan produces a real or uncertain credential finding.
- A repository contains unexpected private, work, customer, signing, or local configuration data.
- Existing verification fails and the cause is not understood.
- Any repository has not passed the shared UI checklist and Sudarshan’s manual visual approval.
- A UI alignment change damages the project’s unique interaction, accessibility, or responsive behavior.
- Local and remote commits do not match the intended release state.
- The target repository name or authenticated GitHub account is uncertain.
- Anonymous access fails after a visibility change.
- GitHub Pages deploys the wrong content or repeatedly fails.
- A parent change modifies a child submodule worktree unexpectedly.
- Cloudflare requests broader GitHub access than the selected repositories.

Record the blocker and fix it before resuming. Do not bypass a gate just to complete the batch.

## 11. Recovery and rollback

Visibility and Pages rollback are operational fallbacks, not substitutes for preflight:

- If public exposure reveals a serious issue, change the affected repository back to private immediately. Its public Pages site may become unavailable as a consequence.
- Disable the affected GitHub Pages source while investigating deployment-specific issues.
- Disable Cloudflare automatic deployments or remove the affected Cloudflare Pages project if a mirror is wrong.
- Revert parent documentation or workflow mistakes with a new commit; do not reset or rewrite shared history.
- Rotate any credential that may have been exposed even if the file is removed afterward.
- Re-run secret history scanning after remediation before making the repository public again.

## 12. Decisions to confirm at kickoff

Recommended defaults are shown first:

- **Cloudflare rollout:** all 22 repositories are connected and their custom domains have passed the serial HTTPS/title check.
- **UI standard:** use the TinyChaos parent palette and visual grammar as the source of truth while keeping each project’s unique scene and compatible accent.
- **Licenses:** standardize all 22 repositories under the MIT License; preserve valid existing MIT text and add the official text only where missing.
- **Canonical URLs:** use `https://<lowercase-repository>.sudarshantechlabs.com/` in `projects.json` and fallback metadata; retain GitHub Pages URLs as documented fallbacks.
- **Custom domains:** completed for TinyChaos plus all 21 child repositories.

## 13. Final release report template

```markdown
# TinyChaos Production Release Report — 2026-07-20

- Owner: Sudarshan Chaudhari
- Repositories public: __ / 22
- Shared UI checks and manual approvals: __ / 22
- GitHub Pages sites verified: __ / 22
- Cloudflare Pages custom domains verified: __ / 22
- Security findings: none / details
- Test failures: none / details
- Exceptions and deferred items:
- Parent release commit:
- Completion time (Asia/Bangkok):
```

## 14. Official references

- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages and public HTTPS submodules](https://docs.github.com/en/pages/getting-started-with-github-pages/using-submodules-with-github-pages)
- [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [Cloudflare Pages GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [Cloudflare Pages static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare Pages Git integration behavior](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
