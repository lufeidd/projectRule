(function publicJsUse(){
    // 文本域第一种限制输入字数
    $('body').on('input','.input-second-container .layui-input',function(){
        var input_first_val = $(this).val().trim();
        var _max_number = Number($(this).next().children('.input-max-number').text());
        if(input_first_val.length <= _max_number){
            $(this).next().children('.input-on-number').text(input_first_val.length)
        }else{
            var _limit_number = input_first_val.toString().substring(0,_max_number);
            $(this).next().children('.input-on-number').text(_limit_number.length)
            $(this).val(_limit_number)
        }
    })
    // 选项卡第二种切换
    $('body').on('click','.tab-second-container .tab-second-content',function(){
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
    })
})()