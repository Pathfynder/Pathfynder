/**
 * Created by Brad on 2/26/2017.
 */
var isSignedIn = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        Router.go("login");
    }
    else {
        this.next();
    }
};

Router.onBeforeAction(isSignedIn, {except: ['register', 'login', 'forgotpassword','resetpassword']});

Router.route('/register', {
    name: 'register',
    template: 'register'
});

Router.route('/login', {
    name: 'login',
    template: 'login'
});

Router.route('/', {
    name: 'home',
    template: 'home',
});

Router.route('/faq' , {
    name: 'faq',
    template: 'faq'
});

Router.route('/courses', {
    name: 'courses',
    template: 'courses'
});

Router.route('/internships', {
    name: 'internships',
    template: 'internships'
});

Router.route('/clubs', {
    name: 'clubs',
    template: 'clubs'
});

Router.route('/residential', {
    name: 'residential',
    template: 'residential'
});

Router.route('/dining', {
    name: 'dining',
    template: 'dining'
});

Router.route('/accountsettings', {
    name: 'accountsettings',
    template: 'accountsettings'
});
Router.route("/profile", {
    name: 'profile',
    template: 'profile'
});
Router.route('checkemail', {
    path:'/checkemail',
    template:'checkemail'
});
Router.route('verified', {
    name:'/verified',
    template:'verified'
});
Router.route('verifyEmail', {
    controller: 'AccountController',
    path: '/verify-email/:token',
    action:'verifyEmail'
});

Router.route('/forgot-password', {
    name: 'forgotpassword',
    template: 'ForgotPassword'

});
Router.route('/reset-password/:token', {
    name: 'resetpassword',
    template: 'ResetPassword',
});
Template.ForgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = (forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

            Accounts.forgotPassword({email: email}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                } else {
                    console.log('Email Sent. Check your mailbox.');
                }
            });
        return false;
    },
});

if (Accounts._resetPasswordToken) {
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}

Template.ResetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    }
});

Template.ResetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    console.log('We are sorry but something went wrong.');
                } else {
                    console.log('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                    Route.go('/login')
                }
            });
        return false;
    }
});



AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function() {
            Router.go('/verified');
        });
    }
});



Template.register.events ({
    'submit form': function() {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function(err) {
            if (err) {
                console.log("Unable to register.", err);
                if (err.reason === "Email already exists.") {
                    console.log("Display password reset form?");
                }
            } else {
                console.log("Registration successfull");
                // Success. Account has been created and the user
                // has logged in successfully.
                var userId = Meteor.userId();
                Meteor.call('serverVerifyEmail', email, userId, function () {
                    console.log("Verification Email Sent");
                    Router.go('/checkemail');
                });
            }
        });
    }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
        Router.go('home');
    }
});

Template.home.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.faq.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.courses.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.internships.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.clubs.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.residential.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.dining.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
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

Template.clubs.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Meteor.loginWithPassword(email, password, function(error) {
    //this will be where we can check .edu
    if (error) {
        console.log(error.reason);
    }
    else {
        Router.go("home");
    }
});

Accounts.createUser({
    email: email,
    password: password
},  function(error) {
    if (error) {
        console.log(error.reason);
    }
    else {
        Router.go("home");
    }
});

Accounts.config({
    //restrictCreationByEmailDomain: 'purdue.edu'
});
