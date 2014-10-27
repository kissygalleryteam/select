## 综述

select是模拟选择框组件，与menubutton的select的区别是不删除原生选择框，同时做了功能增强。

v1.5 版支持kissy1.4.X

## 快速使用

### html

    <select name="service-type" id="J_ServiceType">
        <option value="0">仅退款<span>（不退货）</span></option>
        <option value="1">退货退款</option>
        <option value="2">换货</option>
        <option value="3">维修</option>
        <option value="4">补寄</option>
    </select>

### 初始化组件

    S.use('kg/select/2.0.1/index,kg/select/2.0.1/theme/default.css', function (S, Select) {
        var select = new Select('#J_ServiceType', {
                    width:200,
                    // 设置对齐方式, 与普通的 Align 大体一致
                    // 该配置同菜单配置项
                    menuCfg:{
                        align:{
                            offset:[0, -1]
                        },
                        height:150,
                        elStyle:{
                            overflow:"auto",
                            overflowX:"hidden"
                        }
                    }}
        )
        select.on('valueChange',function(ev){
            var $select = ev.$select;
            S.log($select[0].value);
        })
        select.render();
    })

如果你的选择框内容发生变化，需要调用**select.sync();**同步下数据:

    S.one('.J_Sync').on('click',function(){
        S.one('#J_ServiceType').html('<option value="1" selected>新的数据1</option><option value="2">新的数据2</option>');
        select.sync();
    })

