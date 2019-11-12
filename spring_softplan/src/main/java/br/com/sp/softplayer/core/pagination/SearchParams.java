package br.com.sp.softplayer.core.pagination;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

public class SearchParams {

	private static final DateTimeFormatter DEFAULT_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	private int page;
	private int size;

	private HashMap<String, String> sorting;
	private HashMap<String, String> filters;
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public HashMap<String, String> getSorting() {
		return sorting;
	}

	public void setSorting(HashMap<String, String> sorting) {
		this.sorting = sorting;
	}

	public HashMap<String, String> getFilters() {
		return filters;
	}

	public void setFilters(HashMap<String, String> filters) {
		this.filters = filters;
	}

	public String get(String key){
		return filters.get(key);
	}
	
	public Long getLong(String key){
		String value = get(key);
		return value != null ? Long.parseLong(value) : null;
	}
	
	public BigDecimal getBigDecimal(String key){
		String value = get(key);
		return value != null ? new BigDecimal(value) : null;
	}
	
	public Double getDouble(String key){
		String value = get(key);
		return value != null ? Double.parseDouble(value) : null;
	}
	
	public Integer getInteger(String key){
		String value = get(key);
		return value != null ? Integer.parseInt(value) : null;
	}
	
	public LocalDate getLocalDate(String key){
		String value = get(key);
		return value != null ? LocalDate.parse(value, DEFAULT_DATE_FORMATTER) : null;
	}
	
	public LocalDateTime getMinLocalDateTime(String key){
		String value = get(key);
		return value != null ? LocalDateTime.of(LocalDate.parse(value, DEFAULT_DATE_FORMATTER), LocalTime.MIN) : null;
	}
	
	public LocalDateTime getMaxLocalDateTime(String key){
		String value = get(key);
		return value != null ? LocalDateTime.of(LocalDate.parse(value, DEFAULT_DATE_FORMATTER), LocalTime.MAX) : null;
	}
}