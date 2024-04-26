# toggle-slash extension for Visual Studio Code

An extension for Visual Studio Code, which toggle between slashes and backslashes, or alternatively adds additional slashes or backslashes.

  - Toggle forward slash:
    - When the selected text **contains backslashes**, all backslashes will be **converted to forward slashes** 1:1. Nothing will happen to existing forward slashes in the selection (`"\" -> "/"`).
    - When the selected text contains **no backslashes**, all forward slashes in the selection will be **doubled** (`"/" -> "//"`).

  - Toggle backslash:
    - When the selected text **contains forward slashes**, all forward slashes will be **converted to backslashes** 1:1. Nothing will happen to existing backslashes in the selection (`"/" -> "\"`).
    - When the selected text contains **no forward slashes**, all backslashes in the selection will be **doubled** (`"\" -> "\\"`).

This is largely inspired by [https://github.com/skandasoft/toggle-slash](https://github.com/skandasoft/toggle-slash), which does the same in the Atom editor.

The extension is especially great for **PHP**, where file paths on Linux and MacOS (Unix) contain forward slashes, but PHP namespaces contain backslashes ([https://www.php.net/manual/en/language.namespaces.php](https://www.php.net/manual/en/language.namespaces.php)). On Windows, copying the file path (e.g. via the command `"File: Copy Relative Path of Active File"`) will contain backslashes, but you may, in your application code, need all of these to be converted into forward slashes.

# Credits

## Authors

  - Kasper Søfren
    <br>E-mail: soefritz@gmail.com
    <br>Homepage: https://github.com/kafoso

## Inspiration

[https://github.com/skandasoft/toggle-slash](https://github.com/skandasoft/toggle-slash)
