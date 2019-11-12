package br.com.sp.softplayer.core.exceptions;

import java.util.HashMap;
import java.util.List;

public class BusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private HashMap<String, String> valueObject;
	
	public static final String INFO = "info";
	public static final String ERROR = "error";
	
	public BusinessException() {
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, String errorType) {
		this(message);
		getValueObject().put(getNameException(), errorType);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}
	
	@SuppressWarnings("rawtypes")
	public BusinessException(Class clazz, String message) {
		super(clazz.getName() + " : " + message);
	}
	
	public BusinessException(List<String> messages) {
		super(getMessages(messages));
	}
	
	public static String getMessages(List<String> messages) {
		String msg = "";
		for (String message : messages){
			msg += message + "\n";
		}
		return msg;
	}
	
	public String getNameException(){
		return BusinessException.class.getSimpleName();
	}
	
	public HashMap<String, String> getValueObject() {
		if (valueObject == null){
			valueObject = new HashMap<String, String>();
		}
		return valueObject;
	}

	public void setValueObject(HashMap<String, String> valueObject) {
		this.valueObject = valueObject;
	}
	
	public void setErrorType(String errorType){
		getValueObject().put(getNameException(), errorType);
	}
	
	public void setMessageKey(String messageKey){
		getValueObject().put("messageKey", messageKey);
	}
}