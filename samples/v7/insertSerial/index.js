import runSingleInstructions from "../../../src/index.js";

import { findByRole } from "json-transformer-funcs";

import spec from "../spec.json" with { type: "json" };
import singleInstructions from "./instructions/single.json" with { type: "json" };

const insertSerial = (input = {}, config = {}, showLog = false, returnLog = []) => {
    let localTableSpec = input;

    // console.log("input : ", input, config);

    const localSerialMerged = {
        col: { width: "50px" },
        header: { columnName: "#" },
        body: {},
        footer: {}
    };

    const registry = {
        data: {
            serial: localSerialMerged
        },
        base: localTableSpec,
        spec
    };

    runSingleInstructions(singleInstructions, registry, spec, showLog, returnLog);

    return localTableSpec;
};

export default insertSerial;