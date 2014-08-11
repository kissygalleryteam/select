KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('select', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/select/1.6.0/']});