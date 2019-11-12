package br.com.sp.softplayer.util;

public abstract class Util {

	public Util() {}

	public static final String tratarCampoNulo(String valor, String valorPadrao) {
		return valor == null || valor.equals("null") || valor.equals("") ? valorPadrao : valor.trim();
	}

	public static final String removerFormatacao(String valor) {
		return tratarCampoNulo(valor, "").replaceAll("[^\\d]", "");
	}

	
   
}