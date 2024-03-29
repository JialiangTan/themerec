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

if (os.platform() === 'darwin'){
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
	console.log(os.platform());
	
	const randCommand = 'themerec.randTheme';
	
	let disposable = vscode.commands.registerCommand(randCommand, () => {
		// TODO:
		// collect human response
		// read likeTheme when activate, should not be emitted
		vscode.workspace.openTextDocument(jsonUri).then((document) => {
			let obj = JSON.parse(document.getText());
			// const themeName = ['1987', '2077', 'Iceberg', 'Visual Studio Dark'];
			const themeName = ['Atom One Dark', 'Horizon', '1987', 'One Monokai', 'Nebula',
							   'Iceberg', 'Aura Dark', 'Aura Soft Dark', '2077',
							   'Slack Theme Work Hard', 'Slack Theme Dark Mode', 'Slack Theme Aubergine Dark',
							   'Eva Dark', 'Abyss','Gruvbox Dark Hard', 'Gruvbox Dark Soft', 'Gruvbox Dark Medium', 
							   'Gruvbox Light Hard', 'Gruvbox Light Soft', 'Gruvbox Light Medium',
							   'Winter is Coming (Light)', 'Winter is Coming (Dark Blue)', 'Winter is Coming (Dark Black)',
							   'Luvia Theme', "merko's green theme", 'JellyFish', 'Blueberry dark theme',
							   'Omni', 'Darcula', 'Panda Syntax', 'Cute', 'Cobalt2', 'Palenight Theme', 'Palenight Theme', 
							   'Red', 'Kimbie Dark', 'Tomorrow Night Blue','Solarized Dark',  'Solarized Light', 
							   'Default High Contrast', 'Quieter Dark', 'Quiet Light+', 'Sublime Material Theme - Dark',
							   'Sublime Material Theme - Light', 'Cyberpunk', 'Yoncé','Ayu Dark','Ayu Dark Bordered',
							   'Ayu Light','Ayu Light Bordered','Ayu Mirage','Ayu Mirage Bordered',
							   'Nord', 'One Dark Pro','One Dark Pro Flat','One Dark Pro Darker','One Dark Pro Mix','Night Owl',
							   'Night Owl Light', 'Tokyo Night','Tokyo Night Storm','Tokyo Night Light', 'Bearded Theme Arc',
							   'Bearded Theme Solarized','Bearded Theme Black & Diamond','Bearded Theme Earth','Vue Theme',
							   'Vue Theme High Contrast','Bluloco Dark','Bluloco Dark Italic','Bluloco Light','Bluloco Light Italic',
							   'Mayukai Mirage','Mayukai Semantic Mirage','Mayukai Mirage Gruvbox Darktooth',
							   'Mayukai Dark','Mayukai Mono','Mayukai Alucard','Mayukai Sunset', 'Mayukai Reversal',
							   'Mayukai Midnight','Moonlight','Moonlight Italic', 'Kary Pro Colors － Light',
							   'Kary Pro Colors － Dark','Black', 'Black Italic','Viow Darker','Viow Arabian - Mix',
							   'Viow Flat','Viow Light','Viow Neon','Viow Mars','Viow Arabian','Kanagawa',
							   'Ariake Dark','Hackers Haze','City Lights','Radical','Plastic','Code Blue','Hyper Term Theme',
							   'Halcyon','Hop Light','1337','Seti Monokai: Original','Seti Monokai: Pale Night',
							   'Seti Monokai: Royal','Seti Monokai: Dark Forest','Seti Monokai: Space','Night Owl Black',
							   'FireFly Pro','FireFly Pro Midnight','FireFly Pro Bright',"Pop N' Lock Theme by Luxcium ✨",
							   'Snazzy Light','Copilot Theme','Pink Cat Boo','Dark Low Contrast','Dark Low Contrast Warm',
							   'Dark Low Contrast Cold','Dark Low Contrast Nature','Dark Low Contrast Fire','Tiny Light',
							   'Helium','NarutoDark','Aurora X','CFML Light','CFML Dark','LaserWave','LaserWave Italic',
							   'Darktooth','Go - Playground','Go - Sources','Outrun Night','Outrun Electric','Celestial',
							   'Launchbase Theme','Delphi','Delphi (Classic)','Delphi (Twilight)','Delphi (Ocean)',
							   'Delphi+ (Classic)','Delphi+ (Twilight)','Delphi+ (Ocean)','Night Wolf (dark blue)',
							   'Night Wolf (dark gray)','Night Wolf (gray)','Night Wolf (black)','Nord Wave','Rosé Pine',
							   'Rosé Pine Moon', 'Rosé Pine Dawn','White','White Night','Catppuccin Mocha','Catppuccin Latte',
							   'Catppuccin Macchiato','Catppuccin Frappé','Atlantic Night','Atlantic Night - Abyss',
							   'Remedy - Bright (Straight)','Remedy - Bright (Tilted)','Remedy - Dark (Straight)','Remedy - Dark (Tilted)',
							   'Syntax Dark','Syntax Light','1984 - Orwellian','1984','1984 - Unbolded','1984 - Fancy','1984 - Cyberpunk',
							   '1984 - Light'];
			const random = Math.floor(Math.random() * themeName.length);
			gthemeName = themeName[random];
			obj["workbench.colorTheme"] = gthemeName;
			// console.log('rand: ' + obj["workbench.colorTheme"]);
			// obj["workbench.colorTheme"] = themeName[random];
			// vscode.window.showInformationMessage('Current theme is: ' + themeName[random]);
			vscode.window.setStatusBarMessage(gthemeName, 300000);

			var jsonContent = JSON.stringify(obj, null, 4);
			vscode.workspace.fs.writeFile(vscode.Uri.file(jsonUri.path), new TextEncoder().encode(jsonContent));
		});
	});
	context.subscriptions.push(disposable);
	// create a status bar click event
	randItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	randItem.command = randCommand;
	context.subscriptions.push(randItem);
	randItem.tooltip = "I'm Feeling Lucky";
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
	defaultItem.tooltip = 'Default';
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

