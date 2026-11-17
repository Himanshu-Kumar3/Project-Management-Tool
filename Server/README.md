# This is a repo for server


# For server
- install Express for the server
- install mongoose for database
- install nodemon for autoupdating the server when we save
- Create model for user and workspace 
- install bcrypt for encrypting the password
- install jwt for creating the token 
- installs validator to validate the user data
- installs cookie-parser to parse the cookies we get from the req 



- using express.Router() created routes for :-
 - authRouter 
  - Signup
    - get the details
    - validate the user details
    - encrypt the user password using bcrypt.hash(Password , saltnumber) 
    - created a document of the specific Model
    - save it to the database

  - Login
   - verify user & check if it is present in the db or not
   - verify password using bcrypt.verify(userpassword , passwordhash)
   - create a token using jwt.sign({_id , user._id} , "Secret" , {methods})
   - assign it into cookies
   - sent back the user

  - logout
   - set the cookie to null && expire to now()


- userRouter()
  - created post createWorkspace && get getWorkspaces methods && addMember Method

- projectRouter()
 - created post createProject && post editProject && post addMember && get getProject   


