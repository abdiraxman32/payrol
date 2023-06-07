btnAction = "Insert";
filAmount();
fill_employeee();
fill_bonus();
load_pay_bonus();
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

        $("#Emmployee_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_bonus() {

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

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['bonuses_id']}">${res['bonuses_type']}</option>`;


        })

        $("#bonuses_id").append(html);


      } else {
        displaymssage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#pay_bonus_form").on("submit", function (event) {

  event.preventDefault();


  let Emmployee_id = $("#Emmployee_id").val();
  let bonuses_id = $("#bonuses_id").val();
  let amount = $("#amount").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "Emmployee_id": Emmployee_id,
      "bonuses_id": bonuses_id,
      "amount": amount,
      "action": "register_pay_bonus"
    }

   
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_bonus.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;


     
    
       if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#pay_bonus_form")[0].reset();
        load_pay_bonus();





    } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})



$("#bonuses_id").on("change", function () {
  let bonuses_id = $(this).val();
  filAmount(bonuses_id);
  console.log("yes");

})




function filAmount(bonuses_id) {
    
  let sendingData = {
    "action": "read_Amount",
    "bonuses_id": bonuses_id

    

  }


  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_bonus.php",
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



$("#bonuses_id").on("change", function(){
  if($("#bonuses_id").val()== 0){
    console.log("0 waaye");
    $("#amount").val("");

  }else{
    console.log(overtime_rate);
  }
})


function load_pay_bonus() {
  $("#pay_bonus_Table tbody").html('');
  $("#pay_bonus_Table thead").html('');

  let sendingData = {
    "action": "read_all_pay_bonuses"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pay_bonus.php",
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
        $("#pay_bonus_Table thead").append(th);
        $("#pay_bonus_Table tbody").append(tr);
      }



    },
    error: function (data) {

    }

  })
}




