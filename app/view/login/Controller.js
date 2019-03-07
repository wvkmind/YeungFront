
Ext.define('YeungFront.view.login.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Ext.data.StoreManager',
        'YeungFront.Config'
    ],
	onFormAfterRender: function(){
		this.getView().down("textfield[name=username]").focus(true,0);
	},
    onLoginClick: function(button) {

        Ext.Ajax.request({
            url: YeungFront.Config.URL('/api/v1/user_login/login'),
            method: 'POST',
            cors: true,
            jsonData: {
                'user_name':Ext.getCmp('username').value,
                'password':md5(Ext.getCmp('password').value)
            },
            success: function(response, context) {
                var json = JSON.parse(response.responseText);
                sessionStorage.setItem('token', json.token);
                Ext.Ajax.setDefaultHeaders({
                    "Content-Type": "application/json",
                    "Authorization": json.token
                });
                button.up('window').hide();
                window.location.reload();
            },
            failure: function(response) {
                if (response.status >= 500||response.status==0) {
                    Ext.MessageBox.show({
                        title: 'Login Failed',
                        msg: 'Something is wrong, please try again later.',
                        buttons: Ext.MessageBox.OK
                    });
                } else {
                    var json = JSON.parse(response.responseText);
                    Ext.MessageBox.show({
                        title: 'Login Failed',
                        msg: json.error,
                        buttons: Ext.MessageBox.OK
                    });
                }
            }
        });
    },

    passwordKeypressEvt: function(field, e) {
        var me = this;
        if(e.getKey() === Ext.event.Event.ENTER) {
            var btn = this.getView().down('button[name="login"]');
            me.onLoginClick(btn);
        }
    }
});
