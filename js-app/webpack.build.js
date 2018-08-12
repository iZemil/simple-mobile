const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const build = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../www'),
    },

    plugins: [
        new CleanWebpackPlugin(['www'], { root: path.resolve(__dirname, '../'), verbose: true }),
    ]
};

module.exports = merge(base, build);