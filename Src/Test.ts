import $ = require("jquery")
import * as BUILDER from "./JsonBuilder"


$(document).ready(
    function(){
        TEST.Start();
    }
);


module TEST
{    
    export function Start(): void
    {
        var builder = new BUILDER.JsonBuilder();

        // Start JSON object/document
        builder.Document();

        // Option 1
        builder.Property("Name")
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

        // End json object/document
        builder.End();

        // Print json string
        console.log(builder.GetString());

        // Print json object
        console.log(builder.GetJson());
    }
}