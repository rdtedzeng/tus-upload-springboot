package me.desair.spring.tus;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import me.desair.tus.server.TusFileUploadService;
import me.desair.tus.server.exception.TusException;
import me.desair.tus.server.upload.UploadInfo;

@Controller
@RequestMapping(value = "/api/upload")
public class FileUploadController {

	@Autowired
	private TusFileUploadService tusFileUploadService;

	@Value("${tus.server.data.directory}")
	private String directory = "";

	@RequestMapping(value = { "", "/**" }, method = { RequestMethod.POST, RequestMethod.PATCH, RequestMethod.HEAD,
			RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.GET })
	public void processUpload(final HttpServletRequest servletRequest, final HttpServletResponse servletResponse)
			throws IOException {

		System.out.println("process start:" + new Date());
		tusFileUploadService.process(servletRequest, servletResponse);
		System.out.println("process end:" + new Date());

		String uploadURI = servletRequest.getRequestURI();

		UploadInfo uploadInfo = null;

		try {
			uploadInfo = this.tusFileUploadService.getUploadInfo(uploadURI);
			if (uploadInfo != null) {
				System.out.println("uploadInfo.isUploadInProgress():" + uploadInfo.isUploadInProgress());
			}else {
				System.out.println("uploadInfo:null");
			}

		} catch (TusException e) {
			e.printStackTrace();
		}

		if (uploadInfo != null && !uploadInfo.isUploadInProgress()) {

			// 將檔案從暫存資料夾複製到指定路徑
			System.out.println("將檔案從暫存資料夾複製到指定路徑--Start");
			File aDirectory = new File(directory);
			String filenameString = uploadInfo.getFileName();
			String serFilePath = aDirectory.getAbsolutePath() + File.separator + "uploads" + File.separator
					+ filenameString + File.separator + "data";
			File srcFile = new File(serFilePath);

			File targetDirectory = new File(aDirectory.getAbsolutePath() + File.separator + "work" + File.separator);

			if (!targetDirectory.exists()) {
				targetDirectory.mkdir();

			}

			File target = new File(targetDirectory.getPath() + File.separator + filenameString);
			if (target.exists()) {
				target.delete();
			}

			System.out.println("copy start time:" + new Date());

			Files.copy(srcFile.toPath(), target.toPath());

			try {
				// Thread.sleep(10000);
			} catch (Exception e) {
				e.printStackTrace();
			}

			System.out.println("copy end time:" + new Date());
			System.out.println("將檔案從暫存資料夾複製到指定路徑--End");
		}

//        try {
//        	// 刪除上傳的暫存檔案
//			this.tusFileUploadService.deleteUpload(uploadURI);
//			System.out.println("刪除上傳的暫存檔案");
//		} catch (IOException | TusException e) {
//			// 刪除上傳的暫存檔案錯誤，記錄上傳的檔案名稱及錯誤訊息
//			System.out.println("Delete Upload "+ uploadInfo.getMetadata().get("fileName") +" Error: " + e);
//			throw new RuntimeException(e);
//		}

		System.out.println("=====上傳作業完成=====" + new Date());
		if (uploadInfo != null) {
			System.out.println("uploadInfo.isUploadInProgress():" + uploadInfo.isUploadInProgress());
		}else {
			System.out.println("uploadInfo:null");
		}
	}

}
