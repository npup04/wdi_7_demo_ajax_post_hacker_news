//Assignment:
// modify this file so that on index.html,
// a visitor can:
//  - see a list of all the users,
//  - fill out a form to create a new user, hit submit,
// and see the new user added to the list of users

var HackerApp = HackerApp || {};

HackerApp.create_a_user = function(event){
  event.preventDefault(); //prevent the default behavior of submit button
    $.ajax({
    url: 'http://ig-hacker-news.herokuapp.com/users',
    type: 'POST',
    dataType: 'JSON',
    data:
      {user: {
        name: $('#name').val(),
        about: $('#about').val(),
        email: $('#email').val()
        }
      }
  })
  .done(function(results) {
    // console.table(results);
    // HackerApp.show_user(results); //works w/ users in ascending order
    // HackerApp.get_all_users(results); //doesn't work, isn't showing newly added user in list
    HackerApp.prepend_user(results);  //works, prepend the new user to the top of the descending sorted list
    console.log("New user added!!!");
  });

}; //end HackerApp.create_a_user

HackerApp.get_all_users = function(users){
  //sorter function, sort users in descending order
  function _sorter(a,b) {
    return (b.id) - (a.id);
  };
  var sorted_users = users.sort(_sorter);

  //iterate users
  for(var i = 0; i < sorted_users.length; i++){
    HackerApp.show_user(sorted_users[i]);
  };//end for
};//end HackerApp.get_all_users

HackerApp.show_user = function(user){
  $('#all_users').append(user.id + ' | ');
  $('#all_users').append(user.name + ' | ');
  $('#all_users').append(user.about + ' | ');
  $('#all_users').append(user.email + '<br>');
};

//display newly added user at top of list
HackerApp.prepend_user = function(user){
  $('#all_users').prepend(' <br> ');
  $('#all_users').prepend(user.email);
  $('#all_users').prepend(user.about + ' | ');
  $('#all_users').prepend(user.name + ' | ');
  $('#all_users').prepend(user.id + ' | ');
};

$(document).ready(function() {
  $.ajax({
    url: 'http://ig-hacker-news.herokuapp.com/users',
    type: 'GET'
  })
  .done(function(results) {
    // console.log("here are all the users in my database")
    // console.table(results);
    console.log("GET success");
    console.log(results);
    HackerApp.get_all_users(results);

  });

  $('#submit').on('click', HackerApp.create_a_user);

});
