# Project Otter Assessment Dashboard

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
- Contributor-facing statuses include Not started, In progress, Passed, Failed, Retake available, Locked, and Project inactive.
- Admin-facing progress statuses are Passed, Failed, In progress, and Not started.
- Scores decide pass/fail automatically unless an admin overrides.
- Open long-text questions can land in Submitted until admin scoring is complete.
- Contributors see exact score and pass/fail, but not missed questions.
- Hints appear during testing and do not reduce score.
- No email notifications.
- Admins can export CSV from the dashboard, then open a specific attempt to enable a retake, lock/unlock, change the result, or save an internal note.
- Admins can sort quiz responses by most recent or oldest attempt date.
- Admin metrics can be viewed across all quizzes or switched to one quiz at a time.
- Failed and pending contributor history rows open a read-only history popup.
- The Admin dashboard has inner tabs for quiz responses and written scoring.
- Written long-text responses requiring admin scoring can be reviewed and scored from the Pending admin review tab.
- Offboarding has its own admin-only tab with searchable contributor-level offboard/restore controls and a dedicated offboarding log.
- Audit logs are shown for admin changes.
- Quizzes require a Google Docs guidelines link.
- The quiz editor starts with "create a new quiz or choose an existing quiz."
- Admins can delete a quiz from the quiz editor home, which removes its sandbox assignments and attempts.
- Publish is disabled until an assessment has unpublished changes.
- Course pages and questions can be reordered with drag and drop.
- Course pages and questions can also be reordered with Move up / Move down buttons.
- Questions, question types, hints, weights, answers, and correct answers can be edited inline.
- Course pages have a rich text editor with bold, italic, underline, lists, fonts, colors, and inline image upload.
- Questions support uploaded resource images. Contributors open these through a View images button while taking the quiz.
- Question resource images are viewed one at a time with previous/next controls.
- Preview mode has a direct Back to editor action.
- Publishing content is separate from dashboard assignment.
- Admins can push a published quiz to all contributor dashboards or assign it only to pasted emails.
- In the sandbox, emails are sample data or pasted allowlist entries. In production, contributor emails should come from verified sign-in identity and/or the project roster.
- Admin contributor filters focus on qualification/progress statuses instead of operational states like locked/offboarded/project inactive.
- The sandbox includes admin and contributor accounts. Contributors only see the Contributor tab.
- The default sandbox roster has one admin account and two contributor accounts.
- Admins can grant admin access by typing an email from the Admin dashboard.
- Question and answer order can be randomized per attempt.
- Reports show canonical answer text, not A/B/C/D.
- Active quiz time excludes pauses.

## Sandbox Notes

The app stores sample state in browser local storage so you can click around and reset it. Uploaded images are also stored locally as browser data URLs in this sandbox. That is only for demos. A production build should use a real database for contributors, quiz definitions, assignments, attempts, audit logs, and admin notes, plus object storage for uploaded images and course assets.

## Suggested Production Data Model

- users: id, name, email, role, external_identity_provider, external_identity_id, created_at
- projects: id, name, status, inactive_message
- quizzes: id, project_id, title, guidelines_url, pass_threshold, retake_limit, status, estimated_minutes, randomize_questions, randomize_answers
- course_pages: id, quiz_id, title, body, sort_order
- questions: id, quiz_id, section_id, type, prompt, hint, weight, reference_asset_id, sort_order
- answers: id, question_id, text, is_correct, sort_order
- assignments: id, contributor_id, quiz_id, locked, retakes_allowed, retakes_used, assigned_at
- offboarding_events: id, contributor_id, action, actor_id, created_at
- attempts: id, assignment_id, status, score, active_seconds, started_at, submitted_at, manual_review_required, overridden_by_admin
- attempt_answers: id, attempt_id, question_id, answer_payload, is_correct, points_awarded
- admin_notes: id, attempt_id, admin_id, body, created_at
- audit_events: id, actor_id, action, target_type, target_id, metadata, created_at
