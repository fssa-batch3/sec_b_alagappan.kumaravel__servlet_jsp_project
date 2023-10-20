<!DOCTYPE html>
<%@page import="in.fssa.sportshub.model.Player"%>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home page</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer">
        <link rel="stylesheet" href="./assets/css/overall.css">
        <link rel="stylesheet" href="./assets/css/footerhome.css">
        <link rel="stylesheet" href="./assets/css/homepage_content.css">

    </head>

    <body>
    <% int playerId = (int) request.getSession().getAttribute("playerId"); %>
	<% int teamId = (int) request.getSession().getAttribute("teamId"); %>
	<% int teamCaptainRelationId = (int) request.getSession().getAttribute("teamCaptainRelationId"); %>
	 <% Player player = (Player) request.getAttribute("player"); %>
        <!-- sidebar start -->
        <input type="checkbox" id="check">
        <label for="check">
            <i class="fa-solid fa-bars" id="btn"></i>
            <!-- <i class="fa-solid fa-xmark" id="cancel"></i> -->
        </label>
        <div class="sandwich">
            <!-- <a onclick="profilepage()"> -->
            <div class="sidebar-profile">
                <div class="playerimagediv">
                    <img class="player_image" src="<%= player.getUrl() %>" alt="playerprofile">
                </div>
                <div class="playerdetailsdiv">
                    <h1 id="player_name"><%= player.getUserName() %></h1>
                    <p id="player_number"><%= player.getPhoneNumber() %></p>
                    <div class="range_div">
                        <div class="range_back_home">
                            <div class="range_cover"></div>
                        </div>
                        <label class="range-label"></label>
                    </div>
                </div>
                <label for="check">
                    <i class="fa-solid fa-xmark" id="cancel"></i>
                </label>
            </div>
            <div class="sidebar-nav">
                <table class="sidebar-navtable">
                    <caption></caption>
                    <thead>
                        <th></th>
                    </thead>
                    <tbody>
                    <%if(teamId > 0){ %>
                        <tr class="in_team">
                            <td>
                                <a href="team/detail?teamId=<%= teamId %>">
                                    <i class="fa-solid fa-people-group"></i>
                                </a>
                            </td>
                            <td>
                                <a href="team/detail?teamId=<%= teamId %>">
                                    <p>My Team</p>
                                </a>
                            </td>
                        </tr>

                        <tr class="in_team">
                            <td>
                                <a href="response?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <i class="fa-regular fa-envelope"></i>
                                </a>
                            </td>
                            <td>
                                <a href="response?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <p>Response</p>
                                </a>
                            </td>
                        </tr>
                <!--         <tr class="not_in_team">
                            <td>
                                <a onclick="teamResponseNew()">
                                    <i class="fa-regular fa-envelope"></i>
                                </a>
                            </td>
                            <td>
                                <a onclick="teamResponseNew()">
                                    <p>Response</p>
                                </a>
                            </td>
                        </tr> -->
                        
                        <tr class="captain">
                            <td>
                                <a href="match_request/new?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <i class="fa-solid fa-circle-plus"></i>
                                </a>
                            </td>
                            <td>
                                <a href="match_request/new?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <p>Create Match</p>
                                </a>
                            </td>
                        </tr>

                        <tr class="in_team">
                            <td>
                                <a href="invitation?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <i class="fa-regular fa-envelope"></i>
                                </a>
                            </td>
                            <td>
                                <a href="invitation?teamCaptainRelId=<%= teamCaptainRelationId %>">
                                    <p>Invitation</p>
                                </a>
                            </td>
                        </tr>

                        

                        <tr class="in_team">
                            <td>
                                <a onclick="myMatch()">
                                    <i class="fa-regular fa-calendar-days"></i>
                                </a>
                            </td>
                            <td>
                                <a onclick="myMatch()">
                                    <p>My matches</p>
                                </a>
                            </td>
                            
                        </tr>
                        <%}else{ %>
                        <tr class="not_in_team">
                            <td>
                                <a href="team/new">
                                    <i class="fa-solid fa-circle-plus"></i>
                                </a>
                            </td>
                            <td>
                                <a href="team/new">
                                    <p>Create a team</p>
                                </a>
                            </td>
                        </tr>
                        
                        
                        <%} %>
                    </tbody>
                </table>
                <table class="sidebar-navtable">
                    <caption></caption>
                    <thead>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <i class="fa-regular fa-face-smile-beam"></i>
                            </td>
                            <td>
                                <p>About</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="fa-regular fa-face-rolling-eyes"></i>
                            </td>
                            <td>
                                <p>Why us</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="fa-sharp fa-solid fa-question"></i>
                            </td>
                            <td>
                                <p>How to use</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- sidebar end -->
        <section class="laptop-header">
            <div></div>
            <div class="logodiv">
                <img class="logo" src="./assets/images/logo1.svg" alt="Sportshub logo">
                <p>
                    SPORTS<b>HUB</b>
                </p>
            </div>
            <div class="header-list">
                <div class="header-sub-list">
                    <div>
                        <p>Matches</p>
                    </div>
                    <div>
                        <a href="match_request/new?teamCaptainRelId=<%= teamCaptainRelationId %>">Create Match</a>
                        <a onclick="myMatch()">My matches</a>
                        <!-- <a href="#">Others Response</a> -->
                    </div>
                </div>
                <div class="header-sub-list">
                    <div>
                        <p>Requests</p>
                    </div>
                    <div>
                        <a href="invitation?teamCaptainRelId=<%= teamCaptainRelationId %>">Invitations</a>
                        <a onclick="playerRequest()">Players Requests</a>
                    </div>
                </div>
                <div class="header-sub-list">
                    <div>
                        <p>Profile</p>
                    </div>
                    <div>
                        <!-- <a href="#">My Profile</a> -->
                        <a href="team/detail?teamId=<%= teamId %>">My team</a>
                    </div>
                </div>
                <div class="header-sub-list">
                    <div>
                        <p>More</p>
                    </div>
                    <div>
                        <a onclick="jointeambtn()">Open For players</a>
                    </div>
                </div>

            </div>
            <a href="../search and notification/searchbar.html">
                <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <a href="../search and notification/notification.html">
                <i class="fa-regular fa-bell"></i>
            </a>
        </section>
        <!-- header start -->
        <header class="headerdiv">
            <div></div>
            <div class="logodiv">
                <img class="logo" src="./assets/images/logo1.svg" alt="Sportshub logo">
                <p>
                    SPORTS<b>HUB</b>
                </p>
            </div>
            <a href="../search and notification/searchbar.html">
                <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <!-- <a onclick="myMatch()"><i class="fa-regular fa-calendar-days"></i></a> -->
            <a href="../search and notification/notification.html">
                <i class="fa-regular fa-bell"></i>
            </a>
        </header>
        <!-- header end -->

        <main>

            <div class="homepage-content">
                <div class="content-subheader">
                    <h1>Your area upcomming Stars.</h1>
                </div>
                <div class="top_three_players_container">
                    <div class="top_three_players_div">
                        <div class="players_back_image">
                            <div class="award">
                                <i class="fa-solid fa-award"></i>
                                <p>FIRST</p>
                            </div>
                            <div class="players_mvp_detials">
                                <p class="user_name">Hit man</p>
                                <p class="mvp_number">21</p>
                                <p class="mvp_name">Mvps</p>
                                <div class="rating">
                                    <i class="fa-solid fa-star"></i>
                                    <p>Rating</p>
								
                                    <p>(4.2)</p>
                                    <i class="fa-solid fa-star"></i>
                                </div>
							
                            </div>
                        </div>

                        <button class="profilebtn">VIEW PROFILE</button>
                    </div>

                    <div class="top_three_players_div">
                        <div class="players_back_image">
                            <div class="award">
                                <i class="fa-solid fa-award"></i>
                                <p>SECOND</p>
                            </div>
                            <div class="players_mvp_detials">
                                <p class="user_name">Hit man</p>
                                <p class="mvp_number">21</p>
                                <p class="mvp_name">Mvps</p>
                                <div class="rating">
                                    <i class="fa-solid fa-star"></i>
                                    <p>Rating</p>
								
                                    <p>(4.2)</p>
                                    <i class="fa-solid fa-star"></i>
                                </div>
							
                            </div>
                        </div>

                        <button class="profilebtn">VIEW PROFILE</button>
                    </div>

                    <div class="top_three_players_div">
                        <div class="players_back_image">
                            <div class="award">
                                <i class="fa-solid fa-award"></i>
                                <p>THIRD</p>
                            </div>
                            <div class="players_mvp_detials">
                                <p class="user_name">Hit man</p>
                                <p class="mvp_number">21</p>
                                <p class="mvp_name">Mvps</p>
                                <div class="rating">
                                    <i class="fa-solid fa-star"></i>
                                    <p>Rating</p>
								
                                    <p>(4.2)</p>
                                    <i class="fa-solid fa-star"></i>
                                </div>
							
                            </div>
                        </div>

                        <button class="profilebtn">VIEW PROFILE</button>
                    </div>

                    <div class="content-subheader">
                        <h1>Your area upcomming Stars.</h1>
                    </div>
                    <div class="top_three_players_container">
                        <div class="top_three_players_div">
                            <div class="players_back_image">
                                <div class="award">
                                    <i class="fa-solid fa-award"></i>
                                    <p>FIRST</p>
                                </div>
                                <div class="players_mvp_detials">
                                    <p class="user_name">Hit man</p>
                                    <p class="mvp_number">21</p>
                                    <p class="mvp_name">Mvps</p>
                                    <div class="rating">
                                        <i class="fa-solid fa-star"></i>
                                        <p>Rating</p>
								
                                        <p>(4.2)</p>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
							
                                </div>
                            </div>

                            <button class="profilebtn">VIEW PROFILE</button>
                        </div>

                        <div class="top_three_players_div">
                            <div class="players_back_image">
                                <div class="award">
                                    <i class="fa-solid fa-award"></i>
                                    <p>SECOND</p>
                                </div>
                                <div class="players_mvp_detials">
                                    <p class="user_name">Hit man</p>
                                    <p class="mvp_number">21</p>
                                    <p class="mvp_name">Mvps</p>
                                    <div class="rating">
                                        <i class="fa-solid fa-star"></i>
                                        <p>Rating</p>
								
                                        <p>(4.2)</p>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
							
                                </div>
                            </div>

                            <button class="profilebtn">VIEW PROFILE</button>
                        </div>

                        <div class="top_three_players_div">
                            <div class="players_back_image">
                                <div class="award">
                                    <i class="fa-solid fa-award"></i>
                                    <p>THIRD</p>
                                </div>
                                <div class="players_mvp_detials">
                                    <p class="user_name">Hit man</p>
                                    <p class="mvp_number">21</p>
                                    <p class="mvp_name">Mvps</p>
                                    <div class="rating">
                                        <i class="fa-solid fa-star"></i>
                                        <p>Rating</p>
								
                                        <p>(4.2)</p>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
							
                                </div>
                            </div>

                            <button class="profilebtn">VIEW PROFILE</button>
                        </div>
                    </div>		
                </div>

            </div>
            <!-- main bottom footer start -->
            <div class="bottom-main">
            <%if(teamId > 0){ %>
                <a class="captain" href="match_request/new?teamCaptainRelId=<%= teamCaptainRelationId %>">
                    <div class="bottom-one">
                        <i class="fa-solid fa-circle-plus"></i>
                        <p>Create Match</p>
                    </div></a>

                <a class="in_team" href="response?teamCaptainRelId=<%= teamCaptainRelationId %>">
                    <div class="bottom-one">
                        <i class="fa-solid fa-reply"></i>
                        <p>Response</p>
                    </div></a>
				<%}else{ %>
                <a class="not_in_team" href="team/new">
                    <div class="bottom-one">
                        <i class="fa-solid fa-circle-plus"></i>
                        <p>Create team</p>
                    </div></a>
                 <%} %>
            </div>
            <!-- main bottom footer end -->
        </main>
        <!-- footer starts -->
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
            <div>
                <a href="#">About</a>
                <a href="#">Why us</a>
                <a href="#">How to use</a>
            </div>
            <div class="rights">
                <p>Copyright © 2019 - 2022 Sportshub - Website Designed By Alagappan</p>
            </div>
        </footer>
        <!--  footer ends -->	
    </body>

</html>