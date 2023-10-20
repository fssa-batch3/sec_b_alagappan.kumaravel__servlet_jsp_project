<!DOCTYPE html>
<html>
<head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   	 <title>My JSP Page</title>
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" type="text/css" href="./assets/css/index.css">
</head>
<body>
 <!-- Header start -->
        <header id="homepage" data-hveid="1">
		
            <div class="logo">
                <img class="logoimg" src="./assets/images/logo1.svg" alt="Sportshub logo">
                <p>
                    SPORTS<b>HUB</b>
                </p>
            </div>
            <div class="nav">
                <a href="#homepage">
                    <button type="button">Home</button>
                </a>
                <a href="#whyus">
                    <button type="button">Why us</button>
                </a>
                <a href="#how">
                    <button type="button">How to use</button>
                </a>
                <a href="index">
                    <div class="btn">Sign up</div>
                </a>
            </div>
            <div class="menu-bar-div">
                <i class="fa-solid fa-bars" id="btn"></i>
                <div class="menu-list">
                    <a href="#homepage">Home</a>
                    <a href="#whyus">Why us</a>
                    <a href="#how">How to use</a>
                    <a href="index">Sign up</a>
                    
                </div>
            </div>
        </header>
        <!-- header ends -->
        <section class="first">
            <div class="center2">
                <div class="imagescroll">
                    <img class="gif1 gif" src="./assets/images/1.gif" alt="loginimage">
                    <img class="gif2 gif"src="./assets/images/2.gif" alt="loginimage">
                    <img class="gif3 gif"src="./assets/images/3.gif" alt="loginimage">
                    <img class="gif4 gif"src="./assets/images/4.gif" alt="loginimage">
                </div>
            </div>
            <div class="para">
                <div class="right">
                    <div>
                        <form action="log_in" method="post">
                            <div>
                                <input id="phonenumber" name="phoneNumber" type="tel" pattern="[0-9]{10}" title="Please enter a valid 10 digit mobile number." placeholder="Phone number" required>
                            </div>
                            <div class="password_outer_div">
								<input id="password" name="password" type="password" placeholder="Password" value="Aa!1aaaa" required>
                                <i id="togglePassword" class="fa-solid fa-eye"></i>
                            </div>
                            <% String data = (String) request.getAttribute("error-login"); %>
                            <% if(data != null){ %>
                            	<p id="error_msg">Invalid phonenumber or password</p>
                            	<%} %>
                            
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                    <div class="or">
                        <hr>
                        <p>
                            <b>(or)</b>
                        </p>
                        <hr>
                    </div>
                    <div class="login">
                        <a href="./pages/login&signup/signup1.html">
                            <button type="button" class="create">Don't have a account yet? Create new</button>
                        </a>
                    </div>
                </div>
                <h1>Sportshub helps you connect and play with people</h1>
				
            </div>
        </section>
        <section class="how" id="how">
            <div>
                <h1>
                    It's easy to start playing on <P class="logoname">
                        SPORTS<b>HUB</b>
                    </P>
                </h1>
                <div>
                    <p>Play Real game with the help of sportshub</p>
                </div>
                <p>Enter into your new game experience by enter your data for making your profile Great!</p>
            </div>
            <div class="how-to-use-box">
                <div class="use-box">
                    <h2>Create A Team</h2>
                    <p>Add your friends or starnger in your team</p>
                    <div class="number-circle-div">
                        <p>1</p>
                    </div>
                    <img src="./assets/images/how 1.png" alt="how to use image">
                </div>
                <div class="use-box">
                    <h2>Create Match</h2>
                    <p>Create match invitation and sent to your friends</p>
                    <div class="number-circle-div">
                        <p>2</p>
                    </div>
                    <img src="./assets/images/how 2.png" alt="how to use image">
                </div>
                <div class="use-box">
                    <h2>Play with friends</h2>
                    <p>Contact new people add play your game with them</p>
                    <div class="number-circle-div">
                        <p>3</p>
                    </div>
                    <img src="./assets/images/how 3.png" alt="how to use image">
                </div>
            </div>
            <div class="video-div">
                <h2>
                    How to <b>Play</b>
                </h2>
                <p>Play video and get know more abous us</p>
                <video controls>
                    <source src="./assets/images/Home page for newmember - Google Chrome 2022-12-30 22-35-16.mp4" type="video/mp4">
                </video>
            </div>
        </section>

        <section id="whyus">
            <h1>
                Why <P class="logoname">
                    SPORTS<b>HUB</b>
                </P>?
            </h1>
            <div class="whyuscontent">
                <div class="box">
                    <img src="./assets/images/coverimage1.jpg" alt="grouptogetherphoto">
                    <h2>Join with Team</h2>
                    <p>Don't have a team or enough players to play game? Join teams or find players for your team to enhance your playing experience using Sportshub.</p>
                </div>
                <div class="box">
                    <img src="./assets/images/coverimage2.jpg" alt="team match photo">
                    <h2>Make match with new friends</h2>
                    <p>Tired of playing against the same team? Use our team finder to face new competition and test your skills against new teams in your area.</p>
                </div>
            </div>
        </section>

        <!-- footer starts -->
        <footer>
            <hr>
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
            <div class="rights">
                <p>Copyright © 2019 - 2022 Sportshub - Website Designed By Alagappan</p>
            </div>
        </footer>
        <!--  footer ends -->
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      <script>
      </script>

    </body>
</body>
</html>
