//Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        //This function will be executed at the beginning
        //Thats where we load the images and sound
        
        //Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },
    
    create: function() {
        //This function is called after the preload function
        //Here we set up the game, display sprites, etc.
        
        //Change the background colour of the game to Blue - for now
        game.stage.backgroundColor = '#71c5cf';
        
        //Set the physics for the game
        game.physics.startSytem(Phaser.Physics.ARCADE);
        
        //Display the bird at the position of x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
        
        //Add physics to the bird
        //Needed for: movement, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);
        
        //Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;
        
        //Call 'jump' function when the spacebar is pressed
        var spaceBar = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.jump, this);
        
        //Create an empty group
        this.pipes = game.add.group();
        
        //Timer for pipes
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    },
    
    update: function() {
        //This function is called 60 times per second
        //It contains the games logic
        
        //Call the 'restartGame' function
        if (this.bird.y <0 || this.bird.y >490)
            this.restartGame();
    },
    
    jump: function() {
        //Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },
    
    //Restart the game
    restartGame: function() {
        //Start the 'main' state, which restarts the game
        game.state.start('main');
        },
    
    //Add a pipe
    addOnePipe: function(x, y) {
        //Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');
        
        //Add pipe to group
        this.pipes.add(pipe);
        
        //Enable the physics on the pipe
        game.physics.arcade.enable(pipe);
        
        //Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;
        
        //Automatically kill pipe when it is no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    //Many pipes
    addRowOfPipes: function() {
        //Randomly pick a number between 1 and 5
        //This will be the hole position in the pipe
        var hole = Math.floor(Math.random() * 5) + 1;
        
        //Add 6 pipes 
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.addOnePipe(499, i * 60 + 10);
    },
};

//Initialise Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400,490);

//Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

//Start the state to actually start the game

game.state.start('main');