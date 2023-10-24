// The Lord of the Rings: The Card Game
// Strange Eons 3 plug-in script
useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('markup');
useLibrary('extension');
useLibrary('ui');
importPackage(arkham.dialog.prefs );
importClass(arkham.diy.ListItem );
importClass(ca.cgjennings.apps.arkham.dialog.prefs.FillInPreferenceCategory);
var GameLanguage = Language.getGame();
var InterfaceLanguage = Language.getInterface();
var IconSize = 24;
function getName(){ return @LRL; }
function getDescription(){ return @LRL-description; }
function getVersion(){ return 1.9; }
function registerContextBarButton( Name ){
	importClass(arkham.ContextBar);
	var button = {
		buttonIcon : ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/'+Name+'.png'),IconSize,IconSize),
		getID : function getID(){ return 'LRL'+Name;},
		getName : function getName(){ return Name;},
		getIcon : function getIcon(){ return this.buttonIcon; },
		isVisibleInCurrentContext :
			function isVisibleInCurrentContext( context ){
				return context.isMarkupTarget() 
					&& ( context.gameComponent != null ) 
					&& ( context.getGame() == #LRL-TheLordOfTheRingsLCG );
			},
	    isEnabledInCurrentContext : function isEnabledInCurrentContext( context ){ return true; },
	    actionPerformed :
	    	function actionPerformed( actionEvent ){ try{
        	    var mt = Eons.markupTarget;
            	mt.selectNone();
	            mt.selectedText = "<"+Game.get('LRL').masterSettings.get( Name+'-tag' )+">";
    	    }catch( ex ){Error.handleUncaught( ex );} }
	};
	button = new JavaAdapter( ContextBar.Button, button );
	ContextBar.registerButton( button );
}
function initialize(){
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	const GAME = Game.register(
		'LRL','LRL-TheLordOfTheRingsLCG',ImageUtils.get('TheLordOfTheRingsLCG/ui/LRL.png')
		//'LRL',@LRL-TheLordOfTheRingsLCG,#LRL-TheLordOfTheRingsLCG,ImageUtils.get('TheLordOfTheRingsLCG/ui/LRL.png'),null
	);
	GAME.masterSettings.addSettingsFrom( 'TheLordOfTheRingsLCG/LRL.settings' );
	Eons.namedObjects.LRL = new gameObject();
	LRL = Eons.namedObjects.LRL;
	for(let index = 0; index < LRL.TagList.length; index++){
		let item = LRL.TagList[index];
		registerContextBarButton(item);
	}
	var pc = new FillInPreferenceCategory(
		@LRL-preferences-shortTitle,
		'TheLordOfTheRingsLCG/ui/LRL.png'
	);
	var labels;
	var values;

	pc.heading(@LRL-TheLordOfTheRingsLCG); pc.join();
	pc.addHelp(@LRL-preferences-guide-link,@LRL-preferences-guide,false);
	
	if($LRL-NoBottom == null){$LRL-NoBottom = false;}
	pc.addCheckBox('LRL-NoBottom',@LRL-preferences-NoBottom,false);
	
	pc.subheading(@LRL-preferences-subheading-textAlignment);
	pc.join(); pc.addTip(@LRL-preferences-textAlignment-tip);
	labels = new Array(@LRL-left,@LRL-center,@LRL-right);
	values = new Array('<left>','<center>','<right>');
	
	if($LRL-Rules-alignment == null){$LRL-Rules-alignment = '<left>';}
		pc.label(@LRL-Rules); pc.join();
		pc.addDropDown('LRL-Rules-alignment',labels,values);
	if($LRL-Shadow-alignment == null){$LRL-Shadow-alignment = '<center>';}
		pc.label(@LRL-Shadow); pc.join();
		pc.addDropDown('LRL-Shadow-alignment',labels,values);
	if($LRL-Flavour-alignment == null){$LRL-Flavour-alignment = '<right>';}
		pc.label(@LRL-Flavour); pc.join();
		pc.addDropDown('LRL-Flavour-alignment',labels,values);
	if($LRL-Story-alignment == null){$LRL-Story-alignment = '<left>';}
		pc.label(@LRL-Story); pc.join();
		pc.addDropDown('LRL-Story-alignment',labels,values);
	
//	pc.subheading(@LRL-preferences-subheading-textJustified);
//	pc.join(); pc.addTip(@LRL-preferences-textJustified-tip);
//	if($LRL-Enemy-justified == null){$LRL-Enemy-justified = 'no';}
//		pc.addCheckBox('LRL-Enemy-justified',@LRL-Enemy,false);
//	if($LRL-Location-justified == null){$LRL-Location-justified = 'no';}
//		pc.addCheckBox('LRL-Location-justified',@LRL-Location,false);
//	if($LRL-Objective-justified == null){$LRL-Objective-justified = 'no';}
//		pc.addCheckBox('LRL-Objective-justified',@LRL-Objective,false);
//	if($LRL-ObjectiveAlly-justified == null){$LRL-ObjectiveAlly-justified = 'no';}
//		pc.addCheckBox('LRL-ObjectiveAlly-justified',@LRL-ObjectiveAlly,false);
//	if($LRL-SideQuestEncounter-justified == null){$LRL-SideQuestEncounter-justified = 'yes';}
//		pc.addCheckBox('LRL-SideQuestEncounter-justified',@LRL-SideQuestEncounter,false);
//	if($LRL-Treachery-justified == null){$LRL-Treachery-justified = 'no';}
//		pc.addCheckBox('LRL-Treachery-justified',@LRL-Treachery,false);
//	
//	if($LRL-Quest-justified == null){$LRL-Quest-justified = 'yes';}
//		pc.addCheckBox('LRL-Quest-justified',@LRL-Quest,false);
//	if($LRL-Campaign-justified == null){$LRL-Campaign-justified = 'no';}
//		pc.addCheckBox('LRL-Campaign-justified',@LRL-Campaign,false);
//	if($LRL-Preparation-justified == null){$LRL-Preparation-justified = 'no';}
//		pc.addCheckBox('LRL-Preparation-justified',@LRL-Preparation,false);
//
//	if($LRL-Hero-justified == null){$LRL-Hero-justified = 'no';}
//		pc.addCheckBox('LRL-Hero-justified',@LRL-Hero,false);
//	if($LRL-Ally-justified == null){$LRL-Ally-justified = 'no';}
//		pc.addCheckBox('LRL-Ally-justified',@LRL-Ally,false);
//	if($LRL-Attachment-justified == null){$LRL-Attachment-justified = 'no';}
//		pc.addCheckBox('LRL-Attachment-justified',@LRL-Attachment,false);
//	if($LRL-Event-justified == null){$LRL-Event-justified = 'no';}
//		pc.addCheckBox('LRL-Event-justified',@LRL-Event,false);
//	if($LRL-Treasure-justified == null){$LRL-Treasure-justified = 'no';}
//		pc.addCheckBox('LRL-Treasure-justified',@LRL-Treasure,false);
//	if($LRL-Gift-justified == null){$LRL-Gift-justified = 'no';}
//		pc.addCheckBox('LRL-Gift-justified',@LRL-Gift,false);
//	if($LRL-SideQuestPlayer-justified == null){$LRL-SideQuestPlayer-justified = 'yes';}
//		pc.addCheckBox('LRL-SideQuestPlayer-justified',@LRL-SideQuestPlayer,false);
//	
//	if($LRL-QuestSheet-justified == null){$LRL-QuestSheet-justified = 'yes';}
//		pc.addCheckBox('LRL-QuestSheet-justified',@LRL-QuestSheet,false);
//	if($LRL-RulesCard-justified == null){$LRL-RulesCard-justified = 'yes';}
//		pc.addCheckBox('LRL-RulesCard-justified',@LRL-RulesCard,false);
//	if($LRL-Presentation-justified == null){$LRL-Presentation-justified = 'yes';}
//		pc.addCheckBox('LRL-Presentation-justified',@LRL-Presentation,false);
//	if($LRL-Scenario-justified == null){$LRL-Scenario-justified = 'yes';}
//		pc.addCheckBox('LRL-Scenario-justified',@LRL-Scenario,false);
//	if($LRL-Set-justified == null){$LRL-Set-justified = 'yes';}
//		pc.addCheckBox('LRL-Set-justified',@LRL-Set,false);

//	pc.addCheckBox('LRL-preferences-draft',@LRL-preferences-draft-label,false);
//	pc.join();
//	pc.addTip( @LRL-preferences-draft-tip );
	
	pc.subheading(@LRL-preferences-subheading-byComponent);
	if($LRL-Hero-Promo-outOfBox == null){$LRL-Hero-Promo-outOfBox = 'yes';}
		pc.addCheckBox('LRL-Hero-Promo-outOfBox',@LRL-preferences-Hero-Promo-outOfBox,false);

//	pc.subheading(@LRL-preferences-subheading-default);
//	if($LRL-CollectionInfo == null){$LRL-CollectionInfo = "Strange Eons";}
//		pc.addField('LRL-CollectionInfo',@LRL-CollectionInfo,20);
//		pc.join(); pc.addTip(@LRL-preferences-CollectionInfo-tip);
//
//	if($LRL-Copyright == null){$LRL-Copyright = "\u00a9FFG \u00a9Middle-earth";}
//		pc.addField('LRL-Copyright',@LRL-Copyright,20);
//		pc.join(); pc.addTip(@LRL-preferences-Copyright-tip);
//
//
//	labels = new Array('CustomIcon','EmptyIcon','StrangeEonsIcon');
//	labels = labels.concat(LRL.CollectionList);
//	values = new Array();
//	for( let index = 0; index < labels.length; index++ ){
//		let item = labels[index];
//		labels[index] = @('LRL-'+item);
//		values[index] = item;
//	}
//	if($LRL-Collection == null){$LRL-Collection = 'StrangeEonsIcon';}
//		pc.label(@LRL-Collection);
//		pc.join(); pc.addDropDown('LRL-Collection',labels,values);
//		pc.indent(); pc.indent(); pc.addField('LRL-CollectionUser',@LRL-preferences-pathToIcon,30);
//		pc.join(); pc.addTip(@LRL-preferences-Collection-tip);
//		pc.unindent();pc.unindent();
//
//	labels = new Array('CustomIcon','EmptyIcon','StrangeEonsIcon');
//	labels = labels.concat(LRL.EncounterSetList);
//	values = new Array();
//	for( let index = 0; index < labels.length; index++ ){
//		let item = labels[index];
//		labels[index] = @('LRL-'+item);
//		values[index] = item;
//	}
//	if($LRL-EncounterSet == null){$LRL-EncounterSet = 'StrangeEonsIcon';}
//		pc.label(@LRL-EncounterSet);
//		pc.join(); pc.addDropDown('LRL-EncounterSet',labels,values);
//		pc.indent(); pc.indent(); pc.addField('LRL-EncounterSetUser',@LRL-preferences-pathToIcon,30);
//		pc.join(); pc.addTip(@LRL-preferences-EncounterSet-tip);
//		pc.unindent();pc.unindent();
//	
	pc.subheading(@LRL-preferences-subheading-localization);
	pc.label(@LRL-preferences-locale);
	labels = new Array(@LRL-last,@LRL-current,@LRL-specified);
	values = new Array('last','current','specified');
	if($LRL-locale-toLoad == null){$LRL-locale-toLoad = 'last';}
	pc.join(); pc.addDropDown('LRL-locale-toLoad',labels,values);
	pc.join(); pc.addField('LRL-locale','',6);
	pc.join(); pc.addTip(@LRL-preferences-locale-tip);
	
	pc.subheading(@LRL-preferences-subheading-debug);
	pc.addCheckBox('LRL-debug',@LRL-preferences-debug,false);
	pc.join(); pc.addTip(@LRL-preferences-debug-tip);
	pc.addCheckBox('LRL-dontDelete',@LRL-preferences-dontDelete,false);
	pc.join(); pc.addTip(@LRL-preferences-dontDelete-tip);
	
	Preferences.registerCategory( pc );
}
function gameObject(){
	this.BodyFont = ResourceKit.getBodyFamily();
	this.LRLSymbols = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/LRLSymbols.ttf']);
	this.LRLFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/LRLFont.ttf']);
	this.WindFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/LRL-Windlass.ttf']);
//	this.DumbFont = FontUtils.registerFontFamilyFromResources.apply(this,['TheLordOfTheRingsLCG/font/Dumbledor.ttf']);
//	this.UnicodeFont = registerFont( 'Sun-ExtA.ttf' );
	this.StyleList = new Array('LRLFont','LRLSymbols','Trait','Section');
	this.AttackIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Attack.png'),IconSize,IconSize);
	this.BagginsIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Baggins.png'),IconSize,IconSize);
	this.SingleSidedIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/SingleSided.png'),IconSize,IconSize);
	this.DoubleSidedIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/DoubleSided.png'),IconSize,IconSize);
	this.BoonIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Boon.png'),IconSize,IconSize);
	this.BurdenIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Burden.png'),IconSize,IconSize);
	this.CustomDifficultyIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/CustomDifficulty.png'),IconSize,IconSize);
	this.CustomSphereIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/CustomSphere.png'),IconSize,IconSize);
	this.DefenseIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Defense.png'),IconSize,IconSize);
	this.EngagementIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Engagement.png'),IconSize,IconSize);
	this.FellowshipIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Fellowship.png'),IconSize,IconSize);
	this.GoldIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Gold.png'),IconSize,IconSize);
	this.HitPointsIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/HitPoints.png'),IconSize,IconSize);
	this.HorizontalSpacerIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/HorizontalSpacer.png'),IconSize,IconSize);
	this.LeadershipIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Leadership.png'),IconSize,IconSize);
	this.LoreIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Lore.png'),IconSize,IconSize);
	this.MasteryIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Mastery.png'),IconSize,IconSize);
	this.NeutralIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Neutral.png'),IconSize,IconSize);
	this.NightmareIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Nightmare.png'),IconSize,IconSize);
	this.ShipNightmareIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/ShipNightmare.png'),IconSize,IconSize);
	this.ProgressIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Progress.png'),IconSize,IconSize);
	this.ResourceCostIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/ResourceCost.png'),IconSize,IconSize);
	this.ShadowIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Shadow.png'),IconSize,IconSize);
	this.ChoiceIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Choice.png'),IconSize,IconSize);
	this.ShipIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Ship.png'),IconSize,IconSize);
	this.SpiritIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Spirit.png'),IconSize,IconSize);
	this.StandardIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Standard.png'),IconSize,IconSize);
	this.TacticsIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Tactics.png'),IconSize,IconSize);
	this.TheOneRingIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/TheOneRing.png'),IconSize,IconSize);
	this.ThreatIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Threat.png'),IconSize,IconSize);
	this.ThreatCostIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/ThreatCost.png'),IconSize,IconSize);
	this.UniqueIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Unique.png'),IconSize,IconSize);
	this.VerticalSpacerIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/VerticalSpacer.png'),IconSize,IconSize);
	this.WillpowerIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Willpower.png'),IconSize,IconSize);
	this.LRLIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/LRL.png'),IconSize,IconSize);
	this.ComplexIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Complex.png'),IconSize,IconSize);
	this.DualIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Dual.png'),IconSize,IconSize);
	this.CustomRegionIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/CustomRegion.png'),IconSize,IconSize);
	this.RedIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Red.png'),IconSize,IconSize);
	this.GreenIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Green.png'),IconSize,IconSize);
	this.BlueIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Blue.png'),IconSize,IconSize);
	this.YellowIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Yellow.png'),IconSize,IconSize);
	this.PurpleIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Purple.png'),IconSize,IconSize);
	this.BrownIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Brown.png'),IconSize,IconSize);
	this.WhiteIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/White.png'),IconSize,IconSize);
	this.BlackIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Black.png'),IconSize,IconSize);
	this.EmptyIcon = ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/EmptyIcon.png'),IconSize,IconSize);

	this.OptionSpecialCombo = new Array(
		ListItem('none',@LRL-none,ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/icon/EmptyIcon.png'),IconSize,IconSize)),
		ListItem('Sailing',@LRL-Sailing,ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Sailing.png'),IconSize,IconSize)),
		ListItem('EyeOfSauron',@LRL-EyeOfSauron,ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/EyeOfSauron.png'),IconSize,IconSize)),
		ListItem('EyeOfSauron2',@LRL-EyeOfSauron+' x2',ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/EyeOfSauron2.png'),IconSize,IconSize)),
		ListItem('EyeOfSauron3',@LRL-EyeOfSauron+' x3',ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/EyeOfSauron3.png'),IconSize,IconSize)),
		ListItem('EyeOfSauron4',@LRL-EyeOfSauron+' x4',ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/EyeOfSauron4.png'),IconSize,IconSize)),
		ListItem('Person',@LRL-Person,ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/ui/Person.png'),IconSize,IconSize))
	);

	this.combo9 = new Array();
	for(let index = 0;index < 10;index++){
		this.combo9[index] = ListItem(index,String(index));
	}
	this.combo9[this.combo9.length] = ListItem('X','X');
	this.combo9[this.combo9.length] = ListItem('minus','-');
//	this.combo9[this.combo9.length] = ListItem('empty1x1','empty');
	
	this.combo19 = new Array();
	for(let index = 0;index < 20;index++){
		this.combo19[index] = ListItem(index,String(index));
	}
	this.combo19[this.combo19.length] = ListItem('X','X');
	this.combo19[this.combo19.length] = ListItem('minus','-');
	this.combo19[this.combo19.length] = ListItem('empty1x1',' ');
	
	this.combo50 = new Array();
	for(let index = 0;index < 51;index++){
		this.combo50[index] = ListItem(index,String(index));
	}
	this.combo50[this.combo50.length] = ListItem('X','X');
	this.combo50[this.combo50.length] = ListItem('minus','-');
	this.combo50[this.combo50.length] = ListItem('empty1x1',' ');

	this.combo99 = new Array();
	for(let index = 0;index < 100;index++){
		this.combo99[index] = ListItem(index,String(index));
	}
	this.combo99[this.combo99.length] = ListItem('X','X');
	this.combo99[this.combo99.length] = ListItem('minus','-');
	this.combo99[this.combo99.length] = ListItem('empty1x1',' ');

	this.EncounterSetList = new Array(
	/* Core Set box */
		'DolGuldurOrcs',
		'EscapeFromDolGuldur',
		'JourneyDownTheAnduin',
		'PassageThroughMirkwood',
		'SauronsReach',
		'SpidersOfMirkwood',
		'Wilderlands',
	/* Shadows of Mirwood cycle */
		'AJourneyToRhosgobel',
		'ConflictAtTheCarrock',
		'TheHuntForGollum',
		'ReturnToMirkwood',
		'TheDeadMarshes',
		'TheHillsOfEmynMuil',
	/* Khazad-Dum deluxe box */
		'DeepsOfMoria',
		'FlightFromMoria',
		'GoblinsOfTheDeep',
		'HazardsOfThePit',
		'IntoThePit',
		'MistyMountains',
		'PlunderingGoblins',
		'TheSeventhLevel',
		'TwistsAndTurns',
	/* Dwarrowdelf cycle */
		'FoundationsOfStone',
		'TheRedhornGate',
		'RoadToRivendell',
		'ShadowAndFlame',
		'TheLongDark',
		'TheWatcherInTheWater',
	/* Heirs of N\u00famenor deluxe box */
		'Brigands',
		'BroodingForest',
		'CreaturesOfTheForest',
		'IntoIthilien',
		'MordorElite',
		'PerilInPelargir',
		'RavagingOrcs',
		'Southrons',
		'StreetsOfGondor',
		'TheSiegeOfCairAndros',
	/* Against the Shadow cycle */
		'TheStewardsFear',
		'TheDruadanForest',
		'EncounterAtAmonDin',
		'TheAssaultOnOsgiliath',
		'TheBloodOfGondor',
		'TheMorgulVale',
	/* The Voice of Isengard deluxe box */
		'TheFordsOfIsen',
		'ToCatchAnOrc',
		'IntoFangorn',
		'DunlandRaiders',
		'DunlandWarriors',
		'MistyMountainOrcs',
		'BrokenLands',
		'AncientForest',
		'WearyTravellers',
	/* The Ring-maker cycle */
		'TheDunlandTrap',
		'TheThreeTrials',
		'TroubleInTharbad',
		'TheNinInEilph',
		'CelebrimborsSecret',
		'TheAntleredCrown',
	/* The Lost Realm deluxe box */
		'IntrudersInChetwood',
		'Iarion',
		'EriadorWilds',
		'AngmarOrcs',
		'TheWeatherHills',
		'FoulWeather',
		'RuinsOfArnor',
		'DeadmensDike',
		'DarkSorcery',
		'CursedDead',
	/* Angmar Awakened cycle */
		'TheWastesOfEriador',
		'EscapeFromMountGram',
		'AcrossTheEttenmoors',
		'TheTreacheryOfRhudaur',
		'TheBattleOfCarnDum',
		'TheDreadRealm',
	/* The Grey Havens deluxe box */
		'VoyageAcrossBelegaer',
		'TheFateOfNumenor',
		'RaidOnTheGreyHavens',
		'VastOceans',
		'StormyWeather',
		'UmbarFleet',
		'CorsairPirates',
		'TheDreamChasersFleet',
		'DrownedDead',
		'RuinsOfNumenor',
		'CorsairRaiders',
		'TheStormcallerElite',
	/* Dream-chaser cycle */
		'FlightOfTheStormcaller',
		'TheThingInTheDepths',
		'TheStormcaller',
		'TempleOfTheDeceived',
		'TheDrownedRuins',
		'AStormOnCobasHaven',
		'TheCityOfCorsairs',
		'CoastOfUmbar',
	/* Sands of Harad deluxe box */
		'EscapeFromUmbar',
		'DesertCrossing',
		'TheLongArmOfMordor',
		'HaradSoldiers',
		'HaradTerritory',
		'DesertCreatures',
		'DesertSands',
		'MordorOrcs',
		'JungleForest',
	/* The Haradrim cycle */
		'TheMumakil',
		'RaceAcrossHarad',
		'BeneathTheSands',
		'TheBlackSerpent',
		'TheDungeonsOfCirithGurat',
		'TheCrossingsOfPoros',
	/* The Wilds of Rhovanion deluxe box */
		'JourneyUpTheAnduin',
		'LostInMirkwood',
		'TheKingsQuest',
		'GreyMountainGoblins',
		'HillsOfWilderland',
		'LostInWilderland',
		'DarkWoods',
		'GatheringGloom',
		'FellBeasts',
		'WildCreatures',
		'DeepUnderground',
		'AfraidOfTheDark',
		'DragonMight',
		'LostCaves',
	/* Ered Mithrin cycle*/
		'TheWitheredHeath',
		'RoamAcrossRhovanion',
		'FireInTheNight',
		'TheGhostOfFramsburg',
		'MountGundabad',
		'TheFateOfWilderland',
	/* A Shadow in the East deluxe box */
		'TheRiverRunning',
		'DangerInDorwinion',
		'TempleOfDoom',
		'RidersOfRhun',
		'EasterlingRaiders',
		'RollingPlains',
		'ServantsOfSauron',
		'CityOfRhun',
		'UnderGuard',
		'ThePowerOfMordor',
		'TwistedTunnels',
		'UlchorsGuards',
	/* Vengeance of Mordor cycle*/
		'WrathAndRuin',
		'TheCityOfUlfast',
		'ChallengeOfTheWainriders',
		'UnderTheAshMountains',
		'TheLandOfSorrow',
		'TheFortressOfNurn',
	/* The Hobbit: Over Hill and Under Hill saga box */
		'DungeonsDeepAndCavernsDim',
		'MistyMountainGoblins',
		'OverTheMistyMountainsGrim',
		'TheGreatGoblin',
		'WeMustAwayEreBreakOfDay',
		'WesternLands',
	/* The Hobbit: On the Doorstep saga box */
		'FliesAndSpiders',
		'TheLonelyMountain',
		'TheBattleOfFiveArmies',
		'WilderlandsHobbit',
	/* The Lord of the Rings: The Black Riders saga box */
		'AKnifeInTheDark',
		'AShadowOfThePast',
		'FlightToTheFord',
		'Hunted',
		'TheBlackRidersSet',
		'TheNazgul',
		'TheRing',
	/* The Lord of the Rings: The Road Darkens saga box */
		'TheRingGoesSouth',
		'JourneyInTheDark',
		'BreakingOfTheFellowship',
	/* The Lord of the Rings: The Treason of Saruman saga box */
		'TheUrukHai',
		'OrcsOfTheWhiteHand',
		'SnagaOrcs',
		'HelmsDeep',
		'TheRoadToIsengard',
	/* The Lord of the Rings: The Land of Shadow saga box */
		'ThePassageOfTheMarshes',
		'Gollum',
		'MorgulNazgul',
		'JourneyToTheCrossroads',
		'MenOfHarad',
		'ShelobsLair',
		'TheGreatSpider',
	/* The Lord of the Rings: The Flame of the West saga box */
		'ThePassingOfTheGreyCompany',
		'TheSiegeOfGondor',
		'TheBattleOfThePelennorFields',
	/* The Lord of the Rings: The Mountain of Fire saga box */
		'TheTowerOfCirithUngol',
		'TheBlackGateOpens',
		'MountDoom',
		'OrcsOfMordor',
		'DeepShadows',
		'EpicMultiplayerMode',
	/* Print on Demand */
		'TheBattleOfLakeTownSet',
		'TheMassingAtOsgiliathSet',
		'TheStoneOfErechSet',
		'TheOldForestSet',
		'FogOnTheBarrowDownsSet',
		'MurderAtThePrancingPonySet',
		'TheRuinsOfBelegostSet',
		'TheSiegeOfAnnuminasSet',
		'AttackOnDolGuldurSet',
		'TheHuntForTheDreadnaughtSet',
	/* Custom Scenario kit*/
		'TheWoodlandRealmSet',
		'TheWizardsQuestSet',
		'TheMinesOfMoriaSet',
		'EscapeFromKhazadDumSet',
	/* Two-Player Limited Edition Starter */
		'TheCavesOfNibinDum',
		'TheGoblins',
	/* First Age box */
		'TheIsleOfWerewolves',
		'TheSeatOfMorgoth',
		'HuntingOfTheWolf',
	/* Doom Mastered cycle */
		'TrialUponTheMarches',
		'AmongTheOutlaws',
		'BetrayalOfMim',
		'TheFallOfNargothrond',
	/* Children of Eorl box */
		'AmbushAtErelas',
		'TheBattleForTheBeacon',
		'TheHorseLordsIre',
		'RohanLands',
		'RohanWeather',
		'RohanEncampment',
		'DunlendingWarriors',
		'FaithlessRohirrim',
		'OrcHost',
	/* OathsOfTheRohirrim */
		'TheAldburgPlot',
		'FireOnTheEastemnet',
		'TheGapOfRohan',
		'TheGlitteringCaves',
		'SearchForTheHorn',
		'ExploringTheCaves',
		'MusteringOfTheRohirrim',
		'BloodInTheIsen',
	/* ALongExpectedParty */
		'TheScouringOfTheShire',
		'TheSiegeOfErebor',
	/* Special */
		'SusurrosDelBosqueViejo',
	/* Numbers */
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
		40, 41, 42, 43, 44, 45, 46, 47, 48, 49
//		50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
//		60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
//		70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
//		80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
//		90, 91, 92, 93, 94, 95, 96, 97, 98, 99
	);
	this.EncounterSetCombo = new Array('CustomIcon','EmptyIcon','StrangeEonsIcon');
	this.EncounterSetCombo = this.EncounterSetCombo.concat(this.EncounterSetList);
	for(let index=0;index<this.EncounterSetCombo.length;index++){
		let item = this.EncounterSetCombo[index];
		let image;
		if( typeof(item) === "number"){
			//println("number: "+item)
			image = ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+item+'.png');
		}else{
			//println(item)
			image = ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png');
		}
		let text = @('LRL-'+item);
		if( text == "[MISSING: LRL-"+item+"]" ) {text = item;}
		this.EncounterSetCombo[index] = ListItem(
			item,text,
			ImageUtils.createIcon(image,IconSize,IconSize)
		);
	}
	this.CollectionList = new Array(
	/* Official */
		'CoreSet',
		'ShadowsOfMirkwood',
		'KhazadDum',
		'Dwarrowdelf',
		'HeirsOfNumenor',
		'AgainstTheShadow',
		'TheVoiceOfIsengard',
		'TheRingMaker',
		'TheLostRealm',
		'AngmarAwakened',
		'TheGreyHavens',
		'DreamChaser',
		'TheSandsOfHarad',
		'TheHaradrim',
		'TheWildsOfRhovanion',
		'EredMithrin',
		'AShadowInTheEast',
		'VengeanceOfMordor',
	/* Saga boxes */
		'OverHillAndUnderHill',
		'OnTheDoorstep',
		'TheBlackRiders',
		'TheRoadDarkens',
		'TheTreasonOfSaruman',
		'TheLandOfShadow',
		'TheFlameOfTheWest',
		'TheMountainOfFire',
	/* Print on Demand */
		'TheBattleOfLakeTown',
		'TheMassingAtOsgiliath',
		'TheStoneOfErech',
		'TheOldForest',
		'FogOnTheBarrowDowns',
		'TheRuinsOfBelegost',
		'MurderAtThePrancingPony',
		'TheSiegeOfAnnuminas',
		'AttackOnDolGuldur',
		'TheHuntForTheDreadnaught',
	/* Custom Scenario kit*/
		'TheWoodlandRealm',
		'TheWizardsQuest',
		'TheMinesOfMoria',
		'EscapeFromKhazadDum',
	/* Other */
		'TwoPlayerLimitedEditionStarter',
	/* Special */
		'FirstAge',
		'DoomMastered',
		'ChildrenOfEorl',
		'OathsOfTheRohirrim',
		'TheScouringOfTheShire',
		'TheSiegeOfErebor',
		'SusurrosDelBosqueViejo'
	);
	this.CollectionCombo = new Array('CustomIcon','EmptyIcon','StrangeEonsIcon');
	this.CollectionCombo = this.CollectionCombo.concat(this.CollectionList);
	for(let index=0;index<this.CollectionCombo.length;index++){
		let item = this.CollectionCombo[index];
		this.CollectionCombo[index] = ListItem(
			item,@('LRL-'+item),
			ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'),IconSize,IconSize)
		);
	}
	this.SphereList = new Array(
		'Neutral','Leadership','Lore','Spirit','Tactics',
		'Baggins','Fellowship','Mastery'
	);
	this.SphereCombo = new Array('CustomSphere');
	this.SphereCombo = this.SphereCombo.concat(this.SphereList);
	for(let index=0;index<this.SphereCombo.length;index++){
		let item = this.SphereCombo[index];
		this.SphereCombo[index] = ListItem(
			item,@('LRL-'+item),
			ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'),IconSize,IconSize)
		);
	}
	this.TagList = new Array(
		'Attack','Defense','Willpower','Threat',
		'Unique','Shadow','PerPlayer',
		'Leadership','Lore','Spirit','Tactics',
		'Baggins','Fellowship','Mastery',
		'VerticalSpacer','HorizontalSpacer',
		'HeadingOnCourse','HeadingOffCourse',
		'HeadingBad','HeadingWorst',
		'Sailing','EyeOfSauron',
		'Person','Choice'
	);
	this.LocalizableList = new Array(
		'Name','NameBack','GameName',
		'Adventure','Cycle',
		'Story','StoryBack','StoryLeft','StoryRight',
		'Rules','RulesBack','RulesLeft','RulesRight',
		'Flavour','FlavourBack','FlavourLeft','FlavourRight',
		'Condition','ConditionBack','Trait','Shadow',
		'OptionLeft','OptionRight','Type','Side','Subtype',
		'Success','Failure',
		'Artist','ArtistBack','Copyright','CollectionInfo'
	);
}
/*
register
public static Expansion register(
	Game forGame,
	String code,
	String uiName,
	String gameName,
	BufferedImage iconImage,
	BufferedImage[] symbols
)
Register an expansion for a game. The game must have already be registered. Each expansion must have a unique identifier string. An easy way to construct such identifiers is to append the number of the expansion to the game's identifier (e.g., TAL1, TAL2 are the first two expansions for the game with identifier TAL, namely Talisman). Alternatively, you could append a hyphen and short mnemonic for the name of the expansion (TAL-TD, TAL-FM, and so on).
Note that there is a common "base game" expansion that all games share to indicate that no expansion applies. There is no need to register an expansion for this purpose.

Parameters:
	forGame - the game to which the expansion belongs, or all games if null
	code - a short unique code string for the expansion, usually 2-6 capital letters
	uiName - the name of the expansion, in the user interface locale
	gameName - the name of the expansion, in the game locale
	iconImage - an image to use to represent the expansion, may be null in which case a default image is used
	symbols - an array of symbol images used to represent the expansion on components
Returns:
	the registered expansion
Throws:
	NullPointerException - if the code is null
	IllegalArgumentException - if the code is empty or contains characters not allowed in a file name, or if an expansion with the same code is already registered and the database is locked

setComponentExpansionSymbols
public static void setComponentExpansionSymbols(
	GameComponent gc,
	Set<Expansion> exps
)
Sets the expansion symbols associated with a game component by modifying the component"s EXPANSION_SETTING_KEY private setting. If the expansion set is null or empty, then the base game expansion will be used.
Parameters:
	gc - the game component to modify
	exps - a set of the expansions to associate with the component
	
	getSymbol
public BufferedImage getSymbol(int customSymbolIndex)
Returns a symbol that is associated with this expansion. This method can be used to retrieve extra symbols beyond the standard two types used by the default expansion symbol painting mechanism. Under that mechanism, index 0 is the standard symbol while index 1 is the inverse symbol. However, custom painting methods may assign any interpretation they wish to these indices. If the requested symbol is not defined for this expansion, the symbol at index 0 is returned instead.
Parameters:
customSymbolIndex - the index into the passed in array of custom symbols
Returns:
the requested symbol, or null if there is no symbol at that index
Throws:
IllegalArgumentException - if customSymbolIndex is less than 0


getUIName
public String getUIName()
Returns the expansion"s name in the interface locale.
Returns:
the localized interface name

getGameName
public String getGameName()
Returns the expansion"s name in the game locale.
Returns:
the localized game name

getIcon
public Icon getIcon()
Returns the icon used to represent the expansion in the interface.
Specified by:
getIcon in interface IconProvider
Returns:
the expansion"s icon
*/