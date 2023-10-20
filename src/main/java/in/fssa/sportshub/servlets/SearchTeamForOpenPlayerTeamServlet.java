package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.model.TeamDetailDTO;
import in.fssa.sportshub.service.TeamService;

/**
 * Servlet implementation class ListOfOpenPlayerTeamServlet
 */
@WebServlet("/team/search_open_for_player")
public class SearchTeamForOpenPlayerTeamServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		TeamService teamService = new TeamService();
		
		ResponseEntity res = new ResponseEntity();

		 int lastTeamId = Integer.parseInt(request.getParameter("last_team_id"));
	     String input = request.getParameter("search");

		try {
			List<TeamDetailDTO> listOfMatchInvitation = teamService.SearchTeamForPlayerTeamListByString(input, lastTeamId);
			System.out.println(listOfMatchInvitation.size());
			res.setStatus(200);
			res.setData(listOfMatchInvitation);
			res.setMessage("List of open team get from database");

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
