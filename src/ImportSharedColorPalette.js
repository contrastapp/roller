import {rgbToHex} from './common.js'

export default function onRun(context) {

  var doc = context.document;
  var sharedStyles = doc.documentData().layerStyles();
  var numberOfSharedStyles = Number(sharedStyles.numberOfSharedStyles());

  //create array to hold existing styles for reference later
  var existingStyles = [];

  //if there are exisitng styles push them to array
  if(numberOfSharedStyles > 0){
    for (var i = 0; i < sharedStyles.numberOfSharedStyles(); i++){
      layerStyle = sharedStyles.objects().objectAtIndex(i);
      var styleName = String(layerStyle.name());
      existingStyles.push(styleName);
    }
  }

  //create panel for user to select file
  var open = NSOpenPanel.openPanel();
  // var t = [NSString stringWithFormat: @ "%@", text],
  // var t = NSString.stringWithFormat("%@", text)
  // var fileTypes = [NSArray arrayWithObjects:@"json",nil];
  var fileTypes = NSArray.arrayWithObjects("%@", "json",nil);
  open.setAllowedFileTypes(fileTypes);
  open.setCanChooseDirectories(true);
  open.setCanChooseFiles(true);
  open.setCanCreateDirectories(true);
  open.setTitle("Import a Color Palette");
  open.setPrompt("Import Palette");
  open.runModal();

  //impor the selected file and parse to JSON object
  var filePath = open.URLs().firstObject().path();
  var fileContents = NSString.stringWithContentsOfFile(filePath);
  var paletteContents = JSON.parse(fileContents);

  //create array to hold JSON object for easy reference
  var palette = [];

  for(var x in paletteContents){
    palette.push(paletteContents[x]);
  }

  updateSharedStyles(doc, sharedStyles, palette, existingStyles, filePath);

}

function updateSharedStyles(doc, sharedStyles, palette, existingStyles, filePath){

  //create array for Document colors
  var documentColors = [];

  for(var i = 0; i < palette.length; i++){

    for(var z = 0; z < palette[i].length; z++){

      //get the values we need from the palette array
      var colorName = palette[i][z].name;
      var colorValue = palette[i][z].value;
      var colorExists = false;

      //if there are existing styles, check if they are the same as the ones imported
      if(existingStyles.length > 0){
        var colorExists = checkIfExists(colorName, existingStyles);
      }

      //clear out the existing document colors
      doc.documentData().assets().setColors([]);

      //create a color variable out of the colorValue so we can add it to the color array
      var color = colorFromString(colorValue);
      log(color);
      documentColors.push(color);

      //set the documents colors with the imported colors
      doc.documentData().assets().setColors(documentColors);

      if(colorExists == false){

        //create a new style with fill and add it to the shared styles list
        var style = MSStyle.alloc().init();
        var fill = style.addStylePartOfType(0);
        fill.color = colorFromString(colorValue);
        sharedStyles.addSharedStyleWithName_firstInstance(colorName,style);

      } else {

        for (var k = 0; k < sharedStyles.numberOfSharedStyles(); k++){

          var layerStyle = sharedStyles.objects().objectAtIndex(k);
          var styleName = String(layerStyle.name());

          //checks if the name of the imported color is the same as the existing
          if(styleName == colorName){

            var fill = layerStyle.valueGeneric().fills().firstObject();
            var oldFill = String("#" + fill.colorGeneric().hexValue());
            var styleIndex = k;

            //checks if the existing color value is different than the imported one
            if(oldFill != colorValue){
              //change the fill color of the shared style
              fill.color = colorFromString(colorValue);
              //create a color to be added to the Document colors
              var color = colorFromString(colorValue);
              //reference the ID of the style to be able to update existing styles later
              var styleID = layerStyle.objectID();
              //update all layers using this same ID
              updateAllExistingStyles(doc, styleID, sharedStyles, k);
            }
          }
        }
      }
      //refresh the inspector to show updates
      doc.reloadInspector();
    }
  }
  //alert user import is complete
  var alertMessage = filePath+" imported!";
  alert("Shared Color Palette Imported!", alertMessage);
}

function updateAllExistingStyles(doc, styleID, sharedStyles, index){
	//reference the pages array in the document
	var pages = doc.pages;

  for (var i = 0; i < pages.count(); i++){
		//reference each page
		var page = pages[i];
		//reference the artboards array of each page
		var artboards = page.artboards;

		//loop through the artboards of each page
		for (var z = 0; z < artboards.count(); z++){
			//reference each artboard of each page
			var artboard = artboards[z];
			//reference the layers array of each artboard
			var layers = artboard.layers;

			//loop through the layers array
			for(var k = 0; k < layers.count(); k++){
				//reference each layer of each artboard
				var layer = layers[k];
				//get the objectID of the shared style
				var objectID = layer.style().sharedObjectID();
        //get the existing shared style
        var style = sharedStyles.objects().objectAtIndex(index);

        //check if the layer is using the older version of the shared style and refresh it with the new one
        if(objectID == styleID){
          layer.setStyle(style.newInstance());
        }
			}
		}
	}
}
