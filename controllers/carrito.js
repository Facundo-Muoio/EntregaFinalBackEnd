import { readFileSync, writeFileSync } from "fs"

class Carrito {
    
    constructor(pathFile){
        this.pathFile = pathFile
    }

    read(){
        return JSON.parse(readFileSync(this.pathFile,"utf8"))  
    }

    write(carritos){
        writeFileSync(this.pathFile, JSON.stringify(carritos))
    }

    createCarrito(){
        try{
            const carritos = this.read()
            if (carritos.length === 0){
                const carrito = {id: 0, timesTamp: Date.now(), productos: []}
                carritos.push(carrito)
                this.write(carritos)
                return `Añadió un carrito nuevo con el id ${carrito.id}`
            }
            const id = carritos[carritos.length - 1].id + 1
            const carrito = {id: id, timesTamp: Date.now(), productos: []}
            carritos.push(carrito)
            this.write(carritos)
            return `Añadió un carrito nuevo con el id ${carrito.id}`
        } catch(error) {
            console.log(error)
        }
    }

    deleteById(id){
        try{
          const carritos = this.read()
          if(carritos.findIndex(e => e.id == id) === -1){
            return `El id: ${id} no corresponde con ningún carrito existente`
          }
          const carritosFiltered = carritos.filter( e => e.id != id) 
          this.write(carritosFiltered)
          return `El carrito con el id: ${id} fue eliminado correctamente`   
        } catch(error) {
            console.log(error)
        }
    }

    getProducts(id){
        try{
           const carritos = this.read() 
           const carrito = carritos.find(e => e.id == id)
           return carrito.productos
        } catch(error) {
            console.log(error)
        }
    }

    addProduct(id, producto){
        try{
            const carritos = this.read()    
            const carrito = carritos.find(e => e.id == id);
            if(carrito === undefined){
                return `No existe un carrito con ese id, ingrese un id de carrito válido`
            } 
            producto.timesTamp = Date.now();
            if (carrito.productos.length === 0) {
                producto.id = 0;
            }
            else {
                producto.id = (carrito.productos.length - 1) + 1
            }
            carrito.productos.push(producto);
            this.write(carritos);
            return `el producto: ${producto.nombre} fue añadido al carrito`  
            }     
        catch(error) {
            console.log(error)
        }
    }

    deleteProduct(idCart, idProduct){
        try{
            const carritos = this.read()
            const carrito = carritos.find(e => e.id == idCart)
            if(carrito === undefined){
                return `No existe un carrito con ese id, ingrese un id de carrito válido`
            } 
            const producto = carrito.productos.find(e => e.id == idProduct)
            const index = carrito.productos.indexOf(producto)
            if(index === -1){
                return `el producto con el id: ${idProduct} no se encuentra para ser eliminado`
            }
            carrito.productos.splice(index, 1);
            this.write(carritos)
            return `el producto: ${producto.nombre} fue eliminado con éxito del carrito con id: ${idCart}`
        } catch(error){
            console.log(error)
        }
    }

}


export default Carrito