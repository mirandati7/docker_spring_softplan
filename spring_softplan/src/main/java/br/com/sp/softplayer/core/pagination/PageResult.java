package br.com.sp.softplayer.core.pagination;

import java.util.List;

import br.com.sp.softplayer.dto.BaseDTO;

public class PageResult<DTO extends BaseDTO> {

	private long totalElements;
	private int totalPages;
	private int size;
	private List<DTO> content;

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public List<DTO> getContent() {
		return content;
	}

	public void setContent(List<DTO> content) {
		this.content = content;
	}

}
