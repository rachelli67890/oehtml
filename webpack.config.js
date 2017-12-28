var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }



        ]
    },
    resolve: {
        //extensions: ['', '.js', '.es6', '.vue'],
        alias: {
            //  也可以不写,如果通过 npm install 就直接用 npm 的了 npm install jquery --save
            // jquery: './jquery-3.2.1.min.js',
            semantic: './semantic.min.js',
            vide: './jquery.vide.min.js',
            wow: './wow.min.js'
        }
    },
    plugins: [
        new ExtractTextPlugin('css/app.css')
        // new HtmlWebpackPlugin({
        //     title: 'My App',
        //     template: 'resources/views/layouts/master.blade.php',
        //     filename: 'resources/views/layouts/admin.html'
        // })

        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
    ]

};


