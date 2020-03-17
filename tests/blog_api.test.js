const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('when there is initially some blogs saved', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(titles).toContain('Backendin testauksen alkeet')
    })

    test('identifying fields are defined as id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })

    describe('addition of a new blog', () => {

        test('a new blog can be added', async () => {
            const newBlog = {
                title: "Mitä tänään syötäisiin?",
                author: "Pirkka Suonperä",
                url: "mitasyotaisiin.exampleblog.fi",
                likes: 4
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

            const titles = blogsAtEnd.map(r => r.title)
            expect(titles).toContain('Mitä tänään syötäisiin?')
        })

        test('if not provided, default value of field likes is 0', async () => {
            const newBlog = {
                title: "Mitä jos sinusta ei pidetä",
                author: "Maria Indorn",
                url: "eitykkayksia.exampleblog.fi",
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
            const addedBlog = blogsAtEnd.find(b => b.title === "Mitä jos sinusta ei pidetä")
            expect(addedBlog.likes).toBe(0)
        })

        test('Status 400 for post with missing title and url', async () => {
            const newBlog = {
                author: "Raimo Mäkinen",
                likes: 4
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('deletion of a blog', () => {

        test('succeeds with a status code 204 if id is valid', async () => {
            
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
            
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).not.toContain(blogToDelete.title)
        })
    })

    describe('updating a blog', () => {

        test('returns updated object if id is valid', async () => {
            
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]
            blogToUpdate.likes = 10
             
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
         
            const updatedBlog = blogsAtEnd.find(b => b.title === blogToUpdate.title)
            expect(updatedBlog.likes).toBe(10)
        })
    })

})

afterAll(() => {
    mongoose.connection.close()
})