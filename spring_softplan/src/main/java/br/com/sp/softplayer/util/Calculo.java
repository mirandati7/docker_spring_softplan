package br.com.sp.softplayer.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public class Calculo {

	public static final BigDecimal valorZero = new BigDecimal(0.00);
	public static final BigDecimal percentual100PorCento = new BigDecimal(100);
	public static final int casasDecimais = 2;

	public static String retirarPontosBigDecimal(BigDecimal valorFormatar) {
		
		String valorFormatarAux = String.valueOf(valorFormatar);
		valorFormatarAux = valorFormatarAux.replace(".", "");
		return valorFormatarAux;
		
	}

	public static BigDecimal arredondar(BigDecimal valorFormatar, int quantidadeCasas) {
		
		if (valorFormatar == null) {
			valorFormatar =  new BigDecimal(0.00);	
		}
		
		
		valorFormatar.setScale(quantidadeCasas, RoundingMode.HALF_EVEN);
		return valorFormatar;
	}


	public static String formatarDuasCasasDecimaisSemVirgula(BigDecimal valorFormatar) {
		valorFormatar = arredondar(valorFormatar, casasDecimais);

		DecimalFormat decFormat = new DecimalFormat("#,###,##0.00");
		String valorFormatarAux = decFormat.format(valorFormatar);
		valorFormatarAux = valorFormatarAux.replace(",", "");
		valorFormatarAux = Calculo.retirarPontosBigDecimal(new BigDecimal(valorFormatarAux));
		return valorFormatarAux;
	}

	public static BigDecimal somar(BigDecimal valor1, BigDecimal valor2) {
		
		if(valor1 == null) {
			valor1 = new BigDecimal(0.0000);
		}
		if(valor2 == null) {
			valor2 = new BigDecimal(0.0000);
		}
		valor1 = valor1.add(valor2, MathContext.DECIMAL128).setScale(2, RoundingMode.HALF_EVEN);
		return valor1;
	}

	public static BigDecimal subtrair(BigDecimal valor1, BigDecimal valor2) {
		valor1 = valor1.subtract(valor2, MathContext.DECIMAL128).setScale(2, RoundingMode.HALF_EVEN);
		return valor1;
	}

	public static BigDecimal dividir(BigDecimal valor1, BigDecimal valor2) {

		if ((valor1.compareTo(valorZero) > 0) && (valor2.compareTo(valorZero) > 0)) {
			valor1 = valor1.setScale(casasDecimais, RoundingMode.HALF_EVEN);
			valor1 = valor1.divide(valor2, MathContext.DECIMAL128).setScale(casasDecimais, RoundingMode.HALF_EVEN);
		}

		return valor1;
	}

	public static BigDecimal multiplicar (BigDecimal valor1, BigDecimal valor2) {

		if ((valor1.compareTo(valorZero) > 0) && (valor2.compareTo(valorZero) > 0)) {
			valor1 = valor1.setScale(casasDecimais, RoundingMode.HALF_EVEN);
			valor1 = valor1.multiply(valor2, MathContext.DECIMAL128).setScale(casasDecimais, RoundingMode.HALF_EVEN);
		}

		return valor1;
	}
	

	
	
	
	
	
	

}