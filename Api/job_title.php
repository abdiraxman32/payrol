<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];



function register_job_title($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO job_title(job_title_name,salary)
     values('$job_title_name', '$salary')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_job_title($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from job_title";
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

function get_job_title($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM job_title where job_title_id= '$job_title_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_job_title($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE job_title set job_title_name = '$job_title_name', salary= '$salary' WHERE job_title_id = '$job_title_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
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
