const checkFunctionReference = (instruction, functions, showLog, returnLog) => {
    const passed = typeof functions[instruction.func] === "function";
    const message = `references/func (${instruction.func}): ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkFunctionReference;
