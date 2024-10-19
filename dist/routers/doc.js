/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This route registers a new user with the provided details and sends an OTP to the user's phone for verification.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: johndoe@example.com
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
