//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// TEAM ///////////////////////////////////////////////////////////

var respuesta;
var _html;
let params = new URLSearchParams(location.search);
var buildingid = params.get('buildingid');

$(document).ready(function () {
   // debugger;
    $.ajax({
        type: 'POST',
        url: urlbase_api +"Post/SeeHomeGeneral",
       // url: "http://34.237.214.147/back/api_flip/api/Post/SeeHomeGeneral",
        data: JSON.stringify({ buildingid: buildingid, userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
         //   debugger;
            respuesta = JSON.parse(data);
            console.log(' General ========> ',respuesta);
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

        },
        error: function (jqXHR, textStatus, errorThrown) { 
            debugger;
            console.log(jqXHR, textStatus, errorThrown); 
        },
    });

    //alert(buildingid)
    
    $.ajax({
        type: 'POST',
        url: urlbase_api + "Post/SeeHomeAmmenities",
        data: JSON.stringify({ buildingid: buildingid, userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {

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
    $("#amenidadesrightimgm1").attr("src", respuesta.item[item].build);
}

$('.fix-click-left').click(function() { test( 'to_l' ) });
$('.fix-click-right').click(function() { test( 'to_r' ) });

 function test( direction ) {

    const carousel_active = document.getElementById('myCarousel6'),
            carousel_items = carousel_active.querySelector('.carousel-inner').children,
            right_image = document.getElementById('amenidadesrightimg1');

    for( let i = 0; i < carousel_items.length; i += 1 ) {

        if( carousel_items[i].classList.contains('active') ) {

            console.log(carousel_items);

            let index;

            if( direction == 'to_r' ) {

                index = i + 1 == 5 ? 0 : i + 1;

            } else {

                index = i - 1 == -1 ? 4 : i - 1;

            }

            right_image.src = respuesta.item[index].build;

        }

    }

 }


function change_image_movil(item) {
    console.log(respuesta.item[item].buildmobile);
    //Imagen que cambia 
    $("#amenidadesrightimgm1").attr("src", respuesta.item[item].buildmobile);
}

function getServiceData( id_build ) {
//debugger;
    const ws_data = { buildingid: id_build }

    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function( response ) {

            const root = response.target;

            if( root.readyState == 4 && root.status == 200 ) {

                const ws_data = JSON.parse( root.responseText ).item;

                appendContentToPage( ws_data );

            }

        };
        xhttp.open('POST', urlbase_api + 'Post/SeeHomeServicios', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function getRoomsData( id_build ) {

    const ws_data = { buildingid: id_build }

    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function( response ) {

            const root = response.target;

            if( root.readyState == 4 && root.status == 200 ) {

                const ws_data = JSON.parse( root.responseText ).item;

                appendRoomContentToPage( ws_data );

            }

        };
        xhttp.open('POST',urlbase_api + 'Post/SeeHomeRoom', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function appendContentToPage( data ) { 
    
    for( let index = 0; index < 4; index += 1 ) {
        debugger;
        const title_section = document.querySelectorAll('[service="name"]')[index],
              description_section = document.querySelectorAll('[service="description"]')[index],
              image_section = document.querySelectorAll('[service="image"]')[index],
              icons_container = document.querySelectorAll('[service="icons"]')[index],
              service = data[index],
              service_icons_data = service.communitiesServicesWebItems;
        
              title_section.innerHTML = service.title;
              description_section.innerHTML = service.title;
              image_section.src = service.frontphoto;

              if( icons_container != undefined ) {

                service_icons_data.forEach( (icon) => {

                    let icon_content = `<figure class="icons-section__icon">
                                            <img src="${ icon.icon }" class="icons-section__icona" />
                                            <img src="${ icon.icon2 }" class="icons-section__iconb" />
                                            <span class="icons-section__name">
                                                ${ icon.titleIcon }
                                            </span>
                                        </figure>`;
debugger;
                    icons_container.innerHTML += icon_content;

                });

              }

    }

}

function appendRoomContentToPage( rooms_data ) {

    for( let index = 0; index < rooms_data.length; index += 1 ) {

        const room = rooms_data[index],
              room_card_name = document.querySelectorAll('[room="card_name"]')[index],
              room_card_desc_o = document.querySelectorAll('[room="card_desc_one"]')[index],
              room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index];
            //  room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index],
              room_card_prie_o = document.querySelectorAll('[room="card_price_one"]')[index],
              room_card_prie_t = document.querySelectorAll('[room="card_price_two"]')[index];
              
        if( room_card_name != undefined ) {

            room_card_name.innerHTML = room.title;
            room_card_desc_o.innerHTML = `${room.descPrice}<br>
                                        <p style="font-weight: 700; font-size: 1.5em;">
                                            $ ${room.price}
                                            <br>
                                        </p>`;
            room_card_desc_t.innerHTML = `${room.descPrice1}<br>
                                        <p style="font-weight: 700; font-size: 1.5em;">
                                            $ ${room.price1}
                                            <br>
                                        </p>`;

            sliderRoomContent( room.photos, index );
            sliderViewVideo( room.view360, index );

        }

    }

}

function sliderViewVideo( video_url ,index ) {

    const view_video_button = document.getElementsByClassName(`view_video_${ index }`),
          modal_video_container = document.getElementById('modal-video'),
          modal_video_close_button = document.getElementById('modal_video_close'),
          video_frame_container = document.getElementById('video_frame');

    if( view_video_button != undefined ) {

        for( let button_index = 0; button_index < view_video_button.length; button_index += 1 ) {

            view_video_button[button_index].onclick = function() {

                modal_video_container.classList.remove('display-none');
                video_frame_container.src = getUrlVideoToEmbed( video_url );

            }            

        }

    }

    modal_video_close_button.onclick = function() {

        modal_video_container.classList.add('display-none');
        video_frame_container.src = '#';

    }

}

function getUrlVideoToEmbed( video_url ) {

    let video_data = video_url;

    const video_root = video_data.split('&')[0],
          video_as_param = video_root.split('/')[video_root.split('/').length - 1],
          video = video_as_param.split('=')[1],
          video_url_embed = `https://www.youtube.com/embed/${video}`;

    return video_url_embed;

}

function sliderRoomContent( photos, index ) {

    const slider_room_image = document.querySelectorAll(`[room="slide-image-${ index }"]`),
          slider_room_title = document.querySelectorAll(`[room="slide-title-${ index }"]`),
          slider_room_desc = document.querySelectorAll(`[room="slide-desc-${ index }"]`),
          slider_room_icons = document.querySelectorAll(`[room="icons-sections-${ index }"]`);

    for( let slide_index = 0; slide_index < 4; slide_index += 1 ) {

        if( photos[slide_index] != undefined ) {

            slider_room_image[slide_index].src = photos[slide_index].photo;
            slider_room_title[slide_index].innerHTML = `${ photos[slide_index].titleIcon }<br />`;
            slider_room_desc[slide_index].innerHTML = photos[slide_index].titleIcon;

            let icon = `<div class="col-sm-3 icondiv" style="margin-top: 50px;">
                            <label data-target="#myCarousel${ 7 + index }" data-slide-to="0" class="">
                                <a href="#">
                                    <img class="iconscom" src="${ photos[0].icon }"
                                        onmouseover="this.src='${ photos[0].icon2 }'"
                                        onmouseout="this.src='${ photos[0].icon }'"
                                        border="0" alt="" />
                                </a>
                                ${ photos[0].titleIcon }
                            </label>
                            <br>
                            <label data-target="#myCarousel${ 7 + index }" data-slide-to="1" class="">
                                <a href="#">
                                    <img class="iconscom" src="${ photos[1].icon }"
                                        onmouseover="this.src='${ photos[1].icon2 }'"
                                        onmouseout="this.src='${ photos[1].icon }'"
                                        border="0" alt="" />
                                </a> 
                                ${ photos[1].titleIcon }
                            </label>
                        </div>
                        <div class="col-sm-3 icondiv" style="margin-top: 50px;">
                            <label data-target="#myCarousel${ 7 + index }" data-slide-to="2" class="">
                                <a href="#">
                                    <img class="iconscom" src="${ photos[2].icon }"
                                        onmouseover="this.src='${ photos[2].icon2 }'"
                                        onmouseout="this.src='${ photos[2].icon }'"
                                        border="0" alt="" />
                                </a>
                                ${ photos[2].titleIcon }
                            </label>
                            <br>
                            <label data-target="#myCarousel${ 7 + index }" data-slide-to="3" class="">
                                <a href="#">
                                    <img class="iconscom" src="${ photos[3].icon }"
                                        onmouseover="this.src='a${ photos[3].icon2 }'"
                                        onmouseout="this.src='${ photos[3].icon }'"
                                        border="0" alt="" />
                                </a> 
                                ${ photos[3].titleIcon }
                            </label>
                        </div>`;

            slider_room_icons[slide_index].innerHTML = icon;

        }

    }

}

function getBuildId() {

    let id_build = window.location.search.split('=')[1],
        result = Number( id_build );

    return result;

}

(function IIFE() {

    const build_id = getBuildId(); 

    getServiceData( build_id );
    getRoomsData( build_id );
    //getAmmenitiesData( build_id );

}());