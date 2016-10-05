'use strict';
var All = require("./PageObjectCommonNew.js");
var Jobs = require("./PageObjectJobsNew.js");

describe("Testing UPWORK Jobs", function () {

    var common = new All();
    var jobs = new Jobs();
    var params = browser.params;
    var arrCloneForCompareAllJobs, randomProfileJob;
    browser.ignoreSynchronization = true;

    it("should be JOBS page", function () {
        common.selectType("jobs");
        common.inputForm.sendKeys(params.keyword, protractor.Key.ENTER);
        expect(jobs.inputFormJobs.getAttribute("placeholder")).toEqual("Find Jobs");        
    });

    it("KEYWORD should be in random arrCloneForCompareAllJobs & arrCloneForCompareAllJobs should be not empty", function () {
        jobs.noJobs.isPresent().then(result => {
            if(!result) {
                console.log("ANY JOBS IS NOT FOUNDED")
            } else {
                jobs.parsingAllJobsPage().then(profiles => {
                    console.log("======================Chek KEYWORD ON JOBS PAGE==================");
                    common.checkKeywordInProfile(profiles, params.keyword);
                    let randomJobs = profiles[Math.floor(Math.random() * profiles.length)];
                    jobs.randomProfileJobsClick(randomJobs.link);
                    arrCloneForCompareAllJobs = profiles;
                    randomProfileJob = jobs.parsingRandomJob();
                    expect(arrCloneForCompareAllJobs.length > 0).toBeTruthy();
                })                
            }
        })
    });

    it("arrCloneForCompareAllJobs should be not empty & arrCloneForCompareAllJobs should not empty", function () {
        console.log("==================Check KEYWORD IN RANDOM PROFILE==================");
        common.checkKeywordInProfile(randomProfileJob, params.keyword);
        expect(Object.keys(arrCloneForCompareAllJobs).length === 0).toBeFalsy();
    });
    
    it("features from randomProfileJob should be equal to features  from arrCloneForCompareAllJobs", function () {
        var index = common.searchInArr(arrCloneForCompareAllJobs, "name", randomProfileJob.name);
        expect(randomProfileJob.descr).toContain(arrCloneForCompareAllJobs[index].descr);
        expect(arrCloneForCompareAllJobs[index].name).toEqual(randomProfileJob.name);
        expect(arrCloneForCompareAllJobs[index].skills).toEqual(randomProfileJob.skills);

    })
});
