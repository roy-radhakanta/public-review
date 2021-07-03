<?php

	class Connection
	{
		public static function dbConnect(){
			$db_host = "localhost";
			$db_name = "portfolio_rk";
			$db_user = "root";
			$db_pass = "";

			$dsn = 'mysql:host=' . $db_host . ';dbname=' . $db_name . ';charset=utf8';
			try{
				$db = new PDO($dsn, $db_user, $db_pass);
				$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $db;
			}catch(PDOException $e){
				echo $e->getMessage();
				exit;
			}
		}
	}