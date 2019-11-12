package br.com.sp.softplayer.core.validation;

import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import br.com.sp.softplayer.core.exceptions.BusinessException;
import br.com.sp.softplayer.util.ReflectionUtils;


@Component
@PropertySource("classpath:core-messages.properties")
public class BusinessValidation {

	@Autowired
	private Environment env;

	public String getMessage(String key) {
		return env.getProperty(key);
	}

	/**
	 * Validações diversas para um período
	 * 
	 * @param start
	 * @param end
	 */
	// TODO melhorar passando parâmetro para informar o nome do período
	public void dateTimeRange(LocalDateTime start, LocalDateTime end, boolean required) {
		throwIf(required && (Objects.isNull(start) || Objects.isNull(end)), CoreMessagesResource.DATE_TIME_RANGE_INVALID);
		startIsAfterEnd(start, end, "inicial", "final");
	}
	
	/**
	 * Valida data inicial maior que a data final
	 * @param start
	 * @param end
	 * @param labelStart
	 * @param labelEnd
	 */
	public void startIsAfterEnd(LocalDateTime start, LocalDateTime end, String labelStart, String labelEnd){
		throwIf(start != null && end != null && start.isAfter(end), CoreMessagesResource.DATE_START_IS_AFTER_END, labelStart, labelEnd);
	}

	/**
	 * Valida uma propriedade
	 * 
	 * @param baseEntity
	 * @param property
	 * @param propertyDescription
	 *            - Descrição/Label da propriedade
	 */
	public void required(Object bean, String property, String propertyDescription) {
		Object value = ReflectionUtils.getValue(bean, property);
		throwIf(Objects.isNull(value), CoreMessagesResource.REQUIRED, propertyDescription);
	}
	
	/**
	 * Valida tipo Padrão
	 * 
	 * @param baseEntity
	 * @param property
	 * @param propertyDescription
	 *            - Descrição/Label da propriedade
	 */
	public void padrao(Object bean) {		
		throwIf(Objects.isNull(bean), CoreMessagesResource.PADRAO);
	}
	
	public void notPadrao(Object bean) {		
		throwIf(Objects.isNull(bean), CoreMessagesResource.NOT_PADRAO);
	}
	

	/**
	 * Realiza um BusinessException de acordo com a validação
	 * 
	 * @param isNotValid
	 * @param message
	 */
	public void throwIf(boolean isNotValid, String propertyOrMessage, Object... messageParts) {
		if (isNotValid) {
			String _message = env.getProperty(propertyOrMessage);
			if (_message == null) {
				_message = propertyOrMessage;
			} else {
				_message = String.format(_message, messageParts);
			}
			throw new BusinessException(_message);
		}
	}

	/**
	 * Seta um valor para uma propriedade caso ela seja null
	 * 
	 * @param bean
	 * @param property
	 * @param value
	 */
	public void setIfNull(Object bean, String property, Object value) {
		if (Objects.isNull(ReflectionUtils.getValue(bean, property))){
			ReflectionUtils.setValue(bean, property, value);				
		}
	}
}
