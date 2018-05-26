
module.exports = function (vscode) {

    let displayQuoteModeOn = false;
    function displayQuote() {
        vscode.window.showInformationMessage(getQuote());
    }

    function toggleQuoteMode() {
        vscode.window.showInformationMessage(`Turning ${displayQuoteModeOn ? 'off' : 'on'} Quote Mode`);
        displayQuoteModeOn = !displayQuoteModeOn;

        let subscriptions = [];
        const onChange = event => console.log('CHANGE', JSON.stringify(event,0,2))
        vscode.window.onDidChangeTextEditorSelection(onChange, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(onChange, this, subscriptions);
        vscode.window.onDidChangeWindowState(onChange, this, subscriptions);
    
        // create a combined disposable from both event subscriptions
        //this.disposable = vscode.Disposable.from(...subscriptions);
    }


    return { displayQuote, toggleQuoteMode };
}