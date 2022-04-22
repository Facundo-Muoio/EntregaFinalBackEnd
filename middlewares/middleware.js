 function userPermises(req, res, next) {
    const admin = true
    try {
        if(admin) {
            next()
        } else {
            res.json({error: "No tienes permiso para acceder a esta ruta"})
        }
        
    } catch(error){
        res.status(500).json({error: `${error}`})
    }
     
}

export default userPermises