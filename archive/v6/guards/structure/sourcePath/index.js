const checkSourcePath = (instruction, showLog, returnLog) => {
    const passed = Boolean(instruction.sourcePath?.fileName && Array.isArray(instruction.sourcePath?.filePath));
    const message = `structure/sourcePath: ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkSourcePath;
