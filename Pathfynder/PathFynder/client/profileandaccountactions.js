/**
 * Created by Brad on 3/21/2017.
 */

Router.route('/accountsettings', {
    name: 'accountsettings',
    template: 'accountsettings'
});
Router.route("/profile", {
    name: 'profile',
    template: 'profile'
});
Router.route("/profile/editprofile", {
    name:'editprofile',
    template: 'editprofile'
});

Template.accountsettings.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.profile.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.editprofile.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },
    'submit #changeUsernameForm': function(e,t) {
        //console.log("Gets here");
        e.preventDefault();
        var changeUsernameform = $(e.currentTarget),
            newUsername = changeUsernameform.find('#changeProfileOption').val();
        //console.log(newUsername);
        if(Meteor.user()) {
            //console.log("Entered");
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.username" : newUsername}});
            Router.go('profile');
        } else {
            //console.log("Didn't enter");
        }
    }
});
