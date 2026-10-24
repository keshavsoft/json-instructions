import runSingleInstructions from "../../../src/index.js";

import applyTemplate from "json-transformer-funcs-primitive";
import { findByRole } from "json-transformer-funcs";

import spec from "../spec.json" with { type: "json" };
import singleInstructions from "./instructions/single.json" with { type: "json" };
import footerInstructions from "./instructions/footer.json" with { type: "json" };

const functions = { applyTemplate };

const insertSerial = (input = {}, config = {}, showLog = false, returnLog = []) => {
    let localTableSpec = input;
    let localSerial = config;

    if (input && typeof input === "object" && "inTableSpec" in input) {
        localTableSpec = input.inTableSpec;
        localSerial = input.inSerial || config;
    }

    const localSerialMerged = {
        col: { width: "50px" },
        header: { columnName: "#" },
        body: {},
        footer: {},
        ...localSerial
    };

    const registry = {
        data: {
            serial: localSerialMerged
        },
        base: localTableSpec,
        spec
    };

    runSingleInstructions(singleInstructions, registry, functions, spec, showLog, returnLog);

    const footerRow = findByRole(localTableSpec, "table-footer-row");
    if (footerRow && Array.isArray(footerRow.children) && footerRow.children.length > 0) {
        runSingleInstructions(footerInstructions, registry, functions, spec, showLog, returnLog);
    }

    return localTableSpec;
};

export default insertSerial;
