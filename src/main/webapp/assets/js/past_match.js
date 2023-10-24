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

async function forloopTeamObj(match_in_member){
const answer = []
for(let i=0;i<match_in_member.length;i++){
  const value = match_in_member[i]["player_id"]
  const get_object = await getDataById("users", value)
  answer.push(get_object)
}
return answer
}
async function pastMatchData(completed_match){

// this loop is for completed match start ----------------

function completedMatchTemp(match_data, my_team, opp_team) {
  const temp = `<div class="past_result_container" data-id="${
    match_data.id
  }">
<div class="match_time">
	<p>${moment(match_data.matchTime).add(0, "days").calendar()}</p>
</div>
<div class="past_result">
	<div class="my_team">
		<h2>${my_team.teamName}</h2>
		<div class="team_img">
			<img src="${my_team.Url}" alt="${my_team.teamName}">
			<p>${my_team.teamName.slice(0, 3).toUpperCase()}</p>
		</div>
		
	</div>

	<div class="result">
	<p class="loss">VS</p>
	</div>

	<div class="opp_team">
		<h2>${opp_team.teamName}</h2>
		<div class="team_img">
			<p>${opp_team.teamName.slice(0, 3).toUpperCase()}</p>
			<img src="${opp_team.Url}" alt="${opp_team.teamName}">
		</div>
		
	</div>
</div>
</div>
	`;

  return temp;
}
console.log(completed_match);

if (completed_match.length === 0) {
  const div_name = document.createElement("div");
  div_name.setAttribute("class", "no_content");

  const div_p = document.createElement("p");
  div_p.innerHTML = "(matches not played)";
  div_name.append(div_p);
  document.querySelector(".completed").append(div_name);
}

for (let i = 0; i < completed_match.length; i++) {

  const match_data = completed_match[i];

  const my_team_obj = match_data["createdTeam"]

  const opp_team_obj = match_data["opponentTeam"]


  const func = completedMatchTemp(

    match_data,
    my_team_obj,
    opp_team_obj,
  );
  document.querySelector(".completed").insertAdjacentHTML("beforeend", func);
}

}

function ClosePopupResult() {
  document.querySelector("table.past_players_list tbody").innerHTML = "";
  document.querySelector(".my_team_players div").innerHTML = "";
  document.querySelector(".opp_team_players div").innerHTML = "";
  
  const popup = document.getElementById("popup_result");
  popup.classList.remove("open-popup");
  }


export {pastMatchData};
