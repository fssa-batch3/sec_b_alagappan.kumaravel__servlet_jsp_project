<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign up for Sportshub</title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        >
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,500;1,300;1,500&display=swap"
            rel="stylesheet"
        >
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Clicker+Script&family=Lobster&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@200;300;400;500;600&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
        >
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        >
        <link rel="stylesheet" href="./assets/css/signup1.css">
        <link rel="stylesheet" href="./assets/css/footerloginsignup.css">
    </head>

    <body>
        <main>
            <div id="content">
                <div class="signup">
                    <img
                        class="logo"
                        src="./assets/images/logo.png"
                        alt="sportshub logo"
                    >
                    <p>Sportshub helps you connect and play with people</p>
                    <form onsubmit="signUp_1(event);">
                        <!-- <div> -->
                        <input
                            id="phonenumber"
                            pattern="[0-9]{10}"
                            type="tel"
                            title="Please enter a valid 10 digit mobile number."
                            placeholder="Phone number"
                            required
                        >

                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            title="Use firstletter between (A-Z) and min 15 character"
                            pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,15}$"
                            value="Aahha"
                            required
                        >
                        <div class="password_outer_div">
                            <input
                                onkeyup="mytest()"
                                id="password"
                                type="password"
                                title="Use (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)"
                                placeholder="Password"
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                value="Aa!1aaaa"
                                required
                            >
                            <i id="togglePassword" class="fa-solid fa-eye"></i>
                        </div>
                        <div class="password_error_not_ok">
                            <p>
                                <i class="fa-solid fa-circle-exclamation"></i> Weak : Use
                                (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)
                            </p>
                        </div>
                        <div class="password_error_ok">
                            <i class="fa-solid fa-circle-check"></i>
                            <p>Strong</p>
                        </div>
                        <div class="password_outer_div">
                            <input
                                id="confirm_password"
                                type="password"
                                placeholder="Confrim Password"
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                value="Aa!1aaaa"
                                required
                            >
                            <i id="togglePassword_con" class="fa-solid fa-eye"></i>
                        </div>
                        <p class="wrong_password"></p>
                        <button type="submit" class="signupbtn">Sign up</button>
                    </form>
                </div>
                <div class="login">
                    <p>Have an account?</p>
                    <a href="../../index.html">Log in</a>
                </div>
            </div>
        </main>
        <hr >
        <footer>
            <p>Follow us on</p>
            <div>
                <a href="#">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
            <div class="rights">
                <p>Copyright � 2019 - 2022 Sportshub - Website Designed By Alagappan</p>
            </div>
        </footer>

        <script>
        
         function signUp_1(e) {
        	  e.preventDefault();
        	  // here i collect value from signUp form
        	  const phonenumber = document.getElementById("phonenumber").value;
        	  const username = document.getElementById("username").value;
        	  const password = document.getElementById("password").value;
        	  const confrim_password = document.getElementById("confirm_password").value;

        	  const wrong_password = password !== confrim_password;

        	  if (wrong_password) {
        	    temp = document.querySelector(".wrong_password").innerHTML =
        	      "Password not match.  ";
        	    return temp;
        	  }

        	  user_detail_single = {
        	    phoneNumber: phonenumber,
        	    userName: username,
        	    password,
        	    confirmPassword: confrim_password,
        	  };

        	  localStorage.setItem("user_data", JSON.stringify(user_detail_single));

        	  document.querySelector("form").reset();

        	  window.location.href="sign_up_2.jsp";
        	}
        </script>
    </body>
</html>
