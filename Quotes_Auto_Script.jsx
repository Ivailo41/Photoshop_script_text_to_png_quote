var activeDoc = app.activeDocument;

//set text variable and get its bounds
var mainLayer = activeDoc.artLayers.getByName("Text");

var textBoundLeft = mainLayer.bounds[0].as("px");
var textBoundTop = mainLayer.bounds[1].as("px");
var textBoundRight = mainLayer.bounds[2].as("px");
var textBoundDown = mainLayer.bounds[3].as("px");

//Set watermark variable and get its bounds
var watermark = activeDoc.artLayers.getByName("WaterMark");

var waterBoundLeft = watermark.bounds[0].as("px");
var waterBoundTop = watermark.bounds[1].as("px");
var waterBoundRight = watermark.bounds[2].as("px");
var waterBoundDown = watermark.bounds[3].as("px");

var fileRef = new File("~/Desktop/Quotes/Quotes.txt");

//Opening quotes file and saving them in variable
fileRef.open('r');
var data = fileRef.read();
fileRef.close();

//separates the quotes in an array
data = data.replace( /[\r\n]+/gm, "\r" );
var arrQuotes = data.split("\r;\r");

runScript();

function runScript()
{
    for(i = 1; i <arrQuotes.length; i++)
    {
        prepareQuote(arrQuotes[i - 1]);
    }
    
}


function prepareQuote(quoteText)
{
    var textI = mainLayer.textItem;

    textI.contents = quoteText;
    mainLayer.textItem.justification = Justification.LEFT;

    var citatArr = textI.contents.split("\r");
    var citatLines = citatArr.length;
    
    //Text layer size
    setBounds();
    var posxOffset = (textBoundRight - textBoundLeft)/2;
    var posyOffset = (textBoundDown - textBoundTop)/2;
    
    //Move text layer to center of canvas
    mainLayer.translate(-textBoundLeft + activeDoc.width/2 - posxOffset, -textBoundTop + activeDoc.height/2 - posyOffset);
    setBounds();

    //watermark layer size
    var watermarkWidth = (waterBoundRight - waterBoundLeft);
    var watermarkHeight = (waterBoundDown - waterBoundTop);
    
    //move watermark to the top center of the text
    watermark.textItem.position = Array(textBoundRight - watermarkWidth, textBoundDown + watermarkHeight + 20);

    //export image
    exportImage();
}

function exportImage()
{
    var jpgFile = new File("~/Desktop/Quotes/Quote" + i + ".jpg");
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 12;
        
    activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

//updates the bounds of the text player and watermark layer
function setBounds()
{
    textBoundLeft = mainLayer.bounds[0].as("px");
    textBoundTop = mainLayer.bounds[1].as("px");
    textBoundRight = mainLayer.bounds[2].as("px");
    textBoundDown = mainLayer.bounds[3].as("px");

    waterBoundLeft = watermark.bounds[0].as("px");
    waterBoundTop = watermark.bounds[1].as("px");
    waterBoundRight = watermark.bounds[2].as("px");
    waterBoundDown = watermark.bounds[3].as("px");
}