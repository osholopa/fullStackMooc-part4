const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        title: "Testauksen ABC",
        author: "Eetu Esimerkki",     
        likes: 1   
    }
]

const listWithMultipleBlogs = [
    {
        title: "Koodaa paremmin",
        author: "Raimo Mäkinen",
        likes: 2
    },
    {
        title: "Kotikokin herkkupöytä",
        author: "Arska Nieminen",
        likes: 5
    },
    {
        title: "Puutarhurin päiväkirja",
        author: "Maija Meikäläinen",
        likes: 3
    },
    {
        title: "Backendin testauksen alkeet",
        author: "Eetu Esimerkki",
        likes: 7
    }
]

const listWithMultipleFavourites = [
    {
        title: "Koodaa paremmin",
        author: "Raimo Mäkinen",
        likes: 2
    },
    {
        title: "Funktionaalinen ohjelmointi",
        author: "Funk Tio",
        likes: 5
    },
    {
        title: "Kotikokin herkkupöytä",
        author: "Arska Nieminen",
        likes: 5
    },
    {
        title: "Puutarhurin päiväkirja",
        author: "Maija Meikäläinen",
        likes: 5
    }
]

const listWithMostProductive = [
    {
        title: "Koodaa paremmin",
        author: "Raimo Mäkinen",
        likes: 5
    },
    {
        title: "Kotikokin herkkupöytä",
        author: "Arska Nieminen",
        likes: 5
    },
    {
        title: "Koodaa enemmän",
        author: "Raimo Mäkinen",
        likes: 5
    },
    {
        title: "Puutarhurin päiväkirja",
        author: "Maija Meikäläinen",
        likes: 3
    },
    {
        title: "Backendin testauksen alkeet",
        author: "Eetu Esimerkki",
        likes: 7
    }
]

const listWithMultipleFavouriteBloggers = [
    {
        title: "Koodaa paremmin",
        author: "Raimo Mäkinen",
        likes: 5
    },
    {
        title: "Kotikokin herkkupöytä",
        author: "Arska Nieminen",
        likes: 5
    },
    {
        title: "Koodaa enemmän",
        author: "Raimo Mäkinen",
        likes: 5
    },
    {
        title: "Metsästyksen ABC",
        author: "Arska Nieminen",
        likes: 5
    },
    {
        title: "Backendin testauksen alkeet",
        author: "Eetu Esimerkki",
        likes: 7
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const emptyList = []

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(1)
    })

    test('when list has multiple blogs is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(17)
    })
})

describe('favourite blog', () => {

    test('when list has only one blog returns the object of it', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: "Testauksen ABC",
            author: "Eetu Esimerkki",
            likes: 1
        })
    })

    test('with multiple blogs finds the right favourite', () => {
        const result = listHelper.favouriteBlog(listWithMultipleBlogs)
        expect(result).toEqual({
            title: "Backendin testauksen alkeet",
            author: "Eetu Esimerkki",
            likes: 7
        })
    })

    test('with multiple favourites returns the last one', () => {
        const result = listHelper.favouriteBlog(listWithMultipleFavourites)
        expect(result).toEqual(
        {
            title: "Puutarhurin päiväkirja",
            author: "Maija Meikäläinen",
            likes: 5
        })
    })

})

describe('most blogs', () => {
    test('with multiple most productive returns the last blogger', () => {
        const result = listHelper.mostBlogs(listWithMultipleFavourites)
        expect(result).toEqual({
            author: "Maija Meikäläinen",
            blogs: 1
        })
    })
    test('with only one most productive returns the correct one', () => {
        const result = listHelper.mostBlogs(listWithMostProductive)
        expect(result).toEqual({
            author: "Raimo Mäkinen",
            blogs: 2
        })
    })
})

describe('most likes', () => {
    test('finds correct favourite from list with single blogs per author', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        expect(result).toEqual({
            author: "Eetu Esimerkki",
            likes: 7
        })
    })

    test('finds correct favourite from list', () => {
        const result = listHelper.mostLikes(listWithMostProductive)
        expect(result).toEqual({
            author: "Raimo Mäkinen",
            likes: 10
        })
    })

    test('with multiple favourite bloggers returns the last', () => {
        const result = listHelper.mostLikes(listWithMultipleFavouriteBloggers)
        expect(result).toEqual({
            author: "Arska Nieminen",
            likes: 10
        })
    })

})