
import * as vscode from 'vscode';
import * as fs from 'fs';
import { compress } from './compressor';

export function activate(context: vscode.ExtensionContext) {

	let optimizeMenu = vscode.commands.registerCommand('image-optimizer.optimize', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Operation in progress');
		await compress(resource.fsPath)

		vscode.window.showInformationMessage('File optimized successfully');

	});

	context.subscriptions.push(optimizeMenu);
}

export function deactivate() { }
