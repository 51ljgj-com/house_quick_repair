
/*
var printingId = "";
var colorMode = 1;
var colorStaticValue = 0.0;
var colorDynamicValue = 0.0;
var printSlideNo = 1;
*/

function PrintingItem()
{
    this.printingId = '';
    this.colorMode = 1;
    this.colorStaticValue = 0.0;
    this.colorDynamicValue = 0.0;
    this.printSlideNo = 1;
 //   this.setComposeDropBox = setComposeDropBox;
  //  this.initPrinting = initPrinting;
}

PrintingItem.prototype.initPrinting = function initPrinting()
{
    var st = $("#"+this.printingId).children('.printingCenterDiv').children('.printingEditDiv').children('.printingEditContentDiv').children('.slideCheckBoxDiv');
    
    var htmlObj = "<input class ='singleCheckBox' type='checkbox' value='single' checked='checked' />单面 <input  class ='doubleCheckBox' type='checkbox' value='double'  />双面";

    $(st).append(htmlObj);
    var that = this;
    $(st).children('.singleCheckBox').click(function(ev)
    {
        that.checkslideBoxclick(this);
    });

    $(st).children('.doubleCheckBox').click(function(ev)
    {
        that.checkslideBoxclick(this);
    });
}

PrintingItem.prototype.checkslideBoxclick = function checkslideBoxclick(obj)
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

PrintingItem.prototype.setComposeDropBox = function setComposeDropBox(arrobj,id)
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
