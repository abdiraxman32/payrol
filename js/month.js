loadmonth();
btnAction = "Insert";

$("#monthform").on("submit", function (event) {

  event.preventDefault();


  let month_name = $("#month_name").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "month_name": month_name,
      "action": "register_month"
    }

  } else {
    sendingData = {
      "month_id": id,
      "month_name": month_name,
      "action": "update_month"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/month.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#monthform")[0].reset();
        loadmonth();





      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function loadmonth() {
  $("#monthTable tbody").html('');
  $("#monthTable thead").html('');

  let sendingData = {
    "action": "read_all_month"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/month.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';
      let th = '';

      if (status) {
        response.forEach(res => {
          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "<td>Action</td></tr>";




          tr += "<tr>";
          for (let r in res) {


            tr += `<td>${res[r]}</td>`;


          }

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['month_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp
            </td>`
          tr += "</tr>"

        })
        $("#monthTable thead").append(th);
        $("#monthTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_month(month_id) {

  let sendingData = {
    "action": "get_month",
    "month_id": month_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/month.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['month_id']);
        $("#month_name").val(response['month_name']);
        $("#monthmodal").modal('show');




      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


$("#monthTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_month(id)
})

