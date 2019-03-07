Ext.define('YeungFront.view.workbench.View', {
    extend: 'Ext.panel.Panel',
    xtype: 'workbench',

    requires: [
        'YeungFront.view.workbench.Controller',
        'YeungFront.view.workbench.Model'
    ],
    controller: 'workbench',
    viewModel:{type:'workbench'},
    layout: 'center',
    listeners: {
        afterrender:'afterrender'
    },
    items: [
        {
            xtype:'panel',
            layout:'column',
            items:[
                {
                    margin:20,
                    xtype:'button',
                    frame:'true',
                    width: 90,
                    text:'Users',
                    iconAlign: 'top',
                    iconCls:'x-icon-user',
                    handler:'open_user_win',
                    button_id:'user',
                    hidden:true
                },
                {
                    margin:20,
                    xtype:'button',
                    frame:'true',
                    width: 90,
                    text:'Exit',
                    iconAlign: 'top',
                    iconCls:'x-icon-exit',
                    handler:'exit'
                }
            ]
        }
    ]
});