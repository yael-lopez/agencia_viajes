import { Testimonial } from "../models/Testimoniales.js";
import { Viaje } from "../models/Viaje.js";

const paginaInicio = async (req, res) => { //req - lo que enviamos : res - lo que express nos reponde
    
    //Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit:3 }) );
    promiseDB.push ( Testimonial.findAll({ limit:3 }) );

    try {
        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => { //req - lo que enviamos : res - lo que express nos reponde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async(req, res) => { //req - lo que enviamos : res - lo que express nos reponde
    //Consultar DB
    const viajes =  await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

//Muestra un viaje por slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } })

        res.render('viaje', {
            pagina: 'Informacion viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }

}

const paginaTestimoniales = async (req, res) => { //req - lo que enviamos : res - lo que express nos reponde
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}