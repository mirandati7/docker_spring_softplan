package br.com.sp.softplayer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sp.softplayer.domain.Pessoa;

@Repository
public interface PessoaRepository extends GenericJpaRepository<Pessoa, Long>{
	
	@Query(" select pessoa from Pessoa pessoa " +
			   " where " +   
			   "   ( pessoa.cpf =:cpf ) ")
	Pessoa findByCPF(@Param("cpf") String cpf);
	
	
	@Query(" select bean "			
			+ " from Pessoa bean "			
			+ " where (bean.nome like %:nome% or :nome is null) " )
	Page<Pessoa> list(@Param("nome") String nome,Pageable pageable);	
	

}
