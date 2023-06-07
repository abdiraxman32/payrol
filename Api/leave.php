<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];
function register_leave_info($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO leave_info(leave_type,leave_balance)
     values('$leave_type', '$leave_balance')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_leave_info($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from leave_info";
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

function get_leave_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM leave_info where leave_info_id= '$leave_info_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_leave_info($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE leave_info set leave_type = '$leave_type', leave_balance= '$leave_balance' WHERE leave_info_id = '$leave_info_id'";


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
