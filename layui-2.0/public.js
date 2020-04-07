(function publicJsUse() {
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
})()
// 列表全选单选关联
layui.use(['element', 'form'], function () {
    var form = layui.form;
    form.on('checkbox(checkAll)', function (data) {
        if(data.elem.checked){
            $(this).parents('.layui-table').find('input[lay-filter="checkChild"]').prop('checked',true)
        }else{
            $(this).parents('.layui-table').find('input[lay-filter="checkChild"]').prop('checked',false)
        }
        form.render();
    })
    form.on('checkbox(checkChild)',function(data){
        var _length = $(this).parents('.layui-table').find('input[lay-filter="checkChild"]');
        var _num = 0;
        for(var i = 0;i < _length.length;i++){
           if($(_length[i]).prop('checked')){
               _num ++ ;
           }
        }

        if(_num == _length.length){
            $(this).parents('.layui-table').find('input[lay-filter="checkAll"]').prop('checked',true);
        }else{
            $(this).parents('.layui-table').find('input[lay-filter="checkAll"]').prop('checked',false);
        }
        form.render();
    })
})
// 搜索组件
function searchTemplate() {

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
function ajaxCascaderTemplate(_elem, _url, _type) {
    // 配置文件
    layui.config({
        base: '../layui-2.0/template/ajaxCascader/'
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
                    // chooseData: ["520000000000", "520100000000"]
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
                    showlast: true,
                    // width: '100%',
                    // height: 30,
                    chooseData: ['3']
                });
                break;
            default:
                break;
        }

    });
}
