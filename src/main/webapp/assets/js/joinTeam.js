const queryString = window.location.search;

const startPoint = "http://localhost:8080/sportshubweb/";

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

const { origin } = window.location;

const loadMore = document.getElementById("load_more");
const loadingPage = document.getElementById("load_body");

const searchInput = document.getElementById("search");

const searchButton = document.getElementById("search-icon");

const loadMoreButton = document.querySelector('.load-more-button');
const loadingSpinner = document.querySelector('.loading-spinner');
let listOfTeam = [];

let requested_team_id = [];

let timeoutId;

searchInput.addEventListener("input", () => {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(async () => {
		const inputValue = searchInput.value;
		if (inputValue === "") {
			document.querySelector(".join-team-content").innerHTML = "";
			await pagination(listOfTeam);
			loadMoreButton.style.display = 'inline';
		}
	}, 2000);
});

function searchTeams(searchString) {
	searchString = searchString.toLowerCase(); // Convert the search string to lowercase for case-insensitive search

	return listOfTeam.filter(function(team) {
		// Check if the search string is found in team name, address area, or address district
		return (
			team.teamName.toLowerCase().includes(searchString) ||
			team.address.area.toLowerCase().includes(searchString) ||
			team.address.district.toLowerCase().includes(searchString)
		);
	});
}

searchButton.addEventListener("click", async () => {
	const pattern = /^[a-zA-Z][a-zA-Z\s]{1,20}$/;
	const inputValue = searchInput.value;
	if (!pattern.test(inputValue)) {	
	Swal.fire({
 	 title: 'Please',
  	text: 'Search with more that 2 characters'
})
	} else {
		loadMoreButton.style.display = 'none';
		document.querySelector(".join-team-content").innerHTML = "";
		loadingSpinner.style.display = 'block';
		const searchTeam = searchTeams(inputValue);

		const lastTeamId = listOfTeam[listOfTeam.length - 1]["id"]

		const fetctTeam = await getDataById("team/search_open_for_player", "?search=" + inputValue + "&last_team_id=" + lastTeamId);
		
		const mergedArray = [...searchTeam, ...fetctTeam];
		await pagination(mergedArray);
		loadingSpinner.style.display = 'none';
		if(mergedArray.length == 0){
			document.querySelector(".join-team-content").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No teams available</div>';
		}	
		
	}

})

async function myTeam(teamId) {
	window.location.href = `${origin}/pages/profile/teamprofile.html?team_id=${teamId}`;
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

function renderTeam(team, address) {
	const template = `
              <div class="teams">
                  <div class="teamimagediv popup-name" data-id="${team.id}">
                      <img class="teamprofile"
                              src="${team.Url}" alt="logo of ${team.teamName}">
                  </div>
                  <div class="teamdetaildiv">
                      <div>
                          
                              <div class="popup-name" data-id="${team.id}">
                                  <h2>${team.teamName}</h2>
                              </div>
                              <div>
                                  <i class="fa-solid fa-location-dot"></i>
                                  <p>${team.address.area}</p>
                              </div>
                          
                      </div>
                      <div>
                          <i class="fa-regular fa-handshake"></i>
                          <p>${team.openForPlayerDescription}</p>
                      </div>
                  </div>
                  <p class="select-link" data-id="${team.id}">SELECT</p>
              </div>
              `;
	return template;
}

// function for team members display in popup start
function renderPlayer(player) {
	const template1 = `	
  <div>
          <img class="players-list-image" src="${player.Url}" alt="Image of ${player.userName}">
          <p>${player.userName}</p>
      </div>
      `;
	return template1;
}

// requestStatus 0 = rejected
// requestStatus 1 = accepted
// requestStatus 2 = not yet response
// requestStatus 3 = not active

async function loadMoreFun() {

	loadMoreButton.style.display = 'none';
	loadingSpinner.style.display = 'block';

	const lastTeamId = listOfTeam[listOfTeam.length - 1]["id"]

	console.log(lastTeamId)

	const fetctTeam = await getDataById("team/open_for_player", "?page_size=5&last_team_id=" + lastTeamId);
	listOfTeam = [...listOfTeam, ...fetctTeam];

	await pagination(fetctTeam);
	if (fetctTeam.length == 5) {
		// After loading, show the button again and hide the loading spinner
		loadMoreButton.style.display = 'inline';
		loadingSpinner.style.display = 'none';

	} else {
		loadingSpinner.style.display = 'none';
	}
}

function pagination(requested_teams) {
	const jointeam = []; // here i push the requested team object for remove form all request


	for (let i = 0; i < requested_teams.length; i++) {
		const a = requested_teams[i];
		console.log(a.id)
		const b = requested_team_id.indexOf(a.id);
		if (b < 0) {
			jointeam.push(a);
		}

	}

	console.log(jointeam)


	for (let index = 0; index < jointeam.length; index++) {
		const team = jointeam[index];


		const template = renderTeam(team);
		document
			.querySelector(".join-team-content")
			.insertAdjacentHTML("beforeend", template);

	}



	// response create start
	const selectbtn = document.querySelectorAll(".select-link");
	selectbtn.forEach((each) => {
		each.addEventListener("click", async () => {
			const team_unique_id = JSON.parse(each.dataset.id);
			console.log(team_unique_id);
			const user_data = {
				"playerId": my_id,
				"teamId": team_unique_id
			}

			loadingPage.style.display = 'flex';
			try {
				const response = await axios.post("http://localhost:8080/sportshubweb/team/team_request_create", new URLSearchParams(user_data).toString(), {
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					}
				});

				if (response.status === 200) {
					const result = response.data;
					console.log(result);
					if (result.status === 200) {
						requested_team_id.push(team_unique_id);
						document.querySelector(".join-team-content").innerHTML = "";
						loadingPage.style.display = 'none';
						await pagination(listOfTeam)
						
					} else {
						// Handle error if needed
						console.error("Failed to delete:", result.message);
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: result.message
						})
					}
				} else {
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
				console.error("Error:", error);
				Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: error.message
						})
			}
			
		});
	});
	
	// response create end
// function for team members display in popup start

// onclick button
const bookCovers = document.querySelectorAll(".popup-name");
bookCovers.forEach((each) => {
	each.addEventListener("click", async () => {
		const click_id = each.dataset.id;
		loadingPage.style.display = 'flex';
		console.log(click_id);

		const person_data = await getDataById("team/detail?teamId=", click_id);
		console.log(person_data);

		const popup = document.getElementById("popup");
		popup.classList.add("open-popup"); // hear we add class for show popup
		//  hear we work for display team member repeat pattern
		document.querySelector(".players-list").innerHTML = "";

		// find players in there team start
		const players_list = person_data.teamMembers;

		console.log(players_list);
		// find players in there team end

		// popup team content
		const popup_team_name = document.querySelector(
			"div.popup-team-content h2"
		);
		popup_team_name.innerHTML = person_data.teamName;

		const popup_area_name = document.querySelector("p.popup_area_name");
		popup_area_name.innerHTML = `${person_data.address.area},  ${person_data.address.district}`;

		const popup_since = document.querySelector("p.popup_since");
		const teamSince = moment(person_data.createdAt);
		popup_since.innerHTML = `Since  ${teamSince.format("MMM Do YY")}`;

		const popup_member_count = document.querySelector(
			"h3.popup_member_count"
		);
		popup_member_count.innerHTML = `Members (${players_list.length})`;

		for (let index = 0; index < players_list.length; index++) {
			const player = players_list[index];
			const template1 = renderPlayer(player);
			document
				.querySelector(".players-list")
				.insertAdjacentHTML("beforeend", template1);
		}
		const popup_viewprofile = document.querySelector(
			"button.profile-view-btn"
		);
		
		popup_viewprofile.setAttribute("data-viewid", click_id);
		loadingPage.style.display = 'none';
	});
});

const popup_viewprofile = document.querySelector("button.profile-view-btn");
popup_viewprofile.addEventListener("click", () => {
	console.log("hi")
	window.location.href = `${origin}/sportshubweb/pages/profile/teamprofile.html?team_id=${popup_viewprofile.dataset.viewid}`;
});


}

async function joinTeamPageLoad() {

	loadMoreButton.style.display = 'none';
	loadingPage.style.display = 'flex';
	const players_request = await getDataById("team/player_request?playerId=", my_id);


	for (const element of players_request) {
		const a = element.id;
		if (element["requestStatus"] == 2) {
			requested_team_id.push(a);
		}
	}
	console.log(players_request)

	const fetctTeam = await getDataById("team/open_for_player", "?page_size=5&last_team_id=0");
	listOfTeam = [...listOfTeam, ...fetctTeam];

	await pagination(listOfTeam)
	loadingSpinner.style.display = 'none';
	if (listOfTeam.length == 5) {
		loadMoreButton.style.display = 'inline';
	}
	loadingPage.style.display = 'none';
}



// function for team members display in popup end

async function setData(endpoint, data) {
	console.log(data);

	// axios.post(url, data, headerOptions)

	await axios
		.post(`http://localhost:3000/${endpoint}`, data, {
			"Content-Type": "application/json",
		})

		.then(async (result) => {
			console.log(result);

			window.location.href = `./response.html?unique_id=${phonenumber}`;
		})
		.catch((error) => {
			console.log(error);
			alert("Something Went Wrong");
		});
}

function ClosePopup() {
	popup.classList.remove("open-popup");
}
function previousPage() {
	loadingPage.style.display = 'flex';
	window.history.go(-1);
	loadingPage.style.display = 'none';
}



window.onload = joinTeamPageLoad();
