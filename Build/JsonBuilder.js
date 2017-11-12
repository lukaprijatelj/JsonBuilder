"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEBUG = require("./Diagnostics/Debug");
/*
    Easy JSON builder library.
*/
class JsonBuilder {
    constructor() {
        // determines whether json is readable
        this._makeReadable = true;
        this._value = "";
        this._itemsCounter = [];
        this._isName = false;
        this._isValue = false;
        this._lastStartType = [];
        this.resetTabsCounter();
    }
    /*
        Resets tabs counter.
    */
    resetTabsCounter() {
        this._tabsCounter = 1;
    }
    /*
        Appends the text to the end of _value.
    */
    Append(text) {
        this._value += text;
        return this;
    }
    /*
        Appends new line to the builder.
    */
    appendNewLine() {
        if (this._makeReadable == true) {
            this._value += "\n";
        }
    }
    /*
        Appends number of tabs specified in this._tabsCounter
    */
    appendTabs() {
        if (this._makeReadable == true) {
            for (let i = 0; i < this._tabsCounter; i++) {
                this.Append("\t");
            }
        }
    }
    /*
        Appends empty space.
    */
    appendEmptySpace() {
        if (this._makeReadable == true) {
            this._value += " ";
        }
    }
    /*
        Start json object.
    */
    Object() {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        if (this._lastStartType[this._lastStartType.length - 1] == StartType.Array) {
            if (this._itemsCounter[this._itemsCounter.length - 1] > 0) {
                this.Append(",");
            }
        }
        this.Append("{");
        this._lastStartType.push(StartType.Object);
        this._isValue = true;
        this._isName = false;
        // increase at the end
        this._tabsCounter++;
        // reset item count
        this._itemsCounter.push(0);
        return this;
    }
    /*
        Start json array.
    */
    Array() {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        this.Append("[");
        this.appendEmptySpace();
        this._isValue = true;
        this._isName = false;
        this._lastStartType.push(StartType.Array);
        // reset item count
        this._itemsCounter.push(0);
        return this;
    }
    /*
        End json array.
    */
    End() {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        let lastType = this._lastStartType.pop();
        if (lastType == StartType.Document) {
            this.appendNewLine();
            this.Append("}");
        }
        else if (lastType == StartType.Array) {
            this.appendEmptySpace();
            this.Append("]");
        }
        else {
            // decrease at start
            this._tabsCounter--;
            this.appendNewLine();
            this.appendTabs();
            this.Append("}");
        }
        this._itemsCounter.pop();
        return this;
    }
    /*
        Adds the property name and also name/value separator.
    */
    Property(name) {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        if (lastStartType == StartType.Array) {
            DEBUG.Browser.Error("Cannot add into array! Use Text() or Number() functions instead.");
            return this;
        }
        if (this._isName == false) {
            if (this._itemsCounter[this._itemsCounter.length - 1] > 0) {
                this.Append(",");
            }
            this.appendNewLine();
            this.appendTabs();
            this.Append('"');
            this.Append(name);
            this.Append('"');
            // append name and value separator
            this.Append(":");
            this._isName = true;
            this._isValue = false;
            this._itemsCounter[this._itemsCounter.length - 1]++;
        }
        else {
            DEBUG.Browser.Error("Name() has already been called. Expecting Value() to be called next!");
        }
        return this;
    }
    /*
        Adds property value.
    */
    Number(text) {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        if (lastStartType == StartType.Array) {
            if (this._itemsCounter[this._itemsCounter.length - 1] > 0) {
                this.Append(",");
                this.appendEmptySpace();
            }
            this.Append(text);
            this._itemsCounter[this._itemsCounter.length - 1]++;
        }
        else {
            if (this._isName == true) {
                if (this._isValue == false) {
                    this.Append(text);
                    this._isValue = true;
                    this._isName = false;
                }
                else {
                    DEBUG.Browser.Error("Value() has already been called!");
                }
            }
            else {
                DEBUG.Browser.Error("Name() has not been called yet. Call Name() before calling Value()!");
            }
        }
        return this;
    }
    /*
        Adds the property value as a text (uses double quotation marks).
    */
    Text(text) {
        if (this._lastStartType.length == 0) {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }
        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        if (lastStartType == StartType.Array) {
            if (this._itemsCounter[this._itemsCounter.length - 1] > 0) {
                this.Append(",");
                this.appendEmptySpace();
            }
            this.Append('"');
            this.Append(text);
            this.Append('"');
            this._itemsCounter[this._itemsCounter.length - 1]++;
        }
        else {
            if (this._isName == true) {
                if (this._isValue == false) {
                    this.Append('"');
                    this.Append(text);
                    this.Append('"');
                    this._isValue = true;
                    this._isName = false;
                }
                else {
                    DEBUG.Browser.Error("TextValue() has already been called!");
                }
            }
            else {
                DEBUG.Browser.Error("Name() has not been called yet. Call Name() before calling TextValue()!");
            }
        }
        return this;
    }
    /*
        Starts JSON document (root object).
    */
    Document() {
        if (this._lastStartType.length == 0) {
            this.Append("{");
            this._lastStartType.push(StartType.Document);
            this._itemsCounter.push(0);
        }
        else {
            DEBUG.Browser.Error("JSON document not started! Call Document() first!");
        }
        return this;
    }
    /*
        Returns the json in string format.
    */
    GetString() {
        return this._value;
    }
    /*
        Returns JSON object.
    */
    GetJson() {
        return JSON.parse(this._value);
    }
}
exports.JsonBuilder = JsonBuilder;
/*
    Enums for start type.
*/
var StartType;
(function (StartType) {
    StartType[StartType["Document"] = 1] = "Document";
    StartType[StartType["Object"] = 2] = "Object";
    StartType[StartType["Array"] = 3] = "Array";
})(StartType || (StartType = {}));
