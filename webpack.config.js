const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    module: {
        rules: [{
            test: /\.less$/,
            exclude: /node_modules/,
            use: [

                MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                }, {
                    loader: "less-loader"
                }, {
                    loader: "postcss-loader"
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                "postcss-loader"
            ]
        }]
    }
}