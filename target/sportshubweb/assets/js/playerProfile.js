import {pastMatchData} from './past_match.js';

const startPoint = "http://localhost:8080/sportshubweb/";

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const url_id = JSON.parse(urlParams.get("player_id"));

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

const loadingPage = document.getElementById("load_body");

// ----------------- button css animation start

function member() {
    const toggle_button = document.querySelector(".button_underline");
    toggle_button.style.left = "50%";
  
    const content_1 = document.querySelector("section.first");
    content_1.style.display = "none";
  
    const content_3 = document.querySelector("section.three");
    content_3.style.display = "block";
  
  }

  function profile() {
    const toggle_button = document.querySelector(".button_underline");
    toggle_button.style.left = "0%";
  
    const content_1 = document.querySelector("section.first");
    content_1.style.display = "block";
  
    const content_3 = document.querySelector("section.three");
    content_3.style.display = "none";
  
  }
  
document.querySelector(".profilebtn").addEventListener("click", profile);
document.querySelector(".memberbtn").addEventListener("click", member)
document.querySelector(".backtohome").addEventListener("click", previousPage)
  // ----------------button css animation end

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

function teamCard(teamProfile, background) {
const template = `<div class="playerteam" data-id="${teamProfile.id}">
                <div class="myteam" style="background-color: ${background}">
                    <div class="teamimagediv">
                        <img class="teamprofile" src="${teamProfile.Url}" alt="${
    teamProfile.teamName
    }">
                    </div>
                    <div class="teamdetaildiv">
                        <div>
                            <div><h2>${teamProfile.teamName}</h2></div>
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                                <p>Since ${moment(teamProfile.dateOfJoin).format("MMM Do YY")}</p></div>
                        </div>
                        <div class="matchdetails"><i class="fa-solid fa-location-dot"></i>
                            <p>${teamProfile.address.area}, ${teamProfile.address.district}</p></div>
    
                            <div class="matchdetails"><i class="fa-solid fa-circle-info"></i>
                                <p>${teamProfile.about}</p></div>	
                    </div>
                </div>
        </div>
        `;
    return template;
}

async function getplayerDet(endpoint, user_api_id) {
    const data = axios.get(`http://localhost:3000/${endpoint}/${user_api_id}`);
  
    const result = await data;
  
    return result.data;
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

async function playerProfilePage(){
	
	loadingPage.style.display = 'flex';

let playerProfile = await getDataById("player/detail?player_id=", url_id); // here i find player profile


let teamProfile = await getDataById("player/teams?player_id=", url_id);

console.log(teamProfile)
if(teamProfile.length == 0){
	document.querySelector("section.three .playermatch").innerHTML = "Not played with any Team"
}
for(let i=0;i<teamProfile.length;i++){
	if(teamProfile[i]["currentTeam"]){
		document.querySelector("section.three .playermatch").insertAdjacentHTML("afterbegin", teamCard(teamProfile[i] , 'mistyrose'));
	}else{
		document.querySelector("section.three .playermatch").insertAdjacentHTML("beforeend", teamCard(teamProfile[i]) , '#fff');
	}
	
}
  

 document.querySelectorAll(".playerteam").forEach((each) => {
		each.addEventListener("click", async () => {
			
    window.location.href = `../profile/teamprofile.html?team_id=${each.dataset.id}`;
  })
  });



// ------------players team end-----

console.log(playerProfile);
// PLAYER PROFILE START
const player_image = document.createElement("img");
player_image.setAttribute("src", playerProfile.Url);
player_image.setAttribute("alt", playerProfile.userName);
document.querySelector(".playerimagediv").prepend(player_image);

const player_background_image = document.createElement("img");
player_background_image.setAttribute("class", "bgimg");
player_background_image.setAttribute("src", playerProfile.Url);
player_background_image.setAttribute("alt", playerProfile.userName);
document.querySelector("header").prepend(player_background_image);

const playerUserName = playerProfile.userName;
document.querySelector(".profiledetailsdiv p").innerHTML = playerUserName;

const playerLocation = playerProfile.address.area;
document.querySelector(".profiledetailsdiv div:nth-child(2) p").innerHTML =
  playerLocation;

const playerSince = moment(playerProfile.dateOfJoin);
document.querySelector(".profiledetailsdiv div:nth-child(3) p").innerHTML =
  `Since  ${playerSince.format("MMM Do YY")}`;

const playerFullName = `${playerProfile.firstName == undefined ? "": playerProfile.firstName} ${playerProfile.lastName == undefined ? "": playerProfile.lastName}`;
document.querySelector(".player_full_name").innerHTML = playerFullName;

const playerAge = playerProfile.dateOfBirth;
const dob = new Date(playerAge);
const today = new Date();
let age = today.getTime() - dob.getTime();
age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
document.querySelector(".player_age").innerHTML = age;

const playerGender = playerProfile.gender;
document.querySelector(".player_gender").innerHTML = playerGender;

const playerArea = `${playerProfile.address.area}, ${playerProfile.address.distric}`;
document.querySelector(".player_area").innerHTML = playerArea;

const playerAbout = playerProfile.about == undefined ? "":playerProfile.about;
document.querySelector(".player_about").innerHTML = playerAbout;

document.querySelector(".whatsapp").addEventListener("click", whatsapp)
function whatsapp() {
  window.location.href=`https://wa.me/${playerProfile.phoneNumber}` ;
}

loadingPage.style.display = 'none';
// PLAYER PROFILE END

}
function previousPage() {
  window.history.go(-1);
}

window.onload = playerProfilePage();
