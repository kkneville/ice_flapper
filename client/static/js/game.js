var game = new Phaser.Game(384, 384, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
	
	game.load.tilemap('map', 'maps/purplesky3.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('purpleskyset', 'img/purpleskyset.png');
	game.load.spritesheet('player', 'img/penguin4.png', 32, 32);
    game.load.spritesheet('ice', 'img/cloud.png', 32, 32);
    game.load.spritesheet('smallcloud', 'img/smallcloud.png', 64, 32);
    game.load.spritesheet('tinycloud', 'img/tinycloud.png', 32, 32);
}

var cursors;
var map;
var tileset;
var player;
var backgroundLayer;
var groundLayer;
var sprite;
var ice;
var tinycloud;
var smallcloud;
var clouds;
var clouds2;

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.tilemap('map');
	map.addTilesetImage('purpleskyset', 'purpleskyset');


	backgroundLayer = map.createLayer('backgroundLayer');
   	 foregroundLayer = map.createLayer('foregroundLayer');
	groundLayer = map.createLayer('groundLayer');
    
	groundLayer.resizeWorld();

    map.setCollisionBetween(1,6000, true, groundLayer, true)


	player = game.add.sprite(0, 1700, 'player');
    	player.frame = 1

    game.physics.enable(player);
    // game.physics.enable(ice);
   
    game.physics.arcade.gravity.y = 250;

    player.body.bounce.y = 0.2;
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = true;


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

	
// the idea was to have ice that falls away after you jump off of it but in practice the ice wasn't jump off able. a time delay might serve as a work around.	
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
    

    clouds = game.add.physicsGroup()
    var findClouds = getObjects('cloud')
    for (var a = 0; a < findClouds.length; a ++){
        var s = clouds.create(findClouds[a].x, findClouds[a].y, 'smallcloud')
        s.body.allowGravity = false
        s.body.velocity.setTo(100,0)
        s.body.collideWorldBounds = true
        s.body.bounce.set(1)
    }

    game.physics.enable(clouds, Phaser.Physics.ARCADE);
    
    
    clouds2 = game.add.physicsGroup()
    var findClouds2 = getObjects('cloud2')
    for (var a = 0; a < findClouds2.length; a ++){
        var s = clouds2.create(findClouds2[a].x, findClouds2[a].y, 'tinycloud')
        s.body.mass = 1
        s.body.allowGravity = false
        s.body.velocity.setTo(200,0)
        s.body.collideWorldBounds = true
        s.body.bounce.set(1)
    }

    game.physics.enable(clouds2, Phaser.Physics.ARCADE);
    
    



    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {


// game.physics.arcade.collide(ice, groundLayer);
game.physics.arcade.collide(player, groundLayer);
game.physics.arcade.collide(player, clouds);
game.physics.arcade.collide(player, clouds2);
game.physics.arcade.collide(clouds, foregroundLayer);
game.physics.arcade.collide(clouds2, foregroundLayer);

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


}


function render() {

    // game.debug.body(p);
    // game.debug.bodyInfo(player, 32, 320);

}
