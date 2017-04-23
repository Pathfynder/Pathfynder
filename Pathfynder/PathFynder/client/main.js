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

Router.onBeforeAction(isSignedIn, {except: ['register', 'login', 'forgotpassword','resetpassword', 'checkemail','verifyEmail','verified']});

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

Router.route('checkemail', {
    path:'/checkemail',
    template:'checkemail',
});
Router.route('verified', {
    name: 'verified',
    path:'/verified',
    controller: 'VerifiedController',
    action: 'VerifiedAccount'
});
Router.route('verifyEmail', {
    name: 'verifyEmail',
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
VerifiedController = RouteController.extend({
    VerifiedAccount: function () {
        alert("Thanks for verifying your account!");
        Router.go('home');
    }
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
                    window.close();
     }
            });
        return false;
    },
});



Template.ResetPassword.helpers({
    resetPassword: function(){
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
            var user = Meteor.user();
            Router.go('/verified');
        });
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
                } else if (err.reason === "@purdue.edu email required") {
                    alert("Purdue Edu email required!");
                    window.location.reload();
                } else {
                    alert("Something went wrong! Use a Purdue email.")
                    window.location.reload();
                }
            } else {
                // Success. Account has been created and the user
                // has logged in successfully.
                var userId = Meteor.userId();
                var user = Meteor.user();
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
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.call('checkEmailVerification', email, function(error, data) {
            if(data == "verified") {
                Meteor.loginWithPassword(email, password, function(error){
                    if(error) {
                        alert("Wrong Username or Password! Please try again.");
                        Router.go('login');
                    }
                    else {
                        Router.go('home');

                    }
                });
            } else if (data == "unverified") {
                alert("You have not verified this account!");
                Router.go('/checkemail')
            } else {
                alert("User does not exist. (Email and password are case sensitive)");
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

Accounts.config({
    restrictCreationByEmailDomain: 'purdue.edu'
});
