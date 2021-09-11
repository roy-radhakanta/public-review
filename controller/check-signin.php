<?php
    include "../include/config.php";
    $message = [];
    if($_SERVER["REQUEST_METHOD"] === "POST"){

        include "../class/User.php";

        function checkEmpty($data){
            if($data === ""){
                return true;
            }
        }

        if (checkEmpty($_POST['email'])) {
            $message[] = "Email Can't Be Empty";
        }

        if (checkEmpty($_POST['password'])) {
            $message[] = "Password Can't Be Empty";
        }

        if(!checkEmpty($_POST['email']) && !checkEmpty($_POST['password'])){
            $email = htmlspecialchars($_POST['email']);
            $password = htmlspecialchars($_POST['password']);
            
            $container = new User();

            if($container::checkLogin($conn, $email, $password)){
                $user = $email;
                $message[] = "success";
                
            }else{
                $message[] = "Credentials Not Match! Try Again";
            }
        }

        if(isset($user)){
            $data = ['message' => $message, 'wYuZrk' => $user];
        }else{
            $data = ['message' => $message];
        }
        
        echo json_encode($data);
    }
?>