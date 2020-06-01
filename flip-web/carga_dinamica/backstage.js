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
        url: urlbase_api +"Post/SeeBackstageWhatIs",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);

            $("#p-what-01").text(respuesta.item[0].description);
            $("#img-what-01").attr("src", respuesta.item[0].photoSlider);
            $("#label-01-01-01").text(respuesta.item[0].titleIcon);
            $("#icon-01-01-01").attr("src", respuesta.item[0].icon);
            $("#icon-01-01-01").mouseover(function () {
                $("#icon-01-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#label-01-02-01").text(respuesta.item[1].titleIcon);
            $("#icon-01-02-01").attr("src", respuesta.item[1].icon);
            $("#icon-01-02-01").mouseover(function () {
                $("#icon-01-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#label-01-03-01").text(respuesta.item[2].titleIcon);
            $("#icon-01-03-01").attr("src", respuesta.item[2].icon);
            $("#icon-01-03-01").mouseover(function () {
                $("#icon-01-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#label-01-04-01").text(respuesta.item[3].titleIcon);
            $("#icon-01-04-01").attr("src", respuesta.item[3].icon);
            $("#icon-01-04-01").mouseover(function () {
                $("#icon-01-04-01").attr("src", respuesta.item[3].icon2);
            });



            $("#p-what-02").text(respuesta.item[1].description);
            $("#img-what-02").attr("src", respuesta.item[1].photoSlider);
            $("#label-02-01-01").text(respuesta.item[0].titleIcon);
            $("#icon-02-01-01").attr("src", respuesta.item[0].icon);
            $("#icon-02-01-01").mouseover(function () {
                $("#icon-02-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#label-02-02-01").text(respuesta.item[1].titleIcon);
            $("#icon-02-02-01").attr("src", respuesta.item[1].icon);
            $("#icon-02-02-01").mouseover(function () {
                $("#icon-02-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#label-02-03-01").text(respuesta.item[2].titleIcon);
            $("#icon-02-03-01").attr("src", respuesta.item[2].icon);
            $("#icon-02-03-01").mouseover(function () {
                $("#icon-02-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#label-02-04-01").text(respuesta.item[3].titleIcon);
            $("#icon-02-04-01").attr("src", respuesta.item[3].icon);
            $("#icon-02-04-01").mouseover(function () {
                $("#icon-02-04-01").attr("src", respuesta.item[3].icon2);
            });


            $("#p-what-03").text(respuesta.item[2].description);
            $("#img-what-03").attr("src", respuesta.item[2].photoSlider);
            $("#label-03-01-01").text(respuesta.item[0].titleIcon);
            $("#icon-03-01-01").attr("src", respuesta.item[0].icon);
            $("#icon-03-01-01").mouseover(function () {
                $("#icon-03-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#label-03-02-01").text(respuesta.item[1].titleIcon);
            $("#icon-03-02-01").attr("src", respuesta.item[1].icon);
            $("#icon-03-02-01").mouseover(function () {
                $("#icon-03-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#label-03-03-01").text(respuesta.item[2].titleIcon);
            $("#icon-03-03-01").attr("src", respuesta.item[2].icon);
            $("#icon-03-03-01").mouseover(function () {
                $("#icon-03-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#label-03-04-01").text(respuesta.item[3].titleIcon);
            $("#icon-03-04-01").attr("src", respuesta.item[3].icon);
            $("#icon-03-04-01").mouseover(function () {
                $("#icon-03-04-01").attr("src", respuesta.item[3].icon2);
            });


            $("#p-what-04").text(respuesta.item[3].description);
            $("#img-what-04").attr("src", respuesta.item[3].photoSlider);
            $("#label-04-01-01").text(respuesta.item[0].titleIcon);
            $("#icon-04-01-01").attr("src", respuesta.item[0].icon);
            $("#icon-04-01-01").mouseover(function () {
                $("#icon-04-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#label-04-02-01").text(respuesta.item[1].titleIcon);
            $("#icon-04-02-01").attr("src", respuesta.item[1].icon);
            $("#icon-04-02-01").mouseover(function () {
                $("#icon-04-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#label-04-03-01").text(respuesta.item[2].titleIcon);
            $("#icon-04-03-01").attr("src", respuesta.item[2].icon);
            $("#icon-04-03-01").mouseover(function () {
                $("#icon-04-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#label-04-04-01").text(respuesta.item[3].titleIcon);
            $("#icon-04-04-01").attr("src", respuesta.item[3].icon);
            $("#icon-04-04-01").mouseover(function () {
                $("#icon-04-04-01").attr("src", respuesta.item[3].icon2);
            });


            //MOBIL 
           // textmenuamenidades

            $("#p-mwhat-01").text(respuesta.item[0].description.substring(0, limit_desc_slide_mobil));
            $("#img-mwhat-01").attr("src", respuesta.item[0].photoSlider);
            $("#mlabel-01-01-01").text(respuesta.item[0].titleIcon.substring(0,limit_desc_icon_slide));
            $("#textmenuamenidades").text(respuesta.item[0].membershipTitle);
            $("#micon-01-01-01").attr("src", respuesta.item[0].icon);
            $("#micon-01-01-01").mouseover(function () {
                $("#micon-01-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#mlabel-01-02-01").text(respuesta.item[1].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-01-02-01").attr("src", respuesta.item[1].icon);
            $("#micon-01-02-01").mouseover(function () {
                $("#micon-01-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#mlabel-01-03-01").text(respuesta.item[2].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-01-03-01").attr("src", respuesta.item[2].icon);
            $("#micon-01-03-01").mouseover(function () {
                $("#micon-01-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#mlabel-01-04-01").text(respuesta.item[3].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-01-04-01").attr("src", respuesta.item[3].icon);
            $("#micon-01-04-01").mouseover(function () {
                $("#micon-01-04-01").attr("src", respuesta.item[3].icon2);
            });

           
            $("#p-mwhat-02").text(respuesta.item[1].description.substring(0, limit_desc_slide_mobil));
            $("#img-mwhat-02").attr("src", respuesta.item[1].photoSlider);

            $("#mlabel-02-01-01").text(respuesta.item[0].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-02-01-01").attr("src", respuesta.item[0].icon);
            $("#micon-02-01-01").mouseover(function () {
                $("#micon-02-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#mlabel-02-02-01").text(respuesta.item[1].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-02-02-01").attr("src", respuesta.item[1].icon);
            $("#micon-02-02-01").mouseover(function () {
                $("#micon-02-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#mlabel-02-03-01").text(respuesta.item[2].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-02-03-01").attr("src", respuesta.item[2].icon);
            $("#micon-02-03-01").mouseover(function () {
                $("#micon-02-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#mlabel-02-04-01").text(respuesta.item[3].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-02-04-01").attr("src", respuesta.item[3].icon);
            $("#micon-02-04-01").mouseover(function () {
                $("#micon-02-04-01").attr("src", respuesta.item[3].icon2);
            });



            $("#p-mwhat-03").text(respuesta.item[2].description.substring(0, limit_desc_slide_mobil));
            $("#img-mwhat-03").attr("src", respuesta.item[2].photoSlider);

            $("#mlabel-03-01-01").text(respuesta.item[0].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-03-01-01").attr("src", respuesta.item[0].icon);
            $("#micon-03-01-01").mouseover(function () {
                $("#micon-03-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#mlabel-03-02-01").text(respuesta.item[1].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-03-02-01").attr("src", respuesta.item[1].icon);
            $("#micon-03-02-01").mouseover(function () {
                $("#micon-03-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#mlabel-03-03-01").text(respuesta.item[2].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-03-03-01").attr("src", respuesta.item[2].icon);
            $("#micon-03-03-01").mouseover(function () {
                $("#micon-03-03-01").attr("src", respuesta.item[2].icon2);
            });
            $("#mlabel-03-04-01").text(respuesta.item[3].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-03-04-01").attr("src", respuesta.item[3].icon);
            $("#micon-03-04-01").mouseover(function () {
                $("#micon-03-04-01").attr("src", respuesta.item[3].icon2);
            });



            $("#p-mwhat-04").text(respuesta.item[3].description.substring(0, limit_desc_slide_mobil));
            $("#img-mwhat-04").attr("src", respuesta.item[3].photoSlider);
          
            $("#mlabel-04-01-01").text(respuesta.item[0].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-04-01-01").attr("src", respuesta.item[0].icon);
            $("#micon-04-01-01").mouseover(function () {
                $("#micon-04-01-01").attr("src", respuesta.item[0].icon2);
            });
            $("#mlabel-04-02-01").text(respuesta.item[1].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-04-02-01").attr("src", respuesta.item[1].icon);
            $("#micon-04-02-01").mouseover(function () {
                $("#micon-04-02-01").attr("src", respuesta.item[1].icon2);
            });
            $("#mlabel-04-03-01").text(respuesta.item[2].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-04-03-01").attr("src", respuesta.item[2].icon);
            $("#micon-04-03-01").mouseover(function () {
                $("#micon-04-03-01").attr("src", respuesta.item[2].icon2);
            });
           // alert($("#mlabel-04-04-01").text)
          // alert(respuesta.item[3].titleIcon.substring(0,limit_desc_icon_slide))
            $("#mlabel-04-04-01").text(respuesta.item[3].titleIcon.substring(0,limit_desc_icon_slide));
            $("#micon-04-04-01").attr("src", respuesta.item[3].icon);
            $("#micon-04-04-01").mouseover(function () {
                $("#micon-04-04-01").attr("src", respuesta.item[3].icon2);
            });
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
            $("#span_title_mem1").text(respuesta.item[0].title);
            $("#p_title_mem1").text(respuesta.item[0].title);
           // alert(respuesta.item[0].title);
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
