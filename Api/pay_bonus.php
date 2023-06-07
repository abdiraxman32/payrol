<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_pay_bonus($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO pay_bonus(employee_id, bonuses_id,amount)
     values('$Emmployee_id','$bonuses_id','$amount')";

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
    $query = "SELECT amount from bonuses b WHERE b.bonuses_id=('$bonuses_id')";
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


function read_all_pay_bonuses($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT p.pay_bonus_id,concat(e.fristname, ' ', e.lastname) as employe_name, b.bonuses_type, p.amount,p.bonuses_date FROM pay_bonus p JOIN employee e on p.employee_id=e.employee_id JOIN bonuses b on p.bonuses_id=b.bonuses_id";
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
