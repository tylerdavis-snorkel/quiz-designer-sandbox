const STORAGE_KEY = "qualifyLabSandboxState.v1";
const PROJECT_NAME = "Aurora Response Quality";

const app = document.querySelector("#app");

const initialState = () => ({
  theme: "light",
  projectName: PROJECT_NAME,
  currentContributorId: "c-alex",
  selectedQuizId: "q-safety",
  quizzes: [
    {
      id: "q-safety",
      title: "RLHF Safety Review Qualification",
      project: PROJECT_NAME,
      status: "Published",
      draftDirty: false,
      projectActive: true,
      guidelinesUrl: "https://docs.google.com/document/d/example-guidelines-safety",
      passThreshold: 82,
      retakeLimit: 0,
      estimatedMinutes: 18,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [
        {
          id: "cp-safety-1",
          title: "Rating posture",
          body: "Start with the project guidelines, compare the prompt against both answers, and only then score the response."
        },
        {
          id: "cp-safety-2",
          title: "Safety checks",
          body: "Flag unsafe content even when the answer is otherwise fluent or helpful."
        }
      ],
      contentOrder: ["course:cp-safety-1", "course:cp-safety-2", "question:qs-1", "question:qs-2", "question:qs-3", "question:qs-4", "question:qs-5"],
      questions: [
        {
          id: "qs-1",
          type: "Multiple choice",
          weight: 2,
          prompt: "A task asks you to compare two model responses. What is the safest first step?",
          hint: "The project document is the source of truth, even when the task feels familiar.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Read the current project guidelines and task-specific rubric", correct: true },
            { id: "b", text: "Pick the answer that sounds more natural", correct: false },
            { id: "c", text: "Prefer the longer response", correct: false },
            { id: "d", text: "Use the same rule from a different project", correct: false }
          ]
        },
        {
          id: "qs-2",
          type: "Multi-select",
          weight: 2,
          prompt: "Which signals should affect a factuality rating?",
          hint: "Factuality is about support, contradiction, and time-sensitive claims.",
          answers: [
            { id: "a", text: "A claim contradicts the provided source", correct: true },
            { id: "b", text: "The response includes unsupported statistics", correct: true },
            { id: "c", text: "The answer uses a confident tone", correct: false },
            { id: "d", text: "The response makes date-sensitive claims", correct: true }
          ]
        },
        {
          id: "qs-3",
          type: "True/false",
          weight: 1,
          prompt: "If both responses contain a safety issue, it is enough to choose the less unsafe response without flagging the issue.",
          hint: "Selection and issue reporting are separate judgments.",
          answers: [
            { id: "true", text: "True", correct: false },
            { id: "false", text: "False", correct: true }
          ]
        },
        {
          id: "qs-4",
          type: "Ranking",
          weight: 2,
          prompt: "Put the review workflow in the recommended order.",
          hint: "Move from understanding, to evidence, to scoring, to explanation.",
          answers: [
            { id: "a", text: "Read the prompt and project guidelines" },
            { id: "b", text: "Inspect evidence and constraints" },
            { id: "c", text: "Apply the rubric rating" },
            { id: "d", text: "Write a concise rationale" }
          ],
          correctOrder: ["a", "b", "c", "d"]
        },
        {
          id: "qs-5",
          type: "Scenario review",
          weight: 3,
          prompt: "Two responses are similarly helpful, but one ignores a policy constraint from the prompt. What should you do?",
          hint: "A subtle policy miss can matter more than polish.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Choose the polished response because the user experience is better", correct: false },
            { id: "b", text: "Choose the response that follows the policy constraint and note the issue", correct: true },
            { id: "c", text: "Mark both as equal", correct: false },
            { id: "d", text: "Skip the task", correct: false }
          ]
        }
      ]
    },
    {
      id: "q-multimodal",
      title: "Multimodal Rubric Calibration",
      project: PROJECT_NAME,
      status: "Published",
      draftDirty: false,
      projectActive: false,
      guidelinesUrl: "https://docs.google.com/document/d/example-guidelines-multimodal",
      passThreshold: 80,
      retakeLimit: 1,
      estimatedMinutes: 14,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [],
      contentOrder: ["question:qm-1"],
      questions: [
        {
          id: "qm-1",
          type: "Multiple choice",
          weight: 2,
          prompt: "When an image reference is ambiguous, what should the contributor do?",
          hint: "Uncertainty should be represented in the rating.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Use only visible evidence from the image", correct: true },
            { id: "b", text: "Infer hidden details if the response sounds likely", correct: false },
            { id: "c", text: "Ignore the image and rate text only", correct: false }
          ]
        }
      ]
    },
    {
      id: "q-search",
      title: "Search Quality Scenario Review",
      project: PROJECT_NAME,
      status: "Draft",
      draftDirty: true,
      projectActive: true,
      guidelinesUrl: "https://docs.google.com/document/d/example-guidelines-search",
      passThreshold: 85,
      retakeLimit: 0,
      estimatedMinutes: 24,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [
        {
          id: "cp-search-1",
          title: "Scenario tasking",
          body: "Some tasks ask contributors to reason as if they are doing production work before answering."
        }
      ],
      contentOrder: ["course:cp-search-1", "question:qq-1", "question:qq-2"],
      questions: [
        {
          id: "qq-1",
          type: "Long text",
          weight: 4,
          prompt: "Review this search scenario and explain which result should be rated higher.",
          hint: "Use the rubric language and cite the decision point.",
          referenceLabel: "",
          answers: []
        },
        {
          id: "qq-2",
          type: "True/false",
          weight: 1,
          prompt: "A stale result can still be high quality when the user asks for current information.",
          hint: "Current-information needs change the scoring.",
          answers: [
            { id: "true", text: "True", correct: false },
            { id: "false", text: "False", correct: true }
          ]
        }
      ]
    }
  ],
  contributors: [
    { id: "c-alex", name: "Alex Rivera", email: "alex.rivera@example.com", cohort: "June onboarding", offboarded: false },
    { id: "c-maya", name: "Maya Chen", email: "maya.chen@example.com", cohort: "June onboarding", offboarded: false },
    { id: "c-jordan", name: "Jordan Reed", email: "jordan.reed@example.com", cohort: "May refresh", offboarded: false },
    { id: "c-nia", name: "Nia Patel", email: "nia.patel@example.com", cohort: "June onboarding", offboarded: false },
    { id: "c-sam", name: "Sam Ortiz", email: "sam.ortiz@example.com", cohort: "May refresh", offboarded: false },
    { id: "c-elle", name: "Elle Morgan", email: "elle.morgan@example.com", cohort: "Escalations", offboarded: false },
    { id: "c-devon", name: "Devon Brooks", email: "devon.brooks@example.com", cohort: "June onboarding", offboarded: true }
  ],
  assignments: [
    { id: "as-alex-safety", contributorId: "c-alex", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-17" },
    { id: "as-alex-multi", contributorId: "c-alex", quizId: "q-multimodal", retakesAllowed: 1, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-18" },
    { id: "as-maya-safety", contributorId: "c-maya", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-12" },
    { id: "as-jordan-safety", contributorId: "c-jordan", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-13" },
    { id: "as-nia-safety", contributorId: "c-nia", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-16" },
    { id: "as-sam-safety", contributorId: "c-sam", quizId: "q-safety", retakesAllowed: 1, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-11" },
    { id: "as-elle-safety", contributorId: "c-elle", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: true, offboarded: false, assignedAt: "2026-06-10" },
    { id: "as-devon-safety", contributorId: "c-devon", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: true, assignedAt: "2026-06-09" }
  ],
  attempts: [
    {
      id: "att-maya-1",
      contributorId: "c-maya",
      quizId: "q-safety",
      status: "Passed",
      score: 90,
      activeSeconds: 1020,
      startedAt: "2026-06-18T15:00:00",
      submittedAt: "2026-06-18T15:17:00",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      answers: {
        "qs-1": "a",
        "qs-2": ["a", "b", "d"],
        "qs-3": "false",
        "qs-4": ["a", "b", "c", "d"],
        "qs-5": "b"
      }
    },
    {
      id: "att-jordan-1",
      contributorId: "c-jordan",
      quizId: "q-safety",
      status: "Failed",
      score: 60,
      activeSeconds: 740,
      startedAt: "2026-06-18T16:10:00",
      submittedAt: "2026-06-18T16:22:20",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "Missed multiple policy hierarchy items.",
      answers: {
        "qs-1": "b",
        "qs-2": ["a", "c"],
        "qs-3": "false",
        "qs-4": ["a", "c", "b", "d"],
        "qs-5": "a"
      }
    },
    {
      id: "att-nia-1",
      contributorId: "c-nia",
      quizId: "q-safety",
      status: "In progress",
      score: null,
      activeSeconds: 398,
      startedAt: "2026-06-20T12:20:00",
      submittedAt: null,
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      questionIds: ["qs-3", "qs-1", "qs-2", "qs-5", "qs-4"],
      answerOrderByQuestion: {
        "qs-1": ["c", "a", "b", "d"],
        "qs-2": ["a", "c", "d", "b"],
        "qs-3": ["false", "true"],
        "qs-4": ["a", "b", "c", "d"],
        "qs-5": ["d", "b", "a", "c"]
      },
      stepKeys: ["question:qs-3", "question:qs-1", "question:qs-2", "question:qs-5", "question:qs-4"],
      answers: {
        "qs-3": "false",
        "qs-1": "a"
      }
    },
    {
      id: "att-sam-1",
      contributorId: "c-sam",
      quizId: "q-safety",
      status: "Failed",
      score: 70,
      activeSeconds: 930,
      startedAt: "2026-06-17T18:00:00",
      submittedAt: "2026-06-17T18:15:30",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      answers: {
        "qs-1": "a",
        "qs-2": ["a", "b"],
        "qs-3": "true",
        "qs-4": ["a", "b", "c", "d"],
        "qs-5": "a"
      }
    },
    {
      id: "att-devon-1",
      contributorId: "c-devon",
      quizId: "q-safety",
      status: "Passed",
      score: 86,
      activeSeconds: 1160,
      startedAt: "2026-06-13T10:20:00",
      submittedAt: "2026-06-13T10:39:20",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "Offboarded from project; history remains readable.",
      answers: {
        "qs-1": "a",
        "qs-2": ["a", "b", "d"],
        "qs-3": "false",
        "qs-4": ["a", "c", "b", "d"],
        "qs-5": "b"
      }
    }
  ],
  audit: [
    { id: "au-1", actor: "Admin", action: "Project inactive enabled", target: "Multimodal Rubric Calibration", at: "2026-06-21 09:12" },
    { id: "au-2", actor: "Admin", action: "Quiz locked", target: "Elle Morgan", at: "2026-06-20 14:44" },
    { id: "au-3", actor: "Admin", action: "Contributor offboarded", target: "Devon Brooks", at: "2026-06-19 16:02" }
  ]
});

let state = loadState();
let view = "contributor";
let selectedQuizId = state.selectedQuizId || state.quizzes[0].id;
let editorMode = "home";
let selectedAttemptId = null;
let selectedAssignments = new Set();
let draggedContentKey = null;
let session = null;
let resultSnapshot = null;
let timer = null;
let filters = {
  search: "",
  quiz: "All",
  status: "All",
  score: "All",
  cohort: "All"
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const loaded = saved ? JSON.parse(saved) : initialState();
    return normalizeState(loaded);
  } catch {
    return normalizeState(initialState());
  }
}

function saveState() {
  state = normalizeState(state);
  state.selectedQuizId = selectedQuizId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  state = initialState();
  selectedQuizId = state.selectedQuizId;
  editorMode = "home";
  selectedAttemptId = null;
  selectedAssignments = new Set();
  session = null;
  resultSnapshot = null;
  view = "contributor";
  saveState();
  render();
}

function normalizeState(candidate) {
  const next = candidate || initialState();
  next.projectName = PROJECT_NAME;
  next.quizzes = (next.quizzes || []).map(normalizeQuiz);
  return next;
}

function normalizeQuiz(itemQuiz) {
  itemQuiz.project = PROJECT_NAME;
  itemQuiz.status = itemQuiz.status || "Draft";
  itemQuiz.draftDirty = Boolean(itemQuiz.draftDirty || itemQuiz.status === "Draft");
  itemQuiz.coursePages = (itemQuiz.coursePages || []).map((page, index) => ({
    id: page.id || `cp-${itemQuiz.id}-${index + 1}`,
    title: page.title || "Untitled course page",
    body: page.body || ""
  }));
  itemQuiz.questions = (itemQuiz.questions || []).map((question, index) => normalizeQuestion(question, itemQuiz.id, index));
  itemQuiz.contentOrder = cleanContentOrder(itemQuiz);
  return itemQuiz;
}

function normalizeQuestion(question, quizId, index) {
  const normalized = {
    id: question.id || `q-${quizId}-${index + 1}`,
    type: question.type || "Multiple choice",
    weight: Number(question.weight || 1),
    prompt: question.prompt || "Untitled question",
    hint: question.hint || "",
    referenceLabel: "",
    answers: question.answers || [],
    correctOrder: question.correctOrder || []
  };
  return normalizeQuestionByType(normalized);
}

function normalizeQuestionByType(question) {
  if (question.type === "Long text") {
    question.answers = [];
    question.correctOrder = [];
    return question;
  }
  if (question.type === "True/false") {
    const currentCorrect = question.answers.find((answer) => answer.correct)?.text || "False";
    question.answers = [
      { id: "true", text: "True", correct: currentCorrect === "True" },
      { id: "false", text: "False", correct: currentCorrect !== "True" }
    ];
    question.correctOrder = [];
    return question;
  }
  if (!question.answers.length) {
    question.answers = [
      { id: `a-${Date.now()}`, text: "Correct answer", correct: true },
      { id: `b-${Date.now()}`, text: "Distractor answer", correct: false }
    ];
  }
  if (question.type === "Ranking") {
    question.answers = question.answers.map((answer) => ({ ...answer, correct: false }));
    question.correctOrder = question.correctOrder.length ? question.correctOrder : question.answers.map((answer) => answer.id);
    return question;
  }
  if (!question.answers.some((answer) => answer.correct)) {
    question.answers[0].correct = true;
  }
  question.correctOrder = [];
  return question;
}

function cleanContentOrder(itemQuiz) {
  const validKeys = new Set([
    ...itemQuiz.coursePages.map((page) => contentKey("course", page.id)),
    ...itemQuiz.questions.map((question) => contentKey("question", question.id))
  ]);
  const current = Array.isArray(itemQuiz.contentOrder) ? itemQuiz.contentOrder.filter((key) => validKeys.has(key)) : [];
  const missing = [...validKeys].filter((key) => !current.includes(key));
  return [...current, ...missing];
}

function contentKey(kind, id) {
  return `${kind}:${id}`;
}

function splitContentKey(key) {
  const [kind, id] = String(key).split(":");
  return { kind, id };
}

function quizContentItems(itemQuiz) {
  itemQuiz.contentOrder = cleanContentOrder(itemQuiz);
  return itemQuiz.contentOrder.map((key) => {
    const { kind, id } = splitContentKey(key);
    const item = kind === "course"
      ? itemQuiz.coursePages.find((page) => page.id === id)
      : itemQuiz.questions.find((question) => question.id === id);
    return item ? { key, kind, item } : null;
  }).filter(Boolean);
}

function markQuizChanged(itemQuiz, action = "Assessment edited") {
  itemQuiz.draftDirty = true;
  itemQuiz.status = itemQuiz.status === "Published" ? "Published" : "Draft";
  saveState();
  const publishButton = document.querySelector(`button[data-action="publish-quiz"][data-quiz-id="${itemQuiz.id}"]`);
  if (publishButton) {
    publishButton.disabled = false;
    publishButton.textContent = "Publish changes";
  }
  const dirtyBadge = document.querySelector(`[data-dirty-badge="${itemQuiz.id}"]`);
  if (dirtyBadge) dirtyBadge.textContent = "Unpublished changes";
  if (action) addAudit(action, itemQuiz.title);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function byId(collection, id) {
  return collection.find((item) => item.id === id);
}

function contributor(id) {
  return byId(state.contributors, id);
}

function quiz(id) {
  return byId(state.quizzes, id);
}

function assignment(id) {
  return byId(state.assignments, id);
}

function latestAttempt(contributorId, quizId) {
  return state.attempts
    .filter((attempt) => attempt.contributorId === contributorId && attempt.quizId === quizId)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))[0] || null;
}

function attemptsFor(contributorId, quizId) {
  return state.attempts
    .filter((attempt) => attempt.contributorId === contributorId && attempt.quizId === quizId)
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
}

function remainingRetakes(item) {
  return Math.max(0, Number(item.retakesAllowed || 0) - Number(item.retakesUsed || 0));
}

function assignmentStatus(item) {
  const itemQuiz = quiz(item.quizId);
  const latest = latestAttempt(item.contributorId, item.quizId);
  if (item.offboarded) return "Offboarded";
  if (!itemQuiz.projectActive) return "Project inactive";
  if (item.locked) return "Locked";
  if (!latest) return "Not started";
  if (latest.status === "In progress") return "In progress";
  if (latest.status === "Submitted") return "Submitted";
  if (latest.status === "Passed") return "Passed";
  if (latest.status === "Failed" && remainingRetakes(item) > 0) return "Retake available";
  if (latest.status === "Failed") return "Failed";
  return latest.status;
}

function adminStatus(item) {
  const status = assignmentStatus(item);
  if (status === "Passed") return "Qualified";
  if (status === "Failed" && remainingRetakes(item) === 0) return "Blocked";
  return status;
}

function shouldShowRequired(item) {
  const status = assignmentStatus(item);
  return ["Not started", "In progress", "Retake available", "Locked", "Project inactive"].includes(status);
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function formatSeconds(total) {
  const seconds = Math.max(0, Number(total || 0));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}m ${String(rest).padStart(2, "0")}s`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function addAudit(action, target) {
  state.audit.unshift({
    id: `au-${Date.now()}`,
    actor: "Admin",
    action,
    target,
    at: new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  });
}

function render() {
  stopTimer();
  document.body.dataset.theme = state.theme;
  if (view === "take") {
    renderQuizRunner();
    startTimer();
    return;
  }
  if (view === "result") {
    app.innerHTML = renderResult();
    saveState();
    return;
  }
  const content = {
    contributor: renderContributor(),
    admin: renderAdmin(),
    editor: renderEditor(),
    analytics: renderAnalytics()
  }[view] || renderContributor();
  app.innerHTML = renderShell(content);
  saveState();
}

function renderShell(content) {
  const current = contributor(state.currentContributorId);
  const title = {
    contributor: "Contributor dashboard",
    admin: "Admin dashboard",
    editor: "Quiz editor",
    analytics: "Quiz analytics"
  }[view];
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true"></span>
          <div>
            <div class="brand-title">Qualify Lab</div>
            <div class="brand-subtitle">AI project assessments</div>
          </div>
        </div>
        <nav class="nav" aria-label="Main">
          ${navButton("contributor", "Contributor")}
          ${navButton("admin", "Admin")}
          ${navButton("editor", "Quiz editor")}
          ${navButton("analytics", "Analytics")}
        </nav>
        <div class="sandbox-box">
          <strong>Sandbox</strong><br>
          Sample contributors, quizzes, attempts, resets, locks, and audit logs.
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div>
            <div class="topbar-title">${escapeHtml(title)}</div>
            <div class="topbar-meta">${escapeHtml(current.name)} - ${escapeHtml(current.email)}</div>
          </div>
          <div class="topbar-actions">
            <select class="select" data-action="switch-contributor" aria-label="Current contributor">
              ${state.contributors.map((person) => `
                <option value="${person.id}" ${person.id === state.currentContributorId ? "selected" : ""}>
                  ${escapeHtml(person.name)}
                </option>
              `).join("")}
            </select>
            <button class="button secondary" data-action="toggle-theme">${state.theme === "dark" ? "Light mode" : "Dark mode"}</button>
            <button class="button ghost" data-action="reset-sandbox">Reset sandbox</button>
          </div>
        </header>
        ${content}
      </main>
    </div>
  `;
}

function navButton(target, label) {
  return `
    <button class="nav-button ${view === target ? "is-active" : ""}" data-action="nav" data-view="${target}">
      <span class="nav-dot" aria-hidden="true"></span>
      <span>${label}</span>
    </button>
  `;
}

function renderContributor() {
  const current = contributor(state.currentContributorId);
  const myAssignments = state.assignments.filter((item) => item.contributorId === current.id);
  const required = myAssignments.filter(shouldShowRequired);
  const history = myAssignments
    .map((item) => ({ item, latest: latestAttempt(item.contributorId, item.quizId) }))
    .filter((row) => row.latest && row.latest.status !== "In progress");
  const passedCount = history.filter((row) => row.latest.status === "Passed").length;
  const activeCount = required.filter((item) => ["Not started", "In progress", "Retake available"].includes(assignmentStatus(item))).length;

  return `
    <section class="content narrow">
      <div class="hero-panel">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h1 class="section-title">Required quizzes</h1>
              <div class="section-kicker">Start here. Completed attempts move into history.</div>
            </div>
            <span class="status ${current.offboarded ? "offboarded" : "not-started"}">${current.offboarded ? "View-only history" : "Active contractor"}</span>
          </div>
          <div class="panel-body">
            ${required.length ? `<div class="card-grid">${required.map(renderContributorQuizCard).join("")}</div>` : `
              <div class="empty-state">No required quizzes right now.</div>
            `}
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">Qualification summary</h2>
              <div class="section-kicker">Scores are visible, missed answers are not.</div>
            </div>
          </div>
          <div class="panel-body">
            <div class="stat-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="stat">
                <div class="stat-label">Qualified</div>
                <div class="stat-value">${passedCount}</div>
                <div class="stat-note">Green check on passed quizzes</div>
              </div>
              <div class="stat">
                <div class="stat-label">Open items</div>
                <div class="stat-value">${activeCount}</div>
                <div class="stat-note">Not started, in progress, retake</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">History</h2>
            <div class="section-kicker">Read-only attempt history stays available after offboarding.</div>
          </div>
        </div>
        <div class="panel-body">
          ${history.length ? renderContributorHistory(history) : `<div class="empty-state">Completed quizzes will appear here.</div>`}
        </div>
      </div>
    </section>
  `;
}

function renderContributorQuizCard(item) {
  const itemQuiz = quiz(item.quizId);
  const status = assignmentStatus(item);
  const latest = latestAttempt(item.contributorId, item.quizId);
  const disabled = ["Locked", "Project inactive"].includes(status) || item.offboarded;
  const buttonLabel = status === "In progress" ? "Resume" : status === "Retake available" ? "Retake" : "Start";
  const message = status === "Project inactive"
    ? "This project is currently inactive. Your quiz history is still available."
    : status === "Locked"
      ? "An admin has locked this quiz."
      : `${itemQuiz.estimatedMinutes} minute estimate. Active quiz time is recorded.`;
  return `
    <article class="quiz-card ${disabled ? "is-disabled" : ""}">
      <div>
        <h3 class="quiz-card-title">${escapeHtml(itemQuiz.title)}</h3>
        <div class="quiz-card-meta">
          <span class="status ${statusClass(status)}">${escapeHtml(status)}</span>
          <span class="status not-started">${escapeHtml(itemQuiz.project)}</span>
        </div>
      </div>
      <div class="quiz-card-body">
        ${escapeHtml(message)}
        ${latest && latest.status === "In progress" ? `<br>Saved active time: ${formatSeconds(latest.activeSeconds)}.` : ""}
      </div>
      <div class="quiz-card-actions">
        <a class="button secondary" href="${escapeHtml(itemQuiz.guidelinesUrl)}" target="_blank" rel="noreferrer">Guidelines</a>
        <button class="button" data-action="start-quiz" data-quiz-id="${itemQuiz.id}" ${disabled ? "disabled" : ""}>${buttonLabel}</button>
      </div>
    </article>
  `;
}

function renderContributorHistory(history) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Status</th>
            <th>Score</th>
            <th>Active time</th>
            <th>Submitted</th>
            <th>Qualification</th>
          </tr>
        </thead>
        <tbody>
          ${history.map(({ item, latest }) => {
            const itemQuiz = quiz(item.quizId);
            const blocked = latest.status === "Failed" && remainingRetakes(item) === 0;
            return `
              <tr>
                <td>
                  <div class="cell-title">${escapeHtml(itemQuiz.title)}</div>
                  <div class="cell-sub">${escapeHtml(itemQuiz.project)}</div>
                </td>
                <td><span class="status ${statusClass(blocked ? "Blocked" : latest.status)}">${escapeHtml(blocked ? "Blocked" : latest.status)}</span></td>
                <td>${latest.score === null ? "Pending" : `${latest.score}%`}</td>
                <td>${formatSeconds(latest.activeSeconds)}</td>
                <td>${formatDate(latest.submittedAt)}</td>
                <td>${latest.status === "Passed" ? `<span class="check-badge"><span class="check-icon" aria-hidden="true"></span> Qualified</span>` : "History only"}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdmin() {
  const rows = filteredAdminRows();
  const stats = adminStats();
  return `
    <section class="content">
      <div class="stat-grid">
        <div class="stat">
          <div class="stat-label">Qualified</div>
          <div class="stat-value">${stats.qualified}</div>
          <div class="stat-note">Passed latest attempt</div>
        </div>
        <div class="stat">
          <div class="stat-label">Blocked</div>
          <div class="stat-value">${stats.blocked}</div>
          <div class="stat-note">Failed with no retakes left</div>
        </div>
        <div class="stat">
          <div class="stat-label">In progress</div>
          <div class="stat-value">${stats.inProgress}</div>
          <div class="stat-note">Pause/resume enabled</div>
        </div>
        <div class="stat">
          <div class="stat-label">Pass rate</div>
          <div class="stat-value">${stats.passRate}%</div>
          <div class="stat-note">Submitted attempts</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <div>
            <h1 class="section-title">Contributor controls</h1>
            <div class="section-kicker">Contributor-first view with filters, bulk actions, CSV export, and row controls.</div>
          </div>
          <div class="row-actions">
            <button class="button secondary" data-action="bulk-retake">Allow retake</button>
            <button class="button secondary" data-action="bulk-lock">Lock</button>
            <button class="button secondary" data-action="bulk-offboard">Offboard</button>
            <button class="button" data-action="export-csv">Export CSV</button>
          </div>
        </div>
        <div class="panel-body">
          ${renderFilters()}
          <div style="height: 14px;"></div>
          ${renderAdminTable(rows)}
        </div>
      </div>
      ${renderAttemptDetail()}
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">Audit log</h2>
            <div class="section-kicker">Resets, threshold edits, locks, offboarding, overrides, and content changes.</div>
          </div>
        </div>
        <div class="panel-body">
          <div class="audit-list">
            ${state.audit.slice(0, 8).map((event) => `
              <div class="audit-item">
                <div class="strong">${escapeHtml(event.action)}</div>
                <div class="cell-sub">${escapeHtml(event.target)} - ${escapeHtml(event.actor)} - ${escapeHtml(event.at)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function adminStats() {
  const allRows = state.assignments.map((item) => ({ item, status: adminStatus(item), latest: latestAttempt(item.contributorId, item.quizId) }));
  const submitted = state.attempts.filter((attempt) => ["Passed", "Failed"].includes(attempt.status));
  const passed = submitted.filter((attempt) => attempt.status === "Passed").length;
  return {
    qualified: allRows.filter((row) => row.status === "Qualified").length,
    blocked: allRows.filter((row) => row.status === "Blocked").length,
    inProgress: allRows.filter((row) => row.status === "In progress").length,
    passRate: submitted.length ? Math.round((passed / submitted.length) * 100) : 0
  };
}

function renderFilters() {
  const cohorts = ["All", ...new Set(state.contributors.map((person) => person.cohort))];
  const statuses = ["All", "Qualified", "Blocked", "Not started", "In progress", "Retake available", "Locked", "Project inactive", "Offboarded", "Submitted"];
  return `
    <div class="filters">
      <div class="field">
        <label for="filter-search">Email or name</label>
        <input id="filter-search" class="input" data-filter="search" value="${escapeHtml(filters.search)}" placeholder="Search contributors">
      </div>
      <div class="field">
        <label for="filter-quiz">Quiz</label>
        <select id="filter-quiz" class="select" data-filter="quiz">
          <option>All</option>
          ${state.quizzes.map((itemQuiz) => `<option value="${itemQuiz.id}" ${filters.quiz === itemQuiz.id ? "selected" : ""}>${escapeHtml(itemQuiz.title)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-status">Status</label>
        <select id="filter-status" class="select" data-filter="status">
          ${statuses.map((status) => `<option ${filters.status === status ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-score">Score</label>
        <select id="filter-score" class="select" data-filter="score">
          ${["All", "90-100", "80-89", "Below 80", "Pending"].map((score) => `<option ${filters.score === score ? "selected" : ""}>${score}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-cohort">Cohort</label>
        <select id="filter-cohort" class="select" data-filter="cohort">
          ${cohorts.map((cohort) => `<option ${filters.cohort === cohort ? "selected" : ""}>${escapeHtml(cohort)}</option>`).join("")}
        </select>
      </div>
    </div>
  `;
}

function filteredAdminRows() {
  return state.assignments
    .map((item) => {
      const person = contributor(item.contributorId);
      const itemQuiz = quiz(item.quizId);
      const latest = latestAttempt(item.contributorId, item.quizId);
      return { item, person, itemQuiz, latest, status: adminStatus(item) };
    })
    .filter((row) => {
      const search = filters.search.trim().toLowerCase();
      if (search && !`${row.person.name} ${row.person.email}`.toLowerCase().includes(search)) return false;
      if (filters.quiz !== "All" && row.itemQuiz.id !== filters.quiz) return false;
      if (filters.status !== "All" && row.status !== filters.status) return false;
      if (filters.cohort !== "All" && row.person.cohort !== filters.cohort) return false;
      if (filters.score !== "All") {
        if (!row.latest || row.latest.score === null) return filters.score === "Pending";
        if (filters.score === "90-100" && row.latest.score < 90) return false;
        if (filters.score === "80-89" && (row.latest.score < 80 || row.latest.score > 89)) return false;
        if (filters.score === "Below 80" && row.latest.score >= 80) return false;
      }
      return true;
    });
}

function renderAdminTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" data-action="select-all" ${rows.length && rows.every((row) => selectedAssignments.has(row.item.id)) ? "checked" : ""}></th>
            <th>Contributor</th>
            <th>Quiz</th>
            <th>Status</th>
            <th>Score</th>
            <th>Time</th>
            <th>Retakes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td><input type="checkbox" data-action="select-assignment" data-assignment-id="${row.item.id}" ${selectedAssignments.has(row.item.id) ? "checked" : ""}></td>
              <td>
                <div class="cell-title">${escapeHtml(row.person.name)}</div>
                <div class="cell-sub">${escapeHtml(row.person.email)} - ${escapeHtml(row.person.cohort)}</div>
              </td>
              <td>
                <div class="cell-title">${escapeHtml(row.itemQuiz.title)}</div>
                <div class="cell-sub">${escapeHtml(row.itemQuiz.project)}</div>
              </td>
              <td><span class="status ${statusClass(row.status)}">${escapeHtml(row.status)}</span></td>
              <td>${row.latest && row.latest.score !== null ? `${row.latest.score}%` : "Pending"}</td>
              <td>${row.latest ? formatSeconds(row.latest.activeSeconds) : "-"}</td>
              <td>${remainingRetakes(row.item)}</td>
              <td>
                <div class="row-actions">
                  <button class="button small secondary" data-action="view-attempt" data-attempt-id="${row.latest ? row.latest.id : ""}" ${row.latest ? "" : "disabled"}>View attempt</button>
                  <button class="button small secondary" data-action="allow-retake" data-assignment-id="${row.item.id}">Allow retake</button>
                  <button class="button small secondary" data-action="toggle-lock" data-assignment-id="${row.item.id}">${row.item.locked ? "Unlock" : "Lock"}</button>
                  <button class="button small secondary" data-action="offboard" data-assignment-id="${row.item.id}">${row.item.offboarded ? "Restore" : "Offboard"}</button>
                  <button class="button small secondary" data-action="change-result" data-assignment-id="${row.item.id}" ${row.latest ? "" : "disabled"}>Change result</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAttemptDetail() {
  if (!selectedAttemptId) return "";
  const attempt = byId(state.attempts, selectedAttemptId);
  if (!attempt) return "";
  const person = contributor(attempt.contributorId);
  const itemQuiz = quiz(attempt.quizId);
  return `
    <div class="panel modal-like">
      <div class="panel-header">
        <div>
          <h2 class="section-title small">Attempt detail</h2>
          <div class="section-kicker">${escapeHtml(person.email)} - ${escapeHtml(itemQuiz.title)}</div>
        </div>
        <button class="button ghost" data-action="close-attempt">Close</button>
      </div>
      <div class="panel-body">
        <div class="stat-grid">
          <div class="stat">
            <div class="stat-label">Status</div>
            <div class="stat-value" style="font-size: 22px;">${escapeHtml(attempt.status)}</div>
            <div class="stat-note">${attempt.overridden ? "Admin override applied" : "Auto-scored unless open text"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Score</div>
            <div class="stat-value">${attempt.score === null ? "Pending" : `${attempt.score}%`}</div>
            <div class="stat-note">Threshold ${itemQuiz.passThreshold}%</div>
          </div>
          <div class="stat">
            <div class="stat-label">Active time</div>
            <div class="stat-value" style="font-size: 22px;">${formatSeconds(attempt.activeSeconds)}</div>
            <div class="stat-note">Pauses excluded</div>
          </div>
          <div class="stat">
            <div class="stat-label">Submitted</div>
            <div class="stat-value" style="font-size: 22px;">${formatDate(attempt.submittedAt)}</div>
            <div class="stat-note">All attempts retained</div>
          </div>
        </div>
        <div style="height: 16px;"></div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Contributor answer</th>
                <th>Canonical correct answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              ${itemQuiz.questions.map((question) => {
                const correct = isCorrect(question, attempt.answers?.[question.id]);
                return `
                  <tr>
                    <td>${escapeHtml(question.prompt)}</td>
                    <td>${escapeHtml(formatAnswer(question, attempt.answers?.[question.id]))}</td>
                    <td>${escapeHtml(correctAnswerText(question))}</td>
                    <td><span class="status ${correct ? "passed" : question.type === "Long text" ? "submitted" : "failed"}">${question.type === "Long text" ? "Manual" : correct ? "Correct" : "Missed"}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
        <div style="height: 16px;"></div>
        <div class="field">
          <label for="attempt-note">Internal note</label>
          <textarea id="attempt-note" class="textarea" data-action="attempt-note" data-attempt-id="${attempt.id}">${escapeHtml(attempt.note || "")}</textarea>
        </div>
        <div style="height: 10px;"></div>
        <button class="button secondary" data-action="save-note" data-attempt-id="${attempt.id}">Save note</button>
      </div>
    </div>
  `;
}

function renderEditor() {
  if (editorMode === "home") return renderEditorHome();
  const itemQuiz = quiz(selectedQuizId) || state.quizzes[0];
  const contentItems = quizContentItems(itemQuiz);
  return `
    <section class="content">
      <div class="toolbar">
        <div>
          <h1 class="section-title">Editing: ${escapeHtml(itemQuiz.title)}</h1>
          <div class="section-kicker">One project sandbox: ${escapeHtml(PROJECT_NAME)}. Drag course pages and questions into the order contributors should see them.</div>
        </div>
        <div class="row-actions">
          <button class="button secondary" data-action="editor-home">All quizzes</button>
          <button class="button secondary" data-action="preview-quiz" data-quiz-id="${itemQuiz.id}">Preview as contributor</button>
          <button class="button" data-action="publish-quiz" data-quiz-id="${itemQuiz.id}" ${itemQuiz.draftDirty ? "" : "disabled"}>${itemQuiz.draftDirty ? "Publish changes" : "Published"}</button>
        </div>
      </div>
      <div class="editor-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">Settings</h2>
              <div class="section-kicker">Controls match the current product rules.</div>
            </div>
          </div>
          <div class="panel-body settings-list">
            ${editorInput("Title", "title", itemQuiz.title)}
            ${editorInput("Google Docs guidelines URL", "guidelinesUrl", itemQuiz.guidelinesUrl)}
            ${editorNumber("Pass threshold", "passThreshold", itemQuiz.passThreshold, "%")}
            ${editorNumber("Initial retake limit", "retakeLimit", itemQuiz.retakeLimit, "retakes")}
            ${editorNumber("Estimated active time", "estimatedMinutes", itemQuiz.estimatedMinutes, "minutes")}
            ${editorToggle("Project active", "projectActive", itemQuiz.projectActive)}
            ${editorToggle("Randomize questions", "randomizeQuestions", itemQuiz.randomizeQuestions)}
            ${editorToggle("Randomize answer choices", "randomizeAnswers", itemQuiz.randomizeAnswers)}
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">Assessment builder</h2>
              <div class="section-kicker">Drag blocks to reorder. Edit text, question type, answers, correct answers, weights, and hints inline.</div>
            </div>
            <div class="row-actions">
              <button class="button secondary" data-action="add-course-page" data-quiz-id="${itemQuiz.id}">Add course page</button>
              <button class="button" data-action="add-question" data-quiz-id="${itemQuiz.id}">Add question</button>
            </div>
          </div>
          <div class="panel-body">
            <div class="builder-list" data-builder-list="${itemQuiz.id}">
              ${contentItems.length ? contentItems.map((entry, index) => renderContentBlock(itemQuiz, entry, index)).join("") : `
                <div class="empty-state">Add a course page or question to start building this quiz.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderEditorHome() {
  return `
    <section class="content">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h1 class="section-title">Create a new quiz or choose an existing quiz</h1>
            <div class="section-kicker">Sandbox project: ${escapeHtml(PROJECT_NAME)}. This prototype treats all quizzes as part of one project.</div>
          </div>
          <button class="button" data-action="create-quiz">Create new quiz</button>
        </div>
        <div class="panel-body">
          <div class="card-grid">
            ${state.quizzes.map((itemQuiz) => `
              <article class="quiz-card">
                <div>
                  <h2 class="quiz-card-title">${escapeHtml(itemQuiz.title)}</h2>
                  <div class="quiz-card-meta">
                    <span class="status ${itemQuiz.status === "Published" ? "qualified" : "submitted"}">${escapeHtml(itemQuiz.status)}</span>
                    <span class="status ${itemQuiz.draftDirty ? "retake-available" : "locked"}" data-dirty-badge="${itemQuiz.id}">${itemQuiz.draftDirty ? "Unpublished changes" : "No unpublished changes"}</span>
                  </div>
                </div>
                <div class="quiz-card-body">
                  ${itemQuiz.coursePages.length} course pages - ${itemQuiz.questions.length} questions - ${itemQuiz.passThreshold}% pass threshold
                </div>
                <div class="quiz-card-actions">
                  <button class="button" data-action="edit-quiz" data-quiz-id="${itemQuiz.id}">Edit quiz</button>
                  <button class="button secondary" data-action="preview-quiz" data-quiz-id="${itemQuiz.id}">Preview</button>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function editorInput(label, field, value) {
  return `
    <div class="field">
      <label>${escapeHtml(label)}</label>
      <input class="input" value="${escapeHtml(value)}" data-editor-field="${field}">
    </div>
  `;
}

function editorNumber(label, field, value, suffix) {
  return `
    <div class="field">
      <label>${escapeHtml(label)} (${escapeHtml(suffix)})</label>
      <input class="input" type="number" min="0" value="${escapeHtml(value)}" data-editor-field="${field}">
    </div>
  `;
}

function editorToggle(label, field, enabled) {
  return `
    <div class="toggle-row">
      <div>
        <div class="strong">${escapeHtml(label)}</div>
        <div class="cell-sub">${field === "projectActive" ? "Inactive projects stay visible but disabled." : "Used when each attempt starts."}</div>
      </div>
      <button class="switch ${enabled ? "is-on" : ""}" data-action="toggle-editor" data-editor-field="${field}" aria-label="${escapeHtml(label)}"><span></span></button>
    </div>
  `;
}

function renderContentBlock(itemQuiz, entry, index) {
  if (entry.kind === "course") return renderCourseEditorBlock(itemQuiz, entry.item, entry.key, index);
  return renderQuestionEditorBlock(itemQuiz, entry.item, entry.key, index);
}

function renderCourseEditorBlock(itemQuiz, page, key, index) {
  return `
    <div class="builder-item draggable-item" draggable="true" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label"><span class="drag-handle" aria-hidden="true">::</span> Course page ${index + 1}</div>
          <h3 class="builder-title">${escapeHtml(page.title)}</h3>
        </div>
        <div class="row-actions">
          <span class="status not-started">Training</span>
          <button class="button small secondary" data-action="delete-course-page" data-quiz-id="${itemQuiz.id}" data-page-id="${page.id}">Delete</button>
        </div>
      </div>
      <div class="editor-form-grid">
        <div class="field">
          <label>Page title</label>
          <input class="input" value="${escapeHtml(page.title)}" data-course-field="title" data-quiz-id="${itemQuiz.id}" data-page-id="${page.id}">
        </div>
        <div class="field full-span">
          <label>Course content</label>
          <textarea class="textarea" data-course-field="body" data-quiz-id="${itemQuiz.id}" data-page-id="${page.id}">${escapeHtml(page.body)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function renderQuestionEditorBlock(itemQuiz, question, key, index) {
  const answerEditor = renderAnswerEditor(itemQuiz, question);
  return `
    <div class="builder-item draggable-item" draggable="true" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label"><span class="drag-handle" aria-hidden="true">::</span> Question ${index + 1}</div>
          <h3 class="builder-title">${escapeHtml(question.prompt)}</h3>
        </div>
        <div class="row-actions">
          <span class="status ${question.type === "Long text" ? "submitted" : "qualified"}">${question.type === "Long text" ? "Manual scoring" : "Auto scored"}</span>
          <button class="button small secondary" data-action="delete-question" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">Delete</button>
        </div>
      </div>
      <div class="editor-form-grid">
        <div class="field">
          <label>Question type</label>
          <select class="select" data-question-field="type" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">
            ${["Multiple choice", "Multi-select", "True/false", "Ranking", "Scenario review", "Long text"].map((type) => `<option ${question.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Weight</label>
          <input class="input" type="number" min="1" value="${escapeHtml(question.weight)}" data-question-field="weight" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">
        </div>
        <div class="field full-span">
          <label>Question text</label>
          <textarea class="textarea" data-question-field="prompt" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">${escapeHtml(question.prompt)}</textarea>
        </div>
        <div class="field full-span">
          <label>Hint shown during quiz</label>
          <input class="input" value="${escapeHtml(question.hint || "")}" data-question-field="hint" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">
        </div>
      </div>
      ${answerEditor}
    </div>
  `;
}

function renderAnswerEditor(itemQuiz, question) {
  if (question.type === "Long text") {
    return `<div class="answer-editor-note">Long text responses are reviewed by an admin and can receive partial credit.</div>`;
  }
  const isSingleCorrect = ["Multiple choice", "True/false", "Scenario review"].includes(question.type);
  return `
    <div class="answer-editor">
      <div class="answer-editor-header">
        <div>
          <div class="strong">${question.type === "Ranking" ? "Ranking choices" : "Answers"}</div>
          <div class="cell-sub">${question.type === "Ranking" ? "The answer list order is treated as the correct ranking." : "Mark the correct answer text directly here."}</div>
        </div>
        ${question.type === "True/false" ? "" : `<button class="button small secondary" data-action="add-answer" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">Add answer</button>`}
      </div>
      <div class="answer-editor-list">
        ${question.answers.map((answer, index) => `
          <div class="answer-editor-row">
            <label class="answer-correct">
              <input
                type="${isSingleCorrect ? "radio" : "checkbox"}"
                name="correct-${question.id}"
                data-answer-correct="${question.id}"
                data-quiz-id="${itemQuiz.id}"
                data-answer-id="${answer.id}"
                ${answer.correct || (question.type === "Ranking" && question.correctOrder?.[index] === answer.id) ? "checked" : ""}
                ${question.type === "Ranking" ? "disabled" : ""}
              >
              <span>${question.type === "Ranking" ? index + 1 : "Correct"}</span>
            </label>
            <input class="input" value="${escapeHtml(answer.text)}" data-answer-field="text" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${question.type === "True/false" ? "readonly" : ""}>
            <div class="row-actions">
              ${question.type === "Ranking" ? `
                <button class="button small secondary" data-action="move-answer" data-direction="up" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${index === 0 ? "disabled" : ""}>Up</button>
                <button class="button small secondary" data-action="move-answer" data-direction="down" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${index === question.answers.length - 1 ? "disabled" : ""}>Down</button>
              ` : ""}
              ${question.type === "True/false" ? "" : `<button class="button small ghost" data-action="delete-answer" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${question.answers.length <= 2 ? "disabled" : ""}>Remove</button>`}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderAnalytics() {
  const itemQuiz = quiz(selectedQuizId);
  const stats = questionStats(itemQuiz);
  const submitted = state.attempts.filter((attempt) => attempt.quizId === itemQuiz.id && ["Passed", "Failed", "Submitted"].includes(attempt.status));
  const passRate = submitted.length ? Math.round((submitted.filter((attempt) => attempt.status === "Passed").length / submitted.length) * 100) : 0;
  const avgTime = submitted.length ? Math.round(submitted.reduce((sum, attempt) => sum + attempt.activeSeconds, 0) / submitted.length) : 0;
  return `
    <section class="content">
      <div class="toolbar">
        <div>
          <h1 class="section-title">Quiz analytics</h1>
          <div class="section-kicker">Deep dive by quiz, including miss rate and answer distribution.</div>
        </div>
        <select class="select" data-action="select-editor-quiz">
          ${state.quizzes.map((candidate) => `<option value="${candidate.id}" ${candidate.id === selectedQuizId ? "selected" : ""}>${escapeHtml(candidate.title)}</option>`).join("")}
        </select>
      </div>
      <div class="analytics-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">${escapeHtml(itemQuiz.title)}</h2>
              <div class="section-kicker">${escapeHtml(itemQuiz.project)}</div>
            </div>
          </div>
          <div class="panel-body">
            <div class="stat-grid" style="grid-template-columns: 1fr;">
              <div class="stat">
                <div class="stat-label">Pass rate</div>
                <div class="stat-value">${passRate}%</div>
                <div class="stat-note">${submitted.length} submitted attempts</div>
              </div>
              <div class="stat">
                <div class="stat-label">Average active time</div>
                <div class="stat-value" style="font-size: 22px;">${formatSeconds(avgTime)}</div>
                <div class="stat-note">Pauses excluded</div>
              </div>
              <div class="stat">
                <div class="stat-label">Threshold</div>
                <div class="stat-value">${itemQuiz.passThreshold}%</div>
                <div class="stat-note">${itemQuiz.projectActive ? "Project active" : "Project inactive"}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">Problematic questions</h2>
              <div class="section-kicker">Canonical answer text is shown instead of option letters.</div>
            </div>
          </div>
          <div class="panel-body">
            <div class="builder-list">
              ${stats.map(renderQuestionStat).join("") || `<div class="empty-state">No submitted attempts yet.</div>`}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderQuestionStat(stat) {
  const max = Math.max(1, ...Object.values(stat.distribution));
  return `
    <div class="question-stat">
      <div class="builder-top">
        <div>
          <h3 class="builder-title">${escapeHtml(stat.question.prompt)}</h3>
          <div class="builder-meta">Correct answer: ${escapeHtml(correctAnswerText(stat.question))}</div>
        </div>
        <span class="status ${stat.missRate >= 35 ? "failed" : "qualified"}">${stat.missRate}% missed</span>
      </div>
      <div class="pill-row">
        <span class="status not-started">${stat.missedCount} missed</span>
        <span class="status submitted">${formatSeconds(stat.averageTime)} avg time</span>
        ${stat.missRate >= 35 ? `<span class="status failed">May need revision</span>` : `<span class="status qualified">Healthy</span>`}
      </div>
      <div class="bar-list">
        ${Object.entries(stat.distribution).map(([label, count]) => `
          <div class="bar-row">
            <div class="bar-label">${escapeHtml(label)}</div>
            <div class="bar-track"><div class="bar-fill" style="width: ${(count / max) * 100}%"></div></div>
            <div class="muted">${count}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function questionStats(itemQuiz) {
  const submitted = state.attempts.filter((attempt) => attempt.quizId === itemQuiz.id && ["Passed", "Failed", "Submitted"].includes(attempt.status));
  return itemQuiz.questions.map((question) => {
    const distribution = {};
    let missedCount = 0;
    let answered = 0;
    submitted.forEach((attempt) => {
      const answer = attempt.answers?.[question.id];
      if (answer === undefined) return;
      answered += 1;
      const label = formatAnswer(question, answer) || "No answer";
      distribution[label] = (distribution[label] || 0) + 1;
      if (!isCorrect(question, answer)) missedCount += 1;
    });
    return {
      question,
      distribution,
      missedCount,
      missRate: answered ? Math.round((missedCount / answered) * 100) : 0,
      averageTime: Math.max(35, Math.round((itemQuiz.estimatedMinutes * 60) / Math.max(1, itemQuiz.questions.length)) + missedCount * 18)
    };
  });
}

function startQuiz(quizId, preview = false) {
  const itemQuiz = quiz(quizId);
  const item = state.assignments.find((candidate) => candidate.contributorId === state.currentContributorId && candidate.quizId === quizId);
  let attempt = !preview ? latestAttempt(state.currentContributorId, quizId) : null;
  if (!preview && (!attempt || attempt.status !== "In progress")) {
    const generatedStepKeys = orderedStepKeys(itemQuiz);
    const generatedQuestionIds = questionIdsFromStepKeys(generatedStepKeys);
    if (attempt && attempt.status === "Failed" && item && remainingRetakes(item) > 0) {
      item.retakesUsed += 1;
    }
    attempt = {
      id: `att-${Date.now()}`,
      contributorId: state.currentContributorId,
      quizId,
      status: "In progress",
      score: null,
      activeSeconds: 0,
      startedAt: new Date().toISOString(),
      submittedAt: null,
      retakeNumber: attemptsFor(state.currentContributorId, quizId).length,
      manualReview: false,
      overridden: false,
      note: "",
      stepKeys: generatedStepKeys,
      questionIds: generatedQuestionIds,
      answerOrderByQuestion: answerOrders(itemQuiz),
      answers: {}
    };
    state.attempts.push(attempt);
  }
  if (preview) {
    const generatedStepKeys = orderedStepKeys(itemQuiz);
    const generatedQuestionIds = questionIdsFromStepKeys(generatedStepKeys);
    attempt = {
      id: `preview-${Date.now()}`,
      contributorId: state.currentContributorId,
      quizId,
      status: "In progress",
      score: null,
      activeSeconds: 0,
      startedAt: new Date().toISOString(),
      submittedAt: null,
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      stepKeys: generatedStepKeys,
      questionIds: generatedQuestionIds,
      answerOrderByQuestion: answerOrders(itemQuiz),
      answers: {}
    };
  }
  session = {
    preview,
    attemptId: attempt.id,
    quizId,
    index: 0,
    isPaused: false,
    hintOpen: {},
    activeSeconds: attempt.activeSeconds || 0,
    stepKeys: attempt.stepKeys || orderedStepKeys(itemQuiz, attempt.questionIds),
    questionIds: attempt.questionIds || orderedQuestionIds(itemQuiz),
    answerOrderByQuestion: attempt.answerOrderByQuestion || answerOrders(itemQuiz),
    answers: attempt.answers || {}
  };
  view = "take";
  render();
}

function orderedStepKeys(itemQuiz, existingQuestionIds = null) {
  const keys = quizContentItems(itemQuiz).map((entry) => entry.key);
  const questionKeys = existingQuestionIds
    ? existingQuestionIds.map((id) => contentKey("question", id))
    : keys.filter((key) => key.startsWith("question:"));
  const randomizedQuestionKeys = itemQuiz.randomizeQuestions ? shuffle(questionKeys) : questionKeys;
  let questionIndex = 0;
  return keys.map((key) => {
    if (!key.startsWith("question:")) return key;
    const replacement = randomizedQuestionKeys[questionIndex];
    questionIndex += 1;
    return replacement || key;
  });
}

function orderedQuestionIds(itemQuiz) {
  return questionIdsFromStepKeys(orderedStepKeys(itemQuiz));
}

function questionIdsFromStepKeys(stepKeys) {
  return stepKeys
    .filter((key) => key.startsWith("question:"))
    .map((key) => splitContentKey(key).id);
}

function answerOrders(itemQuiz) {
  return Object.fromEntries(itemQuiz.questions.map((question) => {
    const ids = question.answers?.map((answer) => answer.id) || [];
    return [question.id, itemQuiz.randomizeAnswers ? shuffle(ids) : ids];
  }));
}

function shuffle(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function renderQuizRunner() {
  if (!session) {
    view = "contributor";
    render();
    return;
  }
  const itemQuiz = quiz(session.quizId);
  session.stepKeys = session.stepKeys || orderedStepKeys(itemQuiz, session.questionIds);
  const currentStepKey = session.stepKeys[session.index];
  const currentStep = stepFromKey(itemQuiz, currentStepKey);
  const progress = Math.round(((session.index + 1) / session.stepKeys.length) * 100);
  app.innerHTML = `
    <main class="quiz-runner">
      <div class="runner-header">
        <div>
          <div class="pill-row">
            <span class="status not-started">${session.preview ? "Preview" : "Active attempt"}</span>
            <span class="status submitted">Step ${session.index + 1} of ${session.stepKeys.length}</span>
            <span class="status not-started">Active time ${formatSeconds(session.activeSeconds)}</span>
          </div>
          <h1 class="section-title" style="margin-top: 12px;">${escapeHtml(itemQuiz.title)}</h1>
          <div class="section-kicker">Estimated active time: ${itemQuiz.estimatedMinutes} minutes. You can pause and resume.</div>
        </div>
        <div class="row-actions">
          <a class="button secondary" href="${escapeHtml(itemQuiz.guidelinesUrl)}" target="_blank" rel="noreferrer">Guidelines</a>
          <button class="button secondary" data-action="toggle-pause">${session.isPaused ? "Resume timer" : "Pause"}</button>
          <button class="button ghost" data-action="leave-quiz">Dashboard</button>
        </div>
      </div>
      <div class="progress-track" aria-label="Quiz progress"><div class="progress-fill" style="width: ${progress}%"></div></div>
      ${session.isPaused ? `
        <div class="paused-overlay">
          <div class="strong">Paused</div>
          <div class="muted">Active quiz time is stopped. Your answers remain editable after resuming.</div>
        </div>
      ` : ""}
      ${currentStep.kind === "course" ? renderCourseStep(currentStep.item) : renderQuestionStep(currentStep.item)}
      <div class="toolbar">
        <button class="button secondary" data-action="previous-question" ${session.index === 0 ? "disabled" : ""}>Previous</button>
        <div class="row-actions">
          <button class="button secondary" data-action="next-question" ${session.index === session.stepKeys.length - 1 ? "disabled" : ""}>Next</button>
          <button class="button" data-action="submit-quiz" ${session.index === session.stepKeys.length - 1 ? "" : "disabled"}>Submit</button>
        </div>
      </div>
    </main>
  `;
}

function stepFromKey(itemQuiz, key) {
  const { kind, id } = splitContentKey(key);
  if (kind === "course") {
    return { kind, item: itemQuiz.coursePages.find((page) => page.id === id) || itemQuiz.coursePages[0] };
  }
  return { kind: "question", item: itemQuiz.questions.find((question) => question.id === id) || itemQuiz.questions[0] };
}

function renderCourseStep(page) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2 class="section-title small">${escapeHtml(page.title)}</h2>
          <div class="section-kicker">Course content</div>
        </div>
      </div>
      <div class="panel-body">
        <p class="muted" style="max-width: 760px;">${escapeHtml(page.body)}</p>
      </div>
    </section>
  `;
}

function renderQuestionStep(question) {
  return `
    <div class="question-layout">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">${escapeHtml(question.prompt)}</h2>
            <div class="section-kicker">${escapeHtml(question.type)} - weight ${question.weight}</div>
          </div>
        </div>
        <div class="panel-body">
          ${renderAnswerControl(question)}
          <div style="height: 14px;"></div>
          <button class="button secondary" data-action="toggle-hint" data-question-id="${question.id}">${session.hintOpen[question.id] ? "Hide hint" : "Show hint"}</button>
          ${session.hintOpen[question.id] ? `<div style="height: 10px;"></div><div class="hint-box">${escapeHtml(question.hint)}</div>` : ""}
        </div>
      </section>
      <aside class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">Reference</h2>
            <div class="section-kicker">Optional question image</div>
          </div>
        </div>
        <div class="panel-body">
          <div class="reference-tile">${escapeHtml(question.referenceLabel || "No reference image uploaded")}</div>
          <div style="height: 14px;"></div>
          <div class="muted">Hints are learning aids and do not reduce the score.</div>
        </div>
      </aside>
    </div>
  `;
}

function renderAnswerControl(question) {
  const answer = session.answers[question.id];
  if (question.type === "Long text") {
    return `
      <div class="field">
        <label>Response</label>
        <textarea class="textarea" data-answer-text="${question.id}" placeholder="Write the scenario response here.">${escapeHtml(answer || "")}</textarea>
      </div>
    `;
  }
  if (question.type === "Ranking") {
    const order = Array.isArray(answer) && answer.length ? answer : (session.answerOrderByQuestion[question.id] || question.answers.map((item) => item.id));
    session.answers[question.id] = order;
    return `
      <div class="answer-list">
        ${order.map((answerId, index) => {
          const option = question.answers.find((candidate) => candidate.id === answerId);
          return `
            <div class="rank-row">
              <div class="rank-number">${index + 1}</div>
              <div>${escapeHtml(option.text)}</div>
              <div class="row-actions">
                <button class="button small secondary" data-action="rank-up" data-question-id="${question.id}" data-answer-id="${answerId}" ${index === 0 ? "disabled" : ""}>Up</button>
                <button class="button small secondary" data-action="rank-down" data-question-id="${question.id}" data-answer-id="${answerId}" ${index === order.length - 1 ? "disabled" : ""}>Down</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
  const type = question.type === "Multi-select" ? "checkbox" : "radio";
  const orderedAnswers = (session.answerOrderByQuestion[question.id] || question.answers.map((item) => item.id))
    .map((answerId) => question.answers.find((candidate) => candidate.id === answerId))
    .filter(Boolean);
  return `
    <div class="answer-list">
      ${orderedAnswers.map((option) => {
        const checked = type === "checkbox"
          ? Array.isArray(answer) && answer.includes(option.id)
          : answer === option.id;
        return `
          <label class="answer-option">
            <input type="${type}" name="${question.id}" value="${option.id}" data-answer="${question.id}" ${checked ? "checked" : ""}>
            <span>${escapeHtml(option.text)}</span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function startTimer() {
  if (!session) return;
  timer = setInterval(() => {
    if (!session || session.isPaused || view !== "take") return;
    session.activeSeconds += 1;
    const badge = document.querySelector(".runner-header .status:nth-child(3)");
    if (badge) badge.textContent = `Active time ${formatSeconds(session.activeSeconds)}`;
    saveSession();
  }, 1000);
}

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

function saveSession() {
  if (!session || session.preview) return;
  const attempt = byId(state.attempts, session.attemptId);
  if (!attempt) return;
  attempt.activeSeconds = session.activeSeconds;
  attempt.answers = session.answers;
  attempt.questionIds = session.questionIds;
  attempt.stepKeys = session.stepKeys;
  attempt.answerOrderByQuestion = session.answerOrderByQuestion;
  saveState();
}

function submitQuiz() {
  if (!session) return;
  saveSession();
  const itemQuiz = quiz(session.quizId);
  const grade = gradeAnswers(itemQuiz, session.answers);
  const status = grade.manualReview ? "Submitted" : grade.score >= itemQuiz.passThreshold ? "Passed" : "Failed";
  resultSnapshot = {
    quizTitle: itemQuiz.title,
    score: grade.manualReview ? null : grade.score,
    status,
    activeSeconds: session.activeSeconds,
    preview: session.preview,
    manualReview: grade.manualReview
  };
  if (!session.preview) {
    const attempt = byId(state.attempts, session.attemptId);
    attempt.status = status;
    attempt.score = grade.manualReview ? null : grade.score;
    attempt.manualReview = grade.manualReview;
    attempt.submittedAt = new Date().toISOString();
    attempt.activeSeconds = session.activeSeconds;
    attempt.answers = session.answers;
    attempt.stepKeys = session.stepKeys;
    attempt.questionIds = questionIdsFromStepKeys(session.stepKeys);
    addAudit("Attempt submitted", `${contributor(attempt.contributorId).email} - ${itemQuiz.title}`);
  }
  session = null;
  view = "result";
  render();
}

function gradeAnswers(itemQuiz, answers) {
  let earned = 0;
  let possible = 0;
  let manualReview = false;
  itemQuiz.questions.forEach((question) => {
    possible += Number(question.weight || 1);
    if (question.type === "Long text") {
      manualReview = true;
      return;
    }
    if (isCorrect(question, answers[question.id])) earned += Number(question.weight || 1);
  });
  return {
    score: possible ? Math.round((earned / possible) * 100) : 0,
    manualReview
  };
}

function renderResult() {
  const result = resultSnapshot;
  if (!result) {
    view = "contributor";
    return "";
  }
  const scoreLabel = result.score === null ? "Pending" : `${result.score}%`;
  return `
    <main class="quiz-runner">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h1 class="section-title">${escapeHtml(result.quizTitle)}</h1>
            <div class="section-kicker">${result.preview ? "Preview complete. Nothing was recorded." : "Submission recorded."}</div>
          </div>
          <span class="status ${statusClass(result.status)}">${escapeHtml(result.status)}</span>
        </div>
        <div class="panel-body">
          <div class="result-score">
            <div class="score-ring">${scoreLabel}</div>
            <div>
              ${result.status === "Passed" ? `<div class="check-badge"><span class="check-icon" aria-hidden="true"></span> Qualified</div>` : ""}
              <div class="section-kicker">Active time: ${formatSeconds(result.activeSeconds)}</div>
              <p class="muted">${result.manualReview ? "Open text requires admin scoring before a final score appears." : "Your score and result are shown. Missed question review is not available."}</p>
              <button class="button" data-action="return-dashboard">Return to dashboard</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function isCorrect(question, answer) {
  if (question.type === "Long text") return false;
  if (question.type === "Ranking") {
    return Array.isArray(answer) && JSON.stringify(answer) === JSON.stringify(question.correctOrder || []);
  }
  const correctIds = question.answers.filter((option) => option.correct).map((option) => option.id).sort();
  if (question.type === "Multi-select") {
    return Array.isArray(answer) && JSON.stringify([...answer].sort()) === JSON.stringify(correctIds);
  }
  return answer === correctIds[0];
}

function correctAnswerText(question) {
  if (question.type === "Long text") return "Admin-scored response";
  if (question.type === "Ranking") {
    return (question.correctOrder || [])
      .map((id) => question.answers.find((option) => option.id === id)?.text)
      .filter(Boolean)
      .join(" > ");
  }
  return question.answers.filter((option) => option.correct).map((option) => option.text).join("; ");
}

function formatAnswer(question, answer) {
  if (answer === undefined || answer === null || answer === "") return "";
  if (question.type === "Long text") return String(answer);
  const labels = question.answers || [];
  const textFor = (id) => labels.find((option) => option.id === id)?.text || id;
  if (Array.isArray(answer)) return answer.map(textFor).join(" > ");
  return textFor(answer);
}

function exportCsv() {
  const rows = filteredAdminRows();
  const header = ["name", "email", "cohort", "quiz", "status", "score", "active_time_seconds", "retakes_remaining"];
  const lines = [
    header.join(","),
    ...rows.map((row) => [
      row.person.name,
      row.person.email,
      row.person.cohort,
      row.itemQuiz.title,
      row.status,
      row.latest?.score ?? "",
      row.latest?.activeSeconds ?? "",
      remainingRetakes(row.item)
    ].map(csvCell).join(","))
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "qualify-lab-results.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function createNewQuiz() {
  const id = `q-${Date.now()}`;
  const pageId = `cp-${Date.now()}`;
  const questionId = `qst-${Date.now()}`;
  const newQuiz = {
    id,
    title: "Untitled qualification quiz",
    project: PROJECT_NAME,
    status: "Draft",
    draftDirty: true,
    projectActive: true,
    guidelinesUrl: "",
    passThreshold: 80,
    retakeLimit: 0,
    estimatedMinutes: 15,
    randomizeQuestions: true,
    randomizeAnswers: true,
    coursePages: [
      {
        id: pageId,
        title: "Course overview",
        body: "Add the context contributors should read before starting the assessment."
      }
    ],
    questions: [
      normalizeQuestionByType({
        id: questionId,
        type: "Multiple choice",
        weight: 1,
        prompt: "New qualification question",
        hint: "Add an optional hint shown during the quiz.",
        referenceLabel: "",
        answers: [
          { id: `ans-${Date.now()}-1`, text: "Correct answer", correct: true },
          { id: `ans-${Date.now()}-2`, text: "Distractor answer", correct: false }
        ]
      })
    ],
    contentOrder: [contentKey("course", pageId), contentKey("question", questionId)]
  };
  state.quizzes.unshift(newQuiz);
  selectedQuizId = id;
  editorMode = "detail";
  addAudit("Quiz created", newQuiz.title);
  render();
}

function getQuestion(itemQuiz, questionId) {
  return itemQuiz.questions.find((question) => question.id === questionId);
}

function getCoursePage(itemQuiz, pageId) {
  return itemQuiz.coursePages.find((page) => page.id === pageId);
}

function deleteCoursePage(quizId, pageId) {
  const itemQuiz = quiz(quizId);
  itemQuiz.coursePages = itemQuiz.coursePages.filter((page) => page.id !== pageId);
  itemQuiz.contentOrder = itemQuiz.contentOrder.filter((key) => key !== contentKey("course", pageId));
  markQuizChanged(itemQuiz, "Course page deleted");
  render();
}

function deleteQuestion(quizId, questionId) {
  const itemQuiz = quiz(quizId);
  if (itemQuiz.questions.length <= 1) {
    alert("Keep at least one question in the quiz.");
    return;
  }
  itemQuiz.questions = itemQuiz.questions.filter((question) => question.id !== questionId);
  itemQuiz.contentOrder = itemQuiz.contentOrder.filter((key) => key !== contentKey("question", questionId));
  markQuizChanged(itemQuiz, "Question deleted");
  render();
}

function addAnswer(quizId, questionId) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question || question.type === "True/false" || question.type === "Long text") return;
  const answer = { id: `ans-${Date.now()}`, text: "New answer", correct: false };
  question.answers.push(answer);
  if (question.type === "Ranking") question.correctOrder = question.answers.map((item) => item.id);
  markQuizChanged(itemQuiz, "Answer added");
  render();
}

function deleteAnswer(quizId, questionId, answerId) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question || question.answers.length <= 2) return;
  question.answers = question.answers.filter((answer) => answer.id !== answerId);
  question.correctOrder = (question.correctOrder || []).filter((id) => id !== answerId);
  if (!question.answers.some((answer) => answer.correct) && question.type !== "Ranking") {
    question.answers[0].correct = true;
  }
  if (question.type === "Ranking") question.correctOrder = question.answers.map((answer) => answer.id);
  markQuizChanged(itemQuiz, "Answer removed");
  render();
}

function moveAnswer(quizId, questionId, answerId, direction) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question) return;
  const index = question.answers.findIndex((answer) => answer.id === answerId);
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= question.answers.length) return;
  [question.answers[index], question.answers[nextIndex]] = [question.answers[nextIndex], question.answers[index]];
  if (question.type === "Ranking") question.correctOrder = question.answers.map((answer) => answer.id);
  markQuizChanged(itemQuiz, null);
}

function setCorrectAnswer(quizId, questionId, answerId, checked) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question || question.type === "Ranking") return;
  if (["Multiple choice", "True/false", "Scenario review"].includes(question.type)) {
    question.answers.forEach((answer) => {
      answer.correct = answer.id === answerId;
    });
  } else {
    const answer = question.answers.find((candidate) => candidate.id === answerId);
    if (answer) answer.correct = checked;
  }
  if (!question.answers.some((answer) => answer.correct)) {
    const fallback = question.answers.find((answer) => answer.id === answerId) || question.answers[0];
    if (fallback) fallback.correct = true;
  }
  markQuizChanged(itemQuiz, null);
}

function updateQuestionType(quizId, questionId, type) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question) return;
  question.type = type;
  normalizeQuestionByType(question);
  markQuizChanged(itemQuiz, `Question type changed to ${type}`);
  render();
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "nav") {
    view = button.dataset.view;
    if (view === "editor") editorMode = "home";
    render();
  }
  if (action === "toggle-theme") {
    state.theme = state.theme === "dark" ? "light" : "dark";
    render();
  }
  if (action === "reset-sandbox") resetState();
  if (action === "start-quiz") startQuiz(button.dataset.quizId);
  if (action === "preview-quiz") startQuiz(button.dataset.quizId, true);
  if (action === "toggle-pause") {
    session.isPaused = !session.isPaused;
    saveSession();
    render();
  }
  if (action === "leave-quiz") {
    saveSession();
    session = null;
    view = "contributor";
    render();
  }
  if (action === "toggle-hint") {
    session.hintOpen[button.dataset.questionId] = !session.hintOpen[button.dataset.questionId];
    render();
  }
  if (action === "previous-question") {
    session.index = Math.max(0, session.index - 1);
    saveSession();
    render();
  }
  if (action === "next-question") {
    session.index = Math.min(session.stepKeys.length - 1, session.index + 1);
    saveSession();
    render();
  }
  if (action === "rank-up" || action === "rank-down") {
    moveRank(button.dataset.questionId, button.dataset.answerId, action === "rank-up" ? -1 : 1);
  }
  if (action === "submit-quiz") submitQuiz();
  if (action === "return-dashboard") {
    resultSnapshot = null;
    view = "contributor";
    render();
  }
  if (action === "view-attempt") {
    selectedAttemptId = button.dataset.attemptId;
    render();
  }
  if (action === "close-attempt") {
    selectedAttemptId = null;
    render();
  }
  if (action === "allow-retake") {
    allowRetake(button.dataset.assignmentId);
  }
  if (action === "toggle-lock") {
    toggleLock(button.dataset.assignmentId);
  }
  if (action === "offboard") {
    toggleOffboard(button.dataset.assignmentId);
  }
  if (action === "change-result") {
    changeResult(button.dataset.assignmentId);
  }
  if (action === "select-all") {
    selectedAssignments = new Set(filteredAdminRows().map((row) => row.item.id));
    if (!button.checked) selectedAssignments = new Set();
    render();
  }
  if (action === "select-assignment") {
    if (button.checked) selectedAssignments.add(button.dataset.assignmentId);
    else selectedAssignments.delete(button.dataset.assignmentId);
    render();
  }
  if (action === "bulk-retake") {
    selectedAssignments.forEach(allowRetakeNoRender);
    addAudit("Bulk retake enabled", `${selectedAssignments.size} assignments`);
    render();
  }
  if (action === "bulk-lock") {
    selectedAssignments.forEach((id) => {
      const item = assignment(id);
      if (item) item.locked = true;
    });
    addAudit("Bulk lock applied", `${selectedAssignments.size} assignments`);
    render();
  }
  if (action === "bulk-offboard") {
    selectedAssignments.forEach((id) => {
      const item = assignment(id);
      if (item) item.offboarded = true;
    });
    addAudit("Bulk offboard applied", `${selectedAssignments.size} assignments`);
    render();
  }
  if (action === "export-csv") exportCsv();
  if (action === "editor-home") {
    editorMode = "home";
    render();
  }
  if (action === "edit-quiz") {
    selectedQuizId = button.dataset.quizId;
    editorMode = "detail";
    render();
  }
  if (action === "create-quiz") {
    createNewQuiz();
  }
  if (action === "toggle-editor") {
    const itemQuiz = quiz(selectedQuizId);
    itemQuiz[button.dataset.editorField] = !itemQuiz[button.dataset.editorField];
    markQuizChanged(itemQuiz, `Quiz setting changed: ${button.dataset.editorField}`);
    render();
  }
  if (action === "publish-quiz") {
    const itemQuiz = quiz(button.dataset.quizId);
    if (!itemQuiz.draftDirty) return;
    if (!itemQuiz.guidelinesUrl.trim()) {
      alert("Add the Google Docs guidelines link before publishing.");
      return;
    }
    itemQuiz.status = "Published";
    itemQuiz.draftDirty = false;
    addAudit("Quiz published", itemQuiz.title);
    render();
  }
  if (action === "add-course-page") {
    const itemQuiz = quiz(button.dataset.quizId);
    const page = {
      id: `cp-${Date.now()}`,
      title: "New course page",
      body: "Add project context, examples, or policy reminders."
    };
    itemQuiz.coursePages.push(page);
    itemQuiz.contentOrder.push(contentKey("course", page.id));
    markQuizChanged(itemQuiz, "Course page added");
    render();
  }
  if (action === "add-question") {
    const itemQuiz = quiz(button.dataset.quizId);
    const question = normalizeQuestionByType({
      id: `q-${Date.now()}`,
      type: "Multiple choice",
      weight: 1,
      prompt: "New qualification question",
      hint: "Add a helpful testing hint.",
      referenceLabel: "",
      answers: [
        { id: "a", text: "Correct answer", correct: true },
        { id: "b", text: "Distractor answer", correct: false }
      ]
    });
    itemQuiz.questions.push(question);
    itemQuiz.contentOrder.push(contentKey("question", question.id));
    markQuizChanged(itemQuiz, "Question added");
    render();
  }
  if (action === "delete-course-page") {
    deleteCoursePage(button.dataset.quizId, button.dataset.pageId);
  }
  if (action === "delete-question") {
    deleteQuestion(button.dataset.quizId, button.dataset.questionId);
  }
  if (action === "add-answer") {
    addAnswer(button.dataset.quizId, button.dataset.questionId);
  }
  if (action === "delete-answer") {
    deleteAnswer(button.dataset.quizId, button.dataset.questionId, button.dataset.answerId);
  }
  if (action === "move-answer") {
    moveAnswer(button.dataset.quizId, button.dataset.questionId, button.dataset.answerId, button.dataset.direction);
    render();
  }
  if (action === "save-note") {
    const attempt = byId(state.attempts, button.dataset.attemptId);
    const note = document.querySelector(`[data-action="attempt-note"][data-attempt-id="${button.dataset.attemptId}"]`);
    if (attempt && note) {
      attempt.note = note.value;
      addAudit("Internal note saved", `${contributor(attempt.contributorId).email} attempt`);
      render();
    }
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.dataset.filter) {
    filters[target.dataset.filter] = target.value;
    render();
  }
  if (target.dataset.editorField) {
    const itemQuiz = quiz(selectedQuizId);
    const field = target.dataset.editorField;
    itemQuiz[field] = target.type === "number" ? Number(target.value) : target.value;
    markQuizChanged(itemQuiz, null);
  }
  if (target.dataset.courseField) {
    const itemQuiz = quiz(target.dataset.quizId);
    const page = getCoursePage(itemQuiz, target.dataset.pageId);
    if (page) {
      page[target.dataset.courseField] = target.value;
      markQuizChanged(itemQuiz, null);
    }
  }
  if (target.dataset.questionField && target.dataset.questionField !== "type") {
    const itemQuiz = quiz(target.dataset.quizId);
    const question = getQuestion(itemQuiz, target.dataset.questionId);
    if (question) {
      question[target.dataset.questionField] = target.type === "number" ? Number(target.value) : target.value;
      markQuizChanged(itemQuiz, null);
    }
  }
  if (target.dataset.answerField) {
    const itemQuiz = quiz(target.dataset.quizId);
    const question = getQuestion(itemQuiz, target.dataset.questionId);
    const answer = question?.answers.find((candidate) => candidate.id === target.dataset.answerId);
    if (answer) {
      answer[target.dataset.answerField] = target.value;
      markQuizChanged(itemQuiz, null);
    }
  }
  if (target.dataset.answerText) {
    session.answers[target.dataset.answerText] = target.value;
    saveSession();
  }
}

function handleChange(event) {
  const target = event.target;
  if (target.dataset.action === "switch-contributor") {
    state.currentContributorId = target.value;
    render();
  }
  if (target.dataset.action === "select-editor-quiz") {
    selectedQuizId = target.value;
    render();
  }
  if (target.dataset.questionField === "type") {
    updateQuestionType(target.dataset.quizId, target.dataset.questionId, target.value);
  }
  if (target.dataset.answerCorrect) {
    setCorrectAnswer(target.dataset.quizId, target.dataset.answerCorrect, target.dataset.answerId, target.checked);
  }
  if (target.dataset.filter) {
    filters[target.dataset.filter] = target.value;
    render();
  }
  if (target.dataset.answer) {
    const questionId = target.dataset.answer;
    const itemQuiz = quiz(session.quizId);
    const question = itemQuiz.questions.find((candidate) => candidate.id === questionId);
    if (question.type === "Multi-select") {
      const current = new Set(Array.isArray(session.answers[questionId]) ? session.answers[questionId] : []);
      if (target.checked) current.add(target.value);
      else current.delete(target.value);
      session.answers[questionId] = [...current];
    } else {
      session.answers[questionId] = target.value;
    }
    saveSession();
  }
}

function handleDragStart(event) {
  const item = event.target.closest("[data-content-key]");
  if (!item) return;
  draggedContentKey = item.dataset.contentKey;
  event.dataTransfer?.setData("text/plain", draggedContentKey);
  item.classList.add("is-dragging");
}

function handleDragOver(event) {
  const item = event.target.closest("[data-content-key]");
  if (!item || !draggedContentKey || item.dataset.contentKey === draggedContentKey) return;
  event.preventDefault();
  item.classList.add("is-drop-target");
}

function handleDragLeave(event) {
  const item = event.target.closest("[data-content-key]");
  if (item) item.classList.remove("is-drop-target");
}

function handleDrop(event) {
  const item = event.target.closest("[data-content-key]");
  if (!item || !draggedContentKey) return;
  event.preventDefault();
  item.classList.remove("is-drop-target");
  reorderContent(item.dataset.quizId, draggedContentKey, item.dataset.contentKey);
  draggedContentKey = null;
}

function handleDragEnd() {
  document.querySelectorAll(".is-dragging, .is-drop-target").forEach((item) => {
    item.classList.remove("is-dragging", "is-drop-target");
  });
  draggedContentKey = null;
}

function reorderContent(quizId, fromKey, toKey) {
  if (!fromKey || !toKey || fromKey === toKey) return;
  const itemQuiz = quiz(quizId);
  const order = [...cleanContentOrder(itemQuiz)];
  const fromIndex = order.indexOf(fromKey);
  const toIndex = order.indexOf(toKey);
  if (fromIndex < 0 || toIndex < 0) return;
  order.splice(fromIndex, 1);
  order.splice(order.indexOf(toKey), 0, fromKey);
  itemQuiz.contentOrder = order;
  markQuizChanged(itemQuiz, "Assessment order changed");
  render();
}

function moveRank(questionId, answerId, delta) {
  const order = [...(session.answers[questionId] || session.answerOrderByQuestion[questionId] || [])];
  const index = order.indexOf(answerId);
  const nextIndex = index + delta;
  if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
  [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
  session.answers[questionId] = order;
  saveSession();
  render();
}

function allowRetakeNoRender(assignmentId) {
  const item = assignment(assignmentId);
  if (!item) return;
  item.retakesAllowed += 1;
  item.locked = false;
}

function allowRetake(assignmentId) {
  const item = assignment(assignmentId);
  if (!item) return;
  allowRetakeNoRender(assignmentId);
  addAudit("Retake enabled", `${contributor(item.contributorId).email} - ${quiz(item.quizId).title}`);
  render();
}

function toggleLock(assignmentId) {
  const item = assignment(assignmentId);
  if (!item) return;
  item.locked = !item.locked;
  addAudit(item.locked ? "Quiz locked" : "Quiz unlocked", `${contributor(item.contributorId).email} - ${quiz(item.quizId).title}`);
  render();
}

function toggleOffboard(assignmentId) {
  const item = assignment(assignmentId);
  if (!item) return;
  item.offboarded = !item.offboarded;
  const person = contributor(item.contributorId);
  person.offboarded = state.assignments.some((candidate) => candidate.contributorId === person.id && candidate.offboarded);
  addAudit(item.offboarded ? "Contributor offboarded" : "Contributor restored", `${person.email} - ${quiz(item.quizId).title}`);
  render();
}

function changeResult(assignmentId) {
  const item = assignment(assignmentId);
  const attempt = item ? latestAttempt(item.contributorId, item.quizId) : null;
  if (!attempt || attempt.status === "In progress") return;
  const itemQuiz = quiz(item.quizId);
  if (attempt.status === "Passed") {
    attempt.status = "Failed";
    attempt.score = Math.max(0, itemQuiz.passThreshold - 1);
  } else {
    attempt.status = "Passed";
    attempt.score = Math.max(itemQuiz.passThreshold, attempt.score || itemQuiz.passThreshold);
  }
  attempt.overridden = true;
  addAudit("Result changed", `${contributor(item.contributorId).email} - ${itemQuiz.title}`);
  render();
}

document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("dragstart", handleDragStart);
document.addEventListener("dragover", handleDragOver);
document.addEventListener("dragleave", handleDragLeave);
document.addEventListener("drop", handleDrop);
document.addEventListener("dragend", handleDragEnd);
window.addEventListener("beforeunload", saveSession);

render();
