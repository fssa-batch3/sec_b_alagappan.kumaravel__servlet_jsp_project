package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.Gender;
import in.fssa.sportshub.model.Player;
import in.fssa.sportshub.model.Team;
import in.fssa.sportshub.service.PlayerService;
import in.fssa.sportshub.service.TeamService;

/**
 * Servlet implementation class CreateTeamServlet
 */
@WebServlet("/team/create")
public class CreateTeamServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TeamService teamService = new TeamService();
		PrintWriter out = response.getWriter();

		Team team = new Team();
		
		int playerId = Integer.parseInt(request.getParameter("playerId"));
			
		team.setTeamName(request.getParameter("teamName"));
		team.setUrl(request.getParameter("url"));
		team.getAddress().setArea(request.getParameter("area"));
		team.getAddress().setDistrict(request.getParameter("district"));
		team.setAbout(request.getParameter("about"));
		team.setOpenForPlayerDescription(request.getParameter("teamPlayerDescription"));
		team.setCreatedBy(playerId);
		team.setModifiedBy(playerId);
	
		try {
			teamService.create(team);

			response.sendRedirect(request.getContextPath()+"/home?player_id="+playerId);
		} catch (ValidationException | ServiceException e) {
			String errorMessage = "?error=" + e.getMessage();
		    request.setAttribute("team-new", team);
		    
			request.getRequestDispatcher("/team/new" + errorMessage).forward(request, response);
		
		   // response.sendRedirect(request.getContextPath() + "/team/new" + errorMessage);
		    e.printStackTrace();
		}
	}

}
