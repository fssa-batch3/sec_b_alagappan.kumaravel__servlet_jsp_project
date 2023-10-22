<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login to Sportshub</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,500;1,300;1,500&display=swap"
            rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Clicker+Script&family=Lobster&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@200;300;400;500;600&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="./assets/css/signup2.css">
        <link rel="stylesheet" href="./assets/css/footerloginsignup.css">
    </head>

    <body>
        <main>
            <div id="content">
                <div class="border">
                    <div>
                        <img class="logo" src="./assets/images/logo.png" alt="sportshub logo">
                    </div>
                    <div class="form">
                        <form role="form" class="signup2_form">
                            <div>
                                <label>DOB</label>
                                <input id="date_of_birth" type="date" required>
                            </div>
                            <div>
                                <label>Gender</label>
                                <select id="gender" required>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div>
                                <label>Area</label>
                                <input id="area" type="text" placeholder="Eg: annanagar" title="Use only lowercase(abc...z)" pattern="[a-z]{3,}" required>
                            </div>
                            <div>
                                <label>District</label>
                                <input id="distric" type="text" placeholder="Eg: chennai" title="Use only lowercase(abc...z)" pattern="[a-z]{3,}" required>
                            </div>
				
                            <button class="nextbtn" type="submit">Submit & Lets Rock</button>
                        </form>
                    </div>
                    <div class="back">
                        <a href="sign_up_1.jsp">Go Back</a>
                    </div>
                </div>
                <div class="login">
			
                    <p>Have an account?</p>
                    <a href="./">Log in</a>
                </div>
            </div>
        </main>
        <hr>
        <!-- footer -->
        <footer>
            <p>Follow us on</p>
            <div>
                <a href="#">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="#">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
            <!-- <div>
                <a href="../../index.html">About</a>
                <a href="https://wa.link/2dqeou">Contact</a>
                </div> -->
            <div class="rights">
                <p>Copyright � 2019 - 2022 Sportshub - Website Designed By Alagappan</p>
            </div>
        </footer>
        <script src="./assets/js/vendor/lib/moment/moment.min.js"></script>
    </body>

</html>