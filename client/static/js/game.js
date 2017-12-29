var game = new Phaser.Game(320, 320, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	
	game.load.tilemap('map', 'maps/purplesky3.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('purpleskyset', 'img/purplesky3.png');
	game.load.spritesheet('player', 'img/penguin4.png', 32, 32);
    game.load.spritesheet('ice', 'img/cloud.png', 32, 32);
}

var cursors;
var map;
var tileset;
var player;
var backgroundLayer;
var groundLayer;
var sprite;
var ice;


function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.tilemap('map');
	map.addTilesetImage('purpleskyset', 'purpleskyset');


	backgroundLayer = map.createLayer('backgroundLayer');
	groundLayer = map.createLayer('groundLayer');
    
	groundLayer.resizeWorld();

    map.setCollisionBetween(1,6000, true, groundLayer, true)


	player = game.add.sprite(0, 1700, 'player');
    player.frame = 1


    function getObjects(spritename){
    var results = []   
    console.log(map.objects.objectsLayer) 
    console.log(map.objects.objectsLayer[0])
    for (var a = 0; a < map.objects.objectsLayer.length; a ++){
        if (map.objects.objectsLayer[a].properties.sprite == spritename) {
            map.objects.objectsLayer[a].y -= map.tileHeight
            results.push(map.objects.objectsLayer[a])
            console.log(map.objects.objectsLayer[a])
        }
    }
    console.log("these are the objects ", results)
    return results

    }

    // ice = game.add.physicsGroup()
    // var findice = getObjects("ice")  
    // for (var a = 0; a < findice.length; a ++){
    //     var s = ice.create(findice[a].x, findice[a].y, 'ice')
    //     s.body.mass = -100
    //     s.body.allowGravity = false
    //     s.body.checkCollision.left = false
    //     s.body.checkCollision.right = false
    //     s.body.checkCollision.down = false
    //     s.body.immovable = true
    // }    
    
    game.physics.enable(player);
    // game.physics.enable(ice);
   
    game.physics.arcade.gravity.y = 250;

    player.body.bounce.y = 0.2;
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = true;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {


// game.physics.arcade.collide(ice, groundLayer);
game.physics.arcade.collide(player, groundLayer);
// game.physics.arcade.collide(player, ice);

    player.body.velocity.x = 0;

    if (cursors.up.isDown)
    {
        if (player.body.onFloor() || player.body.touching.down)
        {
            player.body.velocity.y = -200;
        }
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
    }


// game.physics.arcade.collide(player, ice, dropIce, null)

//     function dislodgeIce(player, ice){
//         setTimeout(function(){dropIce(player, ice)},8000, false)
        
//     } 

//     function dropIce(player, ice){
//         ice.body.allowGravity = true
//     }

}


function render() {

    // game.debug.body(p);
    // game.debug.bodyInfo(player, 32, 320);

}
