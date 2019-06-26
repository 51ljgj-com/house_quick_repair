
var tip_CalcYourself = "请自行计算尺寸 ！ ";
var tip_PaperTypeError = "选择纸张类型不一致 ！ ";

function ComposeItem(){
    this.composeId = '';
    this.composeItemNo = 1;
    this.composeItemRowNo = 1;
    this.composeItemColNo = 1;
    this.composeWidth = 0;
    this.composeLength = 0;
    this.composetargetObj = null;
    this.realComposeLength = 0;
    this.realComposeWidth = 0;
    this.perItemValue = '';
    this.composeItemPlusValue = '';
    this.composeItemName = '';
    this.composeItemPrice = 0;
    this.selectMode = 0;
    this.theoryPaperNo = 0;
    this.realPaperNo=0;
    this.composeArea = 0;
    this.selectPaperItemArr = new Dictionary();
};

ComposeItem.prototype.AddSelectPaper = function AddSelectPaper(pid)
{
    composeArr.add(pid,true);
}

ComposeItem.prototype.removeSelectPaper = function removeSelectPaper(pid)
{
    composeArr.remove(pid,true);
}

//点击是否启用选择框

ComposeItem.prototype.checkboxOnclick = function checkboxOnclick(obj){
       if(this.selectPaperItemArr == null)
       {
           this.selectPaperItemArr = new Dictionary();
       }
       else
       {
           this.selectPaperItemArr.clear();
       }
       var paperitemids="";
       var stetNo = 0;
       var that = this;
       $(obj).parent().children(":input").each(function(){
           if (this.checked == true){
               //Action for checked
               var pid= $(this).attr("paperitemid");//获取id属性
               that.selectPaperItemArr.add(pid,true);
               stetNo++;
           }
       });
   
       var modeError = 0;
       var sizeError = 0;
       var length = 0;
       var width = 0;
       var paperMode = 0;
       var index = 0;
       this.selectMode = 0;
       for (var key in this.selectPaperItemArr.datastore) {
            var pitm1 = paperItemsArr.find(key);
           
           if(index == 0)
           {
               paperMode = pitm1.paperMode;
               length = pitm1.realLength;
               width = pitm1.realWidth;
   
               currentSelectPaperL = length;
               currentSelectPaperW = width;
           }else
           {
               if(paperMode != pitm1.paperMode)
               {
                   modeError = -1;
                   this.selectMode = -1;
                   break;
               }
   
               if(length != pitm1.realLength || width != pitm1.realWidth) {
                   sizeError = -1;
                   this.selectMode = -2;
                   break;
               }
           }
           index++;
           this.selectMode ++;
       }
   
       var tipObj= $(obj).parent().parent().children('.composeEditDiv').children('.tipDiv');
       var editDivObj= $(obj).parent().parent().children('.composeEditDiv').children('.composeEditContentDiv').children('.composeEditSizeDiv');
       //配件纸张实际宽(读取数据并显示)×竖排格(默认1)=排版理论宽(显示数据)
       if(modeError == -1)
       {
           $(tipObj).text(tip_PaperTypeError);
           $(tipObj).show();
           $(editDivObj).hide();
       }
       else if(sizeError == -1)
       {
           $(tipObj).text(tip_CalcYourself);
           $(tipObj).show();
           $(editDivObj).hide();
       }
       else
       {
           if(index ==0)
           {
               $(tipObj).hide();
               $(editDivObj).hide();
           }
           else
           {
               var el = "配件纸张实际长 :"+ length+ "* <input class='chuxueInput' type='text' name='lname' value='1' />(横排/个)= <label> "+ length + "（理论长）mm </label>";  
               var ew = "配件纸张实际宽 :"+ width+ "* <input class='chuxueInput' type='text' name='lname' value='1' />(竖排/个)= <label> "+ width + "（理论宽）mm </label>";  
   
               $(editDivObj).children('.paperLengthDiv').html(el);
               $(editDivObj).children('.paperWidthDiv').html(ew);

               var lSpn = $(editDivObj).children('.paperLengthDiv').children("label");
               $(editDivObj).children('.paperLengthDiv').children(":input").keyup(function(ev){
                    that.updateLNo(this.value,this,lSpn);
               });

               var wSpn = $(editDivObj).children('.paperWidthDiv').children("label");
               $(editDivObj).children('.paperWidthDiv').children(":input").keyup(function(ev){
                    that.updateWNo(this.value,this,wSpn);
                });

               $(editDivObj).show();
               $(tipObj).hide();
           }
       }
   }

ComposeItem.prototype.init =  function init(obj)
{
    var tophtml = '名称: <input class="componseNameInput"  type="text" name="lname" /> &nbsp;&nbsp;&nbsp;加放量: <input class="componsePlusLengthInput" type="text" name="lname" />(%) ';
    $(obj).children('.composingCenterDiv').children('.composingTopEditDiv').append(tophtml);

    var that = this;

    $(obj).children('.composingCenterDiv').children('.composingTopEditDiv').children('.componseNameInput').keyup(function(ev){
        that.updateComposeItemName(this.value,this);
    });

    
    $(obj).children('.composingCenterDiv').children('.composingTopEditDiv').children('.componsePlusLengthInput').keyup(function(ev){
        that.updateComposeItemPlusValue(this.value,this);
    });


    $('.newPaperItem').each(function(){
        var namestr = $(this).children('.leftNoDiv').text();
        var itemid = $(this).attr('id');
        var htmlobj = '	<input name='+ namestr + ' paperitemid= \''+ itemid +'\' type="checkbox" class="composeCheck" value="1"> <label  for=\''+ namestr +'\'>'+ namestr  +'</label>'

        $(obj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv').append(htmlobj);
      
        $(obj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv').children(':input').click(
            function(ev) { 
                that.checkboxOnclick(this); 
            });
        this.composetargetObj = obj;
    });

    var srt = '<div>纸张长度<input class="composeRealLInput" type="text" name="lname" value="0" "/> (mm)</div><div>纸张宽度<input class="composeRealWInput" type="text" name="wname" value="0" />(mm)</div>'
    var editRealDivObj= $(obj).children('.composingCenterDiv').children('.composeEditDiv').children('.composeEditContentDiv').children('.composeEditRealSize');

    $(editRealDivObj).append(srt);

    $(editRealDivObj).children('div').children('.composeRealLInput').keyup(function(ev){
        that.updateComposeRealL(this.value,this);
    });

    $(editRealDivObj).children('div').children('.composeRealWInput').keyup(function(ev){
        that.updateComposeRealW(this.value,this);
    });
}

ComposeItem.prototype.updateComposeItemName = function updateComposeItemName(v,obj)
{
    this.composeItemName = v;
}

ComposeItem.prototype.updateComposeItemPlusValue = function updateComposeItemPlusValue(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.composeItemPlusValue = v;
}

ComposeItem.prototype.updateLNo =function updateLNo(v,obj,targetObj)
{   
    obj.value =v.replace(/\D/g,'');

    this.composeItemColNo = v;

    $(targetObj).text(currentSelectPaperL*v  + "（理论宽）mm ");
}

ComposeItem.prototype.updateWNo = function updateWNo(v,obj,targetObj)
{
    obj.value =v.replace(/\D/g,'');
    this.composeItemRowNo = v;
   $(targetObj).text(currentSelectPaperW*v  + "（理论宽）mm ");

}

ComposeItem.prototype.updateComposeRealL = function updateComposeRealL(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.realComposeLength = v;

}

ComposeItem.prototype.updateComposeRealW =function updateComposeRealW(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.realComposeWidth = v;
}

ComposeItem.prototype.calc = function calc()
{
    var n = gCreateProduceNum;
    var area = this.realComposeLength*this.realComposeWidth*1.0/1000000;
    this.composeArea = area;

    this.theoryPaperNo = Math.ceil(gCreateProduceNum * 1.0 /Math.ceil((this.composeItemRowNo * this.composeItemColNo *1.0/this.selectMode )));
  
    this.realPaperNo =  Math.ceil( this.theoryPaperNo +    this.theoryPaperNo*this.composeItemPlusValue*1.0/100);

    var SumPrice = area * gPaperPersquare * this.realPaperNo;
    var prePrice = SumPrice*1.0/gCreateProduceNum;

   var types = '<div class="tableCeilClass composePriceItem"> 排版： '+ this.composeItemNo +'</div>';
   var names = '<div class="tableCeilClass composePriceItem"> '+ this.composeItemName +'</div>';
   var sumP = '<div class="tableCeilClass composePriceItem"> '+ SumPrice.toFixed(2); +'</div>';
   var perp = '<div class="tableCeilClass composePriceItem"> '+ prePrice.toFixed(2); +'</div>';
   
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





