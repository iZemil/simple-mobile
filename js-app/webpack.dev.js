const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');

const dev = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    
    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
};

module.exports = merge(base, dev);