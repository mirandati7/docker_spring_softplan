package br.com.sp.softplayer.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sp.softplayer.domain.Usuario;

@Repository
public interface UsuarioRepository extends GenericJpaRepository<Usuario, Long>{
	
	
	@Query("select bean from Usuario bean " +			   
			   " where (bean.username = :username and bean.password = :password) ")
    Usuario autenticar (@Param("username") String username,
		   			    @Param("password") String password);
	
	
	@Query("select bean from Usuario bean " +			   
			   " where bean.username = :username  ")
    Usuario findByLogin(@Param("username") String username);

}