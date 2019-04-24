(function(w,d){
	function setZoom(options){
		var self = this;
		self = Object.assign(self,options);
		self._getDom();
		self._setStyles();
		self._setEvent();
	}

	setZoom.prototype = {
		_getDom: function(){
			var self = this;
			var preview = d.getElementById(self.container);
			var zoom = d.getElementsByClassName("zoom")[0];
			// imgZoom is lens
			var imgZoom = d.getElementsByClassName("imgZoom")[0];
			var bigImg = d.getElementsByClassName("bigImg")[0];
			var domObject = {
				"preview": preview,
				"zoom": zoom,
				"imgZoom": imgZoom,
				"bigImg": bigImg
			}
			self = Object.assign(self,domObject);
		},
		_setStyles: function(){
			var self = this;

			// Display lens and the magnified image when the cursor is hovering.
			function show(){
				self.bigImg.style.display = "block";
				self.imgZoom.style.display = "block";
			}

			function move(event){
				self.bigImg.style.display = "block";
				
				var mouseX = event.clientX;
				var mouseY = event.clientY;

				var previewX = self.preview.offsetLeft;
				var previewY = self.preview.offsetTop;

				var previewWidth = self.preview.offsetWidth;
				var previewHeight = self.preview.offsetHeight;

				var imgZoomWidth = self.imgZoom.offsetWidth;
				var imgZoomHeight = self.imgZoom.offsetHeight;

				var bigImgWidth = self.bigImg.offsetWidth;
				var bigImgHeight = self.bigImg.offsetHeight;

				/* When we have the X and Y positions of the cursor, 
				   then calculate the X and Y positions of the lens.
				   The X of zooming lens is clientX - the half width of the lens frame.
				   The Y of zooming lens is clientY - the half height of the lens frame.*/
				var imgZoomX = mouseX - previewX - (imgZoomWidth/2);
				var imgZoomY = mouseY - previewY - (imgZoomHeight/2);

				//The lens cannot exceed the thumbnail image area. 
				if(imgZoomX <= 0){
					imgZoomX =0 ;
				}
				else if(imgZoomX >= previewWidth - imgZoomWidth){
					imgZoomX = previewWidth - imgZoomWidth;
				}
				if(imgZoomY <= 0){
					imgZoomY = 0;
				}
				else if (imgZoomY >= previewHeight - imgZoomHeight){
					imgZoomY = previewHeight - imgZoomHeight;
				}
				self.imgZoom.style.left = imgZoomX + "px";
				self.imgZoom.style.top = imgZoomY + "px";
 
 				/* Calculate the ratio of zoom, 
 				   the scale between the magnified image and the thumbnail image.*/
				self.bigImg.style.left = -imgZoomX * (bigImgWidth/previewWidth) + "px";
				self.bigImg.style.top  = -imgZoomY * (bigImgHeight/previewHeight) + "px";
			}

			/* When the cursor is out of the thumbnail image area, 
			   then hide the lens and the magnified image.*/
			function hide(){
				self.bigImg.style.display = "none";
				self.imgZoom.style.display = "none";
			}

			var funcObject = {
				"show": show,
				"move": move,
				"hide": hide
			}
			self = Object.assign(self,funcObject);
		},
		_setEvent: function(){
			var self = this;
			self.zoom.onmouseover = self.show;
			self.zoom.onmousemove = self.move;
			self.zoom.onmouseout = self.hide;
		}
	}
	w.setZoom = setZoom;
})(window,document)
