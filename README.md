FullStackOpen learning project

	Online course in React web application development https://fullstackopen.com/
	Provided by the University of Helsinki
	Uses HTML and Javascript.
	First 7 modules contribute to a certificate through Open University.
	Follow-up modules cover Typescript and React native applciations.
	Follows the structure of follow-along text tutorials, followed by exercises to repeat the tutorial content with some extensions (e.g. implement an additional api request)
	I am currently completing module 5, covering end-to-end testing in Playwright and Cypress.

	Through the course I have been developing one application inn stages; a simple view of a list of blogs, implementing user login.
	This is a backend REST api, providing access to a MongoDB document database.
	A frontend React app allows for users to login (users cannot be created), view a list of blogs, click on a blog to show/hide info, add new blog records, increase a like counter on a blog and delete blog records.

	Login is handled through tokens, with an hour’s expiration.
	Tokens are stored locally and used to validate GET/POST requests. (auto logout not implemented)
	Playwright end-to-end tests are run from a separate repo.

App Usage
	Hosted at https://aw-blog-list-backend.onrender.com/
	There will be a delay as the app is deployed.

Tech Used (all covered in course):
	Visual Studio code as the IDE.
	React for frontend web application.
	Node JS and express for backend REST server.
	MongoDB (https://www.mongodb.com/) to host a document database.
	Initial blog data populated using mock data from https:/www.mockaroo.com/.
	Playwright for end-to-end testing.
	Render (https://render.com/) to provide web hosting and automated deployment.
	GitHub for repo management.

Additional Repos
  Bloglist frontend: https://github.com/AWake01/FullStackOpen---part-5---testing-react-apps
  Playwright Testing: https://github.com/AWake01/FullStackOpen-P5---bloglist-Playwright-testing/blob/master/tests/blog.test.js
    
