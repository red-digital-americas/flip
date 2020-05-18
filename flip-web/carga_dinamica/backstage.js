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
            console.log(respuesta.item[0]);

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
            //console.log(respuesta.item);
            // Id	int	Unchecked
            // Icon	nvarchar(500)	Checked
            // Icon2	nvarchar(500)	Checked
            // TitleIcon	nvarchar(100)	Checked
            // Description	nvarchar(500)	Checked
            // PhotoSlider	nvarchar(500)	Checked
            // PhotoMobileSlider	nvarchar(500)	Checked

            $("#p-what-01").text(respuesta.item[0].description);

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




            $("#p-mwhat-01").text(respuesta.item[0].description);
            $("#p-mwhat-02").text(respuesta.item[0].description);
            $("#p-mwhat-03").text(respuesta.item[0].description);
            $("#p-mwhat-04").text(respuesta.item[0].description);

            //$("#img-altata-00").attr("src", respuesta.item[0].build);
            //$("#img-maltata-00").attr("src", respuesta.item[0].buildmobile);
            //IMAGENES
           /*  $("#img-altata-amenities-00").attr("src", respuesta.item[0].frontphoto);
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
            $("#p-altata-desc-01").text(respuesta.item[0].desc);
            $("#p-altata-desc-02").text(respuesta.item[0].desc);
            $("#p-altata-desc-03").text(respuesta.item[0].desc);
            $("#p-altata-desc-04").text(respuesta.item[0].desc);

            //Movil
            $("#img-maltata-amenities-slide-00").attr("src", respuesta.item[0].photomobile);
            $("#img-maltata-amenities-slide-01").attr("src", respuesta.item[1].photomobile);
            $("#img-maltata-amenities-slide-02").attr("src", respuesta.item[2].photomobile);
            $("#img-maltata-amenities-slide-03").attr("src", respuesta.item[3].photomobile);
            $("#img-maltata-amenities-slide-04").attr("src", respuesta.item[4].photomobile);

            //Titulo
            $("#p-altata-amenities-title-00").text(respuesta.item[0].title);
            $("#p-altata-amenities-title-01").text(respuesta.item[1].title);
            $("#p-altata-amenities-title-02").text(respuesta.item[2].title);
            $("#p-altata-amenities-title-03").text(respuesta.item[3].title);
            $("#p-altata-amenities-title-04").text(respuesta.item[4].title); */

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
