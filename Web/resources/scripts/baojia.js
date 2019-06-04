var objectLength = 0;
var objectWidth = 0;
var objectHeight = 0;
var itemLength = 0;
var itemWidth = 0;
var currentObjectObj;
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

function paperTypeChange(){
    var options=	$("#paperTypeSelect");
    var value = options.val();   //拿到选中项的值
}

function paperTypeChange(){
    var options=	$("#paperTypeSelect");
    var value = options.val();   //拿到选中项的值
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

        var realLength = itemLength+12;

        var realWidth = itemWidth+12;

        $(".realLength").children('span').text('长度（实际）：'+realLength+'mm = '+itemLength+'(理论)+');

        $(".realWidth").children('span').text('宽度（实际）：'+realWidth+'mm = '+itemWidth+'(理论)+');
   

/*
        divA.innerHTML = "长度（实际）1： 120mm = 100mm（理论）";

        var divB = $("#realWidth");
        divB.innerHTML = "长度（实际）1： 120mm = 100mm（理论）";
*/
 }

var paperyItemPerfabObj;

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

     paperyItemPerfabObj.clone(true).appendTo('#paperZone').show() ;
 }


 function updateRealb(b,obj)
 {
     
    obj.value =b.replace(/\D/g,'');

    var j = $(obj).parent().children('.juanbianInput').val();
   var parentObjl = $(obj).parent();
    
    if($(parentObjl).attr("class") == "realLength")
    {
        var theoreticalValue  = parseInt(objectLength)+objectHeight*2;
        var real = itemLength+2*b+2*j;

        $(parentObjl).children('span').text('长度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
    }
    else
    {
        var theoreticalValue  = parseInt(objectWidth)+objectHeight*2;
        var real = itemWidth+2*b+2*j;
        $(parentObjl).children('span').text('宽度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
    }
 }

 function updateRealj(j,obj)
 {

    obj.value =j.replace(/\D/g,'');

    var b = $(obj).parent().children('.chuxueInput').val();
  
    var real = itemLength+2*b+2*j;

    var parentObjl = $(obj).parent();
    if($(parentObjl).attr("class") == "realLength")
    {
        var theoreticalValue  = parseInt(objectLength)+objectHeight*2;
        var real = itemLength+2*b+2*j;
        $(parentObjl).children('span').text('长度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
    }
    else
    {
        var theoreticalValue  = parseInt(objectWidth)+objectHeight*2;
        var real = itemWidth+2*b+2*j;
        $(parentObjl).children('span').text('宽度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
    }
 }

 function deletePaperItem(obj)
 {
    $(obj).parent().parent().remove();
 }





