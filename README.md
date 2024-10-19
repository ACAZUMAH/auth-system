<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation for User Authentication and Management</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1, h2, h3 { color: #333; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        ul { margin: 0; padding-left: 20px; }
    </style>
</head>
<body>

<h1>API Documentation for User Authentication and Management</h1>

<p>This document provides an overview of the API endpoints for user authentication and management, including Google OAuth integration. The API allows users to register, log in, verify their accounts, manage profiles, and perform administrative actions.</p>

<h2>Authentication</h2>

<h3>Google OAuth</h3>

<ul>
    <li><strong>Login via Google</strong>
        <ul>
            <li><strong>Endpoint:</strong> <code>/oauth/google</code></li>
            <li><strong>Method:</strong> GET</li>
            <li><strong>Summary:</strong> Initiates the Google OAuth2 login process. The user is redirected to Google's login page.</li>
            <li><strong>Responses:</strong>
                <ul>
                    <li><code>302</code>: Redirects to Google's OAuth login page.</li>
                    <li><code>500</code>: Internal server error.</li>
                </ul>
            </li>
        </ul>
    </li>

    <li><strong>Google OAuth Callback</strong>
        <ul>
            <li><strong>Endpoint:</strong> <code>/oauth/google/redirect</code></li>
            <li><strong>Method:</strong> GET</li>
            <li><strong>Summary:</strong> Completes the OAuth2 flow and creates an account for the user. Sends an OTP for verification.</li>
            <li><strong>Responses:</strong>
                <ul>
                    <li><code>200</code>: Account successfully created, OTP sent for verification.</li>
                    <li><code>500</code>: Internal server error.</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<h2>User Registration</h2>

<ul>
    <li><strong>Register a New User</strong>
        <ul>
            <li><strong>Endpoint:</strong> <code>/auth/register</code></li>
            <li><strong>Method:</strong> POST</li>
            <li><strong>Description:</strong> Registers a new user with provided details and sends an OTP for verification.</li>
            <li><strong>Request Body:</strong></li>
            <pre>{
  "username": "johnyoung",
  "email": "johnyoung@example.com",
  "phone": "+123456789",
  "password": "password123"
}</pre>
            <li><strong>Responses:</strong></li>
            <ul>
                <li><code>200</code>: Account successfully created, OTP sent for verification.</li>
                <li><code>400</code>: Bad request, missing or invalid input.</li>
                <li><code>500</code>: Internal server error.</li>
            </ul>
        </ul>
    </li>

    <li><strong>User Login</strong>
        <ul>
            <li><strong>Endpoint:</strong> <code>/auth/login</code></li>
            <li><strong>Method:</strong> POST</li>
            <li><strong>Description:</strong> Authenticates a user by email and password.</li>
            <pre>{
  "email": "johnyoung@example.com",
  "password": "password123"
}</pre>

            <li><strong>Responses:</strong></li>
            <ul>
                <li><code>200</code>: Login successful, token returned.</li>
                <li><code>401</code>: Invalid credentials.</li>
                <li><code>500</code>: Internal server error.</li>
            </ul>
        </ul>
    </li>

    <h3>OTP Verification</h3>

    <ul>
        <li><strong>Verify OTP and Issue Token</strong></h3
            <ul>
                <lI><strong>Endpoint:</strong> /auth/verify
                </lI
                ><lI
                    ><bMethod:</b POST
                ></lI
                ><lI
                    ><bSummary:</b Verifies the OTP provided by the user and issues a token if valid.
                ></lI
                ><lI
                    ><bRequest Body:</b
                    ><pre>{
  "code": "123456"
}</pre
                    ></lI
                    ><lI
                        ><bResponses:</b
                        ><lI
                            ><b200:</b OTP successfully verified, token issued.
                        ></lI
                        ><lI
                            ><b400:</b Invalid or expired OTP.
                        ></lI
                        ><lI
                            ><b500:</b Internal server error.
                        ></lI
                    ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></lI

                ></ul>

<h2>User Management</h2>

<h3>User Profile Management</h3>

<ul>

<li><strong>User Profile Management - Get User Profile</strong></h3
<ul>

<li><bEndpoint:</b /profile></lI
<li><bMethod:</b GET></lI
<li><bSummary:</b Retrieves the profile information of the authenticated user.</lI
<li><bResponses:</b></L1<|vq_14309|></body></html>
