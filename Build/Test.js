"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
const BUILDER = require("./JsonBuilder");
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
            var builder = new BUILDER.JsonBuilder();
            // Start JSON object/document
            builder.Document();
            // Option 1
            builder.Property("Name");
            builder.Text("John");
            // Option 2 (more readable than option 1)
            builder.Property("Age").Number("28");
            // After every Property call, builder assumes value (Text, Number, Object or Array) will come next.
            builder.Property("ID").Number("623213244");
            // Json builder will automatically know what type he must end with End() call!
            builder.Property("Description").Object()
                .Property("Height").Number("178")
                .Property("Width").Number("88")
                .Property("Unit").Text("cm")
                .End();
            builder.Property("Town").Text("Ljubljana");
            // The use of Arrays
            builder.Property("Food").Object()
                .Property("Likes")
                .Array().Text("Pizza").Text("Fries").Text("Ice cream").End()
                .Property("Alergies").Text("None")
                .Property("Dislikes")
                .Array()
                .Text("Hamburger")
                .Text("Salad")
                .Text("Orange")
                .End()
                .End();
            builder.End();
            console.log(builder.GetString());
            console.log(builder.GetJson());
        }
    }
    TEST.Starter = Starter;
})(TEST || (TEST = {}));
