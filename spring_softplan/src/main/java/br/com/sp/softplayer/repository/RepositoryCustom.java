package br.com.sp.softplayer.repository;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;

import br.com.sp.softplayer.domain.BaseEntity;

public interface RepositoryCustom<T extends BaseEntity<?>> {

	Session getSession();

	Criteria createCriteria(Class<T> entityClass);

	SQLQuery getSQLQuery(StringBuilder sql);

	Query getQuery(StringBuilder jpql);

}
