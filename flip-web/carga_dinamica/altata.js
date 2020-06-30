//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// TEAM ///////////////////////////////////////////////////////////

var respuesta;
var _html;
let params = new URLSearchParams(location.search);
var buildingid = params.get('buildingid');
var title = params.get('title');

$(document).ready(function () {
   // debugger;
     $('#titlepage').html(`${title}`);
    $.ajax({
        type: 'POST',
        url: urlbase_api +"Post/SeeHomeGeneral",
        // url: "http://localhost:49314/api/Post/SeeHomeGeneral",
        data: JSON.stringify({ buildingid: buildingid, userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
         //   debugger;
            respuesta = JSON.parse(data);
            console.log(' General ========> ',respuesta);
            let plantilla = "";
            for(let i = 0; i < respuesta.item.length; i++){
                let slide = respuesta.item[i];
                if(i == 0){
                    plantilla += `<div class="item active ">`;
                }else{
                    plantilla += `<div class="item">`;
                }
                plantilla += `   <img src="${slide.frontphoto}" alt="${slide.title}">
                                    <div id="hidegallmap" class="header-text hidden-xs">
                                        <div class="col-md-12  text-center text-design-leftphi">
                                           <br>
                                           <br>
                                           <span>
                                              <p id="p-altata-00" class="paddingright">${slide.desc}</p>
                                           </span>
                                           <br>
                                           <br>
                                         </div>
                                    </div>
                                </div>`;
            }
            $("#generalslides").html(`${plantilla}`);
            $('#textmenuamenidades').text(respuesta.titles[1].name);
            $('#serviceTxt').text(respuesta.titles[0].name);
            $('#roomsTxt').text(respuesta.titles[2].name);
            $('#mapTXT').text(respuesta.titles[3].name)
            $('#btnYellowTXT').text(respuesta.titles[4].name);

        },
        error: function (jqXHR, textStatus, errorThrown) { 
            // debugger;
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
            if (typeof respuesta.item[0] !== 'undefined') {
                $("#img-altata-amenities-00").attr("src", respuesta.item[0].frontphoto);
                
                $("#amenidadesrightimg1").attr("src", respuesta.item[0].build);
                $("#amenidadesrightimgm1").attr("src", respuesta.item[0].buildmobile);
                
                $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon);
                $("#icon-altata-amenities-slide-00").mouseover(function () {
                    $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon2);
                });
                $("#icon-altata-amenities-slide-00").mouseout(function () {
                    $("#icon-altata-amenities-slide-00").attr("src", respuesta.item[0].icon);
                });

                $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon);
                $("#icon-altata-amenities-slide-05").mouseover(function () {
                    $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon2);
                });
                $("#icon-altata-amenities-slide-05").mouseout(function () {
                    $("#icon-altata-amenities-slide-05").attr("src", respuesta.item[0].icon);
                });

                $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon);
                $("#icon-altata-amenities-slide-15").mouseover(function () {
                    $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon2);
                });
                $("#icon-altata-amenities-slide-15").mouseout(function () {
                    $("#icon-altata-amenities-slide-15").attr("src", respuesta.item[0].icon);
                });

                $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon);
                $("#icon-altata-amenities-slide-10").mouseover(function () {
                    $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon2);
                });
                $("#icon-altata-amenities-slide-10").mouseout(function () {
                    $("#icon-altata-amenities-slide-10").attr("src", respuesta.item[0].icon);
                });

                $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon);
                $("#icon-altata-amenities-slide-20").mouseover(function () {
                    $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon2);
                });
                $("#icon-altata-amenities-slide-20").mouseout(function () {
                    $("#icon-altata-amenities-slide-20").attr("src", respuesta.item[0].icon);
                });

                $("#p-altata-desc-00").text(respuesta.item[0].desc);
                $("#p-altata-amenities-title-00").text(respuesta.item[0].title);
                $("#img-maltata-amenities-slide-00").attr("src", respuesta.item[0].photomobile);
             } else {
                $('#img-altata-amenities-00').remove();
                $("#amenidadesrightimg1").remove();
                $("#amenidadesrightimgm1").remove();
                $("#icon-altata-amenities-slide-00").remove();
                $("#icon-altata-amenities-slide-05").remove();
                $("#icon-altata-amenities-slide-15").remove();
                $("#icon-altata-amenities-slide-10").remove();
                $("#icon-altata-amenities-slide-20").remove();
                $("#p-altata-desc-00").remove();
                $("#p-altata-amenities-title-00").remove();
                $("#img-maltata-amenities-slide-00").remove();
                $('#slideAmenities0').remove()
             }
            
            if (typeof respuesta.item[1] !== 'undefined') {
                $("#img-altata-amenities-01").attr("src", respuesta.item[1].frontphoto);
                
                $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon);
                $("#icon-altata-amenities-slide-01").mouseover(function () {
                    $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon2);
                });
                $("#icon-altata-amenities-slide-01").mouseout(function () {
                    $("#icon-altata-amenities-slide-01").attr("src", respuesta.item[1].icon);
                });

                $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon);
                $("#icon-altata-amenities-slide-06").mouseover(function () {
                    $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon2);
                });
                $("#icon-altata-amenities-slide-06").mouseout(function () {
                    $("#icon-altata-amenities-slide-06").attr("src", respuesta.item[1].icon);
                });

                $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon);
                $("#icon-altata-amenities-slide-11").mouseover(function () {
                    $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon2);
                });
                $("#icon-altata-amenities-slide-11").mouseout(function () {
                    $("#icon-altata-amenities-slide-11").attr("src", respuesta.item[1].icon);
                });

                $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon);
                $("#icon-altata-amenities-slide-16").mouseover(function () {
                    $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon2);
                });
                $("#icon-altata-amenities-slide-16").mouseout(function () {
                    $("#icon-altata-amenities-slide-16").attr("src", respuesta.item[1].icon);
                });

                $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon);
                $("#icon-altata-amenities-slide-21").mouseover(function () {
                    $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon2);
                });
                $("#icon-altata-amenities-slide-21").mouseout(function () {
                    $("#icon-altata-amenities-slide-21").attr("src", respuesta.item[1].icon);
                });

                $("#p-altata-amenities-title-01").text(respuesta.item[1].title);
                $("#p-altata-desc-01").text(respuesta.item[1].desc);
                $("#img-maltata-amenities-slide-01").attr("src", respuesta.item[1].photomobile);
            } else {
                $("#img-altata-amenities-01").remove();
                $("#icon-altata-amenities-slide-01").remove();
                $("#icon-altata-amenities-slide-06").remove();
                $("#icon-altata-amenities-slide-11").remove();
                $("#icon-altata-amenities-slide-16").remove();
                $("#icon-altata-amenities-slide-21").remove();
                $("#p-altata-amenities-title-01").remove();
                $("#p-altata-desc-01").remove();
                $("#img-maltata-amenities-slide-01").remove();
                $('#slideAmenities1').remove()
            }
            
            if (typeof respuesta.item[2] !== 'undefined') {
                $("#img-altata-amenities-02").attr("src", respuesta.item[2].frontphoto);

                $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon);
                $("#icon-altata-amenities-slide-02").mouseover(function () {
                    $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon2);
                });
                $("#icon-altata-amenities-slide-02").mouseout(function () {
                    $("#icon-altata-amenities-slide-02").attr("src", respuesta.item[2].icon);
                });

                $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon);
                $("#icon-altata-amenities-slide-07").mouseover(function () {
                    $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon2);
                });
                $("#icon-altata-amenities-slide-07").mouseout(function () {
                    $("#icon-altata-amenities-slide-07").attr("src", respuesta.item[2].icon);
                });

                $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon);
                $("#icon-altata-amenities-slide-012").mouseover(function () {
                    $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon2);
                });
                $("#icon-altata-amenities-slide-12").mouseout(function () {
                    $("#icon-altata-amenities-slide-12").attr("src", respuesta.item[2].icon);
                });

                $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon);
                $("#icon-altata-amenities-slide-17").mouseover(function () {
                    $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon2);
                });
                $("#icon-altata-amenities-slide-17").mouseout(function () {
                    $("#icon-altata-amenities-slide-17").attr("src", respuesta.item[2].icon);
                });

                $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon);
                $("#icon-altata-amenities-slide-22").mouseover(function () {
                    $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon2);
                });
                $("#icon-altata-amenities-slide-22").mouseout(function () {
                    $("#icon-altata-amenities-slide-22").attr("src", respuesta.item[2].icon);
                });

                $("#p-altata-desc-02").text(respuesta.item[2].desc);
                $("#p-altata-amenities-title-02").text(respuesta.item[2].title);
                $("#img-maltata-amenities-slide-02").attr("src", respuesta.item[2].photomobile);
            } else {
                $("#img-altata-amenities-02").remove();
                $("#icon-altata-amenities-slide-02").remove();
                $("#icon-altata-amenities-slide-07").remove();
                $("#icon-altata-amenities-slide-12").remove();
                $("#icon-altata-amenities-slide-17").remove();
                $("#icon-altata-amenities-slide-22").remove();
                $("#p-altata-desc-02").remove();
                $("#p-altata-amenities-title-02").remove();
                $("#img-maltata-amenities-slide-02").remove();
                $('#slideAmenities2').remove()
            }

            if (typeof respuesta.item[3] !== 'undefined') {
                $("#img-altata-amenities-03").attr("src", respuesta.item[3].frontphoto);
                //ICONOS 1
                $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon);
                $("#icon-altata-amenities-slide-03").mouseover(function () {
                    $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon2);
                });
                $("#icon-altata-amenities-slide-03").mouseout(function () {
                    $("#icon-altata-amenities-slide-03").attr("src", respuesta.item[3].icon);
                });

                $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon);
                $("#icon-altata-amenities-slide-08").mouseover(function () {
                    $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon2);
                });
                $("#icon-altata-amenities-slide-08").mouseout(function () {
                    $("#icon-altata-amenities-slide-08").attr("src", respuesta.item[3].icon);
                });

                $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon);
                $("#icon-altata-amenities-slide-13").mouseover(function () {
                    $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon2);
                });
                $("#icon-altata-amenities-slide-13").mouseout(function () {
                    $("#icon-altata-amenities-slide-13").attr("src", respuesta.item[3].icon);
                });

                $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon);
                $("#icon-altata-amenities-slide-18").mouseover(function () {
                    $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon2);
                });
                $("#icon-altata-amenities-slide-18").mouseout(function () {
                    $("#icon-altata-amenities-slide-18").attr("src", respuesta.item[3].icon);
                });

                $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon);
                $("#icon-altata-amenities-slide-23").mouseover(function () {
                    $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon2);
                });
                $("#icon-altata-amenities-slide-23").mouseout(function () {
                    $("#icon-altata-amenities-slide-23").attr("src", respuesta.item[3].icon);
                });
                //DESCRIPCION
                $("#p-altata-desc-03").text(respuesta.item[3].desc);
                //Titulo
                $("#p-altata-amenities-title-03").text(respuesta.item[3].title);
                ////////////////////////////Movil //////////////////////////////////////////////////////////
                $("#img-maltata-amenities-slide-03").attr("src", respuesta.item[3].photomobile);
            } else {
                $("#img-altata-amenities-03").remove();
                $("#icon-altata-amenities-slide-03").remove();
                $("#icon-altata-amenities-slide-08").remove();
                $("#icon-altata-amenities-slide-13").remove();
                $("#icon-altata-amenities-slide-18").remove();
                $("#icon-altata-amenities-slide-23").remove();
                $("#p-altata-desc-03").remove();
                $("#p-altata-amenities-title-03").remove();
                $("#img-maltata-amenities-slide-03").remove();
                $('#slideAmenities3').remove()
            }
            
            if (typeof respuesta.item[4] !== 'undefined') {
                $("#img-altata-amenities-04").attr("src", respuesta.item[4].frontphoto);

                $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon);

                $("#icon-altata-amenities-slide-04").mouseover(function () {
                    $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon2);
                });
                $("#icon-altata-amenities-slide-04").mouseout(function () {
                    $("#icon-altata-amenities-slide-04").attr("src", respuesta.item[4].icon);
                });

                $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon);
                $("#icon-altata-amenities-slide-09").mouseover(function () {
                    $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon2);
                });
                $("#icon-altata-amenities-slide-09").mouseout(function () {
                    $("#icon-altata-amenities-slide-09").attr("src", respuesta.item[4].icon);
                });

                $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon);
                $("#icon-altata-amenities-slide-14").mouseover(function () {
                    $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon2);
                });
                $("#icon-altata-amenities-slide-14").mouseout(function () {
                    $("#icon-altata-amenities-slide-14").attr("src", respuesta.item[4].icon);
                });

                $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon);
                $("#icon-altata-amenities-slide-19").mouseover(function () {
                    $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon2);
                });
                $("#icon-altata-amenities-slide-19").mouseout(function () {
                    $("#icon-altata-amenities-slide-19").attr("src", respuesta.item[4].icon);
                });

                $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon);
                $("#icon-altata-amenities-slide-24").mouseover(function () {
                    $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon2);
                });
                $("#icon-altata-amenities-slide-24").mouseout(function () {
                    $("#icon-altata-amenities-slide-24").attr("src", respuesta.item[4].icon);
                });

                $("#p-altata-desc-04").text(respuesta.item[4].desc);

                $("#p-altata-amenities-title-04").text(respuesta.item[4].title);

                $("#img-maltata-amenities-slide-04").attr("src", respuesta.item[4].photomobile);
            } else {
                $('#img-altata-amenities-04').remove();
                $("#icon-altata-amenities-slide-04").remove();
                $('#icon-altata-amenities-slide-09').remove();
                $('#icon-altata-amenities-slide-14').remove();
                $('#icon-altata-amenities-slide-19').remove();
                $('#icon-altata-amenities-slide-24').remove();
                $('#p-altata-desc-04').remove();
                $('#p-altata-amenities-title-04').remove();
                $('#img-maltata-amenities-slide-04').remove();
                $('#slideAmenities4').remove();
            }
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
        // debugger;
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
// debugger;
                    icons_container.innerHTML += icon_content;

                });

              }

    }

}

function appendRoomContentToPage( rooms_data ) {
    console.log('Rooms Data', rooms_data.length);
    // rooms_data.forEach((element, index) => {
    //     console.log('index', index);
    //     const room = rooms_data[index],
    //           room_card_name = document.querySelectorAll('[room="card_name"]')[index],
    //           room_card_desc_o = document.querySelectorAll('[room="card_desc_one"]')[index],
    //           room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index],
    //         //  room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index],
    //           room_card_prie_o = document.querySelectorAll('[room="card_price_one"]')[index],
    //           room_card_prie_t = document.querySelectorAll('[room="card_price_two"]')[index];
    //     if( room_card_name != undefined ) {

    //         room_card_name.innerHTML = room.title;
    //         room_card_desc_o.innerHTML = `${room.descPrice}<br>
    //                                     <p style="font-weight: 700; font-size: 1.5em;">
    //                                         $ ${room.price}
    //                                         <br>
    //                                     </p>`;
    //         room_card_desc_t.innerHTML = `${room.descPrice1}<br>
    //                                     <p style="font-weight: 700; font-size: 1.5em;">
    //                                         $ ${room.price1}
    //                                         <br>
    //                                     </p>`;

    //         sliderRoomContent( room.photos, index );
    //         sliderViewVideo( room.view360, index );

    //     }
    // });

    for( var index = 0; index < rooms_data.length; index+= 1 ) {
        console.log('index', index);
        const room = rooms_data[index],
              room_card_name = document.querySelectorAll('[room="card_name"]')[index],
              room_card_desc_o = document.querySelectorAll('[room="card_desc_one"]')[index],
              room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index],
            //  room_card_desc_t = document.querySelectorAll('[room="card_desc_two"]')[index],
              room_card_prie_o = document.querySelectorAll('[room="card_price_one"]')[index],
              room_card_prie_t = document.querySelectorAll('[room="card_price_two"]')[index];
        console.log('room_card_name', room_card_name);
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

            sliderRoomContent( room, index );
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

function sliderRoomContent( room, index ) {
    console.log('Photos', room);
    console.log('Photos Index', index);
    var photos = room.photos;
    

let palntilla = `<div class="carousel-inner">`;
    for( let slide_index = 0; slide_index < 4; slide_index += 1 ) {

        if( photos[slide_index] != undefined ) {
            
            if(slide_index == 1){
                 palntilla +=`<div class="item active">`;
            }else{
                palntilla +=`<div class="item">`;
            }
            
            palntilla +=`
                                                        <img src="${photos[slide_index].photo}" alt="Los Angeles" room="slide-image-0">
                                                        <div class="header-text-room">
                                                            <div class="col-md-12  text-center">
                                                                <span class="btn_rooms_span">
                                                                    <button id="booknowbtn" type="button" class="button_menu_rooms btn-form btn" style="margin-right: 20px;">BOOK A TOUR  </button>
                                                                    <button type="button" class="button_menu_rooms  btn-form btn view_video_0">VIEW 360° <hr style="margin-left: 15px;"> </button>
                                                                    <button type="button" id="getguidebtn" class="button_menu_rooms btn-form btn">GET GUIDE  <hr style="margin-left: 15px;"></button>
                                                                </span>
                                                                <br>
                                                                <span>
                                                                    <div class="row">
                                                                        <div class="col-sm-6" style="margin-left: -2%;">
                                                                            <br>
                                                                            <h2 class="aux-back-amen" style="">
                                                                                <span id="comserv-activetext beneficios-title ">
                                                                                    <p style="font-weight: 500; margin-top: 7%;" room="slide-title-0">
                                                                                        ${room.title}
                                                                                    </p>
                                                                                </span>
                                                                            </h2>
                                                                            <p class="textamen" style="margin-top: 5%;" room="slide-desc-0">
                                                                                ${room.desc}
                                                                            </p>
                                                                        </div>
                                                                        <br>

                                                                        <div room="icons-sections-0">
                                                                            <div class="col-sm-3 icondiv" style="margin-top: 50px;">
                                                                                <label data-target="#myCarousel7" data-slide-to="0" class="">
                                                                                    <a href="#">
                                                                                        <img class="iconscom" src="${photos[slide_index].icon}" onmouseover="this.src='${photos[slide_index].icon2}'" onmouseout="this.src='${photos[slide_index].icon}'" border="0" alt="">
                                                                                    </a>
                                                                                    Lorem
                                                                                </label>
                                                                                <br>
                                                                            </div>
                                                                        </div>
                                                                        <br>
                                                                    </div>
                                                                </span>
                                                                <br>
                                                            </div>
                                                        </div><!-- /header-text -->
                                                    </div>

                                                   
                                               

                                               `;
            

           
        }    
    }
    
   
    let contenedor;
    let ape;
    if(index == 0){
        contenedor = document.getElementById("myCarousel7");
        ape = document.getElementById("comroomgallery");
         palntilla += `  </div><!-- Left and right controls -->
                                                <a class="left carousel-control" href="#myCarousel7" data-slide="prev">

                                                    <img src="assets/images/arrow-izqu.png">
                                                </a>
                                                <a class="right carousel-control" href="#myCarousel7" data-slide="next">


                                                    <img src="assets/images/arrow-derecha.png">
                                                </a>`;
        $('#myCarousel7').html(`${palntilla}`);
        
    }else if(index == 1){
        contenedor = document.getElementById("myCarousel8");
       ape = document.getElementById("comroomBgallery");
         palntilla += `  </div><!-- Left and right controls -->
                                                <a class="left carousel-control" href="#myCarousel8" data-slide="prev">

                                                    <img src="assets/images/arrow-izqu.png">
                                                </a>
                                                <a class="right carousel-control" href="#myCarousel8" data-slide="next">


                                                    <img src="assets/images/arrow-derecha.png">
                                                </a>`;
        $('#myCarousel8').html(`${palntilla}`);
    }
    
    
    

}

function getBuildId() {

    let id_build = window.location.search.split('=')[1],
        result = Number( id_build );

    return result;

}

(function IIFE() {

    const build_id = getBuildId(); 

    getServiceData( buildingid );
    getRoomsData( buildingid );
    //getAmmenitiesData( build_id );

}());