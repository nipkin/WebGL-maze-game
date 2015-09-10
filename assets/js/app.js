var camera, scene, renderer;
var geometry, material, particle, line;
var controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var visualizer = document.getElementById("visualizer");
var keyboard;
var cubeVisualizer;

function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 7000);
    camera.position.z = 800;
    
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x555555 );
    scene.add(ambient);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position = camera.position;
    scene.add(light);

    renderer = new THREE.WebGLRenderer({canvas: visualizer, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 10);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    keyboard = new THREEx.KeyboardState( renderer.domElement);
    renderer.domElement.setAttribute("tabIndex", "0");
    renderer.domElement.focus();
    testCube();
    initLandscape();
}

function render() {
    requestAnimationFrame(render);
    console.log(cubeVisualizer.position.z);
    console.log(cubeVisualizer.position.x);
    console.log(cubeVisualizer.position.x > 50 || cubeVisualizer.position.x < -50 && cubeVisualizer.position.z < 510);
    renderer.render(scene, camera);
}

//Avatar

var testCube = function() {
    var cubeGeometry = new THREE.BoxGeometry(30, 30, 30);
    var cubeMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    cubeVisualizer = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cubeVisualizer.position.y = 10;
    cubeVisualizer.position.z = 650;

    cubeVisualizer.add(camera);
    scene.add(cubeVisualizer);

}

//Landscape

var wallValues = {
    sidewall1 : {
        x : 1,
        z : 1000,
        zposition : 0,
        xposition : 500 
    },
    sidewall2 : {
        x : 1,
        z : 1000,
        zposition : 0,
        xposition : -500 
    },
    sidewall3 : {
        x : 450,
        z : 1,
        zposition : -500,
        xposition : 275
    },
    sidewall4 : {
        x : 450,
        z : 1,
        zposition : 500,
        xposition : 275 
    },
    sidewall5 : {
        x : 450,
        z : 1,
        zposition : 500,
        xposition : -275 
    },
    sidewall6 : {
        x : 450,
        z : 1,
        zposition : -500,
        xposition : -275
    },
    wall1 : {
        x : 1,
        z : 300,
        zposition : 650,
        xposition : 50 
    },
    wall2 : {
        x : 1,
        z : 300,
        zposition : 650,
        xposition : -50
    },
    wall3 : {
        x : 800,
        z : 1,
        zposition : 400,
        xposition : 0
    },
    wall4 : {
        x : 1,
        z : 200,
        zposition : 300,
        xposition : 400
    },
    wall5 : {
        x : 1,
        z : 200,
        zposition : 300,
        xposition : -400
    },
    wall6 : {
        x : 100,
        z : 1,
        zposition : 200,
        xposition : 450
    },
    wall7 : {
        x : 200,
        z : 1,
        zposition : 100,
        xposition : -400
    },
    wall7 : {
        x : 200,
        z : 1,
        zposition : 100,
        xposition : -400
    },
    wall8 : {
        x : 1,
        z : 200,
        zposition : 200,
        xposition : -300
    },
    wall9 : {
        x : 300,
        z : 1,
        zposition : 300,
        xposition : -150
    }

}

var walls = [];
var initLandscape = function() {
    var landscapeometry = new THREE.BoxGeometry(1000, 1, 1000);
    var landscapMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    landscapeVisualizer = new THREE.Mesh(landscapeometry, landscapMaterial);

    landscapeVisualizer.position.y = -50;

    scene.add(landscapeVisualizer);
    createWalls();
}


var createWalls = function() {
    for(i in wallValues) {
        var wallGeometry = new THREE.BoxGeometry(wallValues[i].x ,100, wallValues[i].z);
        var wallMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        wallVisualizer = new THREE.Mesh(wallGeometry, wallMaterial);
            
        wallVisualizer.position.z = wallValues[i].zposition;
        wallVisualizer.position.x = wallValues[i].xposition;
        
        walls.push(wallVisualizer);
        scene.add(wallVisualizer);
    }
}


var forbiddenPositions = function() {
   /* if((cubeVisualizer.position.x > 50 && cubeVisualizer.position.x < 51 || cubeVisualizer.position.x < -50 && cubeVisualizer.position.x > -51) && cubeVisualizer.position.z > 510) {
        return false;
    }
    if(cubeVisualizer.position.z < 425) {
        return false;
    }*/

    //if(cubeVisualizer.position.z > -500 && cubeVisualizer.position.z )

    //else 
        return true;
}
//Animation


//Controls
var updateFcts  = [];
updateFcts.push(function(delta, now){
    /*for(i in avatar) {
        if( keyboard.pressed('left') ){
            avatar[i].rotation.y -= 1 * delta;     
        }else if( keyboard.pressed('right') ){
            avatar[i].rotation.y += 1 * delta;
        }
        if( keyboard.pressed('down') ){
            avatar[i].translateZ( 100 * delta );     
        }else if( keyboard.pressed('up') ){
            avatarMoveForward(avatar[i], delta);

            console.log(delta);
        }
    }*/
    if(forbiddenPositions() != false) {
        if( keyboard.pressed('left') ){
            cubeVisualizer.rotation.y += 1 * delta;     
        }else if( keyboard.pressed('right') ){
            cubeVisualizer.rotation.y -= 1 * delta;
        }
        if( keyboard.pressed('down') ){
            cubeVisualizer.translateZ( 100 * delta );     
        }else if( keyboard.pressed('up') ){
            cubeVisualizer.translateZ( -100 * delta );   
        }
    }
});

var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
    var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec    = nowMsec
    // call each update function
    updateFcts.forEach(function(updateFn){
        updateFn(deltaMsec/1000, nowMsec/1000)
    })
})


updateFcts.push(function(){
    renderer.render( scene, camera );       
});
init();
render();

