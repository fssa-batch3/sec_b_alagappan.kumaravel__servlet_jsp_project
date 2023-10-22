<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Player Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        form {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }

        label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            transition: border-color 0.3s;
        }

        input:focus, textarea:focus {
            border-color: #007bff;
            outline: none;
        }

        textarea {
            resize: vertical;
        }

        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 3px;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <form action="update" method="post">
        <h1>Update Player</h1>    
        
        <label for="userName">User name</label>
        <input type="text" id="userName" name="userName" value="exampleuser">
        
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value="John">
        
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value="Doe">
        
        <label for="url">Image URL</label>
        <input type="text" id="url" name="url" value="https://example.com/image.jpg">
        
        <label for="password">Password</label>
        <input type="password" id="password" name="password" value="Aa!1aaaa">
        
        <label for="gender">Gender</label>
        <input type="number" id="gender" name="gender" value="1">
        
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value="1990-01-01">
        
        <label for="area">Area</label>
        <input type="text" id="area" name="area" value="Aminjikarai">
        
        <label for="district">District</label>
        <input type="text" id="district" name="district" value="Chennai">
        
        <label for="about">About</label>
        <textarea id="about" name="about">This is a brief about me.</textarea>
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>
