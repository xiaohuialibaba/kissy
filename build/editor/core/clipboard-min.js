/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Sep 10 21:59
*/
KISSY.add("editor/core/clipboard",function(g,o,p,q){function l(a){this.editor=a;this._init()}function r(a){if(f.ie&&"BackCompat"!=a.get("document")[0].compatMode){var b=a.getSelection(),e;if(b.getType()==q.SELECTION_ELEMENT&&(e=b.getSelectedElement())){var c=b.getRanges()[0],d=j(a.get("document")[0].createTextNode(""));d.insertBefore(e);c.setStartBefore(d);c.setEndAfter(e);b.selectRanges([c]);setTimeout(function(){e.parent()&&(d.remove(),b.selectElement(e))},0)}}}var j=g.all,f=g.UA,m=o.RANGE,n=g.Event;
g.augment(l,{_init:function(){var a=this.editor,b=a.get("document")[0].body;n.on(b,f.ie?"beforepaste":"paste",this._paste,this);n.on(b,"contextmenu",function(){k=1;setTimeout(function(){k=0},10)});a.addCommand("copy",new h("copy"));a.addCommand("cut",new h("cut"));a.addCommand("paste",new h("paste"))},_paste:function(){if(!k){var a=this.editor,b=a.get("document")[0];if(!b.getElementById("ke_pastebin")){var e=a.getSelection(),c=new p(b),d=j(f.webkit?"<body></body>":"<div></div>",null,b);d.attr("id",
"ke_pastebin");f.webkit&&d[0].appendChild(b.createTextNode(" "));b.body.appendChild(d[0]);d.css({position:"absolute",top:e.getStartElement().offset().top+"px",width:"1px",height:"1px",overflow:"hidden"});d.css("left","-1000px");var i=e.createBookmarks();c.setStartAt(d,m.POSITION_AFTER_START);c.setEndAt(d,m.POSITION_BEFORE_END);c.select(!0);setTimeout(function(){var b;d=f.webkit&&(b=d.first())&&b.hasClass("Apple-style-span")?b:d;e.selectBookmarks(i);d.remove();var c=d.html();if(c=g.trim(c.replace(/<span[^>]+_ke_bookmark[^<]*?<\/span>(&nbsp;)*/ig,
"")))b=a.fire("paste",{html:c,holder:d}),void 0!==b&&(c=b),/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/.test(c)?g.use("editor/plugin/word-filter/dynamic/",function(b,d){a.insertHtml(d.toDataFormat(c,a))}):a.insertHtml(c)},0)}}}});var s=function(a,b){var e=a.get("document")[0],c=j(e.body),d=!1,i=function(){d=!0};c.on(b,i);(7<f.ie?e:e.selection.createRange()).execCommand(b);c.detach(b,i);return d},t=f.ie?function(a,b){return s(a,b)}:function(a,b){try{return a.get("document")[0].execCommand(b)}catch(e){return!1}},
u={cut:"您的浏览器安全设置不允许编辑器自动执行剪切操作，请使用键盘快捷键(Ctrl/Cmd+X)来完成",copy:"您的浏览器安全设置不允许编辑器自动执行复制操作，请使用键盘快捷键(Ctrl/Cmd+C)来完成",paste:"您的浏览器安全设置不允许编辑器自动执行粘贴操作，请使用键盘快捷键(Ctrl/Cmd+V)来完成"},h=function(a){this.type=a};h.prototype={exec:function(a){"cut"==this.type&&r(a);(a=t(a,this.type))||alert(u[this.type]);return a}};var v={copy:"复制",paste:"粘贴",cut:"剪切"},k;return{init:function(a){a.docReady(function(){new l(a)});var b={copy:1,cut:1,paste:1};a.on("contextmenu",function(e){e=e.contextmenu;if(!e.__copy_fix){e.__copy_fix=
1;for(var c in b)b.hasOwnProperty(c)&&e.addChild({xclass:"menuitem",content:v[c],value:c});e.on("click",function(d){var c=d.target.get("value");b[c]&&(this.hide(),setTimeout(function(){a.execCommand(c)},30))})}})}}},{requires:["./base","./range","./selection"]});