const { Router } = require('express');
const userContactController = require('../controllers/userContactControllers');


const router = Router();

router.post('/save-contact', userContactController.saveContact);

router.post('/update-contact', userContactController.updateContact);

router.delete('/delete-contact', userContactController.deleteContact);

router.get('/fetch-contact/:id/:name', userContactController.fetchContact);

router.get('/export-contact', userContactController.exportContact);


// router.post('/signup', authController.signup_post);


// router.get('/login', authController.login_get);


// router.post('/login', authController.login_post);


module.exports = router;