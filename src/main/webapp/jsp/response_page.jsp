<!DOCTYPE html>
<%@page import="in.fssa.sportshub.model.MatchRequestDTO"%>
<%@page import="in.fssa.sportshub.model.MatchRequest"%>
<%@page import="java.util.Set"%>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team profile</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
	integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="./assets/css/overall.css">
<link rel="stylesheet" href="./assets/css/commonheader.css">
</head>

<body>
	<!-- header start -->
	<header class="team-response-header">
		<a href="home"> <i class="fa-solid fa-arrow-left"></i>
		</a>
		<h1>Response</h1>
	</header>
	<%
	Set<MatchRequestDTO> listOfMatch = (Set<MatchRequestDTO>) request.getAttribute("listOfMyMatch");
	%>

	<!-- header end -->
	<!-- main start -->
	<main class="team-response-main">
		<%
		for (MatchRequestDTO matchRequest : listOfMatch) {
		%>
		<div class="team-response-main">
			<div class="invitation">
				<!-- Div one -->
				<div class="invitation-one">
					<div class="teamimgdiv">
						<% String opponentImage;
							if(matchRequest.getOpponentType().getDisplayName() == "2" && matchRequest.getStatus()){
								opponentImage = "https://iili.io/HXFAu87.png";
							}else{
								opponentImage = matchRequest.getOpponentTeam().getUrl();
							}%>
						<img src="<%= opponentImage %>" alt="team name">
					</div>
					<div class="teamnamediv">
						<div class="teamnamesubdiv">
							<div>
								<% String opponentName;
							if(matchRequest.getOpponentType().getDisplayName() == "2" && matchRequest.getStatus()){
								opponentName = matchRequest.getToAreaAddress().getArea() + ", "+ matchRequest.getToAreaAddress().getDistrict();
							}else{
								opponentName = matchRequest.getOpponentTeam().getTeamName();
							}%>
								<h2><%= opponentName %></h2>
							</div>
							<div>
								<p class=""><%= matchRequest.getOpponentType() %></p>
							</div>
						</div>
					</div>
				</div>

				<!-- Div two -->
				<div class="invitation-two">
					<div>
						<p>Type</p>
						<%
						if (matchRequest != null) {
							String matchType = (matchRequest.getTypeOfMatch() == 1) ? "Betting match" : "Friendly match";
						%>
						<p><%=matchType%></p>
						<%
						}
						%>
					</div>
					<div>
						<p>Time</p>
						<p><%= matchRequest.getMatchTime() %>
						</p>
					</div>
				</div>

				<!-- Div three -->
				<div class="invitation-three">
					<div>
						<i class="fa-solid fa-people-group"></i>
						<p><%= matchRequest.getMembers() %></p>
					</div>
					<div>
						<i class="fa-solid fa-location-dot"></i>
						<p><%= matchRequest.getLocation() %></p>
					</div>
					<div>
						<i class="fa-solid fa-circle-info"></i>
						<p><%= matchRequest.getInformation() %></p>
					</div>
				</div>

				<!-- Status div -->
				<div class="statusdiv">
					<%
						if (matchRequest != null) {
							String matchType ;
							if(matchRequest.getStatusOfResponse() == 2){
								matchType = "Not yet Response" ;
							}else if(matchRequest.getStatusOfResponse() == 1){
							 matchType = "Accepted";
							}else{
							matchType = "Rejected";
							}
						%>
					<p><%= matchType %></p>
					<%
						}
						%>

					<%
						if (matchRequest != null) {
							if(matchRequest.getStatusOfResponse() == 2){ %>
					<i class="fa-solid fa-trash-can" data-id=""></i>
					<%	}else if(matchRequest.getStatusOfResponse() == 1){ %>
					<i class="fa-brands fa-whatsapp"></i>
					<%} %>
					<%
		}%>


				</div>
			</div>
		</div>
	<%} %>
	</main>
	<!-- main end -->
	<script src="./assets/js/vendor/lib/moment/moment.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script>
     // for friend list start

       	const queryString = window.location.search;

       	const urlParams = new URLSearchParams(queryString);

       	const phonenumber = urlParams.get("unique_id");

       	const my_id = JSON.parse(localStorage.getItem("user_id"));

       	async function getRelationDataByPlayer(endpoint, user_api_id) {
       	  const data = axios.get(`http://localhost:3000/${endpoint}`, {
       	    params: {
       	      playerId: user_api_id,
       	    },
       	  });
       	  const response = await data;

       	  const team_players_id = response.data;

       	  return team_players_id;
       	}

       	async function getTeamMatchLsit(endpoint, team_id) {
       	  const data = axios.get(`http://localhost:3000/${endpoint}`, {
       	    params: {
       	      createdTeam: team_id,

       	    },
       	  });
       	  const response = await data;

       	  const team_players_id = response.data;

       	  return team_players_id;
       	}

       	async function getMatchResList(endpoint, team_id) {
       	  const data = axios.get(`http://localhost:3000/${endpoint}`, {
       	    params: {
       	      matchUniqueId: team_id,
       	    },
       	  });
       	  const response = await data;

       	  const team_players_id = response.data;

       	  return team_players_id;
       	}

       	async function getDataById(endpoint, user_api_id) {
       	  const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

       	  const result = await data;

       	  return result.data;
       	}

       	async function teamResponsePage() {

       	const relation_object = await getRelationDataByPlayer(
       	  "player_team_relation",
       	  my_id
       	);
       	const find_team_id = relation_object.find((e) => e.activeStatus !== 0);

       	const team_unique_id = find_team_id.teamId;

       	const teamProfile = await getDataById("team_details_list", team_unique_id)

       	const my_team_id = teamProfile.id;

       	const match_all_invitation = await getTeamMatchLsit("match_list", my_team_id)

       	const matchInvitaton = match_all_invitation.filter(e => e.activeStatus !== 2)

       	console.log(matchInvitaton)


       	// match request card start
       	let count = 0;
       	let result_data = "";

       	for (let i = 0; i < matchInvitaton.length; i++) {
       	  let opponent_team_object = "";

       	  if (matchInvitaton[i].friendType === 1) {

       	    const opponent_teams = await getMatchResList("match_response_list", matchInvitaton[i]["id"])

       	    const opponent_team_id = opponent_teams.find(e => e.team_id !== my_team_id)

       	    result_data = opponent_team_id["match_in_status"]
       	    opponent_team_object = await getDataById("team_details_list", opponent_team_id["team_id"])
       	  }

       	  if (matchInvitaton[i].friendType === 2) {

       	    const opponent_teams = await getMatchResList("match_response_list", matchInvitaton[i]["id"])

       	    const area_result_filter = opponent_teams.filter(e => e.team_id !== my_team_id)

       	    console.log(area_result_filter)
       	    let opp_id = "";
       	    for (let j = 0; j < area_result_filter.length; j++) {
       	      const check = area_result_filter[j].match_in_status;
       	      if (check === 1) {
       	        opp_id = area_result_filter[j].team_id;
       	        opponent_team_object = await getDataById("team_details_list", opp_id)
       	        result_data = check;
       	        break;
       	      }
       	    if (check === 0) {
       	      count += 1;
       	      console.log("hi")
       	    }
       	    if (count > 0) {
       	      result_data = 0;
       	    }
       	    if (count === 0) {
       	      result_data = 2;
       	    }
       	    }
       	    

       	  }

       	  const captain_id = matchInvitaton[i]["createdBy"]

       	  const captain_obj = await getDataById("users", captain_id)

       	  const captain = captain_obj["userName"]
       	  // let captain = "";

       	  // for (let j = 0; j < teamProfile.teamMembers.length; j++) {
       	  //   const a = teamProfile.teamMembers[j];

       	  //   const find = players_list.find((e) => e.phoneNumber === a);

       	  //   if (find.captainStatus === 1) {
       	  //     captain = find.userName;
       	  //   }
       	  // }

       	  const div_class_invitation = document.createElement("div");
       	  div_class_invitation.setAttribute("class", "invitation");

       	  // div one

       	  const div_class_invitation_one = document.createElement("div");
       	  div_class_invitation_one.setAttribute("class", "invitation-one");
       	  div_class_invitation.prepend(div_class_invitation_one);

       	  const team_img_div = document.createElement("div");
       	  team_img_div.setAttribute("class", "teamimgdiv");
       	  div_class_invitation_one.prepend(team_img_div);
       	  let opp_team_url = "";
       	  let opp_team_name = "";
       	  if (opponent_team_object) {
       	    opp_team_url = opponent_team_object.teamImageUrl;
       	    opp_team_name = opponent_team_object.teamName;
       	  }
       	  if (!opponent_team_object) {
       	    opp_team_url = "https://iili.io/HXFAu87.png";
       	    opp_area_obj = await getDataById("area_list", matchInvitaton[i].address_id)
       	    opp_team_name = opp_area_obj["area"];
       	  }

       	  const team_image = document.createElement("img");
       	  team_image.setAttribute("src", opp_team_url);
       	  team_image.setAttribute("alt", opp_team_name);
       	  team_img_div.prepend(team_image);

       	  const team_name_div = document.createElement("div");
       	  team_name_div.setAttribute("class", "teamnamediv");
       	  div_class_invitation_one.append(team_name_div);

       	  const team_name_subdiv = document.createElement("div");
       	  team_name_subdiv.setAttribute("class", "teamnamesubdiv");
       	  team_name_div.append(team_name_subdiv);

       	  const team_name_subdivnthchild1 = document.createElement("div");
       	  team_name_subdiv.prepend(team_name_subdivnthchild1);

       	  const team_name_subdiv_header = document.createElement("h2");
       	  team_name_subdiv_header.innerText = opp_team_name;
       	  team_name_subdivnthchild1.append(team_name_subdiv_header);

       	  const team_name_subdivnthchild2 = document.createElement("div");
       	  team_name_subdiv.append(team_name_subdivnthchild2);

       	  let friend = "";
       	  let class_type = "";

       	  if (matchInvitaton[i].friendType === 1) {
       	    friend = "Friend";
       	    class_type = "frnd";
       	  }
       	  if (matchInvitaton[i].friendType === 2) {
       	    friend = "Public";
       	    class_type = "public";
       	  }

       	  const team_name_subdiv_para = document.createElement("p");
       	  team_name_subdiv_para.setAttribute("class", class_type);
       	  team_name_subdiv_para.innerText = friend;
       	  team_name_subdivnthchild2.append(team_name_subdiv_para);

       	  // div two

       	  const div_class_invitation_two = document.createElement("div");
       	  div_class_invitation_two.setAttribute("class", "invitation-two");
       	  div_class_invitation.append(div_class_invitation_two);

       	  const div_class_invitation_two_subdiv1 = document.createElement("div");
       	  div_class_invitation_two.prepend(div_class_invitation_two_subdiv1);

       	  const team_name_subdiv_typeheader = document.createElement("p");
       	  team_name_subdiv_typeheader.innerText = "Type";
       	  div_class_invitation_two_subdiv1.append(team_name_subdiv_typeheader);

       	  const team_name_subdiv_typevalue = document.createElement("p");
       	  team_name_subdiv_typevalue.innerText = matchInvitaton[i].typeOfMatch;
       	  div_class_invitation_two_subdiv1.append(team_name_subdiv_typevalue);

       	  const div_class_invitation_two_subdiv2 = document.createElement("div");
       	  div_class_invitation_two.append(div_class_invitation_two_subdiv2);

       	  const team_name_subdiv_timeheader = document.createElement("p");
       	  team_name_subdiv_timeheader.innerText = "Time";
       	  div_class_invitation_two_subdiv2.append(team_name_subdiv_timeheader);

       	  const team_name_subdiv_timevalue = document.createElement("p");

       	  const match_time = matchInvitaton[i].time;

       	  team_name_subdiv_timevalue.innerText = moment(match_time)
       	    .add(0, "days")
       	    .calendar();
       	  div_class_invitation_two_subdiv2.append(team_name_subdiv_timevalue);

       	  // div three

       	  const div_class_invitation_three = document.createElement("div");
       	  div_class_invitation_three.setAttribute("class", "invitation-three");
       	  div_class_invitation.append(div_class_invitation_three);

       	  const div_class_invitation_three_subdiv1 = document.createElement("div");
       	  div_class_invitation_three.append(div_class_invitation_three_subdiv1);

       	  const div_class_invitation_three_icon1 = document.createElement("i");
       	  div_class_invitation_three_icon1.setAttribute(
       	    "class",
       	    "fa-regular fa-copyright"
       	  );
       	  div_class_invitation_three_subdiv1.append(div_class_invitation_three_icon1);

       	  const div_class_invitation_three_para1 = document.createElement("p");
       	  div_class_invitation_three_para1.innerText = captain; //not enter
       	  div_class_invitation_three_subdiv1.append(div_class_invitation_three_para1);

       	  const div_class_invitation_three_subdiv2 = document.createElement("div");
       	  div_class_invitation_three.append(div_class_invitation_three_subdiv2);

       	  const div_class_invitation_three_icon2 = document.createElement("i");
       	  div_class_invitation_three_icon2.setAttribute(
       	    "class",
       	    "fa-solid fa-people-group"
       	  );
       	  div_class_invitation_three_subdiv2.append(div_class_invitation_three_icon2);

       	  const div_class_invitation_three_para2 = document.createElement("p");
       	  div_class_invitation_three_para2.innerText =
       	    `${matchInvitaton[i].members}  Members` +
       	    ` (Age :${matchInvitaton[i].membersAgeFrom} to ${matchInvitaton[i].membersAgeTo})`;
       	  div_class_invitation_three_subdiv2.append(div_class_invitation_three_para2);

       	  const div_class_invitation_three_subdiv3 = document.createElement("div");
       	  div_class_invitation_three.append(div_class_invitation_three_subdiv3);

       	  const div_class_invitation_three_icon3 = document.createElement("i");
       	  div_class_invitation_three_icon3.setAttribute(
       	    "class",
       	    "fa-solid fa-location-dot"
       	  );
       	  div_class_invitation_three_subdiv3.append(div_class_invitation_three_icon3);

       	  const div_class_invitation_three_para3 = document.createElement("p");
       	  div_class_invitation_three_para3.innerText = matchInvitaton[i].location;
       	  div_class_invitation_three_subdiv3.append(div_class_invitation_three_para3);

       	  const div_class_invitation_three_subdiv4 = document.createElement("div");
       	  div_class_invitation_three.append(div_class_invitation_three_subdiv4);

       	  const div_class_invitation_three_icon4 = document.createElement("i");
       	  div_class_invitation_three_icon4.setAttribute(
       	    "class",
       	    "fa-solid fa-circle-info"
       	  );
       	  div_class_invitation_three_subdiv4.append(div_class_invitation_three_icon4);

       	  const div_class_invitation_three_para4 = document.createElement("p");
       	  div_class_invitation_three_para4.innerText = matchInvitaton[i].information;
       	  div_class_invitation_three_subdiv4.append(div_class_invitation_three_para4);

       	  // status div

       	  const div_class_invitation_four = document.createElement("div");
       	  div_class_invitation_four.setAttribute("class", "statusdiv");
       	  div_class_invitation.append(div_class_invitation_four);

       	  const div_class_invitation_four_p = document.createElement("p");
       	  div_class_invitation_four_p.innerText = moment(matchInvitaton[i].createdTime)
       	    .startOf("sec")
       	    .fromNow();
       	  div_class_invitation_four.append(div_class_invitation_four_p);

       	  let result_value = "";

       	  const status_para_bold = document.createElement("b");
       	  if (result_data === 1) {
       	    status_para_bold.setAttribute("class", "boldaccepted");
       	    result_value = "   ACCEPTED";
       	  } else if (result_data === 0) {
       	    status_para_bold.setAttribute("class", "boldrejected");
       	    if (count === 1) {
       	      result_value = "  REJECTED";
       	    }
       	    if (count > 1) {
       	      result_value = `  REJECTED (${count})`;
       	    }
       	  } else {
       	    result_value = "   Not yet Response";
       	  }

       	  status_para_bold.innerText = result_value;
       	  div_class_invitation_four_p.append(status_para_bold);

       	  const div_class_invitation_four_trash_icon = document.createElement("i");
       	  div_class_invitation_four_trash_icon.setAttribute(
       	    "class",
       	    "fa-solid fa-trash-can"
       	  );
       	  div_class_invitation_four_trash_icon.setAttribute(
       	    "data-id",
       	    matchInvitaton[i].id
       	  );
       	  div_class_invitation_four.append(div_class_invitation_four_trash_icon);

       	  if (result_data === 1) {
       	    div_class_invitation_four_trash_icon.style.visibility = "hidden";
       	  }

       	  const div_class_invitation_four_i = document.createElement("i");
       	  div_class_invitation_four_i.setAttribute("class", "fa-brands fa-whatsapp");
       	  div_class_invitation_four.append(div_class_invitation_four_i);

       	  document.querySelector(".team-response-main").append(div_class_invitation);
       	}

       	// match request card end
       	// delete match request start
       	const switchnewcap = document.querySelectorAll(".fa-trash-can");
       	switchnewcap.forEach((bookCover) => {
       	  bookCover.addEventListener("click", async () => {

       	    const match_id = JSON.parse(bookCover.dataset.id)
       	    const data = {
       	      "activeStatus": 2,
       	    }
       	    const reset_match_data = await updateData(`match_list/${match_id}`, data)

       	    const filter_response_list = await getMatchResList("match_response_list", match_id)

       	    if(reset_match_data !== 1){
       	    for (let i = 0; i < filter_response_list.length; i++) {
       	      const change = {
       	        "match_in_status": 3,
       	      }
       	     await updateData(`match_response_list/${filter_response_list[i]["id"]}`, change)
       	    }
       	  }
       	    location.reload();
       	  });
       	});
       	// delete match request end

       	}
       	async function updateData(endpoint, data) {
       	let value = 1;
       	  await axios.patch(`http://localhost:3000/${endpoint}`, data, {
       	      "Content-Type": "application/json",
       	    }).then((d) => {
       	      console.log(d);
       	      value = d.data
       	    })
       	    .catch((error) => {
       	      console.log(error);
       	      alert("Something Went Wrong in update relation");
       	    });

       	console.log(value)
       	    return value
       	}

       	function backBtn() {
       	  window.location.href = `../homepage/hpexist.html?unique_id=${phonenumber}`;
       	}

       	window.onload = teamResponsePage();
       	</script>

</body>
</html>