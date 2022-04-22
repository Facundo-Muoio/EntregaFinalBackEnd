import { Router } from "express"
import Producto from "../controllers/productos.js"
export const routerProductos = Router()
import  userPermises from "../middlewares/middleware.js"

const producto = new Producto("./controllers/productos.txt")
// Rutas de productos

routerProductos.get("/:id?", (req, res) => {
    if(req.params.id){
        res.json(producto.get(req.params.id))
    } 
    res.json(producto.get())
})

routerProductos.post("/", userPermises, (req, res) => {
    res.json(producto.saveProduct(req.body))
})

routerProductos.put("/:id", userPermises, (req, res) => {
    res.json(producto.updateById(req.params.id, req.body))
})

routerProductos.delete("/:id", (req, res) => {
    res.json(producto.deleteById(req.params.id))
})


