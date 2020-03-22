const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {   
        id: "5e70dac71c9d440000be247b",
        title: "Backendin testauksen alkeet",
        author:"Eetu Esimerkki",
        url:"backendintestauksenalkeet.example.com",
        likes:7
    },
    {
        id: "6a07dac71c9d004400be247b",
        title: "Bloggaajan elämää",
        author:"Testi Testinen",
        url:"bloggaajanelamaa.example.com",
        likes:5
    }
]

const loginUser = {
    username: "root",
    password: "sekret"
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    loginUser,
    initialBlogs, 
    blogsInDb,
    usersInDb
}