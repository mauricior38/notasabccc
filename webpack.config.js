const path = require('path');

module.exports = {
    entry: './index.js', // Ponto de entrada do seu código
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Pasta de saída
    },
    mode: 'development', // Ou 'production' para produção
};