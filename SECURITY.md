# Project Otter Security Notes

## Short Version

This GitHub Pages build is safe for a front-end prototype, stakeholder walkthrough, and UI testing with fake data.

It is not safe for real assessments, real answer keys, real contractor emails, real scores, real audit logs, or real admin actions. A static GitHub Pages site sends its JavaScript to every visitor. Anything inside `app.js` can be viewed in browser developer tools, including answer keys, sample emails, sample roles, and sample scoring logic.

For the official version, the GitHub repo can host the front-end code, but answer keys, contributor emails, attempt records, admin roles, scoring, and audit logs must live behind an authenticated backend.

## What I Hardened In This Prototype

I added a Content Security Policy in `index.html`.

The policy:

- Allows scripts only from this site.
- Blocks network/API calls from the page with `connect-src 'none'`.
- Blocks embedded objects, frames, and workers.
- Blocks form submissions with `form-action 'none'`.
- Limits images to this site, data URLs for sandbox uploads, and the Snorkel logo host.
- Limits fonts/styles to the local files and Google Fonts.
- Allows inline styles because this prototype still uses some inline layout/rich-text styling. The official version should move those styles into CSS classes and remove inline-style allowance.
- Sets `base-uri 'none'` to prevent a malicious base URL from rewriting relative links.
- Enables `upgrade-insecure-requests`.

I added a `no-referrer` policy in `index.html`.

This prevents the browser from sending the page URL as a referrer to other sites.

I added `robots.txt` to discourage search engines from indexing the public demo.

This is a privacy guardrail for demos, not an access-control mechanism.

I documented the static-site security boundary in this file.

This is important because the main security risk is architectural: real quiz answers and real contributor data cannot be secured if they are shipped to the browser in a public static file.

## Existing Prototype Safety Boundaries

The sandbox uses fake `example.com` contributor emails.

The contributor UI does not show missed questions or correct answers after submission.

Contributor accounts only see the Contributor tab in the normal UI.

Admin-only features are visually hidden from contributor accounts.

The tutorial offboarding example uses temporary data only during the guided tour.

These are useful product safeguards for the prototype. They are not production security controls because a user can still inspect and change client-side JavaScript state.

## What Cannot Be Made Secure On GitHub Pages Alone

Answer keys cannot be protected if they are in `app.js`.

Contributor emails cannot be protected if they are in `app.js` or browser local storage.

Admin permissions cannot be trusted if role checks happen only in JavaScript.

Scores, attempts, retake counts, and audit logs cannot be trusted if they live in local storage.

Quiz reset, offboarding, and result override actions cannot be trusted if they run only in the browser.

Randomized questions and answer choices cannot protect the answer key if the full quiz definition is available client-side.

CSV exports cannot be safely permissioned without a backend authorization check.

## Required Official Architecture

Use GitHub Pages only for a static front-end shell, or move to a platform that supports authenticated server routes.

The official app needs:

- Authenticated sign-in, likely GitHub OAuth or the parent platform identity.
- Server-side sessions with secure, HttpOnly, SameSite cookies.
- Server-side role checks for contributor and admin access.
- Server-side project membership checks.
- A database for contributors, assignments, attempts, scores, retakes, offboarding, audit logs, and admin notes.
- Server-side grading so correct answers are never sent to contributors.
- API responses that return only the data the current user is allowed to see.
- Admin APIs that verify admin role on every request.
- Server-side audit logs for every privileged action.
- Object storage for uploaded images/course assets instead of browser local storage.
- Rate limiting on auth, attempt submission, admin actions, and exports.
- Input validation and output escaping on every API boundary.
- Backups and retention rules for audit data.

## Official Answer-Key Handling

Correct answers must never be included in the contributor quiz payload.

The contributor should receive:

- Question text.
- Answer choices in the randomized order chosen for that attempt.
- Any allowed resource images.
- Hints that are intentionally visible during the quiz.

The server should store:

- Correct answer ids.
- Ranking order.
- Scoring weights.
- Manual-review rubrics.
- The randomized order served to each attempt.

When a contributor submits, the server should grade the attempt and return only the score/status that the contributor is allowed to see.

## Official Email And PII Handling

Contributor emails should come from verified sign-in identity or the project roster, not from a public JavaScript file.

Contributor views should only receive the current user's own profile and assignments.

Admin views should receive contributor emails only after the backend verifies the user is an admin for that project.

CSV exports should be generated server-side and logged.

Offboarded contributors should be blocked server-side from starting or resuming quizzes, while still being allowed to view permitted score history.

## Repository Rules For The Official Build

Never commit:

- Real quiz answer keys in front-end files.
- Real contributor emails in seed data.
- API secrets, OAuth client secrets, tokens, or service keys.
- Production database dumps.
- Real attempt records, scores, admin notes, or audit logs.

Recommended GitHub settings:

- Keep the production data/backend repository private if it contains migrations, seed data, or operational scripts.
- Enable branch protection on `main`.
- Require pull request review.
- Enable Dependabot alerts and security updates.
- Enable secret scanning and push protection.
- Use environment secrets for deployment credentials.
- Restrict who can deploy production.

## Launch Checklist

Before using this for real contributors:

- Move answer keys out of the browser.
- Move contributor data out of static files.
- Replace local storage with a real backend database.
- Add authenticated API endpoints.
- Add server-side authorization for every admin and contributor action.
- Verify contributors cannot fetch other contributors' emails, scores, attempts, or assignments.
- Verify contributors cannot fetch correct answers.
- Verify changing browser local storage does not change server truth.
- Verify audit logs are written server-side and cannot be edited by clients.
- Run security testing on role bypass, direct object reference, CSV export, offboarding, retakes, and scoring.

## Current Status

Current static sandbox status: demo-safe with fake data only.

Production readiness status: not production-secure until the backend controls above exist.
