# Trilogy-Group-Project-2 - Space your Problems (working title)

## API Reference

### Users

(review whether we even need get requests for user information, probably not?)
- Get all users /api/users/
returns an array of objects containing id's and emails (probably shouldn't return emails without auth)
- Get single user /api/user/id#
returns a single object containing id and email
- Post /api/users/
create a user account, expects json
{
  "email":"example@email.com",
  "password":"goodpassword"
}
- Put /api/users/id# (this probably wants to live in dashboard specific routes with authorization later)
updates user at said id with a new email or password or both, whatever the json in body contains
- Post /api/users/login
expects a json {"email":"example@email.com", "password":"goodpassword"} begins a login session, sets session.loggedIn true and returns a success message on success, error on failure
- Post /api/users/logout
requires no body, destroys the current session
- Delete /api/users/id#
Deletes user at given id

### Posts

('like' metric tracking is err...bad right now. to be fixed)
- Get all posts /api/posts/
Returns an array containing all posts with their id, text, user information and an array of ids that have liked
- Get single post /api/posts/id#
Returns a single post as an object containing id, text, user information and an array of ids that have liked the post
- Post /api/posts/ - Expects json {"text":"big example post", "user_id":1}
Adds a post to the db
- Put /api/posts/like/ - expects json {"user_id":1, "post_id":1}
creates an entry in the like database linking a user to a post
- Put /api/posts/id# - expects json {"text":"updated post example"}
updates a post at the id
- Delete /api/posts/id#
Deletes post at given id

live server available at: https://spaced-problems.herokuapp.com/

Running the server locally requires a .env file with the following information:
SECRET='a secret'
DB_USER='root'
DB_PW='password'
DB_NAME='space_problems_db'

Where DB_ variables are your local SQL credentials and an existing database. Secret can be anything, more important for when the page is live.

## Temporary Home for Project Aims

The below will be rewritten and migrate to a more appropriate home shortly.

'Space your problems' aims to be a mental health anti-social social media web app.

A general idea of the project can be surmised by the user story:
- As a user I can:
  - Make a post about a problem, feeling etc. in confidence
  - I can see how many other users have indicated that they also experience the contents of my posts
  - View posts from other users and indicate whether I experience the contents of a post
  - Hide and/or Delete posts I have made
  - Close my account and by extension hide/delete my posts
- As a moderator I can:
  - View all posts currently flagged as reported
  - Hide and/or delete posts
  - Flag a user as having broken ToS previously
  - Ban a user account upon too many ToS violations

The idea behind space your problems is not to replace therapy or other professional assistance services, in fact the web app should promote utilizing these services to help with problems, promotion of suicide prevention hotlines would also likely be sensible for a web app like this. The space the app is envisioned to occupy is one of a sort of catharsis tool, a user may vent/be vulernable in a safe environment and have the opportunity to feel validated as well.
