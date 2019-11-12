package br.com.sp.softplayer.core.enums;

public enum TipoResposta {
	
	SIM("S"),NAO("N");
	
	private String valor;

	private TipoResposta(String valor){
		this.valor = valor;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}
	
}
