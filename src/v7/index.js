import applyTemplate from "json-transformer-funcs-primitive";
import writePath from "json-write-path";
import resolvePath from "json-source-path";

import checkInstruction from "./guards/index.js";

const functions = { applyTemplate };

const runSingleInstruction = (instruction, registry, spec, showLog, returnLog) => {
    if (!checkInstruction(instruction, functions, spec, showLog, returnLog)) return;

    const localShowLog = showLog;
    const localSpec = spec;
    const templateKey = instruction.templateKey;
    const localSpecKey = localSpec[templateKey];

    if (localShowLog) console.log("singleInstruction ; ", templateKey, localSpecKey);

    const source = resolvePath(registry, instruction.sourcePath);
    const result = functions[instruction.func](source, localSpecKey);

    writePath(registry, instruction.destinationPath, result);
};

const runSingleInstructions = (instructions, registry, spec, showLog, returnLog) => {
    instructions.forEach(instruction => {
        runSingleInstruction(instruction, registry, spec, showLog, returnLog);
    });
};

export { runSingleInstruction, runSingleInstructions };
export default runSingleInstructions;