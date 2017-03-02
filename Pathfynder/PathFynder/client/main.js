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

Router.onBeforeAction(isSignedIn, {except: ['register', 'login', 'forgotpassword','resetpassword', 'checkemail']});

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
    onBeforeAction: function() {
        Accounts._resetPasswordToken = this.params.token;
        this.next();
    },
    template: 'ResetPassword',

});
Template.ForgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = forgotPasswordForm.find('#userField').val();
        if (email != null) {//email is null for some reason
            email = email.toLowerCase();
        }
            Accounts.forgotPassword({email: email}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        alert("User does not exist!");
                        window.location.reload();
                    } else {
                        alert("Something went wrong!");
                        window.location.reload();
                    }
                } else {
                    alert("Email sent. Check your mailbox, and click on that link to continue.");
                    Router.go('/login')
     }
            });
        return false;
    },
});



Template.ResetPassword.helpers({
    resetPassword: function(){
        console.log(Session.get('resetPasswordToken'));
        return Session.get('resetPasswordToken');
    }
});

Template.ResetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        if (Accounts._resetPasswordToken) {
            Session.set('resetPasswordToken', Accounts._resetPasswordToken);
        }
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
            Accounts.resetPassword(Session.get('resetPasswordToken'), password, function(err) {
                if (err) {
                    console.log('We are sorry but something went wrong.');
                } else {
                    alert("Your password has been changed! Welcome Back! You will be redirected to the login page!");
                    Session.set('resetPasswordToken', null);
                    Router.go('/login')
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
        Meteor.logout();
    }
});



Template.register.events ({
    'submit form': function() {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        if(!validateEmail(email)) {
            if(!email.endsWith(".edu")) {
                alert("Must be a .edu account!")
                window.location.reload();
            }
        }
        Accounts.createUser({
            email: email,
            password: password
        }, function(err) {
            if (err) {
                if (err.reason === "Email already exists.") {
                    alert("User already exists!");
                    window.location.reload();
                } else {
                    alert("Something went wrong!")
                    window.location.reload();
                }
            } else {
                console.log("Registration successfull");
                // Success. Account has been created and the user
                // has logged in successfully.
                var userId = Meteor.userId();
                Meteor.call('serverVerifyEmail', email, userId, function () {
                    alert("Verification email sent!");
                    Router.go('/checkemail');
                });
                Meteor.logout();
            }
        });
    }
});

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

Template.login.events({
    'submit form': function(event) {
        if (!Meteor.user()._verified) {
            Router.go('/checkemail')
        }
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error) {
                alert("Wrong Username or Password! Please try again.");
                Router.go('login');

            }
            else {
                Router.go('home');

            }
        });
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
    restrictCreationByEmailDomain: 'purdue.edu'
});
