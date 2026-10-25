import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";

import writePath from "json-write-path";
import resolvePath from "json-source-path";

import checkInstruction from "./guards/index.js";

import spec from "./spec.json" with {type: "json"};

const functions = { applyTemplate, fromCollection };

const getSource = (instruction, registry) => {
    if (instruction?.sourcePath === null) {
        // Runs ONLY if value is exactly null
        return null;
    };

    const source = resolvePath(registry, instruction.sourcePath);
    // const result = functions[instruction.func](source, localSpecKey);

    return source;
};

const runSingleInstruction = (instruction, registry, showLog, returnLog) => {
    // if (!checkInstruction(instruction, functions, spec, showLog, returnLog)) return;

    const localSpec = spec;
    const templateKey = instruction.templateKey;
    let localSpecKey = localSpec[templateKey];
    // const localSpecKey = localSpec[templateKey];
    const source = getSource(instruction, registry);
    let result = functions[instruction.func](source, localSpecKey);

    if (source === null) {
        result = localSpecKey;
    };

    writePath(registry, instruction.destinationPath, result);
};

const startFunc = (instructions, registry, showLog, returnLog) => {
    instructions.forEach(instruction => {
        runSingleInstruction(instruction, registry, showLog, returnLog);
    });
};

export default startFunc;