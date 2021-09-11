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
        // var_dump($user_data);

        if($user_data->email_address === $name){
        
            if($user_data->status === '1'){
                $exitsOrNot = User::checkOneForExistanceByCondition($conn, $user_data->id, 'registered_users', 'user_registration_id', PDO::PARAM_INT);
               //check if exits update it or insert it-=======================
            }else{
                $updatedOrNot = User::updateOneColumnByOneCondition($conn, 'user_registration', 'status', 1, 'email_address', $name);
                $exitsOrNot = User::checkOneForExistanceByCondition($conn, $user_data->id, 'registered_users', 'user_registration_id', PDO::PARAM_INT);
                if($exitsOrNot){
                    echo 'not 2';
                }
            }
          

          //user already exits in registered_users table or not
            print $exitsOrNot = User::checkOneForExistanceByCondition($conn, $user_data->id, 'registered_users', 'user_registration_id', PDO::PARAM_INT);


        //    if($updatedOrNot){
        //             $userClass = new User();
        //             $userClass->user_intro = $description;
        //             $userClass->profile_img = $profile_image;
        //             if($userClass->updateByRegisteredUserId($conn, $userClass->user_registration_id)){
        //                 echo "yes";
        //             }
        //    }else{
        //        echo "No";
        //    }
        }
    }else{
        print 'Not Exist';
    }
