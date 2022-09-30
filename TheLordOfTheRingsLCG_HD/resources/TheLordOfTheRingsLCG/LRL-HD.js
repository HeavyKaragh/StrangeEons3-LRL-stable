useLibrary('extension');
function getName(){return @LRL-HD;}
function getDescription(){return @LRL-HD-description;}
function getVersion(){return 1.8;}
function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning("TheLordOfTheRingsLCG-HD can't find TheLordOfTheRingsLCG");
	}
}
