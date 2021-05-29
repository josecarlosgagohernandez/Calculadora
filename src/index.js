// Importar electron para el proyecto.
const {app, BrowserWindow, Menu} = require ("electron");
const url = require ("url");
const path = require ("path");

// Variable para la ventana del programa (global)
let mainWindow
let resetWindow 

// Inicio de la app y creacion de una ventana
app.on("ready", () => {
    mainWindow = new BrowserWindow ({});
    mainWindow.loadURL( url.format ({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on("close", () => {
        app.quit();
    });
});

function createResetWindow () {

    resetWindow = new BrowserWindow (
        {
            width: 400,
            height: 330,
            title: "Reseteado"
        });
        resetWindow.setMenu(null);
        resetWindow.loadURL( url.format ({
            pathname: path.join(__dirname, "views/reset.html"),
            protocol: "file",
            slashes: true
        }))
        resetWindow.on("close", () => {
            resetWindow = null;
        });
}

const templateMenu = [

    {
        label: "Reset",
        accelerator: "Ctrl+S",
        click() {
            createResetWindow()
        }
    }
]

if (process.env.NODE_ENV !== "production"){
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
            label: "Show/Hide DevTools",
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
            },
        ]
    })
}