<?php
class User{
    public $id;
    public $user_fullname;	
    public $user_name; 
    public $email_address;
    public $password;	
    public $reg_date;
    public $status;

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

    public static function userValidated($conn, $userid){
        $sql = "SELECT * FROM user_registration WHERE email_address = :userid";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':userid', $userid, PDO::PARAM_STR);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
        $stmt->execute();
        if($countExits = $stmt->rowCount()){
            if($countExits > 0){
                return  $userDetails = $stmt->fetch();
            };
        }
    }	
}

?>