package br.com.sp.softplayer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.sp.softplayer.core.validation.BusinessValidation;
import br.com.sp.softplayer.domain.BaseEntity;
import br.com.sp.softplayer.repository.GenericJpaRepository;

@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
public abstract class GenericService <T extends BaseEntity<Long>, R extends GenericJpaRepository<T, Long>>{

	@Autowired
	protected BusinessValidation validation;
	
	protected R repository;
	
	public GenericService(R repository){
		this.repository = repository;
	}
	
	public T save(T entity){
		return repository.save(entity);
	}
	
	public void delete(Long id){
		repository.delete(repository.findOne(id));
	}
	
	public T findOne(Long id){
		return repository.findOne(id);
	}
	


}
