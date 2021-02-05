// 2021-02-06 https://webpack.js.org/guides/typescript#basic-setup
import * as _ from 'lodash';
function component() {
	const element = document.createElement('div');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}
document.body.appendChild(component());