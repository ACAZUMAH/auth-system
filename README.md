<h1 align="center">Auth-System API</h1>

<p>This API provides user authentication, role management, and profile handling functionalities, including Google OAuth integration, user registration, and OTP-based verification.</p>

<h2>Table of Contents</h2>
<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li>Google OAuth authentication</li>
    <li>User registration with OTP verification</li>
    <li>Login with email and password using JWT</li>
    <li>Role assignment (Admin/User)</li>
    <li>User profile management</li>
    <li>Secure authentication and authorization with JWT</li>
    <li>Access control based on user roles</li>
</ul>
<h2 id="technologies-used">Technologies Used</h2>
<ul>
    <li><strong>Node.js</strong> - JavaScript runtime environment</li>
    <li><strong>Express.js</strong> - Web framework for Node.js</li>
    <li><strong>TypeScript</strong> - Typed superset of JavaScript</li>
    <li><strong>MongoDB</strong> - NoSQL database for user data storage</li>
    <li><strong>Passport.js</strong> - Authentication middleware for Node.js (for Google OAuth)</li>
    <li><strong>JWT</strong> - JSON Web Tokens for secure authentication</li>
    <li><strong>Bcrypt</strong> - Password hashing for secure login</li>
    <li><strong>Swagger UI</strong> - API documentation</li>
    <li><strong>Vercel</strong> - Deployment platform</li>
    <li>Other security libraries (Helmet, express-validator, etc.)</li>
</ul>

<h2 id="installation">Installation</h2>
<pre>
<code>
# Clone the repository
git clone https://github.com/your-repo/project-name.git

# Navigate to the project directory
cd project-name

# Install dependencies
npm install

# Create a .env file and add the necessary environment variables (MongoDB URI, JWT secret, etc.)

# Start the development server
npm run dev
</code>
</pre>

<h2 id="api-endpoints">API Endpoints</h2>

<h3 id="google-oauth">Google OAuth</h3>
<ul>
    <li><strong>GET</strong> <code>/oauth/google</code> - Initiates Google OAuth flow.</li>
    <li><strong>GET</strong> <code>/oauth/google/redirect</code> - Redirect URI after successful Google OAuth. Calls <code>googleOauth</code> controller.</li>
</ul>

<h3 id="authentication">Authentication</h3>
<ul>
    <li><strong>POST</strong> <code>/auth/register</code> - Registers a new user. Calls <code>Register</code> controller.</li>
    <li><strong>POST</strong> <code>/auth/verify</code> - Verifies the OTP sent to the user. Calls <code>verifyOtp</code> controller.</li>
    <li><strong>POST</strong> <code>/auth/login</code> - Authenticates an existing user. Calls <code>Login</code> controller.</li>
</ul>

<h3 id="role-assignment">Role Assignment</h3>
<ul>
    <li><strong>POST</strong> <code>/assign-role/:id</code> - Assigns a new role to a user based on their ID. Protected by <code>verifyAccessToken</code>. Calls <code>assignRole</code> controller.</li>
</ul>

<h3 id="profile">Profile</h3>
<ul>
    <li><strong>GET</strong> <code>/profile</code> - Retrieves the current user's profile. Protected by <code>verifyAccessToken</code>. Calls <code>getProfile</code> controller.</li>
    <li><strong>PUT</strong> <code>/profile</code> - Updates the current user's profile. Protected by <code>verifyAccessToken</code>. Calls <code>updateProfile</code> controller.</li>
</ul>

<h3 id="public-data">Public Data</h3>
<ul>
    <li><strong>GET</strong> <code>/public-data</code> - Retrieves all user data (both regular and Google OAuth users). Calls <code>getUsers</code> controller.</li>
</ul>

<h3 id="user-management">User Management</h3>
<ul>
    <li><strong>DELETE</strong> <code>/user/:id</code> - Deletes a user by their ID. Protected by <code>verifyAccessToken</code>. Calls <code>deleteUser</code> controller.</li>
</ul>
<h2 id="usage">Usage</h2>
<p>After setting up the environment and starting the server, you can use tools like Postman or Swagger UI to interact with the API:</p>

<h3> Register a new user </h3>
<p>To register a new user, send a <code>POST</code> request to <code>/auth/register</code> with the following request body:</p>

<pre>
<code>
POST /auth/register
Content-Type: application/json

{
  "name": "johnyoung",
  "email": "johnyoung@example.com",
  "phone": "+123456789",
  "password": "password123"
}
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "message": "Account created, your OTP is 123456"
}
</code>
</pre>

<p>Example Error Response (400):</p>

<pre>
<code>
{
  "success": false,
  "message": "Invalid request data"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3> User Login </h3>
<p>To log in a user, send a <code>POST</code> request to <code>/auth/login</code> with the following request body:</p>

<pre>
<code>
POST /auth/login
Content-Type: application/json

{
  "email": "johnyoung@example.com",
  "password": "password123"
}
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
</code>
</pre>

<p>Example Error Response (401):</p>

<pre>
<code>
{
  "success": false,
  "message": "Invalid credentials"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3> Verify OTP </h3>
<p>To verify the OTP sent to the user, send a <code>POST</code> request to <code>/auth/verify</code> with the following request body:</p>

<pre>
<code>
POST /auth/verify
Content-Type: application/json

{
  "code": "123456"
}
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
</code>
</pre>

<p>Example Error Response (400):</p>

<pre>
<code>
{
  "success": false,
  "message": "Invalid or expired OTP"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3> Get user profile </h3>
<p>To retrieve the profile of the authenticated user, send a <code>GET</code> request to <code>/profile</code> with the following headers:</p>

<pre>
<code>
GET /profile
Authorization: Bearer <access_token>
query: id of the user to get (reuired for admins only)
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "user": {
    "id": "60c72b2f9b1d8e2d8c2b97e9",
    "email": "johnyoung@example.com",
    "role": "user"
  }
}
</code>
</pre>

<p>Example Error Response (403):</p>

<pre>
<code>
{
  "success": false,
  "message": "Unauthorized"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3>Update a user profile </h3>
<p>To update the authenticated user's profile or another user's profile (if you're an admin), send a <code>PUT</code> request to <code>/profile</code> with the following headers and request body:</p>

<pre>
<code>
PUT /profile
Authorization: Bearer <access_token>
query: id of the user profile to update (required for admins only)
Content-Type: application/json

{
  "email": "newemail@example.com",
  "name": "John Young",
  "phone": "123-456-7890"
}
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "message": {
    "id": "60c72b2f9b1d8e2d8c2b97e9",
    "email": "newemail@example.com",
    "name": "John Young"
  }
}
</code>
</pre>

<p>Example Error Response (403):</p>

<pre>
<code>
{
  "success": false,
  "message": "Unauthorized"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3>Assign Role to User</h3>
<p>To assign a role to a user, send a <code>POST</code> request to <code>/assign-role/{id}</code> with the following headers and request body:</p>

<pre>
<code>
POST /assign-role/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "role": "admin"
}
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "message": "Role assigned successfully"
}
</code>
</pre>

<p>Example Error Response (403):</p>

<pre>
<code>
{
  "success": false,
  "message": "Unauthorized"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h3>Delete User</h3>
<p>To delete a user by their ID, send a <code>DELETE</code> request to <code>/user/{id}</code> with the following headers:</p>

<pre>
<code>
DELETE /user/{id}
Authorization: Bearer <access_token>
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "message": "User deleted successfully"
}
</code>
</pre>

<p>Example Error Response (403):</p>

<pre>
<code>
{
  "success": false,
  "message": "Unauthorized"
}
</code>
</pre>

<p>Example Error Response (404):</p>

<pre>
<code>
{
  "success": false,
  "message": "User not found"
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>
<h3>Example 8: Retrieve Public User Data</h3>
<p>To retrieve public user data, send a <code>GET</code> request to <code>/public-data</code> with optional query parameters:</p>

<pre>
<code>
GET /public-data
</code>
</pre>

<p>Example Success Response (200):</p>

<pre>
<code>
{
  "success": true,
  "users": [
    // list of users
  ]
}
</code>
</pre>

<p>Example Error Response (500):</p>

<pre>
<code>
{
  "success": false,
  "message": "Internal server error"
}
</code>
</pre>

<h2>Error Handling</h2>
<p>Each controller has built-in error handling:</p>
<ul>
    <li><strong>401 Unauthorized</strong> for invalid login attempts.</li>
    <li><strong>403 Forbidden</strong> for unauthorized access to routes requiring specific roles (e.g., assigning roles, deleting users).</li>
</ul>

<h2>Notes</h2>
<ul>
    <li>Ensure to configure Passport.js for handling Google OAuth integration.</li>
    <li>JWT tokens are generated upon successful login or OTP verification for secure authentication.</li>
</ul>