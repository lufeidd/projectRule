// 展开收缩
$('body').on('click', '.foldAction', function () {
    var body = $(this).parents('body');
    var slideState = '';
    // 展开隐藏图标切换
    if ($(body).hasClass('small')) {
        $(body).removeClass('small').addClass('large');
        slideState = 'large';
    } else {
        $(body).removeClass('large').addClass('small');
        slideState = 'small';
    }
    localStorage.setItem('slideState', slideState);
})
// 文本域第一种限制输入字数
$('body').on('input', '.input-second-container .layui-input', function () {
    var input_first_val = $(this).val().trim();
    var _max_number = Number($(this).next().children('.input-max-number').text());
    if (input_first_val.length <= _max_number) {
        $(this).next().children('.input-on-number').text(input_first_val.length)
    } else {
        var _limit_number = input_first_val.toString().substring(0, _max_number);
        $(this).next().children('.input-on-number').text(_limit_number.length)
        $(this).val(_limit_number)
    }
})
// 选项卡第二种切换
$('body').on('click', '.tab-second-container .tab-second-content', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
})
// 文本域第五种限制输入字数
$('body').on('input', '.input-five-container .layui-textarea', function () {
    var input_first_val = $(this).val().trim();
    var _max_number = Number($(this).parents('.input-five-container').find('.input-max-number').text());
    if (input_first_val.length <= _max_number) {
        $(this).parents('.input-five-container').find('.input-on-number').text(input_first_val.length)
    } else {
        var _limit_number = input_first_val.toString().substring(0, _max_number);
        $(this).parents('.input-five-container').find('.input-on-number').text(_limit_number.length)
        $(this).val(_limit_number)
    }
})


// 搜索组件
function searchTemplate() {

    // layui定义
    // layui.use(['jquery', 'ajaxCascader'], function () {
    //     var $ = layui.jquery;
    //     var cascader = layui.ajaxCascader;

    // 点击高级按钮
    $('body').on('click', '.high-search-btn', function () {
        $(this).parents('.high-search-container').find('.high-search-fold').css('display', 'none')
        $(this).parents('.high-search-container').find('.high-search-open').css('display', 'block')
        if($(this).parents('.high-search-container').parent().attr('data-type') == 'float'){
            $(this).parents('.high-search-container').parent().removeClass('float-right')
            $(this).parents('.high-search-container').parent().prev().removeClass('float-left')
        }
    })
    // 点击收起按钮
    $('body').on('click', '.high-search-fold-btn', function () {
        var _val = $('.high-search-container').find('input[name="keyword"]').val();
        $(this).parents('.high-search-container').find('.high-search-fold').css('display', 'block')
        $(this).parents('.high-search-container').find('.high-search-open').css('display', 'none')
        $(this).parents('.high-search-container').find('input').val('')
        $(this).parents('.high-search-container').find('input[name="keyword"]').val(_val)
        if($(this).parents('.high-search-container').parent().attr('data-type') == 'float'){
            $(this).parents('.high-search-container').parent().addClass('float-right')
            $(this).parents('.high-search-container').parent().prev().addClass('float-left')
        }
    })
    // 监听关键字输入框
    $('body').on('input', 'input[name="keyword"]', function () {
        var _val = $(this).val()
        $(this).parents('.high-search-container').find('input[name="keyword"]').val(_val)
    })
    // 点击重置按钮
    $('body').on('click', '.high-search-reset-btn', function () {
        // console.log(cascader.getChooseData('#demo1')); return
        // input重置
        $(this).parents('.high-search-container').find('input').val('')
        // 选项卡重置
        $(this).parents('.high-search-container').find('.tab-second-container .tab-second-content').removeClass('active')
        $(this).parents('.high-search-container').find('.high-search-fold .tab-second-container').find('.tab-second-content').eq(0).addClass('active')
        $(this).parents('.high-search-container').find('.high-search-open .tab-second-container').find('.tab-second-content').eq(0).addClass('active')
        // 渠道来源重置
        $(this).parents('.high-search-container').find('.from-btn.layui-btn-normal').removeClass('layui-btn-normal').addClass('layui-btn-warm')
        $(this).parents('.high-search-container').find('.from-btn').eq(0).removeClass('layui-btn-warm').addClass('layui-btn-normal')
    })
    // 渠道来源
    $('body').on('click', '.from-btn', function () {
        $(this).removeClass('layui-btn-warm').addClass('layui-btn-normal')
        $(this).siblings().removeClass('layui-btn-normal').addClass('layui-btn-warm')
    })
    // 搜索
    $('body').on('click', '.high-search-result-btn', function () {
        // searchAction();
        // console.log(cascader.getChooseData('#demo1'))
    })
}

// ajaxCascader组件模板
function ajaxCascaderTemplate(_base, _elem, _url, _type) {

    // 配置文件
    layui.config({
        base: _base
        , version: '1.6'
    });
    layui.use(['jquery', 'ajaxCascader'], function () {
        var $ = layui.jquery;
        var cascader = layui.ajaxCascader;

        switch (_type) {
            case 'init':
                // Ajax传参模式
                cascader.load({
                    elem: _elem
                    // ,search: {
                    //     show: true,
                    //     // minLabel: 1,
                    //     // placeholder: '请输入搜索词'
                    // }
                    // ,clear: true  
                    ,width:'471'          
                    , value: 0
                    , getChildren: function (value, callback) {
                        var data = []
                        $.ajax({
                            url: _url + value,
                            type: 'get',
                            success: function (res) {
                                data = res.data;
                                for (var i in data) {
                                    data[i].value = data[i].id;
                                    data[i].label = data[i].name;
                                    delete data[i].id;
                                    delete data[i].name;
                                    data[i].hasChild = true;
                                }
                                callback(data);
                            }
                        });
                    },
                    clicklast: true,
                });
                break;
            case 'default':
                let codeData = [
                    { value: '1', label: '123456' },
                    {
                        value: '2', label: '123457896', children: [
                            { value: '5', label: '456' }
                        ]
                    },
                    { value: '3', label: '333333' },
                ]
                // 直接赋值模式
                cascader.load({
                    elem: _elem,
                    // prop:{
                    //     value:'id',
                    //     label:'name'
                    // }                  
                    data: codeData,
                    clicklast: true,
                    chooseData: ['3']
                });
                break;
            default:
                break;
        }

        // Ajax传参模式
        // cascader.load({
        //     elem: '#demo3'
        //     ,search: {
        //         show: true,
        //         // minLabel: 1,
        //         // placeholder: '请输入搜索词'
        //     }             
        //     ,value: 0
        //     ,getChildren: function(value,callback){  
        //         var data = []               
        //         $.ajax({                         
        //             url:'https://open.gog.cn/appz/region/getRegion/'+value,
        //             type:'get',
        //             success:function(res){
        //                 data = res.data;
        //                 for(var i in data){
        //                     data[i].value = data[i].id;
        //                     data[i].label = data[i].name;
        //                     delete data[i].id;
        //                     delete data[i].name;
        //                     data[i].hasChild = true;
        //                 }
        //                 callback(data);
        //             }
        //         });
        //     },
        //     chooseData: ["520000000000"]
        // });



        // 其他可选参数
        // width:250  //input框宽度
        // height:50  //input框高度
        // placeholder // input框提示词
        // prop:{
        //     value:"value",     // 选择器要获取的字段名称
        //     label:"label",     // 显示时的名称
        //     children:'children' // 子集的名称定义
        // }
        // time:250    // 下拉菜单显示出来的时间
        // showlast:false  // 是否只显示选中的最后一级
        // clicklast:false // 是否最后一级才可点击
        // checkData:['100','200'] // 回显数据

        // // 监听选中的事件
        // cascader.on('click','#demo1',function(data){
        //     // console.log(data)
        //     // 获取当前已选中的数据,可单独使用
        //     cascader.load({
        //         elem: '#demo3'
        //         ,search: {
        //             show: true,
        //             // minLabel: 1,
        //             // placeholder: '请输入搜索词'
        //         }             
        //         ,value: data.value
        //         ,getChildren: function(value,callback){  
        //             var data = []               
        //             $.ajax({                         
        //                 url:'https://open.gog.cn/appz/region/getRegion/'+value,
        //                 type:'get',
        //                 success:function(res){
        //                     data = res.data;
        //                     for(var i in data){
        //                         data[i].value = data[i].id;
        //                         data[i].label = data[i].name;
        //                         delete data[i].id;
        //                         delete data[i].name;
        //                         data[i].hasChild = true;
        //                     }
        //                     callback(data);
        //                 }
        //             });
        //         },
        //         chooseData: []
        //     })
        // });
    });
}