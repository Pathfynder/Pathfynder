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
            } else {
            }
        });
        Router.go('login');
    },
    'submit #changePasswordForm': function(e, t) {
        var changePasswordForm = $(e.currentTarget),
            newPassword = changePasswordForm.find('#changePasswordField').val();
        Meteor.call('setPassword', Meteor.userId(), newPassword, function(error) {
            if(error) {

            } else {
            }
        });
        alert("Password changed!");
        Router.go('accountsettings');
    },

    'submit #AdminEmail': function(e, t) {
        var AdminEmail = $(e.currentTarget),
         newAdminEmail = AdminEmail.find('#addAdmin').val();
       AdminAccounts.insert( {
            email: newAdminEmail
        });
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
        e.preventDefault();
        var changeUsernameform = $(e.currentTarget),
            newUsername = changeUsernameform.find('#changeUsernameOption').val(),
            usernameBool = document.getElementById('usernameBoolean').checked,
            majorBool = document.getElementById('majorBoolean').checked,
            gradBool = document.getElementById('gradBoolean').checked,
            newUniversity = changeUsernameform.find('#changeUniversityOption').val(),
            newMajor = changeUsernameform.find('#changeMajorOption').val(),
            newGradDate = changeUsernameform.find('#changeGradDateOption').val();


        if(Meteor.user()) {
            if(newUsername !== "" && newUsername !== undefined && newUsername !== null) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.username": newUsername}});
            }
            if (usernameBool === true){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.usernameBool": 0}});
            }
            if (usernameBool === false){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.usernameBool": 1}});
            }

            if (majorBool === true){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.majorBool": 0}});
            }
            if (majorBool === false){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.majorBool": 1}});
            }
            if (gradBool === true){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.gradDateBool": 0}});
            }
            if (gradBool === false){
                Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.gradDateBool": 1}});
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
        }
    }
});

Template.accountsettings.helpers({

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (undefined === user){
            return false;
        }
        return true;
    }
});
