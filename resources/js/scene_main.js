// define and add first scene
caph.app.addScene('scene_main', $class({
    $extends: Scene,

	// oncreate is called when the scene is created
    oncreate: function () {
        var scene = this;
        
        var main_title = new Label({
        	text: 'WE ARE FAMILY',
            size: [700, 300],
            position: [550, 300, 0]
        });
        main_title.setTextSize('100px');
        main_title.setTextStyle({
            color: 'white',
            backgroundColor: 'black'
        });
        
        this.addChild(main_title);

		// add button component to scene
        this.addChild(new Button({
            contents: 'Homepage',
            size: [300],
            position: [300, 700],
            on: {
                click: function(message) {
                    scene.go('scene_homepage');
                }
            }
        }));
        
     // add button component to scene
        this.addChild(new Button({
            contents: 'Family Location',
            size: [300],
            position: [700, 700],
            on: {
                click: function(message) {
                    scene.go('scene_family_location');
                }
            }
        }));
        
     // add button component to scene
        this.addChild(new Button({
            contents: 'Push Condition',
            size: [300],
            position: [1100, 700],
            on: {
                click: function(message) {
                    scene.go('scene_push_condition');
                }
            }
        }));
        
     // add button component to scene
        this.addChild(new Button({
            contents: 'LifeStyle',
            size: [300],
            position: [1500, 700],
            on: {
                click: function(message) {
                    scene.go('scene_lifestyle');
                }
            }
        }));

		// set background color
        this.setStyle({
            backgroundColor: 'green'
        });
    }
}));
