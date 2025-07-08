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
    let bestAuthor = _.maxBy(blogs, 'author')
    console.log('author ', bestAuthor)
    //let blogCount = blogs.filter(blog => blog.author === bestAuthor).length
    // return {
    //     author: bestAuthor.author,
    //     blogs: blogCount
    // }

//     let blogCount = _.maxBy(
//   _.map(_.countBy(listWithMultipleBlogs, 'author'), (count, val) => ({
//     author: val,
//     blogs: count,
//   })),
//   'blogs'
// );

    
   let mostBlogs= _.maxBy(_.map(_.countBy(blogs, 'author'), (count, val) => ({ author: val, blogs: count })), 'blogs')

   console.log('most' , mostBlogs)
   
   return mostBlogs

    //let freq = _.countBy(blogs)
    //console.log('freq ', freq)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
