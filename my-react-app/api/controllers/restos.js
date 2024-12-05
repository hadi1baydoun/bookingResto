import Resto from "../models/Resto.js";
import Tables from './../models/Tables.js'

export const createResto = async (req, res, next) =>{
    const newResto = new Resto(req.body);
    try {
        const savedResto = await newResto.save();
        res.status(200).json(savedResto);
    } catch (err) {
        next(err);
    }
}

export const updateResto = async (req, res, next) =>{
    try {
        const updatedResto = await Resto.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedResto);
    } catch (err) {
       
        next(err);
    }
}

export const deleteResto = async (req, res, next) =>{
    try {
        await Resto.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Restaurant has been deleted." });
    } catch (err) {
      
        next(err);
    }
}

export const getResto = async (req, res, next) =>{
    try {
        const resto = await Resto.findById(req.params.id);
        if (!resto) {
            return res.status(404).json({ message: "Restaurant not found." });
        }
        res.status(200).json(resto);
    } catch (err) {
        next(err);
    }
}

export const getRestos = async (req, res, next) =>{
    const {min, max, ...others} = req.query;
    try {
        const restos = await Resto.find({
            ...others,
            cheapestPrice: {$gt: min, $lt: max},
        }).limit(req.query.limit);
        res.status(200).json(restos);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) =>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city =>{
            return Resto.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const { cities } = req.query;
        const cityArray = cities ? cities.split(",") : []; // Split cities into an array

        // Build filter condition based on cities if provided
        const filter = cityArray.length > 0 ? { type: "resto", city: { $in: cityArray } } : { type: "resto" };

        const restoCount = await Resto.countDocuments(filter);
        console.log("Count retrieved:", restoCount); // Debugging log

        res.status(200).json([{ type: "resto", count: restoCount }]);
    } catch (err) {
        console.error("Error in countByType:", err); // Log the error
        next(err);
    }
};


export const getRestoTables = async (req, res, next) => {
    try{
        const resto = Resto.findById(req.params.id)
        const list = await Promise.all(resto.tables.map(table=>{
            return Tables.findById(table);
        })
    );
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}