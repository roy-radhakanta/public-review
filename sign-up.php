<?php include "include/header.php";?>
<body class="black-bg-body">



    <section class="login__form--container flex align-items-center justify-content-center h-100vh ">
        <div class="login__form  w-40 text-center">
            <div class="login__form--logo">
                <img src="img/logo.png" alt="">
            </div>
            <div class="login__form--text white-text">
                <h1>public review</h1>
                <p class="muted-text">register yourself to comment on your favourite topic</p>
            </div>
            <form method="post" class="w-100">
                <input type="text" name="username" id="username" placeholder="enter your full name">
                <input type="text" name="userpublicname" id="userpublicname" placeholder="enter your public name / userid">
                <input type="text" name="useremailaddress" id="useremail" placeholder="enter your email address">
                <input type="password" name="createpassword" id="createpassword" placeholder="******">
                <div class="loing__form--button">
                <button class="button">Sign Up</button>
            </div>
            </form>
            <a href="./" class="anchor muted-text">already sign up ? <span class="stand-out">sign in</span> </a>
        </div>
    </section>



<?php include "include/footer.php";?>