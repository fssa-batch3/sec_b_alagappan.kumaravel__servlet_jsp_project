import { pastMatchData } from './past_match.js';
const startPoint = "http://localhost:8080/sportshubweb/";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

const myTeamId = JSON.parse(urlParams.get("teamId"))

function upcoming() {
	document.querySelector(".link1").style.color = "#ff8908";
	document.querySelector(".link2").style.color = "#2a373f";
	document.querySelector(".link3").style.color = "#2a373f";

	const content_1 = document.querySelector("section.upcoming");
	content_1.style.display = "block";

	const content_2 = document.querySelector("section.live");
	content_2.style.display = "none";

	const content_3 = document.querySelector("section.completed");
	content_3.style.display = "none";
}
function live() {
	document.querySelector(".link1").style.color = "#2a373f";
	document.querySelector(".link2").style.color = "#ff8908";
	document.querySelector(".link3").style.color = "#2a373f";

	const content_1 = document.querySelector("section.upcoming");
	content_1.style.display = "none";

	const content_2 = document.querySelector("section.live");
	content_2.style.display = "block";

	const content_3 = document.querySelector("section.completed");
	content_3.style.display = "none";
}

function completed() {
	document.querySelector(".link1").style.color = "#2a373f";
	document.querySelector(".link2").style.color = "#2a373f";
	document.querySelector(".link3").style.color = "#ff8908";

	const content_1 = document.querySelector("section.upcoming");
	content_1.style.display = "none";

	const content_2 = document.querySelector("section.live");
	content_2.style.display = "none";

	const content_3 = document.querySelector("section.completed");
	content_3.style.display = "block";
}


document.querySelector(".link1").addEventListener("click", upcoming)
document.querySelector(".link2").addEventListener("click", live)
document.querySelector(".link3").addEventListener("click", completed)
// for live match function start 

function resultdiv(data, score_id) {
	const temp = `<div class="update_score_div">
<div class="invitation-update-score">
<button class="update-score" data-id="${data.id}" data-name="${score_id}" type="button">Update Score</button>
</div>
</div>
`;
	return temp;
}

function scoreCardTemp(won, loss, draw) {
	const temp = `<div class="score_card">
<div class="score">

<div>
    <p class="won">${won}</p>
    <p class="subname">Won</p>
</div>

<div>
<p class="draw">${draw}</p>
<p class="subname">Draw</p>
</div>

<div>
<p class="loss">${loss}</p>
<p class="subname">Loss</p>
</div>
<p class="score_title">( SCORECARD )</p>
<p class="mvp_title"><i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> MVPs <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
</div>
<div class="mvp_div">	
</div>
</div>
`;
	return temp;
}
function noScoreCardTemp() {
	const temp = `<div class="no_score">
<p>( update your score with in 24 hours )</p>
</div>
`;
	return temp;
}

function playerResultTemp(player) {
	const temp = `<div class="mvps">
<div class="player_img">
    <img src="${player.imageUrl}" alt="${player.userName}">
</div>
<h2>${player.userName}</h2>
</div>
`;
	return temp;
}
// for live match function end 

function playerSelect(data, i) {
	const temp = `<div class="mvps">
<div class="player_img">
        <img src="${data.imageUrl}" >
    </div>
    <h2>${data.userName}</h2>
    <div class="select_mvp">
        <input type="checkbox" class="select_name" data-id="${data.id}" id="check${i}">
        <label for="check${i}" id="${data.id}" type="button">SELECT</label>
    </div>
</div>
`;
	return temp;
}

// axiox functions from here
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
async function findCaptainId(team_id) {
	const data = axios.get(`http://localhost:3000/player_team_relation`, {
		params: {
			teamId: team_id,
			activeStatus: 1,
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
async function getMatchInTeam(match_id) {
	const data = axios.get(`http://localhost:3000/match_response_list`, {
		params: {
			matchUniqueId: match_id,
			match_in_status: 1,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}
async function getMatchPlayer(player_id, match_req_id) {
	const data = axios.get(`http://localhost:3000/match_team_members`, {
		params: {
			player_id: player_id,
			matchRequestId: match_req_id,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}

async function getMatchTeamMember(req_id) {
	const data = axios.get(`http://localhost:3000/match_team_members`, {
		params: {
			matchRequestId: req_id,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}
async function getMyMatchesReq(player_id) {
	const data = axios.get(`http://localhost:3000/match_team_members`, {
		params: {
			player_id: player_id,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}
async function getScoreData(team_id, match_id) {
	const data = axios.get(`http://localhost:3000/score_card`, {
		params: {
			teamUniqueId: team_id,
			matchUniqueId: match_id,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}

async function getDataById(endpoint, user_api_id) {
	const response = axios.get(`${startPoint}${endpoint}${user_api_id}`);
	console.log(response)
	let data;
	await response.then((res) => {
		if (res.data.status == 200) {
			data = res.data.data;
		}
		if (res.data.status == 500) {
			alert(res.data.message)
			data = null;
		}

	});

	return data;
}


async function getTeamMatchResponse(endpoint, team_id) {
	const data = axios.get(`http://localhost:3000/${endpoint}`, {
		params: {
			team_id: team_id,
			match_in_status: 1,
		},
	});
	const response = await data;

	const team_players_id = response.data;

	return team_players_id;
}
async function setData(endpoint, data) {
	axios
		.post(`http://localhost:3000/${endpoint}`, data, {
			"Content-Type": "application/json",
		})

		.then(() => {
			window.location.reload()

		})
		.catch((error) => {
			console.log(error);
			alert("Something Went Wrong in update relation");
		});
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

async function myMatchPage() {

	const request_list = await getDataById("my_match?playerId=", my_id);

	let matchInvitaton = []
	let completed_match_list = []

	if (request_list !== []) {

		for (let i = 0; i < request_list.length; i++) {

			const get_match_data = request_list[i];

			const dateString = get_match_data["matchTime"];
			const givenDate = new Date(dateString);
			const currentDate = new Date();

			if (givenDate > currentDate) {
				matchInvitaton.push(get_match_data);
			} else {
				completed_match_list.push(get_match_data);
			}

		}

	}


	pastMatchData(completed_match_list)

	// this loop is for upcoming match start ----------------

	if (matchInvitaton.length === 0) {
		const div_name = document.createElement("div");
		div_name.setAttribute("class", "no_content");

		const div_p = document.createElement("p");
		div_p.innerHTML = "(You have no match)";
		div_name.append(div_p);
		document.querySelector(".upcoming").append(div_name);
	}

	if (matchInvitaton !== 0) {
		for (let i = 0; i < matchInvitaton.length; i++) {

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

			if (matchInvitaton[i]["createdTeam"]["id"] != myTeamId) {
				opp_team_url = matchInvitaton[i]["createdTeam"]["Url"];
				opp_team_name = matchInvitaton[i]["createdTeam"]["teamName"];
			} else {
				opp_team_url = matchInvitaton[i]["opponentTeam"]["Url"];
				opp_team_name = matchInvitaton[i]["opponentTeam"]["teamName"];
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
			const link = document.createElement("a");
			link.href = `../profile/teamprofile.html?team_id=${matchInvitaton[i]["opponentTeam"]["id"]}`; 
			link.innerText = `vs ${opp_team_name}`; 
			team_name_subdiv_header.appendChild(link);
			team_name_subdivnthchild1.append(team_name_subdiv_header);



			const team_name_subdivnthchild2 = document.createElement("div");
			team_name_subdivnthchild2.setAttribute("class", "timetogo");
			team_name_subdiv.append(team_name_subdivnthchild2);

			const team_name_subdiv_time_icon = document.createElement("i");
			team_name_subdiv_time_icon.setAttribute("class", "fa-regular fa-clock");
			team_name_subdivnthchild2.append(team_name_subdiv_time_icon);

			const team_name_subdiv_para = document.createElement("p");
			team_name_subdiv_para.innerText = moment(matchInvitaton[i].matchTime)
				.startOf("sec")
				.fromNow();
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
			team_name_subdiv_typevalue.innerText = (matchInvitaton[i].typeOfMatch == 1) ? "Betting Match" : "Friendly Match";
			div_class_invitation_two_subdiv1.append(team_name_subdiv_typevalue);

			const div_class_invitation_two_subdiv2 = document.createElement("div");
			div_class_invitation_two.append(div_class_invitation_two_subdiv2);

			const team_name_subdiv_timeheader = document.createElement("p");
			team_name_subdiv_timeheader.innerText = "Time";
			div_class_invitation_two_subdiv2.append(team_name_subdiv_timeheader);

			const team_name_subdiv_timevalue = document.createElement("p");

			const match_time = matchInvitaton[i].matchTime;

			team_name_subdiv_timevalue.innerText = moment(match_time).format('llll');

			div_class_invitation_two_subdiv2.append(team_name_subdiv_timevalue);

			// div three

			const div_class_invitation_three = document.createElement("div");
			div_class_invitation_three.setAttribute("class", "invitation-three");
			div_class_invitation.append(div_class_invitation_three);

			const div_class_invitation_three_subdiv1 = document.createElement("div");
			div_class_invitation_three.append(div_class_invitation_three_subdiv1);

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

			document.querySelector(".upcoming").append(div_class_invitation);
		}
	}

	// this loop is for upcoming match end ----------------
	// this loop is for live match start ----------------

	/*	if (live_match.length === 0) {
			const div_name = document.createElement("div");
			div_name.setAttribute("class", "no_content");
	
			const div_p = document.createElement("p");
			div_p.innerHTML = "(Currently you don't have matches)";
			div_name.append(div_p);
			document.querySelector(".live").append(div_name);
		}*/

	/*	if (live_match.length !== 0) {
	
			for (let i = 0; i < live_match.length; i++) {
				let opponent_team_object = "";
	
				const opponent_all_req = await getMatchResList("match_response_list", live_match[i]["id"])
	
				const opponent_team_id = opponent_all_req.find(
					(e) =>
						e.match_in_status === 1 &&
						e.team_id !== my_team_id
				);
	
				opponent_team_object = await getDataById("team_details_list", opponent_team_id["team_id"])
	
	
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
					opp_team_name = live_match[i].opponentArea.area;
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
				team_name_subdiv_header.innerText = `vs ${opp_team_name}`;
				team_name_subdivnthchild1.append(team_name_subdiv_header);
	
				const team_name_subdivnthchild2 = document.createElement("div");
				team_name_subdivnthchild2.setAttribute("class", "timetogo");
				team_name_subdiv.append(team_name_subdivnthchild2);
	
				const team_name_subdiv_time_icon = document.createElement("i");
				team_name_subdiv_time_icon.setAttribute("class", "fa-regular fa-clock");
				team_name_subdivnthchild2.append(team_name_subdiv_time_icon);
	
				const team_name_subdiv_para = document.createElement("p");
				team_name_subdiv_para.innerText = moment(live_match[i].time)
					.startOf("sec")
					.fromNow();
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
				team_name_subdiv_typevalue.innerText = live_match[i].typeOfMatch;
				div_class_invitation_two_subdiv1.append(team_name_subdiv_typevalue);
	
				const div_class_invitation_two_subdiv2 = document.createElement("div");
				div_class_invitation_two.append(div_class_invitation_two_subdiv2);
	
				const team_name_subdiv_timeheader = document.createElement("p");
				team_name_subdiv_timeheader.innerText = "Time";
				div_class_invitation_two_subdiv2.append(team_name_subdiv_timeheader);
	
				const team_name_subdiv_timevalue = document.createElement("p");
	
				const match_time = live_match[i].time;
	
				team_name_subdiv_timevalue.innerText = moment(match_time)
					.add(0, "days")
					.calendar();
				div_class_invitation_two_subdiv2.append(team_name_subdiv_timevalue);
	
				// div three
	
				const div_class_invitation_three = document.createElement("div");
				div_class_invitation_three.setAttribute("class", "invitation-three");
				div_class_invitation.append(div_class_invitation_three);
	
				const div_class_invitation_three_subdiv3 = document.createElement("div");
				div_class_invitation_three.append(div_class_invitation_three_subdiv3);
	
				const div_class_invitation_three_icon3 = document.createElement("i");
				div_class_invitation_three_icon3.setAttribute(
					"class",
					"fa-solid fa-location-dot"
				);
				div_class_invitation_three_subdiv3.append(div_class_invitation_three_icon3);
	
				const div_class_invitation_three_para3 = document.createElement("p");
				div_class_invitation_three_para3.innerText = live_match[i].location;
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
				div_class_invitation_three_para4.innerText = live_match[i].information;
				div_class_invitation_three_subdiv4.append(div_class_invitation_three_para4);
	
				// const score_card = JSON.parse(localStorage.getItem("score_card")) || [];
	
				const score_card_object = await getScoreData(my_team_id, live_match[i]["id"])
				console.log(my_team_id)
				console.log(score_card_object)
				let score_id = "";
	
				let won_value = "";
	
				let loss_value = "";
	
				let draw_value = "";
	
				let mvp_players_list = "";
	
				const my_team_req_obj = opponent_all_req.find(
					(e) =>
						e.match_in_status === 1 &&
						e.team_id === my_team_id
				);
	
				if (score_card_object.length !== 0) {
					score_id = score_card_object[0]["id"];
	
					won_value = score_card_object[0].scoreWin;
	
					loss_value = score_card_object[0].scoreLoss;
	
					draw_value = score_card_object[0].scoreDraw;
	
					const my_match_team_member = await getMatchTeamMember(my_team_req_obj["id"])
	
					mvp_players_list = my_match_team_member.filter(e => e.mvpStatus === 1);
				}
				if (score_card_object.length === 0) {
					score_id = 0;
				}
	
				const score = resultdiv(live_match[i], score_id);
	
				div_class_invitation.insertAdjacentHTML("beforeend", score);
	
				document.querySelector(".live").append(div_class_invitation);
	
				if (score_card_object.length !== 0) {
					const score_data = scoreCardTemp(won_value, loss_value, draw_value);
					const div = document.querySelectorAll(".update_score_div");
					div[i].insertAdjacentHTML("afterbegin", score_data);
	
					for (let k = 0; k < mvp_players_list.length; k++) {
						const team = mvp_players_list[k]["player_id"];
	
						const player_profile = await getDataById("users", team)
						const template = playerResultTemp(player_profile);
						const all_subdiv = document.querySelectorAll(".update_score_div");
						console.log(all_subdiv)
						const mvp_div = all_subdiv[i].querySelector(".mvp_div")
						console.log(mvp_div)
						mvp_div.insertAdjacentHTML("beforeend", template);
					}
				}
				if (score_card_object.length === 0) {
					const score_data = noScoreCardTemp();
					const div = document.querySelectorAll(".update_score_div");
					div[i].insertAdjacentHTML("afterbegin", score_data);
				}
			}
		}
		// this loop is for live match end ----------------
	*/
	// update score in live match start ------------------------------------
	// update score popup start ------------------------------------
	/*	const popup = document.getElementById("popup");
		const bookCovers = document.querySelectorAll(".update-score");
		bookCovers.forEach((bookCover) => {
			bookCover.addEventListener("click", async () => {
				const person_data = JSON.parse(bookCover.dataset.id);
				console.log(person_data)
	
				popup.classList.add("open-popup"); // hear we add class for show popup
				//  hear we work for display team member repeat pattern
	
				const relation_data = await getMatchInTeam(person_data)
	
				const opponent_id = relation_data.find(e => e.team_id !== my_team_id)
	
				const opponent_team_object = await getDataById("team_details_list", opponent_id["team_id"])
	
				document.querySelector(".opp_team_name").innerHTML = opponent_team_object.teamName;
	
				const opp_image = document.querySelector(".opp_team_image");
				opp_image.setAttribute("src", opponent_team_object.teamImageUrl);
	
				document.querySelector(".my_team_name").innerHTML = teamProfile.teamName;
	
				const my_team_image = document.querySelector(".my_team_image");
				my_team_image.setAttribute("src", teamProfile.teamImageUrl);
	
				const my_team_rel_id = relation_data.find(e => e.team_id === my_team_id)
	
				const my_match_team_member = await getMatchTeamMember(my_team_rel_id["id"])
	
				document.querySelector(".players_list").innerHTML = "";
				let mvp_players = []
				for (let index = 0; index < my_match_team_member.length; index++) {
					if (my_match_team_member[index]["mvpStatus"] === 1) {
						mvp_players.push(my_match_team_member[index]["player_id"])
					}
					const player_match_in_id = my_match_team_member[index]["player_id"];
	
					const player_profile = await getDataById("users", player_match_in_id);
					const template = playerSelect(player_profile, index);
					document
						.querySelector(".players_list")
						.insertAdjacentHTML("beforeend", template);
				}
	
				const card_no = document.querySelector(".update-scorecard");
	
				if (JSON.parse(bookCover.dataset.name) === 0) {
					document.querySelector("#won_number").value = 0;
	
					document.querySelector("#draw_number").value = 0;
	
					document.querySelector("#loss_number").value = 0;
	
					card_no.setAttribute("data-value", 0);
	
					card_no.setAttribute("data-match_id", bookCover.dataset.id);
				}
	
				if (JSON.parse(bookCover.dataset.name) !== 0) {
					const score_card_object = await getDataById("score_card", JSON.parse(bookCover.dataset.name))
					console.log(score_card_object)
	
					document.querySelector("#won_number").value = score_card_object.scoreWin;
	
					document.querySelector("#draw_number").value = score_card_object.scoreDraw;
	
					document.querySelector("#loss_number").value = score_card_object.scoreLoss;
	
					card_no.setAttribute("data-value", bookCover.dataset.name);
	
					card_no.setAttribute("data-match_id", bookCover.dataset.id);
	
					const select_mvps = document.querySelectorAll(".select_name");
	
					for (let i = 0; i < mvp_players.length; i++) {
						const check = JSON.parse(mvp_players[i]);
						for (let j = 0; j < select_mvps.length; j++) {
							const find = JSON.parse(select_mvps[j].dataset.id);
							console.log(check)
							console.log(find)
							if (check === find) {
								select_mvps[j].checked = true;
								const a = document.getElementById(find);
								a.style.color = "#96352c";
								a.innerHTML = "SELECTED";
							}
						}
					}
				}
	
				localStorage.setItem("match_id", JSON.stringify(person_data));
	
				// update score in popup end ------------------------------------
	
				// get mvps numbers by check box
				const select_mvps = document.querySelectorAll(".select_name");
				console.log(select_mvps.length);
				select_mvps.forEach((mvpsNumber) => {
					mvpsNumber.addEventListener("click", () => {
						if (mvpsNumber.checked === true) {
							const a = document.getElementById(mvpsNumber.dataset.id);
							a.style.color = "#96352c";
							a.innerHTML = "SELECTED";
						}
						if (mvpsNumber.checked === false) {
							const a = document.getElementById(mvpsNumber.dataset.id);
							a.style.color = "#14b393";
							a.innerHTML = "SELECT";
						}
	
					});
				});
			});
		});*/

}

/*async function updateScore() {
	const relation_object = await getRelationDataByPlayer("player_team_relation", my_id);
	const find_team_id = relation_object.find((e) => e.activeStatus !== 0);

	const team_unique_id = find_team_id.teamId;

	const teamProfile = await getDataById("team_details_list", team_unique_id)

	const my_team_id = teamProfile.id;

	const score_button = document.querySelector(".update-scorecard");

	const score_card_id = JSON.parse(score_button.dataset.value);
	const match_id = JSON.parse(score_button.dataset.match_id);
	// const score_card_obj = await axios.get(`http://localhost:3000/score_card/${score_card_id}`);
	const match_all_req = await getMatchResList("match_response_list", match_id)

	const my_team_req_obj = match_all_req.find(
		(e) =>
			e.match_in_status === 1 &&
			e.team_id === my_team_id
	);
	const my_match_team_member = await getMatchTeamMember(my_team_req_obj["id"])

	// const match_id = JSON.parse(localStorage.getItem("match_id"));

	const won_score = document.querySelector("#won_number").value;

	const draw_score = document.querySelector("#draw_number").value;

	const loss_score = document.querySelector("#loss_number").value;

	const all_checkbox = document.querySelectorAll(".select_name");

	const all_mvps = [];

	for (let i = 0; i < all_checkbox.length; i++) {
		const check = all_checkbox[i].checked;
		if (check) {
			const { id } = all_checkbox[i].dataset;
			all_mvps.push(JSON.parse(id));
		}
	}
	console.log(all_mvps)
	if (won_score < 0 || loss_score < 0 || draw_score < 0) {
		document.querySelector("#error_msg").innerHTML =
			"Please update match result only positive values";
	}

	if (won_score === "" || loss_score === "") {
		document.querySelector("#error_msg").innerHTML =
			"Please update match result ";
	}
	const exist = all_mvps.length;
	console.log(exist);
	if (exist >= 3) {
		document.querySelector("#error_msg").innerHTML =
			"Please select two person ";
	}

	if (
		exist < 3 &&
		won_score !== "" &&
		loss_score !== "" &&
		won_score >= 0 &&
		loss_score >= 0 &&
		draw_score >= 0) {
		if (score_card_id === 0) {
			const object = {
				matchUniqueId: match_id,
				teamUniqueId: my_team_id,
				scoreWin: won_score,
				scoreDraw: draw_score,
				scoreLoss: loss_score,
			};

			await setData("score_card", object)

			for (let i = 0; i < all_mvps.length; i++) {
				console.log("work")
				const value = JSON.parse(all_mvps[i])
				const set_mvp = {
					"mvpStatus": 1,
				}

				const find_match_rel = await getMatchPlayer(value, my_team_req_obj["id"])

				await updateData(`match_team_members/${find_match_rel[0]['id']}`, set_mvp)
			}

			location.reload();

			popup.classList.remove("open-popup");
		}

		if (score_card_id !== 0) {

			const object = {
				scoreWin: won_score,
				scoreDraw: draw_score,
				scoreLoss: loss_score,
			};

			await updateData(`score_card/${score_card_id}`, object)

			for (let i = 0; i < my_match_team_member.length; i++) {
				const id = my_match_team_member[i]["player_id"]

				const check = all_mvps.find(e => e === id)
				const non_mvp = {
					"mvpStatus": 0,
				}
				const set_mvp = {
					"mvpStatus": 1,
				}
				if (check) {
					await updateData(`match_team_members/${my_match_team_member[i]['id']}`, set_mvp)
				}
				if (!check) {
					await updateData(`match_team_members/${my_match_team_member[i]['id']}`, non_mvp)
				}

			}

			location.reload();

			popup.classList.remove("open-popup");
		}

		console.log(won_score);
	}
}*/

function ClosePopup() {
	popup.classList.remove("open-popup");
}
function previousPage() {
	window.history.go(-1);
}


document.querySelector(".Closepopup").addEventListener("click", ClosePopup);
document.querySelector(".backtohome").addEventListener("click", previousPage)
document.querySelector(".backtohome").addEventListener("click", previousPage)
window.onload = myMatchPage();  