const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const imagemin = require("imagemin");
const webp = require("imagemin-webp");

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

const PAGES_DIR = `${PATHS.src}/html`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

imagemin(['src/images/*.{jpg,png}'], {
  destination: 'src/images/webp/',
  plugins: [
    webp(
      {
        quality: 70
      }
    )
  ]
});



module.exports = {

    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js?[hash]`,
        path: PATHS.dist,
        // publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            // include: '/node_modules/',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
            }
        },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {sourceMap: true}
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css?[hash]`,

        }),
        new SpriteLoaderPlugin(),

        // new HtmlWebpackPlugin({
        //     hash: false,
        //     template: `${PATHS.src}/index.html`,
        //     filename: './index.html'
        // }),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page}`
        })),

        new CopyWebpackPlugin({
            patterns: [
                {from: `${PATHS.src}/images`, to: `${PATHS.assets}images`},
                {from: `${PATHS.src}/svg`, to: `${PATHS.assets}svg`},
                {from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`},
                // {from: `${PATHS.src}/pages`, to: `${PATHS.dist}pages`},
                {from: `${PATHS.src}/static`, to: ''}
            ]
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ]
};
