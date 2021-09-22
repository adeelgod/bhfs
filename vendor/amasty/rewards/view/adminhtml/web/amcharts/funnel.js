(function(){var e=window.AmCharts;e.AmSlicedChart=e.Class({inherits:e.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");e.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";
this.groupedPulled=!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=.2;this.hideLabelsPercent=0;this.urlTarget=
"_self";this.autoMarginOffset=10;this.gradientRatio=[];this.maxLabelWidth=200;this.accessibleLabel="[[title]]: [[percents]]% [[value]] [[description]]";e.applyTheme(this,a,"AmSlicedChart")},initChart:function(){e.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type,c=a.dataItem,d=this.legend;if(c.wedge&&c){var f=c.hidden;a=a.event;
switch(b){case "clickMarker":f||d.switchable||this.clickSlice(c,a);break;case "clickLabel":f||this.clickSlice(c,a,!1);break;case "rollOverItem":f||this.rollOverSlice(c,!1,a);break;case "rollOutItem":f||this.rollOutSlice(c,a);break;case "hideItem":this.hideSlice(c,a);break;case "showItem":this.showSlice(c,a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,
!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,a)}).mouseup(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=e.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);var d=this.pf.precision;isNaN(this.tempPrec)||(this.pf.precision=this.tempPrec);a=e.formatValue(a,b,["percents"],this.pf);a=e.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});
this.pf.precision=d;-1!=a.indexOf("[[")&&(a=e.formatDataContextValue(a,b.dataContext));a=c?e.fixNewLines(a):e.fixBrakes(a);return a=e.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,
c;for(c=0;c<b.length;c++){var d=b[c];d.pulled&&this.pullSlice(d,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration,d=a.labelSet;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),this.animatable.push(b),b.animate({opacity:1,translate:"0,0"},c,this.startEffect));d&&0<c&&(0<a.alpha&&d.show(),d.translate(a.startX,a.startY),d.animate({opacity:1,
translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var d=c.label;d&&d.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&
this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var d=a.balloonX,f=a.balloonY;a.pulled&&(d+=a.pullX,f+=a.pullY);var h=this.formatString(this.balloonText,a,!0),k=this.balloonFunction;k&&(h=k(a,h));k=e.adjustLuminosity(a.color,-.15);h?this.showBalloon(h,k,b,d,f):this.hideBalloon();0===a.value&&this.hideBalloon();this.fire({type:"rollOverSlice",dataItem:a,chart:this,event:c})}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});
this.hideBalloon();this.fire({type:"rollOutSlice",dataItem:a,chart:this,event:b})},clickSlice:function(a,b,c){this.checkTouchDuration(b)&&(isNaN(a)||(a=this.chartData[a]),a.pulled?this.pullSlice(a,0):this.pullSlice(a,1),e.getURL(a.url,this.urlTarget),c||this.fire({type:"clickSlice",dataItem:a,chart:this,event:b}))},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);this.fire({type:"rightClickSlice",dataItem:a,chart:this,event:b})},drawTicks:function(){var a=this.chartData,b;for(b=0;b<
a.length;b++){var c=a[b];if(c.label&&!c.skipTick){var d=c.ty,d=e.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,d,d],this.labelTickColor,this.labelTickAlpha);e.setCN(this,d,this.type+"-tick");e.setCN(this,d,c.className,!0);c.tick=d;c.wedge.push(d)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(a.startSlices(),0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):
a.pullSlices(!0))},pullSlice:function(a,b,c){var d=this.pullOutDuration;!0===c&&(d=0);if(c=a.wedge)0<d?(c.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect),a.labelSet&&a.labelSet.animate({translate:b*a.pullX+","+b*a.pullY},d,this.pullOutEffect)):(a.labelSet&&a.labelSet.translate(b*a.pullX,b*a.pullY),c.translate(b*a.pullX,b*a.pullY));1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,
chart:this});this.fire(a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,d=0,f,h,k;for(f=0;f<c;f++){h={};var n=b[f];h.dataContext=n;null!==n[this.valueField]&&(h.value=
Number(n[this.valueField]));(k=n[this.titleField])||(k="");h.title=k;h.pulled=e.toBoolean(n[this.pulledField],!1);(k=n[this.descriptionField])||(k="");h.description=k;h.labelRadius=Number(n[this.labelRadiusField]);h.switchable=!0;h.className=n[this.classNameField];h.url=n[this.urlField];k=n[this.patternField];!k&&this.patterns&&(k=this.patterns[f]);h.pattern=k;h.visibleInLegend=e.toBoolean(n[this.visibleInLegendField],!0);k=n[this.alphaField];h.alpha=void 0!==k?Number(k):this.alpha;k=n[this.colorField];
void 0!==k&&(h.color=k);h.labelColor=e.toColor(n[this.labelColorField]);d+=h.value;h.hidden=!1;a[f]=h}for(f=b=0;f<c;f++)h=a[f],h.percents=h.value/d*100,h.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/d*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern,className:this.groupedClassName,
dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);d=this.brightnessStep;d||(d=this.pieBrightnessStep);for(f=0;f<a.length;f++)c?k=e.adjustLuminosity(c,f*d/100):(k=this.colors[f],void 0===k&&(k=e.randomColor())),void 0===a[f].color&&(a[f].color=k);this.recalculatePercents()}},recalculatePercents:function(){var a=this.chartData,b=0,c,d;for(c=0;c<a.length;c++)d=a[c],!d.hidden&&0<d.value&&(b+=d.value);for(c=0;c<a.length;c++)d=this.chartData[c],d.percents=!d.hidden&&0<d.value?100*d.value/b:0},
removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();for(var b=0;b<a.chartData.length;b++){var c=a.chartData[b];c.started=!1;var d=c.wedge;d&&(d.setAttr("opacity",a.startAlpha),d.translate(c.startX,c.startY));if(d=c.labelSet)d.setAttr("opacity",a.startAlpha),d.translate(c.startX,c.startY)}b=a.startDuration;0<b?(b=setTimeout(function(){a.pullSlices.call(a)},
1200*b),a.timeOuts.push(b)):a.pullSlices()},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var d=a[c],f=this.formatString(this.labelText,d),h=this.labelFunction;h&&(f=h(d,f));d=e.text(this.container,f,this.color,this.fontFamily,this.fontSize);f=d.getBBox().width;f>b&&(b=f);d.remove()}return b}})})();(function(){var e=window.AmCharts;e.AmFunnelChart=e.Class({inherits:e.AmSlicedChart,construct:function(a){this.type="funnel";e.AmFunnelChart.base.construct.call(this,a);this.cname="AmFunnelChart";this.startX=this.startY=0;this.baseWidth="100%";this.neckHeight=this.neckWidth=0;this.rotate=!1;this.valueRepresents="height";this.pullDistance=30;this.labelPosition="center";this.labelText="[[title]]: [[value]]";this.balloonText="[[title]]: [[value]]\n[[description]]";e.applyTheme(this,a,this.cname)},drawChart:function(){e.AmFunnelChart.base.drawChart.call(this);
var a=this.chartData;if(e.ifArray(a))if(0<this.realWidth&&0<this.realHeight){var b=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180)),c=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180)),d=this.container,f=this.startDuration,h=this.rotate,k=this.updateWidth();this.realWidth=k;var n=this.updateHeight();this.realHeight=n;var l=e.toCoordinate,t=l(this.marginLeft,k),u=l(this.marginRight,k),g=l(this.marginTop,n)+this.getTitleHeight(),l=l(this.marginBottom,n);0<b&&0>c&&(this.neckHeight=this.neckWidth=
0,h?l-=c/2:g-=c/2);var u=k-t-u,E=e.toCoordinate(this.baseWidth,u),I=e.toCoordinate(this.neckWidth,u),D=n-l-g,F=e.toCoordinate(this.neckHeight,D),y=g+D-F;h&&(g=n-l,y=g-D+F);this.firstSliceY=g;e.VML&&(this.startAlpha=1);for(var z=u/2+t,G=(D-F)/((E-I)/2),C=1,v=E/2,E=(D-F)*(E+I)/2+I*F,H=g,M=0,F=0;F<a.length;F++){var m=a[F],w;if(!0!==m.hidden&&(this.showZeroSlices||0!==m.percents)){var A=[],q=[],p;if("height"==this.valueRepresents)p=D*m.percents/100;else{var B=-E*m.percents/100/2,K=v;p=-1/(2*G);var r=
Math.pow(K,2)-4*p*B;0>r&&(r=0);p=(Math.sqrt(r)-K)/(2*p);if(!h&&g>=y||h&&g<=y)p=2*-B/I;else if(!h&&g+p>y||h&&g-p<y)w=h?Math.round(p+(g-p-y)):Math.round(p-(g+p-y)),r=w/G,B=2*(-B-(K-r/2)*w)/I,Infinity!=B&&(p=w+B)}B=v-p/G;K=!1;!h&&g+p>y||h&&g-p<y?(B=I/2,A.push(z-v,z+v,z+B,z+B,z-B,z-B),h?(w=p+(g-p-y),g<y&&(w=0),q.push(g,g,g-w,g-p,g-p,g-w,g)):(w=p-(g+p-y),g>y&&(w=0),q.push(g,g,g+w,g+p,g+p,g+w,g)),K=!0):(A.push(z-v,z+v,z+B,z-B),h?q.push(g,g,g-p,g-p):q.push(g,g,g+p,g+p));w=d.set();0<b&&0>c?(q=B/v,A=-1,h||
(A=1),isNaN(C)&&(C=0),A=(new e.Cuboid(d,2*v,A*p,b,c*C,m.color,m.alpha,this.outlineThickness,this.outlineColor,this.outlineAlpha,90,0,!1,0,m.pattern,q)).set,A.translate(z-v,g-c/2*C),C*=q):A=e.polygon(d,A,q,m.color,m.alpha,this.outlineThickness,this.outlineColor,this.outlineAlpha);e.setCN(this,w,"funnel-item");e.setCN(this,A,"funnel-slice");e.setCN(this,w,m.className,!0);w.push(A);this.graphsSet.push(w);h||w.toBack();m.wedge=w;m.index=F;if(q=this.gradientRatio){var r=[],x;for(x=0;x<q.length;x++)r.push(e.adjustLuminosity(m.color,
q[x]));0<r.length&&A.gradient("linearGradient",r);m.pattern&&A.pattern(m.pattern,NaN,this.path)}0<f&&(this.chartCreated||w.setAttr("opacity",this.startAlpha));this.addEventListeners(w,m);m.ty0=h?g-p/2:g+p/2;this.labelsEnabled&&this.labelText&&m.percents>=this.hideLabelsPercent&&(q=this.formatString(this.labelText,m),(A=this.labelFunction)&&(q=A(m,q)),r=m.labelColor,r||(r=this.color),A=this.labelPosition,x="left","center"==A&&(x="middle"),"left"==A&&(x="right"),""!==q&&(q=e.wrappedText(d,q,r,this.fontFamily,
this.fontSize,x,!1,this.maxLabelWidth),e.setCN(this,q,"funnel-label"),e.setCN(this,q,m.className,!0),q.node.style.pointerEvents="none",w.push(q),r=z,h?(x=g-p/2,m.ty0=x):(x=g+p/2,m.ty0=x,x<H+M+5&&(x=H+M+5),x>n-l&&(x=n-l)),"right"==A&&(r=u+10+t,m.tx0=z+(v-p/2/G),K&&(m.tx0=z+B)),"left"==A&&(m.tx0=z-(v-p/2/G),K&&(m.tx0=z-B),r=t),m.label=q,m.labelX=r,m.labelY=x,m.labelHeight=q.getBBox().height,q.translate(r,x),v=q.getBBox(),H=e.rect(d,v.width+5,v.height+5,"#ffffff",.005),H.translate(r+v.x,x+v.y),w.push(H),
m.hitRect=H,M=q.getBBox().height,H=x));(0===m.alpha||0<f&&!this.chartCreated)&&w.hide();g=h?g-p:g+p;v=B;m.startX=e.toCoordinate(this.startX,k);m.startY=e.toCoordinate(this.startY,n);m.pullX=e.toCoordinate(this.pullDistance,k);m.pullY=0;m.balloonX=z;m.balloonY=m.ty0;this.accessible&&this.accessibleLabel&&(m=this.formatString(this.accessibleLabel,m),this.makeAccessible(w,m));void 0!==this.tabIndex&&w.setAttr("tabindex",this.tabIndex)}}this.arrangeLabels();this.initialStart();(a=this.legend)&&a.invalidateSize()}else this.cleanChart();
this.dispDUpd()},arrangeLabels:function(){var a=this.rotate,b;b=a?0:this.realHeight;for(var c=0,d=this.chartData,f=d.length,e,k=0;k<f;k++){e=d[f-k-1];var n=e.label,l=e.labelY,t=e.labelX,u=e.labelHeight,g=l;a?b+c+5>l&&(g=b+c+5):l+u+5>b&&(g=b-5-u);b=g;c=u;n&&(n.translate(t,g),n=n.getBBox(),e.hitRect&&e.hitRect.translate(t+n.x,g+n.y));e.labelY=g;e.tx=t;e.ty=g;e.tx2=t}"center"!=this.labelPosition&&this.drawTicks()}})})();(function(){var e=window.AmCharts;e.Cuboid=e.Class({construct:function(a,b,c,d,e,h,k,n,l,t,u,g,E,I,D,F,y){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=h;this.alpha=k;this.bwidth=n;this.bcolor=l;this.balpha=t;this.dashLength=I;this.topRadius=F;this.pattern=D;this.rotate=E;this.bcn=y;E?0>b&&0===u&&(u=180):0>c&&270==u&&(u=90);this.gradientRotation=u;0===d&&0===e&&(this.cornerRadius=g);this.draw()},draw:function(){var a=this.set;a.clear();
var b=this.container,c=b.chart,d=this.w,f=this.h,h=this.dx,k=this.dy,n=this.colors,l=this.alpha,t=this.bwidth,u=this.bcolor,g=this.balpha,E=this.gradientRotation,I=this.cornerRadius,D=this.dashLength,F=this.pattern,y=this.topRadius,z=this.bcn,G=n,C=n;"object"==typeof n&&(G=n[0],C=n[n.length-1]);var v,H,M,m,w,A,q,p,B,K=l;F&&(l=0);var r,x,J,L,N=this.rotate;if(0<Math.abs(h)||0<Math.abs(k))if(isNaN(y))q=C,C=e.adjustLuminosity(G,-.2),C=e.adjustLuminosity(G,-.2),v=e.polygon(b,[0,h,d+h,d,0],[0,k,k,0,0],
C,l,1,u,0,E),0<g&&(B=e.line(b,[0,h,d+h],[0,k,k],u,g,t,D)),H=e.polygon(b,[0,0,d,d,0],[0,f,f,0,0],C,l,1,u,0,E),H.translate(h,k),0<g&&(M=e.line(b,[h,h],[k,k+f],u,g,t,D)),m=e.polygon(b,[0,0,h,h,0],[0,f,f+k,k,0],C,l,1,u,0,E),w=e.polygon(b,[d,d,d+h,d+h,d],[0,f,f+k,k,0],C,l,1,u,0,E),0<g&&(A=e.line(b,[d,d+h,d+h,d],[0,k,f+k,f],u,g,t,D)),C=e.adjustLuminosity(q,.2),q=e.polygon(b,[0,h,d+h,d,0],[f,f+k,f+k,f,f],C,l,1,u,0,E),0<g&&(p=e.line(b,[0,h,d+h],[f,f+k,f+k],u,g,t,D));else{var O,P,Q;N?(O=f/2,C=h/2,Q=f/2,P=
d+h/2,x=Math.abs(f/2),r=Math.abs(h/2)):(C=d/2,O=k/2,P=d/2,Q=f+k/2+1,r=Math.abs(d/2),x=Math.abs(k/2));J=r*y;L=x*y;.1<r&&.1<r&&(v=e.circle(b,r,G,l,t,u,g,!1,x),v.translate(C,O));.1<J&&.1<J&&(q=e.circle(b,J,e.adjustLuminosity(G,.5),l,t,u,g,!1,L),q.translate(P,Q))}l=K;1>Math.abs(f)&&(f=0);1>Math.abs(d)&&(d=0);!isNaN(y)&&(0<Math.abs(h)||0<Math.abs(k))?(n=[G],n={fill:n,stroke:u,"stroke-width":t,"stroke-opacity":g,"fill-opacity":l},N?(l="M0,0 L"+d+","+(f/2-f/2*y),t=" B",0<d&&(t=" A"),e.VML?(l+=t+Math.round(d-
J)+","+Math.round(f/2-L)+","+Math.round(d+J)+","+Math.round(f/2+L)+","+d+",0,"+d+","+f,l=l+(" L0,"+f)+(t+Math.round(-r)+","+Math.round(f/2-x)+","+Math.round(r)+","+Math.round(f/2+x)+",0,"+f+",0,0")):(l+="A"+J+","+L+",0,0,0,"+d+","+(f-f/2*(1-y))+"L0,"+f,l+="A"+r+","+x+",0,0,1,0,0"),r=90):(t=d/2-d/2*y,l="M0,0 L"+t+","+f,e.VML?(l="M0,0 L"+t+","+f,t=" B",0>f&&(t=" A"),l+=t+Math.round(d/2-J)+","+Math.round(f-L)+","+Math.round(d/2+J)+","+Math.round(f+L)+",0,"+f+","+d+","+f,l+=" L"+d+",0",l+=t+Math.round(d/
2+r)+","+Math.round(x)+","+Math.round(d/2-r)+","+Math.round(-x)+","+d+",0,0,0"):(l+="A"+J+","+L+",0,0,0,"+(d-d/2*(1-y))+","+f+"L"+d+",0",l+="A"+r+","+x+",0,0,1,0,0"),r=180),b=b.path(l).attr(n),b.gradient("linearGradient",[G,e.adjustLuminosity(G,-.3),e.adjustLuminosity(G,-.3),G],r),N?b.translate(h/2,0):b.translate(0,k/2)):b=0===f?e.line(b,[0,d],[0,0],u,g,t,D):0===d?e.line(b,[0,0],[0,f],u,g,t,D):0<I?e.rect(b,d,f,n,l,t,u,g,I,E,D):e.polygon(b,[0,0,d,d,0],[0,f,f,0,0],n,l,t,u,g,E,!1,D);d=isNaN(y)?0>f?[v,
B,H,M,m,w,A,q,p,b]:[q,p,H,M,m,w,v,B,A,b]:N?0<d?[v,b,q]:[q,b,v]:0>f?[v,b,q]:[q,b,v];e.setCN(c,b,z+"front");e.setCN(c,H,z+"back");e.setCN(c,q,z+"top");e.setCN(c,v,z+"bottom");e.setCN(c,m,z+"left");e.setCN(c,w,z+"right");for(v=0;v<d.length;v++)if(H=d[v])a.push(H),e.setCN(c,H,z+"element");F&&b.pattern(F,NaN,c.path)},width:function(a){isNaN(a)&&(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var c=this;c.animationFinished=
!1;c.easing=b;c.totalFrames=a*e.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},1E3/e.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateHeight.call(a)}):setTimeout(function(){a.updateHeight.call(a)},1E3/e.updateRate)):(a.height(a.rh),a.animationFinished=!0)},animateWidth:function(a,b){var c=this;c.animationFinished=
!1;c.easing=b;c.totalFrames=a*e.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},1E3/e.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateWidth.call(a)}):setTimeout(function(){a.updateWidth.call(a)},1E3/e.updateRate)):(a.width(a.rw),a.animationFinished=!0)}})})();
