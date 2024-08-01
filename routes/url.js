const {Router} = require('express')
const { handleGenerateNewShortURL, handleAnalyticsURL, handleRedirectURL } = require('../controllers/url')

const router = Router();


router.post('/',handleGenerateNewShortURL)
router.get('/analytics/:shortId', handleAnalyticsURL)
router.get('/:shortId', handleRedirectURL)

module.exports = router