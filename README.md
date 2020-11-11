# Blue host pet site using "Create React App"

UPDATE 11/10/2020
----------------------------------------------------------------

I have made modifications for the following:
  - The Pets dashboard now has the following abilities:
    - Dog information is now stored client side using IndexedDB.  IndexedDB was chosen for the ability to scale if the app becomes more heavily used.  The other considered options was storing information through local files or using Web Storage (localStorage) or Session Storage.
    - The dashboard now pulls/modifies information by who the user was.  Example:  Joe's dogs won't be displayed with Emily's dogs.
    - The ability to add a dog and to modify the details of a dog is now available.
  - Some simple unit testing was added.  It was mainly for the Login component.  There isn't a ton of unit testing in the project. Just enough to prove that I am capable of setting that up.  These test can be run using "npm run test".  I was trying to create some unit tests for the PetsDashboard component, but IndexedDB kinda made it more complex and actually more of a integration test.  We can discuss unit tests further if you would like.
  - The react version used to be 17, I have down graded it to 16 for better unit testing support.

----------------------------------------------------------------

For the take home exercise, I have developed the following in the required three hour time frame:
  - a functional react app
  - a login page
  - a pets dashboard
  - a link for each page that displays a modal of their details
  - a page header consistent for the whole site that displays the user's username once authenticated

Some quirky things about whats going on right now with the site:
  - nothing was actually coded to reflect connecting the api/endpoints due to not getting clarification in time about how that should be handled.  But the data is modeled in a similar way that would be easy to finish coding in the api.
  - user authentication is not really done correctly for production obviously.  All it takes is a username and password that are at least one character long and will authenticate from there.
  - data done in the dashboard is hard coded data.  This means its the same dogs for any user.
  
Aspects of the project that I didn't finish:
  - potentially coding for api? Not sure what was required for that.
  - ability to add new dog
  - ability to edit existing dog
  - using "Hello, {first name}", I forgot about using "Hello" mainly because I got carried away coding and didn't come back to check the requirements on that.
  
What I would do given more time:
  - login could be a bit more secure.  Right now it stores username and password in state.  We really don't want to store that password.  There would also be code to send this info to the server to authenticate (via api).
  - ability to add new dog and edit existing dog would probably be built in to the pop up modal.  This data would also be synced with a database.  This would also be changed so that pet information is grouped by user instead of the same pet data for any user.
  - unit/integration testing
  - redux would also be built in to help with state management
  - "Create React App" was used for ease of project creation.  I would probably created a project through express.js instead.
  
How to test the app:
  - make sure you have at least Node.js >= 8.10 and npm >= 5.6
  - get the project from github and in the terminal you should change your directory to wherever you have this project at
  - run "npm install" in terminal, this will install all dependencies
  - run "npm start" in terminal, this will pop up the site through the local host.
  - now you can test the views.
  
Technologies used:
  - React
  - Javascript
  - HTML
  - CSS
  - Material UI 
  - Json
  
Time allocation:
  - project setup: 30 minutes
  - Login component: 1 hour
  - PetsDashboard component: 30 minutes
  - PetDetails modal: 30 minutes
  - UI/UX cleanup: 30 minutes
