'use strict';
var All = require("./PageObjectCommonNew.js");
var Freelancers = require("./PageObjectFreelanNew.js");

describe("testing UPWORK Freelancers", function () {

    var common = new All();
    var freelan = new Freelancers();
    var params = browser.params;
    var arrCloneForCompareAllProfiles, randomProfile, randomProfile;

    it("should be FREELANCERS page", function () {
        common.selectType("freelancers");
        common.inputForm.sendKeys(params.keyword, protractor.Key.ENTER);
        expect(freelan.inputFormFreelan.getAttribute("placeholder")).toEqual("Find Freelancers");
    });


    it("parsing profiles page/random profile & check KEYWORD", function () {        
        freelan.noFreelancers.isPresent().then(result => {
            if(result) {
                console.log("ANY FREELANCERS IS NOT FOUNDED")
            } else {
                freelan.parsingAllProfilePage().then(profiles => {
                    console.log("======================Chek KEYWORD ON PROFILES PAGE==================");
                    common.checkKeywordInProfile(profiles, params.keyword);
                    randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
                    freelan.randomProfileFreelancersClick(randomProfile.name);
                    browser.ignoreSynchronization = true;
                    randomProfile = freelan.parsingRandomProfilePage();
                    arrCloneForCompareAllProfiles = profiles;                    
                    expect(arrCloneForCompareAllProfiles.length > 0).toBeTruthy();
                })
            }
        })
    });

    it("check KEYWORD in RANDOM profile", function () {
        console.log("==================Check KEYWORD IN RANDOM PROFILE==================");
        common.checkKeywordInProfile(randomProfile, params.keyword);
        expect(Object.keys(randomProfile).length === 0).toBeFalsy();
    });

    it("features from random jobs should be equal to features  from BIGhash", function () {        
        var index = common.searchInArr(arrCloneForCompareAllProfiles, "name", randomProfile.name);        
        expect(arrCloneForCompareAllProfiles[index].name).toEqual(randomProfile.name);
        expect(arrCloneForCompareAllProfiles[index].title).toEqual(randomProfile.title);
        expect(arrCloneForCompareAllProfiles[index].descr).toEqual(randomProfile.descr);
        expect(arrCloneForCompareAllProfiles[index].skills).toEqual(randomProfile.skills);
    })

});
