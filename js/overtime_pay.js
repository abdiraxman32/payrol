loadovertime_pay();
btnAction = "Insert";
fill_over();
fill_overtime_rate();
fill_employe();
fill_month();
function fill_employe() {

  let sendingData = {
    "action": "read_all_employe"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/overtime_pay.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['employee_id']}">${res['employe_name']}</option>`;


        })

        $("#employee_idd").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_month() {

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

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['month_id']}">${res['month_name']}</option>`;


        })

        $("#month_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


$("#overtime_payform").on("submit", function (event) {

  event.preventDefault();


  let employee_idd = $("#employee_idd").val();
  let month_id = $("#month_id").val();
  let overtime_hours = $("#overtime_hours").val();
  let overtime_rate = $("#overtime_rate").val();
  let Total_amount = $("#Total_amount").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "employee_idd": employee_idd,
      "month_id": month_id,
      "overtime_hours": overtime_hours,
      "overtime_rate": overtime_rate,
      "Total_amount": Total_amount,
      "action": "register_overtime_pay"
    }

   
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/overtime_pay.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;


     
    
       if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#overtime_payform")[0].reset();
        loadovertime_pay();





    } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})



$(".employe").on("change", function(){
  if($(".employe").val()== 0){
    console.log("0 waaye");
    $("#overtime_rate").val("");

  }else{
    console.log(overtime_rate);
  }
})

$("#overtime_payform").on("change", "select.employee_idd", function () {
  let employee_idd = $(this).val();
  fill_overtime_rate(employee_idd);
  console.log("yes");

})


$("#overtime_hours").on("change", function () {
  let overtime_hours = $(this).val();
  let employee_idd = $("#employee_idd").val();
  fill_over(employee_idd,overtime_hours);
  console.log("hh");

})

function fill_over(employe_id,overtime_hours) {
    
  let sendingData = {
    "action": "read_over_time_rate",
    "employe_id": employe_id

    

  }


  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/overtime_pay.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#Total_amount").val(res['overtime_rate']*overtime_hours);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function fill_overtime_rate(employe_id) {
    
  let sendingData = {
    "action": "read_over_time_rate",
    "employe_id": employe_id

    

  }


  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/overtime_pay.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#overtime_rate").val(res['overtime_rate']);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#employee_idd").on("change", function(){
  if($("#employee_idd").val()== 0){
    console.log("0 waaye");
    $("#overtime_rate").val("");

  }else{
    console.log(overtime_rate);
  }
})


function loadovertime_pay() {
  $("#overtimeTable tbody").html('');
  $("#overtimeTable thead").html('');

  let sendingData = {
    "action": "read_all_overtime_pay"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/overtime_pay.php",
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

            if(r=="overtime_hours"){
              tr += `<td>${res[r]} hr</td>`;

            }else{
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })
        $("#overtimeTable thead").append(th);
        $("#overtimeTable tbody").append(tr);
      }



    },
    error: function (data) {

    }

  })
}




