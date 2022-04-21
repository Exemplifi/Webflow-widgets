var app = new Vue({
	el: '#app',
	data: {
		message: 'Vue.js Integration',
		items: []
	},
	methods: {
		getCaseStudies: function(data) {
			collections = [];
			let shouldSkip = false;
			const self = this;
			data.items.forEach(function(item, index) {
				var name = item.name; 
					if (shouldSkip) {
						return;
					}
					if (index >= 1) {
						shouldSkip = true;
						return;
					} 
					self.items.push({
						'name': name,
						'image': item['image'].url,
						'author': item.author,
						'id': item._id,
						'cid': item._cid,
						'slug': '/case-studies/'+item.slug
					});
				 
			});											 
		},
		getBlogs: function(data) { 
			let shouldSkip = false;
			const self = this;
			data.items.forEach(function(item, index) {
				var name = item.name;

				if (shouldSkip) {
					return;
				}
				if (index >= 1) {
					shouldSkip = true;
					return;
				} 
				self.items.push({
					'name': name,
					'image': item['blog-image'].url,
					'author': item['author-2'],
					'id': item._id,
					'cid': item._cid,
					'slug': '/blog/'+item.slug
				});
			});  									
		},
		getRNDBlogs: function(data) { 
			let shouldSkip = false;
			//console.log(data);
			const self = this;
			data.items.forEach(function(item, index) {
				var name = item.name;
				 
				if (shouldSkip) {
					return;
				}
				if (index >= 1) {
					shouldSkip = true;
					return;
				} 
				self.items.push({
					'name': name,
					'image': item['blog-image'].url,
					'author': item['author-2'],
					'id': item._id,
					'cid': item._cid,
					'slug': '/r-d-blog/'+item.slug
				});
			}); 
		},
		getCollectionItems: function(url){											  
			var config = {
			  headers : {
				"Content-Type": "application/json", 
				}
			};
			return axios.get(url, config)
			.then((response) => {
				results = response.data; 
				return results
			})
			.catch(error => { console.log(error) });										
		},
		filteredRecipes: function(data) {	 
			
			data.items = data.items.filter((item) => {
			  return (item.featured == true)
			})	
			console.log(data);										
			return data;
		}
	},
	created: function() {
		//this.getCaseStudies();
		//this.getBlogs();
		//this.getRNDBlogs();
		let endpoints = [
		  'https://dev--moloco.moloco.autocode.gg/collections/case-studies/items/',
		  'https://dev--moloco.moloco.autocode.gg/collections/blogs/items/',
		  'https://dev--moloco.moloco.autocode.gg/collections/rnd-blogs/items/',
		];

		Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
		  axios.spread((case_studies, blogs, rnd_blogs) => {
		 // console.log(case_studies.data);
				var casestudy_data = this.filteredRecipes(case_studies.data);
				var blog_data = this.filteredRecipes(blogs.data);
				var rnd_blog_data = this.filteredRecipes(rnd_blogs.data);
				this.getCaseStudies(casestudy_data);
				this.getBlogs(blog_data);
				this.getRNDBlogs(rnd_blogs.data);
		  })
		);
	}
})		