<?php

    if (isset($_POST['firstname'])) {
        // $name = htmlspecialchars($_POST['toWhome']);
        $profile_image =  htmlspecialchars($_POST['profileImage']);
        $firstname =  htmlspecialchars($_POST['firstname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $description =  htmlspecialchars($_POST['description']);

        var_dump($profile_image);
        
    }else{print 'no';}
