package me.desair.spring.tus;

import java.io.File;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/base")
public class BaseController {
	
	@Value("${tus.server.data.directory}")
	private String directory = "";
	
	@RequestMapping(value = "/chkFile", method = RequestMethod.GET)
	public String chkFile(HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
		String fileName = servletRequest.getParameter("fileName");
		String idx = servletRequest.getParameter("idx");
		System.out.println("收到前端的檢查第" + idx + "個檔案請求 fileName=[" + fileName + "]:" + new Date());
		
		File aDirectory = new File(directory);
		File targetDirectory = new File(aDirectory.getAbsolutePath() + File.separator + "work" + File.separator + fileName);
		
		boolean isExisted = false;
		if (targetDirectory.exists()) {
			isExisted = true;
		}
		
		System.out.println("fileName=[" + fileName + "], isExisted=[" + isExisted + "]");
		
		return (isExisted ? "true" : "false");
	}

}
