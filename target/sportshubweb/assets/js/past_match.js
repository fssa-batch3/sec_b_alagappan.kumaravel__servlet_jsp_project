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

function completedMatchTemp(match_data, my_team, opp_team, won, loss, draw) {
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
    0,
    0,
    0
  );
  document.querySelector(".completed").insertAdjacentHTML("beforeend", func);
}

// this loop is for completed match end ----------------

// past match popup content start

function pastMvp() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#ff8908";
  btn1.style.borderBottom = "2px solid #ff8908";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#000";
  btn2.style.border = "none";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#000";
  btn3.style.border = "none";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "block";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "none";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "none";
}
function pastPlayers() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#000";
  btn1.style.border = "none";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#ff8908";
  btn2.style.borderBottom = "2px solid #ff8908";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#000";
  btn3.style.border = "none";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "none";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "block";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "none";
}

function pastDetails() {
  const allbtn = document.querySelector(".result_nav button");

  allbtn.style.transition = ".5s";

  const btn1 = document.querySelector(".mvpbtn");

  btn1.style.color = "#000";
  btn1.style.border = "none";

  const btn2 = document.querySelector(".playersbtn");

  btn2.style.color = "#000";
  btn2.style.border = "none";

  const btn3 = document.querySelector(".detailsbtn");

  btn3.style.color = "#ff8908";
  btn3.style.borderBottom = "2px solid #ff8908";

  const content_1 = document.querySelector(".mvp_det");
  content_1.style.display = "none";

  const content_2 = document.querySelector(".past_match_players");
  content_2.style.display = "none";

  const content_3 = document.querySelector(".past_match_details");
  content_3.style.display = "block";
}

document.querySelector(".mvpbtn").addEventListener("click", pastMvp);
document.querySelector(".playersbtn").addEventListener("click", pastPlayers);
document.querySelector(".detailsbtn").addEventListener("click", pastDetails);
// past match popup content end

// here i made a function for show the past match full result via popup --------

function pastMvpTemp(player, team) {
  const temp = `
	<tr class="past_player_tr">
	<td><img src="${player.imageUrl}" alt="${player.userName}"></td>
	<td class="players_name">${player.userName}</td>
	<td class="players_team_name">${team.teamName.slice(0, 3).toUpperCase()}</td>
	</tr>
	`;
  return temp;
}
function pastplayersTemp(player) {
  const temp = `
	<div class="players">
	<img src="${player.imageUrl}" alt="${player.userName}">
	<p>${player.userName}</p>
	</div>
	`;
  return temp;
}

const pastdetails = document.querySelectorAll(".past_result_container");
pastdetails.forEach((bookCover) => {
  bookCover.addEventListener("click", async (event) => {
    const person_data = JSON.parse(bookCover.dataset.id);
    const popup_result = document.getElementById("popup_result");
    popup_result.classList.add("open-popup");

    // here i get all data for show in popup card start -------------------------
    const match_data_popup = completed_match.find((e) => e.id === person_data);
    const match_team_data = await getMatchInTeam(match_data_popup["id"])
    console.log(match_team_data)
    
    const my_team_response = match_team_data[0]
    console.log(my_team_response);
    const my_team_score = (await getScoreData(my_team_response["team_id"], match_data_popup["id"]))[0]
  
    console.log(my_team_score)
  
    const opp_team_response = match_team_data[1]
  
    const opp_team_score = (await getScoreData(opp_team_response["team_id"], match_data_popup["id"]))[0]
  
    const my_team_obj = await getDataById("team_details_list", my_team_response["team_id"])
  
    const opp_team_obj = await getDataById("team_details_list", opp_team_response["team_id"])

    const my_match_team_member = await getMatchTeamMember(my_team_obj["id"]);

    const my_mvp_players_list = my_match_team_member.filter(e => e.mvpStatus === 1);

    const opp_match_team_member = await getMatchTeamMember(opp_team_obj["id"]);

    const opp_mvp_players_list = opp_match_team_member.filter(e => e.mvpStatus === 1);

    // const opp_team_response = request_list.find(
    //   (e) =>
    //     e.matchUniqueId == person_data && e.team_id != my_team_response.team_id
    // );

    let won = 0;
    let loss = 0;
    let draw = 0;

    let my_draw = "nan";
    let my_loss;
    let my_won;
    let opp_draw = "nan";
    let opp_loss;
    let opp_won;

    if (my_team_score) {
      my_won = my_team_score.scoreWin;
  
      my_loss = my_team_score.scoreLoss;
  
      my_draw = my_team_score.scoreDraw;
    }
    if (opp_team_score) {
      opp_won = opp_team_score.scoreWin;
  
      opp_loss = opp_team_score.scoreLoss;
  
      opp_draw = opp_team_score.scoreDraw;
    }

    if (
      my_won === opp_loss &&
      my_loss === opp_won &&
      my_draw === opp_draw &&
      my_draw !== "nan" &&
      opp_draw !== "nan"
    ) {
      won = my_won;
      loss = my_loss;
      draw = my_draw;
    }
    // here i get all data for show in popup card end ---------------------------

    // here i insert the standard value in html from above data start ---------------
    document.getElementById("past_Won_score").innerHTML = won;
    document.getElementById("past_loss_score").innerHTML = loss;
    document.getElementById("past_draw_score").innerHTML = draw;

    document.querySelector("#past_my_team").innerHTML = my_team_obj.teamName;
    document
      .querySelector("#past_my_team_img")
      .setAttribute("src", my_team_obj.teamImageUrl);

    document.querySelector("#past_opp_team").innerHTML = opp_team_obj.teamName;
    document
      .querySelector("#past_opp_team_img")
      .setAttribute("src", opp_team_obj.teamImageUrl);

    document.querySelector("#past_match_time").innerHTML = moment(
      match_data_popup.time
    )
      .add(0, "days")
      .calendar();
    document.querySelector("#past_match_type").innerHTML =
    match_data_popup.typeOfMatch;
    document.querySelector("#past_match_location").innerHTML =
    match_data_popup.location;
    document.querySelector("#past_match_info").innerHTML =
    match_data_popup.information;

    document.querySelector(".my_team_players h4").innerHTML =
      my_team_obj.teamName.slice(0, 3).toUpperCase();
    document.querySelector(".opp_team_players h4").innerHTML =
      opp_team_obj.teamName.slice(0, 3).toUpperCase();
    // console.log((my_team_score["mvps"]).length)

    const my_match_team_member_obj = await forloopTeamObj(my_match_team_member)
    const opp_match_team_member_obj = await forloopTeamObj(opp_match_team_member)

      for (let i = 0; i < my_mvp_players_list.length; i++) {
        const find_player = my_match_team_member_obj.find(
          (e) => e.id === my_mvp_players_list[i]["player_id"]
        );

        const func = pastMvpTemp(find_player, my_team_obj);
        document
          .querySelector("table.past_players_list tbody")
          .insertAdjacentHTML("beforeend", func);
      }
    

      for (let i = 0; i < opp_mvp_players_list.length; i++) {
        const find_player = opp_match_team_member_obj.find(
          (e) => e.id === opp_mvp_players_list[i]["player_id"]
        );

        const func = pastMvpTemp(find_player, opp_team_obj);
        document
          .querySelector("table.past_players_list tbody")
          .insertAdjacentHTML("beforeend", func);
      }

      for (let i = 0; i < my_match_team_member_obj.length; i++) {
      const find_player = my_match_team_member_obj[i]

      const func = pastplayersTemp(find_player);
      document
        .querySelector(".my_team_players div")
        .insertAdjacentHTML("beforeend", func);
    }
    for (let i = 0; i < opp_match_team_member_obj.length; i++) {
      const find_player = opp_match_team_member_obj[i]
      const func = pastplayersTemp(find_player);
      document
        .querySelector(".opp_team_players div")
        .insertAdjacentHTML("beforeend", func);
    }
    document.querySelector(".closepopupresult").addEventListener("click", ClosePopupResult);
    // here i insert the standard value in html from above data end ---------------
  });
});

}

function ClosePopupResult() {
  document.querySelector("table.past_players_list tbody").innerHTML = "";
  document.querySelector(".my_team_players div").innerHTML = "";
  document.querySelector(".opp_team_players div").innerHTML = "";
  
  const popup = document.getElementById("popup_result");
  popup.classList.remove("open-popup");
  }


export {pastMatchData};
