import * as vscode from 'vscode';
import { ProgressLocation} from 'vscode';
import { TextDecoder, TextEncoder } from 'util';
import { json } from 'stream/consumers';
import { privateEncrypt } from 'crypto';
import * as fs from 'fs';
const { performance } = require('perf_hooks');

let randItem: vscode.StatusBarItem;
let defaultItem: vscode.StatusBarItem;
let likeItem: vscode.StatusBarItem;
let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
let likeTheme: string[] = [];
let gthemeName:string = '';


// async function fileExist(fileUri: vscode.Uri) {
// 	try {
// 		await vscode.workspace.fs.stat(fileUri);
// 		return true;
// 	} catch {
// 		return false;
// 	}	
// }

// async function readFile(fileUri: vscode.Uri) {
// 	let exist = await fileExist(fileUri);
// 	if (exist) {
// 		let buffer = await vscode.workspace.fs.readFile(fileUri);
// 		return new TextDecoder().decode(buffer);
// 	} 
// 	else {
// 		return "Coding events:";
// 	}
// }

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "themeRec" is now active!');

	const randCommand = 'themerec.randTheme';
	let disposable = vscode.commands.registerCommand(randCommand, () => {
		// vscode.window.showInformationMessage('Roll a dice?', 'Try', 'Pass').then(selection => {});
		
		// collect human response
		// no repeated appearance
		vscode.workspace.openTextDocument(jsonUri).then((document) => {
			let obj = JSON.parse(document.getText());
			const themeName = ['Abyss', 'Atom One Dark', 'Quiet Light', 'Horizon', 'Darcula', 
							'Solarized Dark', 'Default Dark+', 'Red', 'Tomorrow Night Blue',
							'Solarized Light', 'Default High Contrast', 'Kimbie Dark', 
							'Winter is Coming (Light)', 'Winter is Coming (Dark Blue)', 'Winter is Coming (Dark Black)',
						    'One Monokai', 'Palenight Theme', 'Palenight Theme', 'Panda Syntax", "Eva Dark', 
						    'Omni", "2077', 'JellyFish', 'Aura Dark', 'Aura Soft Dark', 'Tinacious Design', 
							'Blueberry dark theme', 'Iceberg', 'Cute', "merko's green theme", 
							'Luvia Theme', '1987', 'Sublime Material Theme - Dark', 'Nebula', 
							'Slack Theme Work Hard', 'Slack Theme Dark Mode', 'Slack Theme Aubergine Dark', 'Slack Theme Monument',
							'Gruvbox Dark Hard', 'Gruvbox Dark Soft', 'Gruvbox Dark Medium', 
							'Gruvbox Light Hard', 'Gruvbox Light Soft', 'Gruvbox Light Medium'];
			const random = Math.floor(Math.random() * themeName.length);
			gthemeName = themeName[random];
			obj["workbench.colorTheme"] = gthemeName;
			// console.log('rand: ' + obj["workbench.colorTheme"]);
			// obj["workbench.colorTheme"] = themeName[random];
			// vscode.window.showInformationMessage('Current theme is: ' + themeName[random]);
			
			var jsonContent = JSON.stringify(obj, null, 4);
			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
		});
		
	});
	context.subscriptions.push(disposable);
	// create status bar item, apply a random theme 
	randItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	randItem.command = randCommand;
	context.subscriptions.push(randItem);
	randItem.tooltip = 'Random Theme';
	// randItem.text = '$(jersey)';
	randItem.text = '$(refresh)';
	randItem.show();


	// change default dark theme
	const defaultCommand = 'themerec.defaultTheme';
	context.subscriptions.push(
		vscode.commands.registerCommand(defaultCommand, () => {
			vscode.window.showInformationMessage('Default theme is on!');
			vscode.workspace.openTextDocument(jsonUri).then((document) => {
				let obj = JSON.parse(document.getText());
				// const themeName = "Default Dark+";
				// const themeName = "Nebula";
				gthemeName = 'Nebula';
				obj["workbench.colorTheme"] = gthemeName;
				// console.log('default: ' + obj["workbench.colorTheme"]);
				// obj["workbench.colorTheme"] = themeName;
				
				var jsonContent = JSON.stringify(obj, null, 4);
				vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
			});
		})
	);
	// create status bar item, apply default theme
	defaultItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	defaultItem.command = defaultCommand;
	context.subscriptions.push(defaultItem);
	// defaultItem.tooltip = 'Use Default Dark+ Theme';
	defaultItem.tooltip = 'Use Nebula';
	defaultItem.text = '$(reply)';
	defaultItem.show();

	
	// save current theme to likeTheme
	const likeCommand = 'themerec.likeTheme';
	context.subscriptions.push(
		vscode.commands.registerCommand(likeCommand, () => {
			vscode.workspace.openTextDocument(jsonUri).then((document) => {
				let obj = JSON.parse(document.getText());
				obj["workbench.colorTheme"] = gthemeName;
				// console.log('like: ' + obj["workbench.colorTheme"]);

				let curTheme = gthemeName;
				console.log(curTheme);

				if (likeTheme.indexOf(curTheme) > -1) {
					// console.log("in");
					// console.log(likeTheme);
					vscode.window.showInformationMessage('Already liked ' + curTheme);
			    } else {
					// console.log("not in");
					likeTheme.push(curTheme);
					vscode.window.showInformationMessage('Like ' + curTheme);
					// console.log(likeTheme);
				}
				
				var jsonContent = JSON.stringify(obj, null, 4);
				vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));

			
			});
			
			
		
		})
	);
	// create status bar item, save current theme 
	likeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	likeItem.command = likeCommand;
	context.subscriptions.push(likeItem);
	likeItem.tooltip = 'Like this Theme';
	likeItem.text = '$(heart)';
	likeItem.show();


	// rand by click
	// if (vscode.workspace.workspaceFolders) {
	// 	vscode.window.showInformationMessage('Roll a dice?', 'Try', 'Pass').then(selection => {
	// 		console.log(selection);
	// 		let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
		
	// 		vscode.workspace.openTextDocument(jsonUri).then((document) => {
	// 			let text = document.getText();
	// 			let obj = JSON.parse(text);
	// 			const themeName = ["Abyss", "Quiet Light", "Horizon", "Darcula", 
	// 							"Solarized Dark", "Default Dark+", "Red", "Tomorrow Night Blue",
	// 							"Solarized Light", "Default High Contrast", "Kimbie Dark"];
	// 			const random = Math.floor(Math.random() * themeName.length);
	// 			obj["workbench.colorTheme"] = themeName[random];
	// 			// console.log("rand " + obj["workbench.colorTheme"]);
			
	// 			var jsonContent = JSON.stringify(obj, null, 4);
	// 			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
	// 		});
	// 	});

	// }



	// if (vscode.workspace.workspaceFolders) {
	// 	let logUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/theRec/testLog');
	// 	console.log('Store data in: ' + logUri);

	// 	readFile(logUri).then(
	// 		logData => {
	// 			// let lastActiveEditor: vscode.TextEditor | undefined = undefined;
	// 			vscode.window.onDidChangeActiveTextEditor(activeEditor => {
	// 				if (activeEditor) {
	// 					const document = activeEditor.document;

	// 					let curTime = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
	// 					let lineNum = document.lineCount;
						
	// 					// logData += '\n Open: ' + curTime.toString() + ', ' + document.fileName + ', ' + lineNum.toString() + ' lines of codes';
	// 					// console.log('Writing...');
	// 					vscode.workspace.fs.writeFile(vscode.Uri.file(logUri.path), new TextEncoder().encode(logData));
	// 				}
	// 			});

	// 			vscode.workspace.onDidSaveTextDocument(document => {
	// 				let curTime = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
	// 				let lineNum = document.lineCount;
	// 				let content = document.getText();
	// 				logData += '\n Save: ' + curTime + ', ' + document.fileName + ', ' + lineNum.toString() + ' lines of codes';
	// 				logData += '\n' + content;
	// 				// vscode.workspace.fs.writeFile(vscode.Uri.file(logUri.path), new TextEncoder().encode(logData));
					
	// 			    // console.log('onDidSaveTextEvent')	;			
	// 			});
			
	// 		}
	// 	); // readFile(logUri)
	// }

}

// function updateStatusBarItem():void {
// 	myStatusBarItem.text = 'xxx';
// 	myStatusBarItem.show();
// }

export function deactivate() {}


