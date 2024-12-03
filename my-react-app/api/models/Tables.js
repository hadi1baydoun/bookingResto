import mongoose from 'mongoose';
const {Schema} = mongoose;

const TableSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
        
    },
    maxPeople:{
        type: String,
        required: true,
       
    },

    desc:{
        type: String,
        required: true
    },

    tableNumber: 
        [{number:Number, unavailableDates:{type:[Date]}}],
},
    {timestamps: true}
);



export default mongoose.model("Table", TableSchema)