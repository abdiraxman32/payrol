<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_pay_deduction($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO pay_deduction(employee_id, deduction_id,amount)
     values('$Employee_id','$deduction_id','$amount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}




function read_Amount($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT amount from deduction d WHERE d.deduction_id=('$deduction_id')";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function read_all_pay_deduction($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT p.pay_deduction_id,concat(e.fristname, ' ', e.lastname) as employe_name, d.deduction_type,p.amount,p.date_paid from pay_deduction p JOIN employee e on p.employee_id=e.employee_id JOIN deduction d on p.deduction_id=d.deduction_id";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
