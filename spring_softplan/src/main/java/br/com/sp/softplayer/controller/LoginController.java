package br.com.sp.softplayer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.sp.softplayer.domain.Usuario;
import br.com.sp.softplayer.dto.UsuarioDTO;
import br.com.sp.softplayer.dto.UsuarioLogadoDTO;
import br.com.sp.softplayer.service.LoginService;
import br.com.sp.softplayer.util.Criptografia;
import br.com.sp.softplayer.util.ResultadoDTO;
import io.swagger.annotations.Api;

@Api(value = "login" ,description = "Endpoint" , tags = "Login")
@RestController
@RequestMapping("/auth")
public class LoginController {

	@Autowired
	private LoginService service;
	
	@Autowired
	protected ControllerManager<UsuarioLogadoDTO, Usuario> controllerManager;
	
	
	
	@CrossOrigin
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public ResultadoDTO login(@RequestBody UsuarioDTO dto){
		System.out.println("chegou aqui");
		ResultadoDTO resultado = new ResultadoDTO();
		resultado.setMensagem(service.login(dto.getUsername(), Criptografia.criptografar(dto.getPassword())));
		return resultado;
	}
	
	
	@CrossOrigin
	@RequestMapping(value = "/autenticar", method = RequestMethod.POST)
	@ResponseBody
	public UsuarioLogadoDTO autenticar(@RequestBody UsuarioDTO dto){
		Usuario usuario = service.autenticar(dto.getUsername(), Criptografia.criptografar(dto.getPassword()));		
		return (UsuarioLogadoDTO) controllerManager.entityToDto(usuario,UsuarioLogadoDTO.class);		
	}
	
	
}
