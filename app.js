import mongoose from "mongoose";
//import { connect } from 'mongoose';
// const mongoose =  require('mongoose');

const superheroSchema= new mongoose.Schema({
        nombreSuperheroe:{type:String, required:true},
        nombreReal:{type:String, required:true},
        edad :{type: Number, min:0},
        planetaOrigen:{type:String, default:'Desconocido'},
        debilidad: String,
        poderes:[String],
        aliados:[String],
        enemigos:[String],
        createdAt:{type:Date, default:Date.now}
},{collection:'Grupo-01'})

const superHero=mongoose.model('superHero', superheroSchema)

async function insertSuperhero(){
    const hero= new superHero({
        nombreSuperheroe:'Spiderman',
        nombreReal:'Peter Parker',
        edad:25,
        planetaOrigen:'Tierra',
        debilidad: 'Radioactividad',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza',  'Agilidad'], 
        aliados: ['Ironman'],
        enemigos: ['Duende Verde']


        
    })

    await hero.save()
    console.log('Superheroe insertado');
}

async function updateSuperhero(nombreSuperheroe){
    const result= await superHero.updateOne(
        {nombreSuperheroe:nombreSuperheroe},
        {$set:{edad:26}}
    )
    console.log('Resultado de la actualizacion: ',result);
}

async function deleteSuperhero(nombreSuperheroe){
    const result= await superHero.deleteOne({nombreSuperheroe:nombreSuperheroe})
    console.log('Superheroe eliminado:', result)   
}

async function findSuperHero(){
    const heroes=await superHero.find({planetaOrigen:'Tierra'})
    console.log('Superheroes encontrados: ', heroes)
}

//insertSuperhero()
//updateSuperhero('Spiderman')
//deleteSuperhero('Spiderman')
findSuperHero()

mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js', { serverSelectionTimeoutMS: 5000 })
.then(()=>console.log('Conexion exitosa a MongoDB'))
.catch(error=>console.error('Error al conectar a MongoDB', error));
