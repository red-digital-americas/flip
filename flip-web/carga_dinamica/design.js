//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// DESING ///////////////////////////////////////////////////////////

var respuesta;
var _html;
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url:  urlbase_api +"Post/SeeDesign",
        //url: "http://34.237.214.147/back/api_flip/apiPost/SeeDesign",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log(respuesta.item);
            $("#img-00").attr("src", respuesta.item[1].frontphoto);
            $("#span-title-00").text(respuesta.item[1].posdesc);
            $("#p-descripcion-00").text(respuesta.item[1].desc);

            $("#img-01").attr("src", respuesta.item[3].frontphoto);
            $("#span-title-01").text(respuesta.item[3].posdesc);
            $("#p-descripcion-01").text(respuesta.item[3].desc);

            $("#img-03").attr("src", respuesta.item[0].frontphoto);
            $("#span-title-03").text(respuesta.item[0].posdesc);
            $("#p-descripcion-03").text(respuesta.item[0].desc);

            $("#img-02").attr("src", respuesta.item[2].frontphoto);
            $("#span-title-02").text(respuesta.item[2].posdesc);
            $("#p-descripcion-02").text(respuesta.item[2].desc);
        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});


