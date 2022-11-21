"use strict";
// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
// import { TextDecoder, TextEncoder } from 'util';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
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
// 	} else {
// 		return "Coding events:";
// 	}
// }
// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "themerec" is now active!');
// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// let disposable = vscode.commands.registerCommand('themerec.helloWorld', () => {
// 	// The code you place here will be executed every time your command is executed
// 	// Display a message box to the user
// 	vscode.window.showInformationMessage('Do you like the current theme?');
// 	console.log('Printing anything?');
// 	// let logUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/test/settings.json'); 
// 	// let logUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/test.json'); 
// 	// console.log('Store data in: ' + logUri);
// });
// context.subscriptions.push(disposable);
// 	if (vscode.workspace.workspaceFolders) {
// 		let wf = vscode.workspace.workspaceFolders[0].uri.path;
// 		let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
// 		// let path = '${wf} - ${f}';
// 		console.log(wf);
// 		// console.log(f);
// 		// console.log(path);
// 		let logUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/test.json'); 
// 		console.log('Store data in: ' + logUri);
// 		readFile(logUri).then(
// 			logData => {
// 				vscode.window.onDidChangeActiveTextEditor(activeEditor => {
// 					if(activeEditor) {
// 						const document = activeEditor.document;
// 						let lineNumber = document.lineCount;
// 						logData += lineNumber;
// 						console.log('Writing...');
// 						vscode.workspace.fs.writeFile(vscode.Uri.file(logUri.path), new TextEncoder().encode(logData));
// 					}
// 				});
// 			}
// 		);
// 	}
// }
// // This method is called when your extension is deactivated
// export function deactivate() {}
/// new
const vscode = require("vscode");
const util_1 = require("util");
const { performance } = require('perf_hooks');
async function fileExist(fileUri) {
    try {
        await vscode.workspace.fs.stat(fileUri);
        return true;
    }
    catch {
        return false;
    }
}
async function readFile(fileUri) {
    let exist = await fileExist(fileUri);
    if (exist) {
        let buffer = await vscode.workspace.fs.readFile(fileUri);
        return new util_1.TextDecoder().decode(buffer);
    }
    else {
        return "Coding events:";
    }
}
function activate(context) {
    console.log('Congratulations, your extension "themeRec" is now active!');
    let disposable = vscode.commands.registerCommand('themerec.helloWorld', () => {
        // vscode.window.showInformationMessage('Roll a dice?', 'Try', 'Pass')
        // 			 .then(selection => {
        // 				console.log(selection);
        // // 				// let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
        // // 				// vscode.workspace.openTextDocument(jsonUri).then((document) => {
        // // 				// 	let text = document.getText();
        // // 				// 	let obj = JSON.parse(text);
        // // 				// 	const themeName = ["Abyss", "Quiet Light", "Horizon", "Darcula", 
        // // 				// 					"Solarized Dark", "Default Dark+", "Red", "Tomorrow Night Blue",
        // // 				// 					"Solarized Light", "Default High Contrast", "Kimbie Dark"];
        // // 				// 	const random = Math.floor(Math.random() * themeName.length);
        // // 				// 	obj["workbench.colorTheme"] = themeName[random];
        // // 				// 	// console.log("rand " + obj["workbench.colorTheme"]);
        // // 				// 	var jsonContent = JSON.stringify(obj, null, 4);
        // // 				// 	vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
        // // 				// });
        // 			});
        // default button
        // status bar trigger
        // collect human response
        // show theme name
        vscode.window.showInformationMessage('Roll a dice?');
        let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let text = document.getText();
            let obj = JSON.parse(text);
            const themeName = ["Abyss", "Quiet Light", "Horizon", "Darcula",
                "Solarized Dark", "Default Dark+", "Red", "Tomorrow Night Blue",
                "Solarized Light", "Default High Contrast", "Kimbie Dark"];
            const random = Math.floor(Math.random() * themeName.length);
            obj["workbench.colorTheme"] = themeName[random];
            // console.log("rand " + obj["workbench.colorTheme"]);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
        });
        // readFile(jsonUri).then(
        // 	extraLine => {
        // 		// extraLine += '\n    // "workbench.colorTheme": "Abyss"';
        // 		// vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(extraLine));
        // 	}
        // );
        // const editor = vscode.window.activeTextEditor;	
    });
    context.subscriptions.push(disposable);
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
    if (vscode.workspace.workspaceFolders) {
        let logUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/theRec/testLog');
        console.log('Store data in: ' + logUri);
        readFile(logUri).then(logData => {
            // let lastActiveEditor: vscode.TextEditor | undefined = undefined;
            vscode.window.onDidChangeActiveTextEditor(activeEditor => {
                if (activeEditor) {
                    const document = activeEditor.document;
                    let curTime = new Date().toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    let lineNum = document.lineCount;
                    // logData += '\n Open: ' + curTime.toString() + ', ' + document.fileName + ', ' + lineNum.toString() + ' lines of codes';
                    // console.log('Writing...');
                    vscode.workspace.fs.writeFile(vscode.Uri.file(logUri.path), new util_1.TextEncoder().encode(logData));
                }
            });
            vscode.workspace.onDidSaveTextDocument(document => {
                let curTime = new Date().toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                let lineNum = document.lineCount;
                let content = document.getText();
                logData += '\n Save: ' + curTime + ', ' + document.fileName + ', ' + lineNum.toString() + ' lines of codes';
                logData += '\n' + content;
                // vscode.workspace.fs.writeFile(vscode.Uri.file(logUri.path), new TextEncoder().encode(logData));
                // console.log('onDidSaveTextEvent')	;			
            });
        }); // readFile(logUri)
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map