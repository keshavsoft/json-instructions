import applyTemplate from "json-transformer-funcs-primitive";
import fromCollection from "json-transformer-funcs-one-dimension";
import twoDimensional from "json-transformer-funcs-two-dimensions";

import writePath from "json-write-path";
import resolvePath from "json-source-path";

import checkInstruction from "./guards/index.js";

import spec from "./spec.json";

const functions = { applyTemplate, fromCollection, twoDimensional };

const runSingleInstruction = (instruction, registry, showLog, returnLog) => {
    if (!checkInstruction(instruction, functions, spec, showLog, returnLog)) return;

    const result = functions[instruction.func](
        registry.data.columns,
        registry.data.data,
        spec
    );

    writePath(registry, instruction.destinationPath, result);
};

const startFunc = (instructions, registry, showLog, returnLog) => {
    instructions.forEach(instruction => {
        runSingleInstruction(instruction, registry, showLog, returnLog);
    });
};

export default startFunc;