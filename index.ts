import * as fs from "fs";
import { program } from "commander";
import { extractBusinessInfo, generateDefaultOutputPath, saveJsonToFile } from "./utils";

program
    .name("html2json")
    .description("Convert HTML business info to JSON format")
    .requiredOption("--html <path>", "Input HTML file path")
    .option("--output <path>", "Output JSON file path");

program.parse();

const options = program.opts();

try {
    const htmlContent = fs.readFileSync(options.html, "utf-8");
    const businessInfo = extractBusinessInfo(htmlContent);
    const outputPath =
        options.output || generateDefaultOutputPath(options.html);
    const outputPathDefault = generateDefaultOutputPath(options.html, true);
    saveJsonToFile(businessInfo.businessData, outputPath);
    saveJsonToFile(businessInfo.default, outputPathDefault);

    console.log(
        `Business information extracted and saved to: ${outputPath}, ${outputPathDefault}`
    );
} catch (error: any) {
    console.error("Error:", error);
    process.exit(1);
}
