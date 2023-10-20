package in.fssa.sportshub.servlets;

import java.io.IOException;

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
import in.fssa.sportshub.validator.PlayerValidator;

/**
 * Servlet implementation class PhoneNumberExistServlet
 */
@WebServlet("/find_number")
public class PhoneNumberExistServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PlayerValidator playerValidator = new PlayerValidator();

		long phoneNumber = Long.parseLong(request.getParameter("phoneNumber"));
		ResponseEntity res = new ResponseEntity();
		try {
			boolean status = playerValidator.phoneNumberAlreadyExist(phoneNumber);

			res.setStatus(200);
			res.setData(status);
			res.setMessage("Phone number checked in database");
			
		} catch (ValidationException | ServiceException e) {
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
