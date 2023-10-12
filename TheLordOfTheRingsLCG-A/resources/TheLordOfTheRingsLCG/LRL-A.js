useLibrary( 'extension' ) ;

function getName(){ return @LRL-A ; }
function getDescription(){ return @LRL-A-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning( 
			"TheLordOfTheRingsLCG-A can't find TheLordOfTheRingsLCG" 
		) ;
	}else{
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/LRL-A.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/Presentation.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/QuestSheet.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/RulesCard.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/Scenario.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/Set.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/Divider.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/DividerCard.settings' 
		) ;
		Game.get('LRL').masterSettings.addSettingsFrom( 
			'TheLordOfTheRingsLCG/settings/LocationPromo.settings' 
		) ;
		
		ClassMap.add( 'TheLordOfTheRingsLCG/LRL-A.classmap' ) ;
	}
}
