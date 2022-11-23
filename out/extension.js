"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
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
        // vscode.window.showInformationMessage('Roll a dice?', 'Try', 'Pass').then(selection => {});
        // default button
        // status bar trigger
        // collect human response
        // show theme name
        // no repeated appearance
        // like array
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
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.commands.registerCommand('themerec.welcome', () => {
        vscode.window.showInformationMessage('Wwwww');
    }));
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map