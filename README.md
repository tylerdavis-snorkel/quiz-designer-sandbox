# Qualify Lab Sandbox

This is a working front-end sandbox for the AI project quiz and assessment product.

## GitHub Pages Hosting

This folder is ready for GitHub Pages because it is a static site:

- index.html
- styles.css
- app.js
- .nojekyll

To host the sandbox:

1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open Settings > Pages.
4. Set the source to "Deploy from a branch".
5. Choose the main branch and root folder.
6. Save, then wait for GitHub to publish the Pages URL.

This is safe for a prototype or stakeholder demo. It is not enough for production with real contractors because GitHub Pages cannot securely store scores, emails, audit logs, admin permissions, or quiz attempts. Production should pair this front end with a real backend and database.

## Product Decisions Captured

- Contributors are contractors.
- Contributors self-sign in through an external platform identity later, likely GitHub or the parent platform.
- Offboarded contributors keep read-only quiz history.
- Contributor statuses: Not started, In progress, Submitted, Passed, Failed, Retake available, Locked, Project inactive.
- Admin-facing "Blocked" means failed with no retakes left.
- Scores decide pass/fail automatically unless an admin overrides.
- Open long-text questions can land in Submitted until admin scoring is complete.
- Contributors see exact score and pass/fail, but not missed questions.
- Hints appear during testing and do not reduce score.
- No email notifications.
- Admins can view attempts, enable retakes, lock quizzes, offboard contributors, change results, export CSV, and use bulk actions.
- Audit logs are shown for admin changes.
- Quizzes require a Google Docs guidelines link.
- The quiz editor starts with "create a new quiz or choose an existing quiz."
- Publish is disabled until an assessment has unpublished changes.
- Course pages and questions can be reordered with drag and drop.
- Questions, question types, hints, weights, answers, and correct answers can be edited inline.
- Question and answer order can be randomized per attempt.
- Reports show canonical answer text, not A/B/C/D.
- Active quiz time excludes pauses.

## Sandbox Notes

The app stores sample state in browser local storage so you can click around and reset it. That is only for the sandbox. A production build should use a real database for contributors, quiz definitions, assignments, attempts, audit logs, and admin notes.

## Suggested Production Data Model

- users: id, name, email, role, external_identity_provider, external_identity_id, created_at
- projects: id, name, status, inactive_message
- quizzes: id, project_id, title, guidelines_url, pass_threshold, retake_limit, status, estimated_minutes, randomize_questions, randomize_answers
- course_pages: id, quiz_id, title, body, sort_order
- questions: id, quiz_id, section_id, type, prompt, hint, weight, reference_asset_id, sort_order
- answers: id, question_id, text, is_correct, sort_order
- assignments: id, contributor_id, quiz_id, locked, offboarded, retakes_allowed, retakes_used, assigned_at
- attempts: id, assignment_id, status, score, active_seconds, started_at, submitted_at, manual_review_required, overridden_by_admin
- attempt_answers: id, attempt_id, question_id, answer_payload, is_correct, points_awarded
- admin_notes: id, attempt_id, admin_id, body, created_at
- audit_events: id, actor_id, action, target_type, target_id, metadata, created_at
