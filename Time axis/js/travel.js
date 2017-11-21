    //通用函数
    //直接获取元素Id
    var g=function (id){
        return document.getElementById(id);
    }
    var g_tpl=function( id ){
        return g('tpl_'+id).innerHTML;
    }
    var g_class=function(className){
        return document.getElementsByClassName(className);
    }
    var get_body_w = function(){ return document.body.offsetWidth; };//获得整个页面的宽度
    var get_body_h = function(){ return document.body.offsetHeight; };
   // var getElTop = function(el){ return el.offsetTop+170; };
    //格式化数据
    var list={};
    //遍历所有数据
    for(var i=0;i<data.length;i++){
        var date=new Date(data[i].date);
        var year=date.getFullYear();
        var month=date.getMonth()+1;

        var lunar=GetLunarDateString(date);

        if(!list[year]){list[year]={}};
        if(!list[year][month]){list[year][month]=[]};

        var item=data[i];
        item.year=year;
        item.month=month;
        item.lunar=lunar[0]+'<br>&nbsp;'+lunar[1];
        item.like_format = item.like < 10000 ? item.like : ( item.like / 10000 ).toFixed(1) + '万';//保留一位小数

        list[year][month].push( item);
    }
    //时序变量的生成
    var html_scrubber_list = [];
    var tpl_year=g_tpl('scrubber_year');
    var tpl_month=g_tpl('scrubber_month');
    for(y in list){
        var html_year=tpl_year.replace(/\{year\}/g,y);
        var html_month=[];
        for(m in list[y]){
            //年份包含月份
            //html_month.push(tpl_month.replace(/\{month\}/g,m));
            html_month.unshift(tpl_month.replace(/\{month\}/g,m).replace(/\{year\}/g,y));
        }
        html_year=html_year.replace(/\{list\}/g,html_month.join(''));
        html_scrubber_list.push(html_year);
        g('scrubber').innerHTML=html_scrubber_list.join('')+'<a href="javascript:;" class="scrubber_month scrubber_month_in_0" id="scrubber_month_0_0" style="display: block;" onclick="scroll_top(get_body_h())">START</a>';
    }
    //日志列表
    var html_content_list = [];
    var tpl_year=g_tpl('content_year');
    var tpl_month=g_tpl('content_month');
    var tpl_item=g_tpl('content_item');
    for(y in list){
        var html_year=tpl_year.replace(/\{year\}/g,y);
        var html_month=[];
        for(m in list[y]){
            //年份包含月份
            //html_month.push(tpl_month.replace(/\{month\}/g,m));
            //月份包含日期
            var html_item=[];
            var firstmonth=true;
            for(i in list[y][m]){
                var item_data=list[y][m][i];
                var item_html=tpl_item.replace(/\{date\}/g,item_data.date)
                        .replace(/\{lunar\}/g,item_data.lunar)
                        .replace(/\{intro\}/g,item_data.intro)
                        .replace(/\{media\}/g,item_data.media)
                        .replace(/\{like\}/g,item_data.like)
                        .replace(/\{comment\}/g,item_data.comment)
                        .replace(/\{position\}/g,i%2?'right':'left')
                        .replace(/\{isFirst\}/g,firstmonth?'first':'')
                        .replace(/\{like_format\}/g,item_data.like_format)
                        html_item.push(item_html);
                firstmonth=false;
            }
            html_month.unshift(tpl_month.replace(/\{month\}/g,m).replace(/\{year\}/g,y).replace(/\{list\}/g,html_item.join('')));

        }
        html_year=html_year.replace(/\{list\}/g,html_month.join(''));
        html_content_list.push(html_year);
    }
    g('content').innerHTML=html_content_list.join('')+'<a href="javascript:;" class="content_year start" onclick="scroll_top(0)">START</a>';
    //获得元素的高度
    var get_top=function(el){
        return el.offsetTop+170;
    }
    //滚动页面到
    var scroll_top=function(to){
        var start=document.body.scrollTop;
        fx( function(now){  window.scroll(0,now); },start ,to );

    }
    //年份点击
    var show_year=function(year){
        //console.log(year);
        var c_year=g('content_year_'+year);
        var top=get_top(c_year);
        scroll_top(top);
        /*c_year.className='current';*/
        expand_year(year,g('scrubber_year_'+year));

    }
    var show_month=function(year,month){
        console.log(year,month);
        var c_year=g('content_month_'+year+'_'+month);
        var top=get_top(c_year);
        scroll_top(top);
        highlight_month(g('scrubber_month_'+year+'_'+month));
    }
    //高亮月份
    var highlight_month=function(element){
        var month=g_class('scrubber_month');
        for(var i=month.length-1;i>=0;i--){
            month[i].className=month[i].className.replace('current',"");
            //console.log(month[i].className);
        }
        element.className=element.className+' current';
        //alert(element.className);
        /*element.classList.add('current');*/
        //console.log(element.className);
    }

    //年份自动展开
    var expand_year=function(year,element){
        var month=g_class('scrubber_month');
        var showmonth=g_class('scrubber_month_in_'+year);
        var years=g_class('scrubber_year');
        for(var i=month.length-1;i>=0;i--){
            month[i].style.display='none';
        }
        for(var i=showmonth.length-1;i>=0;i--){
            showmonth[i].style.display='block';
        }
        for(var i=years.length-1;i>=0;i--){
            years[i].className=years[i].className.replace('current',"");
        }
        element.className=element.className+' current';
        //月份清空
        for(var i=month.length-1;i>=0;i--){
            month[i].className=month[i].className.replace('current',"");
        }
    }
    //固定时序菜单
    window.onscroll=function(){
        var top=document.body.scrollTop;
        if( top > 200){
            g('scrubber').style.position = 'fixed';
            g('scrubber').style.left = '10%';
            g('scrubber').style.top  = '60px';
        }else{
            g('scrubber').style.position = '';
            g('scrubber').style.left =     '';
            g('scrubber').style.top  =     '';
        }

        //  更新时序状态
        updateScrubberOnTop( top );
        updateMonthOnTop( top );
    }
    //  根据窗口滚动条更新时序年份状态
    var updateScrubberOnTop = function( top ){

        var years  = g('content').getElementsByClassName('content_year');
        var tops = [];

        for (var i = 0; i <years.length ; i++) {//遍历距离top的高度
            tops.push( years[i].offsetTop );
        };
        for(var i = 1; i <tops.length ; i++){

            if( top > tops[i-1] && top < tops[i] ){

                var year = years[i-1].innerHTML;
                expand_year(year,g('scrubber_year_'+year));
                return ;
            }
        }

    }

    //  根据窗口滚动条更新时序月份状态
    var updateMonthOnTop = function( top ){

        var months  = g('content').getElementsByClassName('content_month');
        var tops = [];

        for (var i = 0; i <months.length ; i++) {
            tops.push( months[i].offsetTop );
        };

        for(var i = 1; i <tops.length ; i++){

            if( top > tops[i-1] && top < tops[i] ){//当前高度大于之前的高度
                var id=months[i-1].id;
                var newId=id.replace('content','scrubber');
               // alert(newId);
                console.log(newId);
                highlight_month(g(newId));
                return ;
            }
        }
    }
  /*  //  窗口改变事件处理; 保持时序列表的位置
    window.onresize = function(){
        window.onscroll();
    }*/

