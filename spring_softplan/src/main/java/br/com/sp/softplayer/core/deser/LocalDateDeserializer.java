package br.com.sp.softplayer.core.deser;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;

public class LocalDateDeserializer extends com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer{

	private static final long serialVersionUID = 1L;

	private static final DateTimeFormatter DEFAULT_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	public static final LocalDateDeserializer INSTANCE = new LocalDateDeserializer();

    private LocalDateDeserializer() {
        this(DEFAULT_FORMATTER);
    }

    public LocalDateDeserializer(DateTimeFormatter dtf) {
        super(dtf);
    }
	
	@Override
	public LocalDate deserialize(JsonParser parser, DeserializationContext context) throws IOException{
		
		String dateText = parser.getText().trim();
		if (dateText.contains("Z")){
			dateText = dateText.substring(0, dateText.length() - 5);
		}
		
		if (parser.hasToken(JsonToken.VALUE_STRING)) {
            String string = dateText;
            if (string.length() == 0) {
                return null;
            }
            // as per [datatype-jsr310#37], only check for optional (and, incorrect...) time marker 'T'
            // if we are using default formatter
            DateTimeFormatter format = _formatter;
            System.out.println("Format " + format);
            System.out.println("DEFAULT_FORMATTER " + DEFAULT_FORMATTER);            
	            if (string.contains("T")) {
	                return LocalDate.parse(string, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
	            }
            return LocalDate.parse(string, format);
    	}
    	if (parser.isExpectedStartArrayToken()) {
    		if (parser.nextToken() == JsonToken.END_ARRAY) {
    			return null;
    		}
            int year = parser.getIntValue();

            parser.nextToken();
            int month = parser.getIntValue();

            parser.nextToken();
            int day = parser.getIntValue();

            if (parser.nextToken() != JsonToken.END_ARRAY) {
                throw context.wrongTokenException(parser, JsonToken.END_ARRAY, "Expected array to end.");
            }
            return LocalDate.of(year, month, day);
        }

        throw context.wrongTokenException(parser, JsonToken.START_ARRAY, "Expected array or string.");
	}
	
}
