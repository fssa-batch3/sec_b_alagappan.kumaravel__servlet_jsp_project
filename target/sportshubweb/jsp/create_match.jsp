<%@page import="in.fssa.sportshub.model.Team"%>
<%@page import="java.util.Set"%>
<%@page import="in.fssa.sportshub.model.Address"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Create player</title>
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

  select,
  input[type="number"],
  input[type="datetime-local"],
  input[type="text"] {
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
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #ff8908d2;
  }

  /* Style the select box for opponent type */
  #opponentType {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }


  /* Show the labels for To Team and To Area when needed */
  label[for="toTeam"],
  label[for="toArea"] {
    display: none;
    margin-top: 10px;
  }
  
  #error_msg {
    text-align: center; /* Center-align the text */
    color: lightcoral; /* Set the text color to light red */
}
</style>

<body>
	<% String teamCaptainRelIdStr = request.getParameter("teamCaptainRelId"); %>
	<% int teamCaptainRelId = 0; %>
	<% try {
	        teamCaptainRelId = Integer.parseInt(teamCaptainRelIdStr);
	    } catch (NumberFormatException e) {
	        e.printStackTrace();
	    } %>
	<% Set<Address> listOfAddress = (Set<Address>)request.getAttribute("listOfAddress");%>
	<% Set<Team> listOfTeam = (Set<Team>)request.getAttribute("listOfTeam");%>
	
	<form action="create?teamCaptainRelId=<%= teamCaptainRelId %>" method="post">
		<h1>Create match</h1>
		
		<% String data = (String) request.getParameter("error"); %>
       	<% if(data != null){ %>
       	<p id="error_msg"><%= data %></p>
       	<%} %>
		
		<label for="opponentType">Opponent type</label><br>
		<select name="opponentType" id="opponentType">
	    <option value="1">To team</option>
	    <option value="2">To area</option>
		</select>
		
		 <br>
		<label for="toTeam">To team</label><br>
		<select name="toTeam" id="toTeam">
		<% for(Team team : listOfTeam) { %>
	    <option value="<%= team.getId()%>"><%= team.getTeamName()%></option>
	    <%}; %>
		</select><br>


		<label for="toArea">To Area</label><br>
		<select name="toArea" id="toArea">
		<% for(Address address : listOfAddress) { %>
	    <option value="<%= address.getId() %>"><%= address.getArea() %>, <%= address.getDistrict()%></option>
	     <%}; %>
		</select><br>
		
		
		<label for="typeOfMatch">Type of match</label><br>
		<select name="typeOfMatch" id="typeOfMatch">
	    <option value="1">Betting match</option>
	    <option value="2">Friendly match</option>
		</select><br>

		 <label for="members">Members</label><br>
		 <input type="number" id="members" name="members" min="4" max="15" value="10" required> <br>
		 
		 <label for="membersAgeFrom">From age</label><br>
		 <input type="number" id="membersAgeFrom" name="membersAgeFrom" min="10" max="50" value="19" required> <br>
		 
		 <label for="membersAgeTo">To age</label><br>
		 <input type="number" id="membersAgeTo" name="membersAgeTo" min="10" max="50" value="22" required> <br>
		 
		 <label for="matchTime">Match time</label><br>
		<input type="datetime-local" id="matchTime" name="matchTime" value="" min="" required><br>	
				 
		 <label for="location">Location</label><br>
		 <input type="text" id="location" name="location" value="chennai" required> <br>
		 
		 <label for="information">Additional Information</label><br>
		 <input type="text" id="information" name="information" value="Betting match 100rs per match"> <br>
		 
		 <button type="submit" value="Submit">submit</button>
	</form>
	
	
<script>
const now = new Date();

// Calculate a future date (e.g., one day ahead)
const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // One day in milliseconds

// Format the future date as a string compatible with datetime-local input
const formattedDate = futureDate.toISOString().slice(0, 16); // Truncate to yyyy-MM-ddTHH:mm format

// Set the default value for the input field
document.getElementById("matchTime").value = formattedDate;

// Set the minimum value to restrict selecting past dates
document.getElementById("matchTime").min = formattedDate;

// Get references to the select and input elements
const opponentTypeSelect = document.getElementById("opponentType");
const toTeamInput = document.getElementById("toTeam");
const toAreaInput = document.getElementById("toArea");

// Add an event listener to the select element to handle changes
opponentTypeSelect.addEventListener("change", function() {
    if (opponentTypeSelect.value === "1") {
        // Show To Team input and label, and hide To Area input and label
        toTeamInput.style.display = "block";
        document.querySelector('label[for="toTeam"]').style.display = "block";
        toAreaInput.style.display = "none";
        document.querySelector('label[for="toArea"]').style.display = "none";
    } else if (opponentTypeSelect.value === "2") {
        // Show To Area input and label, and hide To Team input and label
        toTeamInput.style.display = "none";
        document.querySelector('label[for="toTeam"]').style.display = "none";
        toAreaInput.style.display = "block";
        document.querySelector('label[for="toArea"]').style.display = "block";
    }
});

// Initialize the visibility based on the initial select value
if (opponentTypeSelect.value === "1") {
    document.querySelector('label[for="toTeam"]').style.display = "block";
    toAreaInput.style.display = "none";
    document.querySelector('label[for="toArea"]').style.display = "none";
} else if (opponentTypeSelect.value === "2") {
    toTeamInput.style.display = "none";
    document.querySelector('label[for="toTeam"]').style.display = "none";
    toAreaInput.style.display = "block";
    document.querySelector('label[for="toArea"]').style.display = "block";
}
</script>
</body>
</html>