/**
 * @overview
 *
 * @author 
 * @version 2015/12/15
 */

(function(){
    var Main = {
        img: null,
		addEvent: function(selector, eventType, func){
            var proName = "";

            switch(true){
                case /^\./.test(selector) :
                    proName = "className";
                    selector = selector.replace(".", "");
                    break;
                case /^\#/.test(selector) :
                    proName = "id";
                    selector = selector.replace("#", "");
                    break;
                default:
                    proName = "tagName";
            }

            document.body.addEventListener(eventType,function(e){
                    function check(node){
                        if(! node.parentNode) return;

                        if(node[proName] == selector){
                            func.call(node, e);
                        };
                        check(node.parentNode);
                    }
                    check(e.target);
            }, false);
        },
        eventAtt: function(){
            var _this = this;

            this.addEvent(".filter", "click", function(e){
			    var text = this.childNodes[0].nodeValue.replace(/(^\s*)|(\s*$)/g, "");
                var img = document.getElementById("template");
                var AP = _this.img.clone();
                if(text == "原图") {
                    AP.replace(img);
                } else {
                    setTimeout(function(){
                        AP.ps(text).replace(img);
                    }, 2);
                }
            });
        },
        init: function(){
            this.eventAtt();
            var _this = this;
            var pic = document.getElementById('template');
            pic.onload = function(){
                _this.img = AlloyImage(this);
            };
        }
    };

    window.addEventListener("DOMContentLoaded", function(){
        Main.init();
    }, false);
})();

