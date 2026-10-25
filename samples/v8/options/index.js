import { runSingleInstructions } from "../../src/index.js";

import base from "./base.json" with { type: "json" };
import singleInstructions from "./instruction.json" with { type: "json" };

runSingleInstructions(singleInstructions, { base }, false, []);

console.log("colGroup : ", base.children[0].children);
console.log("header : ", base.children[1].children[0].children);
console.log("body 1 : ", base.children[2].children[0]);
console.log("body 2 : ", base.children[2].children[1]);