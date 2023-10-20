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

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.model.Team;
import in.fssa.sportshub.service.TeamService;

/**
 * Servlet implementation class UpdateTeamServlet
 */
@WebServlet("/team/update")
public class UpdateTeamServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		TeamService teamService = new TeamService();
		Team team = new Team();
		
		team.setTeamName(request.getParameter("teamName"));
		team.setId(Integer.parseInt(request.getParameter("id")));
		team.setUrl(request.getParameter("imageUrl"));
		team.getAddress().setArea(request.getParameter("area"));
		team.getAddress().setDistrict(request.getParameter("district"));
		team.setAbout(request.getParameter("about"));
		team.setOpenForPlayerStatus(Boolean.parseBoolean(request.getParameter("openForPlayerStatus")));
		team.setOpenForPlayerDescription(request.getParameter("openForPlayerDescription"));
		team.setModifiedBy(Integer.parseInt(request.getParameter("playerId")));
		
		PrintWriter out = response.getWriter();
		ResponseEntity res = new ResponseEntity();

		try {
			System.out.println(team.toString());
			teamService.update(team);
			res.setStatus(200);
			res.setData("");
			res.setMessage("Player updated in database");
			
		} catch (ValidationException | ServiceException e) {
			e.printStackTrace();
			
			res.setStatus(500);
			res.setData("");
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
