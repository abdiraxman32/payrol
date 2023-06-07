load_leave_info();
btnAction = "Insert";

$("#leave_form").on("submit", function (event) {

  event.preventDefault();


  let leave_type = $("#leave_type").val();
  let leave_balance = $("#leave_balance").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "leave_type": leave_type,
      "leave_balance": leave_balance,
      "action": "register_leave_info"
    }

  } else {
    sendingData = {
      "leave_info_id": id,
      "leave_type": leave_type,
      "leave_balance": leave_balance,
      "action": "update_leave_info"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/leave.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#leave_form")[0].reset();
        load_leave_info();





      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function load_leave_info() {
  $("#leave_Table tbody").html('');
  $("#leave_Table thead").html('');

  let sendingData = {
    "action": "read_all_leave_info"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/leave.php",
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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['leave_info_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp
            </td>`
          tr += "</tr>"

        })
        $("#leave_Table thead").append(th);
        $("#leave_Table tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_leave_info(leave_info_id) {

  let sendingData = {
    "action": "get_leave_info",
    "leave_info_id": leave_info_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/leave.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['leave_info_id']);
        $("#leave_type").val(response['leave_type']);
        $("#leave_balance").val(response['leave_balance']);
        $("#leave_modal").modal('show');




      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}





$("#leave_Table").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_leave_info(id)
})

