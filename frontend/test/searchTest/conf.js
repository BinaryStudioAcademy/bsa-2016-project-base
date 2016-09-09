// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  
  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['init.js',
    'simple_search.js',
    'extended_search.js',
    'date1_search.js',
    'date2_search.js',
    'tech_more_extended_search.js',
    'tag_more_extended_search.js',
	  'owner_more_extended_search.js',
	  'user_more_extended_search.js'
    ],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
