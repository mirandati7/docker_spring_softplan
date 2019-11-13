package br.com.sp.softplayer.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.sp.softplayer.domain.Pessoa;
import br.com.sp.softplayer.repository.PessoaRepository;

@Service
public class PessoaService extends GenericService<Pessoa, PessoaRepository> {
	
	@Autowired
	public PessoaService(PessoaRepository repository) {
		super(repository);
	}
	
	public Pessoa findByCPF(String cpf) {
		return repository.findByCPF(cpf);
	}
	
	public Page<Pessoa> list(String nome, Pageable pageable) {
		return repository.list(nome, pageable);
	}
	
	@Override
	public Pessoa save(Pessoa entity){
			
		if (entity.getId() != null) {
			entity.setDataAlteracao(LocalDateTime.now());
		}else {
			entity.setDataCadastro(LocalDateTime.now());
		}
		
		return repository.save(entity);
		
	}
	
	
	
	
}