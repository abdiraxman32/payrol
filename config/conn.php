<?php

$conn = new mysqli("localhost", "root", "", "payrol");

if ($conn->connect_error) {
    echo $conn->error;
}
