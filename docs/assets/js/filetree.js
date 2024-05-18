$(document).ready(function () {
    // $('body').find('.tree').fadeOut(0);

    $('.tree-title').click(function () {
        setStatus($(this));
    });
});

/**
 * Set the list opened or closed
 * */
function setStatus(node){
    var elements = [];
    $(node).each(function(){
        elements.push($(node).nextAll());
    });
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].css('display') == 'none'){
            elements[i].fadeIn(0);
        }else{
            elements[i].fadeOut(0);
        }
    }
    if (elements[0].css('display') != 'none') {
        $(node).addClass('active');
    }else{
        $(node).removeClass('active');
    }
}
