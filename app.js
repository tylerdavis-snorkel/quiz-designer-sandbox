const STORAGE_KEY = "projectOtterAssessmentState.v3";
const VISUAL_VERSION = 2;
const PROJECT_NAME = "Project Otter";

const app = document.querySelector("#app");

const initialState = () => ({
  theme: "dark",
  visualVersion: VISUAL_VERSION,
  projectName: PROJECT_NAME,
  currentContributorId: "c-alex",
  selectedQuizId: "q-otter",
  quizzes: [
    {
      id: "q-otter",
      title: "Project Otter Quiz",
      project: PROJECT_NAME,
      status: "Published",
      draftDirty: false,
      projectActive: true,
      guidelinesUrl: "https://docs.google.com/document/d/example-project-otter-guidelines",
      passThreshold: 80,
      retakeLimit: 0,
      unlimitedRetakes: false,
      estimatedMinutes: 15,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [
        {
          id: "cp-otter-1",
          title: "Before you start",
          body: "Project Otter tasks ask contributors to compare model responses against the guideline document, user intent, and task-specific constraints."
        },
        {
          id: "cp-otter-2",
          title: "Scoring posture",
          body: "Use the rubric as the source of truth. A polished response can still be wrong when it ignores a requirement."
        }
      ],
      contentOrder: ["course:cp-otter-1", "course:cp-otter-2", "question:qo-1", "question:qo-2", "question:qo-3", "question:qo-4"],
      questions: [
        {
          id: "qo-1",
          type: "Multiple choice",
          weight: 2,
          prompt: "A task asks you to compare two model responses. What should you do first?",
          hint: "Start with the source of truth for the project, not your memory from another task.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Read the guideline document and task-specific instructions", correct: true },
            { id: "b", text: "Choose the answer that sounds more confident", correct: false },
            { id: "c", text: "Prefer the longer response", correct: false },
            { id: "d", text: "Use the rule from the last project you worked on", correct: false }
          ]
        },
        {
          id: "qo-2",
          type: "True/false",
          weight: 1,
          prompt: "If a response is polished and friendly, it should pass even if it ignores a required instruction.",
          hint: "Tone does not override task requirements.",
          answers: [
            { id: "true", text: "True", correct: false },
            { id: "false", text: "False", correct: true }
          ]
        },
        {
          id: "qo-3",
          type: "Multi-select",
          weight: 2,
          prompt: "Which items should be checked before submitting a rating?",
          hint: "Look for the user request, project rules, and evidence quality.",
          answers: [
            { id: "a", text: "Prompt constraints and required format", correct: true },
            { id: "b", text: "Policy or safety requirements", correct: true },
            { id: "c", text: "Whether the answer is longer than the other answer", correct: false },
            { id: "d", text: "Unsupported or contradicted claims", correct: true }
          ]
        },
        {
          id: "qo-4",
          type: "Scenario review",
          weight: 3,
          prompt: "A response gives a confident answer but invents a detail that was not in the prompt or source. What should you do?",
          hint: "Confidence is not evidence.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Accept it because it sounds helpful", correct: false },
            { id: "b", text: "Lower the rating and note that the response is unsupported", correct: true },
            { id: "c", text: "Ignore the invented detail if the rest is correct", correct: false },
            { id: "d", text: "Mark the task impossible", correct: false }
          ]
        }
      ]
    },
    {
      id: "q-safety",
      title: "Safety Review Scenarios",
      project: PROJECT_NAME,
      status: "Published",
      draftDirty: false,
      projectActive: true,
      guidelinesUrl: "https://docs.google.com/document/d/example-safety-review-guidelines",
      passThreshold: 82,
      retakeLimit: 0,
      unlimitedRetakes: false,
      estimatedMinutes: 18,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [
        {
          id: "cp-safety-1",
          title: "Safety review basics",
          body: "Safety issues should be recorded even when one response is still better overall."
        }
      ],
      contentOrder: ["course:cp-safety-1", "question:qs-1", "question:qs-2", "question:qs-3", "question:qs-4"],
      questions: [
        {
          id: "qs-1",
          type: "Multiple choice",
          weight: 2,
          prompt: "If both responses contain a safety issue, what should you do?",
          hint: "Selection and issue reporting are separate judgments.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "Choose the less severe response and record the safety issue", correct: true },
            { id: "b", text: "Choose the less severe response without any note", correct: false },
            { id: "c", text: "Mark both responses as automatically equal", correct: false },
            { id: "d", text: "Skip the task immediately", correct: false }
          ]
        },
        {
          id: "qs-2",
          type: "True/false",
          weight: 1,
          prompt: "A harmless refusal can still be low quality if the user request was allowed and answerable.",
          hint: "Safety and helpfulness both matter.",
          answers: [
            { id: "true", text: "True", correct: true },
            { id: "false", text: "False", correct: false }
          ]
        },
        {
          id: "qs-3",
          type: "Multiple choice",
          weight: 2,
          prompt: "A response follows the safety policy but ignores the requested format. How should that affect the rating?",
          hint: "Policy compliance is necessary, but not the only criterion.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "It can still lose quality points for missing the format", correct: true },
            { id: "b", text: "It must receive a perfect score", correct: false },
            { id: "c", text: "The format should never matter", correct: false },
            { id: "d", text: "Only the longer response should win", correct: false }
          ]
        },
        {
          id: "qs-4",
          type: "Ranking",
          weight: 2,
          prompt: "Put the review workflow in the recommended order.",
          hint: "Move from understanding, to evidence, to scoring, to explanation.",
          answers: [
            { id: "a", text: "Read the prompt and guidelines" },
            { id: "b", text: "Check safety and task constraints" },
            { id: "c", text: "Apply the rubric rating" },
            { id: "d", text: "Write a concise rationale" }
          ],
          correctOrder: ["a", "b", "c", "d"]
        }
      ]
    },
    {
      id: "q-search",
      title: "Search Quality Calibration",
      project: PROJECT_NAME,
      status: "Published",
      draftDirty: false,
      projectActive: true,
      guidelinesUrl: "https://docs.google.com/document/d/example-search-quality-guidelines",
      passThreshold: 85,
      retakeLimit: 0,
      unlimitedRetakes: false,
      estimatedMinutes: 16,
      randomizeQuestions: true,
      randomizeAnswers: true,
      coursePages: [
        {
          id: "cp-search-1",
          title: "Freshness and intent",
          body: "Search quality tasks require contributors to decide whether results satisfy the user's intent and freshness needs."
        }
      ],
      contentOrder: ["course:cp-search-1", "question:qsearch-1", "question:qsearch-2", "question:qsearch-3"],
      questions: [
        {
          id: "qsearch-1",
          type: "Multiple choice",
          weight: 2,
          prompt: "A user asks for the latest policy update. Which result should score higher?",
          hint: "Freshness matters when the query is current.",
          referenceLabel: "",
          answers: [
            { id: "a", text: "A recent source that directly addresses the update", correct: true },
            { id: "b", text: "An older source with a broader overview", correct: false },
            { id: "c", text: "A forum post with no date", correct: false },
            { id: "d", text: "A result that only mentions a related product", correct: false }
          ]
        },
        {
          id: "qsearch-2",
          type: "True/false",
          weight: 1,
          prompt: "A stale result can be acceptable when the user asks for historical background.",
          hint: "The user's intent determines whether freshness is required.",
          answers: [
            { id: "true", text: "True", correct: true },
            { id: "false", text: "False", correct: false }
          ]
        },
        {
          id: "qsearch-3",
          type: "Long text",
          weight: 4,
          prompt: "Briefly explain how you would compare two search results when one is newer and the other is more authoritative.",
          hint: "Name the tradeoff and connect it to the user's intent.",
          referenceLabel: "",
          answers: []
        }
      ]
    }
  ],
  contributors: [
    { id: "c-alex", name: "Alex Rivera", email: "alex.rivera@example.com", cohort: "June onboarding", role: "contributor", offboarded: false },
    { id: "c-nia", name: "Nia Patel", email: "nia.patel@example.com", cohort: "June onboarding", role: "contributor", offboarded: true },
    { id: "c-maya", name: "Maya Chen", email: "maya.chen@example.com", cohort: "Admin", role: "admin", offboarded: false }
  ],
  assignments: [
    { id: "as-alex-otter", contributorId: "c-alex", quizId: "q-otter", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-17" },
    { id: "as-alex-safety", contributorId: "c-alex", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-18" },
    { id: "as-alex-search", contributorId: "c-alex", quizId: "q-search", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-19" },
    { id: "as-nia-otter", contributorId: "c-nia", quizId: "q-otter", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-17" },
    { id: "as-nia-safety", contributorId: "c-nia", quizId: "q-safety", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-18" },
    { id: "as-nia-search", contributorId: "c-nia", quizId: "q-search", retakesAllowed: 0, retakesUsed: 0, locked: false, offboarded: false, assignedAt: "2026-06-19" }
  ],
  attempts: [
    {
      id: "att-alex-otter-1",
      contributorId: "c-alex",
      quizId: "q-otter",
      status: "Passed",
      score: 92,
      activeSeconds: 810,
      startedAt: "2026-06-18T15:00:00",
      submittedAt: "2026-06-18T15:13:30",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      answers: {
        "qo-1": "a",
        "qo-2": "false",
        "qo-3": ["a", "b", "d"],
        "qo-4": "b"
      }
    },
    {
      id: "att-alex-safety-1",
      contributorId: "c-alex",
      quizId: "q-safety",
      status: "In progress",
      score: null,
      activeSeconds: 410,
      startedAt: "2026-06-20T12:20:00",
      submittedAt: null,
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      questionIds: ["qs-2", "qs-1", "qs-3", "qs-4"],
      answerOrderByQuestion: {
        "qs-1": ["c", "a", "b", "d"],
        "qs-2": ["true", "false"],
        "qs-3": ["a", "c", "d", "b"],
        "qs-4": ["a", "b", "c", "d"]
      },
      stepKeys: ["question:qs-2", "question:qs-1", "question:qs-3", "question:qs-4"],
      answers: {
        "qs-2": "true",
        "qs-1": "a"
      }
    },
    {
      id: "att-alex-search-1",
      contributorId: "c-alex",
      quizId: "q-search",
      status: "Submitted",
      score: null,
      activeSeconds: 860,
      startedAt: "2026-06-21T09:30:00",
      submittedAt: "2026-06-21T09:44:20",
      retakeNumber: 0,
      manualReview: true,
      overridden: false,
      note: "Awaiting admin score for written response.",
      answers: {
        "qsearch-1": "a",
        "qsearch-2": "true",
        "qsearch-3": "I would first decide whether the query asks for current facts or durable background. If freshness is required, I would favor the newer result unless it is unreliable. If authority matters more, I would choose the more authoritative source and note any freshness limitation."
      }
    },
    {
      id: "att-nia-otter-1",
      contributorId: "c-nia",
      quizId: "q-otter",
      status: "Failed",
      score: 68,
      activeSeconds: 720,
      startedAt: "2026-06-18T16:10:00",
      submittedAt: "2026-06-18T16:22:00",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "Missed several guideline hierarchy questions.",
      answers: {
        "qo-1": "b",
        "qo-2": "true",
        "qo-3": ["a", "c"],
        "qo-4": "a"
      }
    },
    {
      id: "att-nia-safety-1",
      contributorId: "c-nia",
      quizId: "q-safety",
      status: "Passed",
      score: 88,
      activeSeconds: 990,
      startedAt: "2026-06-19T10:00:00",
      submittedAt: "2026-06-19T10:16:30",
      retakeNumber: 0,
      manualReview: false,
      overridden: false,
      note: "",
      answers: {
        "qs-1": "a",
        "qs-2": "true",
        "qs-3": "a",
        "qs-4": ["a", "b", "c", "d"]
      }
    }
  ],
  audit: [
    { id: "au-1", actor: "Admin", action: "Assessment content published", target: "Project Otter Quiz", at: "2026-06-21 09:12" },
    { id: "au-2", actor: "Admin", action: "Contributor offboarded", target: "Nia Patel", at: "2026-06-20 14:44" },
    { id: "au-3", actor: "Admin", action: "Result changed", target: "Safety Review Scenarios", at: "2026-06-19 16:02" }
  ],
  offboardingLog: [
    { id: "ob-3", contributorId: "c-nia", name: "Nia Patel", email: "nia.patel@example.com", action: "Offboarded", actor: "Maya Chen", at: "2026-06-20 14:44" },
    { id: "ob-2", contributorId: "c-alex", name: "Alex Rivera", email: "alex.rivera@example.com", action: "Restored", actor: "Maya Chen", at: "2026-06-19 14:35" },
    { id: "ob-1", contributorId: "c-alex", name: "Alex Rivera", email: "alex.rivera@example.com", action: "Offboarded", actor: "Maya Chen", at: "2026-06-19 11:20" }
  ]
});

let state = loadState();
let view = "contributor";
let selectedQuizId = state.selectedQuizId || state.quizzes[0].id;
let editorMode = "home";
let editorReadOnly = true;
let editorSnapshot = null;
let versionHistoryQuizId = null;
let selectedAttemptId = null;
let selectedHistoryAttemptId = null;
let adminSubView = "responses";
let makeAdminOpen = false;
let bulkRetakeOpen = false;
let auditLogOpen = false;
let selectedAssignments = new Set();
let retakeDrafts = {};
let publishNoteQuizId = null;
let draggedContentKey = null;
let imageViewer = null;
let previewReturn = null;
let session = null;
let resultSnapshot = null;
let timer = null;
let filters = {
  search: "",
  quiz: "All",
  status: "All",
  score: "All",
  metricQuiz: "All",
  offboardingSearch: ""
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
  editorReadOnly = true;
  editorSnapshot = null;
  versionHistoryQuizId = null;
  selectedAttemptId = null;
  selectedHistoryAttemptId = null;
  adminSubView = "responses";
  makeAdminOpen = false;
  bulkRetakeOpen = false;
  publishNoteQuizId = null;
  retakeDrafts = {};
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
  if (next.visualVersion !== VISUAL_VERSION) {
    next.theme = "dark";
    next.visualVersion = VISUAL_VERSION;
  }
  next.quizzes = (next.quizzes || []).map(normalizeQuiz);
  next.contributors = (next.contributors || []).map(normalizeContributor);
  next.offboardingLog = Array.isArray(next.offboardingLog) ? next.offboardingLog : [];
  const legacyOffboardedIds = new Set((next.assignments || [])
    .filter((item) => item.offboarded)
    .map((item) => item.contributorId));
  next.contributors.forEach((person) => {
    if (legacyOffboardedIds.has(person.id)) person.offboarded = true;
  });
  next.assignments = (next.assignments || []).map((item) => ({ ...item, offboarded: false }));
  next.quizVersions = normalizeQuizVersions(next);
  return next;
}

function normalizeQuizVersions(next) {
  const existing = Array.isArray(next.quizVersions) ? next.quizVersions : [];
  const normalized = existing
    .filter((version) => next.quizzes.some((itemQuiz) => itemQuiz.id === version.quizId))
    .map((version) => {
      const itemQuiz = next.quizzes.find((candidate) => candidate.id === version.quizId);
      const snapshot = normalizeQuiz(cloneValue(version.quiz || itemQuiz));
      return {
        id: version.id || uniqueId("ver"),
        quizId: version.quizId,
        title: version.title || "Saved version",
        createdAt: version.createdAt || new Date().toISOString(),
        actor: version.actor || "System",
        note: version.note || "Saved quiz content",
        quiz: snapshot
      };
    });
  next.quizzes.forEach((itemQuiz) => {
    if (normalized.some((version) => version.quizId === itemQuiz.id)) return;
    normalized.push({
      id: `ver-${itemQuiz.id}-initial`,
      quizId: itemQuiz.id,
      title: itemQuiz.status === "Published" && !itemQuiz.draftDirty ? "Published version 1" : "Initial draft",
      createdAt: new Date().toISOString(),
      actor: "System",
      note: "Starting snapshot",
      quiz: cloneValue(itemQuiz)
    });
  });
  return normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function normalizeContributor(person) {
  const defaultAdmins = new Set(["maya.chen@example.com"]);
  return {
    ...person,
    role: person.role || (defaultAdmins.has(String(person.email || "").toLowerCase()) ? "admin" : "contributor")
  };
}

function normalizeQuiz(itemQuiz) {
  itemQuiz.project = PROJECT_NAME;
  itemQuiz.status = itemQuiz.status || "Draft";
  itemQuiz.draftDirty = Boolean(itemQuiz.draftDirty || itemQuiz.status === "Draft");
  itemQuiz.unlimitedRetakes = Boolean(itemQuiz.unlimitedRetakes);
  itemQuiz.coursePages = (itemQuiz.coursePages || []).map((page, index) => ({
    id: page.id || `cp-${itemQuiz.id}-${index + 1}`,
    title: page.title ?? "Untitled course page",
    body: page.body ?? "",
    bodyHtml: page.bodyHtml || `<p>${escapeHtml(page.body || "")}</p>`
  }));
  itemQuiz.questions = (itemQuiz.questions || []).map((question, index) => normalizeQuestion(question, itemQuiz.id, index));
  itemQuiz.contentOrder = cleanContentOrder(itemQuiz);
  return itemQuiz;
}

function normalizeQuestion(question, quizId, index) {
  const normalized = {
    id: question.id || `q-${quizId}-${index + 1}`,
    type: question.type || "Multiple choice",
    weight: Number(question.weight ?? 1),
    prompt: question.prompt ?? "Untitled question",
    hint: question.hint ?? "",
    referenceLabel: "",
    resources: Array.isArray(question.resources) ? question.resources : [],
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
      { id: `a-${Date.now()}`, text: "", correct: true },
      { id: `b-${Date.now()}`, text: "", correct: false }
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

function contentPosition(itemQuiz, key, kind) {
  const matching = quizContentItems(itemQuiz).filter((entry) => entry.kind === kind);
  return {
    index: matching.findIndex((entry) => entry.key === key) + 1,
    total: matching.length
  };
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

function multilineText(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function byId(collection, id) {
  return collection.find((item) => item.id === id);
}

function contributor(id) {
  return byId(state.contributors, id);
}

function currentUser() {
  return contributor(state.currentContributorId);
}

function isAdmin(person = currentUser()) {
  return person?.role === "admin";
}

function quiz(id) {
  return byId(state.quizzes, id);
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function captureEditorSnapshot(quizId) {
  const itemQuiz = quiz(quizId);
  if (!itemQuiz) {
    editorSnapshot = null;
    return;
  }
  editorSnapshot = {
    quizId,
    quiz: cloneValue(itemQuiz),
    assignments: cloneValue(state.assignments),
    contributors: cloneValue(state.contributors)
  };
}

function discardEditorChanges() {
  const currentQuiz = quiz(selectedQuizId);
  if (!editorSnapshot || editorSnapshot.quizId !== selectedQuizId || !currentQuiz) {
    editorReadOnly = true;
    editorSnapshot = null;
    render();
    return;
  }
  const quizIndex = state.quizzes.findIndex((candidate) => candidate.id === selectedQuizId);
  if (quizIndex >= 0) state.quizzes[quizIndex] = normalizeQuiz(cloneValue(editorSnapshot.quiz));
  state.assignments = cloneValue(editorSnapshot.assignments || state.assignments);
  state.contributors = cloneValue(editorSnapshot.contributors || state.contributors).map(normalizeContributor);
  selectedAssignments = new Set();
  editorReadOnly = true;
  const restoredTitle = state.quizzes[quizIndex]?.title || editorSnapshot.quiz.title;
  editorSnapshot = null;
  addAudit("Quiz changes discarded", restoredTitle);
  saveState();
  render();
}

function versionsForQuiz(quizId) {
  return (state.quizVersions || [])
    .filter((version) => version.quizId === quizId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createQuizVersion(quizId, note = "Saved quiz content", kind = "saved") {
  const itemQuiz = quiz(quizId);
  if (!itemQuiz) return null;
  state.quizVersions = state.quizVersions || [];
  const savedVersions = versionsForQuiz(quizId);
  const publishedCount = savedVersions.filter((version) => String(version.title || "").startsWith("Published version")).length;
  const version = {
    id: uniqueId("ver"),
    quizId,
    title: kind === "published" ? `Published version ${publishedCount + 1}` : `Version ${savedVersions.length + 1}`,
    createdAt: new Date().toISOString(),
    actor: currentUser()?.name || "Admin",
    note,
    quiz: cloneValue(itemQuiz)
  };
  state.quizVersions.unshift(version);
  return version;
}

function quizVersionSummary(snapshot) {
  const courseCount = snapshot.coursePages?.length || 0;
  const questionCount = snapshot.questions?.length || 0;
  return `${courseCount} course page${courseCount === 1 ? "" : "s"} - ${questionCount} question${questionCount === 1 ? "" : "s"} - threshold ${snapshot.passThreshold || 0}%`;
}

function restoreQuizVersion(versionId) {
  const version = (state.quizVersions || []).find((candidate) => candidate.id === versionId);
  if (!version) return;
  const currentQuiz = quiz(version.quizId);
  if (!currentQuiz) return;
  if (!confirm(`Restore "${version.title}" for "${currentQuiz.title}"? The restored quiz will become unpublished changes until you publish it.`)) return;
  if (!editorSnapshot || editorSnapshot.quizId !== currentQuiz.id) captureEditorSnapshot(currentQuiz.id);
  const quizIndex = state.quizzes.findIndex((candidate) => candidate.id === currentQuiz.id);
  const restored = normalizeQuiz({
    ...cloneValue(version.quiz),
    id: currentQuiz.id,
    draftDirty: true,
    status: currentQuiz.status === "Published" ? "Published" : "Draft"
  });
  state.quizzes[quizIndex] = restored;
  selectedQuizId = restored.id;
  editorMode = "detail";
  editorReadOnly = false;
  versionHistoryQuizId = null;
  addAudit("Quiz version restored", `${restored.title} - ${version.title}`);
  saveState();
  render();
}

function assignment(id) {
  return byId(state.assignments, id);
}

function assignmentForAttempt(attempt) {
  if (!attempt) return null;
  return state.assignments.find((item) => item.contributorId === attempt.contributorId && item.quizId === attempt.quizId) || null;
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
  if (quiz(item.quizId)?.unlimitedRetakes) return Infinity;
  return Math.max(0, Number(item.retakesAllowed || 0) - Number(item.retakesUsed || 0));
}

function retakeLabel(item) {
  return quiz(item.quizId)?.unlimitedRetakes ? "Unlimited" : String(remainingRetakes(item));
}

function retakeDraftValue(item) {
  if (!item) return 0;
  if (Object.prototype.hasOwnProperty.call(retakeDrafts, item.id)) return retakeDrafts[item.id];
  return remainingRetakes(item);
}

function renderRetakeEditor(item) {
  if (quiz(item.quizId)?.unlimitedRetakes) {
    return `<div class="retake-static">Unlimited</div>`;
  }
  const savedValue = remainingRetakes(item);
  const draftValue = retakeDraftValue(item);
  const changed = draftValue !== savedValue;
  return `
    <div class="retake-editor ${changed ? "is-dirty" : ""}">
      <button class="retake-step" data-action="retake-step" data-assignment-id="${item.id}" data-delta="-1" ${draftValue <= 0 ? "disabled" : ""} aria-label="Decrease retakes">-</button>
      <span class="retake-count">${draftValue}</span>
      <button class="retake-step" data-action="retake-step" data-assignment-id="${item.id}" data-delta="1" aria-label="Increase retakes">+</button>
      ${changed ? `<button class="button small retake-save" data-action="save-retake-count" data-assignment-id="${item.id}">Save</button>` : ""}
    </div>
    ${changed ? `<div class="cell-sub retake-saved-value">Saved: ${savedValue}</div>` : ""}
  `;
}

function assignmentStatus(item) {
  const itemQuiz = quiz(item.quizId);
  const latest = latestAttempt(item.contributorId, item.quizId);
  if (contributor(item.contributorId)?.offboarded) return "Offboarded";
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
  const latest = latestAttempt(item.contributorId, item.quizId);
  if (!latest) return "Not started";
  if (latest.status === "In progress") return "In progress";
  if (latest.status === "Passed") return "Passed";
  if (latest.status === "Failed") return "Failed";
  if (latest.status === "Submitted") return "In progress";
  return latest.status;
}

function shouldShowRequired(item) {
  const status = assignmentStatus(item);
  return ["Not started", "In progress", "Retake available", "Locked", "Project inactive", "Offboarded"].includes(status);
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

function attemptTimeValue(attempt) {
  if (!attempt) return 0;
  return new Date(attempt.submittedAt || attempt.startedAt || 0).getTime() || 0;
}

function attemptSortValue(row) {
  return row.latest ? attemptTimeValue(row.latest) : (new Date(row.item.assignedAt || 0).getTime() || 0);
}

function responseDateLabel(row) {
  if (row.latest?.submittedAt) return `Submitted ${formatDate(row.latest.submittedAt)}`;
  if (row.latest?.startedAt) return `Started ${formatDate(row.latest.startedAt)}`;
  return row.item.assignedAt ? `Assigned ${formatDate(row.item.assignedAt)}` : "-";
}

function timestampLabel() {
  return new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
}

function addAudit(action, target) {
  state.audit.unshift({
    id: `au-${Date.now()}`,
    actor: currentUser()?.name || "Admin",
    action,
    target,
    at: timestampLabel()
  });
}

function addOffboardingLog(action, person) {
  state.offboardingLog = state.offboardingLog || [];
  state.offboardingLog.unshift({
    id: `ob-${Date.now()}`,
    contributorId: person.id,
    name: person.name,
    email: person.email,
    action,
    actor: currentUser()?.name || "Admin",
    at: timestampLabel()
  });
}

function isAdminAccessAudit(event) {
  return String(event?.action || "").toLowerCase().includes("admin access");
}

function isOffboardingAudit(event) {
  const value = `${event?.action || ""} ${event?.target || ""}`.toLowerCase();
  return value.includes("offboard") || value.includes("restored");
}

function isQuizContentAudit(event) {
  const value = String(event?.action || "").toLowerCase();
  return value.includes("quiz created")
    || value.includes("quiz duplicated")
    || value.includes("quiz deleted")
    || value.includes("assessment content")
    || value.includes("quiz version")
    || value.includes("quiz changes")
    || value.includes("quiz setting")
    || value.includes("assessment order")
    || value.includes("course page")
    || value.includes("question")
    || value.includes("image uploaded")
    || value.includes("image removed")
    || value.includes("assigned by email")
    || value.includes("pushed to all dashboards")
    || value.includes("removed from dashboards")
    || value.includes("assignment removed");
}

function contributorQuizAuditEvents() {
  return (state.audit || []).filter((event) => !isAdminAccessAudit(event) && !isOffboardingAudit(event) && !isQuizContentAudit(event));
}

function adminAccessAuditEvents() {
  return (state.audit || []).filter(isAdminAccessAudit);
}

function quizAuditEvents(itemQuiz) {
  if (!itemQuiz) return [];
  const title = String(itemQuiz.title || "").toLowerCase();
  return (state.audit || []).filter((event) => {
    const target = String(event.target || "").toLowerCase();
    return isQuizContentAudit(event) && target.includes(title);
  });
}

function render() {
  stopTimer();
  document.body.dataset.theme = state.theme;
  if (!isAdmin() && ["admin", "offboarding", "editor", "analytics"].includes(view)) {
    view = "contributor";
  }
  document.body.dataset.view = view;
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
    offboarding: renderOffboarding(),
    editor: renderEditor(),
    analytics: renderAnalytics()
  }[view] || renderContributor();
  app.innerHTML = renderShell(content);
  saveState();
}

function renderShell(content) {
  const current = currentUser();
  const title = {
    contributor: "Contributor dashboard",
    admin: "Contributor overview",
    offboarding: "Offboarding",
    editor: editorMode === "home" ? "Quiz library" : "Quiz editor",
    analytics: "Quiz analytics"
  }[view];
  const subtitle = {
    contributor: "Complete required assessments and review your history.",
    admin: "Manage contributor qualifications and review quality.",
    offboarding: "Manage access while preserving read-only history.",
    editor: editorMode === "home" ? "Create, manage, publish, and assign qualification quizzes." : "View assessment details, then edit when changes are needed.",
    analytics: "Review question performance and score patterns."
  }[view];
  return `
    <div class="app-shell">
      <main class="main">
        <header class="topbar">
          <div class="topbar-heading">
            <div>
              <div class="topbar-title">${escapeHtml(title)}</div>
              <div class="topbar-subtitle">${escapeHtml(subtitle)}</div>
              <div class="topbar-meta">${escapeHtml(current.name)} - ${escapeHtml(current.email)} - ${isAdmin(current) ? "Admin" : "Contributor"}</div>
            </div>
          </div>
          <div class="topbar-actions">
            <div class="brand-logo" aria-label="Snorkel">
              <img src="https://s46486.pcdn.co/wp-content/uploads/2023/05/snorkel_logo_header-1.svg" alt="Snorkel">
            </div>
            <select class="select" data-action="switch-contributor" aria-label="Current contributor">
              ${state.contributors.map((person) => `
                <option value="${person.id}" ${person.id === state.currentContributorId ? "selected" : ""}>
                  ${escapeHtml(person.name)} (${person.role === "admin" ? "Admin" : "Contributor"})
                </option>
              `).join("")}
            </select>
            ${isAdmin(current) ? `<button class="button secondary" data-action="open-make-admin">Admin access</button>` : ""}
            <button class="button secondary" data-action="toggle-theme">${state.theme === "dark" ? "Light mode" : "Dark mode"}</button>
            <button class="button ghost" data-action="reset-sandbox">Reset sandbox</button>
          </div>
        </header>
        <nav class="top-nav" aria-label="Main">
          ${navButton("contributor", "Contributor")}
          ${isAdmin(current) ? `
            ${navButton("admin", "Contributor overview")}
            ${navButton("offboarding", "Offboarding")}
            ${navButton("editor", "Quiz library")}
            ${navButton("analytics", "Analytics")}
          ` : ""}
        </nav>
        ${content}
        ${makeAdminOpen ? renderAdminAccessModal() : ""}
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
            ${current.offboarded ? `<span class="status offboarded">View-only history</span>` : ""}
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
                <div class="stat-label">Passed</div>
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
      ${renderContributorHistoryDetail()}
    </section>
  `;
}

function renderContributorQuizCard(item) {
  const itemQuiz = quiz(item.quizId);
  const person = contributor(item.contributorId);
  const status = assignmentStatus(item);
  const latest = latestAttempt(item.contributorId, item.quizId);
  const disabled = ["Locked", "Project inactive", "Offboarded"].includes(status) || person?.offboarded;
  const buttonLabel = status === "In progress" ? "Resume" : status === "Retake available" ? "Retake" : "Start";
  const message = status === "Project inactive"
    ? "This project is currently inactive. Your quiz history is still available."
    : status === "Offboarded"
      ? "This contributor has been offboarded. Quiz actions are disabled, but history is still available."
    : status === "Locked"
      ? "An admin has locked this quiz."
      : `${itemQuiz.estimatedMinutes} minute estimate. Active quiz time is recorded.`;
  return `
    <article class="quiz-card ${disabled ? "is-disabled" : ""}">
      <div>
        <h3 class="quiz-card-title">${escapeHtml(itemQuiz.title)}</h3>
        <div class="quiz-card-meta">
          <span class="status ${statusClass(status)}">${escapeHtml(status)}</span>
        </div>
      </div>
      <div class="quiz-card-body">
        ${escapeHtml(message)}
        ${latest && latest.status === "In progress" ? `<br>Saved active time: ${formatSeconds(latest.activeSeconds)}.` : ""}
      </div>
      <div class="quiz-card-actions">
        ${disabled ? `<button class="button secondary" disabled>Guidelines</button>` : `<a class="button secondary" href="${escapeHtml(itemQuiz.guidelinesUrl)}" target="_blank" rel="noreferrer">Guidelines</a>`}
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
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          ${history.map(({ item, latest }) => {
            const itemQuiz = quiz(item.quizId);
            return `
              <tr>
                <td>
                  <div class="cell-title">${escapeHtml(itemQuiz.title)}</div>
                </td>
                <td><span class="status ${statusClass(latest.status)}">${escapeHtml(latest.status)}</span></td>
                <td>${latest.score === null ? "Pending" : `${latest.score}%`}</td>
                <td>${formatSeconds(latest.activeSeconds)}</td>
                <td>${formatDate(latest.submittedAt)}</td>
                <td>
                  <div class="row-actions">
                    <button class="button small secondary" data-action="view-history-attempt" data-attempt-id="${latest.id}">View</button>
                  </div>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderContributorHistoryDetail() {
  if (!selectedHistoryAttemptId) return "";
  const attempt = byId(state.attempts, selectedHistoryAttemptId);
  if (!attempt || attempt.contributorId !== state.currentContributorId) return "";
  const itemQuiz = quiz(attempt.quizId);
  if (!itemQuiz) return "";
  return `
    <div class="modal-backdrop" data-modal-backdrop="history-attempt">
      <div class="modal-card compact" role="dialog" aria-modal="true" aria-labelledby="history-detail-title">
        <div class="modal-header">
          <div>
            <h2 id="history-detail-title" class="section-title small">Attempt history</h2>
            <div class="section-kicker">${escapeHtml(itemQuiz.title)}</div>
          </div>
          <button class="button ghost" data-action="close-history-attempt">Close</button>
        </div>
        <div class="modal-body">
          <div class="stat-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="stat">
              <div class="stat-label">Status</div>
              <div class="stat-value" style="font-size: 22px;">${escapeHtml(attempt.status)}</div>
              <div class="stat-note">Missed-answer review is not available.</div>
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
              <div class="stat-note">History remains readable.</div>
            </div>
          </div>
          <div style="height: 16px;"></div>
          <div class="empty-state">Scores and status are visible here. Correct answers and missed-question review are only available to admins.</div>
        </div>
      </div>
    </div>
  `;
}

function renderAdmin() {
  const rows = filteredAdminRows();
  return `
    <section class="content admin-content">
      <div class="admin-dashboard-grid">
        ${renderAuditLogCard({
          title: "Contributor quiz log",
          kicker: "Retakes, locks, scoring, notes, review actions, and attempt changes.",
          events: contributorQuizAuditEvents()
        })}
        <div class="admin-main">
          ${renderAdminSubTabs()}
          ${adminSubView === "responses" ? renderAdminReviewCallout() : ""}
          ${adminSubView === "written" ? renderWrittenScoringPanel() : `
          <div class="panel">
            <div class="panel-header">
              <div>
                <h1 class="section-title">Contributor queue</h1>
                <div class="section-kicker">Contributor-first view with filters, CSV export, and attempt review.</div>
              </div>
              <div class="row-actions">
                <button class="button secondary" data-action="open-bulk-retake">Bulk retake</button>
                <button class="button" data-action="export-csv">Export CSV</button>
              </div>
            </div>
            <div class="panel-body">
              ${renderFilters()}
              <div style="height: 14px;"></div>
              ${renderAdminTable(rows)}
            </div>
          </div>
          `}
        </div>
      </div>
      ${renderAttemptDetail()}
      ${bulkRetakeOpen ? renderBulkRetakeModal() : ""}
      ${auditLogOpen ? renderAuditLogModal() : ""}
    </section>
  `;
}

function renderAuditLogCard({ title = "Audit log", kicker = "Recent activity across the current view.", events = state.audit || [], showViewAll = true } = {}) {
  return `
    <aside class="panel audit-card">
      <div class="audit-card-header">
        <div class="audit-card-icon">${auditIconSvg("log")}</div>
        <div>
          <h2 class="section-title small">${escapeHtml(title)}</h2>
          <div class="section-kicker">${escapeHtml(kicker)}</div>
        </div>
      </div>
      <div class="audit-timeline">
        ${events.length ? events.slice(0, 7).map(renderAuditTimelineItem).join("") : `<div class="empty-state compact-empty">No audit events yet.</div>`}
      </div>
      ${showViewAll ? `<button class="button secondary audit-view-all" data-action="open-audit-log">
        View full audit log
        <span aria-hidden="true">&rsaquo;</span>
      </button>` : ""}
    </aside>
  `;
}

function renderAuditTimelineItem(event) {
  const tone = auditTone(event.action);
  return `
    <div class="audit-timeline-item">
      <div class="audit-dot ${tone}">${auditIconSvg(auditIconType(event.action))}</div>
      <div class="audit-event-copy">
        <div class="audit-event-title">${escapeHtml(event.action)}</div>
        <div class="audit-event-target">${escapeHtml(event.target)}</div>
        <div class="audit-event-meta">${escapeHtml(event.actor)} - ${escapeHtml(auditTimeLabel(event.at))}</div>
      </div>
    </div>
  `;
}

function renderAuditLogModal() {
  const events = contributorQuizAuditEvents();
  return `
    <div class="modal-backdrop" data-modal-backdrop="audit-log">
      <div class="modal-card audit-modal" role="dialog" aria-modal="true" aria-labelledby="audit-log-title">
        <div class="modal-header">
          <div>
            <h2 id="audit-log-title" class="section-title small">Contributor quiz log</h2>
            <div class="section-kicker">Complete contributor-quiz activity for this dashboard.</div>
          </div>
          <button class="button ghost" data-action="close-audit-log">Close</button>
        </div>
        <div class="modal-body">
          <div class="audit-timeline full">
            ${events.length ? events.map(renderAuditTimelineItem).join("") : `<div class="empty-state">No audit events yet.</div>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function auditTimeLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "-";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function auditTone(action) {
  const value = String(action || "").toLowerCase();
  if (value.includes("delete") || value.includes("removed") || value.includes("offboard") || value.includes("lock")) return "tone-red";
  if (value.includes("image")) return "tone-orange";
  if (value.includes("assign") || value.includes("email") || value.includes("admin")) return "tone-purple";
  if (value.includes("publish") || value.includes("pushed") || value.includes("created") || value.includes("duplicated")) return "tone-green";
  if (value.includes("score") || value.includes("result") || value.includes("submitted")) return "tone-amber";
  return "tone-blue";
}

function auditIconType(action) {
  const value = String(action || "").toLowerCase();
  if (value.includes("delete") || value.includes("removed")) return "trash";
  if (value.includes("image")) return "image";
  if (value.includes("assign") || value.includes("email")) return "mail";
  if (value.includes("publish") || value.includes("pushed")) return "upload";
  if (value.includes("admin") || value.includes("offboard") || value.includes("lock")) return "shield";
  if (value.includes("score") || value.includes("result") || value.includes("submitted")) return "check";
  return "file";
}

function auditIconSvg(type) {
  const paths = {
    log: `<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 12h5"/><path d="M9 16h4"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 1.8 1.8"/>`,
    file: `<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M10 13h6"/><path d="M10 17h4"/>`,
    mail: `<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m5 7 7 6 7-6"/>`,
    upload: `<path d="M7 17a4 4 0 0 1 1-7.9A5 5 0 0 1 18 10a3.5 3.5 0 0 1-.5 7H15"/><path d="M12 19V11"/><path d="m9 14 3-3 3 3"/>`,
    image: `<rect x="4" y="5" width="16" height="14" rx="2"/><path d="m7 16 4-4 3 3 2-2 3 3"/><circle cx="9" cy="9" r="1.5"/>`,
    trash: `<path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M8 10v9"/><path d="M12 10v9"/><path d="M16 10v9"/><path d="M7 7l1 14h8l1-14"/>`,
    shield: `<path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="m9 12 2 2 4-5"/>`,
    check: `<circle cx="12" cy="12" r="8"/><path d="m8 12 3 3 5-6"/>`
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[type] || paths.file}</svg>`;
}

function renderAdminSubTabs() {
  return `
    <div class="subtabs" aria-label="Admin sections">
      <button class="subtab ${adminSubView === "responses" ? "is-active" : ""}" data-action="admin-subtab" data-admin-subtab="responses">Responses</button>
      <button class="subtab ${adminSubView === "written" ? "is-active" : ""}" data-action="admin-subtab" data-admin-subtab="written">Admin review</button>
    </div>
  `;
}

function renderAdminReviewCallout() {
  const count = pendingWrittenReviewRows().length;
  if (!count) return "";
  return `
    <div class="review-callout">
      <div class="review-callout-icon">${auditIconSvg("shield")}</div>
      <div>
        <div class="strong">${count} response${count === 1 ? "" : "s"} need${count === 1 ? "s" : ""} admin review</div>
        <div class="cell-sub">Review pending responses to keep contributors moving.</div>
      </div>
      <button class="button" data-action="admin-subtab" data-admin-subtab="written">Review now</button>
    </div>
  `;
}

function renderOffboarding() {
  return `
    <section class="content">
      <div class="toolbar">
        <div>
          <h1 class="section-title">Offboarding</h1>
          <div class="section-kicker">Manage contributor access separately from quiz progress, especially when the contributor list gets long.</div>
        </div>
      </div>
      ${renderOffboardingPanel()}
    </section>
  `;
}

function renderOffboardingPanel() {
  const search = filters.offboardingSearch.trim().toLowerCase();
  const contributors = state.contributors
    .filter((person) => !isAdmin(person))
    .filter((person) => !search || `${person.name} ${person.email} ${person.cohort}`.toLowerCase().includes(search));
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2 class="section-title small">Contributor access</h2>
          <div class="section-kicker">Offboarding is contributor-level. It disables quiz actions but keeps attempt history visible.</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="offboarding-tools">
          <div class="field compact-field">
            <label for="offboarding-search">Search contributors</label>
            <input id="offboarding-search" class="input" data-filter="offboardingSearch" value="${escapeHtml(filters.offboardingSearch)}" placeholder="Search name, email, or cohort">
          </div>
          <div class="field compact-field">
            <label for="bulk-offboard-emails">Bulk offboard emails</label>
            <div class="inline-action-field">
              <input id="bulk-offboard-emails" class="input" data-bulk-offboard-emails placeholder="name@example.com, name2@example.com">
              <button class="button secondary" data-action="bulk-offboard-emails">Bulk offboard</button>
            </div>
          </div>
        </div>
        <div style="height: 14px;"></div>
        <div class="offboarding-grid">
          <aside class="panel audit-card offboarding-log-card">
            <div class="audit-card-header">
              <div class="audit-card-icon">${auditIconSvg("shield")}</div>
              <div>
                <h2 class="section-title small">Offboarding log</h2>
                <div class="section-kicker">Tracks both offboarding and restored access.</div>
              </div>
            </div>
            <div class="audit-list">
              ${(state.offboardingLog || []).length ? state.offboardingLog.slice(0, 8).map((event) => `
                <div class="audit-item">
                  <div class="strong">${escapeHtml(event.action)} - ${escapeHtml(event.name || event.email)}</div>
                  <div class="cell-sub">${escapeHtml(event.email)} - ${escapeHtml(event.actor)} - ${escapeHtml(event.at)}</div>
                </div>
              `).join("") : `<div class="empty-state">No offboarding changes yet.</div>`}
            </div>
          </aside>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Contributor</th>
                  <th>Status</th>
                  <th>Assigned quizzes</th>
                  <th>Latest attempt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${contributors.map((person) => {
                  const assignedCount = state.assignments.filter((item) => item.contributorId === person.id).length;
                  const latest = state.attempts
                    .filter((attempt) => attempt.contributorId === person.id)
                    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))[0];
                  return `
                    <tr>
                      <td>
                        <div class="cell-title">${escapeHtml(person.name)}</div>
                        <div class="cell-sub">${escapeHtml(person.email)}</div>
                      </td>
                      <td><span class="status ${person.offboarded ? "offboarded" : "passed"}">${person.offboarded ? "Offboarded" : "Active"}</span></td>
                      <td>${assignedCount}</td>
                      <td>${latest ? `${escapeHtml(quiz(latest.quizId)?.title || "Quiz")} - ${escapeHtml(latest.status)}` : "No attempts yet"}</td>
                      <td>
                        <button class="button small ${person.offboarded ? "" : "secondary"}" data-action="toggle-contributor-offboard" data-contributor-id="${person.id}">
                          ${person.offboarded ? "Restore" : "Offboard"}
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function writtenReviewRows({ includeIgnored = false, ignored = false } = {}) {
  return state.attempts
    .filter((attempt) => attempt.status === "Submitted" || attempt.manualReview)
    .map((attempt) => ({
      attempt,
      person: contributor(attempt.contributorId),
      itemQuiz: quiz(attempt.quizId)
    }))
    .filter((row) => row.person && row.itemQuiz && !row.person.offboarded)
    .filter((row) => includeIgnored || Boolean(row.attempt.manualReviewIgnored) === ignored)
    .sort((a, b) => attemptTimeValue(b.attempt) - attemptTimeValue(a.attempt));
}

function pendingWrittenReviewRows() {
  return writtenReviewRows({ ignored: false });
}

function ignoredWrittenReviewRows() {
  return writtenReviewRows({ ignored: true });
}

function renderWrittenScoringPanel() {
  const rows = pendingWrittenReviewRows();
  const ignoredRows = ignoredWrittenReviewRows();
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h1 class="section-title">Pending admin review</h1>
          <div class="section-kicker">Long text responses land here until an admin assigns a score.</div>
        </div>
        <div class="pending-review-banner">
          <span class="pending-x" aria-hidden="true">X</span>
          <span>${rows.length} pending</span>
        </div>
      </div>
      <div class="panel-body">
        ${rows.length ? `
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Contributor</th>
                  <th>Quiz</th>
                  <th>Written response</th>
                  <th>Submitted</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(({ attempt, person, itemQuiz }) => {
                  const writtenQuestions = itemQuiz.questions.filter((question) => question.type === "Long text");
                  const preview = writtenQuestions.map((question) => attempt.answers?.[question.id]).filter(Boolean).join(" ");
                  return `
                    <tr>
                      <td>
                        <div class="cell-title">${escapeHtml(person.name)}</div>
                        <div class="cell-sub">${escapeHtml(person.email)}</div>
                      </td>
                      <td>
                        <div class="cell-title">${escapeHtml(itemQuiz.title)}</div>
                        <div class="cell-sub">Threshold ${itemQuiz.passThreshold}%</div>
                      </td>
                      <td><div class="written-preview">${escapeHtml(preview || "No written response captured.")}</div></td>
                      <td>${formatDate(attempt.submittedAt)}</td>
                      <td>
                        <input class="input score-input" type="number" min="0" max="100" value="${attempt.score ?? itemQuiz.passThreshold}" data-written-score="${attempt.id}" aria-label="Score for ${escapeHtml(person.name)}">
                      </td>
                      <td>
                        <div class="row-actions">
                          <button class="button small secondary" data-action="view-attempt" data-attempt-id="${attempt.id}">Review</button>
                          <button class="button small ghost" data-action="ignore-written-review" data-attempt-id="${attempt.id}">Ignore</button>
                          <button class="button small" data-action="score-written-attempt" data-attempt-id="${attempt.id}">Save score</button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="empty-state">No written responses need scoring right now.</div>`}
        ${ignoredRows.length ? `
          <div class="ignored-review-section">
            <div class="table-section-heading">
              <div>
                <div class="strong">Ignored admin reviews</div>
                <div class="cell-sub">Hidden from the notification count, but still available to review later.</div>
              </div>
              <span class="status locked">${ignoredRows.length} ignored</span>
            </div>
            <div class="table-wrap compact-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Contributor</th>
                    <th>Quiz</th>
                    <th>Written response</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${ignoredRows.map(({ attempt, person, itemQuiz }) => {
                    const writtenQuestions = itemQuiz.questions.filter((question) => question.type === "Long text");
                    const preview = writtenQuestions.map((question) => attempt.answers?.[question.id]).filter(Boolean).join(" ");
                    return `
                      <tr>
                        <td>
                          <div class="cell-title">${escapeHtml(person.name)}</div>
                          <div class="cell-sub">${escapeHtml(person.email)}</div>
                        </td>
                        <td>
                          <div class="cell-title">${escapeHtml(itemQuiz.title)}</div>
                          <div class="cell-sub">Threshold ${itemQuiz.passThreshold}%</div>
                        </td>
                        <td><div class="written-preview">${escapeHtml(preview || "No written response captured.")}</div></td>
                        <td>${formatDate(attempt.submittedAt)}</td>
                        <td>
                          <div class="row-actions">
                            <button class="button small secondary" data-action="view-attempt" data-attempt-id="${attempt.id}">Review</button>
                            <button class="button small" data-action="restore-written-review" data-attempt-id="${attempt.id}">Restore</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderAdminAccessModal() {
  const admins = state.contributors.filter((person) => isAdmin(person));
  const canRemoveAdmins = admins.length > 1;
  const accessEvents = adminAccessAuditEvents();
  return `
    <div class="modal-backdrop" data-modal-backdrop="make-admin">
      <div class="modal-card compact" role="dialog" aria-modal="true" aria-labelledby="admin-access-title">
        <div class="modal-header">
        <div>
            <h2 id="admin-access-title" class="section-title small">Admin access</h2>
            <div class="section-kicker">Add or remove admin permissions for this assessment dashboard.</div>
        </div>
          <button class="button ghost" data-action="close-make-admin">Close</button>
      </div>
        <div class="modal-body">
          <div class="field">
            <label for="make-admin-email">Email</label>
            <input id="make-admin-email" class="input" data-make-admin-email placeholder="name@example.com" autocomplete="off">
          </div>
          <div class="modal-inline-actions">
            <button class="button" data-action="make-admin-by-email">Add admin</button>
          </div>
          <div class="helper-text">In this sandbox, the email can match an existing sample account or create a new invited admin account.</div>
          <div class="admin-access-section">
            <div class="table-section-heading">
              <div>
                <div class="strong">Current admins</div>
                <div class="cell-sub">${admins.length} admin${admins.length === 1 ? "" : "s"} have access.</div>
              </div>
            </div>
            <div class="admin-access-list">
              ${admins.map((person) => {
                const isCurrent = person.id === state.currentContributorId;
                const canRemove = canRemoveAdmins && !isCurrent;
                return `
                  <div class="admin-access-row">
                    <div>
                      <div class="cell-title">${escapeHtml(person.name)}</div>
                      <div class="cell-sub">${escapeHtml(person.email)}${isCurrent ? " - Current admin" : ""}</div>
                    </div>
                    <button class="button small danger-ghost" data-action="remove-admin" data-contributor-id="${person.id}" ${canRemove ? "" : "disabled"}>Remove admin</button>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
          <div class="admin-access-section">
            <div class="table-section-heading">
              <div>
                <div class="strong">Admin access log</div>
                <div class="cell-sub">Tracks admin permissions granted or removed.</div>
              </div>
            </div>
            <div class="audit-list compact-audit-list">
              ${accessEvents.length ? accessEvents.slice(0, 8).map(renderAuditTimelineItem).join("") : `<div class="empty-state compact-empty">No admin access changes yet.</div>`}
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="button secondary" data-action="close-make-admin">Done</button>
        </div>
      </div>
    </div>
  `;
}

function renderBulkRetakeModal() {
  const defaultQuizId = filters.quiz !== "All" && quiz(filters.quiz) ? filters.quiz : (selectedQuizId || state.quizzes[0]?.id);
  return `
    <div class="modal-backdrop" data-modal-backdrop="bulk-retake">
      <div class="modal-card compact" role="dialog" aria-modal="true" aria-labelledby="bulk-retake-title">
        <div class="modal-header">
          <div>
            <h2 id="bulk-retake-title" class="section-title small">Bulk retake</h2>
            <div class="section-kicker">Grant retakes by email and reset active course progress for the selected quiz.</div>
          </div>
          <button class="button ghost" data-action="close-bulk-retake">Close</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label for="bulk-retake-quiz">Quiz</label>
            <select id="bulk-retake-quiz" class="select" data-bulk-retake-quiz>
              ${state.quizzes.map((itemQuiz) => `<option value="${itemQuiz.id}" ${itemQuiz.id === defaultQuizId ? "selected" : ""}>${escapeHtml(itemQuiz.title)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="bulk-retake-count">Retakes to grant</label>
            <input id="bulk-retake-count" class="input" type="number" min="0" value="1" data-bulk-retake-count>
          </div>
          <div class="field">
            <label for="bulk-retake-emails">Contributor emails</label>
            <textarea id="bulk-retake-emails" class="textarea" data-bulk-retake-emails placeholder="alex.rivera@example.com, nia.patel@example.com"></textarea>
          </div>
          <div class="helper-text">Previous submitted attempts remain in history. In-progress attempts for this quiz are cleared so the contributor starts cleanly.</div>
        </div>
        <div class="modal-actions">
          <button class="button secondary" data-action="close-bulk-retake">Cancel</button>
          <button class="button" data-action="apply-bulk-retake">Apply retakes</button>
        </div>
      </div>
    </div>
  `;
}

function adminStats() {
  const quizId = filters.metricQuiz;
  const assignments = state.assignments
    .filter((item) => quizId === "All" || item.quizId === quizId)
    .filter((item) => !contributor(item.contributorId)?.offboarded);
  const attempts = state.attempts
    .filter((attempt) => quizId === "All" || attempt.quizId === quizId)
    .filter((attempt) => !contributor(attempt.contributorId)?.offboarded);
  const allRows = assignments.map((item) => ({ item, status: adminStatus(item), latest: latestAttempt(item.contributorId, item.quizId) }));
  return {
    passed: attempts.filter((attempt) => attempt.status === "Passed").length,
    failed: attempts.filter((attempt) => attempt.status === "Failed").length,
    inProgress: allRows.filter((row) => row.status === "In progress").length,
    notStarted: allRows.filter((row) => row.status === "Not started").length
  };
}

function renderAnalyticsOverview() {
  const stats = adminStats();
  const metricTitle = filters.metricQuiz === "All" ? "All quizzes" : quiz(filters.metricQuiz)?.title || "All quizzes";
  return `
    <div class="panel">
      <div class="panel-body">
        <div class="metrics-toolbar">
          <div>
            <h1 class="section-title">Overview</h1>
            <div class="section-kicker">${escapeHtml(metricTitle)}</div>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat">
            <div class="stat-label">Passed</div>
            <div class="stat-value">${stats.passed}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Failed</div>
            <div class="stat-value">${stats.failed}</div>
          </div>
          <div class="stat">
            <div class="stat-label">In progress</div>
            <div class="stat-value">${stats.inProgress}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Not started</div>
            <div class="stat-value">${stats.notStarted}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFilters() {
  const statuses = ["All", "Passed", "Failed", "In progress", "Not started"];
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
      if (!row.person || !row.itemQuiz || row.person.offboarded) return false;
      const search = filters.search.trim().toLowerCase();
      if (search && !`${row.person.name} ${row.person.email}`.toLowerCase().includes(search)) return false;
      if (filters.quiz !== "All" && row.itemQuiz.id !== filters.quiz) return false;
      if (filters.status !== "All" && row.status !== filters.status && row.latest?.status !== filters.status) return false;
      if (filters.score !== "All") {
        if (!row.latest || row.latest.score === null) return filters.score === "Pending";
        if (filters.score === "90-100" && row.latest.score < 90) return false;
        if (filters.score === "80-89" && (row.latest.score < 80 || row.latest.score > 89)) return false;
        if (filters.score === "Below 80" && row.latest.score >= 80) return false;
      }
      return true;
    })
    .sort((a, b) => attemptSortValue(b) - attemptSortValue(a));
}

function renderAdminTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Contributor</th>
            <th>Quiz</th>
            <th>Status</th>
            <th>Score</th>
            <th>Time</th>
            <th>Attempt date</th>
            <th>Retakes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>
                <div class="cell-title">${escapeHtml(row.person.name)}</div>
                <div class="cell-sub">${escapeHtml(row.person.email)} - ${escapeHtml(row.person.cohort)}</div>
                ${row.person.offboarded ? `<div style="margin-top: 6px;"><span class="status offboarded">Offboarded</span></div>` : ""}
              </td>
              <td>
                <div class="cell-title">${escapeHtml(row.itemQuiz.title)}</div>
              </td>
              <td><span class="status ${statusClass(row.status)}">${escapeHtml(row.status)}</span></td>
              <td>${row.latest && row.latest.score !== null ? `${row.latest.score}%` : "Pending"}</td>
              <td>${row.latest ? formatSeconds(row.latest.activeSeconds) : "-"}</td>
              <td>${escapeHtml(responseDateLabel(row))}</td>
              <td>${renderRetakeEditor(row.item)}</td>
              <td>
                <div class="row-actions">
                  <button class="button small secondary" data-action="view-attempt" data-attempt-id="${row.latest ? row.latest.id : ""}" ${row.latest ? "" : "disabled"}>View attempt</button>
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
  const item = assignmentForAttempt(attempt);
  return `
    <div class="modal-backdrop" data-modal-backdrop="attempt">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="attempt-detail-title">
        <div class="modal-header">
        <div>
            <h2 id="attempt-detail-title" class="section-title small">Attempt detail</h2>
          <div class="section-kicker">${escapeHtml(person.email)} - ${escapeHtml(itemQuiz.title)}</div>
        </div>
        <button class="button ghost" data-action="close-attempt">Close</button>
      </div>
        <div class="modal-body">
          ${item ? `
            <div class="modal-actions top">
              <button class="button secondary" data-action="toggle-lock" data-assignment-id="${item.id}">${item.locked ? "Unlock" : "Lock"}</button>
              <button class="button secondary" data-action="change-result" data-assignment-id="${item.id}" ${attempt.status === "In progress" ? "disabled" : ""}>Change result</button>
            </div>
          ` : ""}
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
    </div>
  `;
}

function renderEditor() {
  if (editorMode === "home") return renderEditorHome();
  const itemQuiz = quiz(selectedQuizId) || state.quizzes[0];
  const contentItems = quizContentItems(itemQuiz);
  const assignedCount = assignmentCountForQuiz(itemQuiz.id);
  const modeLabel = editorReadOnly ? "Viewing" : "Editing";
  return `
    <section class="content">
      <div class="toolbar">
        <div class="editor-heading">
          <div class="editor-heading-actions">
            <button class="back-arrow-button" data-action="editor-home" aria-label="Back to all quizzes" title="Back to all quizzes">←</button>
            ${editorReadOnly ? "" : `<button class="button secondary discard-button" data-action="discard-editor-changes">Discard changes</button>`}
            <button class="button secondary discard-button" data-action="open-version-history" data-quiz-id="${itemQuiz.id}">Version history</button>
          </div>
          <h1 class="section-title">${modeLabel}: ${escapeHtml(itemQuiz.title)}</h1>
          <div class="section-kicker">${editorReadOnly ? "Review assessment content before editing." : `One project sandbox: ${escapeHtml(PROJECT_NAME)}. Drag course pages and questions into the order contributors should see them.`}</div>
        </div>
        <div class="editor-detail-actions">
          <button class="button secondary" data-action="enter-edit-mode" data-quiz-id="${itemQuiz.id}" ${editorReadOnly ? "" : "disabled"}>Edit</button>
          <button class="button secondary" data-action="preview-quiz" data-quiz-id="${itemQuiz.id}">Preview</button>
          <button class="button" data-action="publish-quiz" data-quiz-id="${itemQuiz.id}" ${itemQuiz.draftDirty ? "" : "disabled"}>Publish content</button>
        </div>
      </div>
      <div class="editor-grid">
        <div class="editor-side">
          <div class="panel">
            <div class="panel-header">
              <div>
                <h2 class="section-title small">Settings</h2>
                <div class="section-kicker">Controls match the current product rules.</div>
              </div>
            </div>
            <div class="panel-body settings-list">
              <div class="publish-note">
                <div class="strong">Publishing and assign course</div>
                <div class="cell-sub">Publishing saves the assessment content. Assigning pushes it to contributor dashboards.</div>
                <div class="pill-row">
                  <span class="status ${itemQuiz.draftDirty ? "retake-available" : "qualified"}">${itemQuiz.draftDirty ? "Unpublished changes" : "Content published"}</span>
                  <span class="status ${assignedCount ? "qualified" : "locked"}">${assignedCount} course assignment${assignedCount === 1 ? "" : "s"}</span>
                </div>
              </div>
              ${editorInput("Title", "title", itemQuiz.title)}
              ${editorInput("Google Docs guidelines URL", "guidelinesUrl", itemQuiz.guidelinesUrl)}
              ${editorNumber("Pass threshold", "passThreshold", itemQuiz.passThreshold, "%")}
              ${editorNumber("Initial retake limit", "retakeLimit", itemQuiz.retakeLimit, "retakes")}
              ${editorNumber("Estimated active time", "estimatedMinutes", itemQuiz.estimatedMinutes, "minutes")}
              ${editorToggle("Project active", "projectActive", itemQuiz.projectActive)}
              ${editorToggle("Unlimited retakes", "unlimitedRetakes", itemQuiz.unlimitedRetakes)}
              ${editorToggle("Randomize questions", "randomizeQuestions", itemQuiz.randomizeQuestions)}
              ${editorToggle("Randomize answer choices", "randomizeAnswers", itemQuiz.randomizeAnswers)}
            </div>
          </div>
          ${renderQuizActionLogPanel(itemQuiz)}
          ${renderAssignmentPanel(itemQuiz)}
        </div>
        <div class="panel builder-panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">Assessment builder</h2>
              <div class="section-kicker">${editorReadOnly ? "Read-only view. Click Edit to change ordering, content, answers, weights, and hints." : "Drag blocks to reorder. Edit text, question type, answers, correct answers, weights, and hints inline."}</div>
            </div>
          </div>
          <div class="panel-body">
            <div class="builder-list" data-builder-list="${itemQuiz.id}">
              ${contentItems.length ? contentItems.map((entry, index) => renderContentBlock(itemQuiz, entry, index, contentItems.length)).join("") : `
                <div class="empty-state">Add a course page or question to start building this quiz.</div>
              `}
            </div>
          </div>
        </div>
      </div>
      ${versionHistoryQuizId === itemQuiz.id ? renderVersionHistoryModal(itemQuiz) : ""}
      ${publishNoteQuizId === itemQuiz.id ? renderPublishNoteModal(itemQuiz) : ""}
    </section>
  `;
}

function renderQuizActionLogPanel(itemQuiz) {
  const events = quizAuditEvents(itemQuiz);
  return renderAuditLogCard({
    title: "Quiz action log",
    kicker: "Content, publishing, assignment, image, and version activity for this quiz.",
    events,
    showViewAll: false
  });
}

function renderVersionHistoryModal(itemQuiz) {
  const versions = versionsForQuiz(itemQuiz.id);
  return `
    <div class="modal-backdrop" data-modal-backdrop="version-history">
      <div class="modal-card audit-modal" role="dialog" aria-modal="true" aria-labelledby="version-history-title">
        <div class="modal-header">
          <div>
            <h2 id="version-history-title" class="section-title small">Version history</h2>
            <div class="section-kicker">${escapeHtml(itemQuiz.title)}. Restored versions become unpublished changes.</div>
          </div>
          <button class="button ghost" data-action="close-version-history">Close</button>
        </div>
        <div class="modal-body">
          <div class="version-list">
            ${versions.length ? versions.map((version, index) => `
              <div class="version-row">
                <div>
                  <div class="strong">${escapeHtml(version.title)} ${index === 0 ? `<span class="status qualified">Latest saved</span>` : ""}</div>
                  <div class="cell-sub">${escapeHtml(auditTimeLabel(version.createdAt))} - ${escapeHtml(version.actor || "Admin")}</div>
                  <div class="cell-sub">${escapeHtml(version.note || "Saved quiz content")}</div>
                  <div class="cell-sub">${escapeHtml(quizVersionSummary(version.quiz || {}))}</div>
                </div>
                <button class="button small secondary" data-action="restore-version" data-version-id="${version.id}">Restore</button>
              </div>
            `).join("") : `<div class="empty-state">No saved versions yet. Publishing creates a version snapshot.</div>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPublishNoteModal(itemQuiz) {
  return `
    <div class="modal-backdrop" data-modal-backdrop="publish-note">
      <div class="modal-card compact" role="dialog" aria-modal="true" aria-labelledby="publish-note-title">
        <div class="modal-header">
          <div>
            <h2 id="publish-note-title" class="section-title small">Publish changes</h2>
            <div class="section-kicker">${escapeHtml(itemQuiz.title)}. Describe what changed for version history.</div>
          </div>
          <button class="button ghost" data-action="close-publish-note">Close</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label for="publish-change-note">What changed?</label>
            <textarea id="publish-change-note" class="textarea" data-publish-change-note placeholder="Example: Updated rubric wording, added one scenario question, and changed pass threshold to 82%."></textarea>
          </div>
          <div class="helper-text">This note will appear on the new published version in Version history.</div>
        </div>
        <div class="modal-actions">
          <button class="button secondary" data-action="close-publish-note">Cancel</button>
          <button class="button" data-action="confirm-publish-quiz" data-quiz-id="${itemQuiz.id}">Publish content</button>
        </div>
      </div>
    </div>
  `;
}

function renderEditorHome() {
  const total = state.quizzes.length;
  const published = state.quizzes.filter((itemQuiz) => itemQuiz.status === "Published" && !itemQuiz.draftDirty).length;
  const draft = state.quizzes.filter((itemQuiz) => itemQuiz.status === "Draft").length;
  const dirty = state.quizzes.filter((itemQuiz) => itemQuiz.draftDirty).length;
  return `
    <section class="content">
      <div class="panel quiz-library-panel">
        <div class="panel-header">
          <div>
            <h1 class="section-title">Quiz library</h1>
            <div class="section-kicker">Sandbox project: ${escapeHtml(PROJECT_NAME)}. Create, manage, publish, and assign qualification quizzes.</div>
          </div>
          <button class="button" data-action="create-quiz">Create new quiz</button>
        </div>
        <div class="panel-body">
          <div class="library-stats">
            <div class="library-stat"><span class="status submitted">${total}</span><div><div class="strong">Total quizzes</div><div class="cell-sub">All sandbox assessments</div></div></div>
            <div class="library-stat"><span class="status qualified">${published}</span><div><div class="strong">Published</div><div class="cell-sub">Ready content</div></div></div>
            <div class="library-stat"><span class="status in-progress">${draft}</span><div><div class="strong">Draft</div><div class="cell-sub">Not published yet</div></div></div>
            <div class="library-stat"><span class="status failed">${dirty}</span><div><div class="strong">Unpublished changes</div><div class="cell-sub">Needs publishing</div></div></div>
          </div>
          <div class="library-divider"></div>
          <div class="card-grid">
            ${state.quizzes.map((itemQuiz) => `
              <article class="quiz-card">
                <div>
                  <h2 class="quiz-card-title">${escapeHtml(itemQuiz.title)}</h2>
                  <div class="quiz-card-meta">
                    <span class="status ${itemQuiz.draftDirty ? "retake-available" : itemQuiz.status === "Published" ? "qualified" : "submitted"}" data-dirty-badge="${itemQuiz.id}">${escapeHtml(itemQuiz.draftDirty ? "Unpublished changes" : itemQuiz.status)}</span>
                    <span class="status ${assignmentCountForQuiz(itemQuiz.id) ? "qualified" : "locked"}">${assignmentCountForQuiz(itemQuiz.id) ? "On dashboards" : "Not on dashboards"}</span>
                  </div>
                </div>
                <div class="quiz-card-body">
                  ${itemQuiz.questions.length} question${itemQuiz.questions.length === 1 ? "" : "s"} - ${assignmentCountForQuiz(itemQuiz.id)} assigned
                </div>
                <div class="quiz-card-actions editor-card-actions">
                  <button class="button" data-action="view-quiz" data-quiz-id="${itemQuiz.id}">View/Edit</button>
                  <div class="editor-card-secondary">
                    <button class="button secondary" data-action="preview-quiz" data-quiz-id="${itemQuiz.id}">Preview</button>
                    <div class="card-menu">
                      <button class="button secondary menu-trigger" type="button" aria-label="More quiz actions">...</button>
                      <div class="card-menu-panel" role="menu">
                        <button type="button" data-action="duplicate-quiz" data-quiz-id="${itemQuiz.id}">Duplicate</button>
                        <button type="button" class="danger-menu-item" data-action="delete-quiz" data-quiz-id="${itemQuiz.id}">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function editorReadonlyAttr() {
  return editorReadOnly ? "readonly" : "";
}

function editorDisabledAttr() {
  return editorReadOnly ? "disabled" : "";
}

function editorInput(label, field, value) {
  return `
    <div class="field">
      <label>${escapeHtml(label)}</label>
      <input class="input" value="${escapeHtml(value)}" data-editor-field="${field}" ${editorReadonlyAttr()}>
    </div>
  `;
}

function editorNumber(label, field, value, suffix) {
  return `
    <div class="field">
      <label>${escapeHtml(label)} (${escapeHtml(suffix)})</label>
      <input class="input" type="number" min="0" value="${escapeHtml(value)}" data-editor-field="${field}" ${editorReadonlyAttr()}>
    </div>
  `;
}

function editorToggle(label, field, enabled) {
  const description = field === "projectActive" ? "Inactive projects stay visible but disabled." : "";
  return `
    <div class="toggle-row">
      <div>
        <div class="strong">${escapeHtml(label)}</div>
        ${description ? `<div class="cell-sub">${escapeHtml(description)}</div>` : ""}
      </div>
      <button class="switch ${enabled ? "is-on" : ""}" data-action="toggle-editor" data-editor-field="${field}" aria-label="${escapeHtml(label)}" ${editorDisabledAttr()}><span></span></button>
    </div>
  `;
}

function renderAssignmentPanel(itemQuiz) {
  const canAssign = itemQuiz.status === "Published" && !itemQuiz.draftDirty;
  const canManageAssignments = canAssign && !editorReadOnly;
  const assignedPeople = assignedContributorsForQuiz(itemQuiz.id);
  return `
    <div class="panel assignment-panel">
      <div class="panel-header">
        <div>
          <h2 class="section-title small">Assign course</h2>
          <div class="section-kicker">Choose who sees this course on their contributor dashboard.</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="publish-note">
          <div class="strong">${editorReadOnly ? "Viewing assignment settings" : canAssign ? "Ready to assign" : "Publish content first"}</div>
          <div class="cell-sub">${editorReadOnly ? "Click Edit before changing dashboard assignment." : canAssign ? "Assigning makes the course appear under Required quizzes." : "Unpublished changes are not pushed to dashboards."}</div>
          <div class="cell-sub">Emails come from the signed-in contributor roster or from this allowlist for people who have not signed in yet.</div>
        </div>
        <div style="height: 12px;"></div>
        <button class="button" data-action="assign-all" data-quiz-id="${itemQuiz.id}" ${canManageAssignments ? "" : "disabled"}>Push to all contributors</button>
        <div style="height: 14px;"></div>
        <div class="field">
          <label>Assign only these emails</label>
          <textarea class="textarea assignment-textarea" data-assign-email-list="${itemQuiz.id}" placeholder="Paste emails, separated by commas or new lines" ${canManageAssignments ? "" : "disabled"}></textarea>
        </div>
        <div style="height: 12px;"></div>
        <div class="row-actions">
          <button class="button secondary" data-action="assign-listed-emails" data-quiz-id="${itemQuiz.id}" ${canManageAssignments ? "" : "disabled"}>Assign pasted emails</button>
          <button class="button ghost" data-action="clear-assignments" data-quiz-id="${itemQuiz.id}" ${canManageAssignments ? "" : "disabled"}>Clear assignments</button>
        </div>
        <div style="height: 14px;"></div>
        <div class="strong">Currently assigned</div>
        <div class="assignment-list compact">
          ${assignedPeople.length ? assignedPeople.map((person) => `
            <div class="assignment-row">
              <span>
                <span class="strong">${escapeHtml(person.name)}</span>
                <span class="cell-sub">${escapeHtml(person.email)}</span>
              </span>
              <button class="button small ghost" data-action="remove-assignment" data-quiz-id="${itemQuiz.id}" data-contributor-id="${person.id}" ${canManageAssignments ? "" : "disabled"}>Remove</button>
            </div>
          `).join("") : `<div class="empty-state compact-empty">This quiz is not on any contributor dashboards yet.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderContentBlock(itemQuiz, entry, index, total) {
  const position = contentPosition(itemQuiz, entry.key, entry.kind);
  if (entry.kind === "course") return renderCourseEditorBlock(itemQuiz, entry.item, entry.key, position, index, total);
  return renderQuestionEditorBlock(itemQuiz, entry.item, entry.key, position, index, total);
}

function renderInsertMenu(itemQuiz, key) {
  if (editorReadOnly) return "";
  return `
    <div class="insert-menu">
      <button class="insert-button" type="button" aria-label="Add after this block">+</button>
      <div class="insert-menu-options" role="menu">
        <button type="button" data-action="insert-content" data-kind="course" data-after-key="${key}" data-quiz-id="${itemQuiz.id}">Course page</button>
        <button type="button" data-action="insert-content" data-kind="question" data-after-key="${key}" data-quiz-id="${itemQuiz.id}">Question</button>
      </div>
    </div>
  `;
}

function renderCourseEditorBlock(itemQuiz, page, key, position, index, total) {
  return `
    <div class="builder-item draggable-item ${editorReadOnly ? "is-readonly" : ""}" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label">${editorReadOnly ? "" : `<span class="drag-handle" draggable="true" aria-label="Drag course page">::</span>`} Course page ${position.index} of ${position.total}</div>
          <h3 class="builder-title">${escapeHtml(page.title || "Untitled course page")}</h3>
        </div>
        <div class="row-actions">
          <span class="status not-started">Training</span>
          ${renderInsertMenu(itemQuiz, key)}
          ${editorReadOnly ? "" : `
            <button class="button small secondary" data-action="move-content" data-direction="up" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === 0 ? "disabled" : ""}>Move up</button>
            <button class="button small secondary" data-action="move-content" data-direction="down" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === total - 1 ? "disabled" : ""}>Move down</button>
            <button class="button small secondary" data-action="delete-course-page" data-quiz-id="${itemQuiz.id}" data-page-id="${page.id}">Delete</button>
          `}
        </div>
      </div>
      <div class="editor-form-grid">
        <div class="field">
          <label>Page title</label>
          <input class="input" value="${escapeHtml(page.title)}" data-course-field="title" data-quiz-id="${itemQuiz.id}" data-page-id="${page.id}" ${editorReadonlyAttr()}>
        </div>
        <div class="field full-span">
          <label>Course content</label>
          ${editorReadOnly ? "" : renderRichToolbar(itemQuiz.id, page.id)}
          <div
            class="rich-editor"
            contenteditable="${editorReadOnly ? "false" : "true"}"
            data-course-rich="${page.id}"
            data-quiz-id="${itemQuiz.id}"
            data-page-id="${page.id}"
          >${page.bodyHtml || `<p>${escapeHtml(page.body || "")}</p>`}</div>
        </div>
      </div>
    </div>
  `;
}

function renderRichToolbar(quizId, pageId) {
  return `
    <div class="rich-toolbar" data-rich-toolbar="${pageId}">
      <select class="select compact-select" data-action="rich-font" data-quiz-id="${quizId}" data-page-id="${pageId}" aria-label="Font">
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Trebuchet MS">Trebuchet</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier</option>
      </select>
      <button class="tool-button" title="Decrease font size" data-action="rich-command" data-command="fontSize" data-command-value="2" data-quiz-id="${quizId}" data-page-id="${pageId}">-</button>
      <select class="select size-select" data-action="rich-size" data-quiz-id="${quizId}" data-page-id="${pageId}" aria-label="Font size">
        <option value="">Size</option>
        <option value="1">8</option>
        <option value="2">10</option>
        <option value="3">12</option>
        <option value="4">14</option>
        <option value="5">18</option>
        <option value="6">24</option>
        <option value="7">36</option>
      </select>
      <button class="tool-button" title="Increase font size" data-action="rich-command" data-command="fontSize" data-command-value="5" data-quiz-id="${quizId}" data-page-id="${pageId}">+</button>
      <span class="toolbar-divider" aria-hidden="true"></span>
      <button class="tool-button" title="Bold" data-action="rich-command" data-command="bold" data-quiz-id="${quizId}" data-page-id="${pageId}"><strong>B</strong></button>
      <button class="tool-button" title="Italic" data-action="rich-command" data-command="italic" data-quiz-id="${quizId}" data-page-id="${pageId}"><em>I</em></button>
      <button class="tool-button" title="Underline" data-action="rich-command" data-command="underline" data-quiz-id="${quizId}" data-page-id="${pageId}"><span style="text-decoration: underline;">U</span></button>
      <label class="color-control icon-color" title="Text color">
        <span>A</span>
        <input type="color" data-action="rich-color" data-quiz-id="${quizId}" data-page-id="${pageId}" value="#206ddc">
      </label>
      <label class="color-control icon-color" title="Highlight color">
        <span>HL</span>
        <input type="color" data-action="rich-highlight" data-quiz-id="${quizId}" data-page-id="${pageId}" value="#fff1a8">
      </label>
      <span class="toolbar-divider" aria-hidden="true"></span>
      <button class="tool-button" title="Insert link" data-action="rich-command" data-command="createLink" data-quiz-id="${quizId}" data-page-id="${pageId}">Link</button>
      <button class="tool-button" title="Align left" data-action="rich-command" data-command="justifyLeft" data-quiz-id="${quizId}" data-page-id="${pageId}">L</button>
      <button class="tool-button" title="Align center" data-action="rich-command" data-command="justifyCenter" data-quiz-id="${quizId}" data-page-id="${pageId}">C</button>
      <button class="tool-button" title="Align right" data-action="rich-command" data-command="justifyRight" data-quiz-id="${quizId}" data-page-id="${pageId}">R</button>
      <button class="tool-button" title="Bullet list" data-action="rich-command" data-command="insertUnorderedList" data-quiz-id="${quizId}" data-page-id="${pageId}">&#8226;</button>
      <button class="tool-button" title="Numbered list" data-action="rich-command" data-command="insertOrderedList" data-quiz-id="${quizId}" data-page-id="${pageId}">1.</button>
      <button class="tool-button" title="Decrease indent" data-action="rich-command" data-command="outdent" data-quiz-id="${quizId}" data-page-id="${pageId}">&lt;</button>
      <button class="tool-button" title="Increase indent" data-action="rich-command" data-command="indent" data-quiz-id="${quizId}" data-page-id="${pageId}">&gt;</button>
      <button class="tool-button" title="Clear formatting" data-action="rich-command" data-command="removeFormat" data-quiz-id="${quizId}" data-page-id="${pageId}">Tx</button>
      <label class="button small secondary upload-button" title="Add image">
        Add image
        <input type="file" accept="image/*" data-course-image-upload="${pageId}" data-quiz-id="${quizId}">
      </label>
    </div>
  `;
}

function renderQuestionEditorBlock(itemQuiz, question, key, position, index, total) {
  const answerEditor = renderAnswerEditor(itemQuiz, question);
  return `
    <div class="builder-item draggable-item ${editorReadOnly ? "is-readonly" : ""}" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label">${editorReadOnly ? "" : `<span class="drag-handle" draggable="true" aria-label="Drag question">::</span>`} Question ${position.index} of ${position.total}</div>
          <h3 class="builder-title">${escapeHtml(question.prompt || "Untitled question")}</h3>
        </div>
        <div class="row-actions">
          <span class="status ${question.type === "Long text" ? "submitted" : "qualified"}">${question.type === "Long text" ? "Manual scoring" : "Auto scored"}</span>
          ${renderInsertMenu(itemQuiz, key)}
          ${editorReadOnly ? "" : `
            <button class="button small secondary" data-action="move-content" data-direction="up" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === 0 ? "disabled" : ""}>Move up</button>
            <button class="button small secondary" data-action="move-content" data-direction="down" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === total - 1 ? "disabled" : ""}>Move down</button>
            <button class="button small secondary" data-action="delete-question" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">Delete</button>
          `}
        </div>
      </div>
      <div class="editor-form-grid">
        <div class="field">
          <label>Question type</label>
          <select class="select" data-question-field="type" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" ${editorDisabledAttr()}>
            ${["Multiple choice", "Multi-select", "True/false", "Ranking", "Scenario review", "Long text"].map((type) => `<option ${question.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Weight</label>
          <input class="input" type="number" min="1" value="${escapeHtml(question.weight)}" data-question-field="weight" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" ${editorReadonlyAttr()}>
        </div>
        <div class="field full-span">
          <label>Question text</label>
          <textarea class="textarea" data-question-field="prompt" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" ${editorReadonlyAttr()}>${escapeHtml(question.prompt)}</textarea>
        </div>
        <div class="field full-span">
          <label>Hint shown during quiz</label>
          <input class="input" value="${escapeHtml(question.hint || "")}" data-question-field="hint" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" ${editorReadonlyAttr()}>
        </div>
      </div>
      ${renderQuestionResources(itemQuiz, question)}
      ${answerEditor}
    </div>
  `;
}

function renderQuestionResources(itemQuiz, question) {
  const resources = question.resources || [];
  return `
    <div class="resource-editor">
      <div class="answer-editor-header">
        <div>
          <div class="strong">Question resource images</div>
          <div class="cell-sub">Contributors see these through a View images button while answering this question.</div>
        </div>
        ${editorReadOnly ? "" : `<label class="button small secondary upload-button">
          Upload image
          <input type="file" accept="image/*" multiple data-question-image-upload="${question.id}" data-quiz-id="${itemQuiz.id}">
        </label>`}
      </div>
      ${resources.length ? `
        <div class="resource-grid">
          ${resources.map((image) => `
            <div class="resource-thumb">
              <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name)}">
              <div class="cell-sub">${escapeHtml(image.name)}</div>
              ${editorReadOnly ? "" : `<button class="button small ghost" data-action="remove-question-image" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-image-id="${image.id}">Remove</button>`}
            </div>
          `).join("")}
        </div>
      ` : `<div class="empty-state compact-empty">No resource images uploaded yet.</div>`}
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
        ${question.type === "True/false" || editorReadOnly ? "" : `<button class="button small secondary" data-action="add-answer" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}">Add answer</button>`}
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
                ${question.type === "Ranking" || editorReadOnly ? "disabled" : ""}
              >
              <span>${question.type === "Ranking" ? index + 1 : "Correct"}</span>
            </label>
            <input class="input" value="${escapeHtml(answer.text)}" data-answer-field="text" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${question.type === "True/false" || editorReadOnly ? "readonly" : ""}>
            <div class="row-actions">
              ${question.type === "Ranking" && !editorReadOnly ? `
                <button class="button small secondary" data-action="move-answer" data-direction="up" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${index === 0 ? "disabled" : ""}>Up</button>
                <button class="button small secondary" data-action="move-answer" data-direction="down" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${index === question.answers.length - 1 ? "disabled" : ""}>Down</button>
              ` : ""}
              ${question.type === "True/false" || editorReadOnly ? "" : `<button class="button small ghost" data-action="delete-answer" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-answer-id="${answer.id}" ${question.answers.length <= 2 ? "disabled" : ""}>Remove</button>`}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderAnalytics() {
  if (!quiz(selectedQuizId)) selectedQuizId = state.quizzes[0]?.id;
  filters.metricQuiz = selectedQuizId;
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
        <div class="row-actions">
          <select class="select analytics-quiz-select" data-action="select-analytics-quiz" aria-label="Analytics quiz">
            ${state.quizzes.map((candidate) => `<option value="${candidate.id}" ${candidate.id === selectedQuizId ? "selected" : ""}>${escapeHtml(candidate.title)}</option>`).join("")}
          </select>
          <button class="button secondary" data-action="export-analytics-csv" data-quiz-id="${itemQuiz.id}">Export CSV</button>
        </div>
      </div>
      ${renderAnalyticsOverview()}
      <div class="analytics-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2 class="section-title small">${escapeHtml(itemQuiz.title)}</h2>
              <div class="section-kicker">Scores, timing, and question performance</div>
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
      answered,
      distribution,
      missedCount,
      missRate: answered ? Math.round((missedCount / answered) * 100) : 0,
      averageTime: Math.max(35, Math.round((itemQuiz.estimatedMinutes * 60) / Math.max(1, itemQuiz.questions.length)) + missedCount * 18)
    };
  });
}

function startQuiz(quizId, preview = false) {
  imageViewer = null;
  if (preview) previewReturn = { view, editorMode, editorReadOnly, selectedQuizId };
  const itemQuiz = quiz(quizId);
  const item = state.assignments.find((candidate) => candidate.contributorId === state.currentContributorId && candidate.quizId === quizId);
  if (!preview && (currentUser()?.offboarded || !item || ["Locked", "Project inactive", "Offboarded"].includes(assignmentStatus(item)))) return;
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
            <span class="status submitted">${session.index + 1} of ${session.stepKeys.length}</span>
            <span class="status not-started">Active time ${formatSeconds(session.activeSeconds)}</span>
          </div>
          <h1 class="section-title" style="margin-top: 12px;">${escapeHtml(itemQuiz.title)}</h1>
          <div class="section-kicker">Estimated active time: ${itemQuiz.estimatedMinutes} minutes. You can pause and resume.</div>
        </div>
        <div class="row-actions">
          <a class="button secondary" href="${escapeHtml(itemQuiz.guidelinesUrl)}" target="_blank" rel="noreferrer">Guidelines</a>
          <button class="button secondary" data-action="toggle-pause">${session.isPaused ? "Resume timer" : "Pause"}</button>
          ${session.preview ? `<button class="button secondary" data-action="back-to-editor">Back to editor</button>` : ""}
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
      ${imageViewer ? renderImageViewer() : ""}
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
        <div class="course-content">${page.bodyHtml || `<p>${escapeHtml(page.body || "")}</p>`}</div>
      </div>
    </section>
  `;
}

function renderQuestionStep(question) {
  const resources = question.resources || [];
  return `
    <div class="question-layout ${resources.length ? "" : "no-reference"}">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small prompt-text">${multilineText(question.prompt)}</h2>
            <div class="section-kicker">${escapeHtml(question.type)} - weight ${question.weight}</div>
          </div>
        </div>
        <div class="panel-body">
          ${renderAnswerControl(question)}
          ${question.hint ? `<div style="height: 14px;"></div><button class="button secondary" data-action="toggle-hint" data-question-id="${question.id}">${session.hintOpen[question.id] ? "Hide hint" : "Show hint"}</button>` : ""}
          ${question.hint && session.hintOpen[question.id] ? `<div style="height: 10px;"></div><div class="hint-box">${escapeHtml(question.hint)}</div>` : ""}
        </div>
      </section>
      ${resources.length ? `<aside class="panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">Reference</h2>
            <div class="section-kicker">Question images</div>
          </div>
        </div>
        <div class="panel-body">
          <div class="reference-tile has-resources">
            <div class="strong">Images needed for this question</div>
            <div class="cell-sub">${resources.length} image${resources.length === 1 ? "" : "s"} available in a scrollable viewer.</div>
          </div>
          <div style="height: 10px;"></div>
          <button class="button" data-action="view-question-images" data-question-id="${question.id}">Open images</button>
        </div>
      </aside>` : ""}
    </div>
  `;
}

function renderImageViewer() {
  const itemQuiz = quiz(imageViewer.quizId);
  const question = getQuestion(itemQuiz, imageViewer.questionId);
  const resources = question?.resources || [];
  const index = Math.min(Math.max(imageViewer.index || 0, 0), Math.max(resources.length - 1, 0));
  const image = resources[index];
  return `
    <div class="image-viewer-backdrop" data-modal-backdrop="images">
      <div class="image-viewer panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title small">Question resource images</h2>
            <div class="section-kicker">${escapeHtml(question?.prompt || "")} ${resources.length ? `- ${index + 1} of ${resources.length}` : ""}</div>
          </div>
          <button class="button ghost" data-action="close-images">Close</button>
        </div>
        <div class="panel-body">
          <div class="image-carousel">
            ${image ? `
              <button class="carousel-control" data-action="previous-image" ${index === 0 ? "disabled" : ""} aria-label="Previous image">Prev</button>
              <figure class="image-viewer-figure">
                <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name)}">
                <figcaption>${escapeHtml(image.name)}</figcaption>
              </figure>
              <button class="carousel-control" data-action="next-image" ${index === resources.length - 1 ? "disabled" : ""} aria-label="Next image">Next</button>
            ` : `<div class="empty-state">No images attached.</div>`}
          </div>
        </div>
      </div>
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
              ${result.status === "Passed" ? `<div class="check-badge"><span class="check-icon" aria-hidden="true"></span> Passed</div>` : ""}
              <div class="section-kicker">Active time: ${formatSeconds(result.activeSeconds)}</div>
              <p class="muted">${result.manualReview ? "Open text requires admin scoring before a final score appears." : "Your score and result are shown. Missed question review is not available."}</p>
              <button class="button" data-action="${result.preview ? "back-to-editor" : "return-dashboard"}">${result.preview ? "Back to editor" : "Return to dashboard"}</button>
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
      retakeLabel(row.item)
    ].map(csvCell).join(","))
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "project-otter-results.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportAnalyticsCsv(quizId) {
  const itemQuiz = quiz(quizId || selectedQuizId);
  if (!itemQuiz) return;
  const submitted = state.attempts.filter((attempt) => attempt.quizId === itemQuiz.id && ["Passed", "Failed", "Submitted"].includes(attempt.status));
  const passRate = submitted.length ? Math.round((submitted.filter((attempt) => attempt.status === "Passed").length / submitted.length) * 100) : 0;
  const header = [
    "quiz",
    "submitted_attempts",
    "pass_rate_percent",
    "question",
    "question_type",
    "weight",
    "correct_answer",
    "answered_count",
    "missed_count",
    "miss_rate_percent",
    "average_time_seconds",
    "answer_distribution"
  ];
  const lines = [
    header.join(","),
    ...questionStats(itemQuiz).map((stat) => [
      itemQuiz.title,
      submitted.length,
      passRate,
      stat.question.prompt,
      stat.question.type,
      stat.question.weight,
      correctAnswerText(stat.question),
      stat.answered,
      stat.missedCount,
      stat.missRate,
      stat.averageTime,
      Object.entries(stat.distribution).map(([label, count]) => `${label}: ${count}`).join(" | ")
    ].map(csvCell).join(","))
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const safeTitle = itemQuiz.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "quiz";
  anchor.href = url;
  anchor.download = `project-otter-analytics-${safeTitle}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function uniqueId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function blankCoursePage() {
  return {
    id: uniqueId("cp"),
    title: "",
    body: "",
    bodyHtml: "<p><br></p>"
  };
}

function blankQuestion() {
  return normalizeQuestionByType({
    id: uniqueId("qst"),
    type: "Multiple choice",
    weight: 1,
    prompt: "",
    hint: "",
    referenceLabel: "",
    resources: [],
    answers: [
      { id: uniqueId("ans"), text: "", correct: true },
      { id: uniqueId("ans"), text: "", correct: false }
    ]
  });
}

function createNewQuiz() {
  const id = `q-${Date.now()}`;
  const page = blankCoursePage();
  const question = blankQuestion();
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
    unlimitedRetakes: false,
    estimatedMinutes: 15,
    randomizeQuestions: true,
    randomizeAnswers: true,
    coursePages: [page],
    questions: [question],
    contentOrder: [contentKey("course", page.id), contentKey("question", question.id)]
  };
  state.quizzes.unshift(newQuiz);
  selectedQuizId = id;
  editorMode = "detail";
  editorReadOnly = false;
  captureEditorSnapshot(id);
  addAudit("Quiz created", newQuiz.title);
  render();
}

function insertContentAfter(quizId, afterKey, kind) {
  const itemQuiz = quiz(quizId);
  if (!itemQuiz) return;
  const order = cleanContentOrder(itemQuiz);
  const afterIndex = order.indexOf(afterKey);
  const insertAt = afterIndex >= 0 ? afterIndex + 1 : order.length;
  let key;
  if (kind === "course") {
    const page = blankCoursePage();
    itemQuiz.coursePages.push(page);
    key = contentKey("course", page.id);
  } else {
    const question = blankQuestion();
    itemQuiz.questions.push(question);
    key = contentKey("question", question.id);
  }
  order.splice(insertAt, 0, key);
  itemQuiz.contentOrder = order;
  markQuizChanged(itemQuiz, kind === "course" ? "Course page added" : "Question added");
  render();
}

function duplicateQuiz(quizId) {
  const source = quiz(quizId);
  if (!source) return;
  const id = uniqueId("q");
  const pageIdMap = new Map();
  const questionIdMap = new Map();
  const answerIdMap = new Map();
  const coursePages = source.coursePages.map((page) => {
    const nextId = uniqueId("cp");
    pageIdMap.set(page.id, nextId);
    return {
      ...page,
      id: nextId
    };
  });
  const questions = source.questions.map((question) => {
    const nextQuestionId = uniqueId("qst");
    questionIdMap.set(question.id, nextQuestionId);
    const answers = (question.answers || []).map((answer) => {
      const nextAnswerId = uniqueId("ans");
      answerIdMap.set(answer.id, nextAnswerId);
      return {
        ...answer,
        id: nextAnswerId
      };
    });
    return normalizeQuestionByType({
      ...question,
      id: nextQuestionId,
      answers,
      correctOrder: (question.correctOrder || []).map((answerId) => answerIdMap.get(answerId)).filter(Boolean),
      resources: (question.resources || []).map((image) => ({ ...image, id: uniqueId("img") }))
    });
  });
  const contentOrder = cleanContentOrder({
    coursePages,
    questions,
    contentOrder: (source.contentOrder || []).map((key) => {
      const { kind, id: sourceId } = splitContentKey(key);
      const nextId = kind === "course" ? pageIdMap.get(sourceId) : questionIdMap.get(sourceId);
      return nextId ? contentKey(kind, nextId) : null;
    }).filter(Boolean)
  });
  const copy = {
    ...source,
    id,
    title: `Copy of ${source.title}`,
    status: "Draft",
    draftDirty: true,
    coursePages,
    questions,
    contentOrder
  };
  state.quizzes.unshift(copy);
  selectedQuizId = id;
  editorMode = "detail";
  editorReadOnly = false;
  captureEditorSnapshot(id);
  addAudit("Quiz duplicated", `${source.title} -> ${copy.title}`);
  render();
}

function deleteQuiz(quizId) {
  const itemQuiz = quiz(quizId);
  if (!itemQuiz) return;
  if (state.quizzes.length <= 1) {
    alert("Keep at least one quiz in the sandbox.");
    return;
  }
  const assignmentCount = state.assignments.filter((item) => item.quizId === quizId).length;
  const attemptCount = state.attempts.filter((attempt) => attempt.quizId === quizId).length;
  const warning = `Delete "${itemQuiz.title}"? This removes ${assignmentCount} assignment${assignmentCount === 1 ? "" : "s"} and ${attemptCount} attempt${attemptCount === 1 ? "" : "s"} from the sandbox.`;
  if (!confirm(warning)) return;
  state.quizzes = state.quizzes.filter((candidate) => candidate.id !== quizId);
  state.assignments = state.assignments.filter((item) => item.quizId !== quizId);
  state.attempts = state.attempts.filter((attempt) => attempt.quizId !== quizId);
  if (selectedQuizId === quizId) selectedQuizId = state.quizzes[0]?.id || "";
  if (imageViewer?.quizId === quizId) imageViewer = null;
  if (session?.quizId === quizId) session = null;
  addAudit("Quiz deleted", itemQuiz.title);
  editorMode = "home";
  editorReadOnly = true;
  editorSnapshot = null;
  render();
}

function getQuestion(itemQuiz, questionId) {
  return itemQuiz.questions.find((question) => question.id === questionId);
}

function getCoursePage(itemQuiz, pageId) {
  return itemQuiz.coursePages.find((page) => page.id === pageId);
}

function assignmentCountForQuiz(quizId) {
  return state.assignments.filter((item) => item.quizId === quizId && !contributor(item.contributorId)?.offboarded).length;
}

function assignedContributorsForQuiz(quizId) {
  return state.assignments
    .filter((item) => item.quizId === quizId && !contributor(item.contributorId)?.offboarded)
    .map((item) => contributor(item.contributorId))
    .filter(Boolean)
    .sort((a, b) => a.email.localeCompare(b.email));
}

function ensureAssignment(contributorId, quizId) {
  let item = state.assignments.find((candidate) => candidate.contributorId === contributorId && candidate.quizId === quizId);
  if (item) {
    item.locked = false;
    item.offboarded = false;
    return item;
  }
  item = {
    id: `as-${contributorId}-${quizId}-${Date.now()}`,
    contributorId,
    quizId,
    retakesAllowed: quiz(quizId)?.retakeLimit || 0,
    retakesUsed: 0,
    locked: false,
    offboarded: false,
    assignedAt: new Date().toISOString().slice(0, 10)
  };
  state.assignments.push(item);
  return item;
}

function assignQuizToAll(quizId) {
  const itemQuiz = quiz(quizId);
  if (!canAssignQuiz(itemQuiz)) return;
  state.contributors.filter((person) => !person.offboarded).forEach((person) => ensureAssignment(person.id, quizId));
  addAudit("Quiz pushed to all dashboards", itemQuiz.title);
  render();
}

function parseEmailList(value) {
  return [...new Set(String(value || "")
    .split(/[\s,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))];
}

function contributorForEmail(email) {
  return state.contributors.find((person) => person.email.toLowerCase() === email.toLowerCase());
}

function ensureContributorByEmail(email) {
  let person = contributorForEmail(email);
  if (person) return person;
  person = {
    id: `c-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: "Invited contributor",
    email,
    cohort: "Email allowlist",
    role: "contributor",
    offboarded: false
  };
  state.contributors.push(person);
  return person;
}

function makeAdminByEmail() {
  const input = document.querySelector("[data-make-admin-email]");
  const email = parseEmailList(input?.value || "")[0];
  if (!email) {
    alert("Enter a valid email address.");
    return;
  }
  const person = ensureContributorByEmail(email);
  person.role = "admin";
  person.offboarded = false;
  makeAdminOpen = false;
  addAudit("Admin access granted", person.email);
  render();
}

function bulkOffboardByEmail() {
  const input = document.querySelector("[data-bulk-offboard-emails]");
  const emails = parseEmailList(input?.value || "");
  if (!emails.length) {
    alert("Enter at least one valid email address.");
    return;
  }
  const people = emails
    .map(contributorForEmail)
    .filter((person) => person && !isAdmin(person) && !person.offboarded);
  if (!people.length) {
    alert("No active contributor accounts matched those emails.");
    return;
  }
  people.forEach((person) => setContributorOffboarded(person, true));
  input.value = "";
  addAudit("Bulk contributors offboarded", `${people.length} contributor${people.length === 1 ? "" : "s"}`);
  render();
}

function applyBulkRetake() {
  const quizId = document.querySelector("[data-bulk-retake-quiz]")?.value;
  const itemQuiz = quiz(quizId);
  const emails = parseEmailList(document.querySelector("[data-bulk-retake-emails]")?.value || "");
  const count = Number(document.querySelector("[data-bulk-retake-count]")?.value);
  if (!itemQuiz) {
    alert("Choose a quiz.");
    return;
  }
  if (!emails.length) {
    alert("Enter at least one valid email address.");
    return;
  }
  if (!Number.isFinite(count) || count < 0) {
    alert("Enter a retake count of 0 or higher.");
    return;
  }
  let updated = 0;
  emails.forEach((email) => {
    const person = ensureContributorByEmail(email);
    if (isAdmin(person)) return;
    const item = ensureAssignment(person.id, itemQuiz.id);
    item.retakesAllowed = Number(item.retakesUsed || 0) + Math.round(count);
    item.locked = false;
    state.attempts = state.attempts.filter((attempt) => !(attempt.contributorId === person.id && attempt.quizId === itemQuiz.id && attempt.status === "In progress"));
    updated += 1;
  });
  if (!updated) {
    alert("No contributor accounts were updated.");
    return;
  }
  bulkRetakeOpen = false;
  addAudit("Bulk retakes updated", `${itemQuiz.title} - ${updated} contributor${updated === 1 ? "" : "s"} - ${Math.round(count)} retake${Math.round(count) === 1 ? "" : "s"}`);
  render();
}

function publishQuizWithNote(quizId) {
  const itemQuiz = quiz(quizId);
  if (!itemQuiz || !itemQuiz.draftDirty) return;
  if (!itemQuiz.guidelinesUrl.trim()) {
    alert("Add the Google Docs guidelines link before publishing.");
    return;
  }
  const noteInput = document.querySelector("[data-publish-change-note]");
  const note = noteInput?.value.trim() || "Published content";
  itemQuiz.status = "Published";
  itemQuiz.draftDirty = false;
  createQuizVersion(itemQuiz.id, note, "published");
  captureEditorSnapshot(itemQuiz.id);
  publishNoteQuizId = null;
  addAudit("Assessment content published", `${itemQuiz.title} - ${note}`);
}

function emailListForQuiz(quizId) {
  const input = document.querySelector(`[data-assign-email-list="${quizId}"]`);
  return parseEmailList(input?.value || "");
}

function assignQuizToEmailList(quizId) {
  const itemQuiz = quiz(quizId);
  if (!canAssignQuiz(itemQuiz)) return;
  const emails = emailListForQuiz(quizId);
  emails.forEach((email) => ensureAssignment(ensureContributorByEmail(email).id, quizId));
  addAudit("Quiz assigned by email allowlist", `${itemQuiz.title} - ${emails.length} email${emails.length === 1 ? "" : "s"}`);
  render();
}

function clearQuizAssignments(quizId) {
  const itemQuiz = quiz(quizId);
  if (!canAssignQuiz(itemQuiz)) return;
  state.assignments = state.assignments.filter((item) => item.quizId !== quizId);
  addAudit("Quiz removed from dashboards", itemQuiz.title);
  render();
}

function removeQuizAssignment(quizId, contributorId) {
  const itemQuiz = quiz(quizId);
  state.assignments = state.assignments.filter((item) => !(item.quizId === quizId && item.contributorId === contributorId));
  addAudit("Quiz assignment removed", `${itemQuiz.title} - ${contributor(contributorId)?.email || contributorId}`);
  render();
}

function setContributorRole(contributorId, role) {
  const person = contributor(contributorId);
  if (!person || !isAdmin()) return;
  if (person.id === state.currentContributorId && role !== "admin") return;
  const adminCount = state.contributors.filter((candidate) => isAdmin(candidate)).length;
  if (role !== "admin" && adminCount <= 1) return;
  if (person.role === role) return;
  person.role = role;
  addAudit(role === "admin" ? "Admin access granted" : "Admin access removed", person.email);
  if (!isAdmin(currentUser())) view = "contributor";
  render();
}

function canAssignQuiz(itemQuiz) {
  return itemQuiz && itemQuiz.status === "Published" && !itemQuiz.draftDirty;
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
  const answer = { id: uniqueId("ans"), text: "", correct: false };
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

function moveContentByDirection(quizId, key, direction) {
  const itemQuiz = quiz(quizId);
  const order = cleanContentOrder(itemQuiz);
  const index = order.indexOf(key);
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
  [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
  itemQuiz.contentOrder = order;
  markQuizChanged(itemQuiz, "Assessment order changed");
  render();
}

function applyRichCommand(quizId, pageId, command, value = null) {
  const editor = document.querySelector(`[data-course-rich="${pageId}"]`);
  if (!editor) return;
  editor.focus();
  let commandValue = value;
  if (command === "createLink") {
    commandValue = prompt("Paste the link URL");
    if (!commandValue) return;
  }
  if (document.execCommand) document.execCommand(command, false, commandValue);
  updateCourseRichFromEditor(quizId, pageId);
}

function updateCourseRichFromEditor(quizId, pageId) {
  const itemQuiz = quiz(quizId);
  const page = getCoursePage(itemQuiz, pageId);
  const editor = document.querySelector(`[data-course-rich="${pageId}"]`);
  if (!page || !editor) return;
  page.bodyHtml = editor.innerHTML;
  page.body = editor.innerText || "";
  markQuizChanged(itemQuiz, null);
}

function readImageFiles(fileList) {
  const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
  return Promise.all(files.map((file, index) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      id: `img-${Date.now()}-${index}`,
      name: file.name,
      src: reader.result
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })));
}

async function uploadCourseImages(quizId, pageId, fileList) {
  const itemQuiz = quiz(quizId);
  const page = getCoursePage(itemQuiz, pageId);
  if (!page) return;
  const editor = document.querySelector(`[data-course-rich="${pageId}"]`);
  if (editor) {
    page.bodyHtml = editor.innerHTML;
    page.body = editor.innerText || "";
  }
  const images = await readImageFiles(fileList);
  if (!images.length) return;
  const imageHtml = images.map((image) => `
    <figure class="course-image">
      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name)}">
      <figcaption>${escapeHtml(image.name)}</figcaption>
    </figure>
  `).join("");
  page.bodyHtml = `${page.bodyHtml || ""}${imageHtml}`;
  markQuizChanged(itemQuiz, "Course image uploaded");
  render();
}

async function uploadQuestionImages(quizId, questionId, fileList) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question) return;
  const images = await readImageFiles(fileList);
  if (!images.length) return;
  question.resources = [...(question.resources || []), ...images];
  markQuizChanged(itemQuiz, "Question resource image uploaded");
  render();
}

function removeQuestionImage(quizId, questionId, imageId) {
  const itemQuiz = quiz(quizId);
  const question = getQuestion(itemQuiz, questionId);
  if (!question) return;
  question.resources = (question.resources || []).filter((image) => image.id !== imageId);
  markQuizChanged(itemQuiz, "Question resource image removed");
  render();
}

function handleClick(event) {
  if (event.target.dataset.modalBackdrop === "attempt") {
    selectedAttemptId = null;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "history-attempt") {
    selectedHistoryAttemptId = null;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "make-admin") {
    makeAdminOpen = false;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "bulk-retake") {
    bulkRetakeOpen = false;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "images") {
    imageViewer = null;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "audit-log") {
    auditLogOpen = false;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "version-history") {
    versionHistoryQuizId = null;
    render();
    return;
  }
  if (event.target.dataset.modalBackdrop === "publish-note") {
    publishNoteQuizId = null;
    render();
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const editorMutationActions = new Set([
    "toggle-editor",
    "move-content",
    "insert-content",
    "rich-command",
    "remove-question-image",
    "assign-all",
    "assign-listed-emails",
    "clear-assignments",
    "remove-assignment",
    "add-course-page",
    "add-question",
    "delete-course-page",
    "delete-question",
    "add-answer",
    "delete-answer",
    "move-answer"
  ]);
  if (editorReadOnly && view === "editor" && editorMode === "detail" && editorMutationActions.has(action)) return;
  if (action === "nav") {
    if (!isAdmin() && button.dataset.view !== "contributor") return;
    if (button.dataset.view !== view) {
      selectedAttemptId = null;
      selectedHistoryAttemptId = null;
      makeAdminOpen = false;
      bulkRetakeOpen = false;
      auditLogOpen = false;
      versionHistoryQuizId = null;
      publishNoteQuizId = null;
    }
    view = button.dataset.view;
    if (view === "editor") {
      editorMode = "home";
      editorReadOnly = true;
      editorSnapshot = null;
    }
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
    imageViewer = null;
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
    imageViewer = null;
    view = "contributor";
    render();
  }
  if (action === "back-to-editor") {
    saveSession();
    session = null;
    resultSnapshot = null;
    imageViewer = null;
    view = "editor";
    editorMode = previewReturn?.editorMode || "detail";
    editorReadOnly = previewReturn?.editorReadOnly ?? editorReadOnly;
    selectedQuizId = previewReturn?.selectedQuizId || selectedQuizId;
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
  if (action === "view-history-attempt") {
    selectedHistoryAttemptId = button.dataset.attemptId;
    render();
  }
  if (action === "close-history-attempt") {
    selectedHistoryAttemptId = null;
    render();
  }
  if (action === "admin-subtab") {
    adminSubView = button.dataset.adminSubtab || "responses";
    selectedAttemptId = null;
    render();
  }
  if (action === "open-make-admin") {
    makeAdminOpen = true;
    bulkRetakeOpen = false;
    render();
  }
  if (action === "close-make-admin") {
    makeAdminOpen = false;
    render();
  }
  if (action === "open-audit-log") {
    auditLogOpen = true;
    render();
  }
  if (action === "close-audit-log") {
    auditLogOpen = false;
    render();
  }
  if (action === "make-admin-by-email") {
    makeAdminByEmail();
  }
  if (action === "remove-admin") {
    setContributorRole(button.dataset.contributorId, "contributor");
  }
  if (action === "open-bulk-retake") {
    bulkRetakeOpen = true;
    makeAdminOpen = false;
    render();
  }
  if (action === "close-bulk-retake") {
    bulkRetakeOpen = false;
    render();
  }
  if (action === "apply-bulk-retake") {
    applyBulkRetake();
  }
  if (action === "bulk-offboard-emails") {
    bulkOffboardByEmail();
  }
  if (action === "retake-step") {
    adjustRetakeDraft(button.dataset.assignmentId, Number(button.dataset.delta || 0));
  }
  if (action === "save-retake-count") {
    saveRetakeCount(button.dataset.assignmentId);
  }
  if (action === "toggle-lock") {
    toggleLock(button.dataset.assignmentId);
  }
  if (action === "toggle-contributor-offboard") {
    toggleContributorOffboard(button.dataset.contributorId);
  }
  if (action === "change-result") {
    changeResult(button.dataset.assignmentId);
  }
  if (action === "score-written-attempt") {
    scoreWrittenAttempt(button.dataset.attemptId);
  }
  if (action === "ignore-written-review") {
    ignoreWrittenReview(button.dataset.attemptId);
  }
  if (action === "restore-written-review") {
    restoreWrittenReview(button.dataset.attemptId);
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
  if (action === "export-csv") exportCsv();
  if (action === "export-analytics-csv") exportAnalyticsCsv(button.dataset.quizId);
  if (action === "editor-home") {
    editorMode = "home";
    editorReadOnly = true;
    editorSnapshot = null;
    versionHistoryQuizId = null;
    publishNoteQuizId = null;
    render();
  }
  if (action === "view-quiz" || action === "edit-quiz") {
    selectedQuizId = button.dataset.quizId;
    editorMode = "detail";
    editorReadOnly = action !== "edit-quiz";
    if (editorReadOnly) editorSnapshot = null;
    else captureEditorSnapshot(selectedQuizId);
    render();
  }
  if (action === "enter-edit-mode") {
    selectedQuizId = button.dataset.quizId || selectedQuizId;
    editorMode = "detail";
    editorReadOnly = false;
    captureEditorSnapshot(selectedQuizId);
    render();
  }
  if (action === "discard-editor-changes") {
    discardEditorChanges();
  }
  if (action === "open-version-history") {
    versionHistoryQuizId = button.dataset.quizId || selectedQuizId;
    render();
  }
  if (action === "close-version-history") {
    versionHistoryQuizId = null;
    render();
  }
  if (action === "restore-version") {
    restoreQuizVersion(button.dataset.versionId);
  }
  if (action === "create-quiz") {
    createNewQuiz();
  }
  if (action === "duplicate-quiz") {
    duplicateQuiz(button.dataset.quizId);
  }
  if (action === "delete-quiz") {
    deleteQuiz(button.dataset.quizId);
  }
  if (action === "move-content") {
    moveContentByDirection(button.dataset.quizId, button.dataset.contentKey, button.dataset.direction);
  }
  if (action === "insert-content") {
    insertContentAfter(button.dataset.quizId, button.dataset.afterKey, button.dataset.kind);
  }
  if (action === "rich-command") {
    applyRichCommand(button.dataset.quizId, button.dataset.pageId, button.dataset.command, button.dataset.commandValue || null);
  }
  if (action === "remove-question-image") {
    removeQuestionImage(button.dataset.quizId, button.dataset.questionId, button.dataset.imageId);
  }
  if (action === "view-question-images") {
    imageViewer = { quizId: session.quizId, questionId: button.dataset.questionId, index: 0 };
    render();
  }
  if (action === "close-images") {
    imageViewer = null;
    render();
  }
  if (action === "previous-image" || action === "next-image") {
    if (!imageViewer) return;
    const itemQuiz = quiz(imageViewer.quizId);
    const question = getQuestion(itemQuiz, imageViewer.questionId);
    const maxIndex = Math.max(0, (question?.resources || []).length - 1);
    imageViewer.index = Math.min(maxIndex, Math.max(0, (imageViewer.index || 0) + (action === "next-image" ? 1 : -1)));
    render();
  }
  if (action === "assign-all") {
    assignQuizToAll(button.dataset.quizId);
  }
  if (action === "assign-listed-emails") {
    assignQuizToEmailList(button.dataset.quizId);
  }
  if (action === "clear-assignments") {
    clearQuizAssignments(button.dataset.quizId);
  }
  if (action === "remove-assignment") {
    removeQuizAssignment(button.dataset.quizId, button.dataset.contributorId);
  }
  if (action === "set-role") {
    setContributorRole(button.dataset.contributorId, button.dataset.role);
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
    publishNoteQuizId = itemQuiz.id;
    render();
  }
  if (action === "close-publish-note") {
    publishNoteQuizId = null;
    render();
  }
  if (action === "confirm-publish-quiz") {
    publishQuizWithNote(button.dataset.quizId);
    render();
  }
  if (action === "add-course-page") {
    const itemQuiz = quiz(button.dataset.quizId);
    const page = blankCoursePage();
    itemQuiz.coursePages.push(page);
    itemQuiz.contentOrder.push(contentKey("course", page.id));
    markQuizChanged(itemQuiz, "Course page added");
    render();
  }
  if (action === "add-question") {
    const itemQuiz = quiz(button.dataset.quizId);
    const question = blankQuestion();
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
      const itemQuiz = quiz(attempt.quizId);
      attempt.note = note.value;
      addAudit("Internal note saved", `${contributor(attempt.contributorId).email} - ${itemQuiz?.title || "Quiz"} attempt`);
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
  if (editorReadOnly && view === "editor" && editorMode === "detail" && (
    target.dataset.editorField ||
    target.dataset.courseField ||
    target.dataset.courseRich ||
    target.dataset.questionField ||
    target.dataset.answerField ||
    target.dataset.action === "rich-color" ||
    target.dataset.action === "rich-highlight"
  )) return;
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
  if (target.dataset.courseRich) {
    const itemQuiz = quiz(target.dataset.quizId);
    const page = getCoursePage(itemQuiz, target.dataset.pageId);
    if (page) {
      page.bodyHtml = target.innerHTML;
      page.body = target.innerText || "";
      markQuizChanged(itemQuiz, null);
    }
  }
  if (target.dataset.action === "rich-color") {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "foreColor", target.value);
  }
  if (target.dataset.action === "rich-highlight") {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "hiliteColor", target.value);
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
    selectedAttemptId = null;
    selectedHistoryAttemptId = null;
    makeAdminOpen = false;
    render();
  }
  if (target.dataset.action === "select-editor-quiz") {
    selectedQuizId = target.value;
    render();
  }
  if (target.dataset.action === "select-analytics-quiz") {
    selectedQuizId = target.value;
    filters.metricQuiz = target.value;
    render();
  }
  if (editorReadOnly && view === "editor" && editorMode === "detail" && (
    target.dataset.questionField ||
    target.dataset.courseImageUpload ||
    target.dataset.questionImageUpload ||
    target.dataset.answerCorrect ||
    target.dataset.action === "rich-font" ||
    target.dataset.action === "rich-size" ||
    target.dataset.action === "rich-color" ||
    target.dataset.action === "rich-highlight"
  )) return;
  if (target.dataset.questionField === "type") {
    updateQuestionType(target.dataset.quizId, target.dataset.questionId, target.value);
  }
  if (target.dataset.action === "rich-font" && target.value) {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "fontName", target.value);
  }
  if (target.dataset.action === "rich-size" && target.value) {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "fontSize", target.value);
  }
  if (target.dataset.action === "rich-color") {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "foreColor", target.value);
  }
  if (target.dataset.action === "rich-highlight") {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "hiliteColor", target.value);
  }
  if (target.dataset.courseImageUpload) {
    uploadCourseImages(target.dataset.quizId, target.dataset.courseImageUpload, target.files);
    target.value = "";
  }
  if (target.dataset.questionImageUpload) {
    uploadQuestionImages(target.dataset.quizId, target.dataset.questionImageUpload, target.files);
    target.value = "";
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
  if (editorReadOnly) return;
  if (!event.target.closest(".drag-handle")) return;
  const item = event.target.closest("[data-content-key]");
  if (!item) return;
  draggedContentKey = item.dataset.contentKey;
  event.dataTransfer?.setData("text/plain", draggedContentKey);
  item.classList.add("is-dragging");
}

function handleDragOver(event) {
  if (editorReadOnly) return;
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
  if (editorReadOnly) return;
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

function adjustRetakeDraft(assignmentId, delta) {
  const item = assignment(assignmentId);
  if (!item) return;
  if (quiz(item.quizId)?.unlimitedRetakes) return;
  const savedValue = remainingRetakes(item);
  const nextValue = Math.max(0, retakeDraftValue(item) + delta);
  if (nextValue === savedValue) delete retakeDrafts[item.id];
  else retakeDrafts[item.id] = nextValue;
  render();
}

function saveRetakeCount(assignmentId) {
  const item = assignment(assignmentId);
  if (!item || !Object.prototype.hasOwnProperty.call(retakeDrafts, item.id)) return;
  const savedValue = remainingRetakes(item);
  const nextValue = Math.max(0, Number(retakeDrafts[item.id] || 0));
  item.retakesAllowed = Number(item.retakesUsed || 0) + nextValue;
  if (nextValue > 0) item.locked = false;
  delete retakeDrafts[item.id];
  addAudit("Retakes updated", `${contributor(item.contributorId).email} - ${quiz(item.quizId).title}: ${savedValue} to ${nextValue}`);
  render();
}

function toggleLock(assignmentId) {
  const item = assignment(assignmentId);
  if (!item) return;
  item.locked = !item.locked;
  addAudit(item.locked ? "Quiz locked" : "Quiz unlocked", `${contributor(item.contributorId).email} - ${quiz(item.quizId).title}`);
  render();
}

function ignoreWrittenReview(attemptId) {
  const attempt = byId(state.attempts, attemptId);
  if (!attempt || !(attempt.status === "Submitted" || attempt.manualReview)) return;
  const itemQuiz = quiz(attempt.quizId);
  const person = contributor(attempt.contributorId);
  attempt.manualReviewIgnored = true;
  addAudit("Written review ignored", `${person?.email || "Contributor"} - ${itemQuiz?.title || "Quiz"}`);
  render();
}

function restoreWrittenReview(attemptId) {
  const attempt = byId(state.attempts, attemptId);
  if (!attempt || !(attempt.status === "Submitted" || attempt.manualReview)) return;
  const itemQuiz = quiz(attempt.quizId);
  const person = contributor(attempt.contributorId);
  attempt.manualReviewIgnored = false;
  addAudit("Written review restored", `${person?.email || "Contributor"} - ${itemQuiz?.title || "Quiz"}`);
  render();
}

function scoreWrittenAttempt(attemptId) {
  const attempt = byId(state.attempts, attemptId);
  if (!attempt) return;
  const itemQuiz = quiz(attempt.quizId);
  const person = contributor(attempt.contributorId);
  const input = document.querySelector(`[data-written-score="${attemptId}"]`);
  const score = Number(input?.value);
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    alert("Enter a score from 0 to 100.");
    return;
  }
  attempt.score = Math.round(score);
  attempt.status = attempt.score >= itemQuiz.passThreshold ? "Passed" : "Failed";
  attempt.manualReview = false;
  attempt.manualReviewIgnored = false;
  attempt.overridden = true;
  addAudit("Written response scored", `${person.email} - ${itemQuiz.title} - ${attempt.score}%`);
  render();
}

function toggleContributorOffboard(contributorId) {
  const person = contributor(contributorId);
  if (!person || isAdmin(person)) return;
  setContributorOffboarded(person, !person.offboarded);
  addAudit(person.offboarded ? "Contributor offboarded" : "Contributor restored", person.email);
  render();
}

function setContributorOffboarded(person, offboarded) {
  if (!person || isAdmin(person)) return;
  const changed = person.offboarded !== offboarded;
  person.offboarded = offboarded;
  state.assignments
    .filter((item) => item.contributorId === person.id)
    .forEach((item) => {
      item.offboarded = false;
    });
  if (!changed) return;
  const action = person.offboarded ? "Offboarded" : "Restored";
  addOffboardingLog(action, person);
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
  attempt.manualReview = false;
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
