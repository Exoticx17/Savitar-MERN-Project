const express = require('express')
const voteController = require('../controllers/voteController')
const collegeController = require('../controllers/collegeController')


const router = express.Router()

router.post('/', voteController.voteSheetPost)
router.patch('/voting', voteController.addVote)
router.patch('/discount', voteController.deleteVote)
router.get('/sheet', voteController.getVoteSheet)
router.get('/average', voteController.getAvgVotesPerIndustry)
router.get('/median', voteController.getMedianVotesPerIndustry)
router.get('/range', voteController.getMinMaxVotesPerIndustry)

//College Controller

router.post('/college', collegeController.collegePost)
router.get('/college', collegeController.getColleges)
router.get('/college/one', collegeController.getCollegeOne)
router.patch('/college/edit', collegeController.collegeEdit)
router.delete('/college/delete', collegeController.collegeDelete)


router.get('/suggestions', voteController.getVotesColleges)
router.get('/industries', voteController.getIndustryVote)

module.exports = router;