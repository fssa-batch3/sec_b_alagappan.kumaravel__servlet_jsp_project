const queryString = window.location.search;

const startPoint = "http://localhost:8080/sportshubweb/";

const urlParams = new URLSearchParams(queryString);

const my_name = urlParams.get("my_name");

const team_id = urlParams.get("team_id");

const myTeamRelId = JSON.parse(urlParams.get("cap_rel_id"));
const loadingPage = document.getElementById("load_body");

const myTeamId = JSON.parse(urlParams.get("team_id"))

const { origin } = window.location;


const loadMore = document.getElementById("load_more");

const searchInput = document.getElementById("search");

const searchButton = document.getElementById("search-icon");

const loadMoreButton = document.querySelector('.load-more-button');
const loadingSpinner = document.querySelector('.loading-spinner');
let listOfTeam = [];

const player_id = JSON.parse(sessionStorage.getItem("playerId"));
function renderTeam(team) {
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
                              </div>
                          
                      </div>
                      <div class="pin">
                          <i class="fa-regular fa-copyright"></i>
                          <p>${team.captainName}</p>
                      </div>
                  </div>
                  <p data-capname="${team.captainName}" data-teamname="${team.teamName}" data-url="${team.Url}" class="select-link" data-id="${team.teamCaptainRelId}">SELECT</p>
              </div>
              `;
	return template;
}


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
	searchString = searchString.toLowerCase();

	return listOfTeam.filter(function(team) {

		return (
			team.teamName.toLowerCase().includes(searchString)
		);
	});
}

searchButton.addEventListener("click", async () => {
	const pattern = /^[a-zA-Z][a-zA-Z\s]{1,20}$/;
	const inputValue = searchInput.value;
	if (!pattern.test(inputValue)) {
		alert(searchInput.getAttribute('title'));
	} else {
		loadMoreButton.style.display = 'none';
		document.querySelector(".join-team-content").innerHTML = "";
		loadingSpinner.style.display = 'block';
		const searchTeam = searchTeams(inputValue);

		const lastTeamId = listOfTeam[listOfTeam.length - 1]["id"]

		const fetctTeam = await getDataById("team/search_team", "?search=" + inputValue + "&last_team_id=" + lastTeamId);

		const mergedArray = [...searchTeam, ...fetctTeam];
		await pagination(mergedArray);
		loadingSpinner.style.display = 'none';
		if (mergedArray.length == 0) {
			document.querySelector(".join-team-content").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No teams available</div>';
		}

	}

})


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
async function loadMoreFun() {

	loadMoreButton.style.display = 'none';
	loadingSpinner.style.display = 'block';

	const lastTeamId = listOfTeam[listOfTeam.length - 1]["id"]

	console.log(lastTeamId, listOfTeam.length)

	const fetctTeam = await getDataById("teams", "?page_size=5&last_team_id=" + lastTeamId);
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

	let filter_team = requested_teams.filter(e => e.id != team_id);

	for (let i = 0; i < filter_team.length; i++) {
		const template = renderTeam(filter_team[i]);

		document
			.querySelector(".join-team-content")
			.insertAdjacentHTML("beforeend", template);
	}


	// response create start

	const selectbtn = document.querySelectorAll(".select-link");
	selectbtn.forEach((each) => {
		each.addEventListener("click", () => {

			const select_id = JSON.parse(each.dataset.id)

			const captain = each.dataset.capname;

			const imageUrl = each.dataset.url;

			const teamName = each.dataset.teamname;

			window.location.href = `../teamplayer captain/creatematch.html?my_name=${my_name}&cap_rel_id=${myTeamRelId}&team_id=${myTeamId}&opponent_url=${imageUrl}&opponent_name=${teamName}&captain=${captain}&type=1&opponent_id=${select_id}`;
		});
	});

	// response create end
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

	// onclick button
	const bookCovers = document.querySelectorAll(".popup-name");
	bookCovers.forEach((each) => {
		each.addEventListener("click", async () => {
			loadingPage.style.display = 'flex';
			const click_id = each.dataset.id;

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
		window.location.href = `${origin}/sportshubweb/pages/profile/teamprofile.html?team_id=${popup_viewprofile.dataset.viewid}`;
	});

	// function for team members display in popup end

}



async function teamSelectPage() {

	loadMoreButton.style.display = 'none';
	loadingPage.style.display = 'flex';

	const all_teams = await getDataById("teams", "?page_size=5&last_team_id=0")
	listOfTeam = [...listOfTeam, ...all_teams];

	await pagination(listOfTeam);
	if (listOfTeam.length == 5) {
		loadMoreButton.style.display = 'inline';
	}
	loadingPage.style.display = 'none';

}
function ClosePopup() {
	const popup = document.getElementById("popup");
	popup.classList.remove("open-popup");
}

function previousPage() {
	
	window.history.go(-1);
}

// function for team members display in popup end

window.onload = teamSelectPage();