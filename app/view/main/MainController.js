/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('YeungFront.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    init:function(view){
        var loggedIn = sessionStorage.getItem("token");
        if (loggedIn) {
            Ext.Ajax.setDefaultHeaders({
                "Content-Type": "application/json",
                "Authorization": loggedIn
            });
        }
        if(loggedIn)
        {
            view.down('workbench').controller.set_init();
            view.down('workbench').show();
        }
        else
            Ext.widget('login');
    }
});
