            var el1 = document.querySelector('.box1');
            var el2 = document.querySelector('.box2');
            var el3 = document.querySelector('.box3');
            var el4 = document.querySelector('.box4');

            // built the tween objects
            var tween1 = KUTE.to(el1,{translate:-100}, {repeat:1, yoyo:true});
            var tween2 = KUTE.to(el2,{translateX:200},{repeat:1, yoyo:true});
            var tween3 = KUTE.to(el3,{translate3d:[0,50,0]},{repeat:1, yoyo:true});
            var tween4 = KUTE.to(el4,{translate3d:[0,0,-100]},{parentPerspective: 100, repeat:1, yoyo:true});

            // start the animation
            tween1.start(); 
            tween2.start();
            tween3.start();
            tween4.start();
