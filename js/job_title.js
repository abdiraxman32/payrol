load_job_title();
btnAction = "Insert";

$("#job_titleform").on("submit", function (event) {

  event.preventDefault();


  let job_title_name = $("#job_title_name").val();
  let salary = $("#salary").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "job_title_name": job_title_name,
      "salary": salary,
      "action": "register_job_title"
    }

  } else {
    sendingData = {
      "job_title_id": id,
      "job_title_name": job_title_name,
      "salary": salary,
      "action": "update_job_title"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/job_title.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#job_titleform")[0].reset();
        load_job_title();





      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function load_job_title() {
  $("#job_titleTable tbody").html('');
  $("#job_titleTable thead").html('');

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

          tr += `<td> <a class="btn btn-info update_info"  update_id=${res['job_title_id']}><i class="bi bi-pencil-square" style="color: #fff"></i></a>&nbsp;&nbsp
            </td>`
          tr += "</tr>"

        })
        $("#job_titleTable thead").append(th);
        $("#job_titleTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_job_title(job_title_id) {

  let sendingData = {
    "action": "get_job_title",
    "job_title_id": job_title_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/job_title.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['job_title_id']);
        $("#job_title_name").val(response['job_title_name']);
        $("#salary").val(response['salary']);
        $("#job_titlemodal").modal('show');




      } else {
        displymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}





$("#job_titleTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_job_title(id)
})

