Vue.component('post-item', {
template: `<div class="section bg-blue py-60 wf-section">
		<div class="container-2 w-container">
		<div class="text-center text-blue-medium uppercase text-bold-700">Resources</div>
		<h2 class="text-white text-center mb-48 mt-10">Moloco recent events</h2>
		<div class="px-0"></div>
			<div class="w-dyn-list">
			<div role="list" class="collection-list w-dyn-items w-row">
				<div role="listitem" class="collection-item w-dyn-item w-col w-col-4" v-for="(entry, index) in items"  v-bind:item="entry.id" v-bind:key="index">
				<div class="bg-white">
				<img :src= "entry.image" loading="lazy" alt="" sizes="(max-width: 444px) 87vw, (max-width: 767px) 387px, 31vw" >
				<div class="p-20 py-12"><div class="text-14 text-blue text-bold-700 uppercase my-8">{{entry.name}}</div>
				<p class="text-blue-medium line-height-1-3">Moloco Unveils New Campaign Setup UI for Moloco Cloud DSP</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`,
props: ['items' ]
});
							  

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
				this.getCaseStudies(case_studies.data);
				this.getBlogs(blogs.data);
				this.getRNDBlogs(rnd_blogs.data);
		  })
		);
	}
})	