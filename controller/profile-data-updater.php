<?php
    include "../include/config.php";

    if (isset($_POST['toWhome'])) {
        include "../class/User.php";

        $name = htmlspecialchars($_POST['toWhome']);
        $profile_image = $_FILES['profileimage'];
        $firstname =  htmlspecialchars($_POST['firstname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $description =  htmlspecialchars($_POST['userdescription']);
        
        $user_data = User::userProfileData($conn, $name);
        var_dump($user_data);
        exit;

    }else{
        print 'Not Exist';
    }
