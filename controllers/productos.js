import { readFileSync, writeFileSync }from "fs"

class Producto {
    
    constructor(pathFile) {
        this.pathFile = pathFile
    }

    read(){
        return JSON.parse(readFileSync(this.pathFile,"utf8"))
    }

    write(productos){
        return writeFileSync(this.pathFile, JSON.stringify(productos))
    }

    get(id){
       try {
        const productos = this.read()
        if(id == null){
            return productos
        } else if(productos.find(e => e.id == id) === undefined){
            return `No existe ningún producto con ese id`
        }
        const producto = productos.find(e => e.id == id)
        return producto
       } catch(error) {
           console.log(error)
       }
    }

    saveProduct(producto){
        try{
            const productos = this.read()
            if (productos.length === 0){
                producto.id = 0
            } else {
                producto.id = (productos.length - 1) + 1
            }
            producto.timestamp = Date.now()
            productos.push(producto)
            this.write(productos)
            return `El producto: ${producto.nombre} fue agregado exitosamente al listado de productos`
        } catch(error){
            console.log(error)
        }
    }

    deleteById(id){
        try{
            const productos = this.read()
            if(productos.findIndex(e => e.id == id) === -1){
                return `El id: ${id} no corresponde con ningún producto existente`
            }
            const  productosFiltered = productos.filter(e => e.id != id)
            this.write(productosFiltered)
            return `El producto con el id: ${id} fue eliminado correctamente`
        } catch(error){
            console.log(error)
        }
    }
            
    updateById(id, productoUpdate){
        try{
            const productos = this.read()
            const producto = productos.find(e => e.id == id)
            const index = productos.indexOf(producto)
            if(index === -1){
                return `El id: ${id} no aplica a ningún producto existente para poder ser actualizado`
            }
            producto.timestamp = Date.now()
            if(productoUpdate.nombre){ productos[index].nombre = productoUpdate.nombre}
            if(productoUpdate.descripcion){ productos[index].descripcion = productoUpdate.descripcion}
            if(productoUpdate.codigo){ productos[index].codigo = productoUpdate.codigo}
            if(productoUpdate.foto){ productos[index].foto = productoUpdate.foto}
            if(productoUpdate.precio){ productos[index].precio = productoUpdate.precio}
            if(productoUpdate.stock){ productos[index].stock = productoUpdate.stock}
            this.write(productos)
            return `El producto con id: ${id} fue actualizado`
        } catch(error){
            console.log(error)    
        }
    }

}

export default Producto