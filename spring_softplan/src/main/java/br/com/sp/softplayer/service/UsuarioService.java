package br.com.sp.softplayer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sp.softplayer.domain.Usuario;
import br.com.sp.softplayer.repository.UsuarioRepository;
import br.com.sp.softplayer.util.Criptografia;

@Service
public class UsuarioService extends GenericService<Usuario, UsuarioRepository> {

	@Autowired
	public UsuarioService(UsuarioRepository repository) {
		super(repository);
	}

	@Override
	public Usuario save(Usuario entity) {

		if (entity.getId() == null) {
			entity.setPassword(Criptografia.criptografar(entity.getPassword()));
		}else {
			Usuario usuarioCadastrado   = repository.findOne(entity.getId());
			if(!usuarioCadastrado.getPassword().equals(entity.getPassword())) {
				entity.setPassword(Criptografia.criptografar(entity.getPassword()));
			}
		}

		Usuario usuario = super.save(entity);
		
		return usuario;
	}

	public Usuario autenticar(String login, String senha) {
		return repository.autenticar(login, senha);
	}
	
	public Usuario findByLogin(String login){
		return repository.findByLogin(login);
	}
	
	public Usuario findOne(Long idPessoa){
		return  repository.findOne(idPessoa);
	}
	
	public String adicionarNovoUsuario(String username, String password) {

		try {
			
			Usuario usuario = new Usuario();
			usuario.setUsername(username);
			usuario.setPassword(Criptografia.criptografar(password));
			repository.save(usuario);
			
		} catch (Exception e) {
			e.printStackTrace();

		}
		return "Inserido com Sucesso : " + username;
	}

}
