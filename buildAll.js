import fs from "fs";
import zipdir from "zip-dir"
import { rimraf, rimrafSync } from "rimraf"
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

import manifest from "./manifests/chrome.manifest.json" with { type:"json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let platforms = ["chrome", "firefox", "edge"];
let outputDir = path.join(__dirname, "builds");

// Create builds folder or empty the existing builds
if (fs.existsSync(outputDir)) {
  try {
    rimrafSync(outputDir);
    console.log("Removed existing output directory sucessfully");
  } catch (error) {
    console.error("Error removing existing output directory: ${error}")
  }
}

fs.mkdirSync(outputDir);
console.log("Created output dir");

// Build all platforms
for (let platform of platforms) {

  console.log(`Building for ${platform.toUpperCase()}...`);

  try {
    await execSync(`cross-env TARGET=${platform} OUTPUT=${outputDir} vite build`);
    console.log(`Built for ${platform.toUpperCase()} sucessfully!`)
  } catch (error) {
    console.error(`Error building for ${platform.toUpperCase()}: ${error}`)
  }

}

// Zip
for (let platform of platforms) {

  console.log(`Attempting to zip: ${platform.toUpperCase()}...`);

  let inPath = path.join(__dirname, `/builds/${platform}_dist`);
  let outPath = path.join(__dirname, `/builds/rao_${platform}_dist_v${manifest.version}.zip`);

  await zipdir(inPath,
    { each: path => console.log(path.replace(/^.*[\\/]/, ''), `added to ${platform.toUpperCase()} zip`), saveTo: outPath },
    (err, buffer) => {
      if (err) {
        console.warn("An error occurred while zipping: " + err);
      } else {
        console.log(`Zipped: ${platform.toUpperCase()}`);
      }
  })

  // Remove unzipped builds
  rimraf(inPath);

}


console.log("Building complete");
