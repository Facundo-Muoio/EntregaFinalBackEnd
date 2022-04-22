import express  from "express"
export const app = express()



//importaciones de routes
import { routerCarrito } from "./routes/routesCarrito.js"
import { routerProductos } from "./routes/routesProductos.js"

// setiando y levantando server
const PORT = 8080 || process.env.PORT 
const server = app.listen(PORT, () => `Servidor escuchando en puerto: ${server.address().port}`)
server.on("error", (error) => `Error en el servidor ${error}`)

// setiando routes
app.use(express.json())
app.use(express.urlencoded( {extended: true }))
app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarrito)




