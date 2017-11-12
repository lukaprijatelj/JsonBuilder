import * as FS from "fs"
import * as DEBUG from "./Diagnostics/Debug"
import $ = require("jquery")

/*
    TODO:
        - don't forget to comment out all DEBUG lines
*/

/* 
    Importer for FBX files (FBX ASCII file format)
*/
export class JsonBuilder
{
    // value of the json builder
    private _value: string;
    // counter for children and arrays
    private _itemCounter: number;
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
        this._itemCounter = 0;
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
    public Append(text:string): void
    {
        this._value += text;
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
    public Object(): void
    {
        if(this._lastStartType[this._lastStartType.length - 1] == StartType.Array)
        {
            if(this._itemCounter > 0)
            {
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
        this._itemCounter = 0; 
    } 

    /* 
        Start json array.
    */
    public Array(): void
    {
        this.Append("[");
        this.appendEmptySpace();
        this._isValue = true;
        this._isName = false;

        this._lastStartType.push(StartType.Array);

        // reset item count
        this._itemCounter = 0; 
    } 

    /*
        Add item to an array.
    */
    public Item(text: string): void
    {
        let lastType = this._lastStartType[this._lastStartType.length - 1];

        if(lastType == StartType.Array)
        {
            if(this._itemCounter > 0)
            {
                this.Append(",");
                this.appendEmptySpace();
            }
            
            this.Append(text);

            this._itemCounter++;
        }
        else
        {
            DEBUG.Browser.Error("Item function can only be called after Array function was called.");
        }
    }

    /*
        Add text item to an array.
    */
    public TextItem(text: string): void
    {
        let lastType = this._lastStartType[this._lastStartType.length - 1];

        if(lastType == StartType.Array)
        {
            if(this._itemCounter > 0)
            {
                this.Append(",");
                this.appendEmptySpace();
            }
            
            this.Append('"');
            this.Append(text);
            this.Append('"');

            this._itemCounter++;
        }
        else
        {
            DEBUG.Browser.Error("TextItem function can only be called after Array function was called.");
        }
    }

    /*
        End json array.
    */
    public End(): void
    {
        let lastType = this._lastStartType.pop();

        if(lastType == StartType.Array)
        {
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
        
        this._itemCounter = 0;
    }

    /* 
        Adds the property name and also name/value separator.
    */
    public Name(name: string): void
    {
        if(this._isName == false)
        {
            if(this._itemCounter > 0)
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

            this._itemCounter++;
        }
        else
        {
            DEBUG.Browser.Error("Name has already been added. Builder is expecting value to be added next!");
        }
    }

    /*
        Adds property value.
    */
    public Value(text: string): void
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
                DEBUG.Browser.Error("AddValue has already been called!");
            }
        }
        else
        {
            DEBUG.Browser.Error("Name has not been added yet. Call Name before calling Value!");
        }
    }

    /*
        Adds the property value as a text (uses double quotation marks).
    */
    public TextValue(text: string): void
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
                DEBUG.Browser.Error("AddValue has already been called!");
            }
        }
        else
        {
            DEBUG.Browser.Error("Name has not been added yet. Call Name before calling TextValue!");
        }
    }

    /*
        Returns the json in string format.
    */
    public GetString(): string
    {

        let jsonString = "{";
        jsonString += this._value;

        if(this._makeReadable == true)
        {
            jsonString += "\n";
        }

        jsonString += "}";

        return jsonString;
    }
}

/*
    Enums for start type.
*/
enum StartType {
    Object = 1,
    Array = 2,
}

