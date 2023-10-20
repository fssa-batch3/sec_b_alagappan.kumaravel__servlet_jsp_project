package in.fssa.sportshub.model;

public class ResponseEntity {
int status;
Object data;
String message;
public int getStatus() {
	return status;
}
public void setStatus(int statusCode) {
	this.status = statusCode;
}
public Object getData() {
	return data;
}
public void setData(Object data) {
	this.data = data;
}
public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}

}
