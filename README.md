# json-instructions

> **Guard the instruction → resolve the source → apply the template → write the result.**

`json-instructions` is the instruction runner that drives JSON tree transformations declaratively. You describe what should happen in a JSON array; this library executes each step.

`writePath` — the write step — now lives in its own package: [`json-write-path`](https://www.npmjs.com/package/json-write-path).

---

## The core idea

Every build runs through three layers:

```
1. Registry      holds named JSON trees
                   data  = your source data
                   base  = the target tree to mutate
                   spec  = named cell/row templates

2. Instructions  a JSON array where each item says:
                   "guard this instruction,
                    read THIS source path,
                    apply THIS template,
                    write the result to THIS destination"

3. Packages      json-transformer-funcs      → resolvePath (read)
                 json-transformer-funcs-primitive → applyTemplate (transform)
                 json-write-path             → writePath (write)
```

Because instructions are JSON, you can read a build sequence without tracing any JavaScript. Each instruction has a `narration` field that explains itself in plain English.

---

## Folder structure

```
src/
  v6/
    index.js            ← instruction runner (runSingleInstruction, runSingleInstructions)
    spec.json           ← named cell/row/col templates
    guards/
      index.js          ← checkInstruction — structure + references guard
      structure/        ← validates required fields are present
      references/       ← validates func + templateKey exist in registry
```

---

## The story in four steps

Every instruction goes through the same pipeline:

### Step 1 — Guard (`guards/`)

`checkInstruction(instruction, functions, spec)` runs two checks in sequence:

1. **`checkStructure`** — required fields (`func`, `templateKey`, `sourcePath`, `destinationPath`) must all be present.
2. **`checkReferences`** — `instruction.func` must exist in the `functions` map, and `instruction.templateKey` must exist in `spec`.

If either check fails the instruction is skipped entirely — no partial writes.

### Step 2 — Resolve (`resolvePath` from `json-transformer-funcs`)

```js
const source = resolvePath(registry, instruction.sourcePath);
```

Reads a value out of the registry by following a `sourcePath` descriptor — the read-side counterpart of `writePath`.

### Step 3 — Transform (`applyTemplate` from `json-transformer-funcs-primitive`)

```js
const result = applyTemplate(source, spec[instruction.templateKey]);
```

Takes the resolved source value and stamps it into the named template from `spec.json`. Returns a new JSON node ready to be written.

### Step 4 — Write (`writePath` from `json-write-path`)

```js
writePath(registry, instruction.destinationPath, result);
```

Navigates the target tree using the `destinationPath` descriptor and applies the named action (`set`, `push`, `unshift`, `pushToRows`, etc.). See the [`json-write-path`](https://www.npmjs.com/package/json-write-path) docs for the full action catalogue.

---

## Instruction format

```json
{
  "narration": "Prepend the serial header cell to the table header row.",
  "destinationPath": {
    "fileName": "base",
    "dataRole": "table-header-row",
    "filePath": ["children"],
    "action": "unshift"
  },
  "sourcePath": {
    "fileName": "data",
    "filePath": ["serial", "header"]
  },
  "templateKey": "buildHeader",
  "func": "applyTemplate"
}
```

| Field | Purpose |
|---|---|
| `narration` | Human-readable description of what this step does |
| `sourcePath` | Where to read the source value from in the registry |
| `templateKey` | Key into `spec.json` — selects the template to apply |
| `func` | Name of the transform function to call |
| `destinationPath` | Where + how to write the result (handled by `json-write-path`) |

---

## API

```js
import runSingleInstructions, { runSingleInstruction } from "json-instructions";

// Run all instructions in an array
runSingleInstructions(instructions, registry, spec, showLog, returnLog);

// Run a single instruction
runSingleInstruction(instruction, registry, spec, showLog, returnLog);
```

| Parameter | Type | Purpose |
|---|---|---|
| `instructions` | `object[]` | Array of instruction objects |
| `registry` | `object` | Named JSON trees (`{ data, base, spec, … }`) |
| `spec` | `object` | Named templates (keyed by `templateKey`) |
| `showLog` | `boolean` | Log each step to console |
| `returnLog` | `array` | Accumulates log entries for inspection |

---

## Dependencies

| Package | Role |
|---|---|
| [`json-transformer-funcs`](https://www.npmjs.com/package/json-transformer-funcs) | `resolvePath` — reads a value from the registry |
| [`json-transformer-funcs-primitive`](https://www.npmjs.com/package/json-transformer-funcs-primitive) | `applyTemplate` — stamps a value into a template |
| [`json-write-path`](https://www.npmjs.com/package/json-write-path) | `writePath` — navigates + mutates the target tree |

---

## Build

```bash
npm install
npm run build
# output: docs/dist/vN/min.js
```
