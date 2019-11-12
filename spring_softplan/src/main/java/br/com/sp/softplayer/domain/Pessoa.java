package br.com.sp.softplayer.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pessoa")
public class Pessoa extends IDBaseEntity {

	@Column(name = "nome", length = 100,nullable =  false)
	private String nome;
	
	
	/** Atributo Sexo grava do tipo String
	 *  abaixo segue a legenda:
	 *  
	 *       M - Masculino
     *       F - Feminino                                      
	 *  
	 */
	@Column(name = "sexo", length = 1, nullable = true)
	private String sexo="N";
	
	@Column(name = "email", length = 100,nullable =  true)
	private String email;
	
	@Column(name = "data_nascimento",  nullable = false)
	private LocalDate dataNascimento;

	@Column(name = "cpf", length = 14, nullable = false)
	private String cpf;
	
	@Column(name = "naturalidade", nullable = true, length = 100)
	private String naturalidade;
	
	@Column(name = "nacionalidade", nullable = true, length = 100)
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	
}
