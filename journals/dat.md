<!-- September 11,  2023 -->

Group:  Due Date!!! Finished Deployment from last week. Today we verified as a group all components are working form backend to frontend. Clean up a little of code and discuss a potential AboutUs page for stretch goals. We added a little bit of styling to our main page and adjusted the nav bar to display certain links for login users. We also worked on Readme.md file and made sure the Excalidraw and endpoints input/output are included. Very proud of the work we done as a team!

<!-- September 8,  2023 -->

Group:  As a group we started our backend deployment today. So far no major blockers. We adjusted our gitlab.yml and docker yaml file as needed. We are following the lecture notes provided by Rosheen. After completing as much deployment as possible, I plan on going back and cleaning some of my code to pass the lint pipeline.

self: Worked on error handling for Attendees routers and queries. Beginning to make sure dead codes are taken out.

<!-- September 7,  2023 -->

Self:  Today, I finish my logic for checking if an attendee has already attend an event. If the current user_id matches the event_id a state named shouldBedisbaled becomes true and the button attend would be disabled and cannot be pressed. I am planning on putting two of my async functions into one function so that I can pass both async function into one onClick.

Self: Added two extra states to manages the Attend button ---> Already Attending and color from Green --> Gray

Group: Started looking into Deployment

<!-- September 6,  2023 -->

Self: My ah-ha moments today was being able to unhashed the token retrieving the current user Id from fetchWithToken. The issue I am having now is creating another state that hold the current rsvp and passing that into my EventCard components. I am planning on working on the logic today that checks for current login user id in the attendees table.

<!-- September 5,  2023 -->

Self: Minor block on how to get current user's info in order to filter for matching event_id to disable attending button. I could  fetch from user's endpoint for current user data but trying to avoid that since I can extract current user Id with fetchWithToken. After lunch, I plan on refactoring components to try and work with getting current user id.

<!-- September 1,  2023 -->

Self: Started on disabling button so that attendee cannot attend the same event more than once. Two possible way to approaching the problem. Fetch and filter to an endpoint or check table if user_id matches event_id. I will work on this feature for the rest of the day.

Group: Marcus's Delete function should reactivate attending button should the attendee decides to attend the event again after cancellation.

<!-- August 31,  2023 -->

Group: Discussed new tables and how data should be received and validated through Pydantic model.

self: Works on unit test trying to get mock token. Having a minor blocker regarding creating mock data and mock token. Possibly will switch to GET to make it more simple.

<!-- August 30,  2023 -->

Self: Today I revisted my Signup Form and added in a navigate feature that would navigate the new user to their profile page. I created a new branch called Dat-branch and planning to merge sometimes today if i have time.

Group: Today our group decided to omit one field from our table to make the project meet the MVP. We will be working on updating endpoints and hopefully end the day with completing one unit test.

self: I completed two unit tests for the day meeting this week checkpoints. I also realize that when a user is created it does not automatically log the user in through the front-end. I will working on that feature for the rest of the day.

<!-- August 29,  2023 -->

Self: I was able to restructure the EventCard page to reload automatically by passing in loadData in EventCard component as a prop. I alo updated query to order by the Id so that the EventCard position does not change once the state is reload. I created a Merge request and was approved.

Group: As a group we discussed an additional two tables in order to be able to track user and events. We requested Zach's help with our table and everything checks out. We are planning to revamp our backend end points tomorrow and do unit testing.

<!-- August 28,  2023 -->

Self: Ran into a blocker and getting a 422 Error. I suspect that I am hitting my proper endpoint successfully but the data being sent is in not the correct format. My ah-ha moment is realizing that i have to send in all proper field matching out pydantic model even if I only need to update one field(num_of_attendees). Planning to restructure the rest of the code so page state reload automatically and the cards do not change every time a user click and updates the num_of_attendees.


<!-- August 26,  2023 -->

Self: I continued working on the EventCard layout and solved the issues with the layout using display of flex and flex-wrap. I also implemented two button at the bottom of the card in the footer. Planning to implement number of attendee update once user click attending button.



<!-- August 25,  2023 -->

Self: Started design for EventsCard layout page. Ran into a small blocker on getting thr correct card layout. Expecting to finish layout without functionality by 8/27/2023



<!-- August 24,  2023 -->

Self: Worked on front end. Created the user signup form and successfully sent data back to the back end! My ah-ha moment was forgetting to import the link in index html for bootstrap.


<!-- August 23,  2023 -->

Self: I worked on protecting Events endpoints for POST/DELETE/PUT. Planning to start on frontend by tomorrow and have at least one form completed.



<!-- August 22,  2023 -->

Group: Worked on backend auth. Solved blocker from aug/21/2023. Expected to fully implement auth by the end of day. Successfully with Zach's help we completed our backend Auth. Will be working to make protected endpoints.


<!-- August 21,  2023 -->

Group: Started on Backend Auth. Hit a blocker getting error on Auth setup. The error we are encountering is psycopg.errors.InvalidTextRepresentation: invalid input syntax for type integer: "corbeno"
CONTEXT:  unnamed portal parameter $1 = '...'

<!-- August 17,  2023 -->

Self: I worked on Event endpoints for GET and DELETE. Tested endpoints on FastAPI got 200 response.

<!-- August 16, 2023 -->

Self: I worked on the creating class EventQueries and the appropriate methods.

<!-- August 15, 2023 -->

Group Work : Finished our table and test connection with Beekeeper.


<!-- August 14, 2023 -->

Group Work: Setting up Docker file and docker-compose yaml file and started on creating our table.
