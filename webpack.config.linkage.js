var path =require('path');
var webpack=require('webpack');
var webpackApp=require('./webpack.config.linkage.js');

module.exports={
    entry:'./app/index.js',
    output:{
        path:path.join(__dirname,'./app/'),
        filename:'link.js'
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    module:{
        devtool: 'inline-source-map',
        loaders:[
            {
                test:/\.js|jsx$/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','stage-2'],
                    cacheDirectory:true
                },
                inclue:path.join(__dirname,'.'),
                exclue:/node_modules/
            }
        ]
    },
    plugins:[
        /*new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })*/
    ]
}