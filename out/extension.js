"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const util_1 = require("util");
const { performance } = require('perf_hooks');
let randItem;
let defaultItem;
let likeItem;
let randLikeItem;
let jsonUri = vscode.Uri.file('/Users/jialiangtan/Library/ApplicationSupport/Code/User/settings.json');
let likeTheme = [];
let gthemeName = '';
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
        // TODO:
        // collect human response
        // no repeated appearance
        // read likeTheme when activate, should not be emitted
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            const themeName = ['Abyss', 'Atom One Dark', 'Quiet Light', 'Horizon', 'Darcula',
                'Solarized Dark', 'Default Dark+', 'Red', 'Tomorrow Night Blue',
                'Solarized Light', 'Default High Contrast', 'Kimbie Dark',
                'Winter is Coming (Light)', 'Winter is Coming (Dark Blue)', 'Winter is Coming (Dark Black)',
                'One Monokai', 'Palenight Theme', 'Palenight Theme', 'Panda Syntax", "Eva Dark',
                'Omni', '2077', 'JellyFish', 'Aura Dark', 'Aura Soft Dark', 'Tinacious Design',
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
            vscode.window.setStatusBarMessage(gthemeName, 10000);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
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
    context.subscriptions.push(vscode.commands.registerCommand(defaultCommand, () => {
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            gthemeName = 'Default Dark+';
            obj["workbench.colorTheme"] = gthemeName;
            // console.log('default: ' + obj["workbench.colorTheme"]);
            vscode.window.setStatusBarMessage('Default Dark+', 10000);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
        });
    }));
    // create a status bar click event
    defaultItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    defaultItem.command = defaultCommand;
    context.subscriptions.push(defaultItem);
    defaultItem.tooltip = 'Default Theme';
    defaultItem.text = '$(reply)';
    defaultItem.show();
    // save current theme to likeTheme
    const likeCommand = 'themerec.likeTheme';
    context.subscriptions.push(vscode.commands.registerCommand(likeCommand, () => {
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            obj["workbench.colorTheme"] = gthemeName;
            // console.log('like: ' + obj["workbench.colorTheme"]);
            let curTheme = gthemeName;
            // console.log(curTheme);
            if (likeTheme.indexOf(curTheme) > -1) {
                vscode.window.showInformationMessage('Already liked "' + curTheme + '"');
            }
            else {
                likeTheme.push(curTheme);
                vscode.window.showInformationMessage('Like "' + curTheme + '"');
            }
            // console.log(likeTheme);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
        });
    }));
    // create a status bar click event
    likeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    likeItem.command = likeCommand;
    context.subscriptions.push(likeItem);
    likeItem.tooltip = 'Like this Theme';
    likeItem.text = '$(pass)';
    likeItem.show();
    // random theme in likeTheme
    const randlikeCommand = 'themerec.randLike';
    context.subscriptions.push(vscode.commands.registerCommand(randlikeCommand, () => {
        vscode.workspace.openTextDocument(jsonUri).then((document) => {
            let obj = JSON.parse(document.getText());
            const random = Math.floor(Math.random() * likeTheme.length);
            gthemeName = likeTheme[random];
            obj["workbench.colorTheme"] = gthemeName;
            // console.log('randlike: print likeTheme = ');
            // console.log(likeTheme);
            var jsonContent = JSON.stringify(obj, null, 4);
            vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new util_1.TextEncoder().encode(jsonContent));
        });
    }));
    // create a status bar click event
    randLikeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    randLikeItem.command = randlikeCommand;
    context.subscriptions.push(randLikeItem);
    randLikeItem.tooltip = 'Random in Liked Themes';
    randLikeItem.text = '$(pass-filled)';
    randLikeItem.show();
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