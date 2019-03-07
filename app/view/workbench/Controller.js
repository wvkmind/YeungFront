
Ext.define('YeungFront.view.workbench.Controller', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.workbench',
    afterrender:function(){
        var self =  this;
        var myMask = new Ext.LoadMask({
            msg    : 'Please wait...',
            target : self.getView(),
        });
        myMask.show();
        Ext.Ajax.request({
            url: YeungFront.Config.URL('/api/v1/permission/button_list'),
            method: 'GET',
            cors: true,
            success: function(response, context) {
                var json = JSON.parse(response.responseText);
                for(var key in json)
                {
                    self.getView().down('button[button_id="'+key+'"]').setHidden(!json[key]);
                }
                myMask.hide();
            },
            failure: function(response) {
                myMask.hide();
                if (response.status >= 500||response.status==0) {
                    Ext.MessageBox.show({
                        title: 'Failed',
                        msg: 'Something is wrong, please try again later.',
                        buttons: Ext.MessageBox.OK
                    });
                } else {
                    var json = JSON.parse(response.responseText);
                    Ext.MessageBox.show({
                        title: 'Failed',
                        msg: json.error,
                        buttons: Ext.MessageBox.OK
                    });
                }
            }
        });
    },
    set_init:function(){

    },
    erro_exit:function(){
        var self =  this;
        sessionStorage.removeItem('token');
        Ext.Ajax.setDefaultHeaders({
            "Content-Type": "application/json",
            "Authorization": null
        });
        self.getView().hide();
        window.location.reload();
    },
    exit:function(btn){
        sessionStorage.removeItem('token');
        Ext.Ajax.setDefaultHeaders({
            "Content-Type": "application/json",
            "Authorization": null
        });
        btn.up('workbench').hide();
        window.location.reload();
    },
    open_user_win:function(btn){
        var win = Ext.create("YeungFront.view.user.View",{'parent_close_function':function(){btn.setDisabled(false)}});
        btn.setDisabled(true);
        win.show();
    }
    
});
