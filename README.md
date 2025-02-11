# html2json

`html2json` is a command-line tool that converts HTML business information into JSON format.

## Installation

To install the dependencies, run:

```bash
bun install
```

## Usage

To use the tool, run the following command:

```bash
bun run index.ts --html <path_to_html_file>
```

### Options

- `--html <path>`: (Required) The path to the input HTML file.
- `--output <path>`: (Optional) The path to the output JSON file. If not provided, the output will be saved in the `output` directory with a timestamped filename.

### Example

```bash
bun run index.ts --html ./data/business.html [--output ./data/business.json (optional)]
```

This command will read the HTML file at `./data/business.html`, extract the business information, and save it to `./data/business.json`.

## Functions

### `extractBusinessInfo(html: string): BusinessInfo`

Extracts business information from the provided HTML string.

### `saveJsonToFile(json: BusinessInfo, filePath: string): void`

Saves the JSON object to the specified file path.

### `generateDefaultOutputPath(inputPath: string): string`

Generates a default output path based on the input file path and the current timestamp.

## Error Handling

If an error occurs during the execution, an error message will be printed to the console, and the process will exit with a non-zero status code.
