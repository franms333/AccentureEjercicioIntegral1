jQuery.sap.require("sap.ui.core.format.DateFormat");//ESTO ES NECESARIO PARA USAR LA FUNCIÓN "DATE"
sap.ui.define([ //HAY QUE DEFINIR TODOS LOS MODULOS A USAR
     "EjercicioIntegrador1/EjercicioIntegrador1/util/Services",
    // "EjercicioPractico/EjercicioPractico/utils/Constants"
],
	
	function (Services) {
		"use strict";
        return{
            formatDate: function (sDate) {

            if (!sDate) {

                return;

            }

            var date = new Date(sDate);

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({

                pattern: "dd/MM/yyyy"

            });

            return dateFormat.format(date);

        },
            formatColorPeso: function(nPeso){
              
                if(!nPeso){
                    return;
                } else{
                    nPeso = parseFloat(nPeso);
                    if(nPeso < 1){
                        return "Success"
                    } else if(nPeso>=1 && nPeso <=2){
                        return "Warning"
                    } else {
                        return "Error";
                    }
                }
                
            },
            formatValor: function(valor){
                let total = valor/160;
                return total;
            }
        }
		
	}, true);