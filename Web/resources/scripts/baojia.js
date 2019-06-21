
/*var objectLength = 0;
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
var selectPaperItemArr = new Dictionary();

var paperItemsArr = new Dictionary();

var composeItemsArr = new Dictionary();

var paperyItemPerfabObj;
var paperItemId = 1;

var currentSelectPaperL = 0;
var currentSelectPaperW = 0;
var composeItemId = 1;
*/


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

    paperItemId++;

     $(newObj).show();
     $(newObj).addClass("newPaperItem");
     $(newObj).attr("id","paperid_"+ paperItemId);
     $(newObj).children('.leftNoDiv').text(paperItemId);
     
     var pitem = new PaperItem();
     pitem.targetObj =  newObj;
     pitem.paperItemId =  $(newObj).attr("id");
     pitem.realLength = realLength;
     pitem.realWidth = realWidth;
     pitem.objectLength = objectLength;
     pitem.objectWidth = objectWidth;
     pitem.objectHeight = objectHeight;
     paperItemsArr.add($(newObj).attr("id"),pitem);
     setAddcomposingBtnActive(true);
 }

 function addcomposingItem()
 {
    if(composingItemPerfabObj == null)
    {
        composingItemPerfabObj = $('.composingItem');
    }

    var newObj = composingItemPerfabObj.clone(true).appendTo('#composingZone');
    $(newObj).attr("id","composeid_"+ composeItemId);
    $(newObj).addClass("newComposeItem");
    $(newObj).show();
    $(newObj).children('.leftNoDiv').text(composeItemId);

    var citem = new ComposeItem();
    citem.composeId = $(newObj).attr("id");
    citem.composeItemNo = composeItemId;

    citem.init(newObj);
    composeItemsArr.add($(newObj).attr("id"),citem);
    setAddPrintingBtnVisible(true);
    composeItemId++;
 }

 function addPrintingItem()
 {
    if(printingItemPerfabObj == null)
    {
        printingItemPerfabObj = $('.printingItem');
    }

    var newObj = printingItemPerfabObj.clone(true).appendTo('#printingZone');
    $(newObj).attr("id","printingid_"+ printingItemId);
    $(newObj).addClass("newPrintingItem");
    $(newObj).show();
    $(newObj).children('.leftNoDiv').text(printingItemId);

    var pritem = new PrintingItem();
    pritem.printingId = $(newObj).attr("id");
    printingItemsArr.add($(newObj).attr("id"),pritem);

    var composeArr=new Array();
    $(".newComposeItem").each(function(){
        composeArr.push($(this).attr('id'));
    });

    printingItemId++;

    pritem.initPrinting();
    pritem.setComposeDropBox(composeArr, pritem.printingId );

    setAddCraftBtnVisible(true);
 }
 
 function addCraftItem()
 {
    if(craftItemPerfabObj == null)
    {
        craftItemPerfabObj = $('.craftItem');
    }

    var newObj = craftItemPerfabObj.clone(true).appendTo('#craftZone');
    $(newObj).attr("id","craftid_"+ gcraftItemId);
    $(newObj).addClass("newCraftItem");
    $(newObj).show();
    $(newObj).children('.leftNoDiv').text(gcraftItemId);

    var pcritem = new CraftItem();
    pcritem.craftId = $(newObj).attr("id");
    gcraftItemsArr.add($(newObj).attr("id"),pcritem);

    var composeArr=new Array();
    $(".newComposeItem").each(function(){
        composeArr.push($(this).attr('id'));
    });

    pcritem.setCraftComposeDropBox(composeArr, pcritem.craftId );

    gcraftItemId++;
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
    
    pitm.updateRealblood(b,obj,12);
 }

//更新卷边
 function updateRealj(j,obj)
 {
    var paperid =  $(obj).parent().parent().parent().parent().attr("id");

    var pitm = paperItemsArr.find(paperid);
    
    pitm.updateRealjuan(j,obj,12);
 }

 function deletePaperItem(obj)
 {
    $(obj).parent().parent().remove();
    if($(".paperItem").length <2 )
    {
        setAddcomposingBtnActive(false);
        deleteAllComposeItems();
    }

    paperItemsArr.remove($(obj).parent().parent().attr("id"));
 }

 function setAddcomposingBtnActive(v)
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
    setAddcomposingBtnActive(false);
    deleteAllPrintItems();

 }

 function deleteComposeItem(obj)
 {
     var cid  =$(obj).parent().parent().attr("id");
    $(obj).parent().parent().remove();
    composeItemsArr.remove(cid);

    if( $(".composingItem").length <2)
    {
       setAddPrintingBtnVisible(false);
       deleteAllPrintItems();
       
    }
 }

 function showComposeTip(obj,str)
 {
    $(obj).text(str);
 }


 function updateStaticColorV(obj,j)
 {
    obj.value =j.replace(/\D/g,'');
    var idb = $(obj).parent().parent().parent().parent().parent().parent().attr("id");

     var printim = printingItemsArr.find(idb);
     printim.colorStaticValue = obj.value;
 }

 function updateDynamicColorV(obj,j)
 {
    obj.value =j.replace(/\D/g,'');
    var idb = $(obj).parent().parent().parent().parent().parent().parent().attr("id");

     var printim = printingItemsArr.find(idb);
     printim.colorDynamicValue = obj.value;
 }

function setAddPrintingBtnVisible(v)
{
    if(v == true)
    {
        $("#addPrintingItemBtn").show();
    }
    else
    {
        $("#addPrintingItemBtn").hide();
    }
}

function deleteAllPrintItems()
{
   $('.printingItem').each(function(){
       $(this).remove();
   });
   setAddPrintingBtnVisible(false);
   deleteAllCraftItems();
}

function deletePrintingItem(obj)
{
    var cid  =$(obj).parent().parent().attr("id");
    $(obj).parent().parent().remove();
    printingItemsArr.remove(cid);

    if( $(".newPrintingItem").length <1)
    {
        setAddCraftBtnVisible(false);
        deleteAllCraftItems();
    }
}

function setAddCraftBtnVisible(v)
{
    if(v == true)
    {
        $("#addCraftItemBtn").show();
    }
    else
    {
        $("#addCraftItemBtn").hide();
    }
}

function deleteAllCraftItems()
{
   $('.newCraftItem').each(function(){
       $(this).remove();
   });
   setAddCraftBtnVisible(false);
   gcraftItemsArr.clear();
}

function deleteCraftItem(obj)
{
    var cid  =$(obj).parent().parent().attr("id");
    $(obj).parent().parent().remove();
    gcraftItemsArr.remove(cid);
}

///纸张类型选择
function craftTypeChange(obj){

    var value = $(obj).val();   //拿到选中项的值
    var composeSelectObj =  $(obj).parent().parent().children('.craftSelectComposeDropbox');
    var mainobj =  $(obj).parent().parent().parent().parent();
    var cfrtim = gcraftItemsArr.find($(mainobj).attr("id"));
    cfrtim.craftMode = $(obj).val();
    
    if(value == 2)
    {
        $(composeSelectObj).show();
    }
    else
    {
        $(composeSelectObj).hide();
    }
}

function craftComposeSelect(obj)
{
    var mainobj =  $(obj).parent().parent().parent().parent();

    var cfrtim = gcraftItemsArr.find($(mainobj).attr("id"));

    cfrtim.composeNo = $(obj).val();
}