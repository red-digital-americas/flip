//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//let params = new URLSearchParams(location.search);
//var buildingidid = params.get('buildingidid');

/////////////////////////////////////// INDEX HOME ///////////////////////////////////////////////////////////
//alert(buildingidid);
$.ajax({
    type: 'POST',
    url: urlbase_api +"Post/SeeHomeIndex2",
    data: JSON.stringify({ userid: 1, buildingidid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);
     // console.log("====================>");
        console.log(respuesta);

        fill_grid_home_images(respuesta);
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// FUNCIONES DE CARGA DINAMICA 1////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// INDEX  HOMES //////////soon0/////////////////////////////////////////////////

function fill_grid_home_images(respuesta) {
     console.log('Fill Grid', respuesta);
    document.getElementById('communitiesflip2x12').src = respuesta.item[0].frontphoto;
    document.getElementById('0_title').innerHTML = respuesta.item[0].title;
    if(respuesta.item[0].direction.length > 0)
    {
        document.getElementById('0_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[0].direction;
    }
        
    if(respuesta.item[0].iscomming) {
        document.getElementById('communitiesflip2x12').style.opacity = "0.7";
        document.getElementById('communitiesflip2x12').style.filter = "grayscale(100%)";
        document.getElementById('soon0').innerHTML = "COOMING SOON";
    }
    else{
        document.getElementById('0_direction').innerHTML
        document.getElementById('soon0').innerHTML = "";
        if(respuesta.item[0].direction.length > 0)
        {
            $("#communitiesflip2x12").click(function () {
                var url = "./maltata.html?buildingid="+respuesta.item[0].id+'&title='+respuesta.item[0].title;
                $(location).attr('href', url);
            });
        }
    }
   // filter: grayscale(1);
   // opacity: .7;

    document.getElementById('commflip2x11').src = respuesta.item[1].frontphoto;
    document.getElementById('1_title').innerHTML = respuesta.item[1].title;
    if(respuesta.item[1].direction.length > 0)
    {
        document.getElementById('1_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[1].direction;
    }
        
     if(respuesta.item[1].iscomming) {
        document.getElementById('commflip2x11').style.opacity = "0.9";
        document.getElementById('commflip2x11').style.filter = "grayscale(100%)";
        document.getElementById('soon1').innerHTML = "COOMING SOON";
    }
    else{
        
        document.getElementById('soon1').innerHTML = "";
        document.getElementById('1_direction').innerHTML
        if(respuesta.item[1].direction.length > 0)
        {
            $("#commflip2x11").click(function () {
                var url = "./maltata.html?buildingid="+respuesta.item[1].id+'&title='+respuesta.item[1].title;
                $(location).attr('href', url);
            });
        }
    }


    document.getElementById('communitiesflip2x13').src = respuesta.item[2].frontphoto;
    document.getElementById('2_title').innerHTML = respuesta.item[2].title;
    if(respuesta.item[2].direction.length > 0)
        {
            document.getElementById('2_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[2].direction;
        }
    if(respuesta.item[2].iscomming) {
        document.getElementById('communitiesflip2x13').style.opacity = "0.7";
        document.getElementById('communitiesflip2x13').style.filter = "grayscale(100%)";
        document.getElementById('soon2').innerHTML = "COOMING SOON";
    }
    else{
        document.getElementById('soon2').innerHTML = "";
        document.getElementById('2_direction').innerHTML
        if(respuesta.item[2].direction.length > 0)
        {
            $("#communitiesflip2x13").click(function () {
                var url = "./maltata.html?buildingid="+respuesta.item[2].id+'&title='+respuesta.item[2].title;
                $(location).attr('href', url);
            });
        }
    }


    document.getElementById('communitiesflip2x14').src = respuesta.item[3].frontphoto;
    document.getElementById('3_title').innerHTML = respuesta.item[3].title;
    if(respuesta.item[3].direction.length > 0)
        {
            document.getElementById('3_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[3].direction;
        }
    if(respuesta.item[3].iscomming) {
        document.getElementById('communitiesflip2x14').style.opacity = "0.7";
        document.getElementById('communitiesflip2x14').style.filter = "grayscale(100%)";
        document.getElementById('soon3').innerHTML = "COOMING SOON";
    }
    else{
        document.getElementById('soon3').innerHTML = "";
        document.getElementById('3_direction').innerHTML
        if(respuesta.item[3].direction.length > 0)
        {
            $("#communitiesflip2x14").click(function () {
                var url = "./maltata.html?buildingid="+respuesta.item[3].id+'&title='+respuesta.item[3].title;
                $(location).attr('href', url);
            });
        }
    }

    if(respuesta.item.length == 4){
        console.log('ENTRO');
        document.getElementById('communitiesflip2x15').src = respuesta.item[4].frontphoto;
        document.getElementById('4_title').innerHTML = respuesta.item[4].title;
        if(respuesta.item[4].direction.length > 0)
            {
                document.getElementById('4_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[4].direction;
            }
        if(respuesta.item[4].iscomming) {
            document.getElementById('communitiesflip2x15').style.opacity = "0.7";
            document.getElementById('communitiesflip2x15').style.filter = "grayscale(100%)";
            document.getElementById('soon4').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon4').innerHTML = "";
            document.getElementById('4_direction').innerHTML
            if(respuesta.item[4].direction.length > 0)
            {
                $("#communitiesflip2x15").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[4].id+'&title='+respuesta.item[4].title;
                    $(location).attr('href', url);
                });
            }
        }
    } 
    else
    {
        document.querySelector('#bulding15').style.display = none;
    }

    if(respuesta.item.length == 5){
        document.getElementById('communitiesflip2x16').src = respuesta.item[5].frontphoto;
        document.getElementById('5_title').innerHTML = respuesta.item[5].title;
        if(respuesta.item[5].direction.length > 0)
            {
                document.getElementById('5_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[5].direction;
            }
        if(respuesta.item[5].iscomming) {
            document.getElementById('communitiesflip2x16').style.opacity = "0.7";
            document.getElementById('communitiesflip2x16').style.filter = "grayscale(100%)";
            document.getElementById('soon5').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon5').innerHTML = "";
            document.getElementById('5_direction').innerHTML
            if(respuesta.item[5].direction.length > 0)
            {
                $("#communitiesflip2x16").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[5].id+'&title='+respuesta.item[5].title;
                    $(location).attr('href', url);
                });
            }
        }
    } 
    else
    {
        document.querySelector('#bulding16').style.display = none;
    }

    if(respuesta.item.length == 6){
        document.getElementById('communitiesflip2x17').src = respuesta.item[6].frontphoto;
        document.getElementById('6_title').innerHTML = respuesta.item[6].title;
        if(respuesta.item[6].direction.length > 0)
            {
                document.getElementById('6_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[6].direction;
            }
        if(respuesta.item[6].iscomming) {
            document.getElementById('communitiesflip2x17').style.opacity = "0.7";
            document.getElementById('communitiesflip2x17').style.filter = "grayscale(100%)";
            document.getElementById('soon6').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon6').innerHTML = "";
            document.getElementById('6_direction').innerHTML
            if(respuesta.item[6].direction.length > 0)
            {
                $("#communitiesflip2x17").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[6].id+'&title='+respuesta.item[6].title;
                    $(location).attr('href', url);
                });
            }
        }
    }
    else
    {
        document.querySelector('#bulding17').style.display = none;
    }

    if(respuesta.item.length == 7){
        document.getElementById('communitiesflip2x18').src = respuesta.item[7].frontphoto;
        document.getElementById('7_title').innerHTML = respuesta.item[7].title;
        if(respuesta.item[7].direction.length > 0)
            {
                document.getElementById('7_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[7].direction;
            }
        if(respuesta.item[7].iscomming) {
            document.getElementById('communitiesflip2x18').style.opacity = "0.7";
            document.getElementById('communitiesflip2x18').style.filter = "grayscale(100%)";
            document.getElementById('soon7').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon7').innerHTML = "";
            document.getElementById('7_direction').innerHTML
            if(respuesta.item[7].direction.length > 0)
            {
                $("#communitiesflip2x18").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[7].id+'&title='+respuesta.item[7].title;
                    $(location).attr('href', url);
                });
            }
        }
    }
    else
    {
        document.querySelector('#bulding17').style.display = none;
    }

    if(respuesta.item.length == 8){
        document.getElementById('communitiesflip2x18').src = respuesta.item[7].frontphoto;
        document.getElementById('7_title').innerHTML = respuesta.item[7].title;
        if(respuesta.item[7].direction.length > 0)
            {
                document.getElementById('7_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[7].direction;
            }
        if(respuesta.item[7].iscomming) {
            document.getElementById('communitiesflip2x18').style.opacity = "0.7";
            document.getElementById('communitiesflip2x18').style.filter = "grayscale(100%)";
            document.getElementById('soon7').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon7').innerHTML = "";
            document.getElementById('7_direction').innerHTML
            if(respuesta.item[7].direction.length > 0)
            {
                $("#communitiesflip2x18").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[7].id+'&title='+respuesta.item[7].title;
                    $(location).attr('href', url);
                });
            }
        }
    }
    else
    {
        document.querySelector('#bulding18').style.display = none;
    }

    if(respuesta.item.length == 9){
        document.getElementById('communitiesflip2x18').src = respuesta.item[7].frontphoto;
        document.getElementById('7_title').innerHTML = respuesta.item[7].title;
        if(respuesta.item[7].direction.length > 0)
            {
                document.getElementById('7_direction').innerHTML =  '<img src="assets/images/gps.svg" alt="Images" style="height: 15px; width: 15px; " /> ' + respuesta.item[7].direction;
            }
        if(respuesta.item[7].iscomming) {
            document.getElementById('communitiesflip2x18').style.opacity = "0.7";
            document.getElementById('communitiesflip2x18').style.filter = "grayscale(100%)";
            document.getElementById('soon7').innerHTML = "COOMING SOON";
        }
        else{
            document.getElementById('soon7').innerHTML = "";
            document.getElementById('7_direction').innerHTML
            if(respuesta.item[7].direction.length > 0)
            {
                $("#communitiesflip2x18").click(function () {
                    var url = "./maltata.html?buildingid="+respuesta.item[7].id+'&title='+respuesta.item[7].title;
                    $(location).attr('href', url);
                });
            }
        }
    }
    else
    {
        document.getElementsByClassName('bulding19').style.display = none;
    }
    
}