/**
 * @fileOverview Javascript for Jaguar H5 page
 * @author LvChengbin
 */
( function() {
     for (var e = 0, t = ["ms", "moz", "webkit", "o"], r = 0; r < t.length && !self.requestAnimationFrame; ++r) self.requestAnimationFrame = self[t[r] + "RequestAnimationFrame"],
     self.cancelAnimationFrame = self[t[r] + "CancelAnimationFrame"] || self[t[r] + "CancelRequestAnimationFrame"];
     void 0 === self.requestAnimationFrame && void 0 !== self.setTimeout && (self.requestAnimationFrame = function(t) {
         var r = Date.now(),
         i = Math.max(0, 16 - (r - e)),
         n = self.setTimeout(function() {
             t(r + i)
         }, i);   
         return e = r + i, n;
     }),   
     void 0 === self.cancelAnimationFrame && void 0 !== self.clearTimeout && (self.cancelAnimationFrame = function(e) {
         self.clearTimeout(e)
     })    
} )();

var Jaguar = ({
    sides : [ {
		url: '/JAGUAR/dist/static/images/1.jpg',
		position: [ -512, 0, 0 ],
		rotation: [ 0, Math.PI / 2, 0 ]
	}, {
		url: '/JAGUAR/dist/static/images/3.jpg',
		position: [ 512, 0, 0 ],
		rotation: [ 0, -Math.PI / 2, 0 ]
	}, {
		url: '/JAGUAR/dist/static/images/5.jpg',
		position: [ 0,  512, 0 ],
		rotation: [ Math.PI / 2, 0, 0 ]
	}, {
		url: '/JAGUAR/dist/static/images/6.jpg',
		position: [ 0, -512, 0 ],
		rotation: [ - Math.PI / 2, 0, 0 ]
	}, {
		url: '/JAGUAR/dist/static/images/4.jpg',
		position: [ 0, 0,  512 ],
		rotation: [ 0, Math.PI, 0 ]
	}, {
		url: '/JAGUAR/dist/static/images/2.jpg',
		position: [ 0, 0, -512 ],
		rotation: [ 0, 0, 0 ]
	} ],
    points : [ {
        coords : [ 560, 450 ],
        target : 5,
        link : 'http://test.qctt.cn/JieBaoFirst/zhongkong.html'
    }, {
        coords : [ 440, 555 ],
        target : 5,
        picture : 9
    }, {
        coords : [ 260, 340 ],
        target : 5,
        picture : 1
    }, {
        coords : [ 40, 410 ],
        target : 5,
        picture : 2
    }, {
        coords : [ 35, 520 ],
        target : 5,
        picture : 3
    }, {
        coords : [ 475, 685 ],
        target : 5,
        picture : 4
    }, {
        coords : [ 990, 340 ],
        target : 5,
        picture : 5
    }, {
        coords : [ 910, 900 ],
        target : 5,
        picture : 6
    }, {
        coords : [ 535, 995 ],
        target : 2,
        picture : 7
    }, {
        coords : [ 580, 45 ],
        target : 3,
        picture : 8
    } ],
    init : function() {
        var me = this;

        this.action().render();
        
        setTimeout( function() {
            me.setPoints();
            me.setText();
            me.bindEvent();
        }, 0 );

        this.initPictures();

        return this;
    },

    action : function() {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window. innerHeight, 1, 1000 );
        this.controls = new THREE.DeviceOrientationControls( this.camera );
        this.controls.connect();
        this.scene = new THREE.Scene();
                    
        return this;
    },
    render : function() {
        var i = 0,
            l = this.sides.length;

        for( ; i < l; i += 1 ) {
            this.create( this.sides[ i ], i );
        }

        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        return this;
    },
    create : function( side, i ) {
        var elem = document.createElement( 'div' ),
            obj;

        elem.innerHTML = '<img src="' + side.url + '" width="1026" />';
        elem.className = 'sides side-' + i;
        elem.style.width = '1026px';
        elem.style.height = '1026px';

        obj = new THREE.CSS3DObject( elem );
        obj.position.fromArray( side.position );
        obj.rotation.fromArray( side.rotation );

        this.scene.add( obj );
    },
    setPoints : function() {
        var i = 0,
            l = this.points.length,
            elem,
            point;

        for( ; i < l; i += 1 ) {
            point = this.points[ i ];

            elem = document.createElement( 'a' );
            elem.className = 'points point-' + i;

            if( point.hasOwnProperty( 'picture' ) ) {
                elem.setAttribute( 'data-picture', point[ 'picture' ] );
            } else if( point.hasOwnProperty( 'link' ) ) {
                elem.setAttribute( 'href', point[ 'link' ] );
            }

            elem.innerHTML = '<span><b></b></span>';

            elem.style.left = point.coords[ 0 ] + 'px';
            elem.style.top = point.coords[ 1 ] + 'px';

            $( '.side-' + point.target ).append( elem );
        }

        return this;
    },

    setText : function() {
        var elem = document.createElement( 'a' );

        elem.className = 'text';

        elem.innerHTML = '点击中控台<br />启动按钮开启试驾体验';

        elem.style.left = '480px';
        elem.style.top = '555px';

        $( '.side-5' ).append( elem );

        return this;
    },
    bindEvent : function() {
        var me = this;

        $( document ).on( 'touchstart', function( e ) {

            var isIOS = /ip(?=od|ad|hone)/i.test(navigator.userAgent);

            if( isIOS || me.picShowing ) return true;

            var points = document.getElementsByClassName( 'points' ),
                i = 0,
                l = points.length,
                point,
                rect
                touches = e.touches[ 0 ];

            for( ; i < l; i += 1 ) {
                point = points[ i ];
                rect = point.getBoundingClientRect();

                if( Math.abs( touches.pageX - rect.left ) < 40 && Math.abs( touches.pageY - rect.top ) < 40 ) {
                    if( $( point ).attr( 'data-picture' ) !== null ) {
                        me.showPictures( $( point ).attr( 'data-picture' ) );
                        e.preventDefault(); 
                    } else {
                        location.href = $( point ).attr( 'href' );
                    }
                    return;
                }
            }
        } );

        $( window ).on( 'resize', function( e ) {
            me.camera.aspect = window.innerWidth / window.innerHeight;
            me.camera.updateProjectionMatrix();
            me.renderer.setSize( window.innerWidth, window.innerHeight );
            me.initPictures();
        }, false );

        $( '.points' ).on( 'touchstart', function( e ) {
            if( $( this ).attr( 'data-picture' ) !== null ) {
                me.showPictures( $( this ).attr( 'data-picture' ) );
                e.preventDefault();
            }
        } );

        $( '.pictures a.back' ).on( 'tap', function( e ) {
            $( '.pictures' ).addClass( 'hidden' );
            $( '.pictures .items' ).removeClass( 'active' );
            me.picShowing = false;
        } );

        return this;
    },

    showPictures : function( i ) {
        $( '.pictures .items' ).hide();
        $( '.pictures .item-' + i ).show();
        setTimeout( function() {
            $( '.pictures .item-' + i ).addClass( 'active' );
        }, 100 );
        $( '.pictures' ).removeClass( 'hidden' );

        this.picShowing = true;
    },
    animate : function() {
        requestAnimationFrame( Jaguar.animate );
        Jaguar.controls.update();
        Jaguar.renderer.render( Jaguar.scene, Jaguar.camera );
    },

    initPictures : function() {
        var w = window.innerWidth,
            h = window.innerHeight,
            r = 640 / 1010,
            ir = w / h,
            w1, h1;

        if( ir > r ) {
            h1 = Math.min( h, 505 );
            w1 = h1 * r;
            $( '.pictures' ).css( 'height', h1 ).css( 'width', w1 );
        } else {
            w1 = Math.min( w, 320 );
            h1 = w1 / r;
            $( '.pictures' ).css( 'width', w1 ).css( 'height', h1 );
        }

        this.size = { 
            width : w1,
            height : h1 
        };

        this.pos = {
            top : ( h - h1 ) / 2,
            left : ( w - w1 ) / 2,
        };
        
        $( '.pictures' ).css( 'top', ( h - h1 ) / 2 ).css( 'left', ( w - w1 ) / 2 );

    }
}).init();
Jaguar.animate();

$(function(){
            
    $(".nav-wrap").on('click','.main-nav',function(e){
        e.preventDefault();
        var me=$(this),
            navWrap=me.closest('.nav-wrap'),
            navs = navWrap.find('nav a');
                
        if(!navWrap.hasClass('active')){
                        
            var width=navWrap.width(),
                radius=width/2;
                            
            var startAngle = -90,
                endAngle = -330;
                     
            var total=navs.length,
                gap = (endAngle-startAngle)/total;
                     
            $.each(navs,function(index,item){
                var myAngle = (startAngle+gap*index) *(Math.PI/180),//0
                    myX = radius+radius*Math.cos(myAngle),//x=r+rcos(0)
                    myY = radius+radius*Math.sin(myAngle);//x=r+rsin(0)

                                
                $(this).css({
                    left:myX +'px',
                    top:myY + 'px'
                });
            });
        }
        navWrap.toggleClass('active');
    });
});
