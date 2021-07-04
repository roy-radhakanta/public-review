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
}

?>