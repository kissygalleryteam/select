/*
combined files : 

gallery/select/1.4/index
gallery/select/1.4/search-select

*/
/**
 * manage a list of single-select options
 * @author yiminghe@gmail.com
 */
KISSY.add('gallery/select/1.4/index',function (S, Node, MenuButton, Menu,UA) {
    var $ = Node.all;
    var Select = MenuButton.Select;
    var PREFIX_CLS = 'bf-';
    var DATA_ITEM = 'data-item';
    var Item = Menu.Item;
    function ButterflySelect(target,config){
        var self = this;
        if(!config.prefixCls) S.mix(config,{prefixCls:PREFIX_CLS});
        if(!config.elBefore)  S.mix(config,{elBefore:$(target)});
        if(!config.width) config.width = $(target).width();

        //调用父类构造函数
        ButterflySelect.superclass.constructor.call(self, config);
        self.set('target',target);
    }
    S.extend(ButterflySelect,Select,{
        /**
         * 从select中拉取数据，生成menu可用的data
         * @return {Object} { selectedItem:{}, allItems : [] }
         */
        menuData:function(element){
            var self = this;
            var element = element || self.get('target');
            var curValue = element.val();
            var options = element.all("option");
            var data = {
                //当前选中的选项
                selectedItem:{},
                //所有的菜单项
                menu:{
                    children: []
                }
            };
            options.each(function (option) {
                var item = {
                    xclass: 'option',
                    content: option.text(),
                    elCls: option.attr("class"),
                    value: option.val(),
                    prefixCls:PREFIX_CLS,
                    elOption: option
                };
                if (curValue == option.val()) {
                    data.selectedItem = {
                        content: item.content,
                        value: item.value
                    };
                }
                data.menu.children.push(item);
            });
            return data;
        },
        /**
         * 运行组件
         * @return {boolean}
         */
        render:function(){
            var self = this;
            ButterflySelect.superclass.render.call(self);
            var $target = self.get('target');
            if(!$target.length) return false;
            $target.hide();
            self.sync();

            function _set(e){
                $target.val(e.newVal || "");
                $target.fire('change');
                self.fire("valueChange",{value:e.newVal,$select:$target});
            }

            self.on("afterValueChange", function (e) {
                if(UA.ie <= 6){
                    //TODO:IE6存在bug，无法选中，所以加个延迟
                    S.later(function(){
                        _set(e);
                    })
                }else{
                    _set(e);
                }

            });
        },
        _bind:function(){
            var self = this;
            var menu = self.get('menu');
            if(S.isEmptyObject(menu)) return false;
            var el = menu.get('el');
            if(!el || !el.length) return false;
            el.on('mouseover',function(ev){
                var $target = $(ev.target);
                if($target.hasClass('bf-menuitem')){
                    var item = $target.data(DATA_ITEM);
                    self.fire('itemMouseover',{$item:$target,item:item});
                }
            })
        },
        /**
         * 模拟选择框同步原生select的数据
         * @return {*}
         */
        sync:function(){
            var self = this;
            //删除所有的下拉项
            self.removeItems(true);
            var menuData = self.menuData();
            var selectedItem = menuData.selectedItem;
            var items = menuData.menu.children;
            S.each(items,function(itemConfig){
                var item = new Item(itemConfig);
                //保存option元素
                var $target = itemConfig.elOption;
                if($target) item.set('target',$target);
                self.addItem(item);
                //将Item实例缓存到div上
                var el = item.get('el');
                el.data(DATA_ITEM,item);
                if(itemConfig.value == selectedItem.value){
                    self.set('value',itemConfig.value);
                    self.set('content',itemConfig.content);
                }
            });
            self._bind();
            self.fire('render');
            self.set('isSync',true);
            return self;
        }
    },{ATTRS:{
        target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        }
    }})
    return ButterflySelect;

}, {
    requires: ['node', 'menubutton', 'menu','ua']
});

/**
 * TODO
 *  how to emulate multiple ?
 **/
/**
 * Created by minghe on 14-4-21.
 */
KISSY.add('gallery/select/1.4/search-select',function (S, Node,Select) {
    var $ = Node.all;
    function SearchSelect(target,config){
        var self = this;

        //调用父类构造函数
        SearchSelect.superclass.constructor.call(self,target, config);
        self.set('target',target);
    }
    S.extend(SearchSelect,Select,{
        render:function(){
            var self = this;
            SearchSelect.superclass.render.call(self);

            var $el = self.get('el');
            var $input = self.get('input');
            var prefixCls = self.get('prefixCls');
            var menu = self.get('menu');
            $input.addClass(prefixCls+'search-text').val(self.get('content'));
            $el.append($input);

            $input.on('keyup',self._searchHandler,self);
            self.on("afterValueChange", function () {
                $input.val(self.get('content'));
            });
            $input.on('focus',function(){
                $input.val('');
                menu.show();
                menu.set('width',$el.innerWidth());
                menu.align($el,["bl", "tl"],self.get("menuCfg").align.offset);
            })
            $input.on('blur',function(){
                $input.val(self.get('content'));
                menu.hide();
            })
        },
        _searchHandler:function(ev){
            var self = this;
            var val = S.trim($(ev.target).val());
            self.filterItems(val);
        },
        /**
         * 过滤数据
         * @param str
         */
        filterItems: function (str) {
            var self = this,
                prefixCls = self.get('prefixCls');
            var menu = self.get('menu');
            var children = menu.get('children');
            // 过滤所有子组件
            S.each(children, function (c) {
                var content = c.get('content');
                if (!str) {
                    // 没有过滤条件
                    // 恢复原有内容
                    // 显示出来
                    c.set('visible', true);
                    menu.show();
                } else {
                    if (content.indexOf(str) > -1) {
                        // 如果符合过滤项
                        // 显示
                        c.set('visible', true);
                    } else {
                        // 不符合
                        // 隐藏
                        c.set('visible', false);
                    }
                }
            });
        }
    },{ATTRS:{
        target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        },
        //输入框
        input:{
            value:'',
            getter:function(v){
                return $(v);
            }
        }
    }})
    return SearchSelect;

}, {
    requires: ['node', './index']
});

