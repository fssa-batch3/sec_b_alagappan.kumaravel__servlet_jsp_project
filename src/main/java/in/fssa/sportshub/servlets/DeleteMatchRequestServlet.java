package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.MatchRequestService;

/**
 * Servlet implementation class DeleteMatchRequestServlet
 */
@WebServlet("/match_request/delete")
public class DeleteMatchRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("entered");
		int playerId = Integer.parseInt(request.getParameter("playerId"));
		
		int matchId = Integer.parseInt(request.getParameter("matchId"));
		
		MatchRequestService matchRequestServ = new MatchRequestService();
		PrintWriter out = response.getWriter();
		try {		
			matchRequestServ.delete(matchId, playerId);
			ResponseEntity res = new ResponseEntity();
			res.setStatus(200);
			res.setData("success");
			res.setMessage("successfully deleted");
			Gson gson = new Gson();
			String responseJson = gson.toJson(res);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(responseJson);
			
		} catch (ValidationException | ServiceException e) {
			String errorMessage = e.getMessage();
			response.setStatus(500);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(errorMessage);
		}
	}

}
