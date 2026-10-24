const checkDestinationPath = (instruction, showLog, returnLog) => {
    const passed = Boolean(instruction.destinationPath?.fileName && Array.isArray(instruction.destinationPath?.filePath));
    const message = `structure/destinationPath: ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkDestinationPath;
