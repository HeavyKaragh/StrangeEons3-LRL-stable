useLibrary( 'extension' ) ;

function getName(){ return @LRL-AHD ; }
function getDescription(){ return @LRL-AHD-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning( 
			"TheLordOfTheRingsLCG-AHD can't find TheLordOfTheRingsLCG" 
		) ;
	}else{
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/LRL-AHD.settings' 
		) ;
	}
}
