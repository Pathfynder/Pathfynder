//The Collections
Course = new Mongo.Collection('course');
CourseReview = new Mongo.Collection('courseReview');
Internship = new Mongo.Collection('internship');
InternReview = new Mongo.Collection('internReview');
ResHall = new Mongo.Collection('resHall');
ResReview = new Mongo.Collection('resReview');
Dining = new Mongo.Collection('dining');
DiningReview = new Mongo.Collection('diningReview');
Club = new Mongo.Collection('club');
ClubReview = new Mongo.Collection('clubReview');
Departments = new Meteor.Collection('departments');
Courses = new Meteor.Collection('courses');

CourseVotes = new Meteor.Collection('courseVotes');
DiningVotes = new Meteor.Collection('diningVotes');
InternshipVotes= new Meteor.Collection('IntershipVotes');
ClubVotes = new Meteor.Collection('clubVotes');
ResVotes = new Meteor.Collection('resVotes');
AdminAccounts = new Meteor.Collection('adminAccount');
Semesters = new Meteor.Collection('semesters');


//Schemas

Course.schema = new SimpleSchema({
    Title: {type: String},
    Number: {type: Number},
    Abbreviation: {type: String},
    AvgWorkloadRating: {type: Number},
    AvgDifficultyRating: {type: Number},
    AvgUtilityRating: {type: Number}
});

CourseReview.schema = new SimpleSchema({
    course: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    difficultyRating: {type: Number},
    workloadRating: {type: Number},
    utilityRating: {type: Number},
    upvotes: {type: Number},
    month: {type: String},
    year: {type: String},
    semester: {type: String}
});

Internship.schema = new SimpleSchema({
    name: {type: String},
    avgInterviewRating: {type: Number},
    avgDifficultyRating: {type: Number},
    avgUtilityRating: {type: Number}
});

InternReview.schema = new SimpleSchema({
    internship: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    interviewRating: {type: Number},
    workloadRating: {type: Number},
    utilityRating: {type: Number},
    upvotes: {type: Number},
    month: {type: String},
    year: {type: String}
});

ResHall.schema = new SimpleSchema({
    name: {type: String},
    location: {type: String},
    avgStarRating: {type: Number}
});

ResReview.schema = new SimpleSchema({
    resHall: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    starRating: {type: Number},
    upvotes: {type: Number},
    month: {type: String},
    year: {type: String}
});

Club.schema = new SimpleSchema({
    name: {type: String},
    avgTimeRating: {type: Number},
    avgUtilRating: {type: Number}
});

ClubReview.schema = new SimpleSchema({
    club: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    timeRating: {type: Number},
    utilityRating: {type: Number},
    upvotes: {type: Number},
    month: {type: String},
    year: {type: String}
});

Dining.schema = new SimpleSchema({
    name: {type: String},
    location: {type: String},
    avgStarRating: {type: Number},
    avgFoodQualityRating: {type: Number},
    avgHealthRating: {type: Number}
});

DiningReview.schema = new SimpleSchema({
    diningId: {type: Meteor.Collection.ObjectID},
    userId: {type: Meteor.Collection.ObjectID},
    date: {type: Date},
    review: {type: String},
    foodQualityRating: {type: Number},
    healthRating: {type: Number},
    starRating: {type: Number},
    upvotes: {type: Number},
    month: {type: String},
    year: {type: String}
});

CourseVotes.schema = new SimpleSchema({
    userId: {type: Meteor.Collection.ObjectID},
    reviewId: {type: Meteor.Collection.ObjectID}
});

DiningVotes.schema = new SimpleSchema({
    userId: {type: Meteor.Collection.ObjectID},
    courseId: {type: Meteor.Collection.ObjectID},
    reviewId: {type: Meteor.Collection.ObjectID}
});
InternshipVotes.schema = new SimpleSchema({
    userId: {type: Meteor.Collection.ObjectID},
    courseId: {type: Meteor.Collection.ObjectID},
    reviewId: {type: Meteor.Collection.ObjectID}
});
ClubVotes.schema = new SimpleSchema({
    userId: {type: Meteor.Collection.ObjectID},
    courseId: {type: Meteor.Collection.ObjectID},
    reviewId: {type: Meteor.Collection.ObjectID}
});
ResVotes.schema = new SimpleSchema({
    userId: {type: Meteor.Collection.ObjectID},
    courseId: {type: Meteor.Collection.ObjectID},
    reviewId: {type: Meteor.Collection.ObjectID}
});
AdminAccounts.schema = new SimpleSchema({
    email: {type: String}
});

Semesters.schema = new SimpleSchema({
   semester: {type: String},
   date: {type: Date}
});
