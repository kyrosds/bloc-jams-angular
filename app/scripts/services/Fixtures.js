(function () {
    function Fixtures() {
        var Fixtures = {};
        
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
                { title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
                { title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
                { title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
                { title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
                { title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
            ]
        };

        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
                { title: 'Hello, Operator?', duration: '1:01' },
                { title: 'Ring, ring, ring', duration: '5:01' },
                { title: 'Fits in your pocket', duration: '3:21' },
                { title: 'Can you hear me know?', duration: '3:14' },
                { title: 'Wrong phone number', duration: '2:15' }
            ]
        };

        var albumMountaineering = {
            title: 'The Mountain',
            artist: 'Mountaineering',
            label: 'Peak',
            year: '1920',
            albumArtUrl: '/assets/images/album_covers/09.png',
            songs: [
                { title: 'At the Summit', duration: '3:42' },
                { title: 'Ice Bridge', duration: '2:14' },
                { title: 'Trekking Poles', duration: '3:09' },
                { title: 'High Peaks', duration: '5:35' },
                { title: 'Great Views', duration: '1:21' }
            ]
        };
        
        Fixtures.getAlbum = function() {
            return albumPicasso;
        };
        
        Fixtures.getCollection = function(numberOfAlbums) {
            var songList = [];
            
            for (var i = 0; i < numberOfAlbums; i++) {
                songList.push(angular.copy(albumPicasso));
            }
            
            return songList;
        };
        
        return Fixtures;
    }
    
    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();