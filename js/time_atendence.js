loadtime_atendence();
btnAction = "Insert";
fill_employe_na();

function fill_employe_na() {

    let sendingData = {
      "action": "read_all_employeeee_name"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/time_atendence.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        let html = '';
        let tr = '';
  
        if (status) {
          response.forEach(res => {
            html += `<option value="${res['employee_id']}">${res['employee']}</option>`;
  
  
          })
  
          $("#employe_iid").append(html);
  
  
        } else {
          displaymssage("error", response);
        }
  
      },
      error: function (data) {
  
      }
  
    })
  }
$("#timeatendenceform").on("submit", function (event) {

  event.preventDefault();


  let employe_iid = $("#employe_iid").val();
  let month_id = $("#month_id").val();
  let total_hours_work = $("#total_hours_work").val();
  let overtime_hours = $("#overtime_hours").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "employe_iid": employe_iid,
      "month_id": month_id,
      "total_hours_work": total_hours_work,
      "overtime_hours": overtime_hours,
      "action": "register_timeatendence"
    }

  
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/time_atendence.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#timeatendenceform")[0].reset();
        loadtime_atendence();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function loadtime_atendence() {
  $("#timeatendenceTable tbody").html('');
  $("#timeatendenceTable thead").html('');

  let sendingData = {
    "action": "read_all_timeatendence"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/time_atendence.php",
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





          tr += "<tr>";
          for (let r in res) {


            tr += `<td>${res[r]}</td>`;


          }

     
          tr += "</tr>"

        })
        $("#timeatendenceTable thead").append(th);
        $("#timeatendenceTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}
