import actions from "./actions/index.js";
import resolveParent from "./resolveParent/index.js";
import { set } from "./actions/basic.js";

const writePath = (registry, path, value) => {
    // console.log("registry : ", registry);
    // console.log("path : ", path);

    const { parent, key } = resolveParent(registry, path);
    const localAction = path.action;

    console.log("parent : ", parent);
    console.log("key : ", key);
    console.log("value : ", value);
    console.log("localAction : ", localAction);

    const action = actions[localAction] || set;
    action(parent, key, value);
};

export default writePath;