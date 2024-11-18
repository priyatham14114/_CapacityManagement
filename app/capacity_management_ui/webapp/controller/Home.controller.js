sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Device, MessageToast) {
    "use strict";

    return Controller.extend("com.app.capacitymanagementui.controller.Home", {
        onInit: function () {
            const oModel1 = new sap.ui.model.odata.v2.ODataModel("/odata/v2/capacityManageSrv/");
            this.getView().byId("toolPage").setModel(oModel1,"temp"); 


            this.newProductModel = new JSONModel();
            this.getView().setModel(this.newProductModel, "newProductModel");

            // Define navigation data directly in the controller
            var oData = {
                selectedKey: "page2",
                navigation: [
                    {
                        title: "Add Product",
                        key: "page1",
                        icon: "sap-icon://add-product"
                    },
                    {
                        title: "Simulation",
                        key: "page2",
                        icon: "sap-icon://simulate"
                    },
                    {
                        title: "List",
                        key: "page4",
                        icon: "sap-icon://list"
                    },
                    {
                        title: "Save",
                        key: "page5",
                        icon: "sap-icon://save"
                    },

                    {
                        title: "Add Vehicle type",
                        key: "page6",
                        icon: "sap-icon://shipping-status"
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            Device.media.attachHandler(this._handleMediaChange, this);
            this._handleMediaChange();

            const newProductModel = new JSONModel({
                MaterialID: "",
                Product: "",
                EAN_UPC: "",
                SAPProductCode: "",
                Length: "",
                Width: "",
                Height: "",
                Volume: "",
                GrossWeight: "",
                NetWeight: ""
            });
            this.getView().setModel(newProductModel, "newProductModel");
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item").getKey();
            var navContainer = this.getView().byId("pageContainer");

            switch (oItem) {
                case "page1":
                    navContainer.to(this.getView().createId("page1"));
                    break;
                case "page2":
                    navContainer.to(this.getView().createId("page2"));
                    break;
                case "page3":
                    navContainer.to(this.getView().createId("page3"));
                    break;
                case "page4":
                    navContainer.to(this.getView().createId("page4"));
                    break;
                case "page5":
                    navContainer.to(this.getView().createId("page5"));
                    break;
                case "page6":
                    navContainer.to(this.getView().createId("page6"));
                    break;
                case "page7":
                    navContainer.to(this.getView().createId("page7"));
                    break;
                default:
                    break;
            }
        },

        onPressAddProduct: function () {
            navContainer.to(this.getView().createId("page1"));
        },

        _handleMediaChange: function () {
            // Media change handling logic remains unchanged
            // ...
        },

        onExit: function () {
            Device.media.detachHandler(this._handleMediaChange, this);
        },
        onUpload: async function (e) {
            debugger
            await this._import(e.getParameter("files") && e.getParameter("files")[0]);
        },

        _import: function (file) {
            var that = this;
            var excelData = {};
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {
                        type: 'array'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object for every sheet in workbook
                        excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    });
                    // Setting the data to the local model
                    that.newProductModel.setData({
                        items: excelData
                    });
                    that.newProductModel.refresh(true);
                };
                reader.onerror = function (ex) {
                    console.log(ex);
                };
                reader.readAsArrayBuffer(file);
            }
        },
        onSaveProductPress: function () {

            const oPayload = this.getView().getModel("newProductModel").getProperty("/"),
            oModel = this.getView().byId("toolPage").getModel("temp");
                oModel.create("/Materials",oPayload,{
                    success:function(oData,resp){
                        sap.m.MessageToast.show("Material created successfully!");
                    },
                    error:function(error){
                        sap.m.MessageToast.show("Failed ",error.message);
                    }
                })        
        }
    });
});

