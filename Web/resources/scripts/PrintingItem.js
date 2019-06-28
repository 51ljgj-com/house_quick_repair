
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
    this.selectComposeId = '';
    this.colorMode = 1;
    this.colorStaticValue = 0.0;
    this.colorDynamicValue = 0.0;
    this.printSlideNo = 1;
    this.printNo = 0;
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

    var colorSelectet = $('#'+this.printingId).children('.printingCenterDiv').children('.printingCheckBoxEditDiv').children('.seconddiv').children('.ColorSelect');
    $(colorSelectet).change(function(ev)
    {
        that.colorMode = $(this).val();
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
    var downdropTextArr = new Array();
    var downdropIdArr = new Array();

    var objSelectet = $('#'+this.printingId).children('.printingCenterDiv').children('.printingCheckBoxEditDiv').children('div').children('.ComposeSelect');
    for ( var i = 0; i <arrobj.length; i++){
        var cpit= composeItemsArr.find(arrobj[i]);
        downdropTextArr.push(cpit.composeItemNo);
        downdropIdArr.push(arrobj[i]);
    }
    var that = this;
    $(objSelectet).empty();

    for(var i = 0 ; i < downdropTextArr.length ; i++){ 
      //  var objOption = document.createElement("OPTION");
    //    objOption.text= downdropTextArr[i];
     //   objOption.value=downdropIdArr[i];
        if(i==0)
        {
            that.selectComposeId = downdropIdArr[i];
        }
        $(objSelectet).append("<option value="+ downdropIdArr[i]+">"+downdropTextArr[i]+"</option>");
    }
  

    $(objSelectet).change(function(ev){
        that.selectComposeId = $(this).val();
    });
}

PrintingItem.prototype.calc= function calc() 
{
    var cpit= composeItemsArr.find(this.selectComposeId);

    var theoryPaperNo = cpit.theoryPaperNo;
    var prices = 0;
    if(theoryPaperNo<3000)
    {
        prices = this.colorStaticValue* this.colorMode*this.printSlideNo;
    }
    else
    {
        prices = this.colorDynamicValue* theoryPaperNo * this.colorMode *this.printSlideNo;
    }

    var prePrice = prices/gCreateProduceNum;

   var types = '<div class="tableCeilClass printPriceItem"> 印刷： '+ this.printNo +'</div>';
   var names = '<div class="tableCeilClass printPriceItem"> '+ this.printNo +'</div>';
   var sumP = '<div class="tableCeilClass printPriceItem"> '+ prices.toFixed(2); +'</div>';
   var perp = '<div class="tableCeilClass printPriceItem"> '+ prePrice.toFixed(2); +'</div>';
   
   if(gPriceItemPerfabObj == null)
    {
        gPriceItemPerfabObj = $('.priceItem');

    }

    var newObj = gPriceItemPerfabObj.clone(true).appendTo($('#priceContainer'));
    $(newObj).addClass("newPriceItem");
    $(newObj).append(types);
    $(newObj).append(names);
    $(newObj).append(sumP);
    $(newObj).append(perp);

    $(newObj).show();
}