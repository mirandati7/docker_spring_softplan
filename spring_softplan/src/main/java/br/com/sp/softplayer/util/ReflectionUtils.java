package br.com.sp.softplayer.util;

import org.apache.commons.beanutils.BeanUtilsBean;

import br.com.sp.softplayer.core.exceptions.InfrastructureException;

public class ReflectionUtils {

	/**
	 * Retorna o valor de uma propriedade
	 * @param bean
	 * @param property
	 * @return
	 */
	public static Object getValue(Object bean, String property){
		try {
			return BeanUtilsBean.getInstance().getPropertyUtils().getProperty(bean, property);
		} catch (Exception e) {
			throw new InfrastructureException(e);
		}
	}
	
	/**
	 * Seta um valor de uma propriedade
	 * @param bean
	 * @param property
	 * @param value
	 */
	public static void setValue(Object bean, String property, Object value){
		try {
			BeanUtilsBean.getInstance().getPropertyUtils().setProperty(bean, property, value);
		} catch (Exception e) {
			throw new InfrastructureException(e);
		}
	}
	
}
