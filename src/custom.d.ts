// 2021-02-06 https://webpack.js.org/guides/typescript#importing-other-assets
declare module "*.svg" {
	const content: any;
	export default content;
}