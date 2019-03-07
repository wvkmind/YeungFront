Ext.define('YeungFront.view.utils.BaseWindowController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.utils_base_window',
    init:function(view){
        var self = this;
        self.getViewModel().set('parent_close_function',view.parent_close_function);
        var myMask = new Ext.LoadMask({
            msg    : 'Please wait...',
            target : view,
        });
        self.getViewModel().set('myMask',myMask);
    },
    mask:function(){
        var self = this;
        self.getViewModel().get('myMask').show();
    },
    unmask:function(){
        var self = this;
        self.getViewModel().get('myMask').hide();
    },
    beforeclose:function(){
        var self = this;
        self.getViewModel().get('parent_close_function')();
    },
});
