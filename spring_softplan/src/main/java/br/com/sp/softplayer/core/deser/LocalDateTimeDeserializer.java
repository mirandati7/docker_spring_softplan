package br.com.sp.softplayer.core.deser;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonTokenId;
import com.fasterxml.jackson.databind.DeserializationContext;

public class LocalDateTimeDeserializer extends com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer {

	private static final long serialVersionUID = 1L;
	
	public LocalDateTimeDeserializer(DateTimeFormatter formatter) {
		super(formatter);
	}
	
	@Override
	public LocalDateTime deserialize(JsonParser parser, DeserializationContext context) throws IOException {
		LocalDateTime formatted = null;
		if (parser.hasTokenId(JsonTokenId.ID_STRING)) {
			String string = parser.getText().trim();
			if (string.length() == 0) {
				return null;
			}
			try{
				formatted = LocalDateTime.parse(string, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));	
			}catch(Exception e){
				formatted = LocalDateTime.parse(string, DateTimeFormatter.ISO_DATE_TIME);	
			}
		}
		return formatted;
	}
}
