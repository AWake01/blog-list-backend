const _ = require('lodash')

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


const mostBlogs = (blogs) => {
 
   let mostBlogs= _.maxBy(_.map(_.countBy(blogs, 'author'), (count, val) => ({ author: val, blogs: count })), 'blogs')
   return mostBlogs
}

const mostLikes = (blogs) => {
   //https://stackoverflow.com/questions/38774763/using-lodash-to-sum-values-by-key
   let mostLikes = 
        _(blogs)
        .groupBy('author')
        .map((object, key) => ({
            'author': key,
            'likes': _.sumBy(object, 'likes')
        })).maxBy('likes')

   console.log('mostLines ', mostLikes)
   return mostLikes
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
