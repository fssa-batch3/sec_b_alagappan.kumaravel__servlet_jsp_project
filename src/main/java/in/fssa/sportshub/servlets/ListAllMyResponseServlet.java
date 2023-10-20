package in.fssa.sportshub.servlets;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.MatchRequest;
import in.fssa.sportshub.model.MatchRequestDTO;
import in.fssa.sportshub.service.MatchRequestService;

/**
 * Servlet implementation class ListAllMyResponseServlet
 */
@WebServlet("/response")
public class ListAllMyResponseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int teamId = Integer.parseInt(request.getParameter("teamCaptainRelId"));
		boolean captainStatus = Boolean.parseBoolean(request.getParameter("captainStatus"));
		
		MatchRequestService matchRequestServ = new MatchRequestService();
		
		try {
			List<MatchRequestDTO> listOfMyMatch = matchRequestServ.listOfMyMatchInvitation(teamId);
			request.setAttribute("listOfMyMatch", listOfMyMatch);
			request.setAttribute("captainStatus", captainStatus);
			RequestDispatcher requestDispatch = request.getRequestDispatcher("/response_page.jsp");
			requestDispatch.forward(request, response);
		} catch (ServiceException | ValidationException e) {
			e.printStackTrace();
		}
	}

}
