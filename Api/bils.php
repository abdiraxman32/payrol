<?php
header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];


function read_employe_salary($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_employe_salary('$employe_id')";
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

function register_bills($conn)
{
    extract($_POST);
    $data = array();
    $query = "CALL bills_sp('$employee', '$amount', '$month', '$year', '$description', '$user')";
    $result = $conn->query($query);

    if ($result) {

        $data = array("status" => true, "data" => "Transaction Successfully");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }


    echo json_encode($data);
}



function read_bills($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT b.id,concat(e.fristname, ' ', e.lastname) as employe_name, b.Amount as salary, b.month,b.year,b.description,u.username as user,b.date from bills b JOIN employee e on b.employee_id=e.employee_id JOIN users u on b.user=u.id";
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



// function read_bills_statement($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "CALL read_bill_statement('$tellphone')";
//     $result = $conn->query($query);


//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }



function read_all_employee_name($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT e.employee_id,concat(e.fristname, ' ', e.lastname) as employe_name from charges c JOIN employee e on c.employee_id=e.employee_id";
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
