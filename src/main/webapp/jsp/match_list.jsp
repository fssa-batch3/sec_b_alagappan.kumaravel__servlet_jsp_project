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
<title>Insert title here</title>
</head>
<body>
	<h1>List of Match Request</h1>
	<%
	MatchRequestService matchRequsetService = new MatchRequestService();
	%>
	<%	Set<MatchRequest> listOfMatch = matchRequsetService.listAllOpenRequest();
	 %>
	<table border="1">
		<tr>
			<th>opponent type</th>
			<th>Match time</th>
			<th>Location</th>
		</tr>
		<% for(MatchRequest matchRequest : listOfMatch){ %>
		<tr>
			<td><%= matchRequest.getOpponentType() %></td>
			<td><%= matchRequest.getMatchTime() %> </td>
			<td><%= matchRequest.getLocation() %></td>
		</tr>
		<%} %>
	
	</table>
</body>
</html>