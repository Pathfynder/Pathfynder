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

Router.route('/courses/:_school/:_department/', {
    template: 'departments',
    data: function(){
        var currentList = this.params._department;
        return Departments.findOne({ department: currentList });
    }
});

Router.route('/courses/:_school/:_department/:_course', {
    template: 'departmentCourses',
    data: function(){
        var currentList = this.params._department;
        var args = [];
        args[0] = this.params._department;//Departments.findOne({ department: currentList });
        args[1] = this.params._course;
        return args;
    }
});

Router.route('/dining/:_school', {
    template: 'diningCourts',
    data: function() {
        var school = this.params._school;
        return school;
    }
});

Router.route('/dining/:_school/:_diningCourt', {
    template: 'diningCourt',
    data: function() {
        var diningCourt = this.params._diningCourt;
        return diningCourt;
    }
});

Router.route('/residential/:_school', {
    template: 'resHalls',
    data: function() {
        var school = this.params._school;
        return school;
    }
});

Router.route('/residential/:_school/:_resHall', {
    template: 'dorm',
    data: function() {
        var resHall = this.params._resHall;
        return resHall;
    }
});

Router.route('/clubs/:_school', {
    template: 'schoolClubs',
    data: function() {
        var school = this.params._school;
        return school;
    }
});

Router.route('/clubs/:_school/:_club', {
    template: 'club',
    data: function() {
        return this.params._club;
    }
});

Router.route('/internships/:_school', {
    template: 'internshipList',
    data:function() {
        return this.params._school;
    }
});

Router.route('/internships/:_school/:_internship', {
    template: 'internship',
    data: function() {
        var internship = this.params._internship;
        return internship;
    }
});

Router.route('/clubs/:_school/:_internship', {
    template: 'internship',
    data: function() {
        return this.params._club;
    }
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
        var departmentName = event.target.department.value;
        Departments.insert( {
            department: event.target.department.value
        });
        Router.go('/courses/' + schoolName +'/' + departmentName);
    }
});

Template.internships.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        Router.go('/internships/' + schoolName);
    }
});

Template.clubs.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        Router.go('/clubs/' + schoolName);
    }
});

Template.residential.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        Router.go('/residential/' + schoolName);
    }
});

Template.dining.events ({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var schoolName = event.target.school.value;
        Router.go('/dining/' + schoolName);
    }
});

Template.departments.events( {
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var courseName = event.target.course.value;
        Router.go(Router.current().url + '/' + courseName);
    }
});

Template.departmentCourses.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .modalButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = 'block';
    },

    'click .close' : function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = "none";
        var textField = template.find('.inputReviewText');
        var workload = template.find('#courseWorkload');
        var difficulty = template.find('#courseDifficulty');
        var utility = template.find('#courseUtility');
        textField.value = "";
        workload.value = 1;
        difficulty.value = 1;
        utility.value = 1;
    },

    'submit form': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var difficulty = event.target.difficulty.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        CourseReview.insert({
            course: courseId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            difficultyRating: difficulty,
            workloadRating: workload,
            utilityRating: utility
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.difficulty.value = 1;
        event.target.workload.value = 1;
        event.target.utility.value = 1;
    }
});

Template.diningCourts.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var diningCourt = event.target.diningCourt.value;
        Dining.insert({
           name: diningCourt
        });
        Router.go(Router.current().url + '/' + diningCourt);
    }
});

Template.resHalls.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var resHall = event.target.resHall.value;
        ResHall.insert({
            name: resHall
        });
        Router.go(Router.current().url + '/' + resHall);
    }
});

Template.schoolClubs.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var clubName = event.target.club.value;
        Router.go(Router.current().url + '/' + clubName);
    }
});

Template.addClub.events({
    'submit form': function(event) {
        event.preventDefault();
        var newClubName = event.target.newClubName.value;
        Club.insert({
            name: newClubName
        });
        Router.go(Router.current().url + '/' + newClubName);
    }

});

Template.internshipList.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit form': function(event) {
        event.preventDefault();
        var internshipName = event.target.internship.value;
        Router.go(Router.current().url + '/' + internshipName);
    }
});

Template.addInternship.events({
    'submit form': function(event) {
        event.preventDefault();
        var newInternshipName = event.target.newInternshipName.value;
        Internship.insert({
            name: newInternshipName
        });
        Router.go(Router.current().url + '/' + newInternshipName);
    }

});

Template.internship.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .modalButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = 'block';
    },

    'click .close' : function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = "none";
        var textField = template.find('.inputReviewText');
        var utility = template.find('#internUtility');
        var interview = template.find('#internInterview');
        var workload = template.find('#internWorkload');
        textField.value = "";
        interview.value = 1;
        utility.value = 1;
        workload.value = 1;
    },

    'submit form': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var interview = event.target.interview.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var internshipId = Internship.findOne({"name": this.toString()})._id;
        console.log(internshipId);
        InternReview.insert({
            internship: internshipId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            interviewRating: interview,
            workloadRating: workload,
            utilityRating: utility,
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.interview.value = 1;
        event.target.utility.value = 1;
        event.target.workload.value = 1;
    }
});

Template.club.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .modalButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = 'block';
    },

    'click .close' : function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = "none";
        var textField = template.find('.inputReviewText');
        var utility = template.find('#clubUtility');
        var time = template.find('#clubTime');
        textField.value = "";
        time.value = 1;
        utility.value = 1;
    },

    'submit form' :function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var timeRating = event.target.time.value;
        var utilityRating = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var clubId = Club.findOne({"name": this.toString()})._id;
        ClubReview.insert({
            club: clubId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            timeRating: timeRating,
            utilityRating: utilityRating
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.time.value = 1;
        event.target.utility.value = 1;
    }
});

Template.dorm.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .modalButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = 'block';
    },

    'click .close' : function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = "none";
        var textField = template.find('.inputReviewText');
        var star = template.find('#dormStar');
        var location = template.find('.inputLocation');
        location.value = "";
        textField.value = "";
        star.value = 1;
    },

    'submit form' :function(event, template) {
        event.preventDefault();
        console.log("made it here");
        var reviewText = event.target.makeReview.value;
        //var location = event.target.location.value;
        var starRating = event.target.star.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var dormId = ResHall.findOne({"name": this.toString()})._id;
        ResReview.insert({
            resHall: dormId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            starRating: starRating
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.location.value = "";
        event.target.star.value = 1;
    }
});

Template.diningCourt.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'click .modalButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = 'block';
    },

    'click .close' : function(event, template) {
        event.preventDefault();
        var modal = template.find('.Modal');
        modal.style.display = "none";
        var textField = template.find('.inputReviewText');
        var quality = template.find('#diningQuality');
        var health = template.find('#diningHealth');
        var star = template.find('#diningStar');
        textField.value = "";
        quality.value = 1;
        health.value = 1;
        star.value = 1;
    },

    'submit form' : function(event, template) {
      event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var foodQuality = event.target.foodQuality.value;
        var health = event.target.health.value;
        var starRating = event.target.star.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var diningId = Dining.findOne({"name": this.toString()})._id;
        DiningReview.insert({
            diningId: diningId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            foodQualityRating: foodQuality,
            healthRating: health,
            starRating: starRating
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.foodQuality.value = 1;
        event.target.health.value = 1;
        event.target.star.value = 1;
    }
});


Template.internships.helpers({
    'queryAbbreviation': function() {
        var abbreviations = _.uniq(Course.find({}, {
            sort: {["Abbreviation"]: 1}, fields: {["Abbreviation"]: 1}
        }).fetch().map(x=> x["Abbreviation"]), true);
        return abbreviations;
    }
});

Template.courses.helpers( {
    'queryAbbreviation': function() {
        var abbreviations = _.uniq(Course.find({}, {
            sort: {["Abbreviation"]: 1}, fields: {["Abbreviation"]: 1}
        }).fetch().map(x=> x["Abbreviation"]), true);
        return abbreviations;
    }
});

Template.departments.helpers({
    getCourseNumbers : function() {
        var ret = Course.find({"Abbreviation": this.department});
        return ret;
    },

    getDepartment : function() {
        return this.Abbreviation;
    }

});

Template.departmentCourses.helpers({
    'getReviews': function() {
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        var reviews = CourseReview.find({"course": courseId});
        return reviews;
    },

    'printCourse': function() {
        return this[0] + ' ' + this[1];
    },

    printUsername: function() {
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName === "") {
                return "anonymous";
            }
            return userName;
        }
        else {
            return "anonymous";
        }
    }
});

Template.schoolClubs.helpers({
    getClubs: function() {
        return Club.find();
    }
});

Template.internshipList.helpers({
    getInternships: function() {
        return Internship.find();
    }
});

Template.internship.helpers({
   getReviews: function() {
     var internshipID = Internship.findOne({"name": this.toString()})._id;
     console.log(internshipID);
     var reviews = InternReview.find({"internship": internshipID});
     console.log(reviews);
     return reviews;
   },

    printInternship: function() {
       return this.toString();
    },

    printUsername: function() {
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName === "") {
                return "anonymous";
            }
            return userName;
        }
        else {
            return "anonymous";
        }
    }
});

Template.club.helpers({
    getReviews: function() {
      var clubId = Club.findOne({"name": this.toString()})._id;
      var reviews = ClubReview.find({"club": clubId});
      return reviews;
    },

    printClub: function() {
        return this.toString();
    },

    printUsername: function() {
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName === "") {
                return "anonymous";
            }
            return userName;
        }
        else {
            return "anonymous";
        }
    }
});

Template.dorm.helpers({
    getReviews: function() {
      var dormId = ResHall.findOne({"name": this.toString()})._id;
      var reviews = ResReview.find({"resHall": dormId});
      return reviews;
    },

    printDorm: function() {
        return this.toString();
    },

    printUsername: function() {
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName === "") {
                return "anonymous";
            }
            return userName;
        }
        else {
            return "anonymous";
        }
    }
});

Template.diningCourt.helpers({
    getReviews: function() {
        var diningId = Dining.findOne({"name": this.toString()})._id;
        var reviews = DiningReview.find({"diningId": diningId});
        return reviews;
    },

    printDining: function() {
        return this.toString();
    },

    printUsername: function() {
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName === "") {
                return "anonymous";
            }
            return userName;
        }
        else {
            return "anonymous";
        }
    }
});
