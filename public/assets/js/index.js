$(document).ready(() => {

    $("button").click(function (e) {
        e.preventDefault();
        switch (this.id) {
            case "loadHome":
                console.log("loadHome");
                window.location.href = "/";
                break;
            case "loadAWS":
                console.log("loadAWS");
                window.location.href = "/aws";
                break;
            case "loadCF":
                console.log("Load CF");
                window.location.href = "/cloudflare";
                break;
            case "btnSearch":
                console.log("btnSearch");
                filterTable();
                break;
            case "refreshData":
                console.log("refreshData");
                updatedata();
                break;
            default:
                console.log(this.id, "<-Unknown Button");

        }
    });
    $("tr").click(function (e) {
        e.preventDefault();
        var product = $(this).attr("data-id")
        console.log(this.id, product);
        $.get("api/" + this.id, data => {
            console.log(data);
            objData = data[0];
            content = "<table>";
            content += makeP("Product", objData.product);
            content += makeP("ID", objData.id);
            content += makeP("Name", objData.name)
            content += makeP("Type", objData.type);
            content += makeP("Created", objData.createdAt);
            content += makeP("Updated", objData.updatedAt);
            content += makeP("Active", objData.active ? "true" : "false");
            content += "</table>";
            $("#modTitle").html(objData.product);
            if (objData.product === 'cloudflare') {
                content += "<table class:\"table-bordered\"><tr>"
                $.get("api/images/"+objData.name, data => {
                    $("#myModal").modal();
                    data.map(row=>{
                        content += "<td><img class=\"nmimages\" src=\"\\assets\\img\\"+row.filename+"\"></td>";
                    })
                    content += "</tr></table>";
                    $(".modal-body").html(content);
                })
            } else {
                $(".modal-body").html(content);
                $("#myModal").modal();
            }
        });
    });
});

function updatedata() {
    $.get("api/updatedata", function (data) {
        $("#lastudpate").html(data);
    });
}

function filterTable(callback) {
    var filterValue = $("#inputsearch").val();
    console.log(filterValue);
    if (filterValue) {
        $('td:first-child').parent('tr:not(:contains("' + filterValue + '"))').hide();
    } else {
        $('tr').show();
    }
}

function makeP(tag, data) {
    return "<tr><td>" + "<strong>" + tag + "</strong></td><td>" + data + "</td></tr>"
}