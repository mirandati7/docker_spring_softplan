package br.com.sp.softplayer.domain;

import java.io.Serializable;

public interface BaseEntity<S extends Serializable>{
	
	S getId();
	
}
