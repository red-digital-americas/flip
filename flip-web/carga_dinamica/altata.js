//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// TEAM ///////////////////////////////////////////////////////////

var respuesta;
var _html;
let params = new URLSearchParams(location.search);
var buildingid = params.get('buildingid');

$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: "http://34.237.214.147/back/api_flip/api/Post/SeeHomeGeneral",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log(' ========> ',respuesta);
            $("#img-altata-00").attr("src", respuesta.item[0].frontphoto);
            $("#img-maltata-00").attr("src", respuesta.item[0].photomobile);
            $("#p-altata-00").text(respuesta.item[0].desc);

            $("#img-altata-01").attr("src", respuesta.item[1].frontphoto);
            $("#img-maltata-01").attr("src", respuesta.item[1].photomobile);
            $("#p-altata-01").text(respuesta.item[1].desc);

            $("#img-altata-02").attr("src", respuesta.item[2].frontphoto);
            $("#img-maltata-02").attr("src", respuesta.item[2].photomobile);
            $("#p-altata-02").text(respuesta.item[2].desc);

            $("#img-altata-03").attr("src", respuesta.item[3].frontphoto);
            $("#img-maltata-03").attr("src", respuesta.item[3].photomobile);
            $("#p-altata-03").text(respuesta.item[3].desc);

            $("#img-altata-04").attr("src", respuesta.item[4].frontphoto);
            $("#img-maltata-04").attr("src", respuesta.item[4].photomobile);
            $("#p-altata-04").text(respuesta.item[4].desc);
        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });

    //alert(buildingid)
    $.ajax({
        type: 'POST',
        url: "http://34.237.214.147/back/api_flip/api/Post/SeeHomeAmmenities",
        data: JSON.stringify({ buildingid: buildingid, userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            debugger;
            respuesta = JSON.parse(data);
            console.log('Home 123 ===> ',respuesta.item);

            //$("#img-altata-00").attr("src", respuesta.item[0].build);
            //$("#img-maltata-00").attr("src", respuesta.item[0].buildmobile);
            //IMAGENES
            $("#img-altata-amenities-00").attr("src", respuesta.item[0].frontphoto);
            $("#img-altata-amenities-01").attr("src", respuesta.item[1].frontphoto);
            $("#img-altata-amenities-02").attr("src", respuesta.item[2].frontphoto);
            $("#img-altata-amenities-03").attr("src", respuesta.item[3].frontphoto);
            $("#img-altata-amenities-04").attr("src", respuesta.item[4].frontphoto);

            //ICONOS 1
            $("#amenidadesrightimg1").attr("src", respuesta.item[0].build);
            $("#amenidadesrightimgm1").attr("src", respuesta.item[0].buildmobile);
            
            $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon);
            $("#icon-altata-amenities-slide-00").mouseover(function () {
                $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon2);
            });
            $("#icon-altata-amenities-slide-00").mouseout(function () {
                $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon);
            });

            $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon);
            $("#icon-altata-amenities-slide-01").mouseover(function () {
                $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon2);
            });
            $("#icon-altata-amenities-slide-01").mouseout(function () {
                $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon);
            });

            $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon);
            $("#icon-altata-amenities-slide-02").mouseover(function () {
                $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon2);
            });
            $("#icon-altata-amenities-slide-02").mouseout(function () {
                $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon);
            });

            $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon);
            $("#icon-altata-amenities-slide-03").mouseover(function () {
                $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon2);
            });
            $("#icon-altata-amenities-slide-03").mouseout(function () {
                $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon);
            });

            $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon);
            $("#icon-altata-amenities-slide-04").mouseover(function () {
                $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon2);
            });
            $("#icon-altata-amenities-slide-04").mouseout(function () {
                $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon);
            });

            $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon);
            $("#icon-altata-amenities-slide-05").mouseover(function () {
                $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon2);
            });
            $("#icon-altata-amenities-slide-05").mouseout(function () {
                $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon);
            });

            $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon);
            $("#icon-altata-amenities-slide-06").mouseover(function () {
                $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon2);
            });
            $("#icon-altata-amenities-slide-06").mouseout(function () {
                $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon);
            });

            $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon);
            $("#icon-altata-amenities-slide-07").mouseover(function () {
                $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon2);
            });
            $("#icon-altata-amenities-slide-07").mouseout(function () {
                $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon);
            });

            $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon);
            $("#icon-altata-amenities-slide-08").mouseover(function () {
                $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon2);
            });
            $("#icon-altata-amenities-slide-08").mouseout(function () {
                $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon);
            });

            $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon);
            $("#icon-altata-amenities-slide-09").mouseover(function () {
                $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon2);
            });
            $("#icon-altata-amenities-slide-09").mouseout(function () {
                $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon);
            });

            $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon);
            $("#icon-altata-amenities-slide-10").mouseover(function () {
                $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon2);
            });
            $("#icon-altata-amenities-slide-10").mouseout(function () {
                $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon);
            });

            $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon);
            $("#icon-altata-amenities-slide-11").mouseover(function () {
                $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon2);
            });
            $("#icon-altata-amenities-slide-11").mouseout(function () {
                $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon);
            });

            $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon);
            $("#icon-altata-amenities-slide-012").mouseover(function () {
                $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon2);
            });
            $("#icon-altata-amenities-slide-12").mouseout(function () {
                $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon);
            });

            $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon);
            $("#icon-altata-amenities-slide-13").mouseover(function () {
                $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon2);
            });
            $("#icon-altata-amenities-slide-13").mouseout(function () {
                $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon);
            });

            $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon);
            $("#icon-altata-amenities-slide-14").mouseover(function () {
                $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon2);
            });
            $("#icon-altata-amenities-slide-14").mouseout(function () {
                $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon);
            });

            $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon);
            $("#icon-altata-amenities-slide-15").mouseover(function () {
                $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon2);
            });
            $("#icon-altata-amenities-slide-15").mouseout(function () {
                $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon);
            });

            $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon);
            $("#icon-altata-amenities-slide-16").mouseover(function () {
                $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon2);
            });
            $("#icon-altata-amenities-slide-16").mouseout(function () {
                $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon);
            });

            $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon);
            $("#icon-altata-amenities-slide-17").mouseover(function () {
                $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon2);
            });
            $("#icon-altata-amenities-slide-17").mouseout(function () {
                $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon);
            });

            $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon);
            $("#icon-altata-amenities-slide-18").mouseover(function () {
                $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon2);
            });
            $("#icon-altata-amenities-slide-18").mouseout(function () {
                $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon);
            });

            $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon);
            $("#icon-altata-amenities-slide-19").mouseover(function () {
                $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon2);
            });
            $("#icon-altata-amenities-slide-19").mouseout(function () {
                $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon);
            });

            $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon);
            $("#icon-altata-amenities-slide-20").mouseover(function () {
                $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon2);
            });
            $("#icon-altata-amenities-slide-20").mouseout(function () {
                $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon);
            });

            $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon);
            $("#icon-altata-amenities-slide-21").mouseover(function () {
                $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon2);
            });
            $("#icon-altata-amenities-slide-21").mouseout(function () {
                $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon);
            });

            $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon);
            $("#icon-altata-amenities-slide-22").mouseover(function () {
                $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon2);
            });
            $("#icon-altata-amenities-slide-22").mouseout(function () {
                $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon);
            });

            $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon);
            $("#icon-altata-amenities-slide-23").mouseover(function () {
                $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon2);
            });
            $("#icon-altata-amenities-slide-23").mouseout(function () {
                $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon);
            });

            $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon);
            $("#icon-altata-amenities-slide-24").mouseover(function () {
                $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon2);
            });
            $("#icon-altata-amenities-slide-24").mouseout(function () {
                $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon);
            });


            //DESCRIPCION
            $("#p-altata-desc-00").text(respuesta.item[0].desc);
            $("#p-altata-desc-01").text(respuesta.item[1].desc);
            $("#p-altata-desc-02").text(respuesta.item[2].desc);
            $("#p-altata-desc-03").text(respuesta.item[3].desc);
            $("#p-altata-desc-04").text(respuesta.item[4].desc);

            //Titulo
            $("#p-altata-amenities-title-00").text(respuesta.item[0].title);
            $("#p-altata-amenities-title-01").text(respuesta.item[1].title);
            $("#p-altata-amenities-title-02").text(respuesta.item[2].title);
            $("#p-altata-amenities-title-03").text(respuesta.item[3].title);
            $("#p-altata-amenities-title-04").text(respuesta.item[4].title);


    ////////////////////////////Movil //////////////////////////////////////////////////////////
            $("#img-maltata-amenities-slide-00").attr("src", respuesta.item[0].photomobile);
            $("#img-maltata-amenities-slide-01").attr("src", respuesta.item[1].photomobile);
            $("#img-maltata-amenities-slide-02").attr("src", respuesta.item[2].photomobile);
            $("#img-maltata-amenities-slide-03").attr("src", respuesta.item[3].photomobile);
            $("#img-maltata-amenities-slide-04").attr("src", respuesta.item[4].photomobile);


        }, 
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});

function change_image(item) {
    //Imagen que cambia 
    $("#amenidadesrightimg1").attr("src", respuesta.item[item].build);
}

function change_image_movil(item) {
    console.log(respuesta.item[item].buildmobile);
    //Imagen que cambia 
    $("#amenidadesrightimgm1").attr("src", respuesta.item[item].buildmobile);
}

function getServiceData() {

    const ws_data = { buildingid: 1 }

    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function( response ) {

            const root = response.target;

            if( root.readyState == 4 && root.status == 200 ) {

                const ws_data = JSON.parse( root.responseText ).item;

                appendContentToPage( ws_data );

            }

        };
        xhttp.open('POST','http://34.237.214.147/back/api_flip/api/Post/SeeHomeServicios', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function getRoomsData() {

    const ws_data = { buildingid: 1 }

    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function( response ) {

            const root = response.target;

            if( root.readyState == 4 && root.status == 200 ) {

                const ws_data = JSON.parse( root.responseText ).item;

                for( let index = 0; index < 2; index += 1 ) {
                    
                    console.log('Rooms => ', ws_data[index]);

                }

            }

        };
        xhttp.open('POST','http://34.237.214.147/back/api_flip/api/Post/SeeHomeRoom', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function appendContentToPage( data ) {

    for( let index = 0; index < 4; index += 1 ) {

        const title_section = document.querySelectorAll('[service="name"]')[index],
              description_section = document.querySelectorAll('[service="description"]')[index],
              image_section = document.querySelectorAll('[service="image"]')[index],
              service = data[index];

              title_section.innerHTML = service.title;
              description_section.innerHTML = service.title;
              image_section.src = service.frontphoto;

    }

}

(function () {

    getServiceData();
    getRoomsData();

}());