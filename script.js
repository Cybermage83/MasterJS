/* Author:
Andrey Alehsintsev
*/

master.Init("svgGFX",{

    init: function(type){
        var exe = this, cfg = {};

        cfg = {
          id:''
        };

        exe.pie = exe['svgGFX.pieChart']().initPie();
        exe.graphC = exe['svgGFX.compareGraph']().initCG();
        exe.dotC = exe['svgGFX.dotChart']().initDC();
        exe.mainC = exe['svgGFX.mainChart']().initMC();

        //pie.initPie();
        //exe['svgGFX.grabData']();
    },
    pieChart: function(config){
        var PIE = this;
        console.log('PIE>>',PIE);

        cfg ={
            id:''
        };

        return {
            initPie: function(){
                var P = this;

                //P.r     = new Raphael('pie1');
                //P.renderPie();
                P.r     = new Raphael('pie1');
                P.r.text(175,10,"Current Volume Traded Today").attr({font: "20px sans-serif", fill: "#F3F3CA"});
                P.myLabel = P.r.text(220,310,'').attr({font:"16px sans-serif",fill: "#F3F3CA",fillOpacity:0,opacity:0});
                P.modifyPie();
                P.interval = setInterval(function(){
                    P.modifyPie();
                }, 5000);
                return this;
            },
            renderPie: function(volues){
                var P = this;//[10.50,20.21,30.62,40.32,70]
                //console.log('TYPE OF',typeof P.pie);
                if(typeof P.pie !== 'undefined' && typeof P.pie === 'object'){
                    P.pie.hide();
                    //P.r     = new Raphael('pie1');
                }
                P.pie = P.r.piechart(225, 160, 115, volues, { legend: ["YAHOO", "MSFT", "GOOGLE", "APPLE", "NEWSCORP"], legendpos: "west", href: ["http://quote.foxbusiness.com/symbol/yhoo/snapshot","http://quote.foxbusiness.com/symbol/msft/snapshot","http://quote.foxbusiness.com/symbol/goog/snapshot", "http://quote.foxbusiness.com/symbol/aapl/snapshot","http://quote.foxbusiness.com/symbol/nwsa/snapshot"]});

                //P.pie.translate(-17);
                //P.r.pie.labels[1].attr({fill:'#F3DD70'});
                //P.r.pie.labels.attr({x:1});

                for(var x= 0; x < P.pie.labels.length; x+=1){
                    P.pie.labels[x][1].attr({fill:'#F3DD70'});
                    P.pie.labels[x][0].translate(-17);
                    P.pie.labels[x][1].translate(-17);
                }

                //console.log('State',P.pie.labels);
                //P.r.pie.glow({width:5,color:"blue"});

                P.pie.hover(function(){
                    this.sector.stop();
                    this.sector.scale(1.1, 1.1, this.cx, this.cy);
                    if(this.label){
                        this.label[0].stop();
                        this.label[0].attr({r: 7.5});
                        this.label[1].attr({"font-weight": 800});
                    }
                    console.log('SECTOR',this.sector);
                    P.myLabel.attr({text:"Volume: "+this.sector.value.value}).animate({fillOpacity:1,opacity:1},1000,"bounce");

                    console.log('My LABLED',P.myLabel);
                },function(){
                    this.sector.animate({transform:'s1 1' + this.cs + ' ' + this.cy},500,"bounce");

                    if(this.label){
                        this.label[0].animate({r:5},500,"bounce");
                        this.label[1].attr({"font-weight": 400});
                    }
                    P.myLabel.attr({text:''}).animate({fillOpacity:0,opacity:0},100,"bounce");
                });



                //console.log(P.pie)

            },
            modifyPie: function(){
                var P = this;

                P.grabData();

            },
            grabData: function(){ //console.log('Initiazling grabData');
                var P = this, url ='http://10.232.62.117/~andrey/SVG/feed.php?s=',data ='NWSA,YHOO,MSFT,GOOG,AAPL';
                P.dataVolume = [];

                for(var x =0; x<5;x+=1){
                    P.dataVolume.push(randomValues(10000000,1000000));
                }
                P.renderPie(P.dataVolume);
                /*
                $.ajax({
                    url:url+data,
                    type:'GET',
                    dataType:'jsonp',
                    success:function(data){
                        //console.log('Success', data);

                        for(var x = 0; x < data.quote.length; x+=1){
                           //console.log(data.quote[x].volume);

                            P.dataVolume.push(parseInt(data.quote[x].volume.replace(/\,/gi,''),10));

                        }
                        //console.log('dataVolume',P.dataVolume);

                        P.renderPie(P.dataVolume);
                        //*
                            if(P.r){
                                P.r.remove()
                            }
                        //*
                    },
                    error:function(e){
                        console.log('Error',e);
                    }
                });
                */
                function randomValues(max,min){
                    return parseInt(Math.random() *(max - min) + min,10);
                }
            }
        }
    },
    compareGraph: function(){console.log('compareGraph Initiazlied');
        var exeMaster = this;
        //console.log(exeMaster);
        return{
            initCG: function(){console.log('CG.initCG');
                var CG = this, numberofStocks = 2;
                CG.r = Raphael("chart1");
                CG.r.text(250, 7, "Annual Stock Price Comparison").attr({font: "16px sans-serif", fill: "#F3F3CA"});
                //CG.render();
                //CG.modifyChart();
                CG.grabData(numberofStocks);

                return this;
            },
            render: function(dates,stockValues){
                var CG = this;
                if(dates ==='undefined' || stockValues ==='undefined'){
                    return false;
                }
                if(typeof CG.lines !== 'undefined' && typeof CG.lines === 'object'){
                    CG.lines.hide();
                    CG.lines.axis.hide();
                    CG.lines.items[3][0].all.hide();
                    CG.lines.items[3][1].all.hide();
                }
                //console.log("VALUES I PASS",dates,stockValues);
                CG.lines = CG.r.linechart(15, 10, 300, 220, [
                                    dates,
                                    dates,
                                    dates,
                                    dates,
                                    dates
                                ], stockValues, { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true }).hoverColumn(function () {
                    this.tags = CG.r.set();

                    for (var i = 0, ii = this.y.length; i < ii; i++) {

                        this.tags.push(CG.r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
                    }
                }, function () {
                    this.tags && this.tags.remove();
                });


                for(var value in CG.lines){
                    //console.log('CG.lines>> ',value);
                }
                //console.log('CG.lines>> ',CG.lines.lines,CG.lines.symbols,CG.lines.axis,CG.lines.items,CG.lines.items);
                CG.lines.axis.attr({fill:"#fff",stroke:"#fff"});


                CG.lines.symbols.attr({ r: 6 });
                CG.lines.items[3][1].all.attr({fill:"#F3DD70"});
                CG.lines.items[3][0].all.attr({fill:"#F3DD70"});

                //CG.lines.CG.lines[0].animate({"stroke-width": 6}, 1000);
                //CG.lines.symbols[0].attr({stroke: "#fff"});
                //CG.lines.symbols[1].attr({stroke: "#fff"});
                //CG.lines.symbols[0][1].animate({fill: "#f00"}, 1000);
                //CG.lines.symbols[0][1].animate({transform:"t50,50 "},5000);



            },
            modifyChart: function(){
                var CG = this;
                //CG.grabData(2);
            },
            grabData: function(numStocks){
                var CG = this, url ='http://10.232.62.117/~andrey/SVG/feed.php?s=',data ='NWSA,YHOO,MSFT,GOOG,AAPL';

                CG.timeLine = []; CG.i=0; CG.d=0; CG.stockValues = new Array(numStocks);

                console.log('My Stock Array',CG.stockValues);

                for(var i =0; i<CG.stockValues.length; i+=1){
                    CG.stockValues[i] = new Array();
                }

                console.log('My Stock Array',CG.stockValues);

                do{
                    //console.log(CG.i);

                    CG.timeLineDate = setTimeout(function(){
                       generateDate();

                    },CG.i*3000);

                    CG.i+=1;
                }while(CG.i<= 12);

                //console.log('X TIME::>>',CG.timeLine, CG.stockValues);

                function generateDate(){
                    //console.log('generateDate Generated');
                    var d = new Date();

                    CG.timeLine.push(parseFloat(d.getMonth()+CG.d+'.'+Math.ceil(d.getSeconds()/3+CG.d)));
                    CG.d+=1;
                    for(var x =0; x< numStocks; x+=1){
                        CG.stockValues[x].push(generateStock());
                    }



                    //console.log('My Stock Array',CG.stockValues);
                    //console.log('X TIME::>>',CG.timeLine,d.getSeconds()/3+CG.d);
                    clearTimeout(CG.timeLineDate);
                    //console.log('Sliced',CG.stockValues.slice(0,CG.timeLine.length));
                    CG.render(CG.timeLine,CG.stockValues.slice(0,CG.timeLine.length));
                }

                function generateStock(){
                    return (Math.random() * (600.00 - 300.00) + 300.00).toFixed(2);
                }
                function generateTime(){
                    return (Math.random() * (10 - 2) + 2).toFixed(0);
                }


            }
        }
    },
    dotChart: function(){
        var exeMaster = this;

        return{
            initDC: function(){
                var DC = this;

                DC.render();
                DC.grabData();
            },
            render: function(){
                var DC = this;


                var r = Raphael("dotChart"),
                    xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    ys = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    data = [294, 300, 204, 255, 348, 383, 334, 217, 114, 33, 44, 26, 41, 39, 52, 17, 13, 2, 1, 2, 5, 6, 64, 153, 294, 313, 195, 280, 365, 392, 340, 184, 87, 35, 43, 55, 53, 79, 49, 19, 6, 1, 1, 1, 1, 10, 50, 181, 246, 246, 220, 249, 355, 373, 332, 233, 85, 54, 28, 33, 45, 72, 54, 28, 5, 5, 1, 1, 2, 3, 58, 167, 206, 245, 194, 207, 334, 290, 261, 160, 61, 28, 11, 26, 33, 46, 36, 5, 6, 1, 1, 1, 1, 1, 1, 9, 9, 10, 7, 10, 14, 3, 3, 7, 1, 3, 4, 4, 6, 28, 24, 3, 5, 1, 1, 1, 1, 1, 1, 4, 3, 4, 4, 3, 4, 13, 10, 7, 2, 3, 6, 1, 9, 33, 32, 6, 2, 1, 3, 1, 1, 4, 40, 128, 212, 263, 202, 248, 307, 306, 284, 222, 79, 39, 26, 33, 40, 61, 54, 17, 3, 1, 1, 1, 3, 7, 70, 199],
                    axisy = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisx = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

                r.text(225,10,"Weekly Twitter Chatter For Apple Corporation").attr({font: "20px sans-serif", fill: "#F3F3CA"});
                r.text(300,267,"(Hours)").attr({font: "16px sans-serif", fill: "#F3F3CA"});

                var dotchart =  r.dotchart(1, 10, 600, 260, xs, ys, data, {
                    symbol: "o",
                    max: 10,
                    heat: true,
                    axis: "0 0 1 1",
                    axisxstep: 23,
                    axisystep: 6,
                    axisxlabels: axisx,
                    axisxtype: " ",
                    axisytype: " ",
                    axisylabels: axisy
                }).hover(function () {
                    this.marker = this.marker || r.tag(this.x, this.y, this.value, 0, this.r + 2).insertBefore(this).attr([{fill:"rgba(255,255,255,0.9)"},{ fill: "black" }]);
                    this.marker.show();
                }, function () {
                    this.marker && this.marker.hide();
                });
                dotchart.axis.attr({fill:"#fff"});

                //console.log("Cover >>!!", dotchart.covers);
                //console.log("Series >>!!", dotchart.series);

                for(var x in dotchart){
                    //console.log('Methods',x)    ;
                }

                dotchart.series[0].animate({r:1,fill:'white'},1000,"bounce");
                dotchart.covers[0].r = 1;
                dotchart.covers[0].value = 10;

                DC.interval = setInterval(function(){
                    var id = randomValues(167,0), day = randomValues(6,0), hour = randomValues(23,0),
                        newObj = DC.randomData[day][hour];
                    //console.log(id,day,hour,newObj);

                    dotchart.series[id].animate({r:newObj.r,fill: newObj.c},1000,"bounce");
                    dotchart.covers[id].r = newObj.r;
                    dotchart.covers[id].value = newObj.v;
                },1000);

                function randomValues(max,min){
                    return parseInt(Math.random() *(max - min) + min);
                }
            },
            modify: function(){

            },
            grabData: function(){
                var DC = this; DC.randomData = new Array(7);

                //console.log('DATA! ', DC.randomData.length);

                for( var x = 0; x< DC.randomData.length; x+=1){
                    DC.randomData[x] = new Array(24);
                }

                for( x =0; x< DC.randomData.length;x+=1){
                    for(var y = 0; y< DC.randomData[x].length;y+=1){
                        DC.randomData[x][y] ={};
                        DC.randomData[x][y].v = parseInt(randomValues(10,100),10);
                        DC.randomData[x][y].r = DC.randomData[x][y].v/10;
                        DC.randomData[x][y].c = colorTest(DC.randomData[x][y].r);

                    }
                }

                //console.log('New ARRAY', DC.randomData);

                function randomValues(max,min){
                    return Math.random() *(max - min) + min;
                }
                function colorTest(radius){
                    if(radius >9){
                        return 'red';
                    }else if(radius <= 9.0 && radius > 7.0){
                        return 'orange';
                    }else if(radius <= 7.0 && radius > 5.0){
                        return 'yellow';
                    }else if(radius <= 5.0 && radius > 3.0){
                        return 'green';
                    }else if(radius <= 3.0){
                        return 'white';
                    }
                }

            }
        }

    },
    mainChart: function(){
        var exeMaster = this;

        return {
            initMC: function(){
                var MC = this;

                MC.render();
            },
            render: function(){ console.log('MAIN CHART RENDERED!!',exeMaster);

                var r = Raphael("mainChart", 620, 250),
                e = [],
                clr = [],
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                values = [],
                now = 0,
                month = r.text(310, 17, months[now]).attr({fill: "#fff", stroke: "none", "font": '100 18px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif'}),
                rightc = r.circle(364, 27, 10).attr({fill: "#fff", stroke: "none"}),
                right = r.path("M360,22l10,5 -10,5z").attr({fill: "#000"}),
                leftc = r.circle(256, 27, 10).attr({fill: "#fff", stroke: "none"}),
                left = r.path("M260,22l-10,5 10,5z").attr({fill: "#000"}),
                c = r.path("M0,0").attr({fill: "none", "stroke-width": 1, "stroke-linecap": "round"}),
                bg = r.path("M0,0").attr({stroke: "none", opacity: .1}),
                dotsy = [];


                function randomPath(length, j) {
                    var path = "",
                    x = 10,
                    y = 0;
                    dotsy[j] = dotsy[j] || [];
                    for (var i = 0; i < length; i++) {
                        dotsy[j][i] = Math.round((Math.random() * (150 - 20)) + Math.random() * 20);
                        // if (i) {
                        // path += "C" + [x + 10, y, (x += 20) - 10, (y = 240 - dotsy[j][i]), x, y];
                        // } else {
                        // path += "M" + [10, (y = 240 - dotsy[j][i])];
                        // }
                        if (i) {
                            x += 20;
                            y = 240 - dotsy[j][i];
                            path += "," + [x, y];
                        } else {
                            path += "M" + [10, (y = 240 - dotsy[j][i])] + "R";
                        }
                    }
                    return path;
                }

                for (var i = 0; i < 12; i++) {
                    values[i] = randomPath(30, i);
                    clr[i] = Raphael.getColor(1);
                }

                c.attr({path: values[0], stroke: clr[0]});
                bg.attr({path: values[0] + "L590,250 10,250z", fill: clr[0]});

                var animation = function () {
                    var time = 500;
                    if (now == 12) {
                    now = 0;
                    }
                    if (now == -1) {
                    now = 11;
                    }
                    var anim = Raphael.animation({path: values[now], stroke: clr[now]}, time, "<>");
                    c.animate(anim);
                    bg.animateWith(c, anim, {path: values[now] + "L590,250 10,250z", fill: clr[now]}, time, "<>");
                    month.attr({text: months[now]});
                };

                var next = function () {
                    now++;
                    animation();
                },
                prev = function () {
                    now--;
                    animation();
                };

                rightc.click(next);
                right.click(next);
                leftc.click(prev);
                left.click(prev);

                c.hover(function(){
                    console.log('HOVERING ',this);
                    for(var x in this){
                        console.log("Properties", x);
                    }
                },function(){
                    console.log('HOVERING ',this);
                });

            }
        }
    }

});

$(document).ready(function(){

var chartInstances = [];
    chartInstances = [
        {
            type:'pie',
            idTarget:'pie1',
            dimention:{x:220, y:160, radius:120},
            data:[10,20,30,40,70],
            options: {
                legend: ["YAHOO", "MSFT", "GOOGLE", "APPLE", "NWSA"],
                legendpos: 'west',
                links: ["http://www.google.com/finance?q=NASDAQ:YHOO", "http://www.google.com/finance?q=NASDAQ:MSFT","http://www.google.com/finance?q=google","http://www.google.com/finance?q=apple","http://www.google.com/finance?q=FOX50"]
            },
            title:{
                present:true,
                position:{x:175,y:10},
                text:"Current Volume Traded Today",
                attributes:{font: "20px sans-serif", fill: "#F3F3CA"}
            },
            legend:{
                textAttr:{fill:'#F3DD70'},
                marginText:-17,
                marginBullion: -17
            }
        }
    ];

masterExe['svgGFX.init']();

});





