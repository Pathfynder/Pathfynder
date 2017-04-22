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
        args[0] = this.params._department;
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

Router.route('/profiles/:_username/', {
    name: 'publicProfile',
    template: 'publicProfile',
    data: function() {
        var username = this.params._username;
        var user = Meteor.users.findOne({"profile.username": username});
        return user;
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

    'submit .sortReviews': function(event, template) {
        event.preventDefault();
        var sortType = template.find('#coursesSortReviews').value;
        Session.set('sortType', sortType);
    },

    'click .usernameProfileLink' : function(event) {
        event.preventDefault();
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName != "" && userName != "Anonymous" && userName != "anonymous") {
                Router.go("/profiles/" + userName);
            }
        }
    },

    'click .addReview': function(event, template) {
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

    'click .editReviewButton': function(event, template) {
        event.preventDefault();
        var reviewBeingEdited = CourseReview.findOne({"userId": this.userId, "date": this.date, "review": this.review, "difficultyRating": this.difficultyRating, "workloadRating": this.workloadRating, "utilityRating": this.utilityRating});
        var modal = template.find('.editModal');
        var textField = template.find('.editReviewText');
        var workload = template.find('#editCourseWorkload');
        var difficulty = template.find('#editCourseDifficulty');
        var utility = template.find('#editCourseUtility');
        textField.value = reviewBeingEdited.review;
        workload.value = reviewBeingEdited.workloadRating;
        difficulty.value = reviewBeingEdited.difficultyRating;
        utility.value = reviewBeingEdited.utilityRating;
        modal.style.display = 'block';
        editCourseThisStorage = this;
    },

    'click .editclose': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        modal.style.display = "none";
    },

    'submit .makeReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var difficulty = event.target.difficulty.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        CourseReview.insert({
            course: courseId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            difficultyRating: difficulty,
            workloadRating: workload,
            utilityRating: utility,
            upvotes: 0,
            month: month,
            year: year
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.difficulty.value = 1;
        event.target.workload.value = 1;
        event.target.utility.value = 1;
    },

    'submit .editReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.editReview.value;
        var difficulty = event.target.difficulty.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        CourseReview.update(editCourseThisStorage._id, {
            $set: {"review": reviewText, "difficultyRating": difficulty, "workloadRating": workload, "utilityRating": utility}
        });

        var modal = template.find('.editModal');
        modal.style.display = "none";
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

    'submit .sortReviews': function(event, template) {
        event.preventDefault();
        var sortType = template.find('#internSortReviews').value;
        Session.set('sortType', sortType);
    },

    'click .usernameProfileLink' : function(event) {
        event.preventDefault();
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName != "" && userName != "Anonymous" && userName != "anonymous") {
                Router.go("/profiles/" + userName);
            }
        }
    },

    'click .addReview': function(event, template) {
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

    'submit .makeReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var interview = event.target.interview.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var internshipId = Internship.findOne({"name": this.toString()})._id;
        InternReview.insert({
            internship: internshipId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            interviewRating: interview,
            workloadRating: workload,
            utilityRating: utility,
            upvotes: 0,
            month: month,
            year: year
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.interview.value = 1;
        event.target.utility.value = 1;
        event.target.workload.value = 1;
    },

    'click .editReviewButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        var textField = template.find('.editReviewText');
        var workload = template.find('#editInternWorkload');
        var interview = template.find('#editInternInterview');
        var utility = template.find('#editInternUtility');
        textField.value = this.review;
        workload.value = this.workloadRating;
        interview.value = this.interviewRating;
        utility.value = this.utilityRating;
        modal.style.display = 'block';
        editInternshipThisStorage = this;
    },

    'click .editclose': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        modal.style.display = "none";
    },

    'submit .editReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.editReview.value;
        var interview = event.target.interview.value;
        var workload = event.target.workload.value;
        var utility = event.target.utility.value;
        InternReview.update(editInternshipThisStorage._id, {
            $set: {"review": reviewText, "interviewRating": interview, "workloadRating": workload, "utilityRating": utility}
        });

        var modal = template.find('.editModal');
        modal.style.display = "none";
    }
});

Template.club.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit .sortReviews': function(event, template) {
        event.preventDefault();
        var sortType = template.find('#clubSortReviews').value;
        Session.set('sortType', sortType);
    },

    'click .usernameProfileLink' : function(event) {
        event.preventDefault();
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName != "" && userName != "Anonymous" && userName != "anonymous") {
                Router.go("/profiles/" + userName);
            }
        }
    },

    'click .addReview': function(event, template) {
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

    'submit .makeReview' :function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var timeRating = event.target.time.value;
        var utilityRating = event.target.utility.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var clubId = Club.findOne({"name": this.toString()})._id;
        ClubReview.insert({
            club: clubId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            timeRating: timeRating,
            utilityRating: utilityRating,
            upvotes: 0,
            month: month,
            year: year
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.time.value = 1;
        event.target.utility.value = 1;
    },

    'click .editReviewButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        var textField = template.find('.editReviewText');
        var time = template.find('#editClubTime');
        var utility = template.find('#editClubUtility');
        textField.value = this.review;
        time.value = this.timeRating;
        utility.value = this.utilityRating;
        modal.style.display = 'block';
        editClubThisStorage = this;
    },

    'click .editclose': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        modal.style.display = "none";
    },

    'submit .editReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.editReview.value;
        var time = event.target.time.value;
        var utility = event.target.utility.value;
        ClubReview.update(editClubThisStorage._id, {
            $set: {"review": reviewText, "timeRating": time,"utilityRating": utility}
        });

        var modal = template.find('.editModal');
        modal.style.display = "none";
    }
});

Template.dorm.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit .sortReviews': function(event, template) {
        event.preventDefault();
        var sortType = template.find('#dormSortReviews').value;
        Session.set('sortType', sortType);
    },

    'click .usernameProfileLink' : function(event) {
        event.preventDefault();
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName != "" && userName != "Anonymous" && userName != "anonymous") {
                Router.go("/profiles/" + userName);
            }
        }
    },

    'click .addReview': function(event, template) {
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

    'submit .makeReview' :function(event, template) {
        event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var starRating = event.target.star.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var dormId = ResHall.findOne({"name": this.toString()})._id;
        ResReview.insert({
            resHall: dormId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            starRating: starRating,
            upvotes: 0,
            month: month,
            year: year
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.star.value = 1;
    },

    'click .editReviewButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        var textField = template.find('.editReviewText');
        var star = template.find('#editDormStar');
        textField.value = this.review;
        star.value = this.starRating;
        modal.style.display = 'block';
        editDormThisStorage = this;
    },

    'click .editclose': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        modal.style.display = "none";
    },

    'submit .editReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.editReview.value;
        var star = event.target.star.value;
        ResReview.update(editDormThisStorage._id, {
            $set: {"review": reviewText, "starRating": star}
        });

        var modal = template.find('.editModal');
        modal.style.display = "none";
    }
});

Template.diningCourt.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    'submit .sortReviews': function(event, template) {
        event.preventDefault();
        var sortType = template.find('#diningSortReviews').value;
        Session.set('sortType', sortType);
    },

    'click .usernameProfileLink' : function(event) {
        event.preventDefault();
        var userId = this.userId;
        var preUsername = Meteor.users.findOne(userId);
        var userName = preUsername.profile.username;
        if (preUsername.profile.usernameBool === 1) {
            if (userName != "" && userName != "Anonymous" && userName != "anonymous") {
                Router.go("/profiles/" + userName);
            }
        }
    },

    'click .addReview': function(event, template) {
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

    'submit .makeReview' : function(event, template) {
      event.preventDefault();
        var reviewText = event.target.makeReview.value;
        var foodQuality = event.target.foodQuality.value;
        var health = event.target.health.value;
        var starRating = event.target.star.value;
        var currentUser = Meteor.userId();
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var diningId = Dining.findOne({"name": this.toString()})._id;
        DiningReview.insert({
            diningId: diningId,
            userId: currentUser,
            date: currentDate,
            review: reviewText,
            foodQualityRating: foodQuality,
            healthRating: health,
            starRating: starRating,
            upvotes: 0,
            month: month,
            year: year
        });
        var modal = template.find('.Modal');
        modal.style.display = "none";
        event.target.makeReview.value = "";
        event.target.foodQuality.value = 1;
        event.target.health.value = 1;
        event.target.star.value = 1;
    },

    'click .editReviewButton': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        var textField = template.find('.editReviewText');
        var quality = template.find('#editDiningQuality');
        var health = template.find('#editDiningHealth');
        var star = template.find('#editDiningStar');
        textField.value = this.review;
        quality.value = this.foodQualityRating;
        health.value = this.healthRating;
        star.value = this.starRating;
        modal.style.display = 'block';
        editDiningThisStorage = this;

    },

    'click .editclose': function(event, template) {
        event.preventDefault();
        var modal = template.find('.editModal');
        modal.style.display = "none";
    },

    'submit .editReview': function(event, template) {
        event.preventDefault();
        var reviewText = event.target.editReview.value;
        var quality = event.target.foodQuality.value;
        var health = event.target.health.value;
        var star = event.target.star.value;
        DiningReview.update(editDiningThisStorage._id, {
            $set: {"review": reviewText, "foodQualityRating": quality, "healthRating": health, "starRating": star}
        });

        var modal = template.find('.editModal');
        modal.style.display = "none";
    }
});

Template.courseVoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        var courseVote = CourseVotes.findOne({"userId": Meteor.userId(), "reviewId": this._id});
        CourseVotes.remove(courseVote._id);
        var currentReview = CourseReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes-1;
        CourseReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.courseUnvoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        CourseVotes.insert({
            userId: Meteor.userId(),
            reviewId: this._id
        });
        var currentReview = CourseReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes+1;
        CourseReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.internVoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        var internVote = InternshipVotes.findOne({"userId": Meteor.userId(), "reviewId": this._id});
        InternshipVotes.remove(internVote._id);
        var currentReview = InternReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes-1;
        InternReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.internUnvoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        InternshipVotes.insert({
            userId: Meteor.userId(),
            reviewId: this._id
        });
        var currentReview = InternReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes+1;
        InternReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.clubVoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        var clubVote = ClubVotes.findOne({"userId": Meteor.userId(), "reviewId": this._id});
        ClubVotes.remove(clubVote._id);
        var currentReview = ClubReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes-1;
        ClubReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.clubUnvoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        ClubVotes.insert({
            userId: Meteor.userId(),
            reviewId: this._id
        });
        var currentReview = ClubReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes+1;
        ClubReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.diningVoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        var diningVote = DiningVotes.findOne({"userId": Meteor.userId(), "reviewId": this._id});
        DiningVotes.remove(diningVote._id);
        var currentReview = DiningReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes-1;
        DiningReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.diningUnvoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        DiningVotes.insert({
            userId: Meteor.userId(),
            reviewId: this._id
        });
        var currentReview = DiningReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes+1;
        DiningReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.dormVoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        var dormVote = ResVotes.findOne({"userId": Meteor.userId(), "reviewId": this._id});
        ResVotes.remove(dormVote._id);
        var currentReview = ResReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes-1;
        ResReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.dormUnvoted.events({
    'click .arrows': function(event) {
        event.preventDefault();
        ResVotes.insert({
            userId: Meteor.userId(),
            reviewId: this._id
        });
        var currentReview = ResReview.findOne({"userId": this.userId, "review": this.review, "date": this.date});
        var currentUpvotes = currentReview.upvotes;
        var newUpvotes = currentUpvotes+1;
        ResReview.update(currentReview._id, {
            $set: {"upvotes": newUpvotes}
        });
    }
});

Template.coursesDelete.events({
    'click .deleteReviewButton': function(event) {
        event.preventDefault();
        var userId = this.userId;
        var dateId = this.date;
        var removedReview = CourseReview.findOne({"userId": userId, "date":dateId});
        CourseReview.remove(removedReview._id);
    }
});

Template.internshipsDelete.events({
    'click .deleteReviewButton': function(event) {
        event.preventDefault();
        var userId = this.userId;
        var dateId = this.date;
        var removedReview = InternReview.findOne({"userId": userId, "date":dateId});
        InternReview.remove(removedReview._id);
    }
});

Template.clubsDelete.events({
    'click .deleteReviewButton': function(event) {
        event.preventDefault();
        var userId = this.userId;
        var dateId = this.date;
        var removedReview = ClubReview.findOne({"userId": userId, "date":dateId});
        ClubReview.remove(removedReview._id);
    }
});

Template.diningDelete.events({
    'click .deleteReviewButton': function(event) {
        event.preventDefault();
        var userId = this.userId;
        var dateId = this.date;
        var removedReview = DiningReview.findOne({"userId": userId, "date":dateId});
        DiningReview.remove(removedReview._id);
    }
});

Template.dormsDelete.events({
    'click .deleteReviewButton': function(event) {
        event.preventDefault();
        var userId = this.userId;
        var dateId = this.date;
        var removedReview = ResReview.findOne({"userId": userId, "date":dateId});
        ResReview.remove(removedReview._id);
    }
});

Template.publicProfile.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },
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
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var courseId = Course.findOne({"Abbreviation": this[0], "Number": Number(this[1])})._id;
        var reviews;
        if (Session.get('sortType') == "newest") {
            reviews = CourseReview.find({"course": courseId}, {sort: {"date": -1}});
        }
        else if (Session.get('sortType') =="oldest") {
            reviews = CourseReview.find({"course": courseId});
        }
        else if (Session.get('sortType') =="top") {
            reviews = CourseReview.find({"course": courseId}, {sort: {"upvotes": -1}});
        }
        else if (Session.get('sortType') == "month") {
            reviews = CourseReview.find({"course": courseId, "month": month, "year": year}, {sort: {"date": -1}});
        }
        else {
            reviews = CourseReview.find({"course": courseId}, {sort: {"date": -1}});
        }
        return reviews;
    },

    'printCourse': function() {
        return this[0] + ' ' + this[1];
    },

    printDate: function() {
        var date = this.date;
        var format = moment(date).format('l LT');
        return format;
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
    },

    getCourseUpvote: function() {
        var userId = Meteor.userId();
        var reviewId = this._id;
        var upvoteStatus = CourseVotes.findOne({"userId": userId, "reviewId":reviewId});
        if (upvoteStatus == undefined) {
            return false;
        }
        return true;
    },

    getUpvoteCount: function() {
        var reviewId = this._id;
        var reviewLength = CourseVotes.find({"reviewId": reviewId}).count();
        return reviewLength;

    },

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (user == undefined){
            return false;
        }
        return true;
    },

    getCurrentUser: function() {
        var userId = Meteor.userId();
        var user = this.userId;
        if (user === userId) {
            return true;
        }
        return false;
    },
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
       var currentDate = new Date();
       var split = currentDate.toLocaleDateString().split("/");
       var month = split[0];
       var year = split[2];
       var internId = Internship.findOne({"name": this.toString()})._id;
       var reviews;
       if (Session.get('sortType') == "newest") {
           reviews = InternReview.find({"internship": internId}, {sort: {"date": -1}});
       }
       else if (Session.get('sortType') =="oldest") {
           reviews = InternReview.find({"internship": internId});
       }
       else if (Session.get('sortType') =="top") {
           reviews = InternReview.find({"internship": internId}, {sort: {"upvotes": -1}});
       }
       else if (Session.get('sortType') == "month") {
           reviews = InternReview.find({"internship": internId, "month": month, "year": year}, {sort: {"date": -1}});
       }
       else {
           reviews = InternReview.find({"internship": internId}, {sort: {"date": -1}});
       }
       return reviews;
   },

    printDate: function() {
        var date = this.date;
        var format = moment(date).format('l LT');
        return format;
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
    },

    getUpvote: function() {
        var userId = Meteor.userId();
        var reviewId = this._id;
        var upvoteStatus = InternshipVotes.findOne({"userId": userId, "reviewId":reviewId});
        if (upvoteStatus == undefined) {
            return false;
        }
        return true;
    },

    getUpvoteCount: function() {
        var reviewId = this._id;
        var reviewLength = InternshipVotes.find({"reviewId": reviewId}).count();
        return reviewLength;
    },

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (user == undefined){
            return false;
        }
        return true;
    },

    getCurrentUser: function() {
        var userId = Meteor.userId();
        var user = this.userId;
        if (user === userId) {
            return true;
        }
        return false;
    },
});

Template.club.helpers({
    getReviews: function() {
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var clubId = Club.findOne({"name": this.toString()})._id;
        var reviews;
        if (Session.get('sortType') == "newest") {
            reviews = ClubReview.find({"club": clubId}, {sort: {"date": -1}});
        }
        else if (Session.get('sortType') =="oldest") {
            reviews = ClubReview.find({"club": clubId});
        }
        else if (Session.get('sortType') =="top") {
            reviews = ClubReview.find({"club": clubId}, {sort: {"upvotes": -1}});
        }
        else if (Session.get('sortType') == "month") {
            reviews = ClubReview.find({"club": clubId, "month": month, "year": year}, {sort: {"date": -1}});
        }
        else {
            reviews = ClubReview.find({"club": clubId}, {sort: {"date": -1}});
        }
        return reviews;
    },

    printDate: function() {
        var date = this.date;
        var format = moment(date).format('l LT');
        return format;
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
    },

    getUpvote: function() {
        var userId = Meteor.userId();
        var reviewId = this._id;
        var upvoteStatus = ClubVotes.findOne({"userId": userId, "reviewId":reviewId});
        if (upvoteStatus == undefined) {
            return false;
        }
        return true;
    },

    getUpvoteCount: function() {
        var reviewId = this._id;
        var reviewLength = ClubVotes.find({"reviewId": reviewId}).count();
        return reviewLength;
    },

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (user == undefined){
            return false;
        }
        return true;
    },

    getCurrentUser: function() {
        var userId = Meteor.userId();
        var user = this.userId;
        if (user === userId) {
            return true;
        }
        return false;
    },
});

Template.dorm.helpers({
    getReviews: function() {
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var dormId = ResHall.findOne({"name": this.toString()})._id;
        var reviews;
        if (Session.get('sortType') == "newest") {
            reviews = ResReview.find({"resHall": dormId}, {sort: {"date": -1}});
        }
        else if (Session.get('sortType') =="oldest") {
            reviews = ResReview.find({"resHall": dormId});
        }
        else if (Session.get('sortType') =="top") {
            reviews = ResReview.find({"resHall": dormId}, {sort: {"upvotes": -1}});
        }
        else if (Session.get('sortType') == "month") {
            reviews = ResReview.find({"resHall": dormId, "month": month, "year": year}, {sort: {"date": -1}});
        }
        else {
            reviews = ResReview.find({"resHall": dormId}, {sort: {"date": -1}});
        }
        return reviews;
    },

    printDate: function() {
        var date = this.date;
        var format = moment(date).format('l LT');
        return format;
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
    },

    getUpvote: function() {
        var userId = Meteor.userId();
        var reviewId = this._id;
        var upvoteStatus = ResVotes.findOne({"userId": userId, "reviewId":reviewId});
        if (upvoteStatus == undefined) {
            return false;
        }
        return true;
    },

    getUpvoteCount: function() {
        var reviewId = this._id;
        var reviewLength = ResVotes.find({"reviewId": reviewId}).count();
        return reviewLength;
    },

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (user == undefined){
            return false;
        }
        return true;
    },

    getCurrentUser: function() {
        var userId = Meteor.userId();
        var user = this.userId;
        if (user === userId) {
            return true;
        }
        return false;
    },
});

Template.diningCourt.helpers({
    getReviews: function() {
        var currentDate = new Date();
        var split = currentDate.toLocaleDateString().split("/");
        var month = split[0];
        var year = split[2];
        var diningId = Dining.findOne({"name": this.toString()})._id;
        var reviews;
        if (Session.get('sortType') == "newest") {
            reviews = DiningReview.find({"diningId": diningId}, {sort: {"date": -1}});
        }
        else if (Session.get('sortType') =="oldest") {
            reviews = DiningReview.find({"diningId": diningId});
        }
        else if (Session.get('sortType') =="top") {
            reviews = DiningReview.find({"diningId": diningId}, {sort: {"upvotes": -1}});
        }
        else if (Session.get('sortType') == "month") {
            reviews = DiningReview.find({"diningId": diningId, "month": month, "year": year}, {sort: {"date": -1}});
        }
        else {
            reviews = DiningReview.find({"diningId": diningId}, {sort: {"date": -1}});
        }

        return reviews;
    },

    printDate: function() {
        var date = this.date;
        var format = moment(date).format('l LT');
        return format;
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
    },

    getUpvote: function() {
        var userId = Meteor.userId();
        var reviewId = this._id;
        var upvoteStatus = DiningVotes.findOne({"userId": userId, "reviewId":reviewId});
        if (upvoteStatus == undefined) {
            return false;
        }
        return true;
    },

    getUpvoteCount: function() {
        var reviewId = this._id;
        var reviewLength = DiningVotes.find({"reviewId": reviewId}).count();
        return reviewLength;
    },

    getAdmin: function() {
        var email = Meteor.user().emails[0].address;
        var user = AdminAccounts.findOne({"email": email});
        if (user == undefined){
            return false;
        }
        return true;
    },

    getCurrentUser: function() {
        var userId = Meteor.userId();
        var user = this.userId;
        if (user === userId) {
            return true;
        }
        return false;
    },
});

Template.publicProfile.helpers({
    getUsername: function() {
        return this.profile.username;
    },

    getUniversity: function() {
        return this.profile.university;
    },

    getPublicMajor: function() {
        var public = this.profile.majorBool;
        if (public == 1) {
            return true;
        }
        return false;
    },

    getMajor: function() {
        return this.profile.major;
    },

    getPublicGradDate: function() {
        var public = this.profile.gradDateBool;
        if (public == 1) {
            return true;
        }
        return false;
    },

    getGradDate: function() {
        return this.profile.gradDate;
    }
});
