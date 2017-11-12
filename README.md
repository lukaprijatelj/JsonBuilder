# JsonBuilder
This is a library for building JSON objects. Library is very simple. It builds JSON object by using string concatenation.

## Referencing (Typescript)
```typescript
import * as BUILDER from "./JsonBuilder"
```

## Usage (Typescript)
```typescript
let builder = new BUILDER.JsonBuilder();
```

## Example
```typescript
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

// end document
builder.End();

// return Json string
let jsonString = builder.GetString();

// reurns Json object
let jsonObject = builder.GetJson();

// print Json string
console.log(jsonString);
```


## Output
```json
{
	"Name":"John",
	"Age":28,
	"ID":623213244,
	"Description":{
		"Height":178,
		"Width":88,
		"Unit":"cm"
	},
	"Town":"Ljubljana",
	"Food":{
		"Likes":[ "Pizza", "Fries", "Ice cream" ],
		"Alergies":"None",
		"Dislikes":[ "Hamburger", "Salad", "Orange" ]
	}
}
```
