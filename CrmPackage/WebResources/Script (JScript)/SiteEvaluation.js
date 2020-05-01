function setSketch() {
    if (Xrm.Page.data.entity.getIsDirty()) {
        
        var imageValue = Xrm.Page.getAttribute("bin_sketch").getValue(); 
       
        imageValue = imageValue.replace(/^data:image\/\w+;base64,/, "");
        Xrm.Page.getAttribute("bin_sketchcopy").setValue(imageValue);
    }
}

function onChangeBooleans() {
    var question1 = Xrm.Page.getAttribute("bin_overheadpowerlines").getValue();
    var question2 = Xrm.Page.getAttribute("bin_pedestriansaroundbin").getValue();
    var question3 = Xrm.Page.getAttribute("bin_trafficormachines").getValue();
    var question4 = Xrm.Page.getAttribute("bin_nostoppingzone").getValue();
    var question5 = Xrm.Page.getAttribute("bin_vehicleparking").getValue();
    var question6 = Xrm.Page.getAttribute("bin_drivermovebin").getValue();
    var question7 = Xrm.Page.getAttribute("bin_truckheightlimits").getValue();
    var question8 = Xrm.Page.getAttribute("bin_noiserestrictions").getValue();
    var question9 = Xrm.Page.getAttribute("bin_binsecured").getValue();
    var question10 = Xrm.Page.getAttribute("bin_biologicalhazards").getValue();
    var question11 = Xrm.Page.getAttribute("bin_poorlighting").getValue();
    var question12 = Xrm.Page.getAttribute("bin_upordownslope").getValue();
    var question13 = Xrm.Page.getAttribute("bin_groundconditions").getValue();
    var question14 = Xrm.Page.getAttribute("bin_factorsposingrisk").getValue();
    var question15 = Xrm.Page.getAttribute("bin_truckweightlimits").getValue();

    if (question1 == 1) {
        Xrm.Page.getAttribute("bin_overheadpowerlinescomments").setRequiredLevel("required");
    }
    else if (question1 == 0) {
        Xrm.Page.getAttribute("bin_overheadpowerlinescomments").setRequiredLevel("none");
    }
    if (question2 == 1) {
        Xrm.Page.getAttribute("bin_pedestriansaroundbincomment").setRequiredLevel("required");
    }
    else if (question2 == 0) {
        Xrm.Page.getAttribute("bin_pedestriansaroundbincomment").setRequiredLevel("none");
    }
    if (question3 == 1) {
        Xrm.Page.getAttribute("bin_trafficormachinescomments").setRequiredLevel("required");
    }
    else if (question3 == 0) {
        Xrm.Page.getAttribute("bin_trafficormachinescomments").setRequiredLevel("none");
    }
    if (question4 == 1) {
        Xrm.Page.getAttribute("bin_nostoppingzonecomments").setRequiredLevel("required");
    }
    else if (question4 == 0) {
        Xrm.Page.getAttribute("bin_nostoppingzonecomments").setRequiredLevel("none");
    }
    if (question5 == 1) {
        Xrm.Page.getAttribute("bin_vehicleparkingcomments").setRequiredLevel("required");
    }
    else if (question5 == 0) {
        Xrm.Page.getAttribute("bin_vehicleparkingcomments").setRequiredLevel("none");
    }
    if (question6 == 1) {
        Xrm.Page.getAttribute("bin_drivermovebincomments").setRequiredLevel("required");
    }
    else if (question6 == 0) {
        Xrm.Page.getAttribute("bin_drivermovebincomments").setRequiredLevel("none");
    }
    if (question7 == 1) {
        Xrm.Page.getAttribute("bin_truckheightlimitscomments").setRequiredLevel("required");
    }
    else if (question7 == 0) {
        Xrm.Page.getAttribute("bin_truckheightlimitscomments").setRequiredLevel("none");
    }
    if (question8 == 1) {
        Xrm.Page.getAttribute("bin_noiserestrictionscomments").setRequiredLevel("required");
    }
    else if (question8 == 0) {
        Xrm.Page.getAttribute("bin_noiserestrictionscomments").setRequiredLevel("none");
    }
    if (question9 == 1) {
        Xrm.Page.getAttribute("bin_binsecuredcomments").setRequiredLevel("required");
    }
    else if (question9 == 0) {
        Xrm.Page.getAttribute("bin_binsecuredcomments").setRequiredLevel("none");
    }
    if (question10 == 1) {
        Xrm.Page.getAttribute("bin_biologicalhazardscomments").setRequiredLevel("required");
    }
    else if (question10 == 0) {
        Xrm.Page.getAttribute("bin_biologicalhazardscomments").setRequiredLevel("none");
    }
    if (question11 == 1) {
        Xrm.Page.getAttribute("bin_poorlightingcomments").setRequiredLevel("required");
    }
    else if (question11 == 0) {
        Xrm.Page.getAttribute("bin_poorlightingcomments").setRequiredLevel("none");
    }
    if (question12 == 1) {
        Xrm.Page.getAttribute("bin_upordownslopecomments").setRequiredLevel("required");
    }
    else if (question12 == 0) {
        Xrm.Page.getAttribute("bin_upordownslopecomments").setRequiredLevel("none");
    }
    if (question13 == 1) {
        Xrm.Page.getAttribute("bin_groundconditionscomments").setRequiredLevel("required");
    }
    else if (question13 == 0) {
        Xrm.Page.getAttribute("bin_groundconditionscomments").setRequiredLevel("none");
    }
    if (question14 == 1) {
        Xrm.Page.getAttribute("bin_otherfactorscomments").setRequiredLevel("required");
    }
    else if (question14 == 0) {
        Xrm.Page.getAttribute("bin_otherfactorscomments").setRequiredLevel("none");
    }
    if (question15 == 1) {
        Xrm.Page.getAttribute("bin_truckweightlimitscomments").setRequiredLevel("required");
    }
    else if (question15 == 0) {
        Xrm.Page.getAttribute("bin_truckweightlimitscomments").setRequiredLevel("none");
    }
}