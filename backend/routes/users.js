const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  userController.registerUser
);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  userController.loginUser
);

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, userController.getCurrentUser);

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put(
  '/me',
  [
    auth,
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('email', 'Please include a valid email').optional().isEmail(),
      check('password', 'Please enter a password with 6 or more characters')
        .optional()
        .isLength({ min: 6 }),
      check('organization', 'Organization name is required').optional().not().isEmpty(),
    ],
  ],
  userController.updateUserProfile
);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', auth, userController.getAllUsers);

// @route   PUT /api/users/:id/role
// @desc    Update user role (admin only)
// @access  Private/Admin
router.put(
  '/:id/role',
  [
    auth,
    [
      check('role', 'Role is required').isIn(['user', 'editor', 'admin']),
    ],
  ],
  userController.updateUserRole
);

module.exports = router;
