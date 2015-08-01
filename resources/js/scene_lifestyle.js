//define and add first scene
caph.app.addScene('scene_lifestyle', $class({
    $extends: Scene,

 // oncreate is called when the scene is created
    oncreate: function () {
    	// this scene can be focused
        this.focusable(true);

		// add Text Label compoponent
        this.addChild(new Label({
            text: 'Click everywhere to move back.',
            position: [100, 100]
        }).setTextColor('white'));

		// set background color
        this.setStyle({
            backgroundColor: 'blue'
        });
    },

	// when this scene is clicked, go backward of history
    onclick: function() {
        this.back();
    }
}));