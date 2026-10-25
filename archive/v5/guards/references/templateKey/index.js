const checkSpecReference = (instruction, spec, showLog, returnLog) => {
    const passed = instruction.templateKey === undefined || Object.hasOwn(spec, instruction.templateKey);
    const message = `references/templateKey${instruction.templateKey === undefined ? " (not used)" : ` (${instruction.templateKey})`}: ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkSpecReference;
