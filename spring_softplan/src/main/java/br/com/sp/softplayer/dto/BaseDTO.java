package br.com.sp.softplayer.dto;

import java.time.LocalDateTime;

public interface BaseDTO {

	Long getId();

	void setId(Long id);

	LocalDateTime getDataCadastro();

	void setDataCadastro(LocalDateTime dataCadastro);

	LocalDateTime getDataAlteracao();

	void setDataAlteracao(LocalDateTime dataAlteracao);

}
