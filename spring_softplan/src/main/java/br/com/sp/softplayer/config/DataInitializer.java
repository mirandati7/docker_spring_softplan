package br.com.sp.softplayer.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import br.com.sp.softplayer.domain.Usuario;
import br.com.sp.softplayer.repository.UsuarioRepository;
import br.com.sp.softplayer.util.Criptografia;

@Component
public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
		
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		List<Usuario> usuarios = usuarioRepository.findAll();
		if (usuarios.isEmpty()) {
			this.adicionaUsuario("softplayer", "password");
		}
		
	}
	
	public void adicionaUsuario(String username,String password) {
		password = Criptografia.criptografar(password);
		Usuario usuario = new Usuario(username, password);
		usuarioRepository.save(usuario);
	}
	

}
