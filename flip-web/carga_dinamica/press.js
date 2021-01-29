//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// PRESS ///////////////////////////////////////////////////////////

var respuesta;
var _html;
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: urlbase_api +"Post/SeeNews",
        //url: "http://34.237.214.147/back/api_flip/api/Post/SeeNews",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log(respuesta.item);
            $("#span-nombre-00").text(respuesta.item[0].title);
            $("#p-descripcion-00").text(respuesta.item[0].reusme);

            $("#span-nombre-01").text(respuesta.item[1].title);
            $("#p-descripcion-01").text(respuesta.item[1].reusme);

            $("#span-nombre-02").text(respuesta.item[2].title);
            $("#p-descripcion-02").text(respuesta.item[2].reusme);

            $("#span-nombre-03").text(respuesta.item[3].title);
            $("#p-descripcion-03").text(respuesta.item[3].reusme);

            $("#span-nombre-04").text(respuesta.item[4].title);
            $("#p-descripcion-04").text(respuesta.item[4].reusme);

            $("#span-nombre-05").text(respuesta.item[5].title);
            $("#p-descripcion-05").text(respuesta.item[5].reusme);

            $("#span-nombre-06").text(respuesta.item[6].title);
            $("#p-descripcion-06").text(respuesta.item[6].reusme);

            $("#span-nombre-07").text(respuesta.item[7].title);
            $("#p-descripcion-07").text(respuesta.item[7].reusme);

            $("#span-nombre-08").text(respuesta.item[8].title);
            $("#p-descripcion-08").text(respuesta.item[8].reusme);

            $("#span-nombre-09").text(respuesta.item[9].title);
            $("#p-descripcion-09").text(respuesta.item[9].reusme);

            $("#span-nombre-10").text(respuesta.item[10].title);
            $("#p-descripcion-10").text(respuesta.item[10].reusme);

            $("#span-nombre-11").text(respuesta.item[11].title);
            $("#p-descripcion-11").text(respuesta.item[11].reusme);

            $("#span-nombre-12").text(respuesta.item[12].title);
            $("#p-descripcion-12").text(respuesta.item[12].reusme);

            $("#span-nombre-13").text(respuesta.item[13].title);
            $("#p-descripcion-13").text(respuesta.item[13].reusme);

        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});

function press(item) {
    modal.style.display = "block";
    $("#span_modal_title").text("#" + respuesta.item[item].title);
    $("#span_modal_desc").text("#" + respuesta.item[item].longresume);
    $("#img-modal").attr("src", respuesta.item[1].photo);
}
