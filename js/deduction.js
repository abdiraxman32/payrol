loaddeduction();
btnAction = "Insert";

$("#deductionform").on("submit", function (event) {

  event.preventDefault();


  let deduction_type = $("#deduction_type").val();
  let amount = $("#amount").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "deduction_type": deduction_type,
      "amount": amount,
      "action": "register_deduction"
    }

  } else {
    sendingData = {
      "deduction_id": id,
      "deduction_type": deduction_type,
      "amount": amount,
      "action": "update_deduction"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/deduction.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#deductionform")[0].reset();
        loaddeduction();





      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function loaddeduction() {
  $("#deductionTable tbody").html('');
  $("#deductionTable thead").html('');

  let sendingData = {
    "action": "read_all_deduction"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/deduction.php",
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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['deduction_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp
            </td>`
          tr += "</tr>"

        })
        $("#deductionTable thead").append(th);
        $("#deductionTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_deduction(deduction_id) {

  let sendingData = {
    "action": "get_deduction",
    "deduction_id": deduction_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/deduction.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['deduction_id']);
        $("#deduction_type").val(response['deduction_type']);
        $("#amount").val(response['amount']);
        $("#deductionmodal").modal('show');




      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


$("#deductionTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_deduction(id)
})

