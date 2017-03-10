(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc currentSong object ensures song is reset at page load
        * @type {object}
        */
        var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        /** 
        * @function playSong
        * @desc plays the song that is clicked updates the album.html to show true and changes the play/pause icon
        * @param {object} song
        */
        var playSong function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        /** 
        * @function pauseSong
        * @desc pauses the song that is clicked updates the album.html to show false and changes the play/pause icon
        * @param {object} song
        */
        var pauseSong function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        /** 
        * @function SongPlayer.play
        * @desc plays the currently selected song and stops the currently selected song depending on if the play or pause button is selected
        * @param {object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        SongPlayer.pause = function(song) {
            pauseSong(song);
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();