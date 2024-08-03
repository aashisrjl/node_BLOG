const router = require('express').Router()
const { renderCreateBlog, handleCreateBlog } = require('../controllers/blogController')


router.route("/createBlog").get(renderCreateBlog).post(handleCreateBlog)



module.exports = router