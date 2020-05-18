function toggleDiv() {

    /*$("#close").hide();
    $(".slide").animate({right:'-240'},350);
    $("#div"+1).animate({right:'0'},350,function(){$("#close").show();});
    $("#div"+2).animate({right:'0'},350,function(){$("#close").show();});    
    $("#div"+3).animate({right:'0'},350,function(){$("#close").show();});*/
    $('#ComBuild').slideToggle(500);
    $('#indexgrid').stop().slideToggle(500);
    
}

function toggleDivMore() {

    $("#closeMore").hide();
    $(".slideMore").animate({right:'-240'},350);
    $("#div"+4).animate({right:'0'},350,function(){$("#closeMore").show();});
    $("#div"+5).animate({right:'0'},350,function(){$("#closeMore").show();});    
    $("#div"+6).animate({right:'0'},350,function(){$("#closeMore").show();});
    $("#div"+7).animate({right:'0'},350,function(){$("#closeMore").show();});
    $("#div"+8).animate({right:'0'},350,function(){$("#closeMore").show();});
    $("#div"+9).animate({right:'0'},350,function(){$("#closeMore").show();});


}
$(document).ready(function(){
    $("#close").on("click",function(e){
        $(".slide").animate({right:'-280'},350);
        $(this).hide()
    })
    $("#closeMore").on("click",function(e){
        $(".slideMore").animate({right:'-280'},350);
        $(this).hide()
    })

})