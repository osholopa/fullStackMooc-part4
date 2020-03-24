const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    blog.user = user

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if(!blog) {
        return response.status(404).json({ error: 'blog with that id does not exist' })
    }
        
    if(decodedToken.id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'operation not permitted' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter