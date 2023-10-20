package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.MatchRequest;
import in.fssa.sportshub.model.OpponentType;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.MatchRequestService;

/**
 * Servlet implementation class CreateMatchRequest
 */

@WebServlet("/match_request/create")
public class CreateMatchRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@SuppressWarnings("deprecation")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int playerId = Integer.parseInt(request.getParameter("teamCaptainId"));
		
		int teamCaptainRelId = Integer.parseInt(request.getParameter("myTeamRelId"));

		PrintWriter out = response.getWriter();
		
		MatchRequest matchRequest = new MatchRequest();
		matchRequest.setOpponentType(request.getParameter("opponentType").equals("1")? OpponentType.TO_TEAM : OpponentType.TO_AREA);//
		matchRequest.setToTeam(Integer.parseInt(request.getParameter("toTeam")));
		matchRequest.setAddressId(Integer.parseInt(request.getParameter("toArea")));
		matchRequest.setTypeOfMatch(Integer.parseInt(request.getParameter("typeOfMatch")));//
		matchRequest.setMembers(Integer.parseInt(request.getParameter("members")));//
		matchRequest.setMembersAgeFrom(Integer.parseInt(request.getParameter("membersAgeFrom")));//
		matchRequest.setMembersAgeTo(Integer.parseInt(request.getParameter("membersAgeTo")));//
		
        String matchTimeAsString = request.getParameter("matchTime"); // Get this value from your HTML input
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        LocalDateTime matchTime = LocalDateTime.parse(matchTimeAsString, formatter);
        
		matchRequest.setMatchTime(matchTime);
		matchRequest.setLocation(request.getParameter("location"));//
		matchRequest.setInformation(request.getParameter("information"));//
		
		matchRequest.setCreatedBy(teamCaptainRelId);
		
		ResponseEntity res = new ResponseEntity();
		
		MatchRequestService matchRequestServ = new MatchRequestService();
		try {
			matchRequestServ.create(matchRequest, playerId);
			res.setStatus(200);
		    res.setData(0);
		    res.setMessage("success");
		} catch (ValidationException | ServiceException e) {
			System.out.println("bug");
		    res.setStatus(400);
		    res.setData(0);
		    res.setMessage(e.getMessage());
		    e.printStackTrace();
		}finally {
			Gson gson = new Gson();
			String responseJson = gson.toJson(res);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(responseJson);
		}	
	}

}
