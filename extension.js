const vscode = require('vscode');

class SelectionWithContext
{
	constructor(editor, selection, highlighted)
	{
		this.editor = editor;
		this.selection = selection;
		this.highlighted = highlighted;
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposableToggleForwardSlashes = vscode.commands.registerCommand(
		'toggle-slash.toggle-forward-slashes-conditionally',
		() => {
			toggleSlashesConditionallyForward();
		}
	);

	context.subscriptions.push(disposableToggleForwardSlashes);

	let disposableToggleAllSlashesForward = vscode.commands.registerCommand(
		'toggle-slash.toggle-all-slashes-forward',
		() => {
			toggleAllSlashesForward();
		}
	);

	context.subscriptions.push(disposableToggleAllSlashesForward);

	let disposableToggleBackSlashes = vscode.commands.registerCommand(
		'toggle-slash.toggle-backslashes-conditionally',
		() => {
			toggleSlashesConditionallyBackward();
		}
	);

	context.subscriptions.push(disposableToggleBackSlashes);

	let disposableToggleAllSlashesBackward = vscode.commands.registerCommand(
		'toggle-slash.toggle-all-slashes-backward',
		() => {
			toggleAllSlashesBackward();
		}
	);

	context.subscriptions.push(disposableToggleAllSlashesBackward);
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
 * @return SelectionWithContext|null
 */
function createSelectionWithContext() {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return null;
	}

	let selection = editor.selection;

	if (!selection) {
		return null;
	}

	if (selection.isEmpty) {
		const currentLineRange = editor.document.lineAt(selection.active.line).range;

		if (currentLineRange.e.character <= 0) {
			return null;
		}

		selection = new vscode.Selection(
			selection.start.line,
			0,
			selection.start.line,
			currentLineRange.e.character,
		);

		editor.selection = selection;
	}

	const selectionRange = new vscode.Range(
		selection.start.line,
		selection.start.character,
		selection.end.line,
		selection.end.character
	);

	const highlighted = editor.document.getText(selectionRange);

	if (false === (highlighted && 'string' === typeof highlighted && highlighted.length)) {
		return null;
	}

	return new SelectionWithContext(editor, selection, highlighted);
}

function toggleAllSlashesBackward() {
	const selectionWithContext = createSelectionWithContext();

	if (!selectionWithContext) {
		return;
	}

	let replacement = selectionWithContext.highlighted.replace(/(\\)/g, '$1\\');
	replacement = replacement.replace(/(\/)/g, '\\');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Toggled all slashes in selection backward.');
		});
	}
}

function toggleAllSlashesForward() {
	const selectionWithContext = createSelectionWithContext();

	if (!selectionWithContext) {
		return;
	}

	let replacement = selectionWithContext.highlighted.replace(/(\/)/g, '$1/');
	replacement = replacement.replace(/(\\)/g, '/');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Toggled all slashes in selection forward.');
		});
	}
}

function toggleSlashesConditionallyBackward() {
	const selectionWithContext = createSelectionWithContext();

	if (!selectionWithContext) {
		return;
	}

	let replacement = selectionWithContext.highlighted.replace(/(\/)/g, '\\');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Toggled all forward slashes to backslashes in selection.');
		});

		return;
	}

	replacement = replacement.replace(/(\\)/g, '$1\\');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Doubled all backslashes in selection.');
		});

		return;
	}
}

function toggleSlashesConditionallyForward() {
	const selectionWithContext = createSelectionWithContext();

	if (!selectionWithContext) {
		return;
	}

	let replacement = selectionWithContext.highlighted.replace(/(\\)/g, '/');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Toggled all backslashes to forward slashes in selection.');
		});

		return;
	}

	replacement = replacement.replace(/(\/)/g, '$1/');

	if (replacement !== selectionWithContext.highlighted) {
		selectionWithContext.editor.edit(builder => {
			builder.replace(selectionWithContext.selection, replacement);

			vscode.window.showInformationMessage('Doubled all forward slashes in selection.');
		});

		return;
	}
}

module.exports = {
	activate,
	deactivate,
	toggleAllSlashesBackward,
	toggleAllSlashesForward,
	toggleSlashesConditionallyForward,
	toggleSlashesConditionallyBackward,
	escapeRegExp
}
