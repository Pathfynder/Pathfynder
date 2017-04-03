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
    },
    'submit #deleteAccountForm': function(e,t) {
        Meteor.call('remove', Meteor.userId(), function(error){
            if(error) {
                console.log("Something went wrong removing user", error);
            } else {
                console.log("Success");
            }
        });
        Router.go('login');
    },
    'submit #changePasswordForm': function(e, t) {
        var changePasswordForm = $(e.currentTarget),
            newPassword = changePasswordForm.find('#changePasswordField').val();
        Meteor.call('setPassword', Meteor.userId(), newPassword, function(error) {
            if(error) {
                console.log("Something went wrong changing password", error);
            } else {
                console.log("Success");
            }
        });
        alert("Password changed!");
        Router.go('accountsettings');
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
            if(newUsername !== "" && newUsername !== undefined && newUsername !== null) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.username": newUsername}});
            }
            if(newUniversity !== "" && newUniversity !== undefined && newUsername !== null) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.university": newUniversity}});
            }
            if(newMajor !== "" && newMajor !== undefined && newMajor !== null) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.major": newMajor}});
            }
            if(newGradDate !== "" && newGradDate !== undefined && newGradDate !== null) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.gradDate": newGradDate}});
            }
            Router.go('profile');
        } else {
            //console.log("Didn't enter");
        }
    }
});
