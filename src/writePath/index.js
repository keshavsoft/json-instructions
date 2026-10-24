import { findByRole } from "json-transformer-funcs";

const toArray = value => Array.isArray(value) ? value : [value];

const set = (parent, key, value) => {
    parent[key] = value;
};

const push = (parent, key, value) => {
    parent[key].push(...toArray(value));
};

const unshift = (parent, key, value) => {
    parent[key].unshift(...toArray(value));
};

const pushToRows = (parent, key, value) => {
    parent[key].forEach(row => {
        row.children.push(...structuredClone(toArray(value)));
    });
};

const unshiftToRows = (parent, key, value) => {
    parent[key].forEach(row => {
        row.children.unshift(...structuredClone(toArray(value)));
    });
};

const unshiftSerialToRows = (parent, key, value) => {
    parent[key].forEach((row, rowIndex) => {
        const item = structuredClone(value);
        item.textContent = rowIndex + 1;
        row.children.unshift(item);
    });
};

const actions = {
    set,
    push,
    unshift,
    pushToRows,
    unshiftToRows,
    unshiftSerialToRows
};

const resolveParent = (registry, path) => {
    const root = path.dataRole
        ? findByRole(registry[path.fileName], path.dataRole)
        : registry[path.fileName];
    const keys = [...(path.filePath ?? [])];
    const key = keys.pop();
    const parent = keys.reduce((current, nextKey) => current[nextKey], root);
    return { parent, key };
};

const writePath = (registry, path, value) => {
    const { parent, key } = resolveParent(registry, path);
    const action = actions[path.action] || set;
    action(parent, key, value);
};

export default writePath;
