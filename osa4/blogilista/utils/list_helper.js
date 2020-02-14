const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	if (blogs.length === 0) {
		return 0
	}
	let total = blogs
		.map(function(blog) {
			return blog.likes
		})
		.reduce(function(sum, likes) {
			return sum + likes
		})
	return total
}

const favoriteBlog = blogs => {
	if (blogs.length === 0) {
		return nil
	}
	let sortedBlogs = blogs.sort(function(previous, current) {
		return  current.likes - previous.likes
	})
	return sortedBlogs[0]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
