/**
 * Created by Brad on 3/22/2017.
 */
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

Router.route('/courses/purdue', {
    name: 'coursespurdue',
    template: 'coursesPurdue'
});

Router.route('/courses/notpurdue', {
    name: 'coursesnotpurdue',
    template: 'coursesNotPurdue'
});

Router.route('/courses/purdue/cs', {
    name: 'coursespurdueCS',
    template: 'coursesPurdueCS'
});

Router.route('/courses/purdue/cs/cs307', {
    name: 'coursespurdueCScs307',
    template: 'coursesPurdueCScs307'
});

Template.courses.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        var schoolPage = 'courses'.concat(schoolName);
        Router.go(schoolPage);
    }
});

Template.coursesPurdue.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var departmentName = event.target.department.value;
        var departmentPage = 'coursespurdue'.concat(departmentName);
        Router.go(departmentPage);
    }
});

Template.coursesPurdueCS.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var courseName = event.target.course.value;
        var coursePage = 'coursespurdueCS'.concat(courseName);
        Router.go(coursePage);
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
