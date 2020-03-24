/// <binding ProjectOpened='Watch - Development' />
var path = require("path");
var webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader')
var nodeExternals = require('webpack-node-externals');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
module.exports = {
    mode: "development",
    target:"node",
    entry: {
        SpringSDK: ['./wwwroot/SDK/Service/NodeSpringCMService.ts'],
        

    },
    node: {
        console: false,
        global: true,
        process: true,
        __filename: 'mock',
        __dirname: 'mock',
        Buffer: true,
        setImmediate: true

        // See "Other node core libraries" for additional options.
    },
    externals: [nodeExternals()],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]Node.bundle.js",
        chunkFilename: "[id].chunk.js",
        library: "SpringSDK",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        
        

    ] : [
        ]
    ,
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader?transpileOnly=true' }
        ]
    }
}