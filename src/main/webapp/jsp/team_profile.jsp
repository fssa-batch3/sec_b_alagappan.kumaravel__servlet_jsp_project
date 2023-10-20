<%@page import="in.fssa.sportshub.model.Team"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .team-profile {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        }
        h1 {
            margin-top: 0;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            margin-bottom: 5px;
        }
        .button-container {
            margin-top: 20px;
        }
        .button {
            padding: 8px 16px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .button.edit {
            background-color: #f39c12;
            margin-right: 10px;
        }
        .button.delete {
            background-color: #e74c3c;
        }
    </style>
</head>
<body>
<% Team team = (Team) request.getAttribute("team"); %>

    <div class="team-profile">
        <h1>Team Profile</h1>
        
        <div>
            <h2>Team Image</h2>
            <img src="<%=team.getUrl()%>" alt="Team Image">
        </div>
        
        <div>
            <h2>Team Name</h2>
            <p><%=team.getTeamName() %></p>
        </div>
        
        <div>
            <h2>Team Members</h2>
            <ul>
                <li>not updated now</li>
                <!-- Add more members as needed -->
            </ul>
        </div>
        
        <div>
            <h2>About</h2>
            <p><%=team.getAbout() %></p>
        </div>
        
        <div>
            <h2>Area District</h2>
            <p><%=team.getAddress().getArea() %> / <%=team.getAddress().getDistrict() %></p>
        </div>
        
        <div>
            <h2>Created At</h2>
            <p><%=team.getCreatedAt() %></p>
        </div>
        
        <div class="button-container">
			<a href="edit"><button class="button edit" type="submit" value="Submit">Edit</button></a>
			<a href="delete"><button class="button delete" type="submit" value="Submit">Delete</button></a>
        </div>
    </div>
</body>
</html>
