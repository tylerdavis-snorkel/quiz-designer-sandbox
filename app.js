const STORAGE_KEY = "projectOtterAssessmentState.v3";
const PROJECT_NAME = "Project Otter";

const app = document.querySelector("#app");

const initialState = () => ({
  theme: "light",
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
let selectedAttemptId = null;
let selectedHistoryAttemptId = null;
let adminSubView = "responses";
let makeAdminOpen = false;
let selectedAssignments = new Set();
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
  cohort: "All",
  responseSort: "Most recent",
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
  selectedAttemptId = null;
  selectedHistoryAttemptId = null;
  adminSubView = "responses";
  makeAdminOpen = false;
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
  next.contributors = (next.contributors || []).map(normalizeContributor);
  next.offboardingLog = Array.isArray(next.offboardingLog) ? next.offboardingLog : [];
  const legacyOffboardedIds = new Set((next.assignments || [])
    .filter((item) => item.offboarded)
    .map((item) => item.contributorId));
  next.contributors.forEach((person) => {
    if (legacyOffboardedIds.has(person.id)) person.offboarded = true;
  });
  next.assignments = (next.assignments || []).map((item) => ({ ...item, offboarded: false }));
  return next;
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
  itemQuiz.coursePages = (itemQuiz.coursePages || []).map((page, index) => ({
    id: page.id || `cp-${itemQuiz.id}-${index + 1}`,
    title: page.title || "Untitled course page",
    body: page.body || "",
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
    weight: Number(question.weight || 1),
    prompt: question.prompt || "Untitled question",
    hint: question.hint || "",
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

function currentUser() {
  return contributor(state.currentContributorId);
}

function isAdmin(person = currentUser()) {
  return person?.role === "admin";
}

function quiz(id) {
  return byId(state.quizzes, id);
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
  return Math.max(0, Number(item.retakesAllowed || 0) - Number(item.retakesUsed || 0));
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

function responseSortValue(row) {
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

function render() {
  stopTimer();
  document.body.dataset.theme = state.theme;
  if (!isAdmin() && ["admin", "offboarding", "editor", "analytics"].includes(view)) {
    view = "contributor";
  }
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
    admin: "Admin dashboard",
    offboarding: "Offboarding",
    editor: "Quiz editor",
    analytics: "Quiz analytics"
  }[view];
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div>
            <div class="brand-title">Project Otter</div>
            <div class="brand-subtitle">Assessment dashboard</div>
          </div>
        </div>
        <nav class="nav" aria-label="Main">
          ${navButton("contributor", "Contributor")}
          ${isAdmin(current) ? `
            ${navButton("admin", "Admin")}
            ${navButton("offboarding", "Offboarding")}
            ${navButton("editor", "Quiz editor")}
            ${navButton("analytics", "Analytics")}
          ` : ""}
        </nav>
        <div class="sandbox-box">
          <strong>Sandbox</strong><br>
          ${isAdmin(current) ? "Admin account: use Make admin to promote accounts by email." : "Contributor account: only the Contributor tab is visible. Switch to Maya to test admin tools."}
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div>
            <div class="topbar-title">${escapeHtml(title)}</div>
            <div class="topbar-meta">${escapeHtml(current.name)} - ${escapeHtml(current.email)} - ${isAdmin(current) ? "Admin" : "Contributor"}</div>
          </div>
          <div class="topbar-actions">
            <select class="select" data-action="switch-contributor" aria-label="Current contributor">
              ${state.contributors.map((person) => `
                <option value="${person.id}" ${person.id === state.currentContributorId ? "selected" : ""}>
                  ${escapeHtml(person.name)} (${person.role === "admin" ? "Admin" : "Contributor"})
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
            <th>Result</th>
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
                    ${latest.status === "Passed" ? `<span class="check-badge"><span class="check-icon" aria-hidden="true"></span> Passed</span>` : ""}
                    <button class="button small secondary" data-action="view-history-attempt" data-attempt-id="${latest.id}">${latest.status === "Passed" ? "View" : "History"}</button>
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
  const stats = adminStats();
  return `
    <section class="content">
      <div class="stat-grid">
        <div class="stat">
          <div class="stat-label">Passed</div>
          <div class="stat-value">${stats.passed}</div>
          <div class="stat-note">Passed latest attempt</div>
        </div>
        <div class="stat">
          <div class="stat-label">Failed</div>
          <div class="stat-value">${stats.failed}</div>
          <div class="stat-note">Failed latest attempt</div>
        </div>
        <div class="stat">
          <div class="stat-label">In progress</div>
          <div class="stat-value">${stats.inProgress}</div>
          <div class="stat-note">Pause/resume enabled</div>
        </div>
        <div class="stat">
          <div class="stat-label">Not started</div>
          <div class="stat-value">${stats.notStarted}</div>
          <div class="stat-note">Assigned, no attempt yet</div>
        </div>
      </div>
      ${renderAdminSubTabs()}
      ${adminSubView === "written" ? renderWrittenScoringPanel() : `
      <div class="panel">
        <div class="panel-header">
          <div>
            <h1 class="section-title">Contributor controls</h1>
            <div class="section-kicker">Contributor-first view with filters, CSV export, and attempt review.</div>
          </div>
          <div class="row-actions">
            <button class="button" data-action="export-csv">Export CSV</button>
            <button class="button secondary" data-action="open-make-admin">Make admin</button>
          </div>
        </div>
        <div class="panel-body">
          ${renderFilters()}
          <div style="height: 14px;"></div>
          ${renderAdminTable(rows)}
        </div>
      </div>
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
      `}
      ${renderAttemptDetail()}
      ${makeAdminOpen ? renderMakeAdminModal() : ""}
    </section>
  `;
}

function renderAdminSubTabs() {
  const writtenCount = writtenReviewRows().length;
  return `
    <div class="subtabs" aria-label="Admin sections">
      <button class="subtab ${adminSubView === "responses" ? "is-active" : ""}" data-action="admin-subtab" data-admin-subtab="responses">Quiz responses</button>
      <button class="subtab ${adminSubView === "written" ? "is-active" : ""}" data-action="admin-subtab" data-admin-subtab="written">Written scoring${writtenCount ? ` (${writtenCount})` : ""}</button>
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
        <div class="field compact-field">
          <label for="offboarding-search">Search contributors</label>
          <input id="offboarding-search" class="input" data-filter="offboardingSearch" value="${escapeHtml(filters.offboardingSearch)}" placeholder="Search name, email, or cohort">
        </div>
        <div style="height: 14px;"></div>
        <div class="offboarding-grid">
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
          <div>
            <div class="strong">Offboarding log</div>
            <div class="section-kicker">Tracks both offboarding and restored access.</div>
            <div style="height: 10px;"></div>
            <div class="audit-list">
              ${(state.offboardingLog || []).length ? state.offboardingLog.slice(0, 8).map((event) => `
                <div class="audit-item">
                  <div class="strong">${escapeHtml(event.action)} - ${escapeHtml(event.name || event.email)}</div>
                  <div class="cell-sub">${escapeHtml(event.email)} - ${escapeHtml(event.actor)} - ${escapeHtml(event.at)}</div>
                </div>
              `).join("") : `<div class="empty-state">No offboarding changes yet.</div>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function writtenReviewRows() {
  return state.attempts
    .filter((attempt) => attempt.status === "Submitted" || attempt.manualReview)
    .map((attempt) => ({
      attempt,
      person: contributor(attempt.contributorId),
      itemQuiz: quiz(attempt.quizId)
    }))
    .filter((row) => row.person && row.itemQuiz)
    .sort((a, b) => attemptTimeValue(b.attempt) - attemptTimeValue(a.attempt));
}

function renderWrittenScoringPanel() {
  const rows = writtenReviewRows();
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h1 class="section-title">Written scoring</h1>
          <div class="section-kicker">Long text responses land here until an admin assigns a score.</div>
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
      </div>
    </div>
  `;
}

function renderMakeAdminModal() {
  return `
    <div class="modal-backdrop" data-modal-backdrop="make-admin">
      <div class="modal-card compact" role="dialog" aria-modal="true" aria-labelledby="make-admin-title">
        <div class="modal-header">
        <div>
            <h2 id="make-admin-title" class="section-title small">Make admin</h2>
            <div class="section-kicker">Type the account email that should receive admin access.</div>
        </div>
          <button class="button ghost" data-action="close-make-admin">Close</button>
      </div>
        <div class="modal-body">
          <div class="field">
            <label for="make-admin-email">Email</label>
            <input id="make-admin-email" class="input" data-make-admin-email placeholder="name@example.com" autocomplete="off">
          </div>
          <div class="helper-text">In this sandbox, the email can match an existing sample account or create a new invited admin account.</div>
        </div>
        <div class="modal-actions">
          <button class="button secondary" data-action="close-make-admin">Cancel</button>
          <button class="button" data-action="make-admin-by-email">Make admin</button>
        </div>
      </div>
    </div>
  `;
}

function adminStats() {
  const allRows = state.assignments.map((item) => ({ item, status: adminStatus(item), latest: latestAttempt(item.contributorId, item.quizId) }));
  return {
    passed: allRows.filter((row) => row.status === "Passed").length,
    failed: allRows.filter((row) => row.status === "Failed").length,
    inProgress: allRows.filter((row) => row.status === "In progress").length,
    notStarted: allRows.filter((row) => row.status === "Not started").length
  };
}

function renderFilters() {
  const cohorts = ["All", ...new Set(state.contributors.map((person) => person.cohort))];
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
      <div class="field">
        <label for="filter-cohort">Cohort</label>
        <select id="filter-cohort" class="select" data-filter="cohort">
          ${cohorts.map((cohort) => `<option ${filters.cohort === cohort ? "selected" : ""}>${escapeHtml(cohort)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="filter-sort">Sort responses</label>
        <select id="filter-sort" class="select" data-filter="responseSort">
          ${["Most recent", "Oldest"].map((sort) => `<option ${filters.responseSort === sort ? "selected" : ""}>${sort}</option>`).join("")}
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
      if (filters.status !== "All" && row.status !== filters.status && row.latest?.status !== filters.status) return false;
      if (filters.cohort !== "All" && row.person.cohort !== filters.cohort) return false;
      if (filters.score !== "All") {
        if (!row.latest || row.latest.score === null) return filters.score === "Pending";
        if (filters.score === "90-100" && row.latest.score < 90) return false;
        if (filters.score === "80-89" && (row.latest.score < 80 || row.latest.score > 89)) return false;
        if (filters.score === "Below 80" && row.latest.score >= 80) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const direction = filters.responseSort === "Oldest" ? 1 : -1;
      return (responseSortValue(a) - responseSortValue(b)) * direction;
    });
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
              <td>${remainingRetakes(row.item)}</td>
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
              <button class="button secondary" data-action="allow-retake" data-assignment-id="${item.id}">Allow retake</button>
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
          <button class="button" data-action="publish-quiz" data-quiz-id="${itemQuiz.id}" ${itemQuiz.draftDirty ? "" : "disabled"}>${itemQuiz.draftDirty ? "Publish content" : "Content published"}</button>
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
            <div class="publish-note">
              <div class="strong">Publishing and dashboard assignment</div>
              <div class="cell-sub">Publishing saves the assessment content. Assigning pushes it to contributor dashboards.</div>
              <div class="pill-row">
                <span class="status ${itemQuiz.draftDirty ? "retake-available" : "qualified"}">${itemQuiz.draftDirty ? "Unpublished changes" : "Content published"}</span>
                <span class="status ${assignedCount ? "qualified" : "locked"}">${assignedCount} dashboard assignment${assignedCount === 1 ? "" : "s"}</span>
              </div>
            </div>
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
        ${renderAssignmentPanel(itemQuiz)}
        <div class="panel builder-panel">
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
              ${contentItems.length ? contentItems.map((entry, index) => renderContentBlock(itemQuiz, entry, index, contentItems.length)).join("") : `
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
                    <span class="status ${assignmentCountForQuiz(itemQuiz.id) ? "qualified" : "locked"}">${assignmentCountForQuiz(itemQuiz.id) ? "On dashboards" : "Not on dashboards"}</span>
                  </div>
                </div>
                <div class="quiz-card-actions">
                  <button class="button" data-action="edit-quiz" data-quiz-id="${itemQuiz.id}">Edit quiz</button>
                  <button class="button secondary" data-action="preview-quiz" data-quiz-id="${itemQuiz.id}">Preview</button>
                  <button class="button danger" data-action="delete-quiz" data-quiz-id="${itemQuiz.id}">Delete</button>
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

function renderAssignmentPanel(itemQuiz) {
  const canAssign = itemQuiz.status === "Published" && !itemQuiz.draftDirty;
  const assignedPeople = assignedContributorsForQuiz(itemQuiz.id);
  return `
    <div class="panel assignment-panel">
      <div class="panel-header">
        <div>
          <h2 class="section-title small">Dashboard assignment</h2>
          <div class="section-kicker">Choose who sees this quiz on their contributor dashboard.</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="publish-note">
          <div class="strong">${canAssign ? "Ready to assign" : "Publish content first"}</div>
          <div class="cell-sub">${canAssign ? "Assigning makes the quiz appear under Required quizzes." : "Unpublished changes are not pushed to dashboards."}</div>
          <div class="cell-sub">Emails come from the signed-in contributor roster or from this allowlist for people who have not signed in yet.</div>
        </div>
        <div style="height: 12px;"></div>
        <button class="button" data-action="assign-all" data-quiz-id="${itemQuiz.id}" ${canAssign ? "" : "disabled"}>Push to all contributors</button>
        <div style="height: 14px;"></div>
        <div class="field">
          <label>Assign only these emails</label>
          <textarea class="textarea assignment-textarea" data-assign-email-list="${itemQuiz.id}" placeholder="Paste emails, separated by commas or new lines" ${canAssign ? "" : "disabled"}></textarea>
        </div>
        <div style="height: 12px;"></div>
        <div class="row-actions">
          <button class="button secondary" data-action="assign-listed-emails" data-quiz-id="${itemQuiz.id}" ${canAssign ? "" : "disabled"}>Assign pasted emails</button>
          <button class="button ghost" data-action="clear-assignments" data-quiz-id="${itemQuiz.id}" ${canAssign ? "" : "disabled"}>Clear assignments</button>
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
              <button class="button small ghost" data-action="remove-assignment" data-quiz-id="${itemQuiz.id}" data-contributor-id="${person.id}">Remove</button>
            </div>
          `).join("") : `<div class="empty-state compact-empty">This quiz is not on any contributor dashboards yet.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderContentBlock(itemQuiz, entry, index, total) {
  if (entry.kind === "course") return renderCourseEditorBlock(itemQuiz, entry.item, entry.key, index, total);
  return renderQuestionEditorBlock(itemQuiz, entry.item, entry.key, index, total);
}

function renderCourseEditorBlock(itemQuiz, page, key, index, total) {
  return `
    <div class="builder-item draggable-item" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label"><span class="drag-handle" draggable="true" aria-label="Drag course page">::</span> Course page ${index + 1}</div>
          <h3 class="builder-title">${escapeHtml(page.title)}</h3>
        </div>
        <div class="row-actions">
          <span class="status not-started">Training</span>
          <button class="button small secondary" data-action="move-content" data-direction="up" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === 0 ? "disabled" : ""}>Move up</button>
          <button class="button small secondary" data-action="move-content" data-direction="down" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === total - 1 ? "disabled" : ""}>Move down</button>
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
          ${renderRichToolbar(itemQuiz.id, page.id)}
          <div
            class="rich-editor"
            contenteditable="true"
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
      <button class="tool-button" title="Bold" data-action="rich-command" data-command="bold" data-quiz-id="${quizId}" data-page-id="${pageId}"><strong>B</strong></button>
      <button class="tool-button" title="Italic" data-action="rich-command" data-command="italic" data-quiz-id="${quizId}" data-page-id="${pageId}"><em>I</em></button>
      <button class="tool-button" title="Underline" data-action="rich-command" data-command="underline" data-quiz-id="${quizId}" data-page-id="${pageId}"><span style="text-decoration: underline;">U</span></button>
      <button class="tool-button" title="Bullet list" data-action="rich-command" data-command="insertUnorderedList" data-quiz-id="${quizId}" data-page-id="${pageId}">List</button>
      <select class="select compact-select" data-action="rich-font" data-quiz-id="${quizId}" data-page-id="${pageId}" aria-label="Font">
        <option value="">Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Trebuchet MS">Trebuchet</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier</option>
      </select>
      <label class="color-control" title="Text color">
        <span>Color</span>
        <input type="color" data-action="rich-color" data-quiz-id="${quizId}" data-page-id="${pageId}" value="#206ddc">
      </label>
      <label class="button small secondary upload-button">
        Add image
        <input type="file" accept="image/*" data-course-image-upload="${pageId}" data-quiz-id="${quizId}">
      </label>
    </div>
  `;
}

function renderQuestionEditorBlock(itemQuiz, question, key, index, total) {
  const answerEditor = renderAnswerEditor(itemQuiz, question);
  return `
    <div class="builder-item draggable-item" data-content-key="${key}" data-quiz-id="${itemQuiz.id}">
      <div class="builder-top">
        <div>
          <div class="builder-label"><span class="drag-handle" draggable="true" aria-label="Drag question">::</span> Question ${index + 1}</div>
          <h3 class="builder-title">${escapeHtml(question.prompt)}</h3>
        </div>
        <div class="row-actions">
          <span class="status ${question.type === "Long text" ? "submitted" : "qualified"}">${question.type === "Long text" ? "Manual scoring" : "Auto scored"}</span>
          <button class="button small secondary" data-action="move-content" data-direction="up" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === 0 ? "disabled" : ""}>Move up</button>
          <button class="button small secondary" data-action="move-content" data-direction="down" data-quiz-id="${itemQuiz.id}" data-content-key="${key}" ${index === total - 1 ? "disabled" : ""}>Move down</button>
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
        <label class="button small secondary upload-button">
          Upload image
          <input type="file" accept="image/*" multiple data-question-image-upload="${question.id}" data-quiz-id="${itemQuiz.id}">
        </label>
      </div>
      ${resources.length ? `
        <div class="resource-grid">
          ${resources.map((image) => `
            <div class="resource-thumb">
              <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name)}">
              <div class="cell-sub">${escapeHtml(image.name)}</div>
              <button class="button small ghost" data-action="remove-question-image" data-quiz-id="${itemQuiz.id}" data-question-id="${question.id}" data-image-id="${image.id}">Remove</button>
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
      distribution,
      missedCount,
      missRate: answered ? Math.round((missedCount / answered) * 100) : 0,
      averageTime: Math.max(35, Math.round((itemQuiz.estimatedMinutes * 60) / Math.max(1, itemQuiz.questions.length)) + missedCount * 18)
    };
  });
}

function startQuiz(quizId, preview = false) {
  imageViewer = null;
  if (preview) previewReturn = { view, editorMode, selectedQuizId };
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
            <span class="status submitted">Step ${session.index + 1} of ${session.stepKeys.length}</span>
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
          <div class="reference-tile">
            ${resources.length ? `${resources.length} resource image${resources.length === 1 ? "" : "s"} attached` : "No resource images uploaded"}
          </div>
          <div style="height: 14px;"></div>
          <button class="button secondary" data-action="view-question-images" data-question-id="${question.id}" ${resources.length ? "" : "disabled"}>View images</button>
          <div style="height: 14px;"></div>
          <div class="muted">Hints are learning aids and do not reduce the score.</div>
        </div>
      </aside>
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
    <div class="image-viewer-backdrop">
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
      remainingRetakes(row.item)
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
        body: "Add the context contributors should read before starting the assessment.",
        bodyHtml: "<p>Add the context contributors should read before starting the assessment.</p>"
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
        resources: [],
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
  if (document.execCommand) document.execCommand(command, false, value);
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
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "nav") {
    if (!isAdmin() && button.dataset.view !== "contributor") return;
    if (button.dataset.view !== view) {
      selectedAttemptId = null;
      selectedHistoryAttemptId = null;
      makeAdminOpen = false;
    }
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
    render();
  }
  if (action === "close-make-admin") {
    makeAdminOpen = false;
    render();
  }
  if (action === "make-admin-by-email") {
    makeAdminByEmail();
  }
  if (action === "allow-retake") {
    allowRetake(button.dataset.assignmentId);
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
  if (action === "delete-quiz") {
    deleteQuiz(button.dataset.quizId);
  }
  if (action === "move-content") {
    moveContentByDirection(button.dataset.quizId, button.dataset.contentKey, button.dataset.direction);
  }
  if (action === "rich-command") {
    applyRichCommand(button.dataset.quizId, button.dataset.pageId, button.dataset.command);
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
    itemQuiz.status = "Published";
    itemQuiz.draftDirty = false;
    addAudit("Assessment content published", `${itemQuiz.title} - assign it to push to dashboards`);
    render();
  }
  if (action === "add-course-page") {
    const itemQuiz = quiz(button.dataset.quizId);
    const page = {
      id: `cp-${Date.now()}`,
      title: "New course page",
      body: "Add project context, examples, or policy reminders.",
      bodyHtml: "<p>Add project context, examples, or policy reminders.</p>"
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
      resources: [],
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
  if (target.dataset.questionField === "type") {
    updateQuestionType(target.dataset.quizId, target.dataset.questionId, target.value);
  }
  if (target.dataset.action === "rich-font" && target.value) {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "fontName", target.value);
    target.value = "";
  }
  if (target.dataset.action === "rich-color") {
    applyRichCommand(target.dataset.quizId, target.dataset.pageId, "foreColor", target.value);
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
  if (!event.target.closest(".drag-handle")) return;
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
  attempt.overridden = true;
  addAudit("Written response scored", `${person.email} - ${itemQuiz.title} - ${attempt.score}%`);
  render();
}

function toggleContributorOffboard(contributorId) {
  const person = contributor(contributorId);
  if (!person || isAdmin(person)) return;
  person.offboarded = !person.offboarded;
  state.assignments
    .filter((item) => item.contributorId === person.id)
    .forEach((item) => {
      item.offboarded = false;
    });
  const action = person.offboarded ? "Offboarded" : "Restored";
  addOffboardingLog(action, person);
  addAudit(person.offboarded ? "Contributor offboarded" : "Contributor restored", person.email);
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
