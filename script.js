"use strict";

const GITHUB_USERNAME = "SUDARSHANCHAUDHARI";
const CUSTOM_DOMAIN_SUFFIX = "sudarshantechlabs.com";
const VALID_CATEGORIES = new Set([
  "Interface",
  "Objects",
  "Machines",
  "Characters",
  "Food",
  "Environment",
  "Nature",
  "Puzzle",
]);
const VALID_DIFFICULTIES = new Set(["Easy", "Medium"]);
const EXPECTED_REPOSITORIES = new Set([
  "ImpossibleLightBulb",
  "RunawayButton",
  "ShyDoorbell",
  "SnoozeEscape",
  "BrewLater",
  "TrashDash",
  "MoodSwitch",
  "FridgePatrol",
  "CookieGuard",
  "FiveMoreMinutes",
  "WindowWars",
  "LoginChase",
  "ElevatorDrama",
  "PaperMonster",
  "DramaPlant",
  "DismissMeNot",
  "UmbrellaProblems",
  "ShyMirror",
  "Keyception",
  "VolumeWar",
  "TheLastSlice",
]);

function customDemoUrl(repository) {
  return `https://${repository.toLowerCase()}.${CUSTOM_DOMAIN_SUFFIX}/`;
}

// Kept in this file so the catalogue also works when index.html is opened via file://.
const FALLBACK_PROJECTS = [
  [1, "Impossible Light Bulb", "ImpossibleLightBulb", "A hidden character keeps switching off the light whenever the user turns it on.", "Objects", "Medium", "4–6 hours", "Pull", true],
  [2, "Runaway Button", "RunawayButton", "A button moves, shrinks, hides, and changes shape to avoid being clicked.", "Interface", "Easy", "2–4 hours", "Click", true],
  [3, "Shy Doorbell", "ShyDoorbell", "A shy character peeks outside and hides whenever someone rings the doorbell.", "Characters", "Medium", "4–6 hours", "Click", false],
  [4, "Snooze Escape", "SnoozeEscape", "An alarm clock jumps, rolls, and runs away when the user tries to stop it.", "Objects", "Medium", "4–6 hours", "Click", true],
  [5, "Brew Later", "BrewLater", "A lazy coffee machine invents excuses instead of making coffee.", "Machines", "Easy", "3–5 hours", "Click", false],
  [6, "Trash Dash", "TrashDash", "A trash bin runs away whenever the user tries to drop a document into it.", "Interface", "Medium", "4–6 hours", "Drag", false],
  [7, "Mood Switch", "MoodSwitch", "A light switch controls everything in the room except the correct light.", "Objects", "Medium", "4–6 hours", "Switch", true],
  [8, "Fridge Patrol", "FridgePatrol", "A tiny character secretly rearranges and protects food inside a refrigerator.", "Characters", "Medium", "5–7 hours", "Open", false],
  [9, "Cookie Guard", "CookieGuard", "A cookie jar uses every possible trick to protect its final cookie.", "Food", "Medium", "4–6 hours", "Drag", true],
  [10, "Five More Minutes", "FiveMoreMinutes", "A sleepy computer refuses to wake up and keeps asking for more time.", "Machines", "Easy", "3–5 hours", "Click", false],
  [11, "Window Wars", "WindowWars", "A storm, curtains, birds, and tiny characters prevent a window from staying closed.", "Environment", "Medium", "4–6 hours", "Drag", false],
  [12, "Login Chase", "LoginChase", "A fake login button avoids the pointer and questions every login attempt.", "Interface", "Easy", "2–4 hours", "Click", true],
  [13, "Elevator Drama", "ElevatorDrama", "An elevator makes every simple floor request unnecessarily dramatic.", "Machines", "Medium", "5–7 hours", "Select", false],
  [14, "Paper Monster", "PaperMonster", "A printer eats, rejects, distorts, and throws documents instead of printing them.", "Machines", "Medium", "4–6 hours", "Click", false],
  [15, "Drama Plant", "DramaPlant", "A plant reacts dramatically whenever the user tries to water it.", "Nature", "Medium", "4–6 hours", "Drag", true],
  [16, "Dismiss Me Not", "DismissMeNot", "A notification moves, duplicates, and argues whenever the user tries to close it.", "Interface", "Easy", "3–5 hours", "Click", false],
  [17, "Umbrella Problems", "UmbrellaProblems", "An umbrella protects birds, puddles, and everything except its owner.", "Environment", "Medium", "4–6 hours", "Open", false],
  [18, "Shy Mirror", "ShyMirror", "A mirror reflection refuses to copy the person standing in front of it.", "Characters", "Medium", "5–7 hours", "Pointer", true],
  [19, "Keyception", "Keyception", "Every key unlocks another smaller and more unnecessary locked puzzle.", "Puzzle", "Medium", "5–7 hours", "Drag", false],
  [20, "Volume War", "VolumeWar", "A speaker fights back whenever the user tries to lower its volume.", "Interface", "Easy", "3–5 hours", "Slider", false],
  [21, "The Last Slice", "TheLastSlice", "Hands, cheese, and tiny characters fight over the final slice of pizza.", "Food", "Medium", "4–6 hours", "Drag", true],
].map(([id, name, repository, description, category, difficulty, buildTime, interaction, featured]) => ({
  id,
  name,
  repository,
  folder: repository,
  description,
  category,
  difficulty,
  buildTime,
  interaction,
  featured,
  status: "Complete",
  demoUrl: customDemoUrl(repository),
  repositoryUrl: `https://github.com/${GITHUB_USERNAME}/${repository}`,
}));

const CARD_ACCENTS = ["#ffd166", "#ff7e79", "#8da9ff", "#76dfba", "#d0b8ff", "#ff9f6e"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const elements = {
  filterForm: document.querySelector("#project-filters"),
  search: document.querySelector("#project-search"),
  category: document.querySelector("#category-filter"),
  difficulty: document.querySelector("#difficulty-filter"),
  sort: document.querySelector("#sort-projects"),
  grid: document.querySelector("#project-grid"),
  count: document.querySelector("#results-count"),
  empty: document.querySelector("#empty-state"),
  loadError: document.querySelector("#load-error"),
  surpriseResult: document.querySelector("#surprise-result"),
  surpriseName: document.querySelector("#surprise-name"),
  surpriseLink: document.querySelector("#surprise-link"),
  stats: document.querySelector("#collection-stats"),
};

let allProjects = [];
let visibleProjects = [];
let lastSurpriseId = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createFallbackCopy() {
  return FALLBACK_PROJECTS.map((project) => ({ ...project }));
}

async function loadProjectData() {
  // Browsers block local JSON fetches from file://; bypassing that known failure avoids a noisy console error.
  if (window.location.protocol === "file:") {
    return createFallbackCopy();
  }

  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error(`projects.json returned HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("[TinyChaos] projects.json could not be loaded; using embedded project metadata.", error);
    return createFallbackCopy();
  }
}

function validateProjects(projects) {
  if (!Array.isArray(projects)) {
    console.error("[TinyChaos] Project metadata must be an array. No project cards can be rendered.");
    return [];
  }

  const seenIds = new Set();
  const seenRepositories = new Set();
  const seenFolders = new Set();

  return projects.filter((project, index) => {
    const problems = [];
    const isObject = project !== null && typeof project === "object" && !Array.isArray(project);

    if (!isObject) {
      console.error(`[TinyChaos] Skipping project at index ${index}: entry must be an object.`);
      return false;
    }

    if (!Number.isInteger(project.id) || project.id < 1 || seenIds.has(project.id)) {
      problems.push("id must be a unique positive integer");
    }
    if (typeof project.repository !== "string" || !EXPECTED_REPOSITORIES.has(project.repository) || seenRepositories.has(project.repository)) {
      problems.push("repository must be an expected, unique PascalCase name");
    }
    if (typeof project.folder !== "string" || project.folder !== project.repository || seenFolders.has(project.folder)) {
      problems.push("folder must uniquely match repository exactly");
    }
    if (typeof project.name !== "string" || project.name.trim().length < 2) {
      problems.push("name must be a non-empty display title");
    }
    if (typeof project.description !== "string" || project.description.trim().length < 10) {
      problems.push("description is required");
    }
    if (!VALID_CATEGORIES.has(project.category)) {
      problems.push("category is invalid");
    }
    if (!VALID_DIFFICULTIES.has(project.difficulty)) {
      problems.push("difficulty is invalid");
    }
    if (typeof project.buildTime !== "string" || !/^\d+–\d+ hours$/.test(project.buildTime)) {
      problems.push("buildTime must use the “n–n hours” format");
    }
    if (typeof project.interaction !== "string" || project.interaction.trim() === "") {
      problems.push("interaction is required");
    }
    if (typeof project.featured !== "boolean") {
      problems.push("featured must be a boolean");
    }
    if (project.status !== "Complete") {
      problems.push("status must be Complete");
    }

    const expectedDemoUrl = customDemoUrl(project.repository);
    const expectedRepositoryUrl = `https://github.com/${GITHUB_USERNAME}/${project.repository}`;
    if (project.demoUrl !== expectedDemoUrl) {
      problems.push(`demoUrl must equal ${expectedDemoUrl}`);
    }
    if (project.repositoryUrl !== expectedRepositoryUrl) {
      problems.push(`repositoryUrl must equal ${expectedRepositoryUrl}`);
    }

    if (problems.length > 0) {
      const label = project.repository || project.name || `index ${index}`;
      console.error(`[TinyChaos] Skipping invalid project “${label}”: ${problems.join("; ")}.`, project);
      return false;
    }

    seenIds.add(project.id);
    seenRepositories.add(project.repository);
    seenFolders.add(project.folder);
    return true;
  });
}

function svgShell(project, content) {
  const titleId = `illustration-title-${project.id}`;
  return `
    <svg class="illustration-svg" viewBox="0 0 240 150" role="img" aria-labelledby="${titleId}">
      <title id="${titleId}">${escapeHtml(project.name)} illustration</title>
      ${content}
    </svg>`;
}

function projectIllustration(project) {
  const illustrations = {
    ImpossibleLightBulb: `
      <path d="M120 0v32"/><path class="dashed thin" d="M120 103v39"/>
      <path class="fill-paper" d="M83 69c0-23 16-39 37-39s37 16 37 39c0 18-13 24-18 39h-38c-5-15-18-21-18-39Z"/>
      <path d="M102 116h36M106 126h28M112 136h16"/><circle class="fill-ink" cx="109" cy="70" r="3"/><circle class="fill-ink" cx="132" cy="70" r="3"/><path d="M110 88q10 8 20 0"/>`,
    RunawayButton: `
      <path class="dashed thin" d="M18 118c42-5 30-64 74-54 29 7 31 52 70 35 25-11 17-49 58-55"/>
      <path d="m202 36 21 7-14 18"/><rect class="fill-paper" x="69" y="43" width="103" height="53" rx="14"/>
      <path d="M94 70h53"/><path d="m45 45-12-9M42 62H25M47 79l-14 9"/>`,
    ShyDoorbell: `
      <path class="fill-paper" d="M62 18h111v124H62z"/><path d="M75 31h82v111H75z"/><circle class="fill-ink" cx="143" cy="86" r="4"/>
      <path class="fill-accent" d="M77 62q22-19 43 0v57H77Z"/><circle class="fill-paper" cx="92" cy="75" r="5"/><circle class="fill-paper" cx="108" cy="75" r="5"/>
      <rect class="fill-paper" x="184" y="51" width="22" height="32" rx="10"/><circle class="fill-ink" cx="195" cy="67" r="4"/>`,
    SnoozeEscape: `
      <path d="m75 32-17-17M165 32l17-17M76 122l-11 17M164 122l11 17"/><circle class="fill-paper" cx="120" cy="79" r="53"/>
      <path d="M120 48v32l23 13"/><circle class="fill-accent" cx="120" cy="80" r="5"/><path d="M54 11 39 27M186 11l15 16"/>
      <path class="dashed thin" d="M26 125h34M180 125h35"/><path d="m48 116 12 9-12 9M192 116l-12 9 12 9"/>`,
    BrewLater: `
      <rect class="fill-paper" x="56" y="24" width="128" height="103" rx="8"/><path d="M71 49h98M83 65h72v27H83z"/>
      <path d="M101 92v13M139 92v13"/><path class="fill-accent" d="M91 105h58l-8 32H99Z"/><circle class="fill-ink" cx="78" cy="39" r="4"/>
      <path class="thin" d="M106 116c-7-8 7-8 0-16M124 116c-7-8 7-8 0-16"/><path d="m160 71 7 7 12-15"/>`,
    TrashDash: `
      <path class="fill-paper" d="m76 51 8 70h72l8-70Z"/><path d="M68 43h104M96 43l5-17h38l5 17"/><path d="M101 67v35M120 67v35M139 67v35"/>
      <path d="M91 121 72 139M147 121l21 18"/><path class="dashed thin" d="M26 114h35M179 114h37"/><path d="m49 105 12 9-12 9"/>`,
    MoodSwitch: `
      <rect class="fill-paper" x="43" y="38" width="62" height="86" rx="7"/><rect class="fill-accent" x="58" y="54" width="32" height="52" rx="16"/><path d="M74 55v23"/>
      <path d="M164 5v23"/><path class="fill-paper" d="M133 64c0-20 13-34 31-34s31 14 31 34c0 15-10 20-15 33h-32c-5-13-15-18-15-33Z"/>
      <path d="M150 104h29M154 114h21"/><path class="dashed thin" d="M111 81h15"/>`,
    FridgePatrol: `
      <rect class="fill-paper" x="68" y="13" width="104" height="129" rx="9"/><path d="M68 67h104M148 34v19M148 84v30"/>
      <path class="fill-accent" d="M86 83q19-17 38 0v43H86Z"/><circle class="fill-paper" cx="98" cy="94" r="4"/><circle class="fill-paper" cx="113" cy="94" r="4"/>
      <path d="M98 109q7 5 14 0"/><path class="thin" d="M80 136v6M160 136v6"/>`,
    CookieGuard: `
      <path class="fill-paper" d="M70 53h100l-9 82H79Z"/><path d="M62 53h116l-8-20H70Z"/><circle class="fill-accent" cx="120" cy="89" r="29"/>
      <circle class="fill-ink" cx="110" cy="76" r="3"/><circle class="fill-ink" cx="132" cy="82" r="3"/><circle class="fill-ink" cx="116" cy="101" r="3"/>
      <path d="M64 72 44 61M176 72l20-11"/><path d="m43 50 2 11-11 1M197 50l-2 11 11 1"/>`,
    FiveMoreMinutes: `
      <rect class="fill-paper" x="48" y="31" width="144" height="87" rx="8"/><path class="fill-ink" d="M63 46h114v57H63z"/>
      <path class="fill-paper" d="M89 77q14 11 28 0M133 77q14 11 28 0"/><path d="M120 118v17M91 135h58"/>
      <path class="thin" d="m180 18 9-10M195 26l14-2M178 6l4-4"/><text x="83" y="68" fill="#fff5df" stroke="none" font-size="18" font-family="monospace">Z z z</text>`,
    WindowWars: `
      <rect class="fill-paper" x="58" y="20" width="124" height="112"/><path d="M120 20v112M58 76h124"/>
      <path class="thin" d="m76 32-9 19M101 32 91 58M145 90l-10 23M171 89l-11 26"/>
      <path class="fill-accent" d="M82 87q13-17 26 0v34H82ZM134 40q13-17 26 0v25h-26Z"/><circle class="fill-paper" cx="93" cy="97" r="3"/><circle class="fill-paper" cx="99" cy="97" r="3"/>`,
    LoginChase: `
      <rect class="fill-paper" x="38" y="20" width="164" height="112" rx="10"/><path d="M62 48h87M62 68h116M62 87h73"/>
      <rect class="fill-accent" x="108" y="96" width="72" height="24" rx="7"/><path d="M129 108h31"/>
      <path class="dashed thin" d="M32 113c27 25 44-2 66 12"/><path d="m86 116 12 9-15 5"/>`,
    ElevatorDrama: `
      <rect class="fill-paper" x="52" y="14" width="136" height="128"/><path d="M120 33v109"/><path class="fill-accent" d="M65 34h50v108H65zM125 34h50v108h-50z"/>
      <path d="m97 77 14 11-14 11M143 77l-14 11 14 11"/><circle class="fill-paper" cx="205" cy="56" r="15"/><text x="200" y="62" fill="#15152a" stroke="none" font-size="18" font-family="monospace">?</text>`,
    PaperMonster: `
      <rect class="fill-paper" x="55" y="57" width="130" height="72" rx="8"/><path class="fill-white" d="M80 10h80v61H80z"/><path d="M91 25h58M91 38h45"/>
      <path class="fill-ink" d="M77 75h86l-12 24H89Z"/><path class="fill-paper" d="m95 86 9 9 10-9 10 9 10-9 10 9 10-9"/>
      <circle class="fill-accent" cx="77" cy="75" r="5"/><circle class="fill-accent" cx="164" cy="75" r="5"/><path d="M88 129v12M152 129v12"/>`,
    DramaPlant: `
      <path class="fill-paper" d="M84 92h72l-9 49H93Z"/><path d="M120 92V50"/><path class="fill-accent" d="M120 61c-27 1-34-20-25-33 19 0 28 9 25 33ZM121 77c27 1 34-20 25-33-19 0-28 9-25 33Z"/>
      <path d="M43 40h39l9 23-28 10Z"/><path d="m53 40 8-19h28l-7 19M90 55c21 3 18 25 34 24"/><path class="thin" d="m62 79-4 14M78 79l2 15"/>`,
    DismissMeNot: `
      <rect class="fill-paper" x="43" y="30" width="154" height="89" rx="12"/><circle class="fill-accent" cx="69" cy="59" r="13"/><path d="M94 50h67M94 66h48M60 91h115"/>
      <path d="m181 22 17 17M198 22l-17 17"/><rect class="fill-white" x="54" y="109" width="136" height="27" rx="8"/>
      <path class="dashed thin" d="M27 48H12M222 92h-15"/>`,
    UmbrellaProblems: `
      <path class="fill-accent" d="M44 76q76-84 152 0c-18-11-32 0-38 9-13-17-26-17-38 0-12-17-25-17-38 0-7-9-20-20-38-9Z"/>
      <path d="M120 34v85c0 25 33 25 33 2"/><path class="thin" d="M60 103c18-11 30-3 41 8M174 103c-18-11-30-3-41 8"/>
      <path class="fill-paper" d="m57 105 9-16 10 15ZM163 104l9-16 10 17Z"/>`,
    ShyMirror: `
      <rect class="fill-paper" x="119" y="13" width="84" height="126" rx="42"/><path class="thin" d="M131 46c16-16 34-13 50 0M132 111c18 13 33 13 50 0"/>
      <circle class="fill-ink" cx="147" cy="71" r="4"/><circle class="fill-ink" cx="177" cy="71" r="4"/><path class="fill-accent" d="M49 64q24-27 48 0v68H49Z"/>
      <circle class="fill-paper" cx="67" cy="78" r="4"/><circle class="fill-paper" cx="83" cy="78" r="4"/><path class="dashed thin" d="M103 84h11"/>`,
    Keyception: `
      <circle class="fill-paper" cx="73" cy="76" r="30"/><circle cx="73" cy="76" r="11"/><path d="M103 76h87M159 76v22M177 76v14"/>
      <rect class="fill-accent" x="130" y="15" width="67" height="49" rx="8"/><path d="M144 15V6c0-24 39-24 39 0v9"/><circle class="fill-paper" cx="164" cy="39" r="6"/>
      <path class="dashed thin" d="M39 114c33 24 72 21 94-3"/>`,
    VolumeWar: `
      <path class="fill-paper" d="M41 62h35l43-36v98L76 88H41Z"/><path d="M139 54q24 21 0 43M155 41q40 36 0 72"/>
      <path d="M34 133h172"/><path class="fill-ink" d="M38 127h104v12H38z"/><circle class="fill-accent" cx="142" cy="133" r="14"/>
      <path class="dashed thin" d="M179 131h29"/><path d="m196 122 12 9-12 9"/>`,
    TheLastSlice: `
      <path class="fill-accent" d="m120 20 69 116H51Z"/><path class="fill-paper" d="M68 105c35 16 69 16 104 0l17 31H51Z"/>
      <circle class="fill-ink" cx="116" cy="72" r="8"/><circle class="fill-ink" cx="144" cy="99" r="7"/><circle class="fill-ink" cx="93" cy="108" r="6"/>
      <path d="M52 57 18 69M188 57l34 12M35 58l-17 11 20 5M205 58l17 11-20 5"/>`,
  };

  return svgShell(project, illustrations[project.repository] || "");
}

function projectCard(project, index) {
  const classes = ["project-card"];
  if (project.featured) classes.push("is-featured");
  if (project.id === lastSurpriseId) classes.push("is-surprise");

  const number = String(project.id).padStart(2, "0");
  const accent = CARD_ACCENTS[(project.id - 1) % CARD_ACCENTS.length];

  return `
    <article
      class="${classes.join(" ")}"
      id="project-${project.id}"
      data-project-id="${project.id}"
      tabindex="-1"
      style="--card-accent: ${accent}; --card-index: ${index}"
    >
      <div class="card-art">
        <span class="project-number" aria-label="Project ${project.id} of 21">${number}</span>
        ${projectIllustration(project)}
      </div>
      <div class="card-content">
        <div class="card-kicker">
          <span class="tag">${escapeHtml(project.category)}</span>
          <span class="tag tag-difficulty">${escapeHtml(project.difficulty)}</span>
        </div>
        <h3>${escapeHtml(project.name)}</h3>
        <p class="card-description">${escapeHtml(project.description)}</p>
        <dl class="card-details">
          <div><dt>Interaction</dt><dd>${escapeHtml(project.interaction)}</dd></div>
          <div><dt>Build time</dt><dd>${escapeHtml(project.buildTime)}</dd></div>
        </dl>
        <div class="card-actions">
          <a
            class="card-link"
            href="${escapeHtml(project.demoUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live demo for ${escapeHtml(project.name)} in a new tab"
          >Live Demo <span aria-hidden="true">↗</span></a>
          <a
            class="card-link"
            href="${escapeHtml(project.repositoryUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code for ${escapeHtml(project.name)} in a new tab"
          >Source Code <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
}

function compareProjects(sortMode) {
  const originalOrder = (a, b) => a.id - b.id;
  const comparators = {
    original: originalOrder,
    name: (a, b) => a.name.localeCompare(b.name) || originalOrder(a, b),
    difficulty: (a, b) => ["Easy", "Medium"].indexOf(a.difficulty) - ["Easy", "Medium"].indexOf(b.difficulty) || originalOrder(a, b),
    buildTime: (a, b) => Number.parseInt(a.buildTime, 10) - Number.parseInt(b.buildTime, 10) || originalOrder(a, b),
    featured: (a, b) => Number(b.featured) - Number(a.featured) || originalOrder(a, b),
  };
  return comparators[sortMode] || originalOrder;
}

function getFilteredProjects() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const category = elements.category.value;
  const difficulty = elements.difficulty.value;

  return allProjects
    .filter((project) => {
      const searchableText = [
        project.name,
        project.repository,
        project.description,
        project.category,
        project.interaction,
      ].join(" ").toLocaleLowerCase();

      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesCategory = category === "All" || project.category === category;
      const matchesDifficulty = difficulty === "All" || project.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort(compareProjects(elements.sort.value));
}

function renderProjects() {
  visibleProjects = getFilteredProjects();
  elements.grid.innerHTML = visibleProjects.map(projectCard).join("");
  elements.grid.setAttribute("aria-busy", "false");

  const visibleCount = visibleProjects.length;
  const projectWord = visibleCount === 1 ? "project" : "projects";
  elements.count.textContent = `Showing ${visibleCount} of ${allProjects.length} ${projectWord}`;
  elements.empty.hidden = visibleCount !== 0;
  elements.grid.hidden = visibleCount === 0;
}

function renderStats() {
  const categoryCount = new Set(allProjects.map((project) => project.category)).size;
  const featuredCount = allProjects.filter((project) => project.featured).length;
  const interactionCount = new Set(allProjects.map((project) => project.interaction)).size;
  const values = [allProjects.length, categoryCount, featuredCount, interactionCount];

  elements.stats.querySelectorAll("dd").forEach((item, index) => {
    item.textContent = String(values[index]);
  });
}

function clearFilters(shouldFocus = true) {
  elements.filterForm.reset();
  renderProjects();
  if (shouldFocus) elements.search.focus();
}

function chooseSurprise() {
  if (allProjects.length === 0) return;

  const onlyVisibleProjectWasLastPick = visibleProjects.length === 1 && visibleProjects[0].id === lastSurpriseId;
  if (visibleProjects.length === 0 || onlyVisibleProjectWasLastPick) {
    clearFilters(false);
  }

  const candidates = visibleProjects.length > 1
    ? visibleProjects.filter((project) => project.id !== lastSurpriseId)
    : visibleProjects;
  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  if (!selected) return;

  lastSurpriseId = selected.id;
  elements.surpriseName.textContent = selected.name;
  elements.surpriseLink.href = selected.demoUrl;
  elements.surpriseLink.setAttribute("aria-label", `Open the ${selected.name} live demo in a new tab`);
  elements.surpriseResult.hidden = false;
  renderProjects();

  const selectedCard = document.querySelector(`[data-project-id="${selected.id}"]`);
  if (selectedCard) {
    selectedCard.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "center",
    });
    window.setTimeout(() => selectedCard.focus({ preventScroll: true }), prefersReducedMotion.matches ? 0 : 450);
  }
}

function bindEvents() {
  elements.filterForm.addEventListener("input", (event) => {
    if (event.target === elements.search) renderProjects();
  });

  elements.filterForm.addEventListener("change", (event) => {
    if (event.target.matches("select")) renderProjects();
  });

  document.addEventListener("click", (event) => {
    const surpriseButton = event.target.closest("[data-surprise]");
    if (surpriseButton) {
      chooseSurprise();
      return;
    }

    const clearButton = event.target.closest("[data-clear-filters]");
    if (clearButton) clearFilters();
  });
}

async function initializeGallery() {
  bindEvents();
  const rawProjects = await loadProjectData();
  allProjects = validateProjects(rawProjects);

  if (allProjects.length === 0) {
    elements.grid.setAttribute("aria-busy", "false");
    elements.grid.hidden = true;
    elements.count.textContent = "No projects available";
    elements.loadError.hidden = false;
    return;
  }

  renderStats();
  renderProjects();
}

initializeGallery().catch((error) => {
  console.error("[TinyChaos] The gallery could not be initialized.", error);
  elements.grid.setAttribute("aria-busy", "false");
  elements.grid.hidden = true;
  elements.count.textContent = "No projects available";
  elements.loadError.hidden = false;
});
