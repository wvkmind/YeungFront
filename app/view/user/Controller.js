Ext.define('YeungFront.view.user.Controller', {
    extend: 'YeungFront.view.utils.BaseWindowController',

    alias: 'controller.user',
    status_renderer:function(val)
    {
        if(val==0)
            return 'Active';
        else
            return  'Deleted';
    },
    clear_form:function(btn){
        var self = this;
        btn.up('form').getForm().setValues({id:null,account:null,password:null,status:null});
        self.getViewModel().set('disabled',true);
    },
    new:function(btn){
        var self = this;
        self.clear_form(btn);
        var data = {};
        data['status']='Active'
        self.getViewModel().set('disabled',false);
        self.getViewModel().set('data',data);
        self.getViewModel().set('create_button_text','Create');
    },
    update:function(btn){
        var self = this;
        var form = btn.up('form').getForm();
        var record = self.getViewModel().get('data');
        if(form.isValid()){
            var data = {};
            Ext.applyIf(data,record);
            data['status']=0
            data['password'] = md5(data['password']);
            self.send_to_server(data,btn);
        }
    },
    delete:function(btn){
        var self = this;
        var form = btn.up('form').getForm();
        var record = self.getViewModel().get('data');
        var data = {};
        Ext.applyIf(data,record);
        data['status']=1
        if(data['account']!='admin'&&data['id']!=undefined&&data['id']!=null&&data['id']!=''){
            self.send_to_server(data,btn);
        }else{
            Ext.MessageBox.show({
                title: 'Failed',
                msg: "Cannot delete.",
                buttons: Ext.MessageBox.OK
            });
        }
    },
    send_to_server:function(info,btn){
        var self = this;
        self.mask();
        Ext.Ajax.request({
            url: YeungFront.Config.URL('/api/v1/user_login/register'),
            method: 'POST',
            cors: true,
            jsonData: info,
            success: function(response, context) {
                self.unmask();
                btn.up('user-view').down('grid').store.reload();
                self.clear_form(btn);
            },
            failure: function(response) {
                self.unmask();
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
    rowdblclick:function(grid,record){
        var self = this;
        var data = {};
        Ext.applyIf(data,record.data);
        if(data['status']==0){
            data['status']='Active'
            self.getViewModel().set('create_button_text','Update');
        }else{
            data['status']='Deleted'
            self.getViewModel().set('create_button_text','Active');
        }
        self.getViewModel().set('disabled',false);
        grid.up('user-view').down('form').getForm().setValues(data);
    }
});
