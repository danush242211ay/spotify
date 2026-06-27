const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const jwt = require('jsonwebtoken')
const {uploadfile} = require('../services/storage.service')


async function createMusic(req,res) {

        const { title } = req.body;
        const file = req.file;

        const result = uploadfile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri : (await result).url,
            title,
            artist : req.user.id 
        })

        res.status(201).json({
            message : " music created succesfully",
            music :{
                id : music._id,
                uri : music.uri,
                title : music.title,
                artist : music.artist
            }
        })
    

}

async function createAlbum(req,res) {
    

        const { title, musicids } = req.body;

        const album = await albumModel.create({
            title,
            musics : musicids,
            artist : req.user.id
        });

        res.status(201).json({
            message : "Album created successfully",
            album :{
                id : album._id,
                title : album.title,
                artist : album.artist,
                musics :album.musics
            }
        })
    

}

async function getAllMusic(req,res){
    const musics = await musicModel.find();

    res.status(200).json({
        message  : "music fetched successfully",
        musics : musics
    })
}

async function getAllAlbum(req,res){
    const albums = await albumModel.find().select('title artist').populate("artist","username");

    res.status(200).json({
        message  : "album fetched successfully",
        albums : albums
    })
}

async function getAlbumById(req,res) {
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate('artist','username').populate('musics');

    res.status(200).json({
        message  : "album fetched successfully",
        album : album
    })
}



module.exports = {createMusic , createAlbum , getAllMusic , getAllAlbum , getAlbumById}