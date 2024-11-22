const path = require('path');
module.exports = {
    entry: "./src/ExotelCRMWebSDK.ts",
    output: {
        filename: "crmBundle.js",
        path: path.resolve(__dirname, 'target'),
        library: 'ExotelCRMWebSDK',
        libraryTarget: 'umd', 
        libraryExport: 'default', 
        publicPath: './target/',
        assetModuleFilename: '[name][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(wav)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
    }
};
