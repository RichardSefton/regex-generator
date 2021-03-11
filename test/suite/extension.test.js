const assert = require('assert');
const regexModifiers = require("../../webview/scripts/regexModifiers");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		console.log("running tests")
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite("regex-builder function modifiers", () => {
	test("adds the global modifier", () => {
		const expression = "//"
		const withGlobal = regexModifiers.addGlobal(expression);
		assert.strictEqual(withGlobal, "//g");
	});

	test("removes the global modifier", () => {
		const expression = "//g";
		const withoutGlobal = regexModifiers.removeGlobal(expression);
		assert.strictEqual(withoutGlobal, "//");
	});
})
