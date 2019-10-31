// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const { jsonToSchema } = require('@walmartlabs/json-to-simple-graphql-schema/lib');
const ncp = require('copy-paste');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "json-to-gql" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('extension.jsonToGraphql', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return; // No open text editor
		}

		var selection = editor.selection;
		var jsonInput = editor.document.getText(selection);
		var schema = jsonToSchema({ jsonInput });
		// The code you place here will be executed every time your command is executed

		if (!schema.value) {
			console.log(JSON.stringify(schema))
			return vscode.window.showErrorMessage(schema.error ? schema.error.message : 'Unknown error')
		}

		ncp.copy(schema.value, () => {
			vscode.window.showInformationMessage('Added type to clipboard');
		})
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
