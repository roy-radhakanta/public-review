<?php

    if (isset($_POST['toWhome'])) {
        $name = htmlspecialchars($_POST['toWhome']);
        $profile_image = $_FILES['profileimage'];
        $firstname =  htmlspecialchars($_POST['firstname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $description =  htmlspecialchars($_POST['userdescription']);

        echo $_POST['toWhome'];
        
    }else{print 'no';}
