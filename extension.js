const vscode = require('vscode');
const {getQuote} = require('./lib/quotes');
const {displayQuote, toggleQuoteMode} = require('./lib/commands')(vscode);

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    console.log('"omni-quotes" is now active!');

    const disposables = [
        vscode.commands.registerCommand('extension.displayQuote', displayQuote),
        vscode.commands.registerCommand('extension.toggleQuoteMode', toggleQuoteMode)
    ];

    disposables.map(disposable => context.subscriptions.push(disposable));
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;