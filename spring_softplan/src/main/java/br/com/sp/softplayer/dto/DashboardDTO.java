package br.com.sp.softplayer.dto;

import java.math.BigDecimal;

public class DashboardDTO extends EntidadeDTO {

	private Long numeroVagas;

	private Long numeroVagasAlocadas;

	private Long numeroVagasDisponiveis;

	private BigDecimal valorRecebido;

	public DashboardDTO() {

	}

	public DashboardDTO(Long numeroVagas, Long numeroVagasAlocadas, Long numeroVagasDisponiveis,
			BigDecimal valorRecebido) {
		super();
		this.numeroVagas = numeroVagas;
		this.numeroVagasAlocadas = numeroVagasAlocadas;
		this.numeroVagasDisponiveis = numeroVagasDisponiveis;
		this.valorRecebido = valorRecebido;
	}

	public Long getNumeroVagas() {
		return numeroVagas;
	}

	public void setNumeroVagas(Long numeroVagas) {
		this.numeroVagas = numeroVagas;
	}

	public Long getNumeroVagasAlocadas() {
		return numeroVagasAlocadas;
	}

	public void setNumeroVagasAlocadas(Long numeroVagasAlocadas) {
		this.numeroVagasAlocadas = numeroVagasAlocadas;
	}

	public Long getNumeroVagasDisponiveis() {
		return numeroVagasDisponiveis;
	}

	public void setNumeroVagasDisponiveis(Long numeroVagasDisponiveis) {
		this.numeroVagasDisponiveis = numeroVagasDisponiveis;
	}

	public BigDecimal getValorRecebido() {
		return valorRecebido;
	}

	public void setValorRecebido(BigDecimal valorRecebido) {
		this.valorRecebido = valorRecebido;
	}

}