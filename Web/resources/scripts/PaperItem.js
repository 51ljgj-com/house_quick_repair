var paperItemId = '';
var paperName = '纸张';
var paperMode =  'paper1';
var lBoold = 3;
var ljuanbian = 3;
var wBoold = 3;
var wjuanbian = 3;
var theoryLength = 0;
var theoryWidth = 0;
var realLength = 0;
var realWidth = 0;
var targetObj = null;
var objectLength = 0;
var objectHeight = 0;

function PaperItem(){
    this.paperItemId = paperItemId;
    this.paperName = paperName;
    this.paperMode = paperMode;
    this.lBoold = lBoold;
    this.ljuanbian = ljuanbian;
    this.wBoold = wBoold;
    this.wjuanbian = wjuanbian;
    this.theoryLength = theoryLength;
    this.theoryWidth = theoryWidth;
    this.realLength = realLength;
    this.realWidth = realWidth;
    this.targetObj = targetObj;
    this.objectLength = objectLength;
    this.objectHeight = objectLength;
    this.updateRealblood = updateRealbl;
    this.updateRealjuan = updateRealju;
    this.test1 = test1s;
};

function test1s()
{
    alert("enter into test 1 ");
}

function updateRealbl(b,obj,sf)
{
   obj.value =b.replace(/\D/g,'');
   var j = $(obj).parent().children('.juanbianInput').val();
   var parentObjl = $(obj).parent();
   
   if($(parentObjl).attr("class") == "realLength")
   {
       var theoreticalValue  = parseInt(objectLength)+objectHeight*2;
       var real = itemLength+2*b+2*j;
       this.realLength = real;
       $(parentObjl).children('span').text('长度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
   }
   else
   {
       var theoreticalValue  = parseInt(objectWidth)+objectHeight*2;
       var real = itemWidth+2*b+2*j;
       this.realWidth = real;
       $(parentObjl).children('span').text('宽度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
   }
}

function updateRealju(j,obj,sffs)
{
   obj.value =j.replace(/\D/g,'');
   var b = $(obj).parent().children('.chuxueInput').val();
   var parentObjl = $(obj).parent();

   if($(parentObjl).attr("class") == "realLength")
   {
       var theoreticalValue  = parseInt(objectLength)+objectHeight*2;
       var real = itemLength+2*b+2*j;
       this.realLength = real;
       $(parentObjl).children('span').text('长度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
   }
   else
   {
       var theoreticalValue  = parseInt(objectWidth)+objectHeight*2;
       var real = itemWidth+2*b+2*j;
       this.realWidth = real;
       $(parentObjl).children('span').text('宽度（实际）：'+real+'mm = '+theoreticalValue+'(理论)+');
   }
}





