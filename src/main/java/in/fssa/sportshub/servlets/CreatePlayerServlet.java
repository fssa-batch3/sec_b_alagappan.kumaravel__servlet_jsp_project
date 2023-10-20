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

@WebServlet("/player/create")
public class CreatePlayerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PlayerService playerService = new PlayerService();
		
		Player player = new Player();
		player.setPhoneNumber(Long.parseLong(request.getParameter("phoneNumber")));
		
		player.setUserName(request.getParameter("userName"));
		player.setUrl(request.getParameter("imageUrl"));
		player.setPassword(request.getParameter("password"));
		player.setGender(Gender.valueOf(request.getParameter("gender").toUpperCase()));
		player.getAddress().setArea(request.getParameter("area"));
		player.getAddress().setDistrict(request.getParameter("district"));
		
		String dateString = request.getParameter("dateOfBirth");
		System.out.println(dateString);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate dateOfBirth = LocalDate.parse(dateString, formatter);
		
		player.setDateOfBirth(dateOfBirth);
		
		PrintWriter out = response.getWriter();
		ResponseEntity res = new ResponseEntity();
		System.out.println(player.toString());
		try {
			playerService.create(player);		
			int playerid = playerService.findByPhoneNumber(player.getPhoneNumber());

			res.setStatus(200);
			res.setData(playerid);
			res.setMessage("Player created in database");
			
		} catch (ValidationException | ServiceException e) {
			res.setStatus(500);
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
