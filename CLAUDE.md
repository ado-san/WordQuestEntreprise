# CLAUDE.md — WordQuest Entreprise

Context for Claude Code. Owner: Adrien Lopez (GitHub `ado-san`). Talk to the owner in French; game texts are in English.

## What it is

A daily word guessing game (6-letter tech & business word, 6 tries), shown on https://ad-ventures.cc/games/wordquest/
and playable at https://ad-ventures.cc/play/wordquest/. It is a copy of `ado-san/sutomtom`
(Create React App 5, React 17, TypeScript, Tailwind, react-i18next), itself based on Aidan Pine's
any-language Wordle clone (MIT). Do not use "Wordle" in the product name (NYT trademark).

## Key files

| What | File |
|---|---|
| Words of the day (order = one per day from `startDate`) | `src/constants/wordlist.ts` (147 words, shuffled) |
| Valid guesses (English 6-letter dictionary from `word-list` + all words of the day) | `src/constants/validGuesses.ts` |
| Length, tries, start date (`November 18, 2026`), author, links | `src/constants/config.ts` |
| UI texts, help examples (BUDGET / SERVER / MARKET) | `public/locales/{en,es}/translation.json` |

Every word of the day must be 6 letters a–z and also be present in `validGuesses.ts` (`npm test` checks length and alphabet).

## Changes made vs sutomtom

- New word lists (no personal names or swear words), new name, texts, About links (contact AD Ventures), manifest fixed (was invalid JSON), README, LICENSE line.
- `.env` removed (it contained a stray `CI= npm run build`).
- Physical keyboard letters re-enabled in `src/components/keyboard/Keyboard.tsx`, with handlers kept in a ref
  (fast typing used to drop/shuffle letters); `onChar`/`onDelete` in `App.tsx` use functional state updates.
- Header forced to `text-white` (was black on the black background).

## Commands

```bash
npm ci
npm start
CI=true npx react-scripts test --watchAll=false
npm run build                                                   # GitHub Pages (homepage in package.json)
GENERATE_SOURCEMAP=false PUBLIC_URL=/play/wordquest npm run build # for ad-ventures.cc
```

To update the site: build with the second command and copy `build/` (plus `LICENSE`) to
`gatsby-starter-netlify-cms-new/next-preview/public/play/wordquest/`.

Pushing to `main` runs `.github/workflows/publish.yml` (test, build, deploy to the `gh-pages` branch);
GitHub Pages must be enabled on `gh-pages` in the repo settings.
