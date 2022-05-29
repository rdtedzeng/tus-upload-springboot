package me.desair.spring.tus;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = {"", "/**"}, method = {RequestMethod.POST, RequestMethod.PATCH, RequestMethod.HEAD,
            RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.GET})
    public void processUpload(final HttpServletRequest servletRequest, final HttpServletResponse servletResponse) throws IOException {
        tusFileUploadService.process(servletRequest, servletResponse);
        
        String uploadURI = servletRequest.getRequestURI();
        
        UploadInfo uploadInfo = null;
        
        try {
			uploadInfo = this.tusFileUploadService.getUploadInfo(uploadURI);
		} catch (TusException e) {
			e.printStackTrace();
		}
        
        if (uploadInfo != null && !uploadInfo.isUploadInProgress()) {
        	// 將檔案從暫存資料夾複製到指定路徑
        	System.out.println("將檔案從暫存資料夾複製到指定路徑");
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
        
        System.out.println("=====上傳作業完成=====");
    }

}
