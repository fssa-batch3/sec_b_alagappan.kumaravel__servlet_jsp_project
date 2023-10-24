const queryString = window.location.search;

const startPoint = "http://localhost:8080/sportshubweb/";

const urlParams = new URLSearchParams(queryString);

const team_id = urlParams.get("team_id");

const my_name = urlParams.get("my_name");

const myTeamRelId = JSON.parse(urlParams.get("cap_rel_id"));

const myTeamId = JSON.parse(urlParams.get("team_id"))

const searchInput = document.getElementById("search");

const searchButton = document.getElementById("search-icon");

const loadingSpinner = document.querySelector('.loading-spinner');
const loadingPage = document.getElementById("load_body");

let areaList = [];

let timeoutId;

searchInput.addEventListener("input", () => {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(async () => {
		const inputValue = searchInput.value;
		if (inputValue === "") {
			document.querySelector(".area-background-color").innerHTML = "";
			await uppendData(areaList);
		}
	}, 2000);
});

function searchTeams(searchString) {
	searchString = searchString.toLowerCase(); // Convert the search string to lowercase for case-insensitive search

	return areaList.filter(function(team) {
		// Check if the search string is found in team name, address area, or address district
		return (
			team.area.toLowerCase().includes(searchString) ||
			team.district.toLowerCase().includes(searchString)
		);
	});
}

searchButton.addEventListener("click", async () => {
	const pattern = /^[a-zA-Z][a-zA-Z\s]{1,20}$/;
	const inputValue = searchInput.value;
	if (!pattern.test(inputValue)) {
		alert(searchInput.getAttribute('title'));
	} else {
		document.querySelector(".area-background-color").innerHTML = "";
		loadingSpinner.style.display = 'block';
		const searchTeam = searchTeams(inputValue);

		await uppendData(searchTeam);
		loadingSpinner.style.display = 'none';
		if(searchTeam.length == 0){
			document.querySelector(".area-background-color").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No area available</div>';
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
      if(res.data.status == 500){
		  alert(res.data.message)
		  data = null ;
	  }
	  
    });
    
    return data;
}

function renderTeam(team) {
  const template = `
        <div class="area-content">
    <i class="fa-solid fa-location-dot"></i>
    <div>
        <h2>${team.area}</h2>
        <div class="pin">
            <i class="fa-solid fa-map-pin"></i>
            <p>${team.district}</p>
        </div>
    </div>
    <a class="area-link" data-id="${team.id}">SELECT</a>
</div>
        `;
  return template;
}

async function uppendData(area_list){
	
for (let index = 0; index < area_list.length; index++) {
  const area = area_list[index];
  const template = renderTeam(area);

  document
    .querySelector(".area-background-color")
    .insertAdjacentHTML("beforeend", template);
}

const selectbtn = document.querySelectorAll(".area-link");
selectbtn.forEach((each) => {
  each.addEventListener("click", () => {
    const id_area = JSON.parse(each.dataset.id);

    const find_in_list = area_list.find(e => e.id === id_area)

    window.location.href = `../teamplayer captain/creatematch.html?my_name=${my_name}&cap_rel_id=${myTeamRelId}&team_id=${myTeamId}&opponent_url=https://iili.io/HXFAu87.png&opponent_name=${find_in_list["area"]}&captain=${find_in_list["district"]}&type=2&opponent_id=${id_area}`;
  });
});


	
}

async function areaSelectPage(){

loadingPage.style.display = 'flex';

let area_list = await getDataById("areas", "");

areaList = [...areaList, ...area_list];

await uppendData(areaList);
loadingPage.style.display = 'none';
}

function previousPage() {
  window.history.go(-1);
}

window.onload = areaSelectPage();