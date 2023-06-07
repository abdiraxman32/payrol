<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function register_employee($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO employee (fristname, lastname, phone, address,city,department_id,job_title_id,shift_id)
     values('$fristname', '$lastname', '$phone', '$address', '$city','$department_id', '$job_title_id', '$shift_id')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_employe_statement($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL employe_statement('$telphone')";
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





function read_all_employee($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT e.employee_id,e.fristname,e.lastname,e.phone,e.address,e.city,d.department_name as department,j.job_title_name as job, j.salary,s.shift_name as shift from employee e JOIN department d on e.department_id=d.department_id JOIN job_title j on e.job_title_id=j.job_title_id JOIN shift s on e.shift_id=s.shift_id";
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



function get_employee_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM employee where employee_id= '$employee_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function update_employee($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE employee set fristname = '$fristname', lastname = '$lastname', phone = '$phone', address = '$address', city= '$city', department_id = '$department_id', job_title_id = '$job_title_id', shift_id= '$shift_id' WHERE employee_id = '$employee_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_employee($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM employee where employee_id= '$employee_id'";
    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Deleted😎");
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
