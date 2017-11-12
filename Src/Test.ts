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
            importer.Name("Name").TextValue("John");
            importer.Name("Age").Value("18");
            importer.Name("Description").Object();
            importer.Name("Town").TextValue("Ljubljana");
            importer.Name("ID").Value("623213244");
            importer.Name("Dislikes").Object();
            importer.Name("Food")
                .Array().TextItem("Pizza").TextItem("Fries").TextItem("Ice cream").End();
            importer.Name("Joho").Value("13");
            importer.Name("Carica").Object();
            importer.Name("Luka").TextValue("Hej hej kdor");
            importer.Name("Joho").Value("13");
            importer.Name("Tabelica").Array().Item("12").Item("15").Item("1").TextItem("Hello");
            importer.End().End().End().End();
            importer.End();

            console.log(importer.GetString());


            let vvv =  JSON.parse(importer.GetString());
            console.log(vvv);

        }
    }


}