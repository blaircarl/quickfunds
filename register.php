<?php

include 'connect.php';

if (isset($_POST["sign up"])){
$name=$_post ['name'];
$email=$_post['email'];
$password=$_post['password'];
$password=md5($password);


   $checkEmail= "SELECT * Form users where  email='$email'";
   $result=$conn->query($checkEmail);
   if($result->num_rows>0){
     echo "Email addres Already Exists !"
   }
   else{
       $insertquery="INSERT INTO users(name,email,password)
                     Values ($name','$email','$password)";
            if($con->query($insertquery)==TRUE){
                header("location:loanappl.php");
            }
            else{
                echo "error:".$conn->errpr;
            }
        }

    }

    if (isset($_POST['signin'])){
       $email=$_POST ['email'];
       $password=$_POST['passsword'];
       $password=md5($password)

       $sql="SELECT * FROM users WHERE email='$emal' and password='$password'";
       $result=$conn->query ($sql);
        if ($result->num_rows>0){
            session_start();
            $row=$result->fetch_assoc();
            $_SESSION['email']=$row['email'];
            header("location: loanappl.php")
            exit();
        }
        else{   
            echo "Not found,incorectEmail or passsword"; 
}
?> 