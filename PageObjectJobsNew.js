var Jobs = function () {

    this.inputFormJobs = element(by.xpath(".//*[@id='eoFreelancerSearchInput']"));
    this.noJobs = element(by.xpath(".//*[@class='job-tile']"));

    //parsing jobs page
    this.parsingAllJobsPage = function () {
        var defer = protractor.promise.defer();
        var dataFromPage = element.all(by.xpath(".//*[@class='job-tile']"))
            .map(function (elm) {
                return {
                    name: elm.element(by.xpath(".//*[@class='break visited']")).getText(),
                    descr: elm.element(by.css(".description.break.ng-scope")).getText(),
                    skills: elm.all(by.css(".o-tag-skill")).getAttribute('data-skill'),
                    link: elm.element(by.xpath(".//*[@class='break visited']")).getAttribute('href')
                }
            });
        defer.fulfill(dataFromPage);
        return defer;
    };

    //parsing random jobs
    this.parsingRandomJob = function () {
        var hash = {};
        element(by.xpath(".//h1[@class='m-0-top']")).getText().then(result => {
            hash.name = result;
        });
        element(by.xpath(".//*[@class='break']")).getText().then(result => {
            hash.descr = result;
        });        
        element.all(by.css(".o-tag-skill.m-0-top.m-xs-bottom.ng-binding.ng-scope")).getAttribute('textContent').then(result => {
            hash.skills = result;
        });
        return hash;
    };


    //getting to random jobs profile
    this.randomProfileJobsClick = function (randomname) {
        browser.get(randomname);
    };    
};

module.exports = Jobs;
