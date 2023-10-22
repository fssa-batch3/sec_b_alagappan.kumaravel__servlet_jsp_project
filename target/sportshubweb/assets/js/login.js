const { origin } = window.location;

const startPoint = "http://localhost:8080/sportshubweb/";

const loadingPage = document.getElementById("load_body");

async function findnumber(value) {
  let matchPhonenum = 0;

  const res = new Promise((resolve, reject) => {
    axios
      .get(`${startPoint}/find_number`, {
        params: {
          phoneNumber: value,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const objData = await res;

  console.log(objData);

  if (objData.data.data && objData.data.status === 200) {
    matchPhonenum = 1;
  }
  if (objData.data.status === 500) {
    matchPhonenum = 2;
    alert(objData.data.message);
  } 

  return matchPhonenum;
}

async function signUp_1(e) {
  e.preventDefault();
  // here i collect value from signUp form
  const phonenumber = document.getElementById("phonenumber").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confrim_password = document.getElementById("confirm_password").value;
  const matchPhonenum = await findnumber(phonenumber);

  let temp;

  if (matchPhonenum === 1) {
    temp = document.querySelector(".wrong_password").innerHTML =
      "This number already have account.  ";
    return temp;
  }

  // for show exception in alert 
  if (matchPhonenum === 2) {
    return;
  }

  const wrong_password = password !== confrim_password;

  if (wrong_password) {
    temp = document.querySelector(".wrong_password").innerHTML =
      "Password not match.  ";
    return temp;
  }

  user_detail_single = {
    phoneNumber: phonenumber,
    userName: username,
    password,
    confirmPassword: confrim_password,
  };

  sessionStorage.setItem("user_data", JSON.stringify(user_detail_single));

  document.querySelector("form").reset();

  location.href = `${origin}/sportshubweb/pages/login&signup/signup2.html`;

}

function validation(password) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (password.match(passw)) {
    return true;
  }

  return false;
}

function mytest() {
  const password = document.getElementById("password").value;
  const valid = validation(password);

  if (valid === true) {
    document.querySelector(".password_error_not_ok").style.display = "none";
    document.querySelector(".password_error_ok").style.display = "flex";
  }
  if (valid === false) {
    document.querySelector(".password_error_not_ok").style.display = "flex";
    document.querySelector(".password_error_ok").style.display = "none";
  }
}

async function setData(endpoint, data) {

  await axios.post(`${startPoint}${endpoint}`, data, {
      "Content-Type": "application/json",})

    .then((data) => {
      localStorage.setItem("user_id", data.data.id);

      window.location.href = `${origin}/sportshubweb/pages/homepage/hpexist.html`;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function setArea(inset) {
  let new_id = "";

  await axios.post(`http://localhost:3000/area_list`, inset, {
      "Content-Type": "application/json",
    })
    .then((data) => {
      console.log(data);
      new_id = data.data.id;
    });

  return new_id;
}

async function findarea(area, distric) {
  let result = "";

  console.log("ww");

  // const resp = await axios.get(`http://localhost:3000/area_list`);

  const resp = new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/area_list`)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const objData = await resp;
  // console.log(objData);
  // console.log("done");

  const area_data = objData.data;

  const find_area = area_data.find(
    (e) => e.area === area && e.distric === distric
  );

  console.log(find_area);

  if (find_area !== undefined) {
    result = find_area.id;
    return result;
  }

  if (find_area === undefined) {
    result = area_data.length + 1;
    const inset = {
      area,
      distric,
    };
    console.log(inset);

    const new_id = await setArea(inset);

    return new_id;
  }
}

async function signUp_2(e) {
  e.preventDefault();

  // here i collect value from signUp form
  const date_of_birth = document.getElementById("date_of_birth").value;
  const gender = document.getElementById("gender").value;
  const area = document.getElementById("area").value;
  const district = document.getElementById("distric").value;
  // const create_date = moment();

  // create user id for new person start

  // const area_data = await findarea(area, distric);

  const user_data = JSON.parse(sessionStorage.getItem("user_data"));
console.log(date_of_birth, gender)
  user_data.dateOfBirth = date_of_birth;
  user_data.gender = gender;
  // user_data.game = game;
  // user_data.areaUniqueId = area_data;
  // user_data.createDate = create_date;
  user_data.firstName = "";
  user_data.lastName = "";
  user_data.about = "";
  user_data.imageUrl = "https://iili.io/HWhKUrB.webp";
  user_data.area = area;
  user_data.district = district;

  console.log(user_data);

  fetch(`${startPoint}player/create`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(user_data).toString(),
  }).then(response => {
    console.log(response)
  if(!response.ok){
    throw new Error(response.message);
  }
  return response.json()}
  ).then(data => {
    if (data.error) {
      Notify.error("Register failed: " + data.error);
    } else {
      if(data.status == 200){
        const userId = data.data;
        sessionStorage.setItem('playerId', userId);
        Notify.success("login successful");
        window.location.href = `${origin}/sportshubweb/home?player_id=${userId}`;
      }else{
		  alert(data.message)
        Notify.error(data.message);
      }

    }
  })
  .catch(error => {
    console.error("Error:", error);
    Notify.error("An error occurred while logging in. "+error.message);
  });


  document.querySelector("form").reset();
}



// for sign in()
async function signIn(e) {
  e.preventDefault();
  const phonenumber = document.getElementById("phonenumber").value;
  const password = document.getElementById("password").value;
	//loadingPage.style.display = 'flex';
  // let user_detail = JSON.parse(localStorage.getItem('user_detail')) || [];

  const response = axios.get(`${startPoint}/log_in`, {
      params: {
        phoneNumber: phonenumber,
        password : password
      },
    });

    await response.then((res) => {
		console.log(res)
      if (res.data.data > 0 && res.data.status == 200) {

        sessionStorage.setItem("playerId", res.data.data);
        window.location.href = `${origin}/sportshubweb/home?player_id=${res.data.data}`;
      }
      if(res.data.status == 500 && res.data.data == -1){
		  alert(res.data.message)
	  }
	  if(res.data.status == 500 && res.data.data == 0){
		  document.getElementById("error_msg").innerHTML = "Incorrect phone number or password";
	  }
	  
    });
    

}

// function for profile edit.

function onEdit() {
  window.location.href = `${origin}/sportshubweb/pages/profile/profileedit.html`;
}

function myFunction() {
  const image_input = document.getElementById("user_image").value;
  const image_element = document.getElementById("team_image_show");
  image_element.setAttribute("src", image_input);
  if (image_element.getAttribute("src") === "") {
    image_element.setAttribute("src", "https://iili.io/HWhKUrB.webp");
  }
}

async function updateData(endpoint, data) {
	console.log(startPoint,endpoint, data)
	await fetch(`${startPoint}${endpoint}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(data).toString(),
  }).then(response => {
    console.log(response)
  if(!response.ok){
    throw new Error(response.message);
  }
  return response.json()}
  ).then(data => {
    if (data.error) {
      alert("update failed: " + data.error);
    } else {
      if(data.status == 200){

      window.location.href = `${origin}/sportshubweb/pages/profile/myprofile.html`;
      }else{
        alert(data.message);
      }

    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred while logging in. "+error.message);
  });



}
// same user name function not done now -------------------
// function sameUserName(user_detail) {
//   const user_name = document.getElementById("user_username").value;

//   const same_user_name = user_detail.some(
//     (data) => data.userName === user_name
//   );

//   if (same_user_name) {
//     return false;
//   }
//   true;
// }

async function update(e) {
  e.preventDefault();

  const person_data = {};

  // const same_user_name = sameUserName(person_data);

  // if (same_user_name) {
  //   b = document.querySelector(".wrong_password").innerHTML =
  //     "User name not available.  ";
  //   return b;
  // }

  // for unique user name end

  const first_name = document.getElementById("user_first_name").value;
  const last_name = document.getElementById("user_last_name").value;
  const date_of_birth = document.getElementById("user_date_of_birth").value;
  const gender = document.getElementById("user_gender").value;
  const area = document.getElementById("user_area").value;
  const district = document.getElementById("user_distric").value;
  const about = document.getElementById("user_about").value;

  let image = document.getElementById("user_image").value;
  const user_name = document.getElementById("user_username").value;
  const password = document.getElementById("user_password").value;
  
  console.log(password)
  person_data.userName = user_name;
  person_data.password = password;
  person_data.firstName = first_name;
  person_data.lastName = last_name;
  person_data.dateOfBirth = date_of_birth;
  person_data.gender = gender;
  person_data.area = area;
  person_data.district = district;
  person_data.about = about;
  if (image === "") {
    image = "https://iili.io/HWhKUrB.webp";
  }
  person_data.imageUrl = image;

  const user_api_id = JSON.parse(sessionStorage.getItem("playerId"));

  const endpoint = `player/update`;
  
  person_data.id = user_api_id;
  await updateData(endpoint, person_data);
}

// delete profile start // not worked for database

// function del() {
//   if (confirm("Are you sure to delete this Account ?")) {
//     const queryString = window.location.search;

//     const urlParams = new URLSearchParams(queryString);

//     const phonenumber = urlParams.get("unique_id");

//     const unique_id = phonenumber;

//     const user_detail = JSON.parse(localStorage.getItem("user_detail"));

//     function findPlayer(a) {
//       return a.phoneNumber === unique_id;
//     }

//     const person_data = user_detail.find(findPlayer);

//     const indexOfUser = user_detail.indexOf(person_data);

//     user_detail.splice(indexOfUser, 1);

//     localStorage.setItem("user_detail", JSON.stringify(user_detail));

//     window.location.href = `${origin}/index.html`;
//   }
// }

function logOut() {
  sessionStorage.setItem("playerId", null);

  window.location.href = `${origin}/sportshubweb/`;
}

function backBtnHome() {
	const userId = sessionStorage.getItem("playerId")
  window.location.href = `${origin}/sportshubweb/home?player_id=${userId}`;
}

function previousPage() {
  window.history.go(-1);
}

// new js for show password start ---------------------------

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
if (togglePassword) {
  togglePassword.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  });
}

const togglePassword_con = document.querySelector("#togglePassword_con");
const confirm_password = document.querySelector("#confirm_password");
if (togglePassword_con) {
  togglePassword_con.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
      confirm_password.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirm_password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  });
}
// new js for show password end ---------------------------

const DOB = document.querySelector("#date_of_birth");

const today = new Date();

const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
const yyyy = today.getFullYear();

const max_value = `${yyyy}-${mm}-${dd}`;
if (DOB) {
  DOB.setAttribute("max", max_value);
}
