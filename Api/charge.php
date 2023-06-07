<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_charge($conn)
{
    extract($_POST);
    $data = array();
    $query = "CALL charges('$month', '$year', '$description', '$Account_id', '$user_id')";

    $result = $conn->query($query);


    if ($result) {

        $row = $result->fetch_assoc();
        if ($row['msg'] == 'Deny') {
            $data = array("status" => false, "data" => "Insuficance Balance😜");
        } elseif ($row['msg'] == 'Registered') {
            $data = array("status" => true, "data" => "transaction successfully ✅");
        } elseif ($row['msg'] == 'NOt') {
            $data = array("status" => false, "data" => "Horay Ayaa loogu dalacay lacagta bishaan ❌");
        }
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_charge($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT c.charge_id,concat(e.fristname, ' ', e.lastname) as employe_name,j.job_title_name as job_title,c.Amount as salary,c.month,c.year,c.description,a.bank_name,u.username as userki_dalacay,c.date from charges c JOIN employee e on c.employee_id=e.employee_id JOIN job_title j on
    c.job_title_id=j.job_title_id JOIN account a on c.Account_id=a.Account_id JOIN users u on c.user_id=u.id order by charge_id
    ";
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
