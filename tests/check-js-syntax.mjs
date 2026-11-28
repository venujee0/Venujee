import fs from "node:fs";
import { spawnSync } from "node:child_process";

const loaderPath = "src/classes/class-11/content-loader.js";
const loader = fs.readFileSync(loaderPath, "utf8");
const match = loader.match(/var files=(\[[\s\S]*?\]);/);
if (!match) throw new Error("Could not find sequential loader manifest.");
const files = JSON.parse(match[1]);
const missing = files.filter((path) => !fs.existsSync(path));
if (missing.length) throw new Error("Missing loader files:\n" + missing.join("\n"));

let failed = 0;
for (const path of files) {
  const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
  if (result.status !== 0) {
    failed += 1;
    process.stderr.write("\nSyntax error in " + path + "\n");
    process.stderr.write(result.stderr || result.stdout || "node --check failed\n");
  }
}
if (failed) process.exit(1);
console.log("Syntax check passed for " + files.length + " active loader modules.");
