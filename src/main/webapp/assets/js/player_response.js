const queryString = window.location.search;

const startPoint = "http://localhost:8080/sportshubweb/";

const urlParams = new URLSearchParams(queryString);

const phonenumber = urlParams.get("unique_id");

const teamId = urlParams.get("teamId");
const loadingPage = document.getElementById("load_body");

const unique_id = phonenumber;

const my_id = JSON.parse(sessionStorage.getItem("playerId"));

// find player team
// const data = axios.get(`http://localhost:3000/${endpoint}?playerId=${user_api_id}&activeStatus=${1}`

function renderPlayer(team) {
  const template = `
    <div class="player-request-div">
    <div class="popup_profile" data-id="${team.id}"><img src="${team.Url}" alt="image of ${team.userName}"></div>
        <div class="popup_profile" data-id="${team.id}">
            <h2>${team.userName}</h2>
            <div><i class="fa-solid fa-location-dot"></i>
                <p>${team["address"]["area"]}</p>
        </div>
        </div>
    <div class="player_request_accept" data-id="${team.requestId}">
        <i class="fa-regular fa-circle-check"></i>
        <p>Accept</p>
    </div>
    <div class="player_request_reject" data-id="${team.requestId}">
        <i class="fa-regular fa-circle-xmark"></i>
        <p>Reject</p>
    </div>
</div>
    `;
  return template;
}
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

async function PlayerResponsePage() {
loadingPage.style.display = 'flex';
  const players_data = await getDataById("player/team_request?teamId=", teamId);

  console.log(players_data);
  // here above we find the players who give request to this team

  // now I am created template for show the request

if(players_data.length == 0){
	document.querySelector(".players-request-content").innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 80vh;">No Request Found</div>';
}

  for (let i = 0; i < players_data.length; i++) {
    const player = players_data[i];
    const template1 = renderPlayer(player);
    document
      .querySelector(".players-request-content")
      .insertAdjacentHTML("beforeend", template1);
  }

   // players popup details start
  const selectbtn = document.querySelectorAll(".popup_profile");
  selectbtn.forEach((each) => {
    each.addEventListener("click", () => {
		loadingPage.style.display = 'flex';
      popup.classList.add("open-popup");
      const person_data = players_data.find(
        (f) => f.id === JSON.parse(each.dataset.id)
      );

      const player_popup_image = document.querySelector(".player_popup_image");
      player_popup_image.setAttribute("src", person_data.Url);
      player_popup_image.setAttribute(
        "alt",
        `image of  ${person_data.userName}`
      );

      const player_popup_username = document.querySelector(".player-name h3");
      player_popup_username.innerHTML = person_data.userName;

      const player_popup_fullname = document.querySelector(".player-name p");
      player_popup_fullname.innerHTML = `${person_data.firstName == undefined ? "": person_data.firstName} ${person_data.lastName == undefined ? "": person_data.lastName}`;

      const player_popup_area = document.querySelector(".area_name_para");
      player_popup_area.innerHTML = `${person_data["address"]["area"]}, ${person_data["address"]["district"]}`;

      const player_popup_about = document.querySelector(".player_about");
      player_popup_about.innerHTML = person_data.about == undefined ? "":person_data.about;

      const player_popup_age = document.querySelector(".player_age");
      const date = person_data.dateOfBirth;
      const dob = new Date(date);
      const today = new Date();
      let age = today.getTime() - dob.getTime();
      age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
      player_popup_age.innerHTML = `${age}   Years`;
	
	document.querySelector(".profilebtn").addEventListener("click" ,()=>{
		window.location.href=`../profile/playerprofile.html?player_id=${each.dataset.id}`
	})
	loadingPage.style.display = 'none';
	
    });
  });
  // players popup details end

  // request accept start;

  const acceptBtn = document.querySelectorAll(".player_request_accept");
  acceptBtn.forEach((accept) => {
    accept.addEventListener("click", async () => {
		loadingPage.style.display = 'flex';
      const request_data_id = accept.dataset.id ;
      
      const user_data = {
		"requestId": request_data_id,
		"captainId": my_id
 		 }
 		 
      console.log(user_data);
	  try {
		  const response = await axios.post("http://localhost:8080/sportshubweb/team/request_accept", new URLSearchParams(user_data).toString(), {
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
		      loadingPage.style.display = 'none';
		      location.reload();
		      Notify.success("Request created successfully");
		    } else {
		      // Handle error if needed
		      loadingPage.style.display = 'none';
		      console.error("Failed to delete:", result.message);
		      Notify.error(result.message);
		    }
		  } else {
		    // Handle HTTP error
		    loadingPage.style.display = 'none';
		    console.error("HTTP Error:", response.statusText);
		    Notify.error(response.statusText);
		  }
		} catch (error) {
			loadingPage.style.display = 'none';
		  // Handle network or other errors
		  console.error("Error:", error);
		  Notify.error(error.message);
		}
    });
  });

  // request accept end;
  // request reject start;
  const rejectbtn = document.querySelectorAll(".player_request_reject");
  rejectbtn.forEach((accept) => {
    accept.addEventListener("click", async () => {
		loadingPage.style.display = 'flex';
      const request_data_id = accept.dataset.id ;
      
	  const user_data = {
		"requestId": request_data_id,
		"captainId": my_id
 		 }
 		 
      console.log(user_data);
	  try {
		  const response = await axios.post("http://localhost:8080/sportshubweb/team/request_reject", new URLSearchParams(user_data).toString(), {
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
		      loadingPage.style.display = 'none';
		      location.reload();
		      Notify.success("Request created successfully");
		    } else {
		      // Handle error if needed
		      loadingPage.style.display = 'none';
		      console.error("Failed to delete:", result.message);
		      Notify.error(result.message);
		    }
		  } else {
		    // Handle HTTP error
		    loadingPage.style.display = 'none';
		    console.error("HTTP Error:", response.statusText);
		    Notify.error(response.statusText);
		  }
		} catch (error) {
		  // Handle network or other errors
		  loadingPage.style.display = 'none';
		  console.error("Error:", error);
		  Notify.error(error.message);
		}
      
      
    });
  });
    // request reject end;
    loadingPage.style.display = 'none';
}

async function updateAcceptData(endpoint, data) {
  axios
    .patch(`http://localhost:3000/${endpoint}`, data, {
      "Content-Type": "application/json",
    })

    .then(async (data) => {
      console.log(data);
      const player_id = data.data["playerId"]

      const all_request_list = await getRelationDataByPlayer("response_list", player_id)

      const filter_open_list = all_request_list.filter(e => e.requestStatus === 2)

      const result = []
      for (let index = 0; index < filter_open_list.length; index++) {
        const req_id = filter_open_list[index]["id"];

        const lastpoint = `response_list/${req_id}`

        const data = {
          "requestStatus": 3,
        };
    
      const change_res = await updateData(lastpoint, data);

      result.push(change_res)

      }

      find = result.find(e => e === 1)
      console.log(find)
      if(!find){
        const obj = {
          "teamId": data.data["teamId"],
          "playerId": data.data["playerId"],
          "dateOfJoin": moment(),
          "activeStatus": 2
        }

      await setData("player_team_relation", obj);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Something Went Wrong in accept");
    });
}

function previousPage() {
	loadingPage.style.display = 'flex';
	setTimeout(function () {
  loadingPage.style.display = 'none';
}, 5000);
	
  window.history.go(-1);
}

window.onload = PlayerResponsePage();
