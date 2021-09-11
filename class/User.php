<?php
class User{
    public $id;
    public $user_fullname;	
    public $user_name; 
    public $email_address;
    public $password;	
    public $reg_date;
    public $status;

    public $regi_id;
    public $user_registration_id;
    public $user_intro;
    public $user_specilization;
    public $profile_img;
    public $linkedin_profile;
    public $cariculam_profile;
    public $specilization_show;
    public $linkedin_profile_show;
    public $cariculam_profile_show; 	

    public function registerUser($conn){
        $sql = "INSERT INTO user_registration(user_fullname, user_name, email_address, password, status) VALUES(:user, :pubname, :email, :password, :status)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':user', $this->user_fullname, PDO::PARAM_STR);
        $stmt->bindValue(':pubname', $this->user_name, PDO::PARAM_STR);
        $stmt->bindValue(':email', $this->email_address, PDO::PARAM_STR);
        $stmt->bindValue(':password', $this->password, PDO::PARAM_STR);
        $stmt->bindValue(':status', $this->status, PDO::PARAM_STR);
        if($stmt->execute()){
            $this->id = $conn->lastInsertId();
			return true;
        }else{
            return false;
        }
    }

    public static function checkLogin($conn, $userEmail, $userPass){
        $sql = "SELECT * FROM user_registration WHERE email_address=:email";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $userEmail, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
        $stmt->execute();
        $account = $stmt->fetch();
        if ($account) {
            if($account->password === $userPass){
                $_SESSION['email'] = $account->email_address;
                return true;
            }
        }else{
            return false;
        }       
    }

    public static function userProfileData($conn, $userid){
        $sql = "SELECT * FROM user_registration WHERE email_address = :userid LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':userid', $userid, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
        if($stmt->execute()){
            return $stmt->fetch();
        }
    }

    public static function checkOneForExistanceByCondition($conn, $findIt, $from, $condition, $type){
        $sql = "SELECT * FROM $from WHERE $condition = :findit";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':findit', $findIt, $type);
    
        $stmt->execute();
        $countExits=$stmt->rowCount();
    
            if($countExits > 0){
                return  true;
            }else{
                return false;
            }
    }	

    public static function updateOneColumnByOneCondition($conn, $table, $column_name, $value, $condition_column, $condition_match){
        $sql = "UPDATE $table SET $column_name = :columnvalue WHERE $condition_column = :matchvalue";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':columnvalue', $value, PDO::PARAM_INT);
        $stmt->bindValue(':matchvalue', $condition_match, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    public static function checkUserRegistered($conn, $userId){
        $sql = "SELECT * FROM registered_users WHERE user_registration_id=:userid";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':userid', $userId, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    public function updateByRegisteredUserId($conn, $regid){
        $sql = "UPDATE registered_users SET user_intro=:intro, profile_img=:profileimg WHERE user_registration_id=:user_registered";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':user_registered', $this->user_registration_id, PDO::PARAM_INT);
        $stmt->bindValue(':intro', $this->user_intro, PDO::PARAM_STR);
        $stmt->bindValue(':profileimg', $this->profile_img, PDO::PARAM_STR);
        if($stmt->execute()){
            return true;
        }
    }
}

?>