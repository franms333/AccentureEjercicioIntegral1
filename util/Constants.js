sap.ui.define([], function() {
    "use strict";
    return {
        model: {
            I18N: "i18n",
        },
        properties: {
            TOOLS_MODE: {
                name: "/name"
            }
        },
        ids: {
            FRAGMENTS: {
                ProductDialog: "productDialog"
            }
        },
        routes: {
            main: "EjercicioIntegrador1", //se coloca el nombre de la vista en la ruta
            json: {
                productos: "Productos.json",
                search: "Search.json",
                selected: "Selected.json"
            },
            //secondary: "Secondary" <-- INDICA UNA VISTA NUEVA
            FRAGMENTS: { //SE COLOCA LA RUTA DE LOS FRAGMENTS
                FocusDialog: "EjercicioIntegrador1.EjercicioIntegrador1.fragments.FocusDialog"
            }
        }

    };
}, true)