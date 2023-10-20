package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.Player;
import in.fssa.sportshub.model.TeamDetailDTO;
import in.fssa.sportshub.model.TeamMember;
import in.fssa.sportshub.service.PlayerService;
import in.fssa.sportshub.service.TeamMemberService;
import in.fssa.sportshub.service.TeamService;

/**
 * Servlet implementation class HomePageServlet
 */

@WebServlet("/home")
public class HomePageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int playerId = Integer.parseInt(request.getParameter("player_id"));
		request.setAttribute("playerId", playerId);
		int teamId = 0;
		boolean is_captain = false;
		int teamCaptainRelationId = 0;
		TeamService teamService = new TeamService();
		TeamMemberService teamMemberServ = new TeamMemberService();
		PlayerService playerService = new PlayerService();
		try {
			Player player = playerService.findById(playerId);
			request.setAttribute("player", player);
			Set<TeamDetailDTO> teamList = teamService.getRandomTeam(player.getAddress().getId());
			request.setAttribute("teamList", teamList);
			TeamMember teamMember = teamMemberServ.findByPlayerId(playerId);
			
			teamId = teamMember.getTeamId();
			teamCaptainRelationId = teamMemberServ.findCaptainRelIdbyTeamId(teamId);
			teamMemberServ.findByCaptainId(playerId);
			is_captain = true;
			
		
			
		} catch (ValidationException | ServiceException e) {
			if(e.getMessage() == "Player not in any team") {
				teamId = -1;
			}
			if(e.getMessage() != "Player not captain of any team") {
				// alert should throw
			}

		} finally {
			request.setAttribute("teamId", teamId);
			request.setAttribute("is_captain", is_captain);
			request.setAttribute("teamCaptainRelationId", teamCaptainRelationId);
			RequestDispatcher requestDispatch = request.getRequestDispatcher("/home_page.jsp");
			requestDispatch.forward(request, response);
//			response.sendRedirect(request.getContextPath() +"/home_page.jsp");
		}
		
			
		}
}
