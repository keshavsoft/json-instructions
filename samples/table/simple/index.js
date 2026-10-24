import fromCollection from "json-transformer-funcs-one-dimension";
import twoDimensional from "json-transformer-funcs-two-dimensions";

import spec from "../spec.json" with { type: "json" };
import base from "./base.json" with { type: "json" };
import singleInstructions from "./instructions/single.json" with { type: "json" };
import doubleInstructions from "./instructions/double.json" with { type: "json" };

import runSingleInstructions from "../../singleInstruction/index.js";
import runDoubleInstructions from "../../doubleInstruction/index.js";
import actions from "../../actions/index.js";

const functions = { fromCollection, twoDimensional };

const startFunc = (inConfig = {}, showLog = false, returnLog = []) => {
    const localConfig = inConfig;

    const localColumns = localConfig.columns || [];
    const localData = localConfig.data || [];
    const localOptions = localConfig.options

    const localBase = structuredClone(base);
    const registry = {
        data: {
            columns: localColumns,
            data: localData
        },
        base: localBase,
        spec
    };

    runSingleInstructions(singleInstructions, registry, functions, spec, showLog, returnLog);
    runDoubleInstructions(doubleInstructions, registry, functions, spec, showLog, returnLog);

    actions({ inOptions: localOptions, inBase: localBase });

    return localBase;
};

export default startFunc;
