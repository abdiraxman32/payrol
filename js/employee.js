loademployee();
fill_department();
fill_job_title();
fill_shift();
btnAction = "Insert";

function fill_department() {

  let sendingData = {
    "action": "read_all_department"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['department_id']}">${res['department_name']}</option>`;


        })

        $("#department_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_job_title() {

  let sendingData = {
    "action": "read_all_job_title"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/job_title.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['job_title_id']}">${res['job_title_name']}</option>`;


        })

        $("#job_title_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_shift() {

  let sendingData = {
    "action": "read_all_shift"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/shift.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['shift_id']}">${res['shift_name']}</option>`;


        })

        $("#shift_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#employeform").on("submit", function (event) {

  event.preventDefault();


  let fristname = $("#fristname").val();
  let lastname = $("#lastname").val();
  let phone = $("#phone").val();
  let address = $("#address").val();
  let city = $("#city").val();
  let department_id = $("#department_id").val();
  let job_title_id = $("#job_title_id").val();
  let shift_id = $("#shift_id").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "fristname": fristname,
      "lastname": lastname,
      "phone": phone,
      "address": address,
      "city": city,
      "department_id": department_id,
      "job_title_id": job_title_id,
      "shift_id": shift_id,
      "action": "register_employee"
    }

  } else {
    sendingData = {
      "employee_id": id,
      "fristname": fristname,
      "lastname": lastname,
      "phone": phone,
      "address": address,
      "city": city,
      "department_id": department_id,
      "job_title_id": job_title_id,
      "shift_id": shift_id,
      "action": "update_employee"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employee.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#employeform")[0].reset();
        $("employemodal").modal("hide");
        loademployee();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function loademployee() {
  $("#employeTable tbody").html('');
  $("#employeTable thead").html('');

  let sendingData = {
    "action": "read_all_employee"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employee.php",
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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['employee_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['employee_id']}><i class="bi bi-trash" style="color: #fff"></i></a> </td>`
     
          tr += "</tr>"

        })
        $("#employeTable thead").append(th);
        $("#employeTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}



function get_employee_info(employee_id) {

  let sendingData = {
    "action": "get_employee_info",
    "employee_id": employee_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employee.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['employee_id']);
        $("#fristname").val(response['fristname']);
        $("#lastname").val(response['lastname']);
        $("#phone").val(response['phone']);
        $("#address").val(response['address']);
        $("#city").val(response['city']);
        $("#department_id").val(response['department_id']);
        $("#job_title_id").val(response['job_title_id']);
        $("#shift_id").val(response['shift_id']);
        $("#employemodal").modal('show');




      } else {
        dispalaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}






function Delete_employee(employee_id) {

  let sendingData = {
    "action": "Delete_employee",
    "employee_id": employee_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employee.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loademployee();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#employeTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_employee_info(id)
})


$("#employeTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_employee(id)

  }

})