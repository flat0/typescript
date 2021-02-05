// 2021-01-26 https://webpack.js.org/guides/getting-started#using-a-configuration
const fs = require('fs');
const path = require('path');
// 2021-02-01 https://webpack.js.org/guides/output-management#setting-up-htmlwebpackplugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 2021-02-01 https://webpack.js.org/guides/output-management#cleaning-up-the-dist-folder
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
	// 2021-02-02
	// 1) «This tells `webpack-dev-server` to serve the files from the `dist` directory on `localhost:8080`»
	// 2) «`webpack-dev-server` doesn't write any output files after compiling.
	// Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path.»
	// https://webpack.js.org/guides/development#using-webpack-dev-server
	// https://webpack.js.org/configuration/dev-server
	devServer: {
		// 2021-02-03 "How do I install a self-signed certificate to localhost?": https://df.tips/t/1070
		cert: fs.readFileSync('C:/server/cert/.crt')
		,contentBase: './dist'
		,host: 'localhost.com' // 2021-02-02 https://webpack.js.org/configuration/dev-server#devserverhost
		,https: true // 2021-02-02 https://webpack.js.org/configuration/dev-server#devserverhttps
		// 2021-02-03 "How do I install a self-signed certificate to localhost?": https://df.tips/t/1070
		,key: fs.readFileSync('C:/server/cert/.key')
		,port: 2212 // 2021-02-02 https://webpack.js.org/configuration/dev-server#devserverport
	}
	// 2021-02-01 https://webpack.js.org/guides/development
	// 2021-02-06 https://webpack.js.org/guides/typescript#source-maps
	,devtool: 'inline-source-map'
	,entry: {index: './src/index.ts'} // 2021-02-06 https://webpack.js.org/guides/typescript#basic-setup
	,mode: 'development' // 2021-02-01 https://webpack.js.org/guides/development
	// 2021-02-06 https://webpack.js.org/guides/typescript#basic-setup
	,module: {rules: [{exclude: /node_modules/, test: /\.tsx?$/, use: 'ts-loader'}]}
	// 2021-02-03 https://webpack.js.org/guides/caching#extracting-boilerplate
	,optimization: {
		// 2021-02-03
		// «Running another build, we would expect only our main bundle's hash to change, however we can see that all three have.
		// This is because each `module.id` is incremented based on resolving order by default.
		// Meaning when the order of resolving is changed, the IDs will be changed as well.
		// So, to recap:
		// 	- The `main` bundle changed because of its new content.
		// 	- The `vendor` bundle changed because its `module.id` was changed.
		// 	- And, the `runtime` bundle changed because it now contains a reference to a new module.
		// The first and last are expected, it's the `vendor` hash we want to fix.
		// Let's use `optimization.moduleIds` with 'deterministic' option»:
		// https://webpack.js.org/guides/caching#module-identifiers
		// https://webpack.js.org/configuration/optimization#optimizationmoduleids
		moduleIds: 'deterministic'
		,runtimeChunk: 'single'
		// 2021-02-03
		// «It's also good practice to extract third-party libraries, such as lodash or react,
		// to a separate vendor chunk as they are less likely to change than our local source code.
		// This step will allow clients to request even less from the server to stay up to date.
		// This can be done by using the `cacheGroups` option.»
		// https://webpack.js.org/guides/caching#extracting-boilerplate
		,splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'all'
					,name: 'vendors'
					,test: /[\\/]node_modules[\\/]/
				}
			}
		}
	}
	,output: {
		filename: 'bundle.js' // 2021-02-06 https://webpack.js.org/guides/typescript#basic-setup
		,path: path.resolve(__dirname, 'dist')
		,publicPath: '/' // 2021-02-03 https://webpack.js.org/guides/development#using-webpack-dev-middleware
	}
	,plugins: [
		// 2021-02-01 https://webpack.js.org/guides/output-management#cleaning-up-the-dist-folder
		new CleanWebpackPlugin({
			// 2021-02-01
			// «Tell CleanWebpackPlugin that we don't want to remove the index.html file
			// after the incremental build triggered by `watch`.
			// We do this with the cleanStaleWebpackAssets option.»:
			// https://webpack.js.org/guides/development#using-watch-mode
			cleanStaleWebpackAssets: false
		})
		// 2021-02-01 https://webpack.js.org/guides/output-management#setting-up-htmlwebpackplugin
		,new HtmlWebpackPlugin({
			title: 'Caching' // 2021-02-03 https://webpack.js.org/guides/caching#output-filenames
		})
	]
	// 2021-02-06 https://webpack.js.org/guides/typescript#basic-setup
	,resolve: {extensions: ['.tsx', '.ts', '.js']}
};