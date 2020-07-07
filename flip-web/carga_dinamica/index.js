//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////// INDEX HOME ///////////////////////////////////////////////////////////

$(document).ready(function () {
    // alert(urlbase_api);
    


$.ajax({
    type: 'POST',
    url: "http://34.237.214.147/back/api_flip/api/Post/SeeIndex",
    data: JSON.stringify({ userid: 1, buildingid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);
        //  //debugger;
        //  console.log(respuesta);

        fill_grid_images(respuesta);
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

$.ajax({
    type: 'POST',
    url: "http://34.237.214.147/back/api_flip/api/Post/SeeDesignIndex",
    data: JSON.stringify({ userid: 1, buildingid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);

         console.log("Desing=>>",respuesta);

        fill_grid_design_images(respuesta);
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

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

$.ajax({
    type: 'POST',
    url: "http://34.237.214.147/back/api_flip/api/Post/SeeMoreIndex",
    data: JSON.stringify({ userid: 1, buildingid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);
        //alert('more');
        //console.log(respuesta);

         fill_grid_more_images(respuesta);
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

$.ajax({
    type: 'POST',
    url: "http://34.237.214.147/back/api_flip/api/Post/SeeSocialNetworks",
    data: JSON.stringify({ userid: 1, buildingid: 1 }),
    contentType: "application/json",
    dataType: "text",

    success: function (data, textStatus, jqXHR) {
        var respuesta = JSON.parse(data);
        //alert('more');
        console.log(respuesta);

        document.getElementById('insta').href = respuesta.item[0].insta;
        document.getElementById('youtube').href = respuesta.item[0].yt;
        document.getElementById('twit').href = respuesta.item[0].tt;
    },
    error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// FUNCIONES DE CARGA DINAMICA ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// INDEX HOME ///////////////////////////////////////////////////////////

var faces = [];
var faces_back = [];
function fill_grid_images(respuesta) {
    faces.push(document.getElementById('frontphoto1'));
    faces.push(document.getElementById('frontphoto2'));
    faces.push(document.getElementById('frontphoto3'));
    faces.push(document.getElementById('frontphoto4'));
    faces.push(document.getElementById('frontphoto5'));
    faces.push(document.getElementById('frontphoto6'));
    faces.push(document.getElementById('frontphoto7'));
    faces.push(document.getElementById('frontphoto8'));
    faces.push(document.getElementById('frontphoto9'));
    faces.push(document.getElementById('frontphoto10'));
    faces.push(document.getElementById('frontphoto11'));
    faces.push(document.getElementById('frontphoto12'));
    faces.push(document.getElementById('frontphoto13'));
    faces.push(document.getElementById('frontphoto14'));
    faces.push(document.getElementById('frontphoto15'));
    // console.log(faces);

    faces_back.push(document.getElementById('backphoto1'));
    faces_back.push(document.getElementById('backphoto2'));
    faces_back.push(document.getElementById('backphoto3'));
    faces_back.push(document.getElementById('backphoto4'));
    faces_back.push(document.getElementById('backphoto5'));
    faces_back.push(document.getElementById('backphoto6'));
    faces_back.push(document.getElementById('backphoto7'));
    faces_back.push(document.getElementById('backphoto8'));
    faces_back.push(document.getElementById('backphoto9'));
    faces_back.push(document.getElementById('backphoto10'));
    faces_back.push(document.getElementById('backphoto11'));
    faces_back.push(document.getElementById('backphoto12'));
    faces_back.push(document.getElementById('backphoto13'));
    faces_back.push(document.getElementById('backphoto14'));
    faces_back.push(document.getElementById('backphoto15'));

    for (var i = 0; respuesta.item.length > i; i++) {
        var id_obj = "frontphoto" + respuesta.item[i].id;
        var id_obj_back = "backphoto" + respuesta.item[i].id;
        var elem = document.getElementById(id_obj);
        var elem_back = document.getElementById(id_obj_back);
        // //debugger;
        if (elem == null || elem == 'undefined') {
            console.log(id_obj + " No existe")
        }
        else {
            //   //debugger;
            var index_ = faces.indexOf(elem);
            if (index_ > -1) {
                faces[index_].src = respuesta.item[i].frontphoto;
            }
        }
        if (elem_back == null || elem_back == 'undefined') {
            console.log(id_obj + " No existe")
        }
        else {
            //   //debugger;
            var index_ = faces_back.indexOf(elem_back);
            if (index_ > -1) {
                faces_back[index_].src = respuesta.item[i].backphoto;
            }
        }
    }
}


/////////////////////////////////////// INDEX  DESIGN ///////////////////////////////////////////////////////////

function fill_grid_design_images(respuesta) {
    //debugger;
    document.getElementById('desigflip2x1').src = respuesta.item[0].frontphoto;
    document.getElementById('designflip2x12').src = respuesta.item[1].frontphoto;
    document.getElementById('designflip2x13').src = respuesta.item[2].frontphoto;
    document.getElementById('designflip2x14').src = respuesta.item[3].frontphoto;
}

/////////////////////////////////////// INDEX  HOMES ///////////////////////////////////////////////////////////

function fill_grid_home_images(respuesta) {
    //debugger;
    document.getElementById('commflip2x1').src = respuesta.item[0].frontphoto;
    document.getElementById('communitiesflip2x12').src = respuesta.item[1].frontphoto;
    document.getElementById('communitiesflip2x13').src = respuesta.item[2].frontphoto;
    document.getElementById('communitiesflip2x14').src = respuesta.item[3].frontphoto;
}

/////////////////////////////////////// INDEX  MORE ///////////////////////////////////////////////////////////

function fill_grid_more_images(respuesta) {
    //debugger;
    document.getElementById('moreflip2x1').src = respuesta.item[0].frontphoto;
    document.getElementById('moreflip2x12').src = respuesta.item[1].frontphoto;
    document.getElementById('moreflip2x1x3').src = respuesta.item[2].frontphoto;
    document.getElementById('moreflip2x14').src = respuesta.item[3].frontphoto;
    document.getElementById('moreflip2x15').src = respuesta.item[4].frontphoto;
    

}