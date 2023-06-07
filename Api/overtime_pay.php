<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_overtime_pay($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO overtime_pay(employee_id,month_id,overtime_hours,overtime_rate,Total_amount)
     values('$employee_idd','$month_id','$overtime_hours','$overtime_rate', '$Total_amount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_overtime_pay($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT o.overtime_pay_id,e.fristname,e.lastname,m.month_name as month,o.overtime_hours,o.overtime_rate,o.Total_amount from overtime_pay o JOIN employee e on o.employee_id=e.employee_id JOIN month m on o.month_id=m.month_id ";
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

function read_all_employe($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT e.employee_id,concat(e.fristname, ' ', e.lastname)as employe_name from employee e";
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


function read_over_time_rate($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT e.employee_id,j.overtime_rate from employee e join job_title j on e.job_title_id=j.job_title_id
    WHERE e.employee_id=('$employe_id')";
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
