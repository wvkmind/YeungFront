Ext.define('YeungFront.view.utils.BaseWindow', {
    extend: 'Ext.window.Window',
    xtype: 'utils-base-window',
    maximizable:true,
    requires: [
        'YeungFront.view.utils.BaseWindowController',
    ],
    controller: 'utils_base_window',
    listeners:{
        'beforeclose':'beforeclose'
    }
});