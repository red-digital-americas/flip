//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// LLAMADOS A SERVICOS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// JOBS ///////////////////////////////////////////////////////////

var respuesta;
var _html;
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: "http://34.237.214.147/back/api_flip/api/Post/SeeJobs",
        data: JSON.stringify({ userid: 1 }),
        contentType: "application/json",
        dataType: "text",

        success: function (data, textStatus, jqXHR) {
            respuesta = JSON.parse(data);
            console.log(respuesta.item);
            $("#span_001").text("#" + respuesta.item[0].title);
            $("#p_001").text(respuesta.item[0].shortdesc);
            $("#span_002").text("#" + respuesta.item[1].title);
            $("#p_002").text(respuesta.item[1].shortdesc);
            $("#span_003").text("#" + respuesta.item[2].title);
            $("#p_003").text(respuesta.item[2].shortdesc);
            $("#span_004").text("#" + respuesta.item[3].title);
            $("#p_004").text(respuesta.item[3].shortdesc);
            $("#span_005").text("#" + respuesta.item[4].title);
            $("#p_005").text(respuesta.item[4].shortdesc);
            $("#span_006").text("#" + respuesta.item[5].title);
            $("#p_006").text(respuesta.item[5].shortdesc);
            $("#span_007").text("#" + respuesta.item[6].title);
            $("#p_007").text(respuesta.item[6].shortdesc);
            $("#span_008").text("#" + respuesta.item[7].title);
            $("#p_008").text(respuesta.item[7].shortdesc);
            $("#span_009").text("#" + respuesta.item[8].title);
            $("#p_009").text(respuesta.item[8].shortdesc);
            $("#span_0010").text("#" + respuesta.item[9].title);
            $("#p_0010").text(respuesta.item[9].shortdesc);
            $("#span_0011").text("#" + respuesta.item[10].title);
            $("#p_0011").text(respuesta.item[10].shortdesc);
            $("#span_0012").text("#" + respuesta.item[11].title);
            $("#p_0012").text(respuesta.item[11].shortdesc);
            $("#span_0013").text("#" + respuesta.item[12].title);
            $("#p_0013").text(respuesta.item[12].shortdesc);
            $("#span_0014").text("#" + respuesta.item[13].title);
            $("#p_0014").text(respuesta.item[13].shortdesc);
        },
        error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR, textStatus, errorThrown); },
    });
});

function press(item) {
    modal.style.display = "block";
    $("#span_modal_title").text("#" + respuesta.item[item].title);
    $("#span_modal_desc").text("#" + respuesta.item[item].longdesc);
}


