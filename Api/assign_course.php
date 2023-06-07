<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_assign_course($conn){
    extract($_POST);
    $data = array();
    $query = "insert into assign_course(instructor_id,Course_id,level_id)
    values('$instructor_id','$Course_idd', '$level_id')";

    $result = $conn->query($query);


    if($result){

      //  $row= $result->fetch_assoc();

            $data = array("status" => true, "data" => "Registered succesfully 😂😊😒😎");
        


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function read_assgn_course($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT a.assign_course_id,concat(i.fristname, ' ', i.lastname) as instructor_name,c.Course_name,l.level_name from assign_course a JOIN instructor i on a.instructor_id=i.instructor_id JOIN course c on a.Course_id=c.Course_id JOIN level l on c.level_id=l.level_id  order by assign_course_id ASC";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}





function read_level($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT c.Course_id,l.level_id,l.level_name  from course c JOIN level l on c.level_id=l.level_id 
   WHERE c.Course_id='$course_id'";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_instructor_name($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT i.instructor_id,concat(i.fristname, ' ', i.lastname) as instructor_name from instructor i";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function get_assign_course_info($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM assign_course where assign_course_id= '$assign_course_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_assign_course($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE assign_course set instructor_id = '$instructor_id', Course_id = '$Course_idd', level_id = '$level_id' WHERE assign_course_id= '$assign_course_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_assign_course($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM assign_course where assign_course_id= '$assign_course_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "successfully Deleted😎");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data"=> "Action Required....."));
}


?>