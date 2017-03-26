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
            newUsername = changeUsernameform.find('#changeUsernameOption').val(),
            newUniversity = changeUsernameform.find('#changeUniversityOption').val(),
            newMajor = changeUsernameform.find('#changeMajorOption').val(),
            newGradDate = changeUsernameform.find('#changeGradDateOption').val();

        //console.log(newUsername);
        if(Meteor.user()) {
            //console.log("Entered");
            if(newUsername !== "") {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.username": newUsername}});
            }
            if(newUniversity !== "") {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.university": newUniversity}});
            }
            if(newMajor !== "") {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.major": newMajor}});
            }
            if(newGradDate !== "") {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.gradDate": newGradDate}});
            }
            Router.go('profile');
        } else {
            //console.log("Didn't enter");
        }
    }
});
