(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc get the current album data from the Fixtures file and stores into the album file
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
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
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /** 
        * @function playSong
        * @desc plays the song that is clicked updates the album.html to show true and changes the play/pause icon
        * @param {object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /** 
        * @function pauseSong
        * @desc pauses the song that is clicked updates the album.html to show false and changes the play/pause icon
        * @param {object} song
        */
        var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function getSongIndex
        * @desc this function allows us to get the index of the song within the album, this will give us the ability to use the previous and next button to move from song to song
        * @param {object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc currentSong object ensures song is reset at page load and is now public
        * @type {object}
        */
        SongPlayer.currentSong = null;
        
        /** 
        * @function SongPlayer.play
        * @desc plays the currently selected song and stops the currently selected song depending on if the play or pause button is selected
        * @param {object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function SongPlayer.pause
        * @desc pauses the song that is currently playing
        * @param {object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            pauseSong(song);
        };
        
        /**
        * @function SongPlayer.previous
        * @desc toggles to the previous song
        * @param {object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();