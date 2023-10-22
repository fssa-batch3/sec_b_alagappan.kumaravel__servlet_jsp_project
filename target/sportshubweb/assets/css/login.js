function signUp_1(e) {
  e.preventDefault();
  // hear i collect value from signUp form
  const phonenumber = document.getElementById("phonenumber").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confrim_password = document.getElementById("confirm_password").value;

  // hear i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
  const user_detail = JSON.parse(localStorage.getItem("user_detail")) || [];

  // hear we give some condition for signup to restict same unique id

  const same_number = user_detail.some(
    (data) => data.phoneNumber === phonenumber
  );

  if (same_number) {
    // alert("This number already have account");
    a = document.querySelector(".wrong_password").innerHTML =
      "This number already have account.  ";
    // document.querySelector('form').reset();
    return a;
  }
  const same_user_name = user_detail.some((data) => data.userName === username);

  if (same_user_name) {
    // alert("User name not available.");
    a = document.querySelector(".wrong_password").innerHTML =
      "User name not available.  ";
    return a;
  }

  const wrong_password = password !== confrim_password;

  if (wrong_password) {
    // alert("Password not match.");

    a = document.querySelector(".wrong_password").innerHTML =
      "Password not match.  ";
    return a;
  }

  user_detail_single = {
    phoneNumber: phonenumber,
    userName: username,
    password,
    confirmPassword: confrim_password,
  };

  localStorage.setItem("user_data", JSON.stringify(user_detail_single));

  document.querySelector("form").reset();

  location.href = "./signup2.html";
}

function signUp_2(e) {
  // hear i collect value from signUp form
  const date_of_birth = document.getElementById("date_of_birth").value;
  const gender = document.getElementById("gender").value;
  const game = document.getElementById("game").value;
  const area = document.getElementById("area").value;
  const distric = document.getElementById("distric").value;
  const create_date = moment();
  console.log(create_date);

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  user_data.dateOFBirth = date_of_birth;
  user_data.gender = gender;
  user_data.game = game;
  user_data.area = area;
  user_data.distric = distric;
  user_data.createDate = create_date;
  user_data.firstName = "";
  user_data.lastName = "";
  user_data.about = "";

  // hear i give var name for local storage data (initially there is no data so we mentioned or (||) symbol to get empty array)
  const user_detail = JSON.parse(localStorage.getItem("user_detail")) || [];

  user_detail.push(user_data);

  localStorage.setItem("user_detail", JSON.stringify(user_detail));

  document.querySelector("form").reset();

  window.location.href = "../homepage/hpnew.html";

  e.preventDefault();
}

// for sign in()
function signIn(e) {
  const phonenumber = document.getElementById("phonenumber").value;
  const password = document.getElementById("password").value;

  const user_detail = JSON.parse(localStorage.getItem("user_detail")) || [];

  const exist = user_detail.some(
    (data) => data.phoneNumber === phonenumber && data.password === password
  );

  if (!exist) {
    document.querySelector("#error_msg").innerHTML =
      "Wrong Password or Phone number";
  } else {
    user_detail_single = { phoneNumber: phonenumber };

    localStorage.setItem("user_data", JSON.stringify(user_detail_single));

    alert("Your login in successful");
    window.location.href = "./pages/homepage/hpexist.html";
  }
  e.preventDefault();
}

// function for profile edit.

function onEdit() {
  window.location.href = "./profileedit.html";
}

function update(e) {
  e.preventDefault();

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  const unique_id = user_data.phoneNumber;

  const user_detail = JSON.parse(localStorage.getItem("user_detail"));

  function findPlayer(a) {
    return a.phoneNumber === unique_id;
  }

  person_data = user_detail.find(findPlayer);

  // for unique user name start
  person_data.userName = "";

  const user_name = document.getElementById("user_username").value;

  const same_user_name = user_detail.some(
    (data) => data.userName === user_name
  );
  if (same_user_name) {
    b = document.querySelector(".wrong_password").innerHTML =
      "User name not available.  ";
    return b;
  }
  // for unique user name end

  const first_name = document.getElementById("user_first_name").value;
  const last_name = document.getElementById("user_last_name").value;
  const date_of_birth = document.getElementById("user_date_of_birth").value;
  const gender = document.getElementById("user_gender").value;
  const game = document.getElementById("user_game").value;
  const area = document.getElementById("user_area").value;
  const distric = document.getElementById("user_distric").value;
  const about = document.getElementById("user_about").value;
  const image = document.getElementById("user_image").value;

  person_data.userName = user_name;
  person_data.firstName = first_name;
  person_data.lastName = last_name;
  person_data.dateOFBirth = date_of_birth;
  person_data.gender = gender;
  person_data.game = game;
  person_data.area = area;
  person_data.distric = distric;
  person_data.about = about;
  person_data.imageUrl = image;

  localStorage.setItem("user_detail", JSON.stringify(user_detail));

  window.location.href = "./myprofile.html";
}

// delete profile start

function del() {
  if (confirm("Are you sure to delete this Account ?")) {
    const user_data = JSON.parse(localStorage.getItem("user_data"));

    const unique_id = user_data.phoneNumber;

    const user_detail = JSON.parse(localStorage.getItem("user_detail"));

    function findPlayer(a) {
      return a.phoneNumber === unique_id;
    }

    const person_data = user_detail.find(findPlayer);

    const indexOfUser = user_detail.indexOf(person_data);

    user_detail.splice(indexOfUser, 1);

    localStorage.setItem("user_detail", JSON.stringify(user_detail));

    localStorage.setItem("user_data", "");

    window.location.href = "../../index.html";
  }
}

function logOut() {
  localStorage.setItem("user_data", "");
  window.location.href = "../../index.html";
}
