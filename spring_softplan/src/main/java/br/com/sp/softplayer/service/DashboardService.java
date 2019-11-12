package br.com.sp.softplayer.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import br.com.sp.softplayer.dto.DashboardDTO;

@Service
public class DashboardService {

	
	public DashboardDTO total() {	
		
		
		DashboardDTO dashboardDTO = new DashboardDTO(10L,
													 20L,
													 30L,
													 new BigDecimal(40.00));
		return dashboardDTO;
	}
}
