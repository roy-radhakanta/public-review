<?php
    include "include/config.php";
    $message = [];
    if($_SERVER["REQUEST_METHOD"] == "POST"){

        if($_POST['fullname'] === ""){
            $message[] = "Name Can't be Empty";
        }
        if($_POST['publicname'] === ""){
            $message[] = "User Name Can't be Empty";
        }
        if($_POST['email'] === ""){
            $message[] = "Email Address Can't be Empty";
        }
        if($_POST['password'] === ""){
            $message[] = "Password Can't be Empty";
        }

        if(!empty($_POST['fullname']) && !empty($_POST['publicname']) && !empty($_POST['email']) && !empty($_POST['password']) ){
            include "class/User.php";
            $formAction = new User();

            $formAction->user_fullname = htmlspecialchars($_POST['fullname']);
            $formAction->user_name = htmlspecialchars($_POST['publicname']);
            $formAction->email_address = htmlspecialchars($_POST['email']);
            $formAction->password = htmlspecialchars($_POST['password']);
            $formAction->status = '0';

            if($formAction->registerUser($conn)){
                $message[] = "Registration Complete";
            }else{
                $message[] = "Error! In Process";
            }
        }        
        echo json_encode(['message' => $message]);
    }

?>