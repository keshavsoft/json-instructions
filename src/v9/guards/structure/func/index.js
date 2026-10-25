const checkFunc = (instruction, showLog, returnLog) => {
    const passed = typeof instruction.func === "string" && instruction.func.length > 0;
    const message = `structure/func: ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkFunc;
