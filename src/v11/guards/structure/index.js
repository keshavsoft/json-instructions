import checkSourcePath from "./sourcePath/index.js";
import checkDestinationPath from "./destinationPath/index.js";
import checkTemplateKey from "./templateKey/index.js";
import checkFunc from "./func/index.js";

const checkStructure = (instruction, showLog, returnLog) => {
    const results = [
        checkSourcePath(instruction, showLog, returnLog),
        checkDestinationPath(instruction, showLog, returnLog),
        checkTemplateKey(instruction, showLog, returnLog),
        checkFunc(instruction, showLog, returnLog)
    ];
    return results.every(Boolean);
};
export default checkStructure;
