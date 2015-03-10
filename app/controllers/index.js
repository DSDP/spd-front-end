import Ember from 'ember';

export default Ember.Controller.extend({
	breadCrumb: "Inicio",
  	breadCrumbPath: "index",
  	testLinkify: 'Here is a link: https://google.com and some attempted XSS <script>alert("xss!");</script>',
});
