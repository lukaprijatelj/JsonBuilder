"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
const ANNY = require("./JsonBuilder");
$(document).ready(function () {
    var tester = new TEST.Starter();
    tester.Run();
});
var TEST;
(function (TEST) {
    /*
        Engine structure to ignite.
    */
    class Starter {
        constructor() {
        }
        // runs the engine
        Run() {
            this.loadFBX();
        }
        loadFBX() {
            let importer = new ANNY.JsonBuilder();
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
            console.log(importer.GetString());
            let vvv = JSON.parse(importer.GetString());
            console.log(vvv);
        }
    }
    TEST.Starter = Starter;
})(TEST || (TEST = {}));
