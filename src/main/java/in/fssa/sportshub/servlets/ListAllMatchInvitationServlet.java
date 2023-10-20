package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.util.List;
import java.util.Set;

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
import in.fssa.sportshub.model.MatchRequestDTO;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.model.Team;
import in.fssa.sportshub.service.MatchRequestService;
import in.fssa.sportshub.service.TeamService;

/**
 * Servlet implementation class ListAllMatchInvitationServlet
 */
@WebServlet("/invitation")
public class ListAllMatchInvitationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int teamId = Integer.parseInt(request.getParameter("teamId"));
		String teamCaptainRelIdStr = request.getParameter("teamCaptainRelId");
		
		int teamCaptainRelId = 0;
		try {
	        teamCaptainRelId = Integer.parseInt(teamCaptainRelIdStr);
	    } catch (NumberFormatException e) {
	        e.printStackTrace();
	    }
		
		TeamService teamService = new TeamService();
		
		MatchRequestService matchRequestServ = new MatchRequestService();
		ResponseEntity res = new ResponseEntity();

		try {
			Team team = teamService.findById(teamId);
			List<MatchRequestDTO> listOfMatchInvitation = matchRequestServ.getAllMyMatchRequest(teamCaptainRelId, teamId, team.getAddress().getId());
			System.out.println(listOfMatchInvitation.size());
			res.setStatus(200);
			res.setData(listOfMatchInvitation);
			res.setMessage("List of match invitation get from database");

		} catch (ValidationException e) {
			res.setStatus(500);
			res.setData(-1);
			res.setMessage(e.getMessage());

			e.printStackTrace();
		}catch(ServiceException e){
			System.out.println("3");
			res.setStatus(500);
			res.setData(0);
			res.setMessage(e.getMessage());
		}finally {
		
			Gson gson = new Gson();
			String responseJson = gson.toJson(res);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(responseJson);

		}
	}
}
