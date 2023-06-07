<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_timeatendence($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO time_and_attendence (employee_id, month_id,total_hours_work,overtime_hours)
     values('$employe_iid', '$month_id', '$total_hours_work', '$overtime_hours')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_employeeee_name($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT e.employee_id,concat(e.fristname, ' ', e.lastname)as employee from employee e";
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


function read_all_timeatendence($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT t.time_and_attendence_id,concat(e.fristname, ' ', e.lastname) as employe_name, m.month_name,t.total_hours_work,t.overtime_hours from time_and_attendence t JOIN employee e on t.employee_id=e.employee_id JOIN month m on t.month_id=m.month_id ";
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
