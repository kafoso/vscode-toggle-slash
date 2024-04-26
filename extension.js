const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposableToggleForwardSlashes = vscode.commands.registerCommand(
		'toggle-slash.toggle-forward-slashes',
		() => {
			toggleSlashes(
				'/',
				'\\',
				'Toggled all backslashes to forward slashes in selection.',
				'/',
				'Doubled all forward slashes in selection.',
			);
		}
	);

	context.subscriptions.push(disposableToggleForwardSlashes);

	let disposableToggleBackSlashes = vscode.commands.registerCommand(
		'toggle-slash.toggle-backslashes',
		() => {
			toggleSlashes(
				'\\',
				'/',
				'Toggled all forward slashes to backslashes in selection.',
				'\\',
				'Doubled all backslashes in selection.',
			);
		}
	);

	context.subscriptions.push(disposableToggleBackSlashes);
}

function deactivate() {}

/**
 * Credits for this function goes to: https://stackoverflow.com/a/9310752
 *
 * @param {string} text
 *
 * @return {string}
 */
function escapeRegExp(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * @param {string} replacementCharacter
 * @param {string} firstCheckCharacter
 * @param {string} firstMessage
 * @param {string} secondCheckCharacter
 * @param {string} secondMessage
 * @param {console|undefined} console
 */
function toggleSlashes(
	replacementCharacter,
	firstCheckCharacter,
	firstMessage,
	secondCheckCharacter,
	secondMessage,
	console
) {
	/**
	 * @param  {...string} messages
	 */
	const log = (...messages) => {
		if (console) {
			console.log.apply(console, messages);
		}
	};

	const editor = vscode.window.activeTextEditor;

	log('editor', editor);

	if (!editor) {
		return;
	}

	const selection = editor.selection;

	log('selection', selection);

	if (!selection || selection.isEmpty) {
		return;
	}

	const selectionRange = new vscode.Range(
		selection.start.line,
		selection.start.character,
		selection.end.line,
		selection.end.character
	);

	const highlighted = editor.document.getText(selectionRange);

	if (false === (highlighted && 'string' === typeof highlighted && highlighted.length)) {
		return;
	}

	let regexp = new RegExp(escapeRegExp(firstCheckCharacter), 'g');

	let replacement = highlighted.replace(regexp, replacementCharacter);

	if (replacement !== highlighted) {
		editor.edit(builder => {
			builder.replace(selection, replacement);

			vscode.window.showInformationMessage(firstMessage);
		});

		return;
	}

	regexp = new RegExp(escapeRegExp(secondCheckCharacter), 'g');

	replacement = highlighted.replace(regexp, replacementCharacter + replacementCharacter);

	if (replacement !== highlighted) {
		editor.edit(builder => {
			builder.replace(selection, replacement);

			vscode.window.showInformationMessage(secondMessage);
		});

		return;
	}
}

module.exports = {
	activate,
	deactivate,
	toggleSlashes,
	escapeRegExp
}
