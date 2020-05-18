//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// TEAM ///////////////////////////////////////////////////////////

var respuesta;
var _html;
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: "http://34.237.214.147/back/api_flip/api/Post/SeeTeam",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log(respuesta.item);
            $("#img-00").attr("src", respuesta.item[0].backphoto);
            $("#span-nombre-00").text(respuesta.item[0].name);
            $("#span-apellido-00").text(respuesta.item[0].lastname);
            $('#link-00').attr('href', respuesta.item[0].link);
            $("#span-puesto-00").text(respuesta.item[0].position);
            $("#p-descripcion-00").text(respuesta.item[0].desc);
            $("#span-sub-nombre-00").text(respuesta.item[0].name);
            $("#span-sub-apellido-00").text(respuesta.item[0].lastname);

            $("#img-01").attr("src", respuesta.item[1].backphoto);
            $("#span-nombre-01").text(respuesta.item[1].name);
            $("#span-apellido-01").text(respuesta.item[1].lastname);
            $('#link-01').attr('href', respuesta.item[1].link);
            $("#span-puesto-01").text(respuesta.item[1].position);
            $("#p-descripcion-01").text(respuesta.item[1].desc);
            $("#span-sub-nombre-01").text(respuesta.item[1].name);
            $("#span-sub-apellido-01").text(respuesta.item[1].lastname);

            $("#img-02").attr("src", respuesta.item[2].backphoto);
            $("#span-nombre-02").text(respuesta.item[2].name);
            $("#span-apellido-02").text(respuesta.item[2].lastname);
            $('#link-02').attr('href', respuesta.item[2].link);
            $("#span-puesto-02").text(respuesta.item[2].position);
            $("#p-descripcion-02").text(respuesta.item[2].desc);
            $("#span-sub-nombre-02").text(respuesta.item[2].name);
            $("#span-sub-apellido-02").text(respuesta.item[2].lastname);

            $("#img-03").attr("src", respuesta.item[3].backphoto);
            $("#span-nombre-03").text(respuesta.item[3].name);
            $("#span-apellido-03").text(respuesta.item[3].lastname);
            $('#link-03').attr('href', respuesta.item[3].link);
            $("#span-puesto-03").text(respuesta.item[3].position);
            $("#p-descripcion-03").text(respuesta.item[3].desc);
            $("#span-sub-nombre-03").text(respuesta.item[3].name);
            $("#span-sub-apellido-03").text(respuesta.item[3].lastname);

            $("#img-04").attr("src", respuesta.item[4].backphoto);
            $("#span-nombre-04").text(respuesta.item[4].name);
            $("#span-apellido-04").text(respuesta.item[4].lastname);
            $('#link-04').attr('href', respuesta.item[4].link);
            $("#span-puesto-04").text(respuesta.item[4].position);
            $("#p-descripcion-04").text(respuesta.item[4].desc);
            $("#span-sub-nombre-04").text(respuesta.item[4].name);
            $("#span-sub-apellido-04").text(respuesta.item[4].lastname);

            $("#img-05").attr("src", respuesta.item[5].backphoto);
            $("#span-nombre-05").text(respuesta.item[5].name);
            $("#span-apellido-05").text(respuesta.item[5].lastname);
            $('#link-05').attr('href', respuesta.item[5].link);
            $("#span-puesto-05").text(respuesta.item[5].position);
            $("#p-descripcion-05").text(respuesta.item[5].desc);
            $("#span-sub-nombre-05").text(respuesta.item[5].name);
            $("#span-sub-apellido-05").text(respuesta.item[5].lastname);

            $("#img-06").attr("src", respuesta.item[6].backphoto);
            $("#span-nombre-06").text(respuesta.item[6].name);
            $("#span-apellido-06").text(respuesta.item[6].lastname);
            $('#link-06').attr('href', respuesta.item[6].link);
            $("#span-puesto-06").text(respuesta.item[6].position);
            $("#p-descripcion-06").text(respuesta.item[6].desc);
            $("#span-sub-nombre-06").text(respuesta.item[6].name);
            $("#span-sub-apellido-06").text(respuesta.item[6].lastname);

            $("#img-07").attr("src", respuesta.item[7].backphoto);
            $("#span-nombre-07").text(respuesta.item[7].name);
            $("#span-apellido-07").text(respuesta.item[7].lastname);
            $('#link-07').attr('href', respuesta.item[7].link);
            $("#span-puesto-07").text(respuesta.item[7].position);
            $("#p-descripcion-07").text(respuesta.item[7].desc);
            $("#span-sub-nombre-07").text(respuesta.item[7].name);
            $("#span-sub-apellido-07").text(respuesta.item[7].lastname);

            $("#img-08").attr("src", respuesta.item[8].backphoto);
            $("#span-nombre-08").text(respuesta.item[8].name);
            $("#span-apellido-08").text(respuesta.item[8].lastname);
            $('#link-08').attr('href', respuesta.item[8].link);
            $("#span-puesto-08").text(respuesta.item[8].position);
            $("#p-descripcion-08").text(respuesta.item[8].desc);
            $("#span-sub-nombre-08").text(respuesta.item[8].name);
            $("#span-sub-apellido-08").text(respuesta.item[8].lastname);

            $("#img-09").attr("src", respuesta.item[9].backphoto);
            $("#span-nombre-09").text(respuesta.item[9].name);
            $("#span-apellido-09").text(respuesta.item[9].lastname);
            $('#link-09').attr('href', respuesta.item[9].link);
            $("#span-puesto-09").text(respuesta.item[9].position);
            $("#p-descripcion-09").text(respuesta.item[9].desc);
            $("#span-sub-nombre-09").text(respuesta.item[9].name);
            $("#span-sub-apellido-09").text(respuesta.item[9].lastname);

            $("#img-10").attr("src", respuesta.item[10].backphoto);
            $("#span-nombre-10").text(respuesta.item[10].name);
            $("#span-apellido-10").text(respuesta.item[10].lastname);
            $('#link-10').attr('href', respuesta.item[10].link);
            $("#span-puesto-10").text(respuesta.item[10].position);
            $("#p-descripcion-10").text(respuesta.item[10].desc);
            $("#span-sub-nombre-10").text(respuesta.item[10].name);
            $("#span-sub-apellido-10").text(respuesta.item[10].lastname);

            $("#img-11").attr("src", respuesta.item[11].backphoto);
            $("#span-nombre-11").text(respuesta.item[11].name);
            $("#span-apellido-11").text(respuesta.item[11].lastname);
            $('#link-11').attr('href', respuesta.item[11].link);
            $("#span-puesto-11").text(respuesta.item[11].position);
            $("#p-descripcion-11").text(respuesta.item[11].desc);
            $("#span-sub-nombre-11").text(respuesta.item[11].name);
            $("#span-sub-apellido-11").text(respuesta.item[11].lastname);

            $("#img-12").attr("src", respuesta.item[12].backphoto);
            $("#span-nombre-12").text(respuesta.item[12].name);
            $("#span-apellido-12").text(respuesta.item[12].lastname);
            $('#link-12').attr('href', respuesta.item[12].link);
            $("#span-puesto-12").text(respuesta.item[12].position);
            $("#p-descripcion-12").text(respuesta.item[12].desc);
            $("#span-sub-nombre-12").text(respuesta.item[12].name);
            $("#span-sub-apellido-12").text(respuesta.item[12].lastname);

            $("#img-13").attr("src", respuesta.item[13].backphoto);
            $("#span-nombre-13").text(respuesta.item[13].name);
            $("#span-apellido-13").text(respuesta.item[13].lastname);
            $('#link-13').attr('href', respuesta.item[13].link);
            $("#span-puesto-13").text(respuesta.item[13].position);
            $("#p-descripcion-13").text(respuesta.item[13].desc);
            $("#span-sub-nombre-13").text(respuesta.item[13].name);
            $("#span-sub-apellido-13").text(respuesta.item[13].lastname);

        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});


