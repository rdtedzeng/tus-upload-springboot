/* global tus */
/* eslint no-console: 0 */

"use strict";


var uploadIsRunning = false;
var toggleBtn       = document.querySelector("#toggle-btn");
var resumeCheckbox  = document.querySelector("#resume");
var input           = document.querySelector("input[type=file]");
var progress        = document.querySelector(".progress");
var progressBar     = progress.querySelector(".bar");
var alertBox        = document.querySelector("#support-alert");
var uploadList      = document.querySelector("#upload-list");
var chunkInput      = document.querySelector("#chunksize");
var endpointInput   = document.querySelector("#endpoint");

var input2           = document.querySelector("#toggle-input2");
var input3           = document.querySelector("#toggle-input3");

if (!tus.isSupported) {
  alertBox.classList.remove("hidden");
}

if (!toggleBtn) {
  throw new Error("Toggle button not found on this page. Aborting upload-demo. ");
}


toggleBtn.addEventListener("click", function (e) {
  starttus();
});


function  starttus(){
	startUpload();
	//startUpload2();
	//startUpload3();
}


function startUpload() {
	
var upload          = null;
  if(console){
	console.log("startUpload:"+new Date());
	}
  var file = input.files[0];
  // Only continue if a file has actually been selected.
  // IE will trigger a change event even if we reset the input element
  // using reset() and we do not want to blow up later.
  if (!file) {
    return;
  }

  var endpoint = endpointInput.value;
  var chunkSize = parseInt(chunkInput.value, 10);
  if (isNaN(chunkSize)) {
    chunkSize = Infinity;
  }

  toggleBtn.textContent = "pause upload";

  var options = {
    endpoint: endpoint,
    resume  : !resumeCheckbox.checked,
    chunkSize: chunkSize,
    retryDelays: [0, 1000, 3000, 5000],
    withCredentials: true,
    onError : function (error) {
      if (error.originalRequest) {
        if (window.confirm("Failed because: " + error + "\nDo you want to retry?")) {
          upload.start();
          uploadIsRunning = true;
          return;
        }
      } else {
        window.alert("Failed because: " + error);
      }

      reset();
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      progressBar.style.width = percentage + "%";
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    onChunkComplete: function (chunkSize, bytesAccepted, bytesTotal) {
	
      console.log("onChunkComplete:"+new Date(),chunkSize, bytesAccepted, bytesTotal );

 
     },
    onSuccess: function () {
	console.log("onSuccess:"+new Date() );
	
	try {
		console.log("發送檢查檔案是否存在的請求--1: "+new Date() );
		var fileName = (upload.url).split("/").pop();
		var dataUrl= endpoint.replace("/api/upload", "/base/chkFile") + "?idx=1&fileName=" + fileName;
		var xhr = new XMLHttpRequest();
		xhr.open('GET',dataUrl, true);
		xhr.send();
		xhr.onload = function(){
			console.log("fileName=[" + fileName + "], isExisted=[" + this.responseText + "]");
		}
	} catch(err) {
		
	}
	
      var anchor = document.createElement("a");
      anchor.textContent = "Download " + upload.file.name + " (" + upload.file.size + " bytes)";
      anchor.href = upload.url;
      anchor.className = "btn btn-success";
      uploadList.appendChild(anchor);

      reset();
    }
  };

  upload = new tus.Upload(file, options);
  upload.start();
  uploadIsRunning = true;
}

function reset() {
  input.value = "";
  toggleBtn.textContent = "start upload";
  
  uploadIsRunning = false;
}



//jimmy add

function startUpload2() {
	var upload          = null;
  if(console){
	console.log("startUpload:"+new Date());
	}
  var file = input2.files[0];
  // Only continue if a file has actually been selected.
  // IE will trigger a change event even if we reset the input element
  // using reset() and we do not want to blow up later.
  if (!file) {
    return;
  }

  var endpoint = endpointInput.value;
  var chunkSize = parseInt(chunkInput.value, 10);
  if (isNaN(chunkSize)) {
    chunkSize = Infinity;
  }

  toggleBtn.textContent = "pause upload";

  var options = {
    endpoint: endpoint,
    resume  : !resumeCheckbox.checked,
    chunkSize: chunkSize,
    retryDelays: [0, 1000, 3000, 5000],
    withCredentials: true,
    onError : function (error) {
      if (error.originalRequest) {
        if (window.confirm("Failed because: " + error + "\nDo you want to retry?")) {
          upload.start();
          uploadIsRunning = true;
          return;
        }
      } else {
        window.alert("Failed because: " + error);
      }

      reset();
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      progressBar.style.width = percentage + "%";
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    onChunkComplete: function (chunkSize, bytesAccepted, bytesTotal) {
	
      console.log("onChunkComplete:"+new Date(),chunkSize, bytesAccepted, bytesTotal );

 
     },
    onSuccess: function () {
	console.log("onSuccess:"+new Date() );
	
	try {
		console.log("發送檢查檔案是否存在的請求--2: "+new Date() );
		var fileName = (upload.url).split("/").pop();
		var dataUrl= endpoint.replace("/api/upload", "/base/chkFile") + "?idx=2&fileName=" + fileName;
		var xhr = new XMLHttpRequest();
		xhr.open('GET',dataUrl, true);
		xhr.send();
		xhr.onload = function(){
			console.log("fileName=[" + fileName + "], isExisted=[" + this.responseText + "]");
		}
	} catch(err) {
		
	}
	
      var anchor = document.createElement("a");
      anchor.textContent = "Download " + upload.file.name + " (" + upload.file.size + " bytes)";
      anchor.href = upload.url;
      anchor.className = "btn btn-success";
      uploadList.appendChild(anchor);

      reset();
    }
  };

  upload = new tus.Upload(file, options);
  upload.start();
  uploadIsRunning = true;
}


function startUpload3() {
	var upload          = null;
  if(console){
	console.log("startUpload:"+new Date());
	}
  var file = input3.files[0];
  // Only continue if a file has actually been selected.
  // IE will trigger a change event even if we reset the input element
  // using reset() and we do not want to blow up later.
  if (!file) {
    return;
  }

  var endpoint = endpointInput.value;
  var chunkSize = parseInt(chunkInput.value, 10);
  if (isNaN(chunkSize)) {
    chunkSize = Infinity;
  }

  toggleBtn.textContent = "pause upload";

  var options = {
    endpoint: endpoint,
    resume  : !resumeCheckbox.checked,
    chunkSize: chunkSize,
    retryDelays: [0, 1000, 3000, 5000],
    withCredentials: true,
    onError : function (error) {
      if (error.originalRequest) {
        if (window.confirm("Failed because: " + error + "\nDo you want to retry?")) {
          upload.start();
          uploadIsRunning = true;
          return;
        }
      } else {
        window.alert("Failed because: " + error);
      }

      reset();
    },
    onProgress: function (bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      progressBar.style.width = percentage + "%";
      console.log(bytesUploaded, bytesTotal, percentage + "%");
    },
    onChunkComplete: function (chunkSize, bytesAccepted, bytesTotal) {
	
      console.log("onChunkComplete:"+new Date(),chunkSize, bytesAccepted, bytesTotal );

 
     },
    onSuccess: function () {
	console.log("onSuccess:"+new Date() );
	
	try {
		console.log("發送檢查檔案是否存在的請求--3: "+new Date() );
		var fileName = (upload.url).split("/").pop();
		var dataUrl= endpoint.replace("/api/upload", "/base/chkFile") + "?idx=3&fileName=" + fileName;
		var xhr = new XMLHttpRequest();
		xhr.open('GET',dataUrl, true);
		xhr.send();
		xhr.onload = function(){
			console.log("fileName=[" + fileName + "], isExisted=[" + this.responseText + "]");
		}
	} catch(err) {
		
	}
	
      var anchor = document.createElement("a");
      anchor.textContent = "Download " + upload.file.name + " (" + upload.file.size + " bytes)";
      anchor.href = upload.url;
      anchor.className = "btn btn-success";
      uploadList.appendChild(anchor);

      reset();
    }
  };

  upload = new tus.Upload(file, options);
  upload.start();
  uploadIsRunning = true;
}
