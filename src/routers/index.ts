/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Routes for user authentication
 */
/**
 * @swagger
 * /oauth/google:
 *   get:
 *     summary: Google OAuth login
 *     description: Initiates the Google OAuth2 login process. The user is redirected to Google's login page.
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google's OAuth login page.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /oauth/google/redirect:
 *   get:
 *     summary: Google OAuth callback
 *     description: Callback route for Google OAuth2 after successful authentication. This will complete the OAuth2 flow and create an account for the user, then send an OTP to their phone for verification.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Account successfully created, OTP sent for verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message with the OTP.
 *                   example: "Account created your OTP is 123456"
 *       302:
 *         description: Redirect after successful authentication.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This route registers a new user with the provided details and sends an OTP to the user's phone for verification.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's username.
 *                 example: "johnyoung"
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "johnyoung@example.com"
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *                 example: "+123456789"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Account successfully created, OTP sent for verification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message with the OTP.
 *                   example: "Account created your OTP is 123456"
 *       400:
 *         description: Bad request, missing or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message indicating the cause of the failure.
 *                   example: "Invalid request data"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verify OTP and issue token
 *     description: Verifies the OTP provided by the user and, if valid, issues a token for authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: The OTP sent to the user.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP successfully verified, token issued.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the OTP was successfully verified.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: The authentication token issued after successful verification.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request, invalid or expired OTP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating the failure reason.
 *                   example: "Invalid or expired OTP"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by email and password, and returns a token upon successful authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "johnyoung@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the login was successful.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: The authentication token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials, failed authentication.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the login was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating the reason for failure.
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * tags:
 * - name: User Management
 *   description: Routes for user management
 */
/**
 * @swagger
 * /assign-role/{id}:
 *   post:
 *     summary: Assign a role to a user
 *     description: Assigns a specified role to a user. Only an admin can assign roles.
 *     tags: [User Management]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <access_token>
 *         description: Bearer token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to whom the role will be assigned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 description: The role to assign to the user.
 *                 example: "admin"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role successfully assigned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the role was successfully assigned.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "Role assigned successfully"
 *       403:
 *         description: Unauthorized, only admins can assign roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating unauthorized access.
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile (by user or admin)
 *     description: Retrieves the profile information of the authenticated user. Only users with the role of "admin" or "user" can access their profile.
 *     tags: [User Management]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <access_token>
 *         description: Bearer token for authentication
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the user profile to get (only required for admins).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: The authenticated user's profile data.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: "60c72b2f9b1d8e2d8c2b97e9"
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: "johnyoung@example.com"
 *                     role:
 *                       type: string
 *                       description: The user's role.
 *                       example: "user"
 *       403:
 *         description: Unauthorized, user does not have access to this resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating unauthorized access.
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile (by user or admin)
 *     description: Updates the profile information of the authenticated user. Admins can update any user's profile, while regular users can only update their own profile.
 *     tags: [User Management]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <access_token>
 *         description: Bearer token for authentication
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the user whose profile is being updated (only required for admins).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The updated email of the user.
 *                 example: "newemail@example.com"
 *               name:
 *                 type: string
 *                 description: The updated name of the user.
 *                 example: "John young"
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the user.
 *                 example: "123-456-7890"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the update was successful.
 *                   example: true
 *                 message:
 *                   type: object
 *                   description: The updated profile information.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: "60c72b2f9b1d8e2d8c2b97e9"
 *                     email:
 *                       type: string
 *                       description: The user's updated email.
 *                       example: "newemail@example.com"
 *                     name:
 *                       type: string
 *                       description: The user's updated name.
 *                       example: "John Doe"
 *       403:
 *         description: Unauthorized, user does not have permission to update the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating unauthorized access.
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user based on their ID. Only admins are authorized to delete users.
 *     tags: [User Management]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <access_token>
 *         description: Bearer token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be deleted.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the user was successfully deleted.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the user has been deleted.
 *                   example: "User deleted successfully"
 *       403:
 *         description: Unauthorized, only admins can delete users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating unauthorized access.
 *                   example: "Unauthorized"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating that the user was not found.
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /public-data:
 *   get:
 *     summary: Retrieve public user data
 *     description: Fetches a list of users, including those from Google, based on optional query parameters.
 *     tags: [User Management]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user's ID.
 *                         example: "60c72b2f9b1d8e2d8c2b97e9"
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: "John young"
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: "johnyoung@example.com"
 *                       role:
 *                         type: string
 *                         description: The user's role.
 *                         example: "user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the request was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A failure message indicating an internal error.
 *                   example: "Internal server error"
 */

import { Router } from 'express';
import * as user from '../controllers/index';
import { verifyAccessToken } from '../helpers';
import '../services/auth/oauth2/index';
import passport from 'passport';

const router = Router();

router.get('/oauth/google', passport.authenticate('google'));

router.get('/oauth/google/redirect',
    passport.authenticate('google'), user.googleOauth);

router.post('/auth/register', user.Register);

router.post('/auth/verify', user.verifyOtp);

router.post('/auth/login', user.Login);

router.route('/assign-role/:id')
.post(verifyAccessToken, user.assignRole);

router.get('/profile', verifyAccessToken, user.getProfile)

router.put('/profile', verifyAccessToken, user.updateProfile);

router.delete('/user/:id', verifyAccessToken, user.deleteUser);

router.get('/public-data', user.getUsers);



export default router;