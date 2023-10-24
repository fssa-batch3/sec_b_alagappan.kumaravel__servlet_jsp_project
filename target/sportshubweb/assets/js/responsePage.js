const queryString = window.location.search;

const startPoint = "http://localhost:8080/sportshubweb/";

const urlParams = new URLSearchParams(queryString);

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

const loadingPage = document.getElementById("load_body");

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

async function responsePageLoad() {
	loadingPage.style.display = 'flex';
	const join_team_response = await getDataById("team/player_request?playerId=", my_id);
	if (join_team_response.length == 0) {
		document.querySelector("main.response-main").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No Request created</div>'
	}

	for (let i = 0; i < join_team_response.length; i++) {
		const div_teams = document.createElement("div");
		div_teams.setAttribute("class", "teams");

		const team_sub_div = document.createElement("div");
		team_sub_div.setAttribute("class", "teamssub");
		div_teams.append(team_sub_div);

		const team_image_div = document.createElement("div");
		team_image_div.setAttribute("class", "teamimagediv");
		team_sub_div.append(team_image_div);

		const team_image_button = document.createElement("button");
		team_image_button.setAttribute("type", "button");
		// team_image_button.setAttribute("onclick", "OpenPopup()");
		team_image_div.append(team_image_button);

		const team_image = document.createElement("img");
		team_image.setAttribute("class", "teamprofile");
		team_image.setAttribute("src", join_team_response[i].Url);
		team_image.setAttribute("alt", `image of${join_team_response[i].teamName}`);
		team_image_button.append(team_image);

		const team_details_div = document.createElement("div");
		team_details_div.setAttribute("class", "teamdetaildiv");
		team_sub_div.append(team_details_div);

		const team_details_subdiv1 = document.createElement("div");
		team_details_div.append(team_details_subdiv1);

		const team_name_button = document.createElement("button");
		team_name_button.setAttribute("type", "button");
		// team_name_button.setAttribute("onclick", "OpenPopup()");
		team_details_subdiv1.append(team_name_button);

		const team_name_button_div1 = document.createElement("div");
		team_name_button.append(team_name_button_div1);

		const team_name_header = document.createElement("h2");
		team_name_header.innerText = join_team_response[i].teamName;
		team_name_button_div1.append(team_name_header);

		const team_name_button_div2 = document.createElement("div");
		team_name_button.append(team_name_button_div2);

		const icon_location = document.createElement("i");
		icon_location.setAttribute("class", "fa-solid fa-location-dot");
		team_name_button_div2.append(icon_location);

		const area_name_para = document.createElement("p");
		area_name_para.innerText = join_team_response[i].address.area;
		team_name_button_div2.append(area_name_para);

		const team_details_subdiv2 = document.createElement("div");
		team_details_div.append(team_details_subdiv2);

		const icon_handshake = document.createElement("i");
		icon_handshake.setAttribute("class", "fa-regular fa-handshake");
		team_details_subdiv2.append(icon_handshake);

		const open_for_players_details_para = document.createElement("p");
		open_for_players_details_para.innerText =
			join_team_response[i].openForPlayerDescription;
		team_details_subdiv2.append(open_for_players_details_para);

		const status_div = document.createElement("div");
		status_div.setAttribute("class", "statusdiv");
		div_teams.append(status_div);

		const status_para = document.createElement("p");
		const time = moment(join_team_response[i].createdTime);
		status_para.innerText = time.startOf("sec").fromNow();

		status_div.append(status_para);

		const result_data = join_team_response[i].requestStatus;

		let result_value = "";

		const status_para_bold = document.createElement("b");
		if (result_data === 1) {
			status_para_bold.setAttribute("class", "boldaccepted");
			result_value = "  (ACCEPTED)";
		} else if (result_data === 0) {
			status_para_bold.setAttribute("class", "boldrejected");
			result_value = "  (REJECTED)";
		} else {
			result_value = "  (Not yet Response)";
		}

		status_para_bold.innerText = result_value;
		status_para.append(status_para_bold);

		const delete_icon = document.createElement("i");
		delete_icon.setAttribute("class", "fa-solid fa-trash-can");
		delete_icon.setAttribute("data-id", join_team_response[i].requestId);
		status_div.append(delete_icon);

		if (result_data !== 2) {
			delete_icon.style.visibility = "hidden";
		}

		document.querySelector("main.response-main").append(div_teams);
	}
	// condition for delete request
	const switchnewcap = document.querySelectorAll(".fa-trash-can");
	switchnewcap.forEach((each) => {
		each.addEventListener("click", async () => {

			const requestId = each.dataset.id;

			const user_data = {
				"playerId": my_id,
				"requestId": requestId
			}
			loadingPage.style.display = 'flex';
			try {
				const response = await axios.post("http://localhost:8080/sportshubweb/team/request_delete", new URLSearchParams(user_data).toString(), {
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

					} else {
						// Handle error if needed
						loadingPage.style.display = 'none';
						console.error("Failed to delete:", result.message);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: result.message
						})
					}
				} else {
					loadingPage.style.display = 'none';
					// Handle HTTP error
					console.error("HTTP Error:", response.statusText);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: response.statusText
					})
				}
			} catch (error) {
				// Handle network or other errors
				loadingPage.style.display = 'none';
				console.error("Error:", error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.message
				})
			}

		});
	});

	loadingPage.style.display = 'none';
}


function previousPage() {
	window.location.reload();
	window.history.go(-1);
}

window.onload = responsePageLoad();
