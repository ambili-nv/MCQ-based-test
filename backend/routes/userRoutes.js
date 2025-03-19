const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const { verifyToken, requireUser } = require('../middlewares/authmiddleware')

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/questions', verifyToken, requireUser,userController.getRandomQuestions)
router.post('/submit-quiz', verifyToken, requireUser,userController.saveTestResult)
router.get('/testdetails', verifyToken, requireUser,userController.getTestData)
router.post('/submit-feedback', verifyToken, requireUser,userController.submitFeedback)


module.exports = router;   