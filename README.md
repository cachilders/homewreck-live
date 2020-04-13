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
** 4th select adjacent to submit for num votes to cast with options selected
** form POST => /vote { 3, 2, 1, email_salty }
* query params
** error
** message

API /stories
* 200 response { stories }

API /user
* 200 response { num_votes }
* 400 redirect => redirect to /?error=<error>&message=<message>

API /vote
* 200 respone => redirect to /ballot || /thank_you
* 400 respone => redirect to /ballot?error=<error>&message=<message>

FE /thank_you
* thank you for voting page when done with voting