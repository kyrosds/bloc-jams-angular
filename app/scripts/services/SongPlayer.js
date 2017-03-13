(function() {
    function SongPlayer($rootScope, Fixtures) {
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
                stopSong();
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
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
        * @desc time of currently playing song in seconds
        * @type {number}
        */
        SongPlayer.currentTime = null;
        
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
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /** 
        * @function SongPlayer.next
        * @Desc toggles to the next song
        * @param {object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /** 
        * @function SongPlayer.setCurrentTime
        * @desc sets the time of the currently playing song
        * @param {number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();