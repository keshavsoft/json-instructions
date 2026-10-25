import checkFunctionReference from "./func/index.js";
import checkSpecReference from "./templateKey/index.js";

const checkReferences = (instruction, functions, spec, showLog, returnLog) => {
    const functionPassed = checkFunctionReference(instruction, functions, showLog, returnLog);
    const specPassed = checkSpecReference(instruction, spec, showLog, returnLog);
    return functionPassed && specPassed;
};
export default checkReferences;
