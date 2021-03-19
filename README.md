USER END POINTS
----- Get a list of users - http://localhost:5000/ -----

Provides a list of all active users in the app

----- Create a new user - http://localhost:5000/createUser -----

MUST provide req.body.username. This will be the new users username.
--------------------------------------------------



---------- TWEET END POINTS ----------
----- Get a list of a users tweets - http://localhost:5000/tweet?tweeter=Viggo -----

GET request

MUST provide a QUERY PARAMETER of the user you want tweets for
example - ?tweeter=username


----- Add a tweet for a user - http://localhost:5000/tweet?tweeter=Viggo -----

PUT request

MUST provide a QUERY PARAMETER for the person sending the tweet
example - ?tweeter=username

MUST provde a req.body.tweet containing the users tweet
--------------------------------------------------



---------- FOLLOW END POINTS ----------
----- Follow or unfollow a user - http://localhost:5000/follow?toBeFollowed=Viggo -----

PUT request

MUST provide a QUERY PARAMETER of the person who will be followed or unfollowed
example - ?toBeFollowed=Viggo

MUST provide req.body.follower of the person attempting to follow or unfollow the user

The end-point will first check to see if they user is already following. If so, it will unfollow, otherwise, the new follower will be added to the follower list.


----- Get a list of followers for a user - http://localhost:5000/follow?username=Viggo -----

GET request 

MUST provide a QUERY PARAMETER of the person you want a follower list for
example - ?username=Viggo
--------------------------------------------------
