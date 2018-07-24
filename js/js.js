window.onload=function(){

    waterfall('main','box');

    var dataInt={
	    	'data':[
		    	{'src':'img/1.jpg'},
		    	{'src':'img/2.jpg'},
		    	{'src':'img/3.jpg'},
		    	{'src':'img/4.jpg'}
		    ]
    	};
    
    window.onscroll=function(){
        if(checkscrollside()){
            var main = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var newBox = document.createElement('div'); //添加 元素节点
                newBox.className='box';                   //添加 类名 name属性
                main.appendChild(newBox);              //添加 子节点
                var newPic=document.createElement('div');
                newPic.className='pic';
                newBox.appendChild(newPic);
                var newImg=document.createElement('img');
                newImg.src=dataInt.data[i].src;
                newPic.appendChild(newImg);
            }
            waterfall('main','box');
        };
    }
}
function waterfall(main,box){
    var main=document.getElementById(main);// 父级对象
    var boxes=getClassObj(main,box);// 获取存储块框pin的数组aPin
    var boxWid=boxes[0].offsetWidth;// 一个块框pin的宽
    var cols=Math.floor(document.documentElement.clientWidth/boxWid);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    main.style.cssText='width:'+boxWid*cols+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var boxHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<boxes.length;i++){//遍历数组aPin的每个块框元素
        var boxH=boxes[i].offsetHeight;
        if(i<cols){
           boxHArr[i]=boxH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,boxHArr);//数组pinHArr中的最小值minH
            var index=getminHIndex(boxHArr,minH);
            boxes[i].style.position='absolute';//设置绝对位移
            boxes[i].style.top=minH+'px';
            boxes[i].style.left=index*boxWid+'px';
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            boxHArr[index]+=boxes[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getClassObj(main,box){
    var obj=main.getElementsByTagName('*');//获取 父级的所有子集
    var boxes=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==box){
            boxes.push(obj[i]);
        }
    };
    return boxes;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}


function checkscrollside(){
    var main=document.getElementById('main');
    var boxes=getClassObj(main,'box');
    var lastboxH=boxes[boxes.length-1].offsetTop+Math.floor(boxes[boxes.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastboxH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}