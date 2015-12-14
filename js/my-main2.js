/**
 * @overview
 *
 * @author 
 * @version 2015/12/14
 */

(function() {
    this.init = function() {
        var _this = this;
    };

    var layerCount = 0;
    var Main = {
        layers: [],
        //主画布
        ps: null,
        layers: [],
        currLayer: [],

		init: function(){
			this.recieveImg();
			this.attachE();
		},

		//打开文件
        openFile: function(fileUrl){

            var reader = new FileReader();
            var _this = this;

            reader.readAsDataURL(fileUrl);

            reader.onload = function(){

                var img = new Image();
                img.src = this.result;
                img.onload = function(){
                    _this.addImage(img);
                };

            };

        },

		addImage: function(img){

            var psObj = AlloyImage(img);

            if(!(this.ps)){
                this.ps = AlloyImage(parseInt(img.width),parseInt(img.height),"rgba(255,255,255,0)");

                $(".left").css({width:img.width,height:img.height});
                $(".openFile").html("画布区");
            }

            this.layers.push(psObj);

            //添加一个图层
            this.ps.addLayer(psObj);

            //设置当前图层
            this.currLayer = [this.layers.length - 1];

            //向面板添加一个图层
            this.addLayer();
            this.draw();
        },

		recieveImg:function(){
            var _this = this;
            /*
           RpcMgr.recive( 'fdeee', function( data ){

                    if ( data.music_name === 'mm' ){
                            this.notice({"msg": data.music_name + " succ"});
                    }else{
                            this.notice({"msg": data.music_name + " fail"});
                    }

                    _this.notifer = this;
                  var imgUrl = data.imgUrl;

                  if(imgUrl){
                    var img = new Image();
                    img.src = imgUrl;

                    img.onload = function(){
                        _this.addImage(img);
                    };
                  }


            });
            */
        },

        //向图层面板添加一个图层
        addLayer: function(){
        },
	
		draw: function(isFast){
			//显示主画布
			this.ps.show(".painting",isFast);

			//重绘直方图
			this.ps.drawRect();
        },
		
		attachE: function(){
			var _this = this;

            //上传文件处理
            $("#upFile").change(function(e){
                _this.openFile(e.target.files[0]);
            });
		},
    };

	Main.init();
})();

