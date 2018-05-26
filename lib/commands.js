const pDebounce = require('p-debounce');
const { getQuote } = require('./quotes');

module.exports = function (vscode, context) {

    let displayQuoteModeOn = false;
    function displayQuote() {
        vscode.window.showInformationMessage(getQuote());
    }

    function toggleQuoteMode() {
        vscode.window.showInformationMessage(`Turning ${displayQuoteModeOn ? 'off' : 'on'} Quote Mode`);
        displayQuoteModeOn = !displayQuoteModeOn;

        const subscriptions = [];
        const retriggerDisplayTimer = pDebounce(event => Promise.resolve(displayQuote())
            .then(() => new Promise(resolve => setTimeout(resolve, 10000 - 4000)))
            .then(retriggerDisplayTimer), 4000);
        vscode.window.onDidChangeTextEditorSelection(retriggerDisplayTimer, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(retriggerDisplayTimer, this, subscriptions);
        vscode.window.onDidChangeWindowState(retriggerDisplayTimer, this, subscriptions);
        context.subscriptions.push(vscode.Disposable.from(...subscriptions));
        retriggerDisplayTimer();
    }


    return { displayQuote, toggleQuoteMode };
}