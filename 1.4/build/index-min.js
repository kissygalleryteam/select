/*! select - v1.4 - 2013-10-22 7:33:44 PM
* Copyright (c) 2013 明河; Licensed  */
KISSY.add("gallery/select/1.4/index",function(a,b,c,d){function e(b,c){var d=this;c.prefixCls||a.mix(c,{prefixCls:h}),c.elBefore||a.mix(c,{elBefore:f(b)}),c.width||(c.width=f(b).width()),e.superclass.constructor.call(d,c),d.set("target",b)}var f=b.all,g=c.Select,h="bf-",i="data-item",j=d.Item;return a.extend(e,g,{menuData:function(a){var b=this,a=a||b.get("target"),c=a.val(),d=a.all("option"),e={selectedItem:{},menu:{children:[]}};return d.each(function(a){var b={xclass:"option",content:a.text(),elCls:a.attr("class"),value:a.val(),prefixCls:h,elOption:a};c==a.val()&&(e.selectedItem={content:b.content,value:b.value}),e.menu.children.push(b)}),e},render:function(){var b=this;e.superclass.render.call(b);var c=b.get("target");return c.length?(c.hide(),b.sync(),b.on("afterValueChange",function(d){a.later(function(){c.val(d.newVal||""),c.fire("change"),b.fire("valueChange",{value:d.newVal,$select:c})})}),void 0):!1},_bind:function(){var b=this,c=b.get("menu");if(a.isEmptyObject(c))return!1;var d=c.get("el");return d&&d.length?(d.on("mouseover",function(a){var c=f(a.target);if(c.hasClass("bf-menuitem")){var d=c.data(i);b.fire("itemMouseover",{$item:c,item:d})}}),void 0):!1},sync:function(){var b=this;b.removeItems(!0);var c=b.menuData(),d=c.selectedItem,e=c.menu.children;return a.each(e,function(a){var c=new j(a),e=a.elOption;e&&c.set("target",e),b.addItem(c);var f=c.get("el");f.data(i,c),a.value==d.value&&(b.set("value",a.value),b.set("content",a.content))}),b._bind(),b.fire("render"),b.set("isSync",!0),b}},{ATTRS:{target:{value:"",getter:function(a){return f(a)}}}}),e},{requires:["node","menubutton","menu"]});