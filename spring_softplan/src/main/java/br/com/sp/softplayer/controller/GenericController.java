package br.com.sp.softplayer.controller;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.sp.softplayer.domain.BaseEntity;
import br.com.sp.softplayer.dto.BaseDTO;
import br.com.sp.softplayer.service.GenericService;
import io.swagger.annotations.ApiOperation;

@SuppressWarnings("rawtypes")
public abstract class GenericController<DTO extends BaseDTO, T extends BaseEntity<Long>, S extends GenericService> {

	Class<T> _beanClass;
	Class<DTO> _dtoClass;

	protected S service;

	@Autowired
	protected ControllerManager<DTO, T> controllerManager;

	protected GenericController(S service) {
		this.service = service;
	}

	@SuppressWarnings("unchecked")
	protected Class getDtoClass() {
		if (_dtoClass == null) {
			Type genericSuperClass = getClass().getGenericSuperclass();
			if (genericSuperClass != null
					&& !(genericSuperClass instanceof Class)) {
				this._dtoClass = (Class<DTO>) ((ParameterizedType) genericSuperClass)
						.getActualTypeArguments()[0];
			}
		}
		return this._dtoClass;
	}

	@SuppressWarnings("unchecked")
	protected Class getBeanClass() {
		if (_beanClass == null) {
			Type genericSuperClass = getClass().getGenericSuperclass();
			if (genericSuperClass != null
					&& !(genericSuperClass instanceof Class)) {
				this._beanClass = (Class<T>) ((ParameterizedType) genericSuperClass)
						.getActualTypeArguments()[1];
			}
		}
		return this._beanClass;
	}

	@ApiOperation(value = "Salvar e alterar registro.")
	@CrossOrigin
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public Long save(@RequestBody DTO dto) {
		return (Long) service.save(
				controllerManager.dtoToEntity(dto, getBeanClass())).getId();
	}
	

	@ApiOperation(value = "Excluir registro por id.")
	@CrossOrigin
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void delete(@PathVariable("id") Long id) {
		service.delete(id);
	}
	
	
	@ApiOperation(value = "Consultar registro por id.")
	@SuppressWarnings("unchecked")
	@CrossOrigin
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	@ResponseBody
	public DTO findOne(@PathVariable("id") Long id) {
		return (DTO) controllerManager.entityToDto((T) service.findOne(id),
				getDtoClass());
	}
	
	
	
	
	
}