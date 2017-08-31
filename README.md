## 简介
仿swiper滑动插件，此插件依赖touch_for_zepto.js与zepto.min.js
## 添加css

`swiper.css`

## setPage()

设置页面

## pageSlideUp()

页面上划

## pageSlideDown()

页面下划

## 初始化
```javascript
var hc_swiper=hc_swiper.createNew().init({
     id:"hc_swiper",
     onFlip:function(){
        console.log(hc_swiper.activeIndex)
     }
})
```  
