var craftId = "";
var craftMode = '1';
var composeNo = "";

function CraftItem()
{
    this.craftId = craftId;
    this.craftMode = craftMode;
    this.composeNo = colorStaticValue;
    this.colorDynamicValue = colorDynamicValue;
    this.printSlideNo = printSlideNo;
    this.setComposeDropBox = setComposeDropBox;
    this.initPrinting = initPrinting;
    this.setCraftComposeDropBox= setCraftComposeDropBox;
}

function setCraftComposeDropBox(arrobj,id)
{
    var downdropArr = new Array();

    var objSelectet = $('#'+this.craftId).children('.craftEditDiv').children('.craftEditContentDiv').children('.craftSelectComposeDropbox').children('.ComposeSelect');
    for ( var i = 0; i <arrobj.length; i++){
        var cpit= composeItemsArr.find(arrobj[i]);
        downdropArr.push(cpit.composeItemNo);
    }

    $(objSelectet).empty();

    for(var i = 0 ; i < downdropArr.length ; i++){ 
        var objOption = document.createElement("OPTION");
        objOption.text= downdropArr[i];
        objOption.value=downdropArr[i];

        $(objSelectet).append("<option value="+ downdropArr[i]+">"+downdropArr[i]+"</option>");
    }
}
