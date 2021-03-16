sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "EjercicioIntegrador1/EjercicioIntegrador1/util/Services",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "EjercicioIntegrador1/EjercicioIntegrador1/util/Formatters",
        "EjercicioIntegrador1/EjercicioIntegrador1/util/Constants",
        "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel, Services, Fragment, Filter, FilterOperator, Formatters, Constants, MessageToast) {
		"use strict";

		return Controller.extend("EjercicioIntegrador1.EjercicioIntegrador1.controller.EjercicioIntegrador1", {
            
            formatter: Formatters,
            
            onInit: function () {
                sap.ui.getCore().getConfiguration().setLanguage("ES");

                this.getView().byId('idPanelBuscador').setVisible(false);
                this.getView().byId('idTablaProductos').setVisible(false);

                this.loadModelProduct();
                this.loadModelSearch();
                this.loadModelSelected();
            },
                loadModelProduct: async function(){
                const oResponse = await Services.getLocalJSON(Constants.routes.json.productos);
                const oDataProduct = oResponse[0];

                var oModelProduct = new JSONModel();
                oModelProduct.setData(oDataProduct);
                this.getOwnerComponent().setModel(oModelProduct, "ProductosJSON");
            },
                loadModelSearch: async function(){
                const oResponse = await Services.getLocalJSON(Constants.routes.json.search);
                const oDataSearch = oResponse[0];

                var oModelSearch = new JSONModel();
                oModelSearch.setData(oDataSearch);
                this.getOwnerComponent().setModel(oModelSearch, "SearchJSON");
            },
            loadModelSelected: async function(){
                const oResponse = await Services.getLocalJSON(Constants.routes.json.selected);
                const oDataSelected = oResponse[0];

                var oModelSelected = new JSONModel();
                oModelSelected.setData(oDataSelected);
                this.getOwnerComponent().setModel(oModelSelected, "SelectedJSON");
            },
            mostrarInputs: function(){
                this.getView().byId('idPanelInputs').setVisible(false);
                this.getView().byId('idPanelBuscador').setVisible(true);
                
            },
            mostrarTabla: function(){
                let oModelSearch = this.getOwnerComponent().getModel("SearchJSON");
                let inputProveedor = this.getView().byId('selectProveedor').getSelectedKey();
                
                
                // oModelSearch.setProperty("/search/fecha", inputDate);
                 oModelSearch.setProperty("/search/proveedor", inputProveedor);
                // oModelSearch.setProperty("/search/pais", inputPais);

                
                if(this.getView().byId('dateInput').getValue() !=='' 
                && inputProveedor !==''
                && this.getView().byId('paisInput1').getValue() !==''){

                this.getView().byId('idTablaProductos').setVisible(true);

                var msg = `Fecha: ${this.getView().byId('dateInput').getValue()}
                Proveedor: ${inputProveedor}
                Pais: ${this.getView().byId('paisInput1').getValue()}`;
			    MessageToast.show(msg);
                } else{
                    alert('Favor complete todos los datos de búsqueda');
                }
            },
            cerrarFragmento: function(){
                    this.byId(Constants.ids.FRAGMENTS.Busqueda).close();
                    
                },

            onSearch: function(evt){
                var aFilters = [];
                var sQuery = evt.getSource().getValue();
                if(sQuery && sQuery.length > 0){
                    var oFilter = new Filter("producto", FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);

                    var oFilter = new Filter("proveedor", FilterOperator.Contains, sQuery);
                    aFilters.push(oFilter);

                    var oFilters = new Filter(aFilters);
                }
                var oTable = this.getView().byId("idTablaProductos");
                var oBindingInfo = oTable.getBinding("items"); //ES LA INFORMACIÓN FILTRADA DENTRO DEL OBJETO "table"
                oBindingInfo.filter(oFilters, "Application"); //ES EL NOMBRE DEL FILTRO
            },
            elementOnFocus: function(oEvent){
                var oItem = oEvent.getSource();
                var oBindingContext = oItem.getBindingContext("ProductosJSON");
                var oModel = this.getView().getModel("ProductosJSON");
                var oProductoSeleccionado = oModel.getProperty(oBindingContext.getPath());

                let oModelSelected = this.getOwnerComponent().getModel("SelectedJSON");
                let producto = JSON.stringify(oProductoSeleccionado.producto);
                producto = JSON.parse(producto);
                let selectedProduct = oModelSelected.setProperty('/productos/producto', producto);
                
                let proveedor = JSON.stringify(oProductoSeleccionado.proveedor);
                proveedor = JSON.parse(proveedor);
                let selectedProveedor = oModelSelected.setProperty('/productos/proveedor', proveedor);
                
                let size = JSON.stringify(oProductoSeleccionado.size);
                size = JSON.parse(size);
                let selectedSize = oModelSelected.setProperty('/productos/size', size);

                let peso = JSON.stringify(oProductoSeleccionado.peso);
                peso = JSON.parse(peso);
                let selectedPeso = oModelSelected.setProperty('/productos/peso', peso);

                let valor = JSON.stringify(oProductoSeleccionado.valor);
                valor = JSON.parse(valor);
                let selectedValor = oModelSelected.setProperty('/productos/valor', valor);

                console.log(producto)
                


                const oView = this.getView();
                //INICIALIZAR EL DIÁLOGO
                if(!this.pDialog){
                    this.pDialog = Fragment.load({
                        id: oView.getId(),

                        //AQUI SE PUEDE REFERENCIAR EL FRAGMENT EN EL CONSTANT
                        name: Constants.routes.FRAGMENTS.FocusDialog,
                        
                        controller: this
                    //CONECTAR EL DIÁLOGO CON LA VISTA PRINCIPAL DEL COMPONENTE ACTUAL
                    }).then(function (oDialog){
                        //this.pDialog = oDialog;
                        oView.addDependent(oDialog); //ES COMO EL APPENDCHILD DE JS
                        return oDialog;
                    });
                }
                
                //ABRIR EL DIÁLOGO
                this.pDialog.then(function(oDialog){
                    oDialog.open();
                });
            },
                cerrarFragmento: function(){
                    this.byId(Constants.ids.FRAGMENTS.ProductDialog).close();
                    //this.byId("TableFragment").close();
                }
		});
	});