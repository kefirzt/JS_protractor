var Freelancers = function () {

    this.inputFormFreelan = element(by.css("#eoFreelancerSearchInput"));
    this.noFreelancers = element(by.xpath(".//*[@id='contractorTiles']//*[contains(text(),'Please try modifying your search to get more results.')]"));
    this.hiddenSkills = element(by.xpath(".//*[@id='optimizely-header-container-default']//*[@data-ng-click='showAllItems()']"));

    this.parsingAllProfilePage = function () {
        var defer = protractor.promise.defer();
        var dataFromPage = element.all(by.css(".air-card-hover")).map(function (elm) {
            return {
                name: elm.element(by.css("a.jsShortName")).getText(),
                title: elm.element(by.css("h2.jsTitle")).getText(),
                descr: elm.element(by.xpath(".//*[@class='oDescription m-md-top m-0-bottom ng-isolate-scope']")).getAttribute('data-eo-truncation-html-unsafe'),
                skills: elm.all(by.css("ul.list-inline > li > a")).getAttribute('data-skill')
            }
        });
        defer.fulfill(dataFromPage);
        return defer;
    };

    this.randomProfileFreelancersClick = function (randomname) {
        element(by.xpath(".//*[@id='contractorTiles']//*[@title=" + "'" + randomname + "'" + "]")).click();
        this.hiddenSkills.isPresent().then(res => {
            if(res) {
                this.hiddenSkills.click();
            }
        })
    };

    this.parsingRandomProfilePage = function () {
        var hash = {};
        element(by.xpath(".//h2/*[@class='up-active-context up-active-context-title']")).getText().then(res => {
            hash.name = res;
        });
        element(by.xpath(".//h3//span[@class='up-active-context up-active-context-title']")).getText().then(res => {
            hash.title = res;
        });
        element(by.xpath(".//*[@class='up-active-container']//*[@itemprop='description']")).getAttribute('innerHTML').then(res => {
            hash.descr = res;
        });
        element.all(by.xpath(".//*[@id='optimizely-header-container-default']//a")).getAttribute('textContent').then(res => {
            hash.skills = res;
        });
        return hash;
    };    
};

module.exports = Freelancers;
