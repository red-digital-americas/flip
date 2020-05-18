//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////// INDEX HOME ///////////////////////////////////////////////////////////

$.ajax({
    type: 'POST',
    url: "http://34.237.214.147/back/api_flip/api/Post/SeeHomeIndex",
    data: JSON.stringify({ userid: 1, buildingid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);
      
        //console.log(respuesta);

        fill_grid_home_images(respuesta);
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// FUNCIONES DE CARGA DINAMICA 1////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// INDEX  HOMES ///////////////////////////////////////////////////////////

function fill_grid_home_images(respuesta) {
     
    document.getElementById('0_frontphoto').src = respuesta.item[0].frontphoto;
    document.getElementById('0_title').innerHTML = respuesta.item[0].title;
    document.getElementById('0_direction').innerHTML = respuesta.item[0].direction;


    document.getElementById('commflip2x11').src = respuesta.item[1].frontphoto;
    document.getElementById('1_title').innerHTML = respuesta.item[1].title;
    document.getElementById('1_direction').innerHTML = respuesta.item[1].direction;
    document.getElementById('commflip2x11').style.opacity = "0.5";
    document.getElementById('commflip2x11').style.filter = "grayscale(100%)";

    document.getElementById('communitiesflip2x13').src = respuesta.item[2].frontphoto;
    document.getElementById('2_title').innerHTML = respuesta.item[2].title;
    document.getElementById('2_direction').innerHTML = respuesta.item[2].direction;
    document.getElementById('communitiesflip2x13').style.opacity = "0.5";
    document.getElementById('communitiesflip2x13').style.filter = "grayscale(100%)";

    document.getElementById('communitiesflip2x14').src = respuesta.item[3].frontphoto;
    document.getElementById('3_title').innerHTML = respuesta.item[3].title;
    document.getElementById('3_direction').innerHTML = respuesta.item[3].direction;
    document.getElementById('communitiesflip2x14').style.opacity = "0.5";
    document.getElementById('communitiesflip2x14').style.filter = "grayscale(100%)";

    //  for (var i = 0; respuesta.item.length > i; i++) {
    //     if(respuesta.item[i].id == 1)
    //     {
            
    //      document.getElementById('commflip2x1')
    //     }
    //     else{

    //     }
    //  }

    // opacity: .5; -webkit-filter: grayscale(100%); filter: grayscale(100%);  style="font-weight: 500; font-size: 15px; width: 120% ; margin-top: 100%; "
}