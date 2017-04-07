console.log("Hello node");
//import { Meteor } from 'meteor/meteor';
CourseReview = new Mongo.Collection("testCourseReview");

describe("Course Reviews", function(){
  it("Successful addition of reviews to Courses", function() {
    for(i = 0; i < 20; i++){
      CourseReview.insert({
          course: i,
          userId: 1,
          date: new Date(),
          review: "This is test review number " + i,
          difficultyRating: 5,
          workloadRating: 5,
          utilityRating: 5
      });
    };
    for(i = 0; i < 20; i++){
      var ret = CourseReview.findOne({"course": i});
      if (ret == undefined){
        throw 'CourseNotFoundError';
      };
      //console.log(ret);
    };
  });

  it("Successful Removal of prebious reviews to Courses", function() {
    //var ret = CourseReview.findOne({"course": i});
    for(i = 0; i < 20; i++){
      var ret = CourseReview.findOne({"course": i});
      var rem = CourseReview.remove(ret._id);
      console.log(rem);
      if (rem == undefined){
        throw 'CourseNotFoundError';
      };
      //console.log(ret);
    };
    for(i = 0; i < 20; i++){
      var ret = CourseReview.findOne({"course": i});
      console.log(ret);
      if (ret != undefined){
        throw 'CourseNotRemovedError';
      };
    };
  });



/*
  it("User Creation Verification", function(){
    console.log("Creating single user with proper entry syntax...");
    var check0 = addUser("person@purdue.edu", "password");

    console.log("checking previously registered email error");
    var check1 = addUser("person@purdue.edu", "password");
    var user = meteor.users.findOne({"email": "person@purdue.edu"});
    Meteor.user.remove(user._id);
    console.log("checking non '*purdue.edu' email error");
    var check2 = addUser("person@indana.edu", "password");

    console.log("checking other? email error");
    var check3 = addUser("person@purdue.edu", "password");

    console.log("checking non *.edu email error");
    var check4 = addUser("person@purdue.com", "password");

    if (check0 != 0){
      throw 'ProperAdditonTestFail';
    } else if (check1 != 1) {
      throw 'ReRegisterTestFail';
    } else if (check2 != 2) {
      throw 'PurdueEmailTestFail';
    } else if (check3 != 3) {
      throw 'OtherTestFail';
    } else if (check4 != 4){
      throw 'eduSuffixTestFail';
    };

  });

  function addUser(email, password){
    if(!validateEmail(email)) {
        if(!email.endsWith(".edu")) {
            alert("Must be a .edu account!")
            //window.location.reload();
            //throw 'nonEduEmailError';
            return 4;
        }
    }
    Accounts.createUser({
        email: email,
        password: password
    }, function(err) {
        if (err) {
            if (err.reason === "Email already exists.") {
                //alert("User already exists!");
                //window.location.reload();
                return 1;
            } else if (err.reason === "@purdue.edu email required") {
                alert("Purdue Edu email required!");
                //window.location.reload();
                return 2;
            } else {
                console.log(err.reason);
                alert("Something went wrong! Use a Purdue email.")
                //window.location.reload();
                return 3;
            }
        } else {
            console.log("Registration successfull");
            return 0;
            // Success. Account has been created and the user
            // has logged in successfully.
        }
    });
  };

  function validateEmail(email) {
      var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return re.test(email);
  }
*/
});
CourseReview.rawCollection().drop();
