/// <binding ProjectOpened='Watch - Development' />
var path = require("path");
var webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader')
var nodeExternals = require('webpack-node-externals');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
//const enhancedResolve = require('enhanced-resolve')
//let resolver = ResolverFactory.createResolver(webpackConfig.resolve);
//resolver.fileSystem = new SyncAsyncFileSystemDecorator(new NodeJsInputFileSystem());
//new webpack.DefinePlugin({
//    "./RequestorFactory":"./BrowserRequestorFactory"
//});
module.exports = {
    mode:"development",
    entry: {
        SpringCMSDK: ['./wwwroot/SDK/Service/BrowserSpringCMService.ts'/*, './wwwroot/SDK/Authentication/StaticTokenAuthentication.js'*/],
        

    },
    //include: [
    //    path.resolve(__dirname, './wwwroot/SDK/Authentication/StaticTokenAuthentication.js'),
       
    //],
    //resolve: {
    //    alias: {
    //        "RequestorFactory": path.resolve(__dirname, './wwwroot/SDK/Service/BrowserRequestFactory.js')
    //    }
    //},
    externals: [nodeExternals(), { NodeHttpRequest: './NodeHttpRequest'}],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "SpringCMSDK.bundle.js",
        chunkFilename: "SpringCMSDK.chunk.js",
        library: "SpringSDK",
     
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        
        // new UglifyJSPlugin({
        //    extractComments: true
        //})

    ] : [
        ]
    ,
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: 'awesome-typescript-loader?transpileOnly=true',
                exclude: [
                    //path.resolve(__dirname, './wwwroot/SDK/Service/NodeHttpRequest.ts'),
                ]

            }
        ]
    }
}