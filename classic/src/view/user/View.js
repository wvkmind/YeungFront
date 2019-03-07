Ext.define('YeungFront.view.user.View', {
    extend: 'YeungFront.view.utils.BaseWindow',
    xtype: 'user-view',
    requires: [
        'YeungFront.view.user.Controller',
    ],
    controller: 'user',
    viewModel:{type:'user'},
    width: "70%",
    height: "80%",
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            frame:true,
            region: 'center',
            flex:2,
            columns:[
                {
                    text: 'Id',
                    width:'20%',
                    dataIndex: 'id'
                },
                {
                    text: 'Account',
                    width:'20%',
                    dataIndex: 'account'
                },
                {
                    text: 'Status',
                    width:'20%',
                    dataIndex: 'status',
                    renderer:'status_renderer'
                },
                {
                    text: 'Created At',
                    width:'20%',
                    dataIndex: 'created_at',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:m:s')
                },
                {
                    text: 'Updated At',
                    width:'20%',
                    dataIndex: 'updated_at',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:m:s')
                }
            ],
            bind: {
                store: '{user_store}'
            },
            listeners: {
                rowdblclick:'rowdblclick'
            }
        },
        {
            xtype:'form',
            region:'east',
            frame:true,
            flex:1,
            layout: {
                type: 'table',
                columns: 2
            },
            defaults:{
                margin:'20 20 20 20',
                width: '90%',
                colspan:2
            },
            items:[
                {
                    xtype: 'textfield',
                    fieldLabel:'ID',
                    name: 'id',
                    disabled:true,
                    bind:{
                        value:'{data.id}'
                    }
                },
                {
                    xtype:'textfield',
                    fieldLabel:'Account',
                    name:'account',
                    allowBlank: false,
                    bind:{
                        disabled:'{disabled}',
                        value:'{data.account}'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Password',
                    allowBlank: false,
                    bind:{
                        disabled:'{disabled}',
                        value:'{data.password}'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel:'Status',
                    name: 'status',
                    disabled:true,
                    bind:{
                        value:'{data.status}'
                    }
                }
            ],
            buttons:[
                {
                    xtype:'button',
                    text:'New',
                    handler:'new'
                },
                {
                    xtype:'button',
                    text:'Delete',
                    handler:'delete'
                },
                {
                    xtype:'button',
                    bind:{
                        text:'{create_button_text}'
                    },
                    handler:'update'
                }
            ]
        }
    ]
});