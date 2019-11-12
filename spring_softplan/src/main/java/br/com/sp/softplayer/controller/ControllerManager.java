package br.com.sp.softplayer.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtilsBean2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import br.com.sp.softplayer.core.exceptions.InfrastructureException;
import br.com.sp.softplayer.core.pagination.PageResult;
import br.com.sp.softplayer.core.pagination.SearchParams;
import br.com.sp.softplayer.domain.BaseEntity;
import br.com.sp.softplayer.dto.BaseDTO;

@Component
public class ControllerManager<DTO extends BaseDTO, T extends BaseEntity<Long>> {

	private ModelMapper modelMapper = new ModelMapper();

	/**
	 * Converte um DTO em entity
	 * 
	 * @param dto
	 * @return
	 */
	public T dtoToEntity(DTO dto, Class<T> beanClass) {
		return (T) modelMapper.map(dto, beanClass);
	}

	/**
	 * Converte uma entity em um DTO
	 * 
	 * @param entity
	 * @return
	 */
	public DTO entityToDto(T entity, Class<DTO> dtoClass) {
		try {
			return (DTO) modelMapper.map(entity, dtoClass);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * Prepara um PageRequest
	 * 
	 * @param searchParams
	 * @return
	 */
	public PageRequest toPageRequest(SearchParams searchParams) {

		Sort sort = null;

		return new PageRequest(searchParams.getPage(), searchParams.getSize(),
				sort);
	}

	public PageResult<DTO> toPageResult(Page<T> pageImpl, Class<DTO> dtoClass) {
		return toPageResult(pageImpl, dtoClass, null);
	}
	
	/**
	 * Converte um pageImpl em um PageResult
	 * 
	 * @param pageImpl
	 * @return
	 */
	public PageResult<DTO> toPageResult(Page<T> pageImpl, Class<DTO> dtoClass, String propertyToIgnore) {

		PageResult<DTO> result = new PageResult<DTO>();
		result.setContent(new ArrayList<DTO>());
		result.setSize(pageImpl.getSize());
		result.setTotalElements(pageImpl.getTotalElements());
		result.setTotalPages(pageImpl.getTotalPages());
		
		for (T entity : pageImpl.getContent()) {
			if (propertyToIgnore != null ){
				try {
					BeanUtilsBean2.getInstance().getPropertyUtils().setProperty(entity, propertyToIgnore, null);
				} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
					throw new InfrastructureException(e);
				}
			}
			result.getContent().add(entityToDto(entity, dtoClass));
		}

		return result;
	}

	/**
	 * Converte um pageImpl em um PageResult
	 * 
	 * @param entityList
	 * @return
	 */
	public List<DTO> toPageResult(List<T> entityList, Class<DTO> dtoClass) {

		List<DTO> result = new ArrayList<DTO>();
		for (T entity : entityList) {
			result.add(entityToDto(entity, dtoClass));
		}

		return result;
	}
	
	@SuppressWarnings("unchecked")
	public PageResult<DTO> toPageResultCTA(Page<T> pageImpl, Class<DTO> dtoClass) {

		PageResult<DTO> result = new PageResult<DTO>();
		result.setContent(new ArrayList<DTO>());
		result.setSize(pageImpl.getSize());
		result.setTotalElements(pageImpl.getTotalElements());
		result.setTotalPages(pageImpl.getTotalPages());
		
		for (T entity : pageImpl.getContent()) {			
			result.getContent().add((DTO) entity);
		}

		return result;
	}
	
	
	
	
	
	
}