import insertSerial from "./insertSerial/index.js";

import base from "./base.json" with { type: "json" };

const startFunc = ({ inOptions = {}, inBase, showLog = false, returnLog = [] }) => {
    const localOptions = inOptions;

    const localBase = inBase;

    if (localOptions.showSerial || localOptions.serial) {
        insertSerial(localBase, localOptions.serial || {}, showLog, returnLog);
    };

    return localBase;
};

const spec = startFunc({
    inOptions: {
        showSerial: true,
        showOptions: true
    },
    inBase: base
});

// console.log("spec : ", JSON.stringify(spec.children[1].children[0].children, null, 2));
