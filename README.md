# WordQuest Entreprise

A daily word guessing game with a **tech & business vocabulary**: find the 6-letter word of the day in 6 tries.

▶ Play it on [ad-ventures.cc/games](https://ad-ventures.cc/games/) — or on GitHub Pages: https://ado-san.github.io/WordQuestEntreprise

Built by [AD Ventures](https://ad-ventures.cc) as a customizable game for companies: your own word list
(product names, industry jargon, company values), colours, logo and interface texts.

## Customize it

| What | File |
|---|---|
| Words of the day (6 letters, one per day, in order) | `src/constants/wordlist.ts` |
| Accepted guesses (English 6-letter dictionary + all words of the day) | `src/constants/validGuesses.ts` |
| Word length, number of tries, start date, author, links | `src/constants/config.ts` |
| Alphabet / keyboard | `src/constants/orthography.ts` |
| Interface texts (English, Spanish) | `public/locales/<lang>/translation.json` |

Every word in `wordlist.ts` must also be in `validGuesses.ts` and be exactly `wordLength` letters long
(`npm test` checks the length and the alphabet).

## Develop

```bash
npm ci
npm start          # dev server on http://localhost:3000
npm test
npm run build      # production build in build/
```

Build for a sub-path (e.g. ad-ventures.cc/play/wordquest/):

```bash
GENERATE_SOURCEMAP=false PUBLIC_URL=/play/wordquest npm run build
```

Pushing to `main` runs the GitHub Actions workflow, which tests, builds and publishes to the `gh-pages` branch.

## Credits

- Original Wordle clone by [Hannah Park](https://github.com/hannahcode/wordle) (MIT License)
- Any-language adaptation by [Aidan Pine](https://github.com/roedoejet/AnyLanguage-Wordle)
- Accepted-guesses dictionary from [word-list](https://github.com/sindresorhus/word-list) (MIT)
- Derived from [ado-san/sutomtom](https://github.com/ado-san/sutomtom)

Wordle is a trademark of The New York Times Company. This project is not affiliated with or endorsed by it.
