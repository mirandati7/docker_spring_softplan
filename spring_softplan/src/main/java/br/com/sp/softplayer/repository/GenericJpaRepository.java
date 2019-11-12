package br.com.sp.softplayer.repository;

import org.hibernate.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import br.com.sp.softplayer.domain.BaseEntity;

@NoRepositoryBean
public interface GenericJpaRepository<T extends BaseEntity<ID>, ID extends Long>
		extends JpaRepository<T, ID> {
	
	Session getSession();
}