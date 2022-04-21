Vue.component('post-item', {
									template: `
									<div class="post-outer-home">
										<div class="post-item-home"  v-for="(entry, index) in items"  
											v-bind:item="entry.id"
											v-bind:key="index">
                                             <div class="post-body post-body-home clearfix"> 
                                                <a href="" title="" class="hs-featured-image-link">
							   <div class="hs-featured-image-wrapper"  v-bind:style="{ backgroundImage: 'url(' + entry.image + ')' }"> </div>
                                                </a>
                                             </div>
                                             <div class="post-body1">
                                                <p id="hubspot-topic_data">
                                                </p>
                                                <div class="post-header-home">
                                                   <h2><a :href="entry.slug">{{entry.name}}</a></h2>
                                                   <div id="hubspot-author_data" class="hubspot-editable" data-hubspot-form-id="author_data" data-hubspot-name="Blog Author">
                                                      WRITTEN BY <a class="author-link" href="https://www.molocoads.com/en/blog/author/minhwi-joo?hsLang=en">{{entry.author}}</a>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
										</div>		
									  `,
									props: ['items' ]
									
								});
							  </script>
                              <script>
							 
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