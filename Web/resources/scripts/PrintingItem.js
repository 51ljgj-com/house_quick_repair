var printingId = "";
var colorMode = 1;
var colorStaticValue = 0.0;
var colorDynamicValue = 0.0;
var printSlideNo = 1;

function PrintingItem()
{
    this.printingId = printingId;
    this.colorMode = colorMode;
    this.colorStaticValue = colorStaticValue;
    this.colorDynamicValue = colorDynamicValue;
    this.printSlideNo = printSlideNo;
    this.setComposeDropBox = setComposeDropBox;
    this.initPrinting = initPrinting;
}

function initPrinting()
{
    var st = $("#"+this.printingId).children('.printingCenterDiv').children('.printingEditDiv').children('.printingEditContentDiv').children('.slideCheckBoxDiv');
    
    var htmlObj = "<input type='checkbox' value='single' checked='checked' onclick='checkslideBoxclick(this)' />单面 <input type='checkbox' value='double' onclick='checkslideBoxclick(this)'  />双面";

    $(st).append(htmlObj);
    
}

function checkslideBoxclick(obj)
{
    $(obj).parent().children('input[type="checkbox"]').each(function(){

        if(obj == this)
        {
            $(this).attr('checked','checked');

            if($(this).value == "single")
            {
                this.printSlideNo = 1;
            }
            else
            {
                this.printSlideNo = 2;
            }
        }
        else
        {
            $(this).removeAttr('checked');
        }
    }
    );

}

function setComposeDropBox(arrobj,id)
{
    var downdropArr = new Array();

    var objSelectet = $('#'+this.printingId).children('.printingCenterDiv').children('.printingCheckBoxEditDiv').children('div').children('.ComposeSelect');
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
