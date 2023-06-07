<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];



function register_bonuses($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO bonuses(bonuses_type,amount)
     values('$bonuses_type', '$amount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_bonuses($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from bonuses";
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

function get_bonuses($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM bonuses where bonuses_id= '$bonuses_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_bonuses($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE bonuses set bonuses_type = '$bonuses_type', amount= '$amount' WHERE bonuses_id = '$bonuses_id'";


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
