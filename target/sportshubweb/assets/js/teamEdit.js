const startPoint = "http://localhost:8080/sportshubweb/";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const captain_id = urlParams.get("unique_id");

const team_id = urlParams.get("team_id");

const { origin } = window.location;

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

// here i done function for show players details
function playerstemp(player, captain, remove, classes, click) {
	const template1 = `	
  <div class="teams">
          <div class="teamimagediv">
              <img class="teamprofile playerimg" src="${player.Url}" alt="profile of ${player.userName}">
          </div>
          <div class="teamdetaildiv playerdet">
              <div>
                  <div><p class="playername">${player.userName}   <b>${captain}</b></p></div>
                  <div class="whatsapp">
                      <a class="${classes}" data-id="${player.id}" onclick="${click}">${remove}</a>
                      </div>
              </div>
              <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                  <p>21</p></div>
      
          </div>
      </div>
      `;
	return template1;
}

function switchCap(player) {
	const template1 = `	
<div class="teams">
        <div class="teamimagediv">
            <img class="teamprofile playerimg" src="${player.Url}" alt="profile of ${player.userName}">
        </div>
        <div class="teamdetaildiv playerdet">
            <div>
                <div><p class="playername">${player.userName}</p></div>
                <div class="whatsapp">
                    <a type="button" class="select_cap" data-id="${player.id}">SELECT</a>
                    </div>
            </div>
            <div class="matchdetails"><i class="fa-solid fa-calendar-week"></i>
                <p>21</p></div>
    
        </div>
    </div>
    `;
	return template1;
}

async function getTeamDet(endpoint, user_api_id) {
	const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);

	const result = await data;

	return result.data;
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
// here i done function for delete team
async function teamDelete() {
	const teamProfile = await getTeamDet("team_details_list", team_id);
	if (
		confirm(
			`Are you sure that you want to DELETE ?` +
			` You can't get '${teamProfile.teamName}' as your user name again after you delete this team`
		)
	) {
		const data = {
			"openForPlayersStatus": false,
		}
		const change_team_data = await updateData(`team_details_list/${team_id}`, data)

		if (change_team_data !== 1) {
			const all_team_members = await getRelationDataByPlayer("player_team_relation", team_id)
			const my_team_member = all_team_members.filter(e => e.activeStatus !== 0)

			for (let i = 0; i < my_team_member.length; i++) {
				const value = {
					"activeStatus": 0,
				}
				await updateData(`player_team_relation/${my_team_member[i]["id"]}`, value)
			}

			window.location.href = `../homepage/hpexist.html`;
		}

	}
}

function memberEdit() {
	const toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "50%";

	const btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#000";

	const btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#fff";

	const content_1 = document.querySelector("section.first");
	content_1.style.display = "none";

	const content_2 = document.querySelector("section.second");
	content_2.style.display = "block";
}

function profileEdit() {
	const toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "0%";

	const btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#fff";

	const btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#000";

	const content_1 = document.querySelector("section.first");
	content_1.style.display = "block";

	const content_2 = document.querySelector("section.second");
	content_2.style.display = "none";
}

/*function myFunction() {
	const image_input = document.getElementById("team_image").value;
	const image_element = document.getElementById("team_image_show");
	image_element.setAttribute("src", image_input);
	if (image_element.getAttribute("src") === "") {
		image_element.setAttribute(
			"src",
			"../../assets/images/defalt_team_image.png"
		);
	}
}*/

// here i create popup for switch captain
function switchCaptain() {
	const popup = document.querySelector(".popup_content");
	popup.classList.add("open-popup"); // hear we add class for show popup
	//  hear we work for display team member repeat pattern
}
function ClosePopup() {
	const popup = document.querySelector(".popup_content");
	popup.classList.remove("open-popup");
}

async function setArea(inset) {
	let new_id = "";

	await axios
		.post(`http://localhost:3000/area_list`, inset, {
			"Content-Type": "application/json",
		})
		.then((data) => {
			console.log(data);
			new_id = data.data.id;
		});

	return new_id;
}

async function findarea(area, distric) {
	let result = "";

	console.log("ww");

	// const resp = await axios.get(`http://localhost:3000/area_list`);

	const resp = new Promise((resolve, reject) => {
		axios
			.get(`http://localhost:3000/area_list`)
			.then((res) => {
				console.log(res);
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});

	const objData = await resp;
	// console.log(objData);
	// console.log("done");

	const area_data = objData.data;

	const find_area = area_data.find(
		(e) => e.area === area && e.distric === distric
	);

	console.log(find_area);

	if (find_area !== undefined) {
		result = find_area.id;
		return result;
	}

	if (find_area === undefined) {
		result = area_data.length + 1;
		const inset = {
			area,
			distric,
		};
		console.log(inset);

		const new_id = await setArea(inset);

		return new_id;
	}
}

async function updateTeamData(endpoint, data) {
	// axios.post(url, data, headerOptions)
	try {
		const response = await axios.post(`http://localhost:8080/sportshubweb/${endpoint}`, new URLSearchParams(data).toString(), {
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


	axios
		.patch(`${endpoint}${endpoint}`, data, {
			"Content-Type": "application/json",
		})

		.then((data) => {
			console.log(data);

			window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${team_id}`;
		})
		.catch((error) => {
			console.log(error);
		});
}
async function teamUpdate(e) {

	e.preventDefault();

	// for unique user name end


	let teamProfile = {}
	const open_player_checkbox = document.getElementById("open_for_players").checked;
	const player_description = document.getElementById("team_player_description").value;
	const team_name = document.getElementById("teamname").value;
	const area = document.getElementById("area").value;
	const district = document.getElementById("distric").value;
	const about = document.getElementById("team_about").value;
	let image = document.getElementById("team_image").value;
	teamProfile.id = team_id;
	teamProfile.teamName = team_name;
	teamProfile.about = about;
	teamProfile.area = area;
	teamProfile.district = district;
	teamProfile.openForPlayerStatus = open_player_checkbox;
	teamProfile.openForPlayerDescription = player_description;

	if (image === "") {
		image = "https://iili.io/HGUnV71.png";
	}
	teamProfile.imageUrl = image;
	teamProfile.playerId = my_id;

	fetch(`${startPoint}team/update`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(teamProfile).toString(),
	}).then(response => {
		console.log(response)
		if (!response.ok) {
			throw new Error(response.message);
		}
		return response.json()
	}
	).then(data => {
		if (data.error) {
			alert("Update failed: " + data.error);
		} else {
			if (data.status == 200) {
				window.history.go(-1);
			} else {
				alert(data.message);
			}

		}
	})
		.catch(error => {
			console.error("Error:", error);
			alert("An error occurred while logging in. " + error.message);
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
async function getRelationDataByTeam(endpoint, user_api_id) {
	const data = axios.get(`http://localhost:3000/${endpoint}`, {
		params: {
			teamId: user_api_id,
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
async function teamEditPage() {

	/*const player_relation_data = await getRelationDataByPlayer("player_team_relation", my_id)
	const me_team_relation = player_relation_data.find(e => e.teamId === JSON.parse(team_id) && e.activeStatus !== 0)
	
	//  find captain or not
	
	if (me_team_relation === undefined || me_team_relation.activeStatus !== 1) {
	  window.location.href = `../homepage/hpexist.html`;
	}*/

	const teamProfile = await getDataById("team/detail?teamId=", team_id);

	// here i paste the value in input form local storage

	document.getElementById("team_image").value = teamProfile.Url;
	document.getElementById("teamname").value = teamProfile.teamName;
	document.getElementById("area").value = teamProfile.address.area;
	document.getElementById("distric").value = teamProfile.address.district;
	document.getElementById("team_about").value = teamProfile.about;
	document.getElementById("open_for_players").checked =
		teamProfile.openForPlayerStatus;
	document.getElementById("team_player_description").value =
		teamProfile.openForPlayerDescription;

	const image_element = document.getElementById("team_image_show");
	image_element.setAttribute("src", teamProfile.Url);
	console.log(teamProfile)
	const players_list = teamProfile.teamMembers;


	for (let i = 0; i < players_list.length; i++) {
		let captain = "";
		let remove = "";
		let classes = "";
		let click = "";
		if (players_list[i].id == teamProfile.teamCaptainId) {
			captain = "captain";
			remove = "SWITCH CAPTAIN";
			classes = "switchcap";
			click = "switchCaptain()";
		} else {
			remove = "REMOVE";
			classes = "remove_player";
		}

		const player = players_list[i];
		const template1 = playerstemp(player, captain, remove, classes, click);
		document
			.querySelector("section.second")
			.insertAdjacentHTML("beforeend", template1);
	}

	const team_members = players_list.filter((e) => e.id !== teamProfile.teamCaptainId);

	for (let i = 0; i < team_members.length; i++) {
		const player = team_members[i];
		const template1 = switchCap(player);
		document
			.querySelector(".popup_content")
			.insertAdjacentHTML("afterbegin", template1);
	}

	const switchnewcap = document.querySelectorAll(".select_cap");
	switchnewcap.forEach((bookCover) => {
		bookCover.addEventListener("click", async () => {

			const new_cap_id = JSON.parse(bookCover.dataset.id);

			if (
				confirm(
					`Are you confrim to switch captain`
				)
			) {

				const user_data = {
					"playerId": new_cap_id,
					"teamId": team_id,
					"captainId": my_id
				}
				try {
					const response = await axios.post("http://localhost:8080/sportshubweb/team/switch_captain", new URLSearchParams(user_data).toString(), {
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
							window.location.href = `${startPoint}/home?player_id=${my_id}`;
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


		});
	});

	const bookCovers = document.querySelectorAll(".remove_player");
	bookCovers.forEach((bookCover) => {
		bookCover.addEventListener("click", async () => {

			const remove_id = JSON.parse(bookCover.dataset.id);
			const person_data = players_list.find(
				(book) => book.id === remove_id
			);
			if (
				confirm(
					`Are you confrim to Remove "${person_data.userName}" From your team`
				)
			) {
				const user_data = {
					"playerId": remove_id,
					"teamId": team_id
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
							window.location.reload()
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
		});
	});

}

function previousPage() {
	window.history.go(-1);
}



window.onload = teamEditPage();