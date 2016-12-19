var webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: './',
        filename: '[name].js',
        sourceMapFilename: "[name].js.map",
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'source-map' },
        ],
        loaders: [
            { test: /\.(jpe?g|png|gif|svg|mp4)$/i, loader: 'file'},
            { test: /\.html$|\.js$/, loader: 'babel', query: { presets: 'es2015' }},
            { test: /\.less$/, loader: 'style!css!postcss!less'},
            { test: /\.json$/, loader: 'json'},
        ]
    },
    devServer: {
        port: 8080,
        inline: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
    },
    eslint: {
        configFile: './.eslintrc'
    },
    devtool: 'source-map'
}
