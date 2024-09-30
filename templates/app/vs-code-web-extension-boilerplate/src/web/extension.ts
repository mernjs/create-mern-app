// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';
import * as path from 'path';

if (module.hot) {
    module.hot.accept();
}


self.onmessage = (event) => {
    // Handle messages from the main thread
    console.log('Message received from main thread:', event.data);
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// @ts-ignore
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-code-web-extension" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vs-code-web-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Opening login panel!');
		const panel = vscode.window.createWebviewPanel(
			'reactWebview', // Identifies the type of the webview
			'Hello World', // Title of the panel
			vscode.ViewColumn.One, // Editor column
			{
				enableScripts: true, // Enable JavaScript in the WebView
			}
		);

		const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'web', 'bundle.js'));
		const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

		const cssPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'dist', 'web', 'bundle.css'));
		const cssUri = panel.webview.asWebviewUri(cssPathOnDisk);

		panel.webview.html = getWebviewContent(scriptUri, cssUri);

	});

	context.subscriptions.push(disposable);
	
}

// @ts-ignore
function getWebviewContent(scriptUri: vscode.Uri, cssUri: vscode.Uri) { // Explicitly type 'scriptUri' as vscode.Uri
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>React App</title>
			<link rel="stylesheet" type="text/css" href="${cssUri}">
		</head>
		<body>
			<div id="root"></div>
			<script src="${scriptUri}"></script>
		</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() { }
