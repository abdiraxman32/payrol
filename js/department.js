loaddepartment();
btnAction = "Insert";

$("#departmentform").on("submit", function (event) {

  event.preventDefault();


  let department_name = $("#department_name").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "department_name": department_name,
      "action": "register_department"
    }

  } else {
    sendingData = {
      "department_id": id,
      "department_name": department_name,
      "action": "update_department"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#departmentform")[0].reset();
        loaddepartment();



      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})



function loaddepartment() {
  $("#departmentTable tbody").html('');
  $("#departmentTable thead").html('');

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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['department_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp 
 </td>`
          tr += "</tr>"

        })
        $("#departmentTable thead").append(th);
        $("#departmentTable tbody").append(tr);
      }



    },
    error: function (data) {

    }

  })
}


function get_department(department_id) {

  let sendingData = {
    "action": "get_department",
    "department_id": department_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/department.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['department_id']);
        $("#department_name").val(response['department_name']);
        $("#departmentmodal").modal('show');




      } else {
        resultmessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


// function Delete_department(Department_id) {

//   let sendingData = {
//     "action": "Delete_department",
//     "Department_id": Department_id
//   }

//   $.ajax({
//     method: "POST",
//     dataType: "JSON",
//     url: "Api/department.php",
//     data: sendingData,

//     success: function (data) {
//       let status = data.status;
//       let response = data.data;


//       if (status) {

//         swal("Good job!", response, "success");
//         loaddepartment();


//       } else {
//         swal(response);
//       }

//     },
//     error: function (data) {

//     }

//   })
// }



$("#departmentTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_department(id)
})


// $("#departmentTable").on('click', "a.delete_info", function () {
//   let id = $(this).attr("delete_id");
//   if (confirm("Are you sure To Delete")) {
//     Delete_department(id)

//   }

// })