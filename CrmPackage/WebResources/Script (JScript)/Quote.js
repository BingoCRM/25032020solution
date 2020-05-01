//Warning notification
function warningNotification() {
    var appNeed = Xrm.Page.getAttribute("bin_approvalneed").getValue();
    var dateAppNeed = Xrm.Page.getAttribute("bin_dateapprovalneed").getValue();
    var deliveryAppNeed = Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").getValue();
    var sentForApp = Xrm.Page.getAttribute("bin_sendforapproval").getValue();
    var polyCoatedAppNeed = Xrm.Page.getAttribute("bin_polycoatedapprovalneed").getValue();
    var polyCoatedApp = Xrm.Page.getAttribute("bin_polycoatedapproved").getValue();

    if ((appNeed == true || dateAppNeed == true || deliveryAppNeed == true || polyCoatedAppNeed == true) && sentForApp == false) {
        Xrm.Page.ui.setFormNotification("This quote will need to get Approved by the manager. Please Send for Approval by clicking on the Send For Approval button.", "INFORMATION", "1");
        Xrm.Utility.alertDialog("This quote will need to get Approved by the manager. Please Send for Approval by clicking on the Send For Approval button.");
    }
}

//Send for Approval Button
function sendForApproval() {
    if (Xrm.Page.getAttribute("bin_sendforapproval").getValue() == false) {
        Xrm.Page.getControl("bin_sendforapproval").setDisabled(false);
        Xrm.Page.getAttribute("bin_sendforapproval").setValue(true);
        Xrm.Utility.alertDialog("Sent for Approval");
        Xrm.Page.data.save();
    }
    else {
        Xrm.Utility.alertDialog("This Quote has already sent for an approval");
    }
}



//Ribbon button display rule for Create PDF
function ApprovalNeedWarning() {
    var appNeed = Xrm.Page.getAttribute("bin_approvalneed").getValue();
    var dateAppNeed = Xrm.Page.getAttribute("bin_dateapprovalneed").getValue();
    var deliveryAppNeed = Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").getValue();
    var polyCoatedAppNeed = Xrm.Page.getAttribute("bin_polycoatedapprovalneed").getValue();
    if (appNeed == true || dateAppNeed == true || deliveryAppNeed == true || polyCoatedAppNeed == true) {
        Xrm.Utility.alertDialog("This quote will need to get Approved by the manager");
    }
}

//On create of form add default delivery fee
function onCreateForm() {
    var FormType = Xrm.Page.ui.getFormType();
    var Fee = Xrm.Page.getAttribute("bin_deliveryfee").getValue();

    if (((FormType == 2) && (Fee == null)) || (FormType == 1)) {
        Xrm.Page.getAttribute("bin_deliveryfeeboolean").setValue(true);
        Xrm.Page.getAttribute("bin_deliveryfee").setValue(50);
    }
}

//Calculate tolal of quote products + delivery fee
function total() {
    var totalLine = Xrm.Page.getAttribute("totallineitemamount").getValue();
    var deliveryFee = Xrm.Page.getAttribute("bin_deliveryfee").getValue();
    var total;
    if (deliveryFee != null) {
        total = totalLine + deliveryFee;
        Xrm.Page.getAttribute("bin_total").setValue(total);
    }
    else {
        Xrm.Page.getAttribute("bin_total").setValue(totalLine);
    }
}

//Set for delivery fee approval need or not
function onChangeDeliveryFee() {
    var deliveryFee = Xrm.Page.getAttribute("bin_deliveryfee").getValue();
    var dFeeApproved = Xrm.Page.getAttribute("bin_deliveryfeeapproved").getValue();
    if ((deliveryFee < 50) && (dFeeApproved == false)) {
        alert("in");
        Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").setValue(true);
    }
    else {
        Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").setValue(false);
    }
}

//Set for Poly Coated wheel amount approval need or not
function onChangePolyCoatedWheel() {
    var polyCoatedWheelAmount = Xrm.Page.getAttribute("bin_polycoatedwheels").getValue();
    var polyCoatedWheelBool = Xrm.Page.getAttribute("bin_polycoatedwheelsboolean").getValue();
    if (polyCoatedWheelAmount < 195 && polyCoatedWheelBool == true) {
        Xrm.Page.getAttribute("bin_polycoatedapprovalneed").setValue(true);
    }
    else {
        Xrm.Page.getAttribute("bin_polycoatedapprovalneed").setValue(false);
    }
}

//Create Service Agreement
function createServiceAgreement() {
    debugger;
    if (Xrm.Page.getAttribute("bin_serviceagreementsent").getValue() == false) {


        //Set the Service Agreement sent to Yes
       // Xrm.Page.getAttribute("bin_serviceagreementsent").setValue(true);

        //Retrive Quote data
        var QuoteID = Xrm.Page.data.entity.getId();
        Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$select=_bin_sitelocation_value,name,quotenumber,_opportunityid_value,quoteid,bin_additionalconditions,bin_startdate,bin_enddate,_customerid_value,_bin_primarycontact_value&$expand=quote_details($select=bin_disposalcharge,bin_excessrate,bin_exclude,bin_markup,bin_rentalrate,bin_serviceschedule,bin_tonneallowance,bin_total,bin_weightlimitkgm3,priceperunit,quantity,bin_binsize,description,productname,quotedetailid,quotedetailname)").then(
            function success(result) {

                var _bin_sitelocation_value = result["_bin_sitelocation_value"];
                var _bin_sitelocation_value_formatted = result["_bin_sitelocation_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_sitelocation_value_lookuplogicalname = result["_bin_sitelocation_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var name = result["name"];

                var _opportunityid_value = result["_opportunityid_value"];
                var _opportunityid_value_formatted = result["_opportunityid_value@OData.Community.Display.V1.FormattedValue"];
                var _opportunityid_value_lookuplogicalname = result["_opportunityid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var quoteid = result["quoteid"];

                var quotenumber = result["quotenumber"];

                var description = result["bin_additionalconditions"];

                var startDate = result["bin_startdate"];

                var endDate = result["bin_enddate"];

                var _customerid_value = result["_customerid_value"];
                var _customerid_value_formatted = result["_customerid_value@OData.Community.Display.V1.FormattedValue"];
                var _customerid_value_lookuplogicalname = result["_customerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
               

                var _bin_primarycontact_value = result["_bin_primarycontact_value"];
                var _bin_primarycontact_value_formatted = result["_bin_primarycontact_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_primarycontact_value_lookuplogicalname = result["_bin_primarycontact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                //quote lookup
                var lookupValueQ = new Array();
                lookupValueQ[0] = new Object();
                lookupValueQ[0].id = QuoteID; // GUID of the lookup id
                lookupValueQ[0].name = name; // Name of the lookup
                lookupValueQ[0].entityType = "quote"; //Entity Type of the lookup entity

                var qot = (lookupValueQ[0].id).replace("{", "").replace("}", "");

                for (var a = 0; a < result.quote_details.length; a++) {
                    var quote_details_bin_disposalcharge = result.quote_details[a]["bin_disposalcharge"];
                    var quote_details_bin_disposalcharge_formatted = result.quote_details[a]["bin_disposalcharge@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_excessrate = result.quote_details[a]["bin_excessrate"];
                    var quote_details_bin_excessrate_formatted = result.quote_details[a]["bin_excessrate@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_exclude = result.quote_details[a]["bin_exclude"];
                    var quote_details_bin_exclude_formatted = result.quote_details[a]["bin_exclude@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_markup = result.quote_details[a]["bin_markup"];
                    var quote_details_bin_markup_formatted = result.quote_details[a]["bin_markup@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_rentalrate = result.quote_details[a]["bin_rentalrate"];
                    var quote_details_bin_rentalrate_formatted = result.quote_details[a]["bin_rentalrate@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_serviceschedule = result.quote_details[a]["bin_serviceschedule"];
                    var quote_details_bin_serviceschedule_formatted = result.quote_details[a]["bin_serviceschedule@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_tonneallowance = result.quote_details[a]["bin_tonneallowance"];
                    var quote_details_bin_tonneallowance_formatted = result.quote_details[a]["bin_tonneallowance@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_total = result.quote_details[a]["bin_total"];
                    var quote_details_bin_total_formatted = result.quote_details[a]["bin_total@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_weightlimitkgm3 = result.quote_details[a]["bin_weightlimitkgm3"];
                    var quote_details_bin_weightlimitkgm3_formatted = result.quote_details[a]["bin_weightlimitkgm3@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_priceperunit = result.quote_details[a]["priceperunit"];
                    var quote_details_priceperunit_formatted = result.quote_details[a]["priceperunit@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_quantity = result.quote_details[a]["quantity"];
                    var quote_details_quantity_formatted = result.quote_details[a]["quantity@OData.Community.Display.V1.FormattedValue"];
                    var quote_details_bin_binsize = result.quote_details[a]["bin_binsize"];
                    var quote_details_description = result.quote_details[a]["description"];
                    var quote_details_productname = result.quote_details[a]["productname"];
                    var quote_details_quotedetailid = result.quote_details[a]["quotedetailid"];
                    var quote_details_quotedetailname = result.quote_details[a]["quotedetailname"];
                    
                          
                    if (quote_details_bin_exclude == false) {
                                                                                               
                        //create Service Agreement Products
                                var entity = {};
                               
                                if (quote_details_bin_binsize != null) {
                                    entity.bin_binsize = quote_details_bin_binsize;
                                    
                                }                  
                                if (quote_details_description != null) {
                                    entity.bin_description = quote_details_description;
                                    
                                } 
                                if (quote_details_bin_disposalcharge != null) {
                                    entity.bin_disposalcharge = Number(parseFloat(quote_details_bin_disposalcharge).toFixed(4));
                                    
                                } 
                                if (quote_details_bin_excessrate != null) {
                                    entity.bin_excesscharge = Number(parseFloat(quote_details_bin_excessrate).toFixed(4));
                                    
                                } 
                                if (quote_details_bin_rentalrate != null) {
                                    entity.bin_hirecharge = Number(parseFloat(quote_details_bin_rentalrate).toFixed(4));
                                   
                                } 
                                if (quote_details_bin_markup != null) {
                                    entity.bin_markup = quote_details_bin_markup;
                                    
                                } 
                                if (quote_details_productname != null) {
                                    entity.bin_name = quote_details_productname;
                                    
                                } 
                       
                                if (quote_details_quantity != null) {
                                    entity.bin_quantity = quote_details_quantity;
                                   
                                } 
                                if (quote_details_priceperunit != null) {
                                    entity.bin_serviceprice = Number(parseFloat(quote_details_priceperunit).toFixed(4));
                                    
                                } 
                                if (quote_details_bin_serviceschedule != null) {
                                    entity.bin_serviceschedule = quote_details_bin_serviceschedule;
                                  
                                } 
                       
                                if (quote_details_bin_tonneallowance != null) {
                                    entity.bin_tonne = quote_details_bin_tonneallowance;
                                   
                                } 
                                if (quote_details_bin_total != null) {
                                    entity.bin_total = quote_details_bin_total;
                                   
                                } 
                                if (quote_details_bin_weightlimitkgm3 != null) {
                                    entity.bin_weightlimit = quote_details_bin_weightlimitkgm3;
                                   
                                } 

                        //quote line lookup
                        var lookupValueQL = new Array();
                        lookupValueQL[0] = new Object();
                        lookupValueQL[0].id = quote_details_quotedetailid; // GUID of the lookup id
                        lookupValueQL[0].name = quote_details_quotedetailname; // Name of the lookup
                        lookupValueQL[0].entityType = "quotedetail"; //Entity Type of the lookup entity

                        var qotLine = (lookupValueQL[0].id).replace("{", "").replace("}", "");
                        entity["bin_quoteproduct@odata.bind"] = "/quotedetails(" + qotLine+ ")";
                       
                        entity["bin_quote@odata.bind"] = "/quotes(" + qot + ")";

                        Xrm.WebApi.online.createRecord("bin_serviceagreementline", entity).then(
                            function success(result) {
                                var newEntityId = result.id;
                                
                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                                );

                       
                            }
                }

                //get Site Location address
                Xrm.WebApi.online.retrieveRecord("bin_sitelocation", _bin_sitelocation_value, "?$select=bin_street1,bin_street2,_bin_sitepostcode_value,_bin_sitestate_value,_bin_sitesuburb_value").then(
                    function success(result) {
                        var streetOne = result["bin_street1"];
                        var streetTwo = result["bin_street2"];
                        var _bin_sitepostcode_value = result["_bin_sitepostcode_value"];
                        var _bin_sitepostcode_value_formatted = result["_bin_sitepostcode_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitepostcode_value_lookuplogicalname = result["_bin_sitepostcode_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _bin_sitestate_value = result["_bin_sitestate_value"];
                        var _bin_sitestate_value_formatted = result["_bin_sitestate_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitestate_value_lookuplogicalname = result["_bin_sitestate_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _bin_sitesuburb_value = result["_bin_sitesuburb_value"];
                        var _bin_sitesuburb_value_formatted = result["_bin_sitesuburb_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitesuburb_value_lookuplogicalname = result["_bin_sitesuburb_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var country = result["bin_country"];
                       
                        //get ABN from account
                        Xrm.WebApi.online.retrieveRecord("account", _customerid_value, "?$select=bin_abn").then(
                            function success(result) {
                                var abn = result["bin_abn"];


                                //get email address from contact
                                Xrm.WebApi.online.retrieveRecord("contact", _bin_primarycontact_value, "?$select=emailaddress1").then(
                                    function success(result) {
                                        var email = result["emailaddress1"];

                                        //create Service Agreement

                                        var entity = {};
                                        entity.bin_name = name;

                                        entity.bin_autonumber = quotenumber;

                                        entity.bin_comments = description;

                                        entity.bin_startdate = startDate;

                                        entity.bin_enddate = endDate;

                                        entity.bin_street1 = streetOne;
                                        entity.bin_street2 = streetTwo;
                                        entity.bin_suburb = _bin_sitesuburb_value_formatted;
                                        entity.bin_state = _bin_sitestate_value_formatted;
                                        entity.bin_postcode = _bin_sitepostcode_value_formatted;
                                        entity.bin_country = country;

                                        entity.bin_abn = abn;

                                        entity.emailaddress = email;

                                        //opportunity lookup
                                        var lookupValue = new Array();
                                        lookupValue[0] = new Object();
                                        lookupValue[0].id = _opportunityid_value; // GUID of the lookup id
                                        lookupValue[0].name = _opportunityid_value_formatted; // Name of the lookup
                                        lookupValue[0].entityType = _opportunityid_value_lookuplogicalname; //Entity Type of the lookup entity

                                        var opp = (lookupValue[0].id).replace("{", "").replace("}", "");
                                        entity["bin_opportunity@odata.bind"] = "/opportunities(" + opp + ")";
                                        
                                        entity["bin_quote@odata.bind"] = "/quotes(" + qot + ")";

                                        //Site Location lookup
                                        var lookupValueS = new Array();
                                        lookupValueS[0] = new Object();
                                        lookupValueS[0].id = _bin_sitelocation_value; // GUID of the lookup id
                                        lookupValueS[0].name = _bin_sitelocation_value_formatted; // Name of the lookup
                                        lookupValueS[0].entityType = _bin_sitelocation_value_lookuplogicalname; //Entity Type of the lookup entity

                                        var sl = (lookupValueS[0].id).replace("{", "").replace("}", "");
                                        // entity["bin_sitelocation@odata.bind"] = "/bin_sitelocations(" + sl + ")";

                                        //Account lookup
                                        var lookupValueA = new Array();
                                        lookupValueA[0] = new Object();
                                        lookupValueA[0].id = _customerid_value; // GUID of the lookup id
                                        lookupValueA[0].name = _customerid_value_formatted; // Name of the lookup
                                        lookupValueA[0].entityType = _customerid_value_lookuplogicalname; //Entity Type of the lookup entity

                                        var ac = (lookupValueA[0].id).replace("{", "").replace("}", "");
                                        entity["bin_account@odata.bind"] = "/accounts(" + ac + ")";

                                        //Primary contact lookup
                                        var lookupValueC = new Array();
                                        lookupValueC[0] = new Object();
                                        lookupValueC[0].id = _bin_primarycontact_value; // GUID of the lookup id
                                        lookupValueC[0].name = _bin_primarycontact_value_formatted; // Name of the lookup
                                        lookupValueC[0].entityType = _bin_primarycontact_value_lookuplogicalname; //Entity Type of the lookup entity

                                        var pc = (lookupValueC[0].id).replace("{", "").replace("}", "");
                                        entity["bin_primarycontact@odata.bind"] = "/contacts(" + pc + ")";

                                        Xrm.WebApi.online.createRecord("bin_serviceagreement", entity).then(
                                            function success(result) {

                                                var newEntityId = result.id;
                                                
                                                //below code is used to open the created record
                                                var windowOptions = {
                                                    openInNewWindow: true
                                                };

                                                //check if XRM.Utility is not null
                                                if (Xrm.Utility != null) {
                                                    //open the entity record
                                                    Xrm.Utility.openEntityForm("bin_serviceagreement", newEntityId, null, windowOptions);
                                                }

                                            },
                                            function (error) {
                                                Xrm.Utility.alertDialog(error.message);
                                            }
                                        );
                                    },

                                    function (error) {
                                        Xrm.Utility.alertDialog(error.message);
                                    }

                                );
                            },

                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }

                        );

                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            },

            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }

        );

    }
    else {
        Xrm.Utility.alertDialog("A Service Agreement has already been created for this Quote");
    }
}


//After the record get Approved
function onLoadApprovalNeed() {

    var appNeed = Xrm.Page.getAttribute("bin_approvalneed").getValue();
    var approved = Xrm.Page.getAttribute("bin_approved").getValue();
    if (approved == true && appNeed == false) {
        //update Quote Product
        var QuoteID = Xrm.Page.data.entity.getId();
        Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$expand=quote_details($select=bin_weightcheckapproved,bin_disposalratecheck,bin_disposalcharge,bin_disposalrateapproved,bin_weightlimitcheck,bin_weightlimitkgm3,bin_approvalneed,bin_excesscheckapproved,bin_excessrate,bin_excessratecheck,bin_hirecheckapproved,bin_hireratecheck,bin_rentalrate,bin_servicecheckapproved,bin_serviceratecheck,priceperunit,quotedetailid,quotedetailname)").then(
            function success(result) {
                
                var quoteid = result["quoteid"];
                for (var a = 0; a < result.quote_details.length; a++) {
                    var quote_details_bin_approvalneed = result.quote_details[a]["bin_approvalneed"];
                    var quote_details_bin_approvalneed_formatted = result.quote_details[a]["bin_approvalneed@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_excesscheckapproved = result.quote_details[a]["bin_excesscheckapproved"];
                    var quote_details_bin_excesscheckapproved_formatted = result.quote_details[a]["bin_excesscheckapproved@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_excessrate = result.quote_details[a]["bin_excessrate"];
                    var quote_details_bin_excessrate_formatted = result.quote_details[a]["bin_excessrate@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_excessratecheck = result.quote_details[a]["bin_excessratecheck"];
                    var quote_details_bin_excessratecheck_formatted = result.quote_details[a]["bin_excessratecheck@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_hirecheckapproved = result.quote_details[a]["bin_hirecheckapproved"];
                    var quote_details_bin_hirecheckapproved_formatted = result.quote_details[a]["bin_hirecheckapproved@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_hireratecheck = result.quote_details[a]["bin_hireratecheck"];
                    var quote_details_bin_hireratecheck_formatted = result.quote_details[a]["bin_hireratecheck@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_rentalrate = result.quote_details[a]["bin_rentalrate"];
                    var quote_details_bin_rentalrate_formatted = result.quote_details[a]["bin_rentalrate@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_servicecheckapproved = result.quote_details[a]["bin_servicecheckapproved"];
                    var quote_details_bin_servicecheckapproved_formatted = result.quote_details[a]["bin_servicecheckapproved@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_serviceratecheck = result.quote_details[a]["bin_serviceratecheck"];
                    var quote_details_bin_serviceratecheck_formatted = result.quote_details[a]["bin_serviceratecheck@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_priceperunit = result.quote_details[a]["priceperunit"];
                    var quote_details_priceperunit_formatted = result.quote_details[a]["priceperunit@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_weightcheckapproved = result.quote_details[a]["bin_weightcheckapproved"];
                    var quote_details_bin_weightcheckapproved_formatted = result.quote_details[a]["bin_weightcheckapproved@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_weightlimitcheck = result.quote_details[a]["bin_weightlimitcheck"];
                    var quote_details_bin_weightlimitcheck_formatted = result.quote_details[a]["bin_weightlimitcheck@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_disposalratecheck = result.quote_details[a]["bin_disposalratecheck"];
                    var quote_details_bin_disposalratecheck_formatted = result.quote_details[a]["bin_disposalratecheck@OData.Community.Display.V1.FormattedValue"];
                   
                    var quote_details_bin_disposalrateapproved = result.quote_details[a]["bin_disposalrateapproved"];
                    var quote_details_bin_disposalrateapproved_formatted = result.quote_details[a]["bin_disposalrateapproved@OData.Community.Display.V1.FormattedValue"];
                   
                    var quote_details_bin_disposalcharge = result.quote_details[a]["bin_disposalcharge"];
                    var quote_details_bin_disposalcharge_formatted = result.quote_details[a]["bin_disposalcharge@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_bin_weightlimitkgm3 = result.quote_details[a]["bin_weightlimitkgm3"];
                    var quote_details_bin_weightlimitkgm3_formatted = result.quote_details[a]["bin_weightlimitkgm3@OData.Community.Display.V1.FormattedValue"];

                    var quote_details_quotedetailid = result.quote_details[a]["quotedetailid"];

                    var quote_details_quotedetailname = result.quote_details[a]["quotedetailname"];

                    if (quote_details_bin_approvalneed == true) {
                       
                        if ((quote_details_bin_serviceratecheck == true && quote_details_bin_servicecheckapproved == false) || (quote_details_bin_excessratecheck == true && quote_details_bin_excesscheckapproved == false) || (quote_details_bin_hireratecheck == true && quote_details_bin_hirecheckapproved == false) || (quote_details_bin_weightlimitcheck == true && quote_details_bin_weightcheckapproved == false) || (quote_details_bin_disposalratecheck == true && quote_details_bin_disposalrateapproved == false)) {
                            var entity = {};
                            entity.bin_approvalneed = false;
                            if (quote_details_bin_serviceratecheck == true && quote_details_bin_servicecheckapproved == false) {
                                entity.bin_servicecheckapproved = true;
                                entity.bin_approvedservicevalue = Number(parseFloat(quote_details_priceperunit).toFixed(4));
                            }
                            if (quote_details_bin_excessratecheck == true && quote_details_bin_excesscheckapproved == false) {
                                entity.bin_excesscheckapproved = true;
                                entity.bin_approvedexcessvalue = Number(parseFloat(quote_details_bin_excessrate).toFixed(4));
                            }
                            if (quote_details_bin_hireratecheck == true && quote_details_bin_hirecheckapproved == false) {
                                entity.bin_hirecheckapproved = true;
                                entity.bin_approvedhirevalue = Number(parseFloat(quote_details_bin_rentalrate).toFixed(4));
                            }
                            if (quote_details_bin_weightlimitcheck == true && quote_details_bin_weightcheckapproved == false) {
                                entity.bin_weightcheckapproved = true;
                                entity.bin_approvedweightlimit = quote_details_bin_weightlimitkgm3;
                            }
                            if (quote_details_bin_disposalratecheck == true && quote_details_bin_disposalrateapproved == false) {
                               
                                entity.bin_disposalrateapproved = true;
                                entity.bin_approveddisposalrate = quote_details_bin_disposalcharge;
                            }

                            Xrm.WebApi.online.updateRecord("quotedetail", quote_details_quotedetailid, entity).then(
                                function success(result) {
                                    var updatedEntityId = result.id;
                                },
                                function (error) {
                                    Xrm.Utility.alertDialog(error.message);
                                }
                            );

                        }
                    }

                }
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

//Create Site Evaluation
function createSiteEvaluation() {
    if (Xrm.Page.getAttribute("bin_siteevaluationcreated").getValue() == false) {

        //Set the Site Evaluation Created to Yes
        Xrm.Page.getAttribute("bin_siteevaluationcreated").setValue(true);

        //Retrive Quote data
        var QuoteID = Xrm.Page.data.entity.getId();
        Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$select=_bin_sitelocation_value,name,quotenumber,_opportunityid_value,quoteid,description,bin_startdate,bin_enddate,_customerid_value,_bin_primarycontact_value").then(
            function success(result) {

                var _bin_sitelocation_value = result["_bin_sitelocation_value"];
                var _bin_sitelocation_value_formatted = result["_bin_sitelocation_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_sitelocation_value_lookuplogicalname = result["_bin_sitelocation_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var name = result["name"];

                var _opportunityid_value = result["_opportunityid_value"];
                var _opportunityid_value_formatted = result["_opportunityid_value@OData.Community.Display.V1.FormattedValue"];
                var _opportunityid_value_lookuplogicalname = result["_opportunityid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var quoteid = result["quoteid"];

                var quotenumber = result["quotenumber"];

                var _customerid_value = result["_customerid_value"];
                var _customerid_value_formatted = result["_customerid_value@OData.Community.Display.V1.FormattedValue"];
                var _customerid_value_lookuplogicalname = result["_customerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var _bin_primarycontact_value = result["_bin_primarycontact_value"];
                var _bin_primarycontact_value_formatted = result["_bin_primarycontact_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_primarycontact_value_lookuplogicalname = result["_bin_primarycontact_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                //get Site Location address
                Xrm.WebApi.online.retrieveRecord("bin_sitelocation", _bin_sitelocation_value, "?$select=bin_street1,bin_street2,_bin_sitepostcode_value,_bin_sitestate_value,_bin_sitesuburb_value").then(
                    function success(result) {
                        var streetOne = result["bin_street1"];
                        var streetTwo = result["bin_street2"];
                        var _bin_sitepostcode_value = result["_bin_sitepostcode_value"];
                        var _bin_sitepostcode_value_formatted = result["_bin_sitepostcode_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitepostcode_value_lookuplogicalname = result["_bin_sitepostcode_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _bin_sitestate_value = result["_bin_sitestate_value"];
                        var _bin_sitestate_value_formatted = result["_bin_sitestate_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitestate_value_lookuplogicalname = result["_bin_sitestate_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var _bin_sitesuburb_value = result["_bin_sitesuburb_value"];
                        var _bin_sitesuburb_value_formatted = result["_bin_sitesuburb_value@OData.Community.Display.V1.FormattedValue"];
                        var _bin_sitesuburb_value_lookuplogicalname = result["_bin_sitesuburb_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        var country = result["bin_country"];
                        

                        //create Site Evaluation Agreement
                        var entity = {};
                        entity.bin_name = name;

                        entity.bin_autonumber = quotenumber;

                        entity.bin_street1 = streetOne;
                        entity.bin_street2 = streetTwo;
                        entity.bin_suburb = _bin_sitesuburb_value_formatted;
                        entity.bin_state = _bin_sitestate_value_formatted;
                        entity.bin_postcode = _bin_sitepostcode_value_formatted;
                        entity.bin_country = country;

                        //Account lookup
                        var lookupValueA = new Array();
                        lookupValueA[0] = new Object();
                        lookupValueA[0].id = _customerid_value; // GUID of the lookup id
                        lookupValueA[0].name = _customerid_value_formatted; // Name of the lookup
                        lookupValueA[0].entityType = _customerid_value_lookuplogicalname; //Entity Type of the lookup entity

                        var ac = (lookupValueA[0].id).replace("{", "").replace("}", "");
                        entity["bin_account@odata.bind"] = "/accounts(" + ac + ")";

                        //Primary contact lookup
                        var lookupValueC = new Array();
                        lookupValueC[0] = new Object();
                        lookupValueC[0].id = _bin_primarycontact_value; // GUID of the lookup id
                        lookupValueC[0].name = _bin_primarycontact_value_formatted; // Name of the lookup
                        lookupValueC[0].entityType = _bin_primarycontact_value_lookuplogicalname; //Entity Type of the lookup entity

                        var pc = (lookupValueC[0].id).replace("{", "").replace("}", "");
                        entity["bin_contact@odata.bind"] = "/contacts(" + pc + ")";

                        //quote lookup
                        var lookupValueQ = new Array();
                        lookupValueQ[0] = new Object();
                        lookupValueQ[0].id = QuoteID; // GUID of the lookup id
                        lookupValueQ[0].name = name; // Name of the lookup
                        lookupValueQ[0].entityType = "quote"; //Entity Type of the lookup entity

                        var qot = (lookupValueQ[0].id).replace("{", "").replace("}", "");
                        entity["bin_quote@odata.bind"] = "/quotes(" + qot + ")";

                        Xrm.WebApi.online.createRecord("bin_siteevaluation", entity).then(
                            function success(result) {
                                var newEntityId = result.id;

                                //below code is used to open the created record
                                var windowOptions = {
                                    openInNewWindow: true
                                };

                                //check if XRM.Utility is not null
                                if (Xrm.Utility != null) {

                                    //open the entity record
                                    Xrm.Utility.openEntityForm("bin_siteevaluation", newEntityId, null, windowOptions);
                                }

                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );
                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
    else {
        Xrm.Utility.alertDialog("A Site Evaluation has already been created for this Quote");
    }
}

function totalContractValue() {
    var formType = Xrm.Page.ui.getFormType();

    if (formType != 1) {
        //Check Quote frequency
        //Weekly = 1
        //Monthly = 2
        var quoteFrequency = Xrm.Page.getAttribute("bin_frequency").getValue();

        var QuoteID = Xrm.Page.data.entity.getId();

        //Get years of contract
        var yearsOfContract = Xrm.Page.getAttribute("bin_years").getValue();
        if (yearsOfContract == null) {
            yearsOfContract = 1;
        }

        //Delivery Fee
        var deliveryFee = Xrm.Page.getAttribute("bin_deliveryfee").getValue();

        //Std Lids Wheels
        var stdlidswheels = Xrm.Page.getAttribute("bin_stdlidswheels").getValue();

        //Padlock Bar or Chain
        var padlockbarorchain = Xrm.Page.getAttribute("bin_padlockbarorchain").getValue();

        //Thick Lids w/ Lid Stays
        var thicklidswlidstays = Xrm.Page.getAttribute("bin_thicklidswlidstays").getValue();

        //Bin Cleaning Fee
        var bincleaningfee = Xrm.Page.getAttribute("bin_bincleaningfee").getValue();

        //Poly Coated Wheels
        var polycoatedwheels = Xrm.Page.getAttribute("bin_polycoatedwheels").getValue();
        /*
        //If Quote Frequency is Weekly - calculate Total Contract Value
        if (quoteFrequency == 1) {
            // Get Quote Product Service Schedule, Service price per unit, Hire Charge, Markup Percentage, Total
            Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$expand=quote_details($select=bin_markup,bin_rentalrate,bin_serviceschedule,bin_total,priceperunit,quantity,quotedetailid,bin_itemhirerate)").then(
                function success(result) {
                    var quoteid = result["quoteid"];
                    var totalContactValue = 0;
                    
                    for (var a = 0; a < result.quote_details.length; a++) {
                        var quote_details_bin_markup = result.quote_details[a]["bin_markup"];
                        var quote_details_bin_markup_formatted = result.quote_details[a]["bin_markup@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_rentalrate = result.quote_details[a]["bin_rentalrate"];
                        var quote_details_bin_rentalrate_formatted = result.quote_details[a]["bin_rentalrate@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_serviceschedule = result.quote_details[a]["bin_serviceschedule"];
                        var quote_details_bin_serviceschedule_formatted = result.quote_details[a]["bin_serviceschedule@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_total = result.quote_details[a]["bin_total"];
                        var quote_details_bin_total_formatted = result.quote_details[a]["bin_total@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_priceperunit = result.quote_details[a]["priceperunit"];
                        var quote_details_priceperunit_formatted = result.quote_details[a]["priceperunit@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_quantity = result.quote_details[a]["quantity"];
                        var quote_details_quantity_formatted = result.quote_details[a]["quantity@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_quotedetailid = result.quote_details[a]["quotedetailid"];
                        var quote_details_bin_itemhirerate = result.quote_details[a]["bin_itemhirerate"];
                        var quote_details_bin_itemhirerate_formatted = result.quote_details[a]["bin_itemhirerate@OData.Community.Display.V1.FormattedValue"];
    
                        //Hire charge/4.345
                        var hireRateWeekly = quote_details_bin_itemhirerate / 4.345;
                      
                        if (quote_details_bin_markup == null) {
                            //Service Shedule for weekly
                            //if 8 =1/2 , 9 = 1/4.345, 10 = 1/4.345
                            
                            if (quote_details_bin_serviceschedule == 8) {
                                quote_details_bin_serviceschedule = 0.5;
                            }
    
                            if (quote_details_bin_serviceschedule == 9 || quote_details_bin_serviceschedule == 10) {
                                quote_details_bin_serviceschedule = 0.23;
                            }
                            alert(quote_details_bin_total);
                            var productValue = (quote_details_bin_total * quote_details_bin_serviceschedule + hireRateWeekly) * quote_details_quantity * 52 * yearsOfContract;
                           
                            
                        }
                        else {
                           
                            if (quote_details_bin_serviceschedule == 8) {
                                quote_details_bin_serviceschedule = 0.5;
                            }
    
                            if (quote_details_bin_serviceschedule == 9 || quote_details_bin_serviceschedule == 10) {
                                quote_details_bin_serviceschedule = 0.23;
                            }
                            
                            var productValue = (quote_details_bin_total * quote_details_bin_serviceschedule + hireRateWeekly) * quote_details_quantity * 52 * yearsOfContract;
                            
                        }
                        
                        totalContactValue = totalContactValue + productValue;
    
                       
                        var entity = {};
                        entity.bin_rentalrate = Number(parseFloat(hireRateWeekly).toFixed(4));
    
                        Xrm.WebApi.online.updateRecord("quotedetail", quote_details_quotedetailid, entity).then(
                            function success(result) {
                                var updatedEntityId = result.id;
                            },
                            function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }
                        );
    
                    }
                    totalContactValue = totalContactValue + deliveryFee + stdlidswheels + padlockbarorchain + thicklidswlidstays + bincleaningfee + polycoatedwheels;
                    
                    //Set Total Contract value for Weekly
                    Xrm.Page.getAttribute("bin_totalcontractvalue").setValue(totalContactValue);
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
    
        }
        */
        //If Quote Frequency is Monthly default option - calculate Total Contract Value ( Yearly charge)
        if (quoteFrequency == 2) {

            // Get Quote Product Service Schedule, Service price per unit, Hire Charge, Markup Percentage, Total
            Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$expand=quote_details($select=bin_disposalcharge,bin_tonneallowance,bin_markup,bin_rentalrate,bin_serviceschedule,bin_total,priceperunit,quantity,quotedetailid,bin_exclude)").then(
                function success(result) {

                    var quoteid = result["quoteid"];
                    var totalContactValue = 0;
                    for (var a = 0; a < result.quote_details.length; a++) {
                        var quote_details_bin_markup = result.quote_details[a]["bin_markup"];
                        var quote_details_bin_markup_formatted = result.quote_details[a]["bin_markup@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_rentalrate = result.quote_details[a]["bin_rentalrate"];
                        var quote_details_bin_rentalrate_formatted = result.quote_details[a]["bin_rentalrate@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_serviceschedule = result.quote_details[a]["bin_serviceschedule"];
                        var quote_details_bin_serviceschedule_formatted = result.quote_details[a]["bin_serviceschedule@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_total = result.quote_details[a]["bin_total"];
                        var quote_details_bin_total_formatted = result.quote_details[a]["bin_total@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_priceperunit = result.quote_details[a]["priceperunit"];
                        var quote_details_priceperunit_formatted = result.quote_details[a]["priceperunit@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_quantity = result.quote_details[a]["quantity"];
                        var quote_details_quantity_formatted = result.quote_details[a]["quantity@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_quotedetailid = result.quote_details[a]["quotedetailid"];
                        var quote_details_bin_exclude = result.quote_details[a]["bin_exclude"];
                        var quote_details_bin_exclude_formatted = result.quote_details[a]["bin_exclude@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_disposalcharge = result.quote_details[a]["bin_disposalcharge"];
                        var quote_details_bin_disposalcharge_formatted = result.quote_details[a]["bin_disposalcharge@OData.Community.Display.V1.FormattedValue"];
                        var quote_details_bin_tonneallowance = result.quote_details[a]["bin_tonneallowance"];
                        var quote_details_bin_tonneallowance_formatted = result.quote_details[a]["bin_tonneallowance@OData.Community.Display.V1.FormattedValue"];

                       // alert(quote_details_bin_exclude);
                        if (quote_details_bin_exclude != true) {

                        
                        if (quote_details_bin_markup == null) {
                            //Service Shedule for monthly
                            //if 1 = 4, 2 = 8, 3 = 12, 4 = 16, 5 = 20, 6 =24, 7 = 28, 8 = 2, 9 = 1, 10 = 1, 11 =
                            var serviceShedule;


                            if (quote_details_bin_serviceschedule == 1) {
                                serviceShedule = 52;
                            }
                            if (quote_details_bin_serviceschedule == 2) {
                                serviceShedule = 104;
                            }
                            if (quote_details_bin_serviceschedule == 3) {
                                serviceShedule = 156;
                            }
                            if (quote_details_bin_serviceschedule == 4) {
                                serviceShedule = 208;
                            }
                            if (quote_details_bin_serviceschedule == 5) {
                                serviceShedule = 260;
                            }
                            if (quote_details_bin_serviceschedule == 6) {
                                serviceShedule = 312;
                            }
                            if (quote_details_bin_serviceschedule == 7) {
                                serviceShedule = 364;
                            }
                            if (quote_details_bin_serviceschedule == 8) {
                                serviceShedule = 26;
                            }
                            if (quote_details_bin_serviceschedule == 9 || quote_details_bin_serviceschedule == 10) {
                                serviceShedule = 12;
                            }
                            if (quote_details_bin_serviceschedule == 11) {
                                serviceShedule = 1;
                            }

                            if (quote_details_bin_disposalcharge != null) {
                                var productValue = ((quote_details_priceperunit + quote_details_bin_disposalcharge * quote_details_bin_tonneallowance) * serviceShedule) * quote_details_quantity * yearsOfContract;
                            }
                            else {
                                var productValue = (quote_details_priceperunit * serviceShedule + quote_details_bin_rentalrate * 12) * quote_details_quantity * yearsOfContract;
                            }
                         

                        }
                        else {

                            if (quote_details_bin_serviceschedule == 1) {
                                serviceShedule = 52;
                            }
                            if (quote_details_bin_serviceschedule == 2) {
                                serviceShedule = 104;
                            }
                            if (quote_details_bin_serviceschedule == 3) {
                                serviceShedule = 156;
                            }
                            if (quote_details_bin_serviceschedule == 4) {
                                serviceShedule = 208;
                            }
                            if (quote_details_bin_serviceschedule == 5) {
                                serviceShedule = 260;
                            }
                            if (quote_details_bin_serviceschedule == 6) {
                                serviceShedule = 312;
                            }
                            if (quote_details_bin_serviceschedule == 7) {
                                serviceShedule = 364;
                            }
                            if (quote_details_bin_serviceschedule == 8) {
                                serviceShedule = 26;
                            }
                            if (quote_details_bin_serviceschedule == 9 || quote_details_bin_serviceschedule == 10) {
                                serviceShedule = 12;
                            }

                            if (quote_details_bin_disposalcharge != null) {
                                var productValue = ((quote_details_bin_total + quote_details_bin_disposalcharge * quote_details_bin_tonneallowance) * serviceShedule) * yearsOfContract;
                            }
                            else {
                                var productValue = (quote_details_bin_total * serviceShedule + quote_details_bin_rentalrate * 12) * yearsOfContract;
                            }
                            
                        }

                        totalContactValue = totalContactValue + productValue;
                        }
                    }
                    totalContactValue = totalContactValue + deliveryFee + stdlidswheels + padlockbarorchain + thicklidswlidstays + bincleaningfee + polycoatedwheels;



                    //Set Total Contract value for Monthly

                    Xrm.Page.getAttribute("bin_totalcontractvalue").setValue(totalContactValue);


                },
                function (error) {

                    Xrm.Utility.alertDialog(error.message);
                }
            );

        }



    }



}

function amountFields() {
    var dFeeBool = Xrm.Page.getAttribute("bin_deliveryfeeboolean").getValue();
    var stdLidsBool = Xrm.Page.getAttribute("bin_stdlidswheelsboolean").getValue();
    var padlockBool = Xrm.Page.getAttribute("bin_padlockbarorchainboolean").getValue();
    var thikLidsBool = Xrm.Page.getAttribute("bin_thicklidswlidstaysboolean").getValue();
    var binCleaningBool = Xrm.Page.getAttribute("bin_bincleaningfeeboolean").getValue();
    var polyCoatedBool = Xrm.Page.getAttribute("bin_polycoatedwheelsboolean").getValue();
    var standardBool = Xrm.Page.getAttribute("bin_standardwheels").getValue();
    var wheelBreakBool = Xrm.Page.getAttribute("bin_wheelbrakes").getValue();
    //Delivery Fee fields
    if (dFeeBool == false) {
        Xrm.Page.getAttribute("bin_deliveryfee").setValue(0);
        if (Xrm.Page.getAttribute("bin_deliveryfeeapproved").getValue() != true) {
            Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").setValue(true);
        }
        
        Xrm.Page.getControl("bin_deliveryfee").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_deliveryfee").setVisible(true);
    }
    //Std Lids/Wheels
    if (stdLidsBool == false) {
        Xrm.Page.getAttribute("bin_stdlidswheels").setValue(0);
        Xrm.Page.getControl("bin_stdlidswheels").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_stdlidswheels").setVisible(true);
    }
    //Padlock & Bar or Chain
    if (padlockBool == false) {
        Xrm.Page.getAttribute("bin_padlockbarorchain").setValue(0);
        Xrm.Page.getControl("bin_padlockbarorchain").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_padlockbarorchain").setVisible(true);
    }
    //Thick Lids w/Lid Stays
    if (thikLidsBool == false) {
        Xrm.Page.getAttribute("bin_thicklidswlidstays").setValue(0);
        Xrm.Page.getControl("bin_thicklidswlidstays").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_thicklidswlidstays").setVisible(true);
    }
    //Bin Cleaning 
    if (binCleaningBool == false) {
        Xrm.Page.getAttribute("bin_bincleaningfee").setValue(0);
        Xrm.Page.getControl("bin_bincleaningfee").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_bincleaningfee").setVisible(true);
    }
    //Standard Wheels 
    if (standardBool == false) {
        Xrm.Page.getAttribute("bin_standardwheelsamount").setValue(0);
        Xrm.Page.getControl("bin_standardwheelsamount").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_standardwheelsamount").setVisible(true);
    }
    //Wheel Brakes
    if (wheelBreakBool == false) {
        Xrm.Page.getAttribute("bin_wheelbrakesamount").setValue(0);
        Xrm.Page.getControl("bin_wheelbrakesamount").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_wheelbrakesamount").setVisible(true);
    }
    //Poly Coated
    if (polyCoatedBool == false) {
        Xrm.Page.getAttribute("bin_polycoatedwheels").setValue(0);
        Xrm.Page.getControl("bin_polycoatedwheels").setVisible(false);
    }
    else {
        Xrm.Page.getControl("bin_polycoatedwheels").setVisible(true);
    }
}

function polyCoatedOnChange() {
    var polyCoatedAmount = Xrm.Page.getControl("bin_polycoatedwheels").getVisible();
    var polyCoatedBool = Xrm.Page.getAttribute("bin_polycoatedwheelsboolean").getValue();
    if (polyCoatedBool == true) {
        Xrm.Page.getAttribute("bin_polycoatedwheels").setValue(195);
    }

}

function serviceTimesFieldVisibility() {
    var serviceTimes = Xrm.Page.getAttribute("bin_servicetimes").getValue();

    if (serviceTimes == 3) {
        //Set Visible true to access times
        Xrm.Page.getControl("bin_accesstimefrom").setVisible(true);
        Xrm.Page.getControl("bin_accesstimeto").setVisible(true);
    }
    if (serviceTimes == 1 || serviceTimes == 2) {
        //Set Visible false to access times
        Xrm.Page.getControl("bin_accesstimefrom").setVisible(false);
        Xrm.Page.getControl("bin_accesstimeto").setVisible(false);
    }

}

function AccessTimeFromOnChange() {
    var accessFrom = Xrm.Page.getAttribute("bin_accesstimefrom").getValue();
    if (accessFrom == 6) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(14);
    }
    if (accessFrom == 7) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(15);
    }
    if (accessFrom == 8) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(16);
    }
    if (accessFrom == 9) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(17);
    }
    if (accessFrom == 10) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(18);
    }
    if (accessFrom == 11) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(19);
    }
    if (accessFrom == 12) {
        //set Access time to
        Xrm.Page.getAttribute("bin_accesstimeto").setValue(20);
    }
}


function wonQuote() {
    var QuoteID = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");

    var quoteclose = {
        "quoteid@odata.bind": "/quotes(" + QuoteID + ")",
        "subject": "Quote Won Subject",
        "actualend": new Date(),
        "description": "Your description here"
    };

    var winQuoteRequest = {
        QuoteClose: quoteclose,
        Status: -1,

        getMetadata: function () {
            return {
                boundParameter: null,
                parameterTypes: {
                    "QuoteClose": {
                        "typeName": "mscrm.quoteclose",
                        "structuralProperty": 5
                    },
                    "Status": {
                        "typeName": "Edm.Int32",
                        "structuralProperty": 1
                    }
                },
                operationType: 0,
                operationName: "WinQuote"
            };
        }
    };

    Xrm.WebApi.online.execute(winQuoteRequest).then(
        function success(result) {
            if (result.ok) {
                Xrm.Utility.alertDialog("This quote has been closed as Won");
                //Success - No Return Data - Do Something
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

//Get all Price List Items
function getAllPriceListItems() {
    /*
    //Get Price List ID
    var priceList = Xrm.Page.getAttribute("pricelevelid").getValue();
    alert(priceList);
    var priceListId = priceList[0].id; // GUID of the lookup id
    var priceListName = priceList[0].name; // Name of the lookup
    var priceListType = priceList[0].entityType; //Entity Type of the lookup entity

    alert(priceListId);
    //Retrive Quote data
    var QuoteID = Xrm.Page.data.entity.getId();
   
    Xrm.WebApi.online.retrieveRecord("pricelevel", priceListId, "?$expand=price_level_product_price_levels($select=amount,bin_excessrate,bin_markup,bin_rentalrate,productid,productpricelevelid)").then(
                function success(result) {
                    alert("b");
                    var pricelevelid = result["pricelevelid"];
                    for (var a = 0; a < result.price_level_product_price_levels.length; a++) {
                        var price_level_product_price_levels_amount = result.price_level_product_price_levels[a]["amount"];
                        var price_level_product_price_levels_amount_formatted = result.price_level_product_price_levels[a]["amount@OData.Community.Display.V1.FormattedValue"];
                        var price_level_product_price_levels_bin_excessrate = result.price_level_product_price_levels[a]["bin_excessrate"];
                        var price_level_product_price_levels_bin_excessrate_formatted = result.price_level_product_price_levels[a]["bin_excessrate@OData.Community.Display.V1.FormattedValue"];
                        var price_level_product_price_levels_bin_markup = result.price_level_product_price_levels[a]["bin_markup"];
                        var price_level_product_price_levels_bin_markup_formatted = result.price_level_product_price_levels[a]["bin_markup@OData.Community.Display.V1.FormattedValue"];
                        var price_level_product_price_levels_bin_rentalrate = result.price_level_product_price_levels[a]["bin_rentalrate"];
                        var price_level_product_price_levels_bin_rentalrate_formatted = result.price_level_product_price_levels[a]["bin_rentalrate@OData.Community.Display.V1.FormattedValue"];
                        var price_level_product_price_levels_productid = result.price_level_product_price_levels[a]["productid"];
                        var price_level_product_price_levels_productpricelevelid = result.price_level_product_price_levels[a]["productpricelevelid"];

                        alert(price_level_product_price_levels_productid);
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
    */
}

function approveEnable() {
    debugger;
    try {
        var QuoteID = Xrm.Page.data.entity.getId();
        
        Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$select=_ownerid_value,_owninguser_value").then(
            function success(result) {
                var _ownerid_value = result["_ownerid_value"];
                var _ownerid_value_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
                var _ownerid_value_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                //get the owner's manager
                Xrm.WebApi.online.retrieveRecord("systemuser", _ownerid_value, "?$select=_parentsystemuserid_value").then(
                    function success(result) {
                        var _parentsystemuserid_value = result["_parentsystemuserid_value"];
                        var _parentsystemuserid_value_formatted = result["_parentsystemuserid_value@OData.Community.Display.V1.FormattedValue"];
                        var _parentsystemuserid_value_lookuplogicalname = result["_parentsystemuserid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                      
                        var context = Xrm.Page.context;
                        var UserID = context.getUserId();
                        
                        var userID = (UserID).replace("{", "").replace("}", "");
                        if (_parentsystemuserid_value.toUpperCase() == userID) {
                           
                            return true;
                        }
                        else {
                            return false;
                        }
                    },
                    function (error) {
                        Xrm.Utility.alertDialog(error.message);
                    }
                );
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
    catch (e) {
       // alert("EnableDisableRibbon_ApproveTop : " + e.message);
    }
}
function Approve() {
    debugger;
    var QuoteID = Xrm.Page.data.entity.getId();
    
    Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$select=_ownerid_value,_owninguser_value").then(
        function success(result) {
            var _ownerid_value = result["_ownerid_value"];
           
            var _ownerid_value_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
            var _ownerid_value_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

            //get the owner's manager
            Xrm.WebApi.online.retrieveRecord("systemuser", _ownerid_value, "?$select=_parentsystemuserid_value").then(
                function success(result) {
                    var _parentsystemuserid_value = result["_parentsystemuserid_value"];
                    var _parentsystemuserid_value_formatted = result["_parentsystemuserid_value@OData.Community.Display.V1.FormattedValue"];
                    var _parentsystemuserid_value_lookuplogicalname = result["_parentsystemuserid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    
                    var context = Xrm.Page.context;
                    var UserID = context.getUserId();
                   
                    var userID = (UserID).replace("{", "").replace("}", "");
                    if (_parentsystemuserid_value.toUpperCase() == userID) {
                        
                        if (Xrm.Page.getAttribute("bin_sendforapproval").getValue() == true) {
                            //Approve the quote
                            Xrm.Page.getAttribute("bin_recordapproved").setValue(true);
                           
                            Xrm.Page.getAttribute("bin_approvalneed").setValue(false);
                            Xrm.Page.getAttribute("bin_approved").setValue(true);
                            Xrm.Page.getAttribute("bin_sendforapproval").setValue(false);

                            if (Xrm.Page.getAttribute("bin_dateapprovalneed").getValue() == true) {
                                Xrm.Page.getAttribute("bin_dateapproved").setValue(true);
                                Xrm.Page.getAttribute("bin_dateapprovalneed").setValue(false);
                            }
                            if (Xrm.Page.getAttribute("bin_polycoatedapprovalneed").getValue() == true) {
                                Xrm.Page.getAttribute("bin_polycoatedapproved").setValue(true);
                                Xrm.Page.getAttribute("bin_polycoatedapprovalneed").setValue(false);
                            }
                            if (Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").getValue() == true) {
                                Xrm.Page.getAttribute("bin_deliveryfeeapproved").setValue(true);
                                Xrm.Page.getAttribute("bin_deliveryfeeapprovalneed").setValue(false);
                            }

                            Xrm.Utility.alertDialog("This quote is Approved");
                            Xrm.Page.data.save();
                        }
                        else {
                            Xrm.Utility.alertDialog("This quote has not sent for Approval by the Sales Rep");
                        }
                      
                    }
                    else {
                        Xrm.Utility.alertDialog("You do not have enough permissions to Approve this quote");
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function Reject(){
    var QuoteID = Xrm.Page.data.entity.getId();
    
    Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$select=_ownerid_value,_owninguser_value").then(
        function success(result) {
            var _ownerid_value = result["_ownerid_value"];
           
            var _ownerid_value_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
            var _ownerid_value_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

            //get the owner's manager
            Xrm.WebApi.online.retrieveRecord("systemuser", _ownerid_value, "?$select=_parentsystemuserid_value").then(
                function success(result) {
                    var _parentsystemuserid_value = result["_parentsystemuserid_value"];
                    var _parentsystemuserid_value_formatted = result["_parentsystemuserid_value@OData.Community.Display.V1.FormattedValue"];
                    var _parentsystemuserid_value_lookuplogicalname = result["_parentsystemuserid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                   
                    var context = Xrm.Page.context;
                    var UserID = context.getUserId();
                   
                    var userID = (UserID).replace("{", "").replace("}", "");
                    if (_parentsystemuserid_value.toUpperCase() == userID) {
                        
                        if (Xrm.Page.getAttribute("bin_sendforapproval").getValue() == true) {
                            //Reject the quote
                            Xrm.Page.getAttribute("bin_recordrejected").setValue(true);

                            Xrm.Page.getAttribute("bin_sendforapproval").setValue(false);
                            Xrm.Utility.alertDialog("This quote is Rejected");
                            Xrm.Page.data.save();
                        }
                        else {
                            Xrm.Utility.alertDialog("This quote has not sent for Approval by the Sales Rep");
                        }
                        
                    }
                    else {
                        Xrm.Utility.alertDialog("You do not have enough permissions to Reject this quote");
                    }
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

function onLoadCheckQuoteProductApproval() {
    var formType = Xrm.Page.ui.getFormType();
    
    if (formType != 1) {
    
    var QuoteID = Xrm.Page.data.entity.getId();
    
        Xrm.WebApi.online.retrieveRecord("quote", QuoteID, "?$expand=quote_details($select=bin_approvalneed)").then(
            function success(result) {
                var booleanTrue = 0;
                var booleanFalse = 0;
                var quoteid = result["quoteid"];
                for (var a = 0; a < result.quote_details.length; a++) {
                    var quote_details_bin_approvalneed = result.quote_details[a]["bin_approvalneed"];
                    var quote_details_bin_approvalneed_formatted = result.quote_details[a]["bin_approvalneed@OData.Community.Display.V1.FormattedValue"];

                    if (quote_details_bin_approvalneed == true) {
                        booleanTrue = 1;
                    }
                    if (quote_details_bin_approvalneed == false) {
                        booleanFalse = 1;
                    }
                    
                }
                //(booleanTrue == 1 && booleanFalse == 1) || (booleanTrue == 1 && booleanFalse == 0)
                if ((booleanTrue == 0 && booleanFalse == 1)) {
                   // Xrm.Page.getAttribute("bin_approvalneed").setValue(true);
                    if (Xrm.Page.getAttribute("bin_approvalneed").getValue() == true) {
                        Xrm.Page.getAttribute("bin_approvalneed").setValue(false);
                    }
                   
                }
                
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }

}