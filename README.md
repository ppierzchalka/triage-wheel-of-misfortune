# Triage Wheel of Misfortune

Triage Wheel of Misfortune is a small web app for scrum teams who struggle to find volunteers during
bug triage meetings. You add the developers as members (optionally grouped into teams), select who is
eligible for the current round, and spin a physical-style wheel to pick the lucky one — grab it with
your mouse or finger, give it a proper fling, and watch it slow down under friction until it stops.
Whoever ends up under the pointer takes the bug.

Everything runs locally in the browser — no backend, no account, no Firebase. Your members and teams
are saved to localStorage, so your roster survives page reloads.

Features:

- Bulk-add members by pasting a list of names — no more one-by-one typing
- Organize members into teams with chips; quick-add a member while assigning them to a team
- Select individual members or whole teams for each lottery round
- A drag-to-spin wheel with real inertia physics (or a random "fling" button for the lazy)
- Names on the wheel are laid out radially and auto-fit each slot; adjacent slots always contrast
- Candidates are shuffled before every round, so order never influences the outcome
- Confetti + animated winner card when the wheel comes to rest
- Clean, modern UI with dark and light themes, built with React 19, HeroUI, Tailwind CSS and SVG

This is scrum master's dream and developer's worst nightmare!

## Preview

[Live Preview](https://ppierzchalka.github.io/triage-wheel-of-misfortune/ 'Triage Wheel of Misfortune')

## Installation

- Clone this repo
- Install [pnpm](https://pnpm.io/installation)
- Run `pnpm install`

## Usage

- Run `pnpm dev` to start the development server
- Open drawer with menu button
- Add team members and teams
- Select teams or persons for lottery
- Grab the wheel with your mouse/finger and spin it (or use the button below it)
- When the wheel stops, the person under the pointer wins the bug

All data is stored locally in your browser (localStorage), no account required.

## Scripts

- `pnpm dev` – start the development server
- `pnpm build` – typecheck and build for production
- `pnpm preview` – preview the production build locally
- `pnpm lint` / `pnpm lint:fix` – lint the code
- `pnpm typecheck` – run TypeScript checks
- `pnpm test` / `pnpm test:watch` – run unit tests with Vitest
- `pnpm test:e2e` / `pnpm test:e2e:ui` – run end-to-end tests with Playwright

## Deployment

The app is deployed to GitHub Pages automatically on every push to `master`
via a GitHub Actions workflow (`.github/workflows/deploy.yml`).

#### Favicon

Favicon taken from [Freepik](https://www.flaticon.com/authors/freepik 'Freepik') from [www.flaticon.com](https://www.flaticon.com/ 'Flaticon')
Triangle marker icon made by [Freepik](https://www.flaticon.com/authors/freepik 'Freepik') from [www.flaticon.com](https://www.flaticon.com/ 'Flaticon')
