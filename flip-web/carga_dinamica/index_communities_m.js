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
        document.getElementById('3_direction').innerHTML
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
   
}