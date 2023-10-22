<!DOCTYPE html>
<%@page import="java.util.List"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="in.fssa.sportshub.model.MatchRequestDTO"%>
<%@page import="in.fssa.sportshub.model.MatchRequest"%>
<%@page import="java.util.Set"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
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
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/suryaumapathy2812/notify__js/notify.css">
<link rel="stylesheet" href="./assets/css/overall.css">
<link rel="stylesheet" href="./assets/css/commonheader.css">
</head>
<style>
.friend {
	color: #14b393; /* You can use your desired color for "Friend" here */
}

.public {
	color: #96352c; /* Light red color for "Public" */
}
</style>
<body>
	<!-- header start -->
	<header class="team-response-header">
		<a id="back_button"> <i class="fa-solid fa-arrow-left"></i>
		</a>
		<h1>Response</h1>
	</header>
	<%
	List<MatchRequestDTO> listOfMatch = (List<MatchRequestDTO>) request.getAttribute("listOfMyMatch");
	boolean captainStatus = (boolean) request.getAttribute("captainStatus");
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
						<%
						String opponentImage;
						if (matchRequest.getOpponentType().getDisplayName() == "2" && matchRequest.getStatus()) {
							opponentImage = "https://iili.io/HXFAu87.png";
						} else {
							opponentImage = matchRequest.getOpponentTeam().getUrl();
						}
						%>
						<img src="<%=opponentImage%>" alt="team name">
					</div>
					<div class="teamnamediv">
						<div class="teamnamesubdiv">
							<div>
								<%
								String opponentName;
								if (matchRequest.getOpponentType().getDisplayName() == "2" && matchRequest.getStatus()) {
									opponentName = matchRequest.getToAreaAddress().getArea() + ", " + matchRequest.getToAreaAddress().getDistrict();
								} else {
									opponentName = matchRequest.getOpponentTeam().getTeamName();
								}
								%>
								<h2><%=opponentName%></h2>
							</div>
							<div>
								<p style="margin-right: 10px;">
									<%
									if (matchRequest != null) {
										String opponentType = matchRequest.getOpponentType() + "";
										String displayText = "";

										if ("TO_TEAM".equals(opponentType)) {
											displayText = "Friend";
											// Add CSS class for styling
									%>
									<span class="friend"><%=displayText%></span>
									<%
									} else if ("TO_AREA".equals(opponentType)) {
									displayText = " Public";
									// Add CSS class for styling
									%>
									<span class="public"><%=displayText%></span>
									<%
									}
									}
									%>
								</p>
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
						<%
						if (matchRequest != null) {
							SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
							SimpleDateFormat outputFormat = new SimpleDateFormat("EEE, MMM d, yyyy h:mm a");

							String formattedTime = "";
							try {
								Date matchTime = inputFormat.parse("" + matchRequest.getMatchTime());
								formattedTime = outputFormat.format(matchTime);
							} catch (Exception e) {
								e.printStackTrace();
							}
						%>
						<p><%=formattedTime%></p>
						<%
						}
						%>
					</div>
				</div>

				<!-- Div three -->
				<div class="invitation-three">
					<div>
						<i class="fa-solid fa-people-group"></i>
						<p><%=matchRequest.getMembers()%></p>
					</div>
					<div>
						<i class="fa-solid fa-location-dot"></i>
						<p><%=matchRequest.getLocation()%></p>
					</div>
					<div>
						<i class="fa-solid fa-circle-info"></i>
						<p><%=matchRequest.getInformation()%></p>
					</div>
				</div>

				<!-- Status div -->
				<div class="statusdiv">
					<%
					if (matchRequest != null) {
						String matchType;
						String color;
						if (matchRequest.getStatusOfResponse() == 2) {
							matchType = "Not yet Response";
							color = "black";
						} else if (matchRequest.getStatusOfResponse() == 1) {
							matchType = "Accepted";
							color = "green";
						} else {
							matchType = "Rejected";
							color = "lightcoral";
						}
					%>
					<p style="font-weight: bold; color:<%=color%>;"><%=matchType%></p>
					<%
					}
					%>

					<%
					if (matchRequest != null) {
						if (matchRequest.getStatusOfResponse() == 2 && captainStatus) {
					%>
					<i class="fa-solid fa-trash-can" data-id=<%=matchRequest.getId()%>></i>
					<%
					} else if (matchRequest.getStatusOfResponse() == 1) {
					%>
					<a href="https://wa.me/<%= matchRequest.getOpponentTeamCaptain().getPhoneNumber() %>" target="_blank"><i
						class="fa-brands fa-whatsapp"></i></a>
					<%
					}
					%>
					<%
					}
					%>


				</div>
			</div>
		</div>
		<%
		}
		%>
	</main>
	<!-- main end -->
	<script src="./assets/js/vendor/lib/moment/moment.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/suryaumapathy2812/notify__js/notify.js"> </script>
	<script>
    const player_id = JSON.parse(sessionStorage.getItem("playerId"));
	const backButton = document.getElementById("back_button")
	const { origin } = window.location;
	
	backButton.addEventListener("click" ,() => {
	
		window.location.href = origin+"/sportshubweb/home?player_id="+player_id ;
	    });
	
	
	  const switchnewcap = document.querySelectorAll(".fa-trash-can");
	  switchnewcap.forEach((each) => {
	    each.addEventListener("click", async () => {
	      const request_data = each.dataset.id;

	     const user_data = {
	    		"playerId": player_id,
	    		"matchId": request_data
	      }

	  
	  console.log(user_data);
	  try {
		  const response = await axios.post("http://localhost:8080/sportshubweb/match_request/delete", new URLSearchParams(user_data).toString(), {
		    headers: {
		      "Accept": "application/json",
		      "Content-Type": "application/x-www-form-urlencoded"
		    }
		  });

		  if (response.status === 200) {
		    const result = response.data;
		    console.log(result);
		    if (result.status === 200) {
		      // Success, reload the page
		      location.reload();
		      Notify.success("Deleted successfully");
		    } else {
		      // Handle error if needed
		      console.error("Failed to delete:", result.message);
		      Notify.error(result.message);
		    }
		  } else {
		    // Handle HTTP error
		    console.error("HTTP Error:", response.statusText);
		    Notify.error(response.statusText);
		  }
		} catch (error) {
		  // Handle network or other errors
		  console.error("Error:", error);
		  Notify.error(error.message);
		}

	  
	})
	})
	
	
	
	</script>

</body>
</html>