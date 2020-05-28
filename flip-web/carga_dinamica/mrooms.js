//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var respuesta;
var _html;
let params = new URLSearchParams(location.search);
var buildingid = params.get('buildingid');

$(document).ready(function () {

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
    getRoomsData( build_id );

}());