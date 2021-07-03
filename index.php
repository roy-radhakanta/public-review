<?php include "include/header.php";?>
<body class="black-bg-body">



    <section class="login__form--container flex align-items-center justify-content-center h-100vh ">
        <div class="login__form  w-40 text-center">
            <div class="login__form--logo">
                <img src="img/logo.png" alt="">
            </div>
            <div class="login__form--text white-text">
                <h1>public review</h1>
                <p class="muted-text">sign in to comment on your favourite topic</p>
            </div>
            <form method="post" class="w-100">
                <input type="text" name="userid" id="userid" placeholder="enter your user id">
                <input type="password" name="password" id="password" placeholder="******">
                <div class="loing__form--button">
                <button class="button">Sign In</button>
            </div>
            </form>
            <a href="sign-up.php" class="anchor muted-text">don't have account ? <span class="stand-out">sign up</span> </a>
            
        </div>
    </section>





    <?php include "include/footer.php";?>