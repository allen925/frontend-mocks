const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: ['./front/scss/index.scss', './front/js/index.js', './front/js/generateMenuAnimation.js'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/',  // Ensures assets are served relative to the server root
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
            watch: true,
        },
        port: 3000,
        open: true,
        hot: false,
        compress: true,
        historyApiFallback: true,
        client: {
            overlay: true,
            logging: 'info',
            reconnect: 10
        },
        // to auto refresh when edit these files (not working on nav & footer)
        liveReload: true,
        watchFiles: ['front/**/*.html', 'front/**/*.scss'],
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: (pathData) => {
                        let relativePath = path.relative(path.resolve(__dirname, 'front'), pathData.module.resource);
                        relativePath = path.posix.join(...relativePath.split('\\'));
                        return `${relativePath}`;
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './front/index.html',
            filename: 'index.html',
            chunks: ['index', 'rows']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/min/[name].min.css'
        }),
    ],
    mode: 'development'
};