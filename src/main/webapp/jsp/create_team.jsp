<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Registration</title>
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
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #ff8908d2;
        }
     #error_msg {
    text-align: center; /* Center-align the text */
    color: lightcoral; /* Set the text color to light red */
}
    </style>
    
<body>
    <form action="create" method="post">
        <h1>Create Team</h1>
        
       	<% String data = (String) request.getParameter("error"); %>
       	<% if(data != null){ %>
       	<p id="error_msg"><%= data %></p>
       	<%} %>
    
        <label for="teamName">Team name</label>
        <input type="text" id="teamName" name="teamName" value="Attacker1" required>
        
        <label for="url">Team Image URL</label>
        <input type="text" id="url" name="url" value="https://iili.io/HWEqLtp.webp" >
        
        <label for="area">Area</label>
        <input type="text" id="area" name="area" value="Aminjikarai" required>
        
        <label for="district">District</label>
        <input type="text" id="district" name="district" value="Chennai" required>
        
        <label for="about">About</label>
        <textarea id="about" name="about">This is a brief about my team.</textarea>
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>
