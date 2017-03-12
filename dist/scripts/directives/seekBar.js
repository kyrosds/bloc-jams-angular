(function() {
    function seekBar($document) {
        
        /**
        * @function calculatePercent
        * @desc calculates the percentage of the seek bar allowing it to dispaly the proper length on the seekbar
        * @param {object} seekBar, event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element);
                
                /**
                * @function percentString
                * @desc calculates the percentage to fill
                * @param {object}
                */
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /**
                * @function scope.fillStyle
                * @desc displays the fill in the seekbar
                * @param {object}
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function scope.thumbStyle
                * @desc dipslays the thumb location in the seekbar
                * @param {object}
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function scope.onClickSeekBar
                * @desc changes the sek once it is clicked by the user
                * @param {object}
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function scope.trackThumb
                * @desc tracks the postion of the seek bar and releases when the user releases the mouse. 
                * @param {object}
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function(){
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();