package br.com.sp.softplayer.dto;

import java.time.LocalDateTime;

public class EntidadeDTO implements BaseDTO {

	private Long id;
	
	private LocalDateTime dataCadastro;
	
	private LocalDateTime dataAlteracao;

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}

	@Override
	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public LocalDateTime getDataAlteracao() {
		return dataAlteracao;
	}

	@Override
	public void setDataAlteracao(LocalDateTime dataAlteracao) {
		this.dataAlteracao = dataAlteracao;
	}
	
	

}
