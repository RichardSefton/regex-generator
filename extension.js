// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand("regex-generator.open", () => {
			const panel = vscode.window.createWebviewPanel(
				"regex-generator",
				"Regex Generator",
				vscode.ViewColumn.One,
				{
					// localResourceRoots: [
					// 	vscode.Uri.file(path.join(context.extensionPath, 'webview', 'style'))
					// ],
					enableScripts: true
				}
			);
			
			const htmlContent =  fs.readFileSync(path.join(__dirname, "webview", "index.html"), "utf-8");
			const cssPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, "webview", "styles", "style.css"));
			const cssSrc = panel.webview.asWebviewUri(cssPathOnDisk);
			
			//scripts
			const groupCreatorDisk = vscode.Uri.file(path.join(context.extensionPath, "webview", "scripts", "groupCreator.js"));
			const groupCreatorSrc = panel.webview.asWebviewUri(groupCreatorDisk);
			const regexModifiersDisk = vscode.Uri.file(path.join(context.extensionPath, "webview", "scripts", "regexModifiers.js"));
			const regexModifiersSrc = panel.webview.asWebviewUri(regexModifiersDisk);
			const selectionsDisk = vscode.Uri.file(path.join(context.extensionPath, "webview", "scripts", "selections.js"));
			const selectionsSrc = panel.webview.asWebviewUri(selectionsDisk);
			const selectionTypeDisk = vscode.Uri.file(path.join(context.extensionPath, "webview", "scripts", "SelectionType.js"));
			const selectionTypeSrc = panel.webview.asWebviewUri(selectionTypeDisk);
			const scripts = [
				groupCreatorSrc,
				regexModifiersSrc,
				selectionsSrc,
				selectionTypeSrc
			]
			panel.webview.html = getWebviewContent(cssSrc, scripts, htmlContent);
		})
	)
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function getWebviewContent(cssSrc, scripts, htmlContent) {
	return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">

					<title>Regex Generator</title>

					<!-- jquery -->
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
					<!-- bootstrap -->
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
					<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
					<!-- own style -->
					<link rel="stylesheet" href="${cssSrc}">

					<script src="${scripts[0]}"></script>
					<script src="${scripts[1]}"></script>
					<script src="${scripts[2]}"></script>
					<script src="${scripts[3]}"></script>
				</head>
				<body>
					${htmlContent}
				</body>
			</html>`


}