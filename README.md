# toggle-slash extension for Visual Studio Code

An extension for Visual Studio Code, which allows the user to toggle between slashes and backslashes, or alternatively add additional slashes or backslashes.

|Command|Action|
|-|-|
|Toggle forward slash conditionally ("\\" -> "/" or "/" -> "//"):|One of the following two things will happen:<ol><li>When the selected text **contains backslashes**, all backslashes will be **converted to forward slashes** 1:1 (`"\" -> "/"`). Nothing will happen to existing forward slashes in the selection; i.e. bullet 2 below will **not** happen.</li><li>When the selected text contains **no backslashes**, all forward slashes in the selection will be **doubled** (`"/" -> "//"`).</li></ol>|
|Toggle all slashes forward ("\\" -> "/" and "/" -> "//"):|Doubles single forward slashes **and** converts all backslashes to a forward slash 1:1.|
|Toggle backslash conditionally ("/" -> "\\" or "\\" -> "\\\\"):|One of the following two things will happen:<ol><li>>When the selected text **contains forward slashes**, all forward slashes will be **converted to backslashes** 1:1 (`"/" -> "\"`). Nothing will happen to existing backslashes in the selection; i.e. bullet 2 below will **not** happen.</li><li>When the selected text contains **no forward slashes**, all backslashes in the selection will be **doubled** (`"\" -> "\\"`).</li></ol>|
|Toggle all slashes backward ("/" -> "\\" and "\\" -> "\\\\"):|Doubles single backslashes **and** converts all forward slashes to a backslash 1:1.|

When nothing is selected, the entire line, the caret is placed in, will be selected before the chosen operation is performed.

This functionality is largely inspired by [https://github.com/skandasoft/toggle-slash](https://github.com/skandasoft/toggle-slash), which does the same in the Atom editor.

This extension is especially great for **PHP**, where file paths on Linux and MacOS (Unix) contain forward slashes, but PHP namespaces contain backslashes ([https://www.php.net/manual/en/language.namespaces.php](https://www.php.net/manual/en/language.namespaces.php)). On Windows, copying the file path (e.g. via the command `"File: Copy Relative Path of Active File"`) will contain backslashes, but you may, in your application code, need all of these to be converted into forward slashes.

# Known limitations

Utilizing column selection (e.g. via `cursorColumnSelectDown` and/or `cursorColumnSelectUp`) or making multiple character selections across multiple lines, will still only apply the commands to the line containing the caret.

# Credits

## Authors

  - Kasper Søfren
    <br>E-mail: soefritz@gmail.com
    <br>Homepage: https://github.com/kafoso

## Inspiration

[https://github.com/skandasoft/toggle-slash](https://github.com/skandasoft/toggle-slash)
