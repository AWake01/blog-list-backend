const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    const result = blogs.reduce(reducer, 0)
    return result
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
