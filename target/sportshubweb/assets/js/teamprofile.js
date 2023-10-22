import { pastMatchData } from './past_match.js';

const startPoint = "http://localhost:8080/sportshubweb/";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const my_team_id = JSON.parse(urlParams.get("team_id"));

const my_id = JSON.parse(sessionStorage.getItem("playerId"));



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


async function updateData(endpoint, data) {

	await axios.patch(`http://localhost:3000/${endpoint}`, data, {
		"Content-Type": "application/json",
	}).then(() => {
		window.location.href = `../homepage/hpexist.html`;
	})
		.catch((error) => {
			console.log(error);
			alert("Something Went Wrong in update relation");
		});
}

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
async function exit() {
	if (confirm(`Do you want to Exit from this team ?`)) {
		
		  const user_data = {
	    		"playerId": my_id,
	    		"teamId": my_team_id
	      }
		try {
			const response = await axios.post("http://localhost:8080/sportshubweb/team/exit", new URLSearchParams(user_data).toString(), {
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
			window.location.href = "http://localhost:8080/sportshubweb/home?player_id="+my_id;
				} else {
					// Handle error if needed
					console.error("Failed to delete:", result.message);
					alert(result.message);
				}
			} else {
				// Handle HTTP error
				console.error("HTTP Error:", response.statusText);
				alert(response.statusText);
			}
		} catch (error) {
			// Handle network or other errors
			console.error("Error:", error);
			alert(error.message);
		}

	}
}

function profile() {
	const toggle_button = document.querySelector(".button_underline");
	toggle_button.style.left = "66%";

	const content_1 = document.querySelector("section.first");
	content_1.style.display = "none";

	const content_2 = document.querySelector("section.second");
	content_2.style.display = "none";

	const content_3 = document.querySelector("section.three");
	content_3.style.display = "block";

}
function match() {
	const toggle_button = document.querySelector(".button_underline");
	toggle_button.style.left = "33%";

	const content_1 = document.querySelector("section.first");
	content_1.style.display = "none";

	const content_2 = document.querySelector("section.second");
	content_2.style.display = "block";

	const content_3 = document.querySelector("section.three");
	content_3.style.display = "none";

}
function member() {
	const toggle_button = document.querySelector(".button_underline");
	toggle_button.style.left = "0%";

	const content_1 = document.querySelector("section.first");
	content_1.style.display = "block";

	const content_2 = document.querySelector("section.second");
	content_2.style.display = "none";

	const content_3 = document.querySelector("section.three");
	content_3.style.display = "none";

}


function teamEdit() {
	window.location.href = `../my team/myteamedit.html?team_id=${my_team_id}`;
}

document.querySelector(".edit_team").addEventListener("click", teamEdit);
document.querySelector(".profilebtn").addEventListener("click", profile);
document.querySelector(".matchbtn").addEventListener("click", match)
document.querySelector(".memberbtn").addEventListener("click", member)
/*document.querySelector(".statsbtn").addEventListener("click", stats)*/
document.querySelector(".backtohome").addEventListener("click", previousPage)

function renderPlayer(player, captain, whatsapp, me, age) {
	const template1 = `	
      <div class="teams">
                      <div class="teamimagediv">
                          <img class="teamprofile playerimg" src="${player.Url}" alt="Image of ${player.userName}">
                      </div>
                      <div class="teamdetaildiv playerdet">
                          <div>
                              <div><p class="playername">${player.userName}<b>${me} ${captain}</b></p></div>
                              <div class="whatsapp">
                                  ${whatsapp}
                                  </div>
                          </div>
                          <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                              <p>${age}</p></div>
      
                      </div>
                  </div>
      `;
	return template1;
}




async function teamPageLoad() {
	const teamProfile = await getDataById("team/detail?teamId=", my_team_id);
	
	const request_list = await getDataById("my_match/team?teamId=", my_team_id);

	pastMatchData(request_list)
	let team_players_list = teamProfile["teamMembers"];

	console.log(team_players_list);
	if (teamProfile["teamCaptainId"] != my_id) {
		document.querySelector(".edit_team").style.display = "none";
	}

	const players_age = [];

	for (let i = 0; i < team_players_list.length; i++) {
		let captain = "";
		let whatsapp = "";
		let me = "";

		console.log(team_players_list[i].id, teamProfile["teamCaptainId"], my_id)

		if (team_players_list[i].id == teamProfile["teamCaptainId"]) {
			captain = "captain";
		}
		if (
			team_players_list[i].id == my_id && team_players_list[i].id != teamProfile["teamCaptainId"]
		) {
			whatsapp = '<a class="exit_from_team">EXIT</a>';
			me = "(you)";
		} else if (team_players_list[i].id != my_id) {
			whatsapp = `<a href="https://wa.me/${team_players_list[i].phoneNumber}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>`;
		} else {
			me = "(you)";
		}

		const playerAge = team_players_list[i].dateOfBirth;
		const dob = new Date(playerAge);
		const today = new Date();
		let age = today.getTime() - dob.getTime();
		age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
		players_age.push(age);

		const player = team_players_list[i];
		const template1 = renderPlayer(player, captain, whatsapp, me, age);
		document
			.querySelector(".playermatch")
			.insertAdjacentHTML("beforeend", template1);
	}

	const exit_team = document.querySelector(".exit_from_team");
	if (exit_team) {
		exit_team.addEventListener("click", () => {
			exit()
		})
	}


	// here i find max and min of players of the age

	const max = Math.max(...players_age);
	const min = Math.min(...players_age);


	const team_image = document.createElement("img");
	team_image.setAttribute("src", teamProfile.Url);
	team_image.setAttribute("alt", `logo of ${teamProfile.teamName}`);
	document.querySelector(".playerimagediv").prepend(team_image);

	const team_background_image = document.createElement("img");
	team_background_image.setAttribute("class", "bgimg");
	team_background_image.setAttribute("src", teamProfile.Url);
	team_background_image.setAttribute("alt", `logo of ${teamProfile.teamName}`);
	document.querySelector("header").prepend(team_background_image);

	const teamUserName = teamProfile.teamName;
	document.querySelector(".profiledetailsdiv p").innerHTML = teamUserName;

	const teamLocation = teamProfile.address.area;
	document.querySelector(".profiledetailsdiv div:nth-child(2) p").innerHTML =
		teamLocation;

	const teamSince = moment(teamProfile.createdAt);

	document.querySelector(
		".profiledetailsdiv div:nth-child(3) p"
	).innerHTML = `Since  ${teamSince.format("MMM Do YY")}`;

	const teamArea = `${teamProfile.address.area}, ${teamProfile.address.district}`;
	document.querySelector(".area").innerHTML = teamArea;

	const teamAge = `${min} - ${max}`;
	document.querySelector(".age").innerHTML = teamAge;

	const teamAbout = teamProfile.about;
	document.querySelector(".about").innerHTML = teamAbout;

	if (teamProfile.openForPlayerStatus) {
		const teamOpenForPlayer = teamProfile.openForPlayerDescription;
		document.querySelector(".open_for_player").innerHTML = teamOpenForPlayer;
	} else {
		document.querySelector(".open_for_player").innerHTML =
			"They did Not want any players";
	}

	const teamMemberCount = team_players_list.length;
	document.querySelector(".member").innerHTML = teamMemberCount;
}

function previousPage() {
	window.history.go(-1);
}
window.onload = teamPageLoad();
