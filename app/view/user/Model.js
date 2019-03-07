Ext.define('YeungFront.view.user.Model', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.user',
    data:{
        create_button_text:'Create',
        disabled:true
    },
    stores: {
        user_store:{
            xclass: 'Ext.data.Store',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: YeungFront.Config.URL('/api/v1/user'),
                async: false
            }
        }
    }
});
