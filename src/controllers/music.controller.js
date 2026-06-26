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



module.exports = {createMusic , createAlbum }