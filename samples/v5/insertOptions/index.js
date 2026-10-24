import runSingleInstructions from "../../../src/index.js";

import { findByRole } from "json-transformer-funcs";

import spec from "../spec.json" with { type: "json" };
import singleInstructions from "./instructions/single.json" with { type: "json" };

const insertOptions = (input = {}, config = {}, showLog = false, returnLog = []) => {
    let localTableSpec = input;
    let localOptions = config;

    if (input && typeof input === "object" && "inTableSpec" in input) {
        localTableSpec = input.inTableSpec;
        localOptions = input.inOptions || config;
    }

    const localOptionsMerged = {
        col: { width: "100px" },
        header: { columnName: "options" },
        body: { columnName: "show" },
        footer: {},
        ...localOptions
    };

    const registry = {
        data: {
            options: localOptionsMerged
        },
        base: localTableSpec,
        spec
    };

    runSingleInstructions(singleInstructions, registry, spec, showLog, returnLog);

    return localTableSpec;
};

export default insertOptions;