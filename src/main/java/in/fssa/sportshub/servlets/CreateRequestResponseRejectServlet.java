package in.fssa.sportshub.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.dao.RequestResponseDAO;
import in.fssa.sportshub.exception.PersistanceException;
import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.RequestResponseService;

/**
 * Servlet implementation class CreateRequestResponseRejectServlet
 */
@WebServlet("/invitation/reject")
public class CreateRequestResponseRejectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String teamCaptainRelIdStr = request.getParameter("teamCaptainRelId");
		String matchIdStr = request.getParameter("matchId");
		
		int teamCaptainRelId = 0;
		int matchId = 0;
		try {
	        teamCaptainRelId = Integer.parseInt(teamCaptainRelIdStr);
	        matchId = Integer.parseInt(matchIdStr);
	    } catch (NumberFormatException e) {
	        e.printStackTrace();
	    }
		
		RequestResponseService requestResponseServ = new RequestResponseService();
		ResponseEntity res = new ResponseEntity();

		try {
			requestResponseServ.reject(teamCaptainRelId, matchId);

			res.setStatus(200);
			res.setData("success");
			res.setMessage("Match request rejected successfully");


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
