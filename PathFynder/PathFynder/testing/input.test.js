console.log("Hello node");


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
    for(i = 0; i < 20; i++){
    CourseReview.remove({"course": i});
      if (rem == undefined){
        throw 'CourseNotFoundError';
      };
      //console.log(ret);
    };
    for(i = 0; i < 20; i++){
      var ret = CourseReview.findOne({"course": i});
      if (ret != undefined){
        throw 'CourseNotRemovedError';
      };
    };
  });

});
CourseReview.rawCollection().drop();
