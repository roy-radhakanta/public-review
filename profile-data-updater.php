<?php
    include "include/config.php";

    if (isset($_POST['toWhome'])) {
        include "class/User.php";

        $name = htmlspecialchars($_POST['toWhome']);
        $profile_image = $_FILES['profileimage'];
        $firstname =  htmlspecialchars($_POST['firstname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $lastname =  htmlspecialchars($_POST['lastname']);
        $description =  htmlspecialchars($_POST['userdescription']);
        
        $user_data = User::userProfileData($conn, $name);
        // var_dump($user_data);
        if($user_data->email_address === $name){
           $updatedOrNot = User::updateOneColumnByOneCondition($conn, 'user_registration', 'status', 1, 'email_address', '22@gmail.com');
           if($updatedOrNot){
               $userDetails = User::userValidated($conn, $name);
               $userAlreadyRegistered = User::checkUserRegistered($conn, $userDetails->id);
               $userClass = new User();
               if($userAlreadyRegistered){
                    $userClass->user_intro = $description;
                    $userClass->profile_img = $profile_image;
                    if($userClass->updateByRegisteredUserId($conn)){
                        echo "yes";
                    }
               }else{
                   
               }
           }else{
               echo "No";
           }
        }
    }else{
        print 'no';
    }
