var objectLength = 0;
var objectWidth = 0;
var objectHeight = 0;
var itemLength = 0;
var itemWidth = 0;
var currentObjectObj;

var realLength = 0;

var realWidth = 0;

var tip_CalcYourself = "请自行计算尺寸 ！ ";
var tip_PaperTypeError = "选择纸张类型不一致 ！ ";


var composingItemPerfabObj;
var composingCheckBoxPerfabObj;
var composeArr = new Dictionary();

var paperItemsArr = new Dictionary();

function gradeChange(){

    var options=	$("#productTypeSelect");
    var value = options.val();   //拿到选中项的值
    
    $(".baseDiv").each(function(){
        if(value == $(this).attr("id"))
        {
            $(this).show();
            currentObjectObj = $(this);
        
        }
        else
        {
            $(this).hide();
        }
    });
}


 function setDatabase(){

        if(currentObjectObj == null)
        {
            return;
        }
        var dtel = $(currentObjectObj).children("div").children(".length").val();
        var dtew = $(currentObjectObj).children("div").children(".width").val();
        var dteh = $(currentObjectObj).children("div").children(".height").val();

        if(dtel== null|| dtew== null)
        {
            return;
        }

        objectLength = dtel;
        objectWidth = dtew;

        if(dteh== null)
        {
            objectHeight = 0;
        }
        else{
            objectHeight = dteh;
        }

        itemLength = parseInt(objectLength)+objectHeight*2;

        itemWidth = parseInt(objectWidth)+objectHeight*2;

        var divA = $(".realLength");

        realLength = itemLength+12;

        realWidth = itemWidth+12;

        $(".realLength").children('span').text('长度（实际）：'+realLength+'mm = '+itemLength+'(理论)+');

        $(".realWidth").children('span').text('宽度（实际）：'+realWidth+'mm = '+itemWidth+'(理论)+');
        
/*
        divA.innerHTML = "长度（实际）1： 120mm = 100mm（理论）";

        var divB = $("#realWidth");
        divB.innerHTML = "长度（实际）1： 120mm = 100mm（理论）";
*/
 }

var paperyItemPerfabObj;
var paperItemId = 1;

var currentSelectPaperL = 0;
var currentSelectPaperW = 0;

function addPaperItem()
 {
    if(objectLength == 0|| objectWidth == 0)
    {
        return;
    }
    
     if(paperyItemPerfabObj == null)
     {
        paperyItemPerfabObj = $('.paperItem');
     }

    var newObj = paperyItemPerfabObj.clone(true).appendTo('#paperZone');

     $(newObj).show();
     $(newObj).addClass("newPaperItem");
     $(newObj).attr("id","paperid_"+ paperItemId);
     $(newObj).children('.leftNoDiv').text(paperItemId);
     paperItemId++;

     var pitem = new PaperItem();
     pitem.targetObj =  newObj;
     pitem.paperItemId =  $(newObj).attr("id");
     pitem.realLength = realLength;
     pitem.realWidth = realWidth;
     pitem.objectLength = objectLength;
     pitem.objectWidth = objectWidth;
     pitem.objectHeight = objectHeight;
     paperItemsArr.add($(newObj).attr("id"),pitem);

     setAddcomposingItem(true);

 }

 function addcomposingItem()
 {
    if(composingItemPerfabObj == null)
    {
        composingItemPerfabObj = $('.composingItem');
    }

    if(composingCheckBoxPerfabObj == null)
    {
        composingCheckBoxPerfabObj = $('.composeCheck');
    }

    var newObj = composingItemPerfabObj.clone(true).appendTo('#composingZone');
    $(newObj).show();

    $('.newPaperItem').each(function(){

        var namestr = $(this).children('.leftNoDiv').text();
        var itemid = $(this).attr('id');
        var htmlobj = '	<input name='+ namestr + ' paperitemid= \''+ itemid +'\' type="checkbox" class="composeCheck" onclick=\"checkboxOnclick(this)\" value="1"> <label  for=\''+ namestr +'\'>'+ namestr  +'</label>'
     //   var newcheckObj = composingCheckBoxPerfabObj.clone(true).appendTo($(newObj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv'));
     //   $(newcheckObj).show();
     //  $(newcheckObj).text( $(this).children('.leftNoDiv').text());

     //  e += "<input name = 'enable_a' type='checkbox' checked = 'checked' value= '1' style = 'margin: 6px 0px 0px 0px;width: 18px;height: 18px;'  onclick=\"checkboxOnclick(this,"+rowdata.id+")\" >";  

      $(newObj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv').append(htmlobj);
    });
 }

//点击是否启用选择框
function checkboxOnclick(obj){
    
    if(composeArr == null)
    {
        composeArr = new Dictionary();
    }
    else
    {
        composeArr.clear();
    }

    var paperitemids="";
    var stetNo = 0;
    $(obj).parent().children(":input").each(function(){
        if (this.checked == true){
            //Action for checked
            var pid= $(this).attr("paperitemid");//获取id属性
            composeArr.add(pid,true);
            stetNo++;
        }
    });

    var modeError = 0;
    var sizeError = 0;
    var length = 0;
    var width = 0;
    var paperMode = 0;
    var index = 0;

    for (var key in composeArr.datastore) {
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
            }

            if(length != pitm1.realLength || width != pitm1.realWidth) {
                sizeError = -1;
            }
        }
        index++;
    }

    var tipObj= $(obj).parent().parent().children('.composeEditDiv').children('.tipDiv');
    var editDivObj= $(obj).parent().parent().children('.composeEditDiv').children('.composeEditContentDiv');
    //配件纸张实际宽(读取数据并显示)×竖排格(默认1)=排版理论宽(显示数据)
    if(modeError == -1)
    {
        $(tipObj).text(tip_PaperTypeError);
        $(tipObj).show();
        $(editDivObj).hide();
        currentSelectPaperL = 0;
        currentSelectPaperW = 0;
    }
    else if(sizeError == -1)
    {
        $(tipObj).text(tip_CalcYourself);
        $(tipObj).show();
        $(editDivObj).hide();
        currentSelectPaperL = 0;
        currentSelectPaperW = 0;
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
            var el = "配件纸张实际长 :"+ length+ "* <input class='chuxueInput' type='text' name='lname' value='1' onkeyup='updateLNo(this.value,this)'/>(横排/个)= <span> "+ length + "（理论长） </span>";  
            var ew = "配件纸张实际宽 :"+ width+ "* <input class='chuxueInput' type='text' name='lname' value='1' onkeyup='updateWNo(this.value,this)'/>(横排/个)= <span> "+ width + "（理论宽） </span>";  

            $(editDivObj).children('.composeEditSizeDiv').children('.paperLengthDiv').html(el);
            $(editDivObj).children('.composeEditSizeDiv').children('.paperWidthDiv').html(ew);
    
            $(editDivObj).show();
            $(tipObj).hide();
        }
    }
}

///纸张类型选择
function paperTypeChange(obj){

    var paperid =  $(obj).parent().parent().parent().parent().attr("id");
   
    var value = $(obj).val();   //拿到选中项的值
    var pitm = paperItemsArr.find(paperid);
    pitm.paperMode = value;
}

//更新血块自
 function updateRealb(b,obj)
 {
    var paperid =  $(obj).parent().parent().parent().parent().attr("id");

    var pitm = paperItemsArr.find(paperid);
    
    pitm.updateRealblood(b,obj);

 }

//更新卷边
 function updateRealj(j,obj)
 {
    var paperid =  $(obj).parent().parent().parent().parent().attr("id");

    var pitm = paperItemsArr.find(paperid);
    
    pitm.updateRealjuan(j,obj);
 }


 function deletePaperItem(obj)
 {
    $(obj).parent().parent().remove();
    if($(".paperItem").length <2 )
    {
        setAddcomposingItem(false);
        deleteAllComposeItems();
    }

    paperItemsArr.remove($(obj).parent().parent().attr("id"));
 }

 function updateLNo(v,obj)
 {   
    var el = "配件纸张实际长 :"+ currentSelectPaperL+ "* <input class='chuxueInput' type='text' name='lname' value='"+ v+ "' onkeyup='updateLNo(this.value,this)'/>(横排/个)= <span> "+ currentSelectPaperL*v + "（理论长）mm </span>";  

    $(obj).parent().html(el);
 }

 function updateWNo(v,obj)
 {
    var ew = "配件纸张实际宽 :"+ currentSelectPaperW+ "* <input class='chuxueInput' type='text' name='lname' value='"+ v+ "' onkeyup='updateWNo(this.value,this)'/>(横排/个)= <span> "+ currentSelectPaperW*v  + "（理论宽）mm </span>";  

    $(obj).parent().html(ew);
 }

 function setAddcomposingItem(v)
 {
    if(v)
    {
        $("#addcomposingItemBtn").show();
    }
    else
    {
        $("#addcomposingItemBtn").hide();
    }
 }

 function deleteAllComposeItems()
 {
    $('.composingItem').each(function(){
        $(this).remove();
    });
    
 }

 function showComposeTip(obj,str)
 {
    $(obj).text(str);
 }


