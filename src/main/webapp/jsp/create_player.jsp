<%@page import="in.fssa.sportshub.model.Player"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Player Registration</title>
</head>
<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        form {
            background-color: #fff;
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }

        input[type="text"],
        input[type="number"],
        input[type="password"],
        input[type="date"],
        textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button[type="submit"] {
            width: 100%;
            background-color: #ff8908d2;
            color: #fff;
            padding: 10px 0; /* Add vertical padding to center the text */
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #ff8908d2; /* Change color on hover if desired */
        }
        #error_msg {
    text-align: center; /* Center-align the text */
    color: lightcoral; /* Set the text color to light red */
}

/* Style the custom-select class */
.custom-select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff; /* Background color */
    color: #555; /* Text color */
}

/* Style the options within the select element */
.custom-select option {
    background-color: #fff; /* Background color for options */
    color: #333; /* Text color for options */
}

/* Style the select element on focus or hover */
.custom-select:focus, .custom-select:hover {
    border-color: #ff8908d2; /* Border color on focus or hover */
}
    </style>
<body>
    <form action="create" method="post">
        <h1>Create Player</h1>
        
        <% String value = (String) request.getAttribute("error"); %>
        <% Player player = (Player) request.getAttribute("player-new"); %>
       	<% if(value != null){ %>
       	<p id="error_msg"><%= value %></p>
       	<%} %>
    
        <label for="phoneNumber">Phone number</label>
        <input type="number" id="phoneNumber" name="phoneNumber" value="<%= player != null ?player.getPhoneNumber() :"9094090752"%>" required>
        
        <label for="userName">User name</label>
        <input type="text" id="userName" name="userName" value="<%= player != null ?player.getUserName() :"Alagu"%>" required>
        
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value="<%= player != null ?player.getFirstName() :"Alagappan"%>" required>
        
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value="<%= player != null ?player.getLastName() :"K"%>" >
        
        <label for="url">Image URL</label>
        <input type="text" id="url" name="url" value="<%= player != null ?player.getUrl() :"https://iili.io/HWhKUrB.webp"%> " >
        
        <label for="password">Password</label>
        <input type="password" id="password" name="password" value="<%= player != null ?player.getPassword() :"Aa!1aaaa"%>" required>
        
		<label for="gender">Gender</label>
		<select id="gender" name="gender" class="custom-select" required>
		    <option value="MALE">Men</option>
		    <option value="FEMALE">Women</option>
		    <option value="OTHER">Others</option>
		</select>
        
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value="<%= player != null ?player.getDateOfBirth() :"2001-01-01"%>" required>
        
        <label for="area">Area</label>
        <input type="text" id="area" name="area" value="<%= player != null ?player.getAddress().getArea() :"Aminjikarai"%>" required>
        
        <label for="district">District</label>
        <input type="text" id="district" name="district" value="<%= player != null ?player.getAddress().getDistrict() :"Chennai"%>" required>
        
        <label for="about">About</label>
        <textarea id="about" name="about"><%= player != null ?player.getAbout() :"This is a brief about me."%></textarea>
        
        <button type="submit">Submit</button>
    </form>
    

<script>
  var today = new Date();
  var minDate = new Date(today);
  minDate.setFullYear(today.getFullYear() - 10);

  var maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() - 50);

  minDate.setDate(minDate.getDate() + 1);
  maxDate.setDate(maxDate.getDate() + 1);

  var minDateFormatted = minDate.toISOString().split('T')[0];
  var maxDateFormatted = maxDate.toISOString().split('T')[0];

  document.getElementById('dateOfBirth').setAttribute('max', minDateFormatted);
  document.getElementById('dateOfBirth').setAttribute('min', maxDateFormatted);
</script>
</body>
</html>
