
const quotes = [
  'Let\'s try out Visual Code',
  'Learn a new shortcut every hour',
  'I should be more inspired with quotes'
];

const getQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = {
    quotes, 
    getQuote
}