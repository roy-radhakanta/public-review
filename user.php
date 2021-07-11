<?php
    include "include/config.php";
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        include "class/User.php";
        $userid = htmlspecialchars( $_POST['userid']);

        if($userid !== ""){
            $allUserData = User::userProfileData($conn, $userid);
            $toEcho = $allUserData;
        }else{
            $toEcho = $allUserData;
        }
        $objc = ['data' => $toEcho];
        echo json_encode($objc);
    }

    ?>