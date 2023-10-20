package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.PlayerService;

/**
 * Servlet implementation class LogInPlayerServlet
 */
@WebServlet("/log_in")
public class LogInPlayerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PlayerService playerService = new PlayerService();

		long phoneNumber = Long.parseLong(request.getParameter("phoneNumber"));
		String password = request.getParameter("password");
		ResponseEntity res = new ResponseEntity();
		try {
			System.out.println("1");
			int status = PlayerService.logIn(phoneNumber, password);
			System.out.println("2");
			res.setStatus(200);
			res.setData(status);
			res.setMessage("Phone number and password checked in database");


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
