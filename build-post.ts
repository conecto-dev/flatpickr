import * as fs from "fs";
import * as path from "path";

function logErr(e: Error | string) {
  console.error(e);
}

async function postBuild() {
  try {
    // ensure dist directory exists
    const distDir = path.join(__dirname, "dist");
    if (!fs.existsSync(distDir)) {
      throw new Error("[build:post] dist directory does not exist.");
    }

    // copy typings.d.ts from src to dist
    const srcTypings = path.join(__dirname, "src", "typings.d.ts");
    const distTypings = path.join(__dirname, "dist", "typings.d.ts");
    if (fs.existsSync(srcTypings)) {
      fs.copyFileSync(srcTypings, distTypings);
    } else {
      throw new Error(
        "[build:post] typings.d.ts does not exist in src directory."
      );
    }
  } catch (e) {
    logErr(e);
    process.exit(1);
  }
}

// Run the post-build script
postBuild();
