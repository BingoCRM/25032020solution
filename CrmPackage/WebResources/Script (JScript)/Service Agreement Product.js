//on load update product, service type and waste type fields
function onLoadUpdate() {
    var product = Xrm.Page.getAttribute("bin_product").getValue();
    var serviceType = Xrm.Page.getAttribute("bin_servicetype").getValue();
    var wasteType = Xrm.Page.getAttribute("bin_wastetype").getValue();

    if (product == null || serviceType == null || wasteType == null) {
        var QP = Xrm.Page.getAttribute("bin_quoteproduct").getValue();
        var QPId = QP[0].id; // GUID of the lookup id
        var QPName = QP[0].name; // Name of the lookup
        var QPType = QP[0].entityType; //Entity Type of the lookup entity

        Xrm.WebApi.online.retrieveRecord("quotedetail", QPId, "?$select=_bin_servicetype_value,_bin_wastetype_value,_productid_value").then(
            function success(result) {

                var _bin_servicetype_value = result["_bin_servicetype_value"];
                var _bin_servicetype_value_formatted = result["_bin_servicetype_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_servicetype_value_lookuplogicalname = result["_bin_servicetype_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _bin_wastetype_value = result["_bin_wastetype_value"];
                var _bin_wastetype_value_formatted = result["_bin_wastetype_value@OData.Community.Display.V1.FormattedValue"];
                var _bin_wastetype_value_lookuplogicalname = result["_bin_wastetype_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _productid_value = result["_productid_value"];
                var _productid_value_formatted = result["_productid_value@OData.Community.Display.V1.FormattedValue"];
                var _productid_value_lookuplogicalname = result["_productid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];


                if (_productid_value != null) {
                    //Product lookup
                    var lookupValueProduct = new Array();
                    lookupValueProduct[0] = new Object();
                    lookupValueProduct[0].id = _productid_value; // GUID of the lookup id
                    lookupValueProduct[0].name = _productid_value_formatted; // Name of the lookup
                    lookupValueProduct[0].entityType = _productid_value_lookuplogicalname; //Entity Type of the lookup entity

                    var SAP = (lookupValueProduct[0].id).replace("{", "").replace("}", "");
                    Xrm.Page.getAttribute("bin_product").setValue(lookupValueProduct);
                }
                if (_bin_servicetype_value != null) {
                    //Service Type lookup
                    var lookupValueST = new Array();
                    lookupValueST[0] = new Object();
                    lookupValueST[0].id = _bin_servicetype_value; // GUID of the lookup id
                    lookupValueST[0].name = _bin_servicetype_value_formatted; // Name of the lookup
                    lookupValueST[0].entityType = _bin_servicetype_value_lookuplogicalname; //Entity Type of the lookup entity

                    var ST = (lookupValueST[0].id).replace("{", "").replace("}", "");
                    Xrm.Page.getAttribute("bin_servicetype").setValue(lookupValueST);
                }
                if (_bin_wastetype_value != null) {
                    //Waste Type lookup
                    var lookupValueWT = new Array();
                    lookupValueWT[0] = new Object();
                    lookupValueWT[0].id = _bin_wastetype_value; // GUID of the lookup id
                    lookupValueWT[0].name = _bin_wastetype_value_formatted; // Name of the lookup
                    lookupValueWT[0].entityType = _bin_wastetype_value_lookuplogicalname; //Entity Type of the lookup entity


                    var WT = (lookupValueWT[0].id).replace("{", "").replace("}", "");
                    Xrm.Page.getAttribute("bin_wastetype").setValue(lookupValueWT);

                }

            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
    
}