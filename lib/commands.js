const pDebounce = require('p-debounce');
const { getQuote } = require('./quotes');

module.exports = function (vscode, context) {

    let displayQuoteModeOn = false;
    let listenerDisposable;

    function displayQuote() {
        vscode.window.showInformationMessage(getQuote());
    }

    function turnOnToggleMode() {
        const subscriptions = [];
        const retriggerDisplayTimer = pDebounce(event => {
            if (!displayQuoteModeOn) return Promise.resolve('abort')
            return Promise.resolve(displayQuote())
                .then(() => new Promise(resolve => setTimeout(resolve, 10000 - 4000)))
                .then(retriggerDisplayTimer);
        }, 4000);
        vscode.window.onDidChangeTextEditorSelection(retriggerDisplayTimer, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(retriggerDisplayTimer, this, subscriptions);
        vscode.window.onDidChangeWindowState(retriggerDisplayTimer, this, subscriptions);
        listenerDisposable = vscode.Disposable.from(...subscriptions);
        context.subscriptions.push(listenerDisposable);
        retriggerDisplayTimer();
    }
    function turnOffToggleMode() {
        listenerDisposable.dispose();
    }
    function toggleQuoteMode() {
        vscode.window.showInformationMessage(`Turning ${displayQuoteModeOn ? 'off' : 'on'} Quote Mode`);
        if (displayQuoteModeOn) turnOffToggleMode(); else turnOnToggleMode();
        displayQuoteModeOn = !displayQuoteModeOn;

    }


    return { displayQuote, toggleQuoteMode };
}