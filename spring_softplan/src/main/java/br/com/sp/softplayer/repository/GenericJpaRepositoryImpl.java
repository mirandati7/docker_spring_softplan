package br.com.sp.softplayer.repository;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import br.com.sp.softplayer.domain.BaseEntity;

public class GenericJpaRepositoryImpl<T extends BaseEntity<ID>, ID extends Long> extends SimpleJpaRepository<T, ID>
		implements GenericJpaRepository<T, ID> {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public GenericJpaRepositoryImpl(Class<T> domainClass, EntityManager em) {
		super(domainClass, em);
	}

	public GenericJpaRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
	}

	public Session getSession(){
		return sessionFactory.getCurrentSession();
	}
}
