package br.com.sp.softplayer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.sp.softplayer.core.pagination.PageResult;
import br.com.sp.softplayer.core.pagination.SearchParams;
import br.com.sp.softplayer.domain.Pessoa;
import br.com.sp.softplayer.dto.PessoaDTO;
import br.com.sp.softplayer.service.PessoaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "Pessoa" ,description = "Endpoint" , tags = "Pessoas")
@RestController
@RequestMapping("/api/pessoas")
public class PessoaController extends GenericController<PessoaDTO, Pessoa, PessoaService> {
	

	@Autowired
	protected PessoaController(PessoaService service) {
		super(service);
	}

	@ApiOperation(value = "Lista todos registros de pessoas com paginação")
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	@ResponseBody
	public PageResult<PessoaDTO> list(@RequestBody SearchParams search) {
		PageRequest pageRequest = controllerManager.toPageRequest(search);

		Page<Pessoa> page = service.list(search.get("nome"), 
											  pageRequest);
		return controllerManager.toPageResult(page, getDtoClass());

	}
	
	

}