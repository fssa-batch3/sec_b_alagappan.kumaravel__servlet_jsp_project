const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const endpoint = "player/detail?player_id=";

const user_api_id = JSON.parse(sessionStorage.getItem("playerId"));

if (user_api_id === null) {
  window.location.href = `${origin}/sportshubweb/`;
}

if (user_api_id !== null) {
  axios.get(`http://localhost:8080/sportshubweb/${endpoint}${user_api_id}`).then((res) => {
    const person_data = res.data;
	console.log(person_data)
    myProfile(person_data.data);
  });
}

async function myProfile(person_data) {
	console.log(person_data);
  document.getElementById("user_username").innerText = person_data.userName ? person_data.userName :"";
  const a = moment(person_data.createdAt);
  document.getElementById("create_date").innerText = `Since  ${a.format(
    "MMM Do YY"
  )}`;
  document.getElementById(
    "user_full_name"
  ).innerText = `${person_data.firstName? person_data.firstName: "" } ${person_data.lastName? person_data.lastName: ""}`;
  document.getElementById("user_date_of_birth").innerText =
    person_data.dateOfBirth;
  document.getElementById("user_gender").innerText = person_data.gender;

/*  const area_data = await getarea(person_data.areaUniqueId);
*/
  document.getElementById("user_area").innerText = person_data.address.area;
  document.getElementById("user_distric").innerText = person_data.address.district;
  document.getElementById("user_area_header").innerText = person_data.address.area;
  document.getElementById("user_phone_number").innerText =
    person_data.phoneNumber;
  document.getElementById("user_about").innerText = person_data.about ? person_data.about: "";

  const player_image_url = person_data.Url;
  const player_image = document.getElementById("player_image");
  if (player_image_url === "") {
    player_image.setAttribute(
      "src",
      "../../assets/images/defalt_player_image.webp"
    );
  } else {
    player_image.setAttribute("src", player_image_url);
  }

  // for range value start
  const username = person_data.userName;
  const firstname = person_data.firstName;
  const lastname = person_data.lastName;
  const dateofbirth = person_data.dateOfBirth;
  const { gender } = person_data;
  const { area } = person_data.address;
  const { district } = person_data.address;
  const { about } = person_data;
  const image = person_data.Url;

  const person_data_range = {
    username,
    firstname,
    lastname,
    dateofbirth,
    gender,
    area,
    district,
    about,
    image,
  };

  const emptyValues = new Set(["", null, undefined]);
  const null_count = Object.values(person_data_range).filter((x) =>
    emptyValues.has(x)
  ).length;
  let key_count = 0;

  // loop through each key/value
  for (const key in person_data_range) {
    // increase the count
    ++key_count;
  }
  // range calculation

  const range_value = 100 - (null_count / key_count) * 100;

  const range_input = document.querySelector(".range_cover");
  range_input.style.width = `${range_value}%`;

  document.querySelector(".range-label").innerHTML = `${Math.round(
    range_value
  )}%`;
}

// for range value end
function moveProfile() {
  window.location.href = `../profile/playerprofile.html?player_id=${user_api_id}`;
}
