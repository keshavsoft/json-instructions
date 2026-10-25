const checkTemplateKey = (instruction, showLog, returnLog) => {
    const passed = instruction.templateKey === undefined ||
        (typeof instruction.templateKey === "string" && instruction.templateKey.length > 0);
    const message = `structure/templateKey: ${passed ? "passed" : "failed"}`;
    returnLog.push(message);
    if (showLog) console.log(message);
    return passed;
};
export default checkTemplateKey;
