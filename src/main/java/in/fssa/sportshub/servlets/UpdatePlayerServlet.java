package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import in.fssa.sportshub.model.Gender;
import in.fssa.sportshub.model.OpponentType;
import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.Player;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.PlayerService;

/**
 * Servlet implementation class CreateUserServlet
 */

@WebServlet("/player/update")
public class UpdatePlayerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PlayerService playerService = new PlayerService();
		System.out.println("entered");
		Player player = new Player();
		
		player.setUserName(request.getParameter("userName"));
		player.setId(Integer.parseInt(request.getParameter("id")));
		player.setFirstName(request.getParameter("firstName"));
		player.setLastName(request.getParameter("lastName"));
		player.setUrl(request.getParameter("imageUrl"));
		player.setGender(Gender.valueOf(request.getParameter("gender").toUpperCase()));
		player.getAddress().setArea(request.getParameter("area"));
		player.getAddress().setDistrict(request.getParameter("district"));
		
		String dateString = request.getParameter("dateOfBirth");
		System.out.println(dateString);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate dateOfBirth = LocalDate.parse(dateString, formatter);
		
		player.setDateOfBirth(dateOfBirth);
		player.setAbout(request.getParameter("about"));
		player.setPassword(request.getParameter("password"));
		
		PrintWriter out = response.getWriter();
		ResponseEntity res = new ResponseEntity();

		try {
			System.out.println(player.toString());
			playerService.update(player);
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
