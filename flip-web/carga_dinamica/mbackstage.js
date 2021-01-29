//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////// BACKSTAGE ///////////////////////////////////////////////////////////

var respuesta;
var _html;
$(document).ready(function () {
   // alert(urlbase_api);
    $.ajax({
        type: 'POST',
        url: urlbase_api +"Post/SeeHomeBackstage",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
         
            respuesta = JSON.parse(data);
           // console.log(respuesta.item[0]);

            //carga escritorio 
            $("#img-backstage-01").attr("src", respuesta.item[0].photoSlider);
            $("#p-backstage-01").text(respuesta.item[0].description);
            $("#d-backstage-01").html(respuesta.item[0].whatIstitle);
            $("#d-backstage-02").html(respuesta.item[0].whatIstitle);
            $("#RoomB").html(respuesta.item[0].membershipTitle);
            $("#membre").html(respuesta.item[0].membershipTitle);
            var divsfaq= "";
            for (var i = 0; i < respuesta.item[0].faqs.length; i++)
            {
                divsfaq +=  "<div style='background: #EBE7E6;'>"+respuesta.item[0].faqs[i].question+"</div>";
                divsfaq += "<div>"+respuesta.item[0].faqs[i].answer+"</div>"

            }
            $("#d-faqs-01").html(divsfaq);
            //carga mobil
            $("#d-mbackstage-03").html(respuesta.item[0].membershipTitle);
            $("#img-mbackstage-01").attr("src", respuesta.item[0].photoMobileSlider);
            $("#p-mbackstage-01").text(respuesta.item[0].description);
            $("#queescoliving").html(respuesta.item[0].whatIstitle);
           // $("#d-mbackstage-02").html(respuesta.item[0].whatIstitle);
            $("#d-mbackstage-04").html(respuesta.item[0].membershipTitle);

            $("#d-faqs-01").html(divsfaq);
        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });

   

    $.ajax({
        type: 'POST',
        url: urlbase_api +"Post/SeeBackstageMembershipSections",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log("========MEMBERSHIP====>");
            console.log(respuesta);
             let plantilla = `<div class="carousel-inner" style="height: 625px;">`;
           
            for(let i = 0; i < respuesta.item.length; i++){
                let itemactual = respuesta.item[i];
                console.log("item actual ====>>> ", itemactual);
                var iconos;
                //iconos
                for(j = 0; j < itemactual.backstageMembershipItems.length; j++){
                    let iconoactual = itemactual.backstageMembershipItems[j];
                    iconos +=  `<div class="col-xs-6 icondiv" style="text-align: left">
                                   <label data-target="#myCarousel6" data-slide-to="1" class="">
                                       <a href="#">
                                           <img id="micon-01-03-01" class="iconsback" src="${iconoactual.icon}" onmouseover="this.src='${iconoactual.icon2}'" onmouseout="this.src='${iconoactual.icon}'" border="0" alt="">
                                       </a>&nbsp;
                                       <span id="mlabel-01-03-01">${iconoactual.titleIcon}</span>
                                   </label> 
                                   </div> `;
                }
            //
                if(i == 0){
                    plantilla +=`<div class="item active">`;
                }else{
                     plantilla +=`<div class="item">`;
                }
           plantilla += `
                                                            <img id="img-mwhat-01" src="${itemactual.photoMobileSlider}" style="object-fit: cover; height: 100%;" alt="Los Angeles">
                                                            <div class="header-text" style="    top: 30%!important; height: 100%">
                                                                <div class="col-md-12  paddtop ">
                                                                    <span>
                                                                        <div class="row"> 
                                                                            
                                                                            <div class="col-sm-6 " style="padding:0px; ">
                                                                                <h2>
                                                                                    <span id="comserv-activetext" class="beneficios-title" style="margin-left: 4%; font-size: 0.75em;">${itemactual.title}</span>
                                                                                </h2> 
                                                                                <br>
                                                                            </div>

                                                                            <div class="col-sm-6 " style="padding:0px; ">
                                                                                ${iconos}
                                                                            </div>
                                                                        </div>
                                                                    </span>
                                                                    <br> 
                                                                </div>
                                                            </div><!-- /header-text -->
                                                        </div>
                                                    `;

            }
                               
            plantilla += `
                          <a style="margin-top:50%; margin-left: 5%;" class="left carousel-control" href="#myCarousel7" data-slide="prev">
                                                        <img src="assets/images/arrow-izqu.png"></a>
                          <a style="margin-top:50%;margin-right: -10%;" class="right carousel-control" href="#myCarousel7" data-slide="next">
                                                    <img src="assets/images/arrow-derecha.png"></a>
                           <a class="fback" style="top:3%; left: 3%;" href="index.html">
                              <span>
                                  <img src="assets/images/F.png" alt="Los Angeles">
                              </span>
                           </a>
                           <a class="fbackclosemobil" style="top:3%; right: 0px; width: 12%; " href="mbackstage.html"></a>
                           <span style="    margin-left: 9%;" class="titlepagesection">
                               <p id="titlepage"></p>
                           </span>
                           </div>`;
        //document.getElementsById("myCarousel7").remove();
       //$('#myCarousel7').html(`${plantilla}`);
        $('#myCarousel6').html(`${plantilla}`);
         
        }, 
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});

function change_image(item) {
    //Imagen que cambia 
    $("#amenidadesrightimg1").attr("src", respuesta.item[item].build);
}

function change_image_movil(item) {
   // console.log(respuesta.item[item].buildmobile);
    //Imagen que cambia 
    $("#amenidadesrightimgm1").attr("src", respuesta.item[item].buildmobile);
}


function getBackstageData() {

    const xhttp = new XMLHttpRequest(),
        ws_data = {
            id: 1
        };

        xhttp.onreadystatechange = function( response ) {

            const result = response.target;

            if( result.readyState == 4 && result.status == 200 ) {

                const ws_data = JSON.parse( result.response );
                
                createContentForWhatIsColiving( ws_data.item );

            }

        }
        xhttp.open('POST',urlbase_api +'Post/SeeBackstageWhatIs', true);
        xhttp.open('POST','http://34.237.214.147/back/api_flip/api/Post/SeeBackstageWhatIs', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function createContentForWhatIsColiving( data_content ) {

    const wi_backstage_container = document.getElementById('wi_backstage');

    console.log("Data sladie coving ====>", data_content);
    
    let slide_html = "";
    data_content.forEach( (slide, index) => {

        slide_html += `<div class="item ${ index == 0 ? 'active' : '' }">
                               <img id ="img-mwhat-01" src="${ slide.photoMobileSlider }"  style="object-fit: cover; height: 100%;" alt="Los Angeles">
                                        <div class="header-text" style="    top: 50%;">
                                              <div class="col-md-12  paddtop ">
                                                    <span>
                                                         <div class="row"> 
                                                              <div style="padding:0px; " class="col-sm-6">
                                                                   <p id="p-mwhat-01" class="textamen" style="margin-top: 4%; margin-left: 4%;">
                                                                    ${ slide.description }
                                                                    </p>
                                                         </div> 
                                                         <br><br>
                                                         <div class="col-xs-6 icondiv" style="text-align: left">
                                                           <label data-target="#myCarousel6" data-slide-to="1" class="">
                                                             <a href="#">
                                                                 <img id="micon-01-03-01" class="iconsback" src="${slide.icon}" onmouseover="this.src='${slide.icon2}'" onmouseout="this.src='${slide.icon}'" border="0" alt="">
                                                             </a>&nbsp;
                                                             <span id="mlabel-01-03-01">${slide.titleIcon}</span>
                                                          </label> 
                                                    </div>
                                            </div>
                                        </span>
                                    <br> 
                                    </div>
                            </div><!-- /header-text -->
                      </div>
        `;

        //wi_backstage_container.innerHTML += slide_html;

        })

    console.log("slide_",slide_html);
    $("#coving").html(`${slide_html}`);
}

function getFlipnetworkData() {

    const xhttp = new XMLHttpRequest(),
        ws_data = {
            userid: 1, 
            id: 1
        };

        xhttp.onreadystatechange = function( response ) {

            const result = response.target;

            if( result.readyState == 4 && result.status == 200 ) {

                const ws_data = JSON.parse( result.response );
                
                console.log('Network ==> ', ws_data);

                mainCardData( ws_data.backStageNetworkSection[0] );

            }

        }
        xhttp.open('POST',urlbase_api +'Post/SeeBacksNetworkSection', true);
        xhttp.open('POST','http://34.237.214.147/back/api_flip/api/Post/SeeBacksNetworkSection', true);
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhttp.send( JSON.stringify( ws_data ) );

}

function mainCardData( card_data ) {

    const fnc_title_container = document.getElementById('fnc_title'),
        fnc_desc_container = document.querySelector('[fnc_desc]');

   // fnc_title_container.innerHTML = card_data.title;
    /*fnc_desc_container.innerHTML = `
        ${ card_data.description }
        <span  id="butredflipmas"class="glyphicon glyphicon-plus pointer" style="font-size: 1.25em; left: 50%; color: white; position: absolute; top: 110%; transform: translate(-50%,-50%);"></span> 
    `;*/

}

getBackstageData();
getFlipnetworkData();