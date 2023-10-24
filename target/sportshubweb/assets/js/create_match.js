const startPoint = "http://localhost:8080/sportshubweb/";
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const player_id = JSON.parse(sessionStorage.getItem("playerId"));
if (!player_id) {
	window.location.href = "../../index.html";
}
const opponent_id = urlParams.get("opponent_id");

const opponent_url = urlParams.get("opponent_url");

const opponent_name = urlParams.get("opponent_name");

const opponent_cap_name = urlParams.get("captain");

const opponent_type = JSON.parse(urlParams.get("type"));

const cap_name = urlParams.get("my_name");
const loadingPage = document.getElementById("load_body");

const myTeamRelId = JSON.parse(urlParams.get("cap_rel_id"));

const myTeamId = JSON.parse(urlParams.get("team_id"))

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
async function createTeamPage() {
	loadingPage.style.display = 'flex';
	
	const date_of_match = document.querySelector("#date_and_time");

	const today = new Date();

	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
	const yyyy = today.getFullYear();
	const max_value = `${yyyy}-${mm}-${dd}T${today.getHours()}:${today.getMinutes()}`;
	if (date_of_match) {
		date_of_match.setAttribute("min", max_value);
	}

	const teamProfile = await getDataById("team/detail?teamId=", myTeamId);

	const my_team_image = document.querySelector(".teamimage");
	my_team_image.setAttribute("src", teamProfile.Url);
	my_team_image.setAttribute("alt", teamProfile.teamName);

	const team_name = document.querySelector(".my_team_name");
	team_name.innerHTML = teamProfile.teamName;

	const my_name = document.querySelector(".my_name");
	my_name.innerHTML = cap_name;

	// here i show opponent details

	if (opponent_url === "null") {
		const opp_image = document.querySelector(".opponent_image");
		opp_image.style.visibility = "hidden";
	}

	if (opponent_name === "null") {
		document.querySelector(".opponent_name").innerHTML = "Choose Opponent";
	}
	if (opponent_name !== "null") {
		document.querySelector(".opponent_name").innerHTML = opponent_name;
	}

	if (opponent_name !== "null") {
		document.querySelector(".opp_captain").innerHTML = opponent_cap_name;
	}
	if (opponent_type == 2) {
		const a = document.querySelector(".select_opponent_div div i");
		a.setAttribute("class", "fa-solid fa-map-pin");
	}
	if (opponent_type == 1) {
		const a = document.querySelector(".select_opponent_div div i");
		a.setAttribute("class", "fa-regular fa-copyright");
	}

	if (opponent_name !== "null") {
		const opp_image = document.querySelector(".opponent_image");
		opp_image.setAttribute("src", opponent_url);
		opp_image.setAttribute("alt", opponent_name);
	}

	if (opponent_type === 2) {
		const toggle_button = document.querySelector(".toggle_button");
		toggle_button.style.left = "50%";

		const btn_color_1 = document.querySelector(".darkbtn");
		btn_color_1.style.color = "#f7f7f7";

		const btn_color_2 = document.querySelector(".lightbtn");
		btn_color_2.style.color = "#000";

		const select_team = document.querySelector(".select_opponent_div");
		select_team.removeEventListener("click", selectTeam);
		select_team.addEventListener("click", selectArea);

	}
	if (opponent_type === null || opponent_type === 1) {
		console.log("hi hello");
		const select_team = document.querySelector(".select_opponent_div");
		select_team.removeEventListener("click", selectArea);
		select_team.addEventListener("click", selectTeam);
	}

	loadingPage.style.display = 'none';
}

async function selectArea() {

	window.location.href = `./area-select.html?my_name=${cap_name}&cap_rel_id=${myTeamRelId}&team_id=${myTeamId}`;
}
async function selectTeam() {

	window.location.href = `./team-select.html?my_name=${cap_name}&cap_rel_id=${myTeamRelId}&team_id=${myTeamId}`;
}

function leftbtn() {
	document.querySelector(".opponent_name").innerHTML = "Choose Opponent";

	const opp_image = document.querySelector(".opponent_image");
	opp_image.style.visibility = "hidden";

	const opp_cap_name = document.querySelector(".opp_captain");
	opp_cap_name.style.visibility = "hidden";

	const opp_cap_icon = document.querySelector(".select_opponent_div div i");
	opp_cap_icon.style.visibility = "hidden";

	const toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "5%";

	const btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#000";

	const btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#f7f7f7";

	const select_team = document.querySelector(".select_opponent_div");
	select_team.removeEventListener("click", selectArea);
	select_team.addEventListener("click", selectTeam);

}


function rightbtn() {
	document.querySelector(".opponent_name").innerHTML = "Choose Opponent";

	const opp_image = document.querySelector(".opponent_image");
	opp_image.style.visibility = "hidden";

	const opp_cap_name = document.querySelector(".opp_captain");
	opp_cap_name.style.visibility = "hidden";

	const opp_cap_icon = document.querySelector(".select_opponent_div div i");
	opp_cap_icon.style.visibility = "hidden";

	const toggle_button = document.querySelector(".toggle_button");
	toggle_button.style.left = "50%";

	const btn_color_1 = document.querySelector(".darkbtn");
	btn_color_1.style.color = "#f7f7f7";

	const btn_color_2 = document.querySelector(".lightbtn");
	btn_color_2.style.color = "#000";

	const select_team = document.querySelector(".select_opponent_div");
	select_team.removeEventListener("click", selectTeam)
	select_team.addEventListener("click", selectArea);

}

function backBtn() {
	loadingPage.style.display = 'flex';
	setTimeout(function() {
		loadingPage.style.display = 'none';
	}, 10000);

	window.location.href = startPoint + "home?player_id=" + player_id;
}

function previousPage() {
	window.history.go(-1);
}

window.onload = createTeamPage();

// here after is for create match when we click the button


async function matchCreate(e) {
	e.preventDefault();
	loadingPage.style.display = 'flex';
	const opp_cap_name = document.querySelector(".opp_captain");

	if (opp_cap_name.style.visibility === "hidden" || opponent_cap_name === "null") {
		document.querySelector(".alert_msg").innerText = "Select your opponent";
	} else {
		const opp_type = opponent_type;
		const members = document.getElementById("members").value;
		const type_of_match = document.getElementById("type_of_match").value;
		const players_from_age = document.getElementById("players_from_age").value;
		const players_to_age = document.getElementById("players_to_age").value;
		const date_and_time = document.getElementById("date_and_time").value;
		const address = document.getElementById("address_details").value;
		const add_info = document.getElementById("add_info").value;
		const created_time = moment();
		let address_id = "0"
		let opp_id = "0"
		if (opp_type == 2) {
			address_id = opponent_id
		}
		if (opp_type == 1) {
			opp_id = opponent_id
		}
		console.log(opp_id, myTeamRelId)

		const match_object = {
			"toTeam": opp_id,
			"toArea": address_id,
			"opponentType": opp_type,
			"typeOfMatch": type_of_match,
			"matchTime": date_and_time,
			"members": members,
			"membersAgeFrom": players_from_age,
			"membersAgeTo": players_to_age,
			"location": address,
			"information": add_info,
			"myTeamRelId": myTeamRelId,
			"teamCaptainId": player_id,
		};

		axios.post(`${startPoint}match_request/create`, new URLSearchParams(match_object).toString(), {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
			.then(response => {
				console.log(response);
				if (response.data.status === 200) {
					// Request was successful, redirect to the next servlet
					window.location.href = "http://localhost:8080/sportshubweb/response?teamCaptainRelId=" + myTeamRelId + "&captainStatus=true";
					loadingPage.style.display = 'none';
				} else {
					// Request encountered an error, handle the error response
					console.error("Error:", response.data);
					loadingPage.style.display = 'none';
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: response.data.message
					})
				}
			})
			.catch(error => {
				loadingPage.style.display = 'none';
				console.error("Error:", error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.message
				})
			});

	}
	
}

