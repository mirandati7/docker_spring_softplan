package br.com.sp.softplayer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sp.softplayer.core.exceptions.BusinessException;
import br.com.sp.softplayer.domain.Usuario;

@Service
public class LoginService {

	@Autowired
	private UsuarioService usuarioService;
	
	public String login(String login, String password) {
		
		String token = null;
		
		Usuario  usuario = usuarioService.autenticar(login, password);
		
		if (usuario != null){
			System.out.println(token);
			usuario.setToken(token);
		}else{
			throw new BusinessException("Usuário ou senha inválidos!");
		}
		
		return token;
		
	}
	
	public Usuario autenticar(String login, String password) {
			Usuario  usuario = usuarioService.autenticar(login, password);
		return usuario;
	}

}
