

var hc_swiper={
    createNew:function(){
        var ctrl={},para={};
        /*储存器*/
        para.data={},para.obj={},para.event={};
        para.obj.swipeBd=null;
        para.obj.page=null;
        para.data.id=null;
        para.data.bdHeight=0;
        para.data.slideLen=0;
        para.data.lockSwipe=false;

        /*对象*/
        ctrl.swipeBox=null;
        ctrl.item=[];
        ctrl.activeIndex=0;
        ctrl.event={};
        ctrl.event_onFlip=null;
        ctrl._event_onFlip=null;

        ctrl.init=function(_para){
           para.data.bdHeight=window.innerHeight;
           ctrl.swipeBox=ctrl.getDomClass(_para.id);
           para.obj.swipeBd=ctrl.swipeBox.children[0];
           ctrl.setPage();
           document.body.addEventListener('swipeUp',ctrl.event,false); 
           document.body.addEventListener('swipeDown',ctrl.event,false);
           if(_para.onFlip!==null){
                ctrl.event_onFlip=_para.onFlip;
                ctrl._event_onFlip=function(){
                     ctrl.event_onFlip();
                }
                para.obj.swipeBd.addEventListener("webkitTransitionEnd",ctrl._event_onFlip)  
           }
          ctrl.item[ctrl.activeIndex].classList.add("slideActive")
          console.log(getComputedStyle(ctrl.swipeBox)["width"])
           return ctrl;
        }
        ctrl.setPage=function(){
           if(para.obj.swipeBd=="") return ;
           for(var i=0;i<para.obj.swipeBd.children.length;i++){
               ctrl.item.push(para.obj.swipeBd.children[i]);
               ctrl.item[i].style.height="100%";
               ctrl.item[i].style.width="100%";

           }
           ctrl.event={
               handleEvent:function(e){
                  switch(e.type){
                     case "swipeUp":
                         ctrl.pageSlideUp(e);
                         break;//这里要加break
                     case "swipeDown":
                         ctrl.pageSlideDown(e);
                         break; 
                     default:
                        return false;
                  }
               }
           }
       
        }
        ctrl.pageSlideUp=function(){
            if(ctrl.activeIndex >= ctrl.item.length-1 || para.data.lockSwipe){
                return ;
            }else{
                ctrl.activeIndex++;
            }
            ctrl.slide()
        }
        ctrl.pageSlideDown=function(){
            if(ctrl.activeIndex <= 0 || para.data.lockSwipe){
                return ;
            }else{
                ctrl.activeIndex--;
            }
            ctrl.slide()
        }
       
        ctrl.getDomClass=function(id){
            var reClass = new RegExp("(^| )" + id + "( |$)");
            var aClass=[];
            for (var i = 0; i < document.getElementsByTagName("*").length; i++){
                reClass.test(document.getElementsByTagName("*")[i].className) && aClass.push(document.getElementsByTagName("*")[i]);
            }

            return aClass[0];
        }
        ctrl.hideAllCname=function(){
           for(var i=0;i<ctrl.item.length;i++){
              ctrl.item[i].classList.remove("slideActive")
           }
        }
        ctrl.slide=function(){
                  ctrl.hideAllCname();
                  ctrl.item[ctrl.activeIndex].classList.add("slideActive")
                  para.data.slideLen=-ctrl.activeIndex*para.data.bdHeight;
                  para.obj.swipeBd.style.WebkitTransform="translate3d(0,"+para.data.slideLen+"px,0)";
        }
        /*以下方法外部调用*/
        ctrl.goTo=function(page){
            if(page<=0 && page>= ctrl.item.length-1){
                 return;
            }else{
                 ctrl.activeIndex=page;
                 ctrl.slide()
            }
            return ctrl;
        }
        ctrl.lockSwipeToNext=function(){
            para.data.lockSwipe=true;
        }
        ctrl.unlockSwipeToNext=function(){
            para.data.lockSwipe=false;
        }
        return ctrl;
       
    }
}
 