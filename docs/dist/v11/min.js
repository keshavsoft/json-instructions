//#region node_modules/json-transformer-funcs-primitive/src/v9/forAttributes/index.js
var e = (e) => typeof e == "object" && !!e && !Array.isArray(e), t = (t, n) => {
	if (!e(t)) return;
	let r = {};
	for (let [e, i] of Object.entries(t)) r[e] = c(n, i);
	return r;
}, n = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => c(t, e));
}, r = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, i = (e, t) => r(e, t), a = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, o = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.0"
}, s = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: o,
		applyTemplate: e
	});
}, c = (e, o, s) => {
	let c = e, l = o;
	a(c, l, s);
	let u = structuredClone(l);
	return typeof u == "string" ? r(u, c) : (typeof u != "object" || !u || ("textContent" in u && (u.textContent = i(u?.textContent, c)), "attributes" in u && (u.attributes = t(u?.attributes, c)), "children" in u && (u.children = n(u?.children, c))), u);
};
s(c);
//#endregion
//#region node_modules/json-transformer-funcs-one-dimension/src/v6/guard/index.js
var l = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, u = (e, t) => {
	let n = e, r = t;
	return l(n, r), n.map((e) => c(e, r));
}, d = (e) => Array.isArray(e) ? e : [e], f = (e, t, n) => {
	e[t] = n;
}, p = {
	set: f,
	push: (e, t, n) => {
		e[t].push(...d(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...d(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(d(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(d(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, m = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), h = (e, t, n) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	if (!n || typeof n != "object" || Array.isArray(n)) throw TypeError("inSpec must be an object");
	let r = e[0]?.template?.body?.tr || "buildBodyTr";
	if (!(r in n)) throw Error(`Row template "${r}" not found in inSpec`);
	for (let t = 0; t < e.length; t++) {
		let r = e[t], i = r.template?.body?.cell || r.template?.bodyCell || "buildBodyCell";
		if (!(i in n)) throw Error(`Cell template "${i}" for column "${r.columnName}" not found in inSpec`);
	}
	return !0;
}, g = (e, t) => e.map((e) => {
	let n = t[e.template?.body?.cell || e.template?.bodyCell || "buildBodyCell"];
	return c(e, n);
}), _ = (e, t, n) => {
	h(e, t, n);
	let r = e, i = t, a = n, o = a[r[0]?.template?.body?.tr || "buildBodyTr"];
	return i.map((e) => {
		let t = c(e, o);
		return t.children = g(m(r, e), a), t;
	});
}, v = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = v(n, t);
		if (e) return e;
	}
	return null;
}, y = (e, t) => {
	let n = t.dataRole ? v(e[t.fileName], t.dataRole) : e[t.fileName], r = [...t.filePath ?? []], i = r.pop();
	return {
		parent: r.reduce((e, t) => e[t], n),
		key: i
	};
}, b = (e, t, n) => {
	let { parent: r, key: i } = y(e, t);
	(p[t.action] || f)(r, i, n);
}, x = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = x(n, t);
		if (e) return e;
	}
	return null;
}, S = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? x(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, C = (e, t, n) => {
	let r = !!(e.sourcePath?.fileName && Array.isArray(e.sourcePath?.filePath)), i = `structure/sourcePath: ${r ? "passed" : "failed"}`;
	return n.push(i), t && console.log(i), r;
}, w = (e, t, n) => {
	let r = !!(e.destinationPath?.fileName && Array.isArray(e.destinationPath?.filePath)), i = `structure/destinationPath: ${r ? "passed" : "failed"}`;
	return n.push(i), t && console.log(i), r;
}, T = (e, t, n) => {
	let r = e.templateKey === void 0 || typeof e.templateKey == "string" && e.templateKey.length > 0, i = `structure/templateKey: ${r ? "passed" : "failed"}`;
	return n.push(i), t && console.log(i), r;
}, E = (e, t, n) => {
	let r = typeof e.func == "string" && e.func.length > 0, i = `structure/func: ${r ? "passed" : "failed"}`;
	return n.push(i), t && console.log(i), r;
}, D = (e, t, n) => [
	C(e, t, n),
	w(e, t, n),
	T(e, t, n),
	E(e, t, n)
].every(Boolean), O = (e, t, n, r) => {
	let i = typeof t[e.func] == "function", a = `references/func (${e.func}): ${i ? "passed" : "failed"}`;
	return r.push(a), n && console.log(a), i;
}, k = (e, t, n, r) => {
	let i = e.templateKey === void 0 || Object.hasOwn(t, e.templateKey), a = `references/templateKey${e.templateKey === void 0 ? " (not used)" : ` (${e.templateKey})`}: ${i ? "passed" : "failed"}`;
	return r.push(a), n && console.log(a), i;
}, A = (e, t, n, r, i) => {
	let a = O(e, t, r, i), o = k(e, n, r, i);
	return a && o;
}, j = (e, t, n, r, i) => D(e, r, i) ? A(e, t, n, r, i) : !1, M = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: { id: "LedgerName" },
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: { "data-name": "${columnName}" },
		children: []
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	}
}, N = {
	applyTemplate: c,
	fromCollection: u
}, P = (e, t) => e?.sourcePath === null ? null : S(t, e.sourcePath), F = (e, t, n, r) => {
	let i = M[e.templateKey], a = P(e, t), o = N[e.func](a, i);
	a === null && (o = i), b(t, e.destinationPath, o);
}, I = (e, t, n, r) => {
	e.forEach((e) => {
		F(e, t, n, r);
	});
}, L = {
	applyTemplate: c,
	fromCollection: u,
	twoDimensional: _
}, R = (e, t, n, r) => {
	if (!j(e, L, M, n, r)) return;
	let i = L[e.func](t.data.columns, t.data.data, M);
	b(t, e.destinationPath, i);
}, z = (e, t, n, r) => {
	e.forEach((e) => {
		R(e, t, n, r);
	});
};
//#endregion
export { z as runDoubleInstructions, I as runSingleInstructions };
