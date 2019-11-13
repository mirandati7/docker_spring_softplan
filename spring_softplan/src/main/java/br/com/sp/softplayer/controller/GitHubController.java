package br.com.sp.softplayer.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.sp.softplayer.util.GitHubDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "GITHUB" ,description = "Endpoint" , tags = "Retorna url repositório GITHUB ")
@RestController
@RequestMapping("/github")
public class GitHubController {

	@ApiOperation(value = "Consultar URL GITHUB.")
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public GitHubDTO getURL() {
		GitHubDTO gitHubDTO = new GitHubDTO();
		gitHubDTO.setUsuario("mirandati7");
		gitHubDTO.setUrlRepositorio("https://github.com/mirandati7/docker_spring_softplan");
		return gitHubDTO;
	}
	
	
	
}
