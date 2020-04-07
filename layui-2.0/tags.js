// 标签组件

    //标签标示id
    var lableId;
    //标签添加数量
    var min = 0;
    //搜索无标签
    var searchLan;

function tagsTemplate(_elem,_type,_data) {
    

    layui.use(['element'], function () {
        var inputTags = layui.inputTags;
        var element = layui.element;
        $ = layui.$;

        //搜索插件
        /*inputTags.render({
            elem:_elem,//定义输入框input对象
            content: [],//默认标签
            aldaBtn: false,//是否开启获取所有数据的按钮
            done: function(value){ //回车后的回调
            }
        });*/

        switch(_type){
            case 'init':
                lableData(_data);
            //搜索标签
            case 'labelSearch':
                lableData(_data);
            break;
            //搜索标签
            case 'labelSearchN':
                lableSearchN(_data)
            break;
            //新增标签
            case 'addLableData':
                addLableDatas(_data);
            break;
            default:
            break;
        }

        //标签计算input数字
        $('body').on('input','.input-second-container .layui-input',function(){
            var input_lable_num = $(this).closest('.inputLables').find('.tagsText').text().trim();
            var input_first_val = $(this).val().trim();
            var _max_number = Number($(this).next().children('.input-max-number').text());
            if(input_first_val.length + input_lable_num.length<= _max_number){
                $(this).next().children('.input-on-number').text(input_first_val.length+input_lable_num.length)
            }else{
                layer.msg('不能超过最大输入数值');
                $(this).val('');
                /*var _limit_number = (input_first_val+input_lable_num).toString().substring(0,_max_number);
                $(this).next().children('.input-on-number').text(_limit_number.length)
                $(this).val(_limit_number)*/
            }
        })

        // 点击标签选中状态
        $('.lableGroup .lable-btn').on('click',function(){
            var max = Number($('.lable-max-number').text());
            var isContain = $(this).hasClass('active');
            if(isContain){
                $(this).removeClass('active');
                lableId = $(this).data('id');
                $('.lable-show .lable-add-btn').each(function(){
                    var eachId = $(this).data('id');
                    if(eachId == lableId){
                        $(this).remove();
                        min = $('.lable-show .lable-add-btn').length;
                        $('.lable-on-number').text(min);
                    }
                });
            }else{
                //min++;
                min = $('.lable-show .lable-add-btn').length;
                console.log(191,min);
                if(min < max){
                    $(this).addClass('active');
                    var text = $(this).text();
                    lableId = $(this).data('id');
                    lableAdd(text,lableId);
                    min = $('.lable-show .lable-add-btn').length;
                    $('.lable-on-number').text(min);
                }else{
                    layer.msg('添加标签已到最大值');
                }
            }
        });

        //删除标签
        $('body').on('click','.lable-show .close',function(){
            var lableClose = $(this).closest('.lable-add-btn').data('id');
            $('.lableGroup .lable-btn').each(function(){
                var eachId = $(this).data('id');
                if(eachId == lableClose){
                    $(this).removeClass('active');
                }
            });
            $(this).closest('.lable-add-btn').remove();
            min = $('.lable-show .lable-add-btn').length;
            $('.lable-on-number').text(min);
        });
    })
}



//添加标签
function lableAdd (text,id) {
    var str = '';
    str += '<button type="button" class="lable-add-btn" data-id="'+ id +'">'+ text +'<i class="layui-icon layui-icon-close close"></i></button>';
    $(".lable-show").append(str);
    height = $('body').height();
}

// 禁止input回车提交
function gosearch(){
    if(window.event.keyCode == 13){
        return false;
    }
};
//标签搜索无
function lableSearchN(data){
    searchLan = data;
    var str = '';
    str += '<div class="noLable">没有查找到相关标签</div>';
    str += '<div class="noLableContent"><button type="button" class="layui-btn layui-btn-normal clickLableAdd">点击新建“'+data+'”标签</button></div>';
    $('.lableGroup').html('');
    $('.lableGroup').append(str);
}
//接收标签数据
function lableData(data){
    var str = '';
    for(var i = 0; i < data.length; i++){
        str += '<button type="button" class="lable-btn layui-btn-primary" data-id="'+data[i].tag_id+'">'+data[i].tag_name+'</button>';
    }
    $('.lableGroup').html('');
    $('.lableGroup').append(str);
}
//新建标签生成
function addLableDatas(data){
    var str = '';
    for(var i = 0; i < data.length; i++){
        str += '<button type="button" class="lable-btn layui-btn-primary" data-id="'+data[i].tag_id+'">'+data[i].tag_name+'</button>';
    }
    $('.lableGroup').html('');
    $('.lableGroup').append(str);
}
//修改赋值方法
function editLableData(data){
    if(data != null){
        $('.lableAdd').find('.lable-on-number').text(data.length);
        $('.lableGroup').find('.lable-btn').each(function(){
            var data_id = $(this).data('id');
            for(var i = 0; i < data.length; i++){
                if(data_id == data[i].tag_id){
                    $(this).addClass('active');
                }
            }
        });
        for(var j = 0; j < data.length; j++){
            lableAdd(data[j].tag_name,data[j].tag_id);
        }
    }
    
}
