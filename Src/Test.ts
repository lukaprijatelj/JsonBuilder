import $ = require("jquery")
import * as ANNY from "./JsonBuilder"


$(document).ready(
    function(){
        var tester = new TEST.Starter();
        tester.Run();
    }
);


module TEST
{    
    /*
        Engine structure to ignite.
    */
    export class Starter
    {
        constructor()
        {

        }

        // runs the engine
        public Run(): void
        {
            this.loadFBX();
        }

        private loadFBX(): void
        {
        
            let importer = new ANNY.JsonBuilder();


            importer.Document();
            importer.Name("Oseba");
            importer.Value("12");
            importer.Name("Carica");
            importer.Value("18");
            importer.Name("Carica");
            importer.Object();
            importer.Name("Luka");
            importer.TextValue("Hej hej kdor");
            importer.Name("Joho");
            importer.Value("13");
            importer.Name("Carica");
            importer.Object();
            importer.Name("Luka");
            importer.TextValue("Hej hej kdor");
            importer.Name("Joho");
            importer.Value("13");
            importer.Name("Carica");
            importer.Object();
            importer.Name("Luka");
            importer.TextValue("Hej hej kdor");
            importer.Name("Joho");
            importer.Value("13");
            importer.Name("Tabelica");
            importer.Array();
            importer.Item("12");
            //importer.Item("15");
            //importer.Item("1");
            //importer.TextItem("Hello");
            importer.End();
            importer.End();
            importer.End();
            importer.End();
            importer.End();

            console.log(importer.GetString());


            let vvv =  JSON.parse(importer.GetString());
            console.log(vvv);

        }
    }


}