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
import in.fssa.sportshub.service.TeamMemberService;

/**
 * Servlet implementation class CreateRejectPlayerRequestServlet
 */
@WebServlet("/team/request_reject")
public class CreateRejectPlayerRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TeamMemberService teamMemberService = new TeamMemberService();
		
		int requestId = Integer.parseInt(request.getParameter("requestId"));
		int captainId = Integer.parseInt(request.getParameter("captainId"));
		
		PrintWriter out = response.getWriter();
		ResponseEntity res = new ResponseEntity();
		try {		
			teamMemberService.rejectRequest(requestId, captainId);

			res.setStatus(200);
			res.setData("success");
			res.setMessage("Match request rejected in database");
			
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
