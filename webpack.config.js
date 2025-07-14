const path = require('path');
module.exports = {
    mode: 'production',
    entry: "./src/core/ExotelCRMWebSDK.ts",
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
                exclude: [/node_modules/, /__tests__/, /__mocks__/]
            },
            {
                test: /\.(wav)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    performance: {
        maxAssetSize: 1024 * 1024,        // 1 MiB
        maxEntrypointSize: 512 * 1024,   // 512 KiB
    },
};
