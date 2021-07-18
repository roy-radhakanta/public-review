<?php
    include "include/config.php";
    if(isset($_POST['userid'])){
        include "class/User.php";
        $userid = htmlspecialchars($_POST['userid']);

        if($userid !== ""){
            $allUserData = User::userProfileData($conn, $userid);
            $toEcho = $allUserData;
        }else{
            $toEcho = $allUserData;
        }
        $objc = ['data' => $toEcho];
        echo json_encode($objc);
    }

    if($_POST['usercheck']!=""){
        include "class/User.php";
        $useridx = htmlspecialchars($_POST['usercheck']);

            $allUserData = User::userValidated($conn, $useridx);
             if($allUserData->status==0){
                $objcx = ['query' => 'true'];
             }else{
                $objcx = ['query' => 'false'];
             }

        echo json_encode($allUserData->status);
    }else{
        echo json_encode(['query' => 'false']);
    }



    ?>