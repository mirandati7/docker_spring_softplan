package br.com.sp.softplayer.service;

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
		
//		Pessoa pessoa = findByCPF(entity.getCpf());
//		
//		if (pessoa != null) {
//			return repository.save(entity);	
//		}
//		
//		
		
		return repository.save(entity);
	}
	
	
	
	
}