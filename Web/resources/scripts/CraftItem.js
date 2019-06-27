
function CraftItem()
{
    this.craftId = '';
    this.craftMode = 1;
    this.composeNo = 1;
    this.selectComposeId = '';
}

CraftItem.prototype.setCraftComposeDropBox = function setCraftComposeDropBox(arrobj,id)
{
    var downdropArr = new Array();
    var downdropidArr = new Array();
    var objSelectet = $('#'+this.craftId).children('.craftEditDiv').children('.craftEditContentDiv').children('.craftSelectComposeDropbox').children('.ComposeSelect');
    for ( var i = 0; i <arrobj.length; i++){
        var cpit= composeItemsArr.find(arrobj[i]);
        downdropArr.push(cpit.composeItemNo);
        downdropidArr.push(arrobj[i]);
    }

    $(objSelectet).empty();
    var that = this;

    for(var i = 0 ; i < downdropArr.length ; i++){ 
     //   var objOption = document.createElement("OPTION");
      //  objOption.text= downdropArr[i];
      //  objOption.value=downdropArr[i];
      if(i==0)
      {
        that.selectComposeId = downdropidArr[i];
      }

        $(objSelectet).append("<option value="+ downdropidArr[i]+">"+downdropArr[i]+"</option>");
    }

    var that = this;
    $(objSelectet).change(function(ev){
        that.selectComposeId = $(this).val();
    });
}


CraftItem.prototype.calc= function calc() 
{
    var cpit= composeItemsArr.find(this.selectComposeId);
    var prices = 0;
    if(this.craftMode == '1')
    {
         prices = gCreateProduceNum * gCraftItemPrice2;
    }
    else
    {
         prices = cpit.realPaperNo * cpit.composeArea * gCraftItemPrice1;
    }
    
    var prePrice = prices/gCreateProduceNum;

   var types = '<div class="tableCeilClass craftPriceItem"> 工艺： '+ this.craftMode +'</div>';
   var names = '<div class="tableCeilClass craftPriceItem"> '+ this.craftMode +'</div>';
   var sumP = '<div class="tableCeilClass craftPriceItem"> '+ prices.toFixed(2); +'</div>';
   var perp = '<div class="tableCeilClass craftPriceItem"> '+ prePrice.toFixed(2); +'</div>';
   
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
