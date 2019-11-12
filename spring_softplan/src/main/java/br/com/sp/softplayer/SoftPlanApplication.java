package br.com.sp.softplayer;

import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
public class SoftPlanApplication extends BaseApplication {

	@SuppressWarnings("deprecation")
	@Bean 
	public HibernateJpaSessionFactoryBean sessionFactory() {
		return new HibernateJpaSessionFactoryBean();
	}

	public static void main(String[] args) {
		SpringApplication.run(SoftPlanApplication.class, args);
	}

}
