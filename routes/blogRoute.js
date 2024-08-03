const router = require('express').Router()
const { renderCreateBlog, handleCreateBlog } = require('../controllers/blogController')
const { errorHandler } = require('../services/catchAsyncError')


router.route("/createBlog").get(renderCreateBlog).post(errorHandler(handleCreateBlog))



module.exports = router