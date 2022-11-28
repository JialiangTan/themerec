"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const util_1 = require("util");
const { performance } = require('perf_hooks');
let randItem;
let defaultItem;
let likeItem;
let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
let likeTheme = [];
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
function activate(context) {
    console.log('Congratulations, your extension "themeRec" is now active!');
    const randCommand = 'themerec.randTheme';
    let disposable = vscode.commands.registerCommand(randCommand, () => {
        // vscode.window.showInformationMessage('Roll a dice?', 'Try', 'Pass').then(selection => {});
        // collect human response
        // no repeated appearance
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            const themeName = ['Abyss', 'Atom One Dark', 'Quiet Light', 'Horizon", "Darcula',
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
            obj["workbench.colorTheme"] = themeName[random];
            // vscode.window.showInformationMessage('Current theme is: ' + themeName[random]);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
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
    context.subscriptions.push(vscode.commands.registerCommand(defaultCommand, () => {
        vscode.window.showInformationMessage('Default theme is on!');
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            // const themeName = "Default Dark+";
            const themeName = "Nebula";
            obj["workbench.colorTheme"] = themeName;
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
        });
    }));
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
    context.subscriptions.push(vscode.commands.registerCommand(likeCommand, () => {
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            const curTheme = obj["workbench.colorTheme"];
            // vscode.window.showInformationMessage('Like theme: ' + themeName);
            if (likeTheme.indexOf(curTheme) > -1) {
                console.log("in");
                console.log(likeTheme);
                vscode.window.showInformationMessage('Already liked ' + curTheme);
            }
            else {
                console.log("not in");
                likeTheme.push(curTheme);
                vscode.window.showInformationMessage('Like ' + curTheme);
                console.log(likeTheme);
            }
        });
    }));
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
exports.activate = activate;
// function updateStatusBarItem():void {
// 	myStatusBarItem.text = 'xxx';
// 	myStatusBarItem.show();
// }
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map