import insertSerial from "./insertSerial/index.js";
import insertOptions from "./insertOptions/index.js";
import insertSearch from "./insertSearch/index.js";

const startFunc = ({ inOptions = {}, inBase, showLog = false, returnLog = [] }) => {
    const localOptions = inOptions;

    const localBase = inBase;

    if (localOptions.showSerial || localOptions.serial) {
        insertSerial(localBase, localOptions.serial || {}, showLog, returnLog);
    }

    if (localOptions.showOptions || localOptions.options) {
        insertOptions(localBase, localOptions.options || {}, showLog, returnLog);
    };

    if (localOptions.showSearch) {
        insertSearch();
    };

    return localBase;
};

export default startFunc;