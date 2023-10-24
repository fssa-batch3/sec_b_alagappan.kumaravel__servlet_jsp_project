// for friend list start

const startPoint = "http://localhost:8080/sportshubweb/";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const myTeamRelId = JSON.parse(urlParams.get("cap_rel_id"));

const captainStatus = JSON.parse(urlParams.get("captainStatus"));
const loadingPage = document.getElementById("load_body");

const myTeamId = JSON.parse(urlParams.get("team_id"))

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

async function getDataById(endpoint, user_api_id) {
  const response = axios.get(`${startPoint}${endpoint}${user_api_id}`);
	console.log(response)
	let data;
   await response.then((res) => {
      if (res.data.status == 200) {
        data = res.data.data;
      }
      if(res.data.status == 500){
		  alert(res.data.message)
		  data = null ;
	  }
	  
    });
    
    return data;
}

async function matchInvitatonPage() {

	loadingPage.style.display = 'flex';
	const endPoint = "?teamId="+myTeamId+"&teamCaptainRelId="+myTeamRelId;
	
	const matchInvitaton = await getDataById("invitation", endPoint);
	
	console.log(matchInvitaton)
	// match request card start
	let count = 0;
	let result_data = "";

if(matchInvitaton.length == 0){
	document.querySelector(".match-invitation-main").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No Invitation found</div>'
}

	for (const element of matchInvitaton) {

		const opponent_team_object = element["createdTeam"]

		const div_class_invitation = document.createElement("div");
		div_class_invitation.setAttribute("class", "invitation");

		// div one

		const div_class_invitation_one = document.createElement("div");
		div_class_invitation_one.setAttribute("class", "invitation-one");
		div_class_invitation.prepend(div_class_invitation_one);

		const team_img_div = document.createElement("div");
		team_img_div.setAttribute("class", "teamimgdiv");
		div_class_invitation_one.prepend(team_img_div);

		const team_image = document.createElement("img");
		team_image.setAttribute("src", opponent_team_object.Url);
		team_image.setAttribute("alt", opponent_team_object.teamName);
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
		const link = document.createElement("a");
		link.href = `../profile/teamprofile.html?team_id=${opponent_team_object.id}`; 
		link.innerText = `${opponent_team_object.teamName}`; 
		team_name_subdiv_header.appendChild(link);
		team_name_subdivnthchild1.append(team_name_subdiv_header);

		const team_name_subdivnthchild2 = document.createElement("div");
		team_name_subdiv.append(team_name_subdivnthchild2);

		let friend = "";
		let class_type = "";

		if (element["opponentType"] === "TO_TEAM") {
			friend = "Friend";
			class_type = "frnd";
		}
		if (element["opponentType"] === "TO_AREA") {
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
		team_name_subdiv_typevalue.innerText = element.typeOfMatch == 1 ? "Betting Match" : "Friendly Match";
		div_class_invitation_two_subdiv1.append(team_name_subdiv_typevalue);

		const div_class_invitation_two_subdiv2 = document.createElement("div");
		div_class_invitation_two.append(div_class_invitation_two_subdiv2);

		const team_name_subdiv_timeheader = document.createElement("p");
		team_name_subdiv_timeheader.innerText = "Time";
		div_class_invitation_two_subdiv2.append(team_name_subdiv_timeheader);

		const team_name_subdiv_timevalue = document.createElement("p");

		const match_time = element.matchTime;

		team_name_subdiv_timevalue.innerText = moment(match_time).format('llll')
	
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
		
		const captain_obj = element.createdTeamCaptain;

		const captain = captain_obj["userName"]

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
			`${element.members}  Members` +
			` (Age :${element.membersAgeFrom} to ${element.membersAgeTo})`;
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
		div_class_invitation_three_para3.innerText = element.location;
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
		div_class_invitation_three_para4.innerText = element.information;
		div_class_invitation_three_subdiv4.append(div_class_invitation_three_para4);

		// accept reject btn
		if(captainStatus){
		const div_accept_reject = document.createElement("div");
		div_accept_reject.setAttribute("class", "accept-reject");
		div_class_invitation.append(div_accept_reject);

		const div_reject_button = document.createElement("button");
		div_reject_button.innerText = "Reject";
		div_reject_button.setAttribute("type", "button");
		div_reject_button.setAttribute("class", "reject-btn");
		div_reject_button.setAttribute("data-caprelid", myTeamRelId);
		div_reject_button.setAttribute("data-id", element.id);
		div_accept_reject.append(div_reject_button);

		const div_accept_button = document.createElement("button");
		div_accept_button.innerText = "Accept";
		div_accept_button.setAttribute("type", "button");
		div_accept_button.setAttribute("class", "accept-btn");
		div_accept_button.setAttribute("data-caprelid", myTeamRelId);
		div_accept_button.setAttribute("data-id", element.id);
		div_accept_reject.append(div_accept_button);
}
		// div four

		const div_class_invitation_four = document.createElement("div");
		div_class_invitation_four.setAttribute("class", "invitation-four");
		div_class_invitation.append(div_class_invitation_four);

		const div_class_invitation_four_subdiv = document.createElement("div");
		div_class_invitation_four_subdiv.setAttribute("class", "timetaken");
		div_class_invitation_four.append(div_class_invitation_four_subdiv);

		const div_class_invitation_four_i = document.createElement("i");
		div_class_invitation_four_i.setAttribute("class", "fa-regular fa-clock");
		div_class_invitation_four_subdiv.append(div_class_invitation_four_i);

		const div_class_invitation_four_p = document.createElement("p");

		const createdTime = element.createdAt;
		div_class_invitation_four_p.innerText = moment(createdTime)
			.startOf("sec")
			.fromNow();
		div_class_invitation_four_subdiv.append(div_class_invitation_four_p);

		document.querySelector(".match-invitation-main").append(div_class_invitation);
	}

	const selectbtn = document.querySelectorAll(".accept-btn");
	selectbtn.forEach((each) => {
		each.addEventListener("click", async () => {
			loadingPage.style.display = 'flex';

			const match_id = JSON.parse(each.dataset.id)
			const rel_id = JSON.parse(each.dataset.caprelid)
			console.log(match_id, rel_id)
			const lastPoint = "?teamCaptainRelId="+rel_id+"&matchId="+match_id;
			const getAcceptData = await getDataById("invitation/accept", lastPoint); // here i find player profile

			if(getAcceptData != null){
				location.reload();
			}
			loadingPage.style.display = 'none';
			
		});
	});

	const rejectbtn = document.querySelectorAll(".reject-btn");
	rejectbtn.forEach((each) => {
		each.addEventListener("click", async () => {
			loadingPage.style.display = 'flex';

			const match_id = JSON.parse(each.dataset.id)
			const rel_id = JSON.parse(each.dataset.caprelid)
			const lastPoint = "?teamCaptainRelId="+rel_id+"&matchId="+match_id;
			const getAcceptData = await getDataById("invitation/reject", lastPoint); // here i find player profile

			if(getAcceptData != null){
				location.reload();
			}
			loadingPage.style.display = 'none';
		});
	});
loadingPage.style.display = 'none';
}


function previousPage() {
		loadingPage.style.display = 'flex';
	setTimeout(function () {
  loadingPage.style.display = 'none';
}, 5000);
	
	window.history.go(-1);
}

window.onload = matchInvitatonPage();