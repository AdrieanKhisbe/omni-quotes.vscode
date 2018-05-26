const pDebounce = require('p-debounce');

module.exports = function (vscode, context) {

    let displayQuoteModeOn = false;
    function displayQuote() {
        vscode.window.showInformationMessage(getQuote());
    }

    function toggleQuoteMode() {
        vscode.window.showInformationMessage(`Turning ${displayQuoteModeOn ? 'off' : 'on'} Quote Mode`);
        displayQuoteModeOn = !displayQuoteModeOn;

        let subscriptions = [];
        const onChange = pDebounce(event => Promise.resolve(event).then(ev=>console.log('CHANGE', JSON.stringify(ev,0,2))),4000);
        vscode.window.onDidChangeTextEditorSelection(onChange, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(onChange, this, subscriptions);
        vscode.window.onDidChangeWindowState(onChange, this, subscriptions);
        context.subscriptions.push (vscode.Disposable.from(...subscriptions));
    }


    return { displayQuote, toggleQuoteMode };
}