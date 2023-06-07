<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_deduction($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO deduction(deduction_type,amount)
     values('$deduction_type', '$amount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_deduction($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from deduction";
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

function get_deduction($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM deduction where deduction_id= '$deduction_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_deduction($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE deduction set deduction_type = '$deduction_type', amount= '$amount' WHERE deduction_id = '$deduction_id'";


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
