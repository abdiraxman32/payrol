loadbonuses();
btnAction = "Insert";

$("#bonusform").on("submit", function (event) {

  event.preventDefault();


  let bonuses_type = $("#bonuses_type").val();
  let amount = $("#amount").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "bonuses_type": bonuses_type,
      "amount": amount,
      "action": "register_bonuses"
    }

  } else {
    sendingData = {
      "bonuses_id": id,
      "bonuses_type": bonuses_type,
      "amount": amount,
      "action": "update_bonuses"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/bonuses.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#bonusform")[0].reset();
        loadbonuses();





      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function loadbonuses() {
  $("#bonusTable tbody").html('');
  $("#bonusTable thead").html('');

  let sendingData = {
    "action": "read_all_bonuses"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/bonuses.php",
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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['bonuses_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp
            </td>`
          tr += "</tr>"

        })
        $("#bonusTable thead").append(th);
        $("#bonusTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_bonuses(bonuses_id) {

  let sendingData = {
    "action": "get_bonuses",
    "bonuses_id": bonuses_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/bonuses.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['bonuses_id']);
        $("#bonuses_type").val(response['bonuses_type']);
        $("#amount").val(response['amount']);
        $("#bonusmodal").modal('show');




      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}





$("#bonusTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_bonuses(id)
})

