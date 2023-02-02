# Typescript playground

## Runtime modes

### Browser

1. Create project subfolder, e.g. `/src/popup`
2. Copy `tsconfig.browser.json` to `/src/popup/tsconfig.json`
3. Create TS entry point in project subfolder, e.g. `/src/popup/script.ts`
4. Qualify imports with `.js` extension. E.g. `import Model from "model.js"` instead of `from "model"`
5. Insert resulting script into HTML with `<script type="module" src="dist/script.js"></script>`
6. Use `npx tsc` in project subfolder to compile
7. Use `npx http-server` in project subfolder to run server

### Jest

```sh
npm test -- <test_id>
```

### TS node

```sh
npm start -- <path/to/file.ts>
```
