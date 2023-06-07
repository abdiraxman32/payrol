$("#telphone").attr("disabled", true);

$("#type").on("change", function () {
  if ($("#type").val() == 0) {
    $("#telphone").attr("disabled", true);

  } else {
    $("#telphone").attr("disabled", false);
  }
})


$("#printt_statement").on("click", function () {
  let printarea = document.querySelector("#printt_Area");


  let newwindow = window.open("");
  newwindow.document.write(`<html><head><title></title>`);
  newwindow.document.write(`<style media="print">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
    body{
        font-family: 'Poppins', sans-serif;
    }

    table{
      width:100%;
  }

    th{
        background-color : #40E0D0 !important;
        color: white !important;
       
    }
      
    th , td{
        padding:10px !important;
        text-align: left !important;

    }

    th , td{
        
        border-bottom : 1px solid #ddd !important;
    }
    
    
    </style>`);
  newwindow.document.write(`</head><body>`);
  newwindow.document.write(printarea.innerHTML);
  newwindow.document.write(`</body></html>`);
  newwindow.print();
  newwindow.close();


})



$("#exportt_statement").on("click", function () {
  let file = new Blob([$('#printt_Area').html()], { type: "application/vnd.ms-excel" });
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
    href: url,
    download: "print_statement.xls"
  }).appendTo("body").get(0).click();
  e.preventDefault();

});



$("#employeeeform").on("submit", function (event) {

  event.preventDefault();
  $("#employeeetable tr").html("");


  let telphone = $("#telphone").val();



  let sendingData = {

    "telphone": telphone,

    "action": "read_employe_statement",

  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employee.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      let tr = '';
      let th = '';

      if (status) {
        response.forEach(res => {

          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "</tr>";


          tr += "<tr>";
          for (let r in res) {

            if (r == "status") {
              if (res[r] == "paid") {
                tr += `<td><span class="badge bg-success">${res[r]}</span></td>`;
              } else {
                tr += `<td><span class="badge bg-danger">${res[r]}</span></td>`;
              }
            } else {
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })

        $("#employeeetable thead").append(th);
        $("#employeeetable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })

})




function loadData() {
  $("#employeeetable tbody").html('');

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

      if (status) {
        response.forEach(res => {

          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "</tr>";


          tr += "<tr>";
          for (let r in res) {

            if (r == "status") {
              if (res[r] == "paid") {
                tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
              } else {
                tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
              }
            } else {
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })

        $("#employeeetable thead").append(th);
        $("#employeeetable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}



