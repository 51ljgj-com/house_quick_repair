var tip_CalcYourself = "请自行计算尺寸 ！ ";
var tip_PaperTypeError = "选择纸张类型不一致 ！ ";

var composeId = '';
var composeItemNo = 1;
var composeItemRowNo = 1;
var composeItemColNo = 1;
var composeWidth = 0;
var composeLength = 0;
var composetargetObj = null ;
var selectPaperItemArr = new Dictionary();

function ComposeItem(){
    this.composeId = composeId;
    this.composeItemNo = composeItemNo;
    this.composeItemRowNo = composeItemRowNo;
    this.composeItemColNo = composeItemColNo;
    this.composeWidth = composeWidth;
    this.composeLength = composeLength;
    this.composetargetObj = composetargetObj;
    this.init = init;
    this.checkboxOnclick = checkboxOnclick;
};

function AddSelectPaper(pid)
{
    composeArr.add(pid,true);
}

function removeSelectPaper(pid)
{
    composeArr.remove(pid,true);
}

function init(obj)
{
    $('.newPaperItem').each(function(){

        var namestr = $(this).children('.leftNoDiv').text();
        var itemid = $(this).attr('id');
        var htmlobj = '	<input name='+ namestr + ' paperitemid= \''+ itemid +'\' type="checkbox" class="composeCheck" onclick=\"checkboxOnclick(this)\" value="1"> <label  for=\''+ namestr +'\'>'+ namestr  +'</label>'
        
        $(obj).children('.composingCenterDiv').children('.composingCheckBoxEditDiv').append(htmlobj);
        this.composetargetObj = obj;
    });
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






