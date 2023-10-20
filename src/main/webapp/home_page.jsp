<!DOCTYPE html>
<%@page import="in.fssa.sportshub.model.TeamDetailDTO"%>
<%@page import="java.util.Set"%>
<%@page import="in.fssa.sportshub.model.Player"%>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Home page</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
	integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="./assets/css/overall.css">
<link rel="stylesheet" href="./assets/css/footerhome.css">
<link rel="stylesheet" href="./assets/css/homepage_content.css">

</head>

<body>
	<%
	int playerId = (int) request.getAttribute("playerId");
	%>
	<%
	int teamId = (int) request.getAttribute("teamId");
	%>
	<%
	boolean captainStatus = (boolean) request.getAttribute("is_captain");
	%>
	<%
	int teamCaptainRelationId = (int) request.getAttribute("teamCaptainRelationId");
	%>
<%
  Player player = (Player) request.getAttribute("player");
int label_value = 0;
double range_value = 0.0d;
  if (player != null) {
    String username = player.getUserName();
    String firstname = player.getFirstName();
    String lastname = player.getLastName();
    String dateofbirth = "yes";
    String gender = "yes";
    String area = player.getAddress().getArea();
    String district = player.getAddress().getDistrict();
    String about = player.getAbout();
    String image = player.getUrl();

    int key_count = 9; // Number of keys you have

    int null_count = 0;
    if (username == null || username.isEmpty()) null_count++;
    if (firstname == null || firstname.isEmpty()) null_count++;
    if (lastname == null || lastname.isEmpty()) null_count++;
    if (dateofbirth == null || dateofbirth.isEmpty()) null_count++;
    if (gender == null || gender.isEmpty()) null_count++;
    if (area == null || area.isEmpty()) null_count++;
    if (district == null || district.isEmpty()) null_count++;
    if (about == null || about.isEmpty()) null_count++;
    if (image == null || image.isEmpty()) null_count++;

     range_value = 100.0 - ((double) null_count / key_count) * 100.0;
    
     label_value = (int) range_value;
  }
%>
	<%
	Set<TeamDetailDTO> teamList = (Set<TeamDetailDTO>) request.getAttribute("teamList");
	%>
	<!-- sidebar start -->
	<input type="checkbox" id="check">
	<label for="check"> <i class="fa-solid fa-bars" id="btn"></i> <!-- <i class="fa-solid fa-xmark" id="cancel"></i> -->
	</label>
	<div class="sandwich">
		<!-- <a onclick="profilepage()"> -->
		<div class="sidebar-profile">
			<div class="playerimagediv">
				<img class="player_image" src="<%=player.getUrl()%>"
					alt="playerprofile">
			</div>
			<div class="playerdetailsdiv">
				<h1 id="player_name"><%=player.getUserName()%></h1>
				<p id="player_number"><%=player.getPhoneNumber()%></p>
				<div class="range_div">
					<div class="range_back_home">
						<div class="range_cover" style="width:<%= (int)range_value %>%;"></div>
					</div>
					<label class="range-label" ><%= label_value %> %</label>
				</div>
			</div>
			<label for="check"> <i class="fa-solid fa-xmark" id="cancel"></i>
			</label>
		</div>
		<div class="sidebar-nav">
			<table class="sidebar-navtable">
				<caption></caption>
				<thead>
					<th></th>
				</thead>
				<tbody>
					<%
					if (captainStatus) {
					%>
					<tr class="in_team">
						<td><a
							href="./pages/profile/teamprofile.html?team_id=<%=teamId%>&past_match=1">
								<i class="fa-solid fa-people-group"></i>
						</a></td>
						<td><a
							href="./pages/profile/teamprofile.html?team_id=<%=teamId%>&past_match=1">
								<p>My Team</p>
						</a></td>
					</tr>

					<tr class="in_team">
						<td><a
							href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
								<i class="fa-regular fa-envelope"></i>
						</a></td>
						<td><a
							href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
								<p>Response</p>
						</a></td>
					</tr>

					<tr class="captain">
						<td><a
							href="./pages/teamplayer captain/creatematch.html?my_name=${player.getUserName()}&cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&opponent_url=null&opponent_name=null&captain=null&type=null&opponent_id=null">
								<i class="fa-solid fa-circle-plus"></i>
						</a></td>
						<td><a
							href="./pages/teamplayer captain/creatematch.html?my_name=${player.getUserName()}&cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&opponent_url=null&opponent_name=null&captain=null&type=null&opponent_id=null">
								<p>Create Match</p>
						</a></td>
					</tr>

					<tr class="in_team">
						<td><a
							href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>">
								<i class="fa-regular fa-envelope"></i>
						</a></td>
						<td><a
							href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>">
								<p>Invitation</p>
						</a></td>
					</tr>

					<tr class="in_team">
						<td><a
							href="./pages/teamplayer captain/playerrequests.html?teamId=${teamId}">
								<i class="fa-solid fa-user-plus"></i>
						</a></td>
						<td><a
							href="./pages/teamplayer captain/playerrequests.html?teamId=${teamId}">
								<p>Player Requests</p>
						</a></td>
					</tr>


					<tr class="in_team">
						<td><a
							href="./pages/search and notification/calendar.html?teamId=<%=teamId%>">
								<i class="fa-regular fa-calendar-days"></i>
						</a></td>
						<td><a
							href="./pages/search and notification/calendar.html?teamId=<%=teamId%>">
								<p>My matches</p>
						</a></td>

					</tr>
					<%
					} else if (teamId > 0) {
					%>

					<tr class="in_team">
						<td><a
							href="./pages/profile/teamprofile.html?team_id=<%=teamId%>&past_match=1">
								<i class="fa-solid fa-people-group"></i>
						</a></td>
						<td><a
							href="./pages/profile/teamprofile.html?team_id=<%=teamId%>&past_match=1">
								<p>My Team</p>
						</a></td>
					</tr>

					<tr class="in_team">
						<td><a
							href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
								<i class="fa-regular fa-envelope"></i>
						</a></td>
						<td><a
							href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
								<p>Response</p>
						</a></td>
					</tr>
					<tr class="in_team">
						<td><a
							href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>">
								<i class="fa-regular fa-envelope"></i>
						</a></td>
						<td><a
							href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>">
								<p>Invitation</p>
						</a></td>
					</tr>

					<tr class="in_team">
						<td><a
							href="./pages/search and notification/calendar.html?teamId=<%=teamId%>">
								<i class="fa-regular fa-calendar-days"></i>
						</a></td>
						<td><a
							href="./pages/search and notification/calendar.html?teamId=<%=teamId%>">
								<p>My matches</p>
						</a></td>

					</tr>
					<%
					} else {
					%>


					<tr class="not_in_team">
						<td><a href="team/new"> <i
								class="fa-solid fa-circle-plus"></i>
						</a></td>
						<td><a href="team/new">
								<p>Create a team</p>
						</a></td>
					</tr>
					<tr class="not_in_team">
						<td><a href="./pages/nonteamplayer/response.html"> <i
								class="fa-regular fa-handshake"></i>
						</a></td>
						<td><a href="./pages/nonteamplayer/response.html">
								<p>Join team Response</p>
						</a></td>
					</tr>

					<%
					}
					%>
				</tbody>
			</table>
			<table class="sidebar-navtable">
				<caption></caption>
				<thead>
					<th></th>
				</thead>
				<tbody>
					<tr>
						<td><i class="fa-regular fa-face-smile-beam"></i></td>
						<td>
							<p>About</p>
						</td>
					</tr>
					<tr>
						<td><i class="fa-regular fa-face-rolling-eyes"></i></td>
						<td>
							<p>Why us</p>
						</td>
					</tr>
					<tr>
						<td><i class="fa-sharp fa-solid fa-question"></i></td>
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
			<img class="logo" src="./assets/images/logo1.svg"
				alt="Sportshub logo">
			<p>
				SPORTS<b>HUB</b>
			</p>
		</div>
		`
		<div class="header-list">
			<div class="header-sub-list">
				<div>
					<p>Matches</p>
				</div>
				<div>
					<a
						href="./pages/teamplayer captain/creatematch.html?my_name=${player.getUserName()}&cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&opponent_url=null&opponent_name=null&captain=null&type=null&opponent_id=null">Create
						Match</a> <a
						href="./pages/search and notification/calendar.html?teamId=<%=teamId%>">My
						matches</a>
					<!-- <a href="#">Others Response</a> -->
				</div>
			</div>
			<div class="header-sub-list">
				<div>
					<p>Requests</p>
				</div>
				<div>
					<a
						href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}">Invitations</a>
					<a onclick="playerRequest()">Players Requests</a>
				</div>
			</div>
			<div class="header-sub-list">
				<div>
					<p>Profile</p>
				</div>
				<div>
					<!-- <a href="#">My Profile</a> -->
					<a href="team/detail?teamId=<%=teamId%>">My team</a>
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
		<a 
		<%if(teamId > 0){ %>
		href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>"
		<%}else{ %>
		href="./pages/nonteamplayer/response.html"
		<%} %>
		> <i
			class="fa-regular fa-bell"></i>
		</a>
	</section>
	<!-- header start -->
	<header class="headerdiv">
		<div></div>
		<div class="logodiv">
			<img class="logo" src="./assets/images/logo1.svg"
				alt="Sportshub logo">
			<p>
				SPORTS<b>HUB</b>
			</p>
		</div>

		<!-- <a onclick="./pages/search and notification/calendar.html?teamId="><i class="fa-regular fa-calendar-days"></i></a> -->
		<a 
		<%if(teamId > 0){ %>
		href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>"
		<%}else{ %>
		href="./pages/nonteamplayer/response.html"
		<%} %>
		> <i
			class="fa-regular fa-bell"></i>
		</a>
	</header>
	<!-- header end -->

	<main>

		<div class="homepage-content">
			<div class="content-subheader">
				<h1>Your area Teams.</h1>
			</div>
			<div class="top_three_players_container">
			<% for(TeamDetailDTO team : teamList){ %>
				<div class="top_three_players_div">
					<div class="players_back_image" style="background-image: url('<%= team.getUrl() %>');">

						<div class="players_mvp_detials">
							<p class="user_name"><%= team.getTeamName() %></p>
							<p class="mvp_name">Captain</p>
							<div class="rating">
								<i class="fa-solid fa-star"></i>
								<p><%= team.getCaptainName() %></p>

								<i class="fa-solid fa-star"></i>
							</div>

						</div>
					</div>

					<a href="./pages/profile/teamprofile.html?team_id=<%= team.getId()%>"><button class="profilebtn">VIEW PROFILE</button></a>
				</div>
				<%} %>
				

			</div>

		</div>
		<!-- main bottom footer start -->
		<div class="bottom-main">
			<%
			if (captainStatus) {
			%>
			<a class="captain"
				href="./pages/teamplayer captain/creatematch.html?my_name=${player.getUserName()}&cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&opponent_url=null&opponent_name=null&captain=null&type=null&opponent_id=null">
				<div class="bottom-one">
					<i class="fa-solid fa-circle-plus"></i>
					<p>Create Match</p>
				</div>
			</a>
			<a class="in_team"
				href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
				<div class="bottom-one">
					<i class="fa-solid fa-reply"></i>
					<p>Response</p>
				</div>
			</a>
			<%
			} else if (teamId > 0) {
			%>
			 <a class="in_team"
				href="./pages/teamplayer captain/match invitation.html?cap_rel_id=${teamCaptainRelationId}&team_id=${teamId}&captainStatus=<%= captainStatus %>">
				<div class="bottom-one">
					<i class="fa-regular fa-envelope"></i>
					<p>Invitations</p>
				</div>
			</a>
			
			 <a class="in_team"
				href="response?teamCaptainRelId=<%=teamCaptainRelationId%>&captainStatus=<%= captainStatus %>">
				<div class="bottom-one">
					<i class="fa-solid fa-reply"></i>
					<p>Response</p>
				</div>
			</a>
			<%
			} else {
			%>
			<a class="not_in_team" href="team/new">
				<div class="bottom-one">
					<i class="fa-solid fa-circle-plus"></i>
					<p>Create team</p>
				</div>
			</a> <a class="not_in_team" href="./pages/nonteamplayer/jointeam.html">
				<div class="bottom-one">
					<i class="fa-regular fa-handshake"></i>
					<p>Join team</p>
				</div>
			</a>
			<%
			}
			%>
		</div>
		<!-- main bottom footer end -->
	</main>
	<!-- footer starts -->
	<footer>
		<p>Follow us on</p>
		<div>
			<a href="#"> <i class="fa-brands fa-facebook"></i>
			</a> <a href="#"> <i class="fa-brands fa-instagram"></i>
			</a> <a href="#"> <i class="fa-brands fa-twitter"></i>
			</a>
		</div>
		<div>
			<a href="#">About</a> <a href="#">Why us</a> <a href="#">How to
				use</a>
		</div>
		<div class="rights">
			<p>Copyright © 2019 - 2022 Sportshub - Website Designed By
				Alagappan</p>
		</div>
	</footer>
	<!--  footer ends -->
</body>
<script>
    const { origin } = window.location;
    
    document
    .querySelector(".playerdetailsdiv")
    .addEventListener("click", profilepage);
  	document
    .querySelector(".playerimagediv")
    .addEventListener("click", profilepage);

  	function profilepage() {
  	  window.location.href = `${origin}/sportshubweb/pages/profile/myprofile.html`;
  	}

    </script>

</html>