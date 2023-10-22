<%@page import="in.fssa.sportshub.model.MatchRequestDTO"%>
<%@page import="in.fssa.sportshub.service.MatchRequestService"%>
<%@page import="java.util.HashSet"%>
<%@page import="java.util.Set"%>
<%@page import="in.fssa.sportshub.model.MatchRequest"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Response page</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
	integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="./assets/css/commonheader.css">
<style>
/* Default styles for larger screens */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
}

/* Add responsive styles for screens up to 851px wide */
@media (max-width: 851px) {
    body {
        font-size: 14px; /* Adjust font size for smaller screens */
    }
    
    table {
        width: 100%; /* Make the table full width on smaller screens */
    }
    
    th, td {
        padding: 8px; /* Adjust cell padding for better spacing on smaller screens */
    }
    
    /* Hide some table header columns on smaller screens */
    th:nth-child(4), th:nth-child(5) {
        display: none;
    }
    
    /* Center-align table cells on smaller screens */
    td {
        text-align: center;
    }
}

/* Add responsive styles for screens up to 393px wide */
@media (max-width: 393px) {
    body {
        font-size: 12px; /* Further reduce font size for very small screens */
    }
    
    /* Hide more table header columns on very small screens */
    th:nth-child(3), th:nth-child(6) {
        display: none;
    }
    
    /* Reduce cell padding even more on very small screens */
    td {
        padding: 6px;
    }
}

/* Additional CSS for table design */
table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
    background-color: #fff;
}

th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

/* Style the table header row */
th {
    background-color: #f2f2f2;
    font-weight: bold;
}

/* Style table rows alternately for better readability */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Style links for the "Accept" and "Reject" columns */
td a {
    display: inline-block;
    padding: 6px 12px;
    background-color: #ff8908d2;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

td a:hover {
    background-color: #ff6c00;
}

/* CSS for match cards */
.match-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.match-card h2 {
    margin-top: 0;
    font-size: 20px;
    color: #333;
}

.match-card p {
    margin: 0;
    color: #555;
}

.action-buttons {
    margin-top: 10px;
}

.accept-button,
.reject-button {
    display: inline-block;
    padding: 6px 12px;
    background-color: #ff8908d2;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-right: 10px;
}

.accept-button:hover,
.reject-button:hover {
    background-color: #ff6c00;
}

/* CSS for match cards */
        .match-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px; /* Increased border-radius for rounded corners */
            padding: 20px;
            margin: 10px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Increased shadow for elevation */
            transition: transform 0.2s; /* Add a subtle transform on hover for an interactive effect */
        }

        .match-card:hover {
            transform: translateY(-2px); /* Move the card slightly up on hover */
        }

        .match-card h2 {
            margin-top: 0;
            font-size: 20px;
            color: #333;
        }

        .match-card p {
            margin: 0;
            color: #555;
        }

        .action-buttons {
            margin-top: 15px;
        }

        .accept-button,
        .reject-button {
            display: inline-block;
            padding: 8px 16px;
            background-color: #ff8908d2;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            margin-right: 10px;
            font-weight: bold; /* Increased font weight for buttons */
        }

        .accept-button:hover,
        .reject-button:hover {
            background-color: #ff6c00;
        }
        
        .accept-button {
            background-color: #4CAF50; /* Green */
        }

        .reject-button {
            background-color: #ff8908d2; /* Red */
        }
    </style>
</head>
<body>
    <header class="team-response-header">
		<a href="home"> <i class="fa-solid fa-arrow-left" style="color: white;"></i>
		</a>
		<h1 style="color: white;">Match Invitation</h1>
	</header>
	
    <% Set<MatchRequestDTO> listOfMatchInvitation = (Set<MatchRequestDTO>) request.getAttribute("listOfMatchInvitation"); %>
    <% int teamCaptainRelId = (int) request.getAttribute("teamCaptainRelId"); %>

    <% for(MatchRequestDTO matchRequest : listOfMatchInvitation){ %>
        <div class="match-card">
            <p>Opponent type:   <%= matchRequest.getOpponentType() %></p>
            <p>Match time:   <%= matchRequest.getMatchTime() %></p>
            <p>Location:   <%= matchRequest.getLocation() %></p>
            <p>Information:   <%= matchRequest.getInformation() %></p>
            <div class="action-buttons">
                <a href="invitation/accept?matchId=<%= matchRequest.getId() %>&teamCaptainRelId=<%= teamCaptainRelId %>" class="accept-button">Accept</a>
                <a href="reject?matchId=<%= matchRequest.getId() %>&teamCaptainRelId=<%= teamCaptainRelId %>" class="reject-button">Reject</a>
            </div>
        </div>
    <% } %>
</body>
</html>