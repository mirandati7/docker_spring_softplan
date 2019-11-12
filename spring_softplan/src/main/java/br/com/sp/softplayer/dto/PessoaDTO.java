package br.com.sp.softplayer.dto;

import java.time.LocalDate;

public class PessoaDTO extends EntidadeDTO {
	
	private String nome;
	
	
	/** Atributo Sexo grava do tipo String
	 *  abaixo segue a legenda:
	 *  
	 *       M - Masculino
     *       F - Feminino                                      
	 *  
	 */
	private String sexo="N";
	
	private String email;

	private LocalDate dataNascimento;

	private String cpf;
	
	private String naturalidade;
	
	private String nacionalidade;
	
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getNaturalidade() {
		return naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}