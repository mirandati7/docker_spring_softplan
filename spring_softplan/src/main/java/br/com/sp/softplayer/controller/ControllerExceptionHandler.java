package br.com.sp.softplayer.controller;

import java.sql.BatchUpdateException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.sp.softplayer.core.exceptions.BusinessException;

@ControllerAdvice
public class ControllerExceptionHandler {
	
	private boolean isDeleteError(String errorMessage) {
		return (errorMessage.contains("atualização ou exclusão em tabela") && errorMessage.contains("viola restrição de chave estrangeira"));
	}
    
	
	@ExceptionHandler(BusinessException.class)
	@ResponseBody
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public BusinessErrorMessage handleBusinessException(BusinessException e) {
		BusinessErrorMessage df = new BusinessErrorMessage("BUSINESS_ERROR", e);
		return df;
    }

	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseBody
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public Object handleBusinessException(DataIntegrityViolationException e) {
		
		if (e.getCause() instanceof ConstraintViolationException && 
				(e.getCause().getCause() instanceof BatchUpdateException || 
				isDeleteError(((ConstraintViolationException)e.getCause()).getSQLException().getMessage()))) {
			BusinessException be = new BusinessException("Não foi possível realizar a operação! O registro possui relacionamento com outros cadastros!");
			be.setErrorType(BusinessException.INFO);
			
			BusinessErrorMessage df = new BusinessErrorMessage("BUSINESS_ERROR", be);
			return df;
		} else {
			throw e;
		}
		
	}
}

class BusinessErrorMessage {
	
	private String status;
	private BusinessException businessException;
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public BusinessException getBusinessException() {
		return businessException;
	}
	
	public void setBusinessException(BusinessException businessException) {
		this.businessException = businessException;
	}
	
	public BusinessErrorMessage(String status, BusinessException businessException) {
		super();
		this.status = status;
		this.businessException = businessException;
	}
}