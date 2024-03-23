
import * as vscode from 'vscode';
import * as fs from 'fs';
import { compress } from './optimizer';

export function activate(context: vscode.ExtensionContext) {

	let compressMenu = vscode.commands.registerCommand('image-optimizer.compress', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Operation in progress');
		const config = vscode.workspace.getConfiguration('image-optimizer');
		const quality = config.get('quality') as number
		const scale = config.get('scale') as number
		await compress(resource.fsPath, { quality, scale })

		vscode.window.showInformationMessage('File optimized successfully');

	});

	let convertToPNG = vscode.commands.registerCommand('image-optimizer.convert-to-png', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Converting to PNG');
		await compress(resource.fsPath, {}, "png")
		vscode.window.showInformationMessage('File Converted successful');
	});
	let convertToJPG = vscode.commands.registerCommand('image-optimizer.convert-to-jpg', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Converting to JPG');
		await compress(resource.fsPath, {}, "jpg")
		vscode.window.showInformationMessage('File Converted successful');
	});
	let convertToWEBP = vscode.commands.registerCommand('image-optimizer.convert-to-webp', async (resource: vscode.Uri) => {
		vscode.window.showInformationMessage('Converting to WEBP');
		await compress(resource.fsPath, {}, "webp")
		vscode.window.showInformationMessage('File Converted successful');
	});
	context.subscriptions.push(compressMenu, convertToPNG, convertToJPG, convertToWEBP);
}

export function deactivate() { }
