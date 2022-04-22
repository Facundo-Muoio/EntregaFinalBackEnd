import { Router } from "express"
import Carrito from "../controllers/carrito.js"
export const routerCarrito = Router()

const carrito = new Carrito("./controllers/carritos.txt")
// Rutas de carrito de compras

routerCarrito.get("/:id/productos", (req, res) => {
    const productos = carrito.getProducts(req.params.id)
    res.json(productos)
})

routerCarrito.post("/:id/productos", (req, res) => {
    res.json(carrito.addProduct(req.params.id, req.body))
})


routerCarrito.post("/", (req, res) => {
    res.json(carrito.createCarrito())
})

routerCarrito.delete("/:id", (req, res) => {
    res.json(carrito.deleteById(req.params.id))
})

routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
    res.json(carrito.deleteProduct(req.params.id, req.params.id_prod))
})

