const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, blog) => {
        return totalLikes + blog.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((previous, current) => {
        return (previous.likes > current.likes) ? previous : current
    })
}

const mostBlogs = (blogs) => {
    const blogsByWriter = blogs.reduce((bloggers, blog) => {
        if (bloggers.find(el => el.author === blog.author)) {
            bloggers.find(el => el.author === blog.author)
                .blogs++
        }
        else {
            const obj = {}
            obj.author = blog.author
            obj.blogs = 1
            bloggers.push(obj)
        }
        return bloggers
    }, [])
    return blogsByWriter.reduce((previous, current) => {
        return (previous.blogs > current.blogs) ? previous : current
    })

}

const mostLikes = (blogs) => {
    const blogsByWriter = blogs.reduce((bloggers, blog) => {
        if (bloggers.find(el => el.author === blog.author)) {
            bloggers.find(el => el.author === blog.author).likes += blog.likes
        }
        else {
            const obj = {}
            obj.author = blog.author
            obj.likes = blog.likes
            bloggers.push(obj)
        }
        return bloggers
    }, [])
    return blogsByWriter.reduce((previous, current) => {
        return (previous.likes > current.likes) ? previous : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}

