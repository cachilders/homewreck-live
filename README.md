Just a shell a la https://zeit.co/guides/deploying-next-and-mysql-with-now

node 8 apparently

...

FE /
* form POST => /login { email }
* query params
** error
** message

API /login
* 200 respone => redirect to /ballot?email=<email_salty> || /thank_you
* 400 response => redirect to /?error=<error>&message=<message>

FE /ballot?email=<email_salty>
* GET request from /user?email=<email_salty>
* GET request from /stories
** present form with 3 different select/options
A plan is just a list of things that won't happen.