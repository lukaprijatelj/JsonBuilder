import * as DEBUG from "./Diagnostics/Debug"


/* 
    Easy JSON builder library.
*/
export class JsonBuilder
{
    // value of the json builder
    private _value: string;
    // counter for children and arrays
    private _itemsCounter: Array<number>;
    // if name is already added
    private _isName: boolean;
    // if value is already added
    private _isValue: boolean;
    // determines whether json is readable
    private _makeReadable: boolean = true;
    // tabs counter
    private _tabsCounter: number;
    // start type array that determines action of the end function
    private _lastStartType: Array<StartType>; 


    constructor()
    {
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
    private resetTabsCounter(): void
    {
        this._tabsCounter = 1;
    }

    /*
        Appends the text to the end of _value.
    */
    public Append(text:string): JsonBuilder
    {
        this._value += text;
        return this;
    }

    /*
        Appends new line to the builder.
    */
    private appendNewLine(): void
    {
        if(this._makeReadable == true)
        {
            this._value += "\n";
        }
    }

    /*
        Appends number of tabs specified in this._tabsCounter
    */
    private appendTabs(): void
    {
        if(this._makeReadable == true)
        {
            for(let i=0; i<this._tabsCounter; i++)
            {
                this.Append("\t");
            }
        }
    }

    /*
        Appends empty space.
    */
    private appendEmptySpace(): void
    {
        if(this._makeReadable == true)
        {
            this._value += " ";
        }
    }

    /* 
        Start json object.
    */
    public Object(): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        if(this._lastStartType[this._lastStartType.length - 1] == StartType.Array)
        {
            if(this._itemsCounter[this._itemsCounter.length - 1] > 0)
            {
                this.Append(",");
            }
        }

        this.appendNewLine();
        this.appendTabs();
        this.Append("{");
        this._lastStartType.push(StartType.Object);
        this._isValue = true;
        this._isName = false;

        // increase at the end
        this._tabsCounter++;     

        this._itemsCounter[this._itemsCounter.length - 1]++;

        // reset item count
        this._itemsCounter.push(0); 

        return this;
    } 

    /* 
        Start json array.
    */
    public Array(): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        if(this._lastStartType[this._lastStartType.length - 1] == StartType.Array)
        {
            if(this._itemsCounter[this._itemsCounter.length - 1] > 0)
            {
                this.Append(",");
            }
        }

        this.Append("[");
        this.appendEmptySpace();
        this._isValue = true;
        this._isName = false;
        this._lastStartType.push(StartType.Array);

        // increase at the end
        this._tabsCounter++;  

        this._itemsCounter[this._itemsCounter.length - 1]++;

        // reset item count
        this._itemsCounter.push(0); 

        return this;
    } 

    /*
        End json array.
    */
    public End(): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        let lastType = this._lastStartType.pop();

        if(lastType == StartType.Document)
        {
            this.appendNewLine();    
            this.Append("}");
        }
        else if(lastType == StartType.Array)
        {
            // decrease at start
            this._tabsCounter--;
            
            this.appendEmptySpace();
            this.Append("]");
        }
        else
        {
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
    public Property(name: string): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        name = this.removeDoubleQuotes(name);
        name = this.removeEscapeCharacters(name);

        if(lastStartType == StartType.Array)
        {
            DEBUG.Browser.Error("Cannot add into array! Use Text() or Number() functions instead.");
            return this;
        }

        if(this._isName == false)
        {
            if(this._itemsCounter[this._itemsCounter.length - 1] > 0)
            {
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
        else
        {
            DEBUG.Browser.Error("Name() has already been called. Expecting Value() to be called next!");
        }

        return this;
    }

    /*
        Adds property value.
    */
    public Number(text: any): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        text = this.removeDoubleQuotes(text);

        if(lastStartType == StartType.Array)
        {
            if(this._itemsCounter[this._itemsCounter.length - 1] > 0)
            {
                this.Append(",");
                this.appendEmptySpace();
            }
            
            this.Append(text);

            this._itemsCounter[this._itemsCounter.length - 1]++;
        }
        else
        {
            if(this._isName == true)
            {
                if(this._isValue == false)
                {
                    this.Append(text);
                    
                    this._isValue = true;
                    this._isName = false;
                }
                else
                {
                    DEBUG.Browser.Error("Value() has already been called!");
                }
            }
            else
            {
                DEBUG.Browser.Error("Name() has not been called yet. Call Name() before calling Value()!");
            }    
        }

        return this;
    }

    /*
        Removes escape characters. 
        For example:
            C:\Directory\File   (not valid JSON text)
        To:
            C:\\Directory\\File
    */
    private removeEscapeCharacters(text:string): string
    {
        text = text.replace(/\\/g,"\\\\");
        return text;
    }

    /*
        Removes double quotes if present.
    */
    private removeDoubleQuotes(text: string): string
    {
        if(text[0] == '"' && text[text.length - 1] == '"')
        {
            text = text.substr(1, text.length - 2);
        }
    
        return text;
    }

    /*
        Adds the property value as a text (uses double quotation marks).
    */
    public Text(text: string): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            DEBUG.Browser.Error("There is no root object. Document() to start Json object.");
            return this;
        }

        let lastStartType = this._lastStartType[this._lastStartType.length - 1];
        text = this.removeDoubleQuotes(text);
        text = this.removeEscapeCharacters(text);

        if(lastStartType == StartType.Array)
        {
            if(this._itemsCounter[this._itemsCounter.length - 1] > 0)
            {
                this.Append(",");
                this.appendEmptySpace();
            }
            
            this.Append('"');
            this.Append(text);
            this.Append('"');

            this._itemsCounter[this._itemsCounter.length - 1]++;
        }
        else
        {
            if(this._isName == true)
            {
                if(this._isValue == false)
                {
                    this.Append('"');
                    this.Append(text);
                    this.Append('"');
                    
                    this._isValue = true;
                    this._isName = false;
                }
                else
                {
                    DEBUG.Browser.Error("TextValue() has already been called!");
                }
            }
            else
            {
                DEBUG.Browser.Error("Name() has not been called yet. Call Name() before calling TextValue()!");
            }
        }

        return this;
    }

    /*
        Starts JSON document (root object).
    */
    public Document(): JsonBuilder
    {
        if(this._lastStartType.length == 0)
        {
            this.Append("{");
            this._lastStartType.push(StartType.Document);
            this._itemsCounter.push(0);
        }
        else
        {
            DEBUG.Browser.Error("JSON document not started! Call Document() first!");
        }

        return this;
    }

    /*
        Returns the json in string format.
    */
    public GetString(): string
    {
        return this._value;
    }

    /*
        Returns JSON object.
    */
    public GetJson(): any
    {
        return JSON.parse(this._value);
    }
}

/*
    Enums for start type.
*/
enum StartType {
    Document = 1,
    Object = 2,
    Array = 3,
}

