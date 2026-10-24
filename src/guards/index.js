import checkStructure from "./structure/index.js";
import checkReferences from "./references/index.js";

const checkInstruction = (instruction, functions, spec, showLog, returnLog) => {
    const structurePassed = checkStructure(instruction, showLog, returnLog);
    if (!structurePassed) return false;
    return checkReferences(instruction, functions, spec, showLog, returnLog);
};
export { checkStructure, checkReferences, checkInstruction };
export default checkInstruction;
