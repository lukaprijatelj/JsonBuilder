export class Browser
{
    // if debugging is enabled in browser
    private static _enabled: boolean = true;



    // writes text in browser command line and adds new line
    static WriteLine(text: string): void
    {
        if(this._enabled === true)
        {
            console.log(text + "\n");
        }
    }

    // writes text in browser command line
    static Write(text: string): void
    {
        if(this._enabled === true)
        {
            console.log(text);
        }
    }

    // write error message
    static Error(text: string): void
    {
        if(this._enabled === true)
        {
            console.log("ERROR: " + text + "\n");
        }
    }

    // write warning message
    static Warning(text: string): void
    {
        if(this._enabled === true)
        {
            console.log("Warning: " + text + "\n");
        }
    }

    // info message
    static Info(text: string): void
    {
        if(this._enabled === true)
        {
            console.log("==== INFO: " + text + "\n");
        }
    }
}