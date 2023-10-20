package in.fssa.sportshub.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import in.fssa.sportshub.exception.ServiceException;
import in.fssa.sportshub.exception.ValidationException;
import in.fssa.sportshub.model.Player;
import in.fssa.sportshub.model.ResponseEntity;
import in.fssa.sportshub.service.PlayerService;

@WebServlet("/player/detail")
public class DetailPlayerServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int playerId = Integer.parseInt(request.getParameter("player_id"));
        PlayerService playerService = new PlayerService();

        ResponseEntity res = new ResponseEntity();
        try {
            // Assuming PlayerService.findById returns a Player object
            Player player = playerService.findById(playerId);
            res.setStatus(200);
            res.setData(player);
            res.setMessage("Player found in the database");
            
            Gson gson = new Gson();
            String responseJson = gson.toJson(res);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseJson);
        } catch (ValidationException | ServiceException e) {
            res.setStatus(500);
            res.setData(null);
            res.setMessage(e.getMessage());
            e.printStackTrace();
        } 
    }
}
