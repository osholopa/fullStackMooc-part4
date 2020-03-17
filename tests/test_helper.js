const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Backendin testauksen alkeet",
        author:"Eetu Esimerkki",
        url:"backendintestauksenalkeet.example.com",
        likes:7
    },
    {
        title: "Bloggaajan elämää",
        author:"Testi Testinen",
        url:"bloggaajanelamaa.example.com",
        likes:5
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}