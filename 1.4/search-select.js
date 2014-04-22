/**
 * Created by minghe on 14-4-21.
 */
KISSY.add(function (S, Node,Select) {
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
            $input.addClass(prefixCls+'search-text').val(self.get('content'));
            $el.append($input);

            $input.on('keyup',self._searchHandler,self);
            self.on("afterValueChange", function () {
                $input.val(self.get('content'));
            });
            $input.on('focus',function(){
                $input.val('');
                self.get('menu').show();
            })
            $input.on('blur',function(){
                $input.val(self.get('content'));
                self.get('menu').hide();
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
            var isHide = true;
            // 过滤所有子组件
            S.each(children, function (c) {
                var content = c.get('content');
                if (!str) {
                    // 没有过滤条件
                    // 恢复原有内容
                    // 显示出来
                    c.set('visible', true);
                    isHide = false;
                    menu.show();
                } else {
                    if (content.indexOf(str) > -1) {
                        // 如果符合过滤项
                        // 显示
                        c.set('visible', true);
                        isHide = false;
                    } else {
                        // 不符合
                        // 隐藏
                        c.set('visible', false);
                    }
                }
            });
            isHide && menu.hide();
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
