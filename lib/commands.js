const pDebounce = require('p-debounce');
const { getQuote } = require('./quotes');

module.exports = function (vscode, context) {

    let displayQuoteModeOn = false;
    let listenerDisposable;

    function displayQuote() {
        console.log('toto')
        // vscode.window.showInformationMessage(getQuote());
        var window = vscode.window;
        var workspace = vscode.workspace;
        try {
            var activeEditor = window.activeTextEditor;
            var text = activeEditor.document.getText();
            var matches = {}, match;
            var pattern = /§\w+/g
            while (match = pattern.exec(text)) {
                var startPos = activeEditor.document.positionAt(match.index);
                var endPos = activeEditor.document.positionAt(match.index + match[0].length);
                var decoration = {
                    range: new vscode.Range(startPos, endPos)
                };

                var matchedValue = match[0];
                matches[matchedValue] = [decoration];
                var rangeOption = matches[matchedValue] ? matches[matchedValue] : [];
                var decorationType = window.createTextEditorDecorationType({
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    overviewRulerColor: 'blue',
                    overviewRulerLane: vscode.OverviewRulerLane.Right,
                    light: {
                        // this color will be used in light color themes
                        color: 'darkblue'
                    },
                    dark: {
                        // this color will be used in dark color themes
                        color: 'lightblue'
                    }
                })
                activeEditor.setDecorations(decorationType, rangeOption);
                //break;

            console.log('matches', JSON.stringify(matches, 0, 2))
            console.log('rangeOption', rangeOption)
            }
        }
        catch (err) {
            console.error(err)
        }
    } // TODO §todo toto

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