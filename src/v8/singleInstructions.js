import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";

import writePath from "json-write-path";
import resolvePath from "json-source-path";

import checkInstruction from "./guards/index.js";

import spec from "./spec.json" with {type: "json"};

const functions = { applyTemplate, fromCollection };

const runSingleInstruction = (instruction, registry, showLog, returnLog) => {
    // if (!checkInstruction(instruction, functions, spec, showLog, returnLog)) return;

    const localShowLog = showLog;
    const localSpec = spec;
    const templateKey = instruction.templateKey;
    const localSpecKey = localSpec[templateKey];

    if (localShowLog) console.log("singleInstruction ; ", templateKey, localSpecKey);

    // console.log("registry : ", templateKey, localSpecKey, instruction);

    // const source = resolvePath(registry, instruction.sourcePath);

    // console.log("source ; ", source);

    // const result = functions[instruction.func](source, localSpecKey);

    writePath(registry, instruction.destinationPath, localSpecKey);
};

const startFunc = (instructions, registry, showLog, returnLog) => {
    instructions.forEach(instruction => {
        runSingleInstruction(instruction, registry, showLog, returnLog);
    });
};

export default startFunc;