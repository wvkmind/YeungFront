/**
 * Login window.
 */
Ext.define('YeungFront.view.login.View', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'YeungFront.view.login.Controller'
    ],
    controller: 'login',
    bodyPadding: 10,
    title: 'Login',
    closable: false,
    autoShow: true,
    draggable: false,
    shadowOffset: 60,

    items: {
        xtype: 'form',
        reference: 'form',
		listeners:{
			'afterrender': 'onFormAfterRender'
		},
        items: [{
            xtype: 'textfield',
            name: 'username',
            id: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            id: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            enableKeyEvents: true,
            allowBlank: false,
            listeners: {
                keypress: 'passwordKeypressEvt'
            }
        }],
        buttons: [{
            text: 'Login',
            name: 'login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }
        ]
    }
});