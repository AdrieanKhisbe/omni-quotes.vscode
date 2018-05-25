const vscode = require('vscode');
const {getQuote} = require('./lib/quotes');

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    console.log('Congratulations, your extension "omni-quotes" is now active!');

    // command has been defined in the package.json file
    let disposable = vscode.commands.registerCommand('extension.displayQuote', function () {
        vscode.window.showInformationMessage(`__${getQuote()}__`);
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;