btnAction = "Insert";
filAmount();
load_pay_deduction();
fill_employeee();
fill_deduction();
function fill_employeee() {

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

        $("#Employee_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_deduction() {

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

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['deduction_id']}">${res['deduction_type']}</option>`;


        })

        $("#deduction_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#deductionform").on("submit", function (event) {

  event.preventDefault();


  let Employee_id = $("#Employee_id").val();
  let deduction_id = $("#deduction_id").val();
  let amount = $("#amount").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "Employee_id": Employee_id,
      "deduction_id": deduction_id,
      "amount": amount,
      "action": "register_pay_deduction"
    }

   
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_deduction.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;


     
    
       if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#deductionform")[0].reset();
        load_pay_deduction();





    } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})



$("#deduction_id").on("change", function () {
  let deduction_id = $(this).val();
  filAmount(deduction_id);
  console.log("yes");

})




function filAmount(deduction_id) {
    
  let sendingData = {
    "action": "read_Amount",
    "deduction_id": deduction_id

    

  }


  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_deduction.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#amount").val(res['amount']);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#deduction_id").on("change", function(){
  if($("#deduction_id").val()== 0){
    console.log("0 waaye");
    $("#amount").val("");

  }else{
    console.log(overtime_rate);
  }
})


function load_pay_deduction() {
  $("#paydeduction_Table tbody").html('');
  $("#paydeduction_Table thead").html('');

  let sendingData = {
    "action": "read_all_pay_deduction"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_deduction.php",
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
        $("#paydeduction_Table thead").append(th);
        $("#paydeduction_Table tbody").append(tr);
      }



    },
    error: function (data) {

    }

  })
}




