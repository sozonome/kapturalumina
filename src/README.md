# kapturalumina - src/

- serviceWorker enabled (PWA)
- [`/components`](components/) : app components, wrappers, routings
- [`/firebase`](firebase/) : all functions related to operations with firebase
- [`/functions`](functions/) : reusable functions
- [`/models`](models/) : type declarations
- [`/pages`](pages/) : all app pages
- [`/theme`](theme/) : app styling

## conventions

- **`import`** sequences (start from) :
  1. **external** dependencies
  2. internal components
  3. internal functions
  4. internal types
  5. _styling_
  6. internal images
- **`yarn prettify`** or **`npm run prettify`** before commit
- [Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0/)
