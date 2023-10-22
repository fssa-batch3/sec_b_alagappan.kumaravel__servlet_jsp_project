// some data get from login.js file

const user_api_id = JSON.parse(sessionStorage.getItem("playerId"));

loadingPage.style.display = 'flex';
const endpoint = "player/detail?player_id=";

  axios.get(`http://localhost:8080/sportshubweb/${endpoint}${user_api_id}`).then((res) => {
    const person_data = res.data;

   showInEdit(person_data.data);
   loadingPage.style.display = 'none';
  });


async function showInEdit(person_data) {
	console.log(person_data)
  document.getElementById("user_username").value = person_data.userName;
  document.getElementById("user_first_name").value = person_data.firstName ? person_data.firstName: "" ;
  document.getElementById("user_last_name").value = person_data.lastName ? person_data.lastName: "" ;
  document.getElementById("user_date_of_birth").value = person_data.dateOfBirth;
  document.getElementById("user_gender").value = person_data.gender;

  document.getElementById("user_area").value = person_data.address.area;
  document.getElementById("user_distric").value = person_data.address.district;
  document.getElementById("user_about").value = person_data.about ? person_data.about : "" ;
  document.getElementById("user_image").value = person_data.Url;
	document.getElementById("user_password").value = person_data.Password;
  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", person_data.Url);

  const DOB_edit = document.querySelector("#user_date_of_birth");

  const max_value_1 = `${yyyy}-${mm}-${dd}`;
  DOB_edit.setAttribute("max", max_value_1);
}
