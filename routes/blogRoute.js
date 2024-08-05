const router = require('express').Router()
const { renderCreateBlog, handleCreateBlog, renderBlogDetailPage, handleEditBlog, handleDeleteBlog, renderEditPage, renderMyBlog } = require('../controllers/blogController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { errorHandler } = require('../services/catchAsyncError')




router.route("/createBlog").get(renderCreateBlog).post(isAuthenticated,errorHandler(handleCreateBlog))
router.route('/blogDetail/:id').get(renderBlogDetailPage)
router.route('/deleteBlog/:id').get(handleDeleteBlog)
router.route('/editBlog/:id').get(renderEditPage).post(handleEditBlog)
router.route('/myBlog').get(isAuthenticated,errorHandler(renderMyBlog))



module.exports = router