//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var respuesta;
var _html;
let params = new URLSearchParams(location.search);
var buildingid = params.get('buildingid');
var title = params.get('title');
$(document).ready(function () {
$('#titlepage').html(`${title}`);
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

    const ws_data = { buildingid: params.get('buildingid') }

    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function( response ) {

            const root = response.target;

            if( root.readyState == 4 && root.status == 200 ) {

                const ws_data = JSON.parse( root.responseText ).item;

                appendRoomContentToPage( ws_data );

            }

        };
        xhttp.open('POST',urlbase_api +'Post/SeeHomeRoom', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function appendRoomContentToPage( rooms_data ) {
    console.log('Rooms data', rooms_data);
    for( let index = 0; index < rooms_data.length; index += 1 ) {

    
        let room = rooms_data[index];
        //let tittle = document.querySelectorAll("#comserv-activetext")[index];
        let descripcion = document.querySelectorAll(".textamen")[index];
             // console.log("=>>>",tittle);
       
            if(index == 0){
                $('#texttileA').text(room.title);
                $('#price1A').html(`$ ${room.price} <br> ${room.descPrice}`);
                $('#price2A').html(`$ ${room.price1} <br> ${room.descPrice1}`);
            }else{
                $('#texttileB').text(room.title);
                $('#price1B').html(`$ ${room.price} <br> ${room.descPrice}`);
                $('#price2B').html(`$ ${room.price1} <br> ${room.descPrice1}`);
            }
           sliderRoomContent( room.photos, index );
           sliderViewVideo( room.view360, index );

        

    }

}

function sliderViewVideo( video_url ,index ) {

    const view_video_button = document.getElementsByClassName(`view_video_${ index }`),
          modal_video_container = document.getElementById('modal-video'),
          modal_video_close_button = document.getElementById('modal_video_close'),
          video_frame_container = document.getElementById('video_frame');

    console.log(video_url);
    if( view_video_button != undefined ) {

        for( let button_index = 0; button_index < view_video_button.length; button_index += 1 ) {

            view_video_button[button_index].onclick = function() {

                modal_video_container.classList.remove('display-none');
                modal_video_close_button.onclick = function() {

        modal_video_container.classList.add('display-none');
        video_frame_container.src = '#';

    }
                video_frame_container.src = getUrlVideoToEmbed( video_url );

            }            

        }

    }

    /*modal_video_close_button.onclick = function() {

        modal_video_container.classList.add('display-none');
        video_frame_container.src = '#';

    }*/

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
    console.log('Photos', photos);
    console.log('Index', index);
    
    let plantilla  = "";
    let plantilla2 = "";
    for( let slide_index = 0; slide_index < photos.length; slide_index += 1 ) {

        if( photos[slide_index] != undefined ) {
            //console.log('Index', photos[slide_index]);
            if(slide_index == 0){
                plantilla += `<div class="item active ">`;
            }else{
                plantilla += `<div class="item ">`;
            }
            plantilla += `
                             <img src="${photos[slide_index].photoMobile}" alt="Los Angeles">
                           </div>`;
                
            if(index == 0){
                plantilla2 += `<label  data-target="#myCarousel7" data-slide-to="${slide_index}"  class="">`;
            }else{
                 plantilla2 += `<label  data-target="#myCarousel8" data-slide-to="${slide_index}"  class="">`
            }
            plantilla2 += `
                                 <a href="#">
                                     <img  class="iconscom" src="${photos[slide_index].icon}" 
                                            onmouseover="this.src='${photos[slide_index].icon2}'"
                                            onmouseout="this.src='${photos[slide_index].icon}'"
                                            border="0" alt=""/>
                                 </a> ${photos[slide_index].titleIcon}  
                           </label> `;
            

        }
           
    }
    if(index == 0){
                $('#a').html(`${plantilla}`);
                $('#iconsA').html(`${plantilla2}`);
               
            }else{
                $('#b').html(`${plantilla}`);
                $('#iconsB').html(`${plantilla2}`);
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