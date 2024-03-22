
import * as vscode from 'vscode';
import * as fs from 'fs';
import { compress } from './compressor';

export function activate(context: vscode.ExtensionContext) {

	let optimizeMenu = vscode.commands.registerCommand('image-optimizer.optimize', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Operation in progress');
		const config = vscode.workspace.getConfiguration('image-optimizer');
		const quality = config.get('quality') as number
		const scale = config.get('scale') as number
		await compress(resource.fsPath, { quality, scale })

		vscode.window.showInformationMessage('File optimized successfully');

	});

	context.subscriptions.push(optimizeMenu);
}

export function deactivate() { }
