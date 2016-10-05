exports.config = {
    directConnect: true,
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      "browserName": "chrome"
    },
    onPrepare: function () {
      var width = 1200, height = 800;
      browser.driver.manage().window().setSize(width, height);      
      browser.get("https://www.upwork.com/");
      
    },
  
    params: {
      keyword: "scala",
      allScriptsTimeout: 50000
    },
    
  // Framework to use. Jasmine is recommended.
    framework: "jasmine",
  
    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: [     
      // "upw_jsm_freelan.js"
      // "upw_jsm_jobs.js"
        "freelan_new.js"
        // "jobs_new.js"

    ],
  
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
    }
};
