<?php

    session_start();
    include "../class/Connection.php";
    ini_set('display_errors', 'On'); ini_set('html_errors', 0); error_reporting(-1);
    $db = new Connection();
    $conn = $db->dbConnect();
?>