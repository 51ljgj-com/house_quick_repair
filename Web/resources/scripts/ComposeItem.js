
var tip_CalcYourself = "请自行计算尺寸 ！ ";
var tip_PaperTypeError = "选择纸张类型不一致 ！ ";

var composeId = '';
var composeItemNo = 1;
var composeItemRowNo = 1;
var composeItemColNo = 1;
var composeWidth = 0;
var composeLength = 0;
var composetargetObj = null ;
var composeItemPrice = 0 ;
var composeItemName = '' ;
var composeItemPlusValue = '' ;
var perItemValue = '' ;
var realComposeLength = 0 ;
var realComposeWidth = 0 ;

var selectPaperItemArr = new Dictionary();

function ComposeItem(){
    this.composeId = composeId;
    this.composeItemNo = composeItemNo;
    this.composeItemRowNo = composeItemRowNo;
    this.composeItemColNo = composeItemColNo;
    this.composeWidth = composeWidth;
    this.composeLength = composeLength;
    this.composetargetObj = composetargetObj;
    this.realComposeLength = realComposeLength;
    this.realComposeWidth = realComposeWidth;
    this.perItemValue = perItemValue;
    this.composeItemPlusValue = composeItemPlusValue;
    this.composeItemName = composeItemName;
    this.composeItemPrice = composeItemPrice;
    this.checkboxOnclick = checkboxOnclick;
    this.updateComposeRealL = updateComposeRealL;
    this.updateComposeRealW = updateComposeRealW;
};

function AddSelectPaper(pid)
{
    composeArr.add(pid,true);
}

function removeSelectPaper(pid)
{
    composeArr.remove(pid,true);
}

ComposeItem.prototype.init =  function init(obj)
{
    var tophtml = '名称: <input class="componseNameInput"  onkeyup="updateComposeItemName(this.value,this)" type="text" name="lname" /> &nbsp;&nbsp;&nbsp;加放量: <input class="componsePlusLength" onkeyup="updateComposeItemPlusValue(this.value,this)" type="text" name="lname" />(%) ';
    $(obj).children('.composingCenterDiv').children('.composingTopEditDiv').append(tophtml);
    
    $('.newPaperItem').each(function(){
        var namestr = $(this).children('.leftNoDiv').text();
        var itemid = $(this).attr('id');
        var htmlobj = '	<input name='+ namestr + ' paperitemid= \''+ itemid +'\' type="checkbox" class="composeCheck" onclick=\"checkboxOnclick(this)\" value="1"> <label  for=\''+ namestr +'\'>'+ namestr  +'</label>'

        $(obj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv').append(htmlobj);
        this.composetargetObj = obj;
    });

    var srt = '<div>纸张长度<input class="chuxueInput" type="text" name="lname" value="0" onkeyup="updateComposeRealL(this.value,this)"/> (mm)</div><div>纸张宽度<input class="chuxueInput" type="text" name="wname" value="0" onkeyup="updateComposeRealW(this.value,this)" />(mm)</div>'
    var editRealDivObj= $(obj).children('.composingCenterDiv').children('.composeEditDiv').children('.composeEditContentDiv').children('.composeEditRealSize');

    $(editRealDivObj).append(srt);
}

function updateComposeItemName(v,obj)
{
    this.composeItemName = v;
}

function updateComposeItemPlusValue(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.composeItemPlusValue = v;
}

function updateLNo(v,obj)
{   
    obj.value =v.replace(/\D/g,'');
    var el = "配件纸张实际长 :"+ currentSelectPaperL+ "* <input class='chuxueInput' type='text' name='lname' value='"+ v+ "' onkeyup='updateLNo(this.value,this)'/>(横排/个)= <span> "+ currentSelectPaperL*v + "（理论长）mm </span>";  
    $(obj).parent().html(el);

}

function updateWNo(v,obj)
{
    obj.value =v.replace(/\D/g,'');
   var ew = "配件纸张实际宽 :"+ currentSelectPaperW+ "* <input class='chuxueInput' type='text' name='lname' value='"+ v+ "' onkeyup='updateWNo(this.value,this)'/>(横排/个)= <span> "+ currentSelectPaperW*v  + "（理论宽）mm </span>";  

   $(obj).parent().html(ew);
}

function updateComposeRealL(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.realComposeLength = v;
}

function updateComposeRealW(v,obj)
{
    obj.value =v.replace(/\D/g,'');
    this.realComposeWidth = v;
    alert(this.realComposeWidth);
}

//点击是否启用选择框
function checkboxOnclick(obj){
 //   alert($(obj).parent().parent().parent().attr("id"));
    
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
    $(obj).parent().children(":input").each(function(){
        if (this.checked == true){
            //Action for checked
            var pid= $(this).attr("paperitemid");//获取id属性
            selectPaperItemArr.add(pid,true);
            stetNo++;
        }
    });

    var modeError = 0;
    var sizeError = 0;
    var length = 0;
    var width = 0;
    var paperMode = 0;
    var index = 0;

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
            }

            if(length != pitm1.realLength || width != pitm1.realWidth) {
                sizeError = -1;
            }
        }
        index++;
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
            var el = "配件纸张实际长 :"+ length+ "* <input class='chuxueInput' type='text' name='lname' value='1' onkeyup='updateLNo(this.value,this)'/>(横排/个)= <span> "+ length + "（理论长）mm </span>";  
            var ew = "配件纸张实际宽 :"+ width+ "* <input class='chuxueInput' type='text' name='lname' value='1' onkeyup='updateWNo(this.value,this)'/>(横排/个)= <span> "+ width + "（理论宽）mm </span>";  

            $(editDivObj).children('.paperLengthDiv').html(el);
            $(editDivObj).children('.paperWidthDiv').html(ew);

            $(editDivObj).show();
            $(tipObj).hide();
        }
    }
}

function calc()
{
    var n = gCreateProduceNum;
}





