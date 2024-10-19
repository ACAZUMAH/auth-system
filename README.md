<h1 align="center">Auth-System API</h1>

<p>This API provides user authentication, role management, and profile handling functionalities, including Google OAuth integration, user registration, and OTP-based verification.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <ul>
        <li><a href="#google-oauth">Google OAuth</a></li>
        <li><a href="#authentication">Authentication</a></li>
        <li><a href="#role-assignment">Role Assignment</a></li>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#public-data">Public Data</a></li>
        <li><a href="#user-management">User Management</a></li>
    </ul>
    <li><a href="#controllers">Controllers</a></li>
    <ul>
        <li><a href="#google-oauth-controller">Google OAuth</a></li>
        <li><a href="#register-controller">Register User</a></li>
        <li><a href="#verify-otp-controller">Verify OTP</a></li>
        <li><a href="#login-controller">Login</a></li>
        <li><a href="#assign-role-controller">Assign Role</a></li>
        <li><a href="#get-profile-controller">Get Profile</a></li>
        <li><a href="#update-profile-controller">Update Profile</a></li>
        <li><a href="#delete-user-controller">Delete User</a></li>
        <li><a href="#get-users-controller">Get All Users</a></li>
    </ul>
</ul>

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

<h2 id="controllers">Controllers</h2>

<h3 id="google-oauth-controller">Google OAuth Controller</h3>
<p><strong>Function</strong>: <code>googleOauth</code></p>
<p>Initiates Google OAuth and sends an OTP to the user's phone upon successful account creation.</p>
<p><strong>Response</strong>: <code>200 OK</code>: <code>{ success: true, message: "Account created your OTP is &lt;otp&gt;" }</code></p>

<h3 id="register-controller">Register Controller</h3>
<p><strong>Function</strong>: <code>Register</code></p>
<p>Registers a new user and sends an OTP to the provided phone number.</p>
<p><strong>Response</strong>: <code>200 OK</code>: <code>{ success: true, message: "Account created your OTP is &lt;otp&gt;" }</code></p>

<h3 id="verify-otp-controller">Verify OTP Controller</h3>
<p><strong>Function</strong>: <code>verifyOtp</code></p>
<p>Verifies the OTP code and returns a JWT token for authentication.</p>
<p><strong>Response</strong>: <code>200 OK</code>: <code>{ success: true, token: &lt;token&gt; }</code></p>

<h3 id="login-controller">Login Controller</h3>
<p><strong>Function</strong>: <code>Login</code></p>
<p>Authenticates a user using their email and password, returning a JWT token if the credentials are valid.</p>
<p><strong>Response</strong>:
<code>200 OK</code>: <code>{ success: true, token: &lt;token&gt; }</code><br>
<code>401 Unauthorized</code>: <code>{ success: false, message: "Invalid credentials" }</code></p>

<h3 id="assign-role-controller">Assign Role Controller</h3>
<p><strong>Function</strong>: <code>assignRole</code></p>
<p>Assigns a role (admin/user) to another user based on their ID.</p>
<p><strong>Response</strong>: 
<code>200 OK</code>: <code>{ success: true, message: "Role assigned successfully" }</code><br>
<code>403 Forbidden</code>: <code>{ success: false, message: "Unauthorized" }</code></p>

<h3 id="get-profile-controller">Get Profile Controller</h3>
<p><strong>Function</strong>: <code>getProfile</code></p>
<p>Retrieves the profile of the current logged-in user.</p>
<p><strong>Response</strong>: 
<code>200 OK</code>: <code>{ success: true, user: &lt;user_profile&gt; }</code><br>
<code>403 Forbidden</code>: <code>{ success: false, message: "Unauthorized" }</code></p>

<h3 id="update-profile-controller">Update Profile Controller</h3>
<p><strong>Function</strong>: <code>updateProfile</code></p>
<p>Updates the profile of the current logged-in user (or another user if admin).</p>
<p><strong>Response</strong>: 
<code>200 OK</code>: <code>{ success: true, message: "Profile updated successfully" }</code><br>
<code>403 Forbidden</code>: <code>{ success: false, message: "Unauthorized" }</code></p>

<h3 id="delete-user-controller">Delete User Controller</h3>
<p><strong>Function</strong>: <code>deleteUser</code></p>
<p>Deletes a user by their ID. Only accessible by admins.</p>
<p><strong>Response</strong>: 
<code>200 OK</code>: <code>{ success: true, message: "User deleted successfully" }</code><br>
<code>403 Forbidden</code>: <code>{ success: false, message: "Unauthorized" }</code></p>

<h3 id="get-users-controller">Get Users Controller</h3>
<p><strong>Function</strong>: <code>getUsers</code></p>
<p>Retrieves a list of all users, including those registered via Google OAuth.</p>
<p><strong>Response</strong>: <code>200 OK</code>: <code>{ success: true, users: &lt;users_array&gt; }</code></p>

<h2>Authentication and Authorization</h2>
<p>All protected routes (i.e., requiring a logged-in user) are guarded using the <code>verifyAccessToken</code> middleware. This ensures that only users with valid JWT tokens can access those routes.</p>

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