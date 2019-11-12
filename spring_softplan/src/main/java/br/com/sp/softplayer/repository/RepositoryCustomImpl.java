package br.com.sp.softplayer.repository;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import br.com.sp.softplayer.domain.BaseEntity;

public abstract class RepositoryCustomImpl<T extends BaseEntity<?>> implements RepositoryCustom<T> {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public Criteria createCriteria(Class<T> entityClass) {
		return getSession().createCriteria(entityClass);
	}

	@Override
	public SQLQuery getSQLQuery(StringBuilder sql) {
		return getSession().createSQLQuery(sql.toString());
	}

	@Override
	public Query getQuery(StringBuilder jpql) {
		return getSession().createQuery(jpql.toString());
	}

}
