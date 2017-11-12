"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Browser {
    // writes text in browser command line and adds new line
    static WriteLine(text) {
        if (this._enabled === true) {
            console.log(text + "\n");
        }
    }
    // writes text in browser command line
    static Write(text) {
        if (this._enabled === true) {
            console.log(text);
        }
    }
    // write error message
    static Error(text) {
        if (this._enabled === true) {
            console.log("ERROR: " + text + "\n");
        }
    }
    // write warning message
    static Warning(text) {
        if (this._enabled === true) {
            console.log("Warning: " + text + "\n");
        }
    }
    // info message
    static Info(text) {
        if (this._enabled === true) {
            console.log("==== INFO: " + text + "\n");
        }
    }
}
// if debugging is enabled in browser
Browser._enabled = true;
exports.Browser = Browser;
