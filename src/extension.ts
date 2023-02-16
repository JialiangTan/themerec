import * as vscode from 'vscode';
// import { ProgressLocation} from 'vscode';
import { TextDecoder, TextEncoder } from 'util';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { AsyncLocalStorage } from 'async_hooks';
import path = require('path');
import { consumers } from 'stream';
// import { json } from 'stream/consumers';
// import { privateEncrypt } from 'crypto';
// import * as fs from 'fs';
const { performance } = require('perf_hooks');
const os = require('os');
// macOS
// let jsonUri = vscode.Uri.file(os.homedir() + '/Library/Application\ Support/Code/User/settings.json');

let jsonUri: vscode.Uri;

if (window.navigator.userAgent.indexOf("Mac")!== -1){
	jsonUri = vscode.Uri.file(os.homedir() + '/Library/Application\ Support/Code/User/settings.json');
}
else{
	jsonUri = vscode.Uri.file(os.homedir() + '/Application\ Data/Code/User/settings.json');
}

let randItem: vscode.StatusBarItem;
let defaultItem: vscode.StatusBarItem;
let likeItem: vscode.StatusBarItem;
let randLikeItem: vscode.StatusBarItem;
// let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
let likeTheme: string[] = [];
// let arrayHome = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/themerec/liked.txt');
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


function syncWriteFile (fileName:string, data:any) {
	writeFileSync(join(__dirname, fileName), data, {
		flag: 'w',
	});
	const content = readFileSync(join(__dirname, fileName), 'utf-8');
	console.log(content);
	// console.log(__dirname);
	return content;
}


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "themeRec" is now active!');
	
	const randCommand = 'themerec.randTheme';
	
	let disposable = vscode.commands.registerCommand(randCommand, () => {
		// TODO:
		// collect human response
		// no repeated appearance
		// read likeTheme when activate, should not be emitted
		vscode.workspace.openTextDocument(jsonUri).then((document) => {
			let obj = JSON.parse(document.getText());
			// const themeName = ['1987', '2077', 'Iceberg', 'Visual Studio Dark'];
			const themeName = ['Atom One Dark', 'Horizon', '1987', 'One Monokai', 'Nebula',
							   'Iceberg', 'Aura Dark', 'Aura Soft Dark', '2077',
							   'Slack Theme Work Hard', 'Slack Theme Dark Mode', 'Slack Theme Aubergine Dark', 'Slack Theme Monument',
							   'Eva Dark', 'Abyss',
							   'Gruvbox Dark Hard', 'Gruvbox Dark Soft', 'Gruvbox Dark Medium', 
							   'Gruvbox Light Hard', 'Gruvbox Light Soft', 'Gruvbox Light Medium',
							   'Winter is Coming (Light)', 'Winter is Coming (Dark Blue)', 'Winter is Coming (Dark Black)',
							   'Luvia Theme', "merko's green theme", 'JellyFish', 'Blueberry dark theme',
							   'Omni', 'Darcula', 'Panda Syntax', 'Cute', 'Cobalt2', 
							   'Palenight Theme', 'Palenight Theme', 'Red', 'Kimbie Dark', 'Tomorrow Night Blue',
							   'Solarized Dark',  'Solarized Light', 'Default High Contrast', 'Quieter Dark', 
							   'quietLight-plus-theme', 'Sublime Material Theme - Dark', 'Sublime Material Theme - Light'];
			const random = Math.floor(Math.random() * themeName.length);
			gthemeName = themeName[random];
			obj["workbench.colorTheme"] = gthemeName;
			// console.log('rand: ' + obj["workbench.colorTheme"]);
			// obj["workbench.colorTheme"] = themeName[random];
			// vscode.window.showInformationMessage('Current theme is: ' + themeName[random]);
			vscode.window.setStatusBarMessage(gthemeName, 10000);

			var jsonContent = JSON.stringify(obj, null, 4);
			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
		});
	});
	context.subscriptions.push(disposable);
	// create a status bar click event
	randItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	randItem.command = randCommand;
	context.subscriptions.push(randItem);
	randItem.tooltip = 'Random Theme';
	randItem.text = '$(refresh)';
	randItem.show();

	// change default dark theme
	const defaultCommand = 'themerec.defaultTheme';
	context.subscriptions.push(
		vscode.commands.registerCommand(defaultCommand, () => {
			vscode.workspace.openTextDocument(jsonUri).then((document) => {
				let obj = JSON.parse(document.getText());
				gthemeName = 'Visual Studio Dark';
				obj["workbench.colorTheme"] = gthemeName;
				// console.log('default: ' + obj["workbench.colorTheme"]);
				vscode.window.setStatusBarMessage('Visual Studio Dark', 10000);
				
				var jsonContent = JSON.stringify(obj, null, 4);
				vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
			});
		})
	);
	// create a status bar click event
	defaultItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	defaultItem.command = defaultCommand;
	context.subscriptions.push(defaultItem);
	defaultItem.tooltip = 'Default Theme';
	defaultItem.text = '$(reply)';
	defaultItem.show();

	
	// save current theme to likeTheme
	// const likeCommand = 'themerec.likeTheme';
	// context.subscriptions.push(
	// 	vscode.commands.registerCommand(likeCommand, () => {
	// 		vscode.workspace.openTextDocument(jsonUri).then((document) => {
	// 			let obj = JSON.parse(document.getText());
	// 			obj["workbench.colorTheme"] = gthemeName;
	// 			// console.log('like: ' + obj["workbench.colorTheme"]);
	// 			let curTheme = gthemeName;
	// 			// console.log(curTheme);
	// 			if (likeTheme.indexOf(curTheme) > -1) {
	// 				vscode.window.showInformationMessage('Already liked "' + curTheme + '"');
	// 		    } else {
	// 				likeTheme.push(curTheme);
	// 				vscode.window.showInformationMessage('Like "' + curTheme + '"');
	// 			}
	// 			// console.log(likeTheme);

	// 			var jsonContent = JSON.stringify(obj, null, 4);
	// 			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
				
	// 			syncWriteFile('./liked.txt', likeTheme.toString());

	// 		});
	// 	})
		
	// );
	
	// create a status bar click event
	// likeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	// likeItem.command = likeCommand;
	// context.subscriptions.push(likeItem);
	// likeItem.tooltip = 'Like this Theme';
	// likeItem.text = '$(pass)';
	// likeItem.show();


	// random theme in likeTheme
	// const randlikeCommand = 'themerec.randLike';
	// context.subscriptions.push(
	// 	vscode.commands.registerCommand(randlikeCommand, () => {
	// 		vscode.workspace.openTextDocument(jsonUri).then( (document) => {
	// 			let obj = JSON.parse(document.getText());
	// 			const random = Math.floor(Math.random() * likeTheme.length);
	// 			gthemeName = likeTheme[random];
	// 			obj["workbench.colorTheme"] = gthemeName;
	// 			// console.log('randlike: print likeTheme = ');
	// 			// console.log(likeTheme);

	// 			var jsonContent = JSON.stringify(obj, null, 4);
	// 			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
	// 		});
	// 	})
	// );
	// create a status bar click event
	// randLikeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	// randLikeItem.command = randlikeCommand;
	// context.subscriptions.push(randLikeItem);
	// randLikeItem.tooltip = 'Random in Liked Themes';
	// randLikeItem.text = '$(pass-filled)';
	// randLikeItem.show();


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




export function deactivate() {
	// let arrPath = vscode.Uri.file(os.homedir() + '/Library/ApplicationSupport/Code/User/therec/arr');
	
}

