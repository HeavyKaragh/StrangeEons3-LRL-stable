/* LIBRARIES */
useLibrary( 'diy' ) ;
useLibrary( 'common' ) ;
useLibrary( 'ui' ) ;
useLibrary( 'markup' ) ;
useLibrary( 'fontutils' ) ;
useLibrary( 'imageutils' ) ;
useLibrary( 'tints' ) ;
importClass( arkham.diy.ListItem ) ;
importClass( arkham.component.DefaultPortrait ) ;
importClass( ca.cgjennings.graphics.filters.StrokeFilter ) ;
importClass( ca.cgjennings.graphics.ImageUtilities ) ;
importClass( arkham.HSBPanel ) ;
importClass( ca.cgjennings.graphics.filters.StrokeFilter ) ;

/* VERSION CONTROL */
const LIBRARYVERSION = 15 ;
//12: drawOption*, a\u00f1adido dibujado decoraci\u00f3n
//13: drawTexOutlined, corregido drawAsSingleLine
//14: drawSailing
//15: drawOptionSpecial

/* CONSTANTS AND VARIABLES */
var LRL = Eons.namedObjects.LRL ;
var GameLanguage = Language.getGame() ;
var InterfaceLanguage = Language.getInterface() ;
var locale ;
var mainLocale ;
var PortraitList = [] ;
var IconSize = 24 ;
var strokeStrongThin = new StrokeFilter(
	new Colour( 0xd0000000 , true ) , 1 ,
	StrokeFilter.Position.OUTSIDE
) ;
var strokeStrong = new StrokeFilter(
	new Colour( 0xff000000 , true ) , 2 ,
	StrokeFilter.Position.OUTSIDE
) ;
var strokeStrongWide = new StrokeFilter(
	new Colour( 0xd0000000 , true ) , 3 ,
	StrokeFilter.Position.OUTSIDE
) ;
var strokeMediumThin = new StrokeFilter(
	new Colour( 0xa0000000 , true ) , 1 ,
	StrokeFilter.Position.OUTSIDE
) ;
var strokeMedium = new StrokeFilter(
	new Colour( 0xb0000000 , true ) , 2 ,
	StrokeFilter.Position.OUTSIDE
) ;
var strokeMediumWide = new StrokeFilter(
	new Colour( 0xa0000000 , true ) , 3 ,
	StrokeFilter.Position.OUTSIDE
);
var strokeLightThin = new StrokeFilter(
	new Colour( 0x80000000 , true ) , 1 ,
	StrokeFilter.Position.OUTSIDE
);
var strokeLight = new StrokeFilter(
	new Colour( 0x80000000 , true ) , 2 ,
	StrokeFilter.Position.OUTSIDE
);
var strokeLightWide = new StrokeFilter(
	new Colour( 0x80000000 , true ) , 3 ,
	StrokeFilter.Position.OUTSIDE
);

/* CUSTOM PORTRAIT HANDLING */
function getPortraitCount(){ 
	return PortraitList.length ; 
}

function getPortrait( index ) {
	if( ( index < 0 ) || ( index >= PortraitList.length ) ){
		throw new Error( 'getPortrait: Invalid portrait index: ' + index ) ;
	}
	return PortraitList[ index ] ;
}

/* DEBUGGING */
function debug( text ){
	if( $LRL-debug == 'yes' ){ println( text ) ; }
}

/* HELPER FUNCTIONS */
function isOdd( number ){ 
	return Boolean( number & 1 ) ;
}

function filterFunction(filter){
	var f = function filter( source ){
		return filter.filter.filter( source , null ) ;
	} ;
	f.filter = filter ;
	return f ;
}

const createHCImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.BrightnessContrastFilter( 0.3 , 0.5 )
	])
) ;

const createRedishImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		//new ca.cgjennings.graphics.filters.BrightnessContrastFilter( -0.2 , 0.2 ) ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 0.5 , 0.5 )
	])
) ;

const createSepiaImage = filterFunction(
	new ca.cgjennings.graphics.filters.CompoundPixelwiseFilter([
		new ca.cgjennings.graphics.filters.GreyscaleFilter() ,
		new ca.cgjennings.graphics.filters.GammaCorrectionFilter( 1.5 , 1 , 0.5 )
	])
) ;

function removeTags( string ){
	debug( 'removeTags: in: ' + string ) ;
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	string = string.substring(0,string.search("<"))+string.substring(string.search(">")+1);
	debug('removeTags: out: '+string);
	return string;
}

function checkKey( key , appendix ){	
/* Looks for the most specific setting name.
	RETURNS: string
	Will look for and RETURN, if it exists:
		1- Card-$Template-key
		2- Card-key
		3- $Template-key
		4- key
		5- null
	If appendix is included, search key+appendix, but don't return
	the appendix with the key. Useful for settings.getTint() etc.
*/	
	var validKey ;
	if( appendix == null ){ appendix = '' ; }
	if( $( Card + '-' + $Template + '-' + key + appendix ) != null ){
		validKey = String( Card + '-' + $Template + '-' + key ) ;
	}else{
		if( $( Card + '-' + key + appendix ) != null ){
			validKey = String( Card + '-' + key ) ;
		}else{
			if( $( $Template + '-' + key + appendix ) != null ){
				validKey = String( $Template + '-' + key ) ;
			}else{
				if( $( key + appendix ) != null ){
					validKey = String( key ) ;
				}else{ validKey = null ; }
			}
		}
	}
	debug( 'checkKey: ' + key + ': ' + appendix + ': ' + validKey ) ;
	return validKey ;
}

function drawName( g , diy ){
	if( diy.settings.getBoolean( 'Unique' , false ) == true ){
		Name_box.markupText = '<lrs>u</lrs><size 50%> <size 200%>' + $Name ;
	}else{
		Name_box.markupText = $Name ;
	}
	Name_box.drawAsSingleLine( g , diy.settings.getRegion( checkKey( 'Name-region' ) ) ) ;
}

function drawNameRotated( g , diy ){
	Name_box.markupText = $Name ;
	var oldTransform = g.getTransform() ;
	g.rotate( -Math.PI/2 , 0 , 0 ) ; //quitar 0s
	var region = diy.settings.getRegion( checkKey( 'Name-region' ) ) ;
	var newRegion = region.clone() ;
	var x = region.getX() ;
	var y = region.getY() ;
	var w = region.getWidth() ;
	var h = region.getHeight() ;
	newRegion.setRect( -h-y , x , h , w ) ;
	Name_box.draw( g , newRegion ) ;
	g.setTransform( oldTransform ) ;
}

function drawText(key,box,g,diy,shape){
	var Text = $(key);
	box.markupText = Text;
	updateNameTags(box,diy);
	box.draw(g,diy.settings.getRegion(checkKey(key+'-region')));
}

function drawBody(partsArray,g,diy,shape){
	var Text = '';
	for( let index = 0; index < partsArray.length; index++ ){
		Text =  addTextPart(Text,partsArray[index],diy);
	}
	if($('LRL-'+Card+'-justified') == 'yes'){Text = Text+'<justified>';}
	Body_box.markupText = Text;
	updateNameTags(Body_box,diy);
	Body_box.draw(g,diy.settings.getRegion(checkKey('Body-region')));
}
function drawBodyBack(partsArray,g,diy){
	var Text = '';
	for( let index = 0; index < partsArray.length; index++ ){
		Text =  addTextPart(Text,partsArray[index],diy);
	}
	if($('LRL-'+Card+'-justified') == 'yes'){Text = Text+'<justified>';}
	BodyBack_box.markupText = Text;
	updateNameTags(BodyBack_box,diy);
	BodyBack_box.draw(g,diy.settings.getRegion(checkKey('BodyBack-region')));
}
function drawSetNumber(g,diy){
	if($EncounterSetNumber > 0){
		if($EncounterSetTotal > 0){
			EncounterSetNumber_box.markupText = $EncounterSetNumber+'/'+$EncounterSetTotal;
		}else{
			EncounterSetNumber_box.markupText = $EncounterSetNumber;
		}
	}else{
		EncounterSetNumber_box.markupText = '---';
	}
	EncounterSetNumber_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('EncounterSetNumber-region')));
}
function drawCycle(g,diy){
	Cycle_box.markupText = $Cycle;
	Cycle_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Cycle-region')));
}
function drawAdventure(g,diy){
	Adventure_box.markupText = $Adventure;
	Adventure_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Adventure-region')));
}
function paintOptionSpecial(g,diy,sheet){
	switch(String($OptionSpecial)){
	case 'Sailing':
		sheet.paintImage(g,'SailingIcon',Card+'-OptionSpecial');
		break;
	case 'EyeOfSauron':
		sheet.paintImage(g,'EyeOfSauronIcon',Card+'-OptionSpecial');
		break;
	case 'EyeOfSauron2':
		sheet.paintImage(g,'EyeOfSauron2Icon',Card+'-OptionSpecial');
		break;
	case 'EyeOfSauron3':
		sheet.paintImage(g,'EyeOfSauron3Icon',Card+'-OptionSpecial');
		break;
	case 'EyeOfSauron4':
		sheet.paintImage(g,'EyeOfSauron4Icon',Card+'-OptionSpecial');
		break;
	case 'Person':
		sheet.paintImage(g,'PersonIcon',Card+'-OptionSpecial');
		break;
	}
}
function drawOptionLeft(g,diy,sheet){
	if( String($OptionLeft) != ""){
		var decoRegion = $(Card+'-OptionLeft-region');
		decoRegion = decoRegion.split(',');
		sheet.paintImage(g,
			'VictoryDeco',
			Number(decoRegion[0])-8,
			Number(decoRegion[1])-4,
			Number(decoRegion[2])+16,
			Number(decoRegion[3])+9
		);
		OptionLeft_box.markupText = $OptionLeft;
		OptionLeft_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('OptionLeft-region')));
	}
}
function drawOptionRight(g,diy,sheet){
	if( String($OptionRight) != ""){
		var decoRegion = $(Card+'-OptionRight-region');
		decoRegion = decoRegion.split(',');
		sheet.paintImage(g,
			'VictoryDeco',
			Number(decoRegion[0])-8,
			Number(decoRegion[1])-4,
			Number(decoRegion[2])+16,
			Number(decoRegion[3])+9
		);
		OptionRight_box.markupText = $OptionRight;
		OptionRight_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('OptionRight-region')));
	}
}
function drawArtist(g,diy){
	if($Artist == ''){ Artist_box.markupText = #LRL-IllustratorUnknown;
	}else{ Artist_box.markupText = #LRL-IllustratorShort+' '+$Artist; }
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) Artist_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Artist-region')));
}
function drawCopyright(g,diy){
	Copyright_box.markupText = $Copyright;
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) Copyright_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Copyright-region')));
}
function drawCollectionInfo(g,diy){
	CollectionInfo_box.markupText = $CollectionInfo;
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) CollectionInfo_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('CollectionInfo-region')));
}
function drawCollectionNumber(g,diy){
	if($CollectionNumber > 0){
		CollectionNumber_box.markupText = $CollectionNumber;
	}else{
		CollectionNumber_box.markupText = '---';
	}
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) CollectionNumber_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('CollectionNumber-region')));
}
function drawType(g,diy){
	if($Type != ''){ Type_box.markupText = $Type;
	}else{ 
		if($Template == 'Ship'){
			if(Card == 'Enemy'){
				Type_box.markupText = #('LRL-ShipEnemy');
			}else if(Card == 'ObjectiveAlly'){
				Type_box.markupText = #('LRL-ShipObjective');
			}else{ println('error:drawType:\u00bfShip?');}
		}else{ 
			Type_box.markupText = #('LRL-'+Card); 
		}
	}
	Type_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Type-region')));
}
function drawSubtype(g,diy){
	if($Subtype != ''){ Subtype_box.markupText = $Subtype;
	}else{ Subtype_box.markupText = #('LRL-'+$Template); }
	Subtype_box.drawAsSingleLine(g,diy.settings.getRegion(checkKey('Subtype-region')));
}
function drawTextLineOutlined(key,regionKey,stroke,diy,g,sheet){
	debug(
		'drawTextLineOutlined: key: '+key,'\n',
		'drawTextLineOutlined: regionKey: '+String(regionKey)
	);
	var region;
	if(regionKey == null){
		region = diy.settings.getRegion(checkKey(key,'-region'));
	}else{
		region = diy.settings.getRegion(regionKey);
	}
	region = String(region).split(',');
	var w = Number(region[2]);
	var h = Number(region[3]);
	var textImage = sheet.createTemporaryImage(w,h,true);
	var gi = sheet.createGraphics(textImage,true,true);
	this[key+'_box'].drawAsSingleLine(gi,
		new Region([3,2,w-6,h-4])
	);
	originalWidth = stroke.getWidth();
	if((originalWidth*sheet.scalingFactor)<1){
		debug('drawTextLineOutlined: bad width: '+originalWidth*sheet.scalingFactor);
		stroke.setWidth(1);
	}else{
		stroke.setWidth(originalWidth*sheet.scalingFactor);
	}
	textImage = stroke.filter(textImage,null);
	if(regionKey == null){
		sheet.paintImage(g,textImage,checkKey(key,'-region'));
	}else{
		sheet.paintImage(g,textImage,regionKey);
	}
	stroke.setWidth(originalWidth);
}
function drawTextOutlined(key,regionKey,stroke,diy,g,sheet){
	debug(
		'drawTextOutlined: key: '+key,'\n',
		'drawTextOutlined: regionKey: '+regionKey
	);
	var region;
	if(regionKey == null){
		region = diy.settings.getRegion(checkKey(key,'-region'));
	}else{
		region = diy.settings.getRegion(regionKey);
	}
	region = String(region).split(',');
	var w = Number(region[2]);
	var h = Number(region[3]);
	var textImage = sheet.createTemporaryImage(w,h,true);
	var gi = sheet.createGraphics(textImage,true,true);
	this[key+'_box'].draw(gi,
		new Region([3,2,w-6,h-4])
	);
	var originalWidth = stroke.getWidth();
	if((originalWidth*sheet.scalingFactor)<1){
		debug('drawTextOutlined: bad width: '+originalWidth*sheet.scalingFactor);
		stroke.setWidth(1);
	}else{
		stroke.setWidth(originalWidth*sheet.scalingFactor);
	}
	textImage = stroke.filter(textImage,null);
	if(regionKey == null){
		sheet.paintImage(g,textImage,checkKey(key,'-region'));
	}else{
		sheet.paintImage(g,textImage,regionKey);
	}
	stroke.setWidth(originalWidth);
}
function drawImageOutlined1(image,regionKey,stroke,diy,g,sheet){
	debug('drawImageOutlined: regionKey: '+regionKey);
	var region;
	if(regionKey == null){
		region = diy.settings.getRegion(checkKey(key,'-region'));
	}else{
		region = diy.settings.getRegion(regionKey);
	}
	region = String(region).split(',');
	debug('drawImageOutlined: region: '+region);
	var w = Number(region[2]);
	var h = Number(region[3]);
	var outlinedImage = sheet.createTemporaryImage(w,h,true);
	var gi = sheet.createGraphics(outlinedImage,true,true);
	var innerRegion = new Region([
			Math.round((Math.round(w*1.1)-w)/2),
			Math.round((Math.round(h*1.1)-h)/2),
			w,h
	]);
	debug('drawImageOutlined: innerRegion: '+innerRegion);
	sheet.paintImage(gi,outlinedImage,innerRegion);
	originalWidth = stroke.getWidth();
	if((originalWidth*sheet.scalingFactor)<1){
		debug('drawImageOutlined: bad width: '+originalWidth*sheet.scalingFactor);
		stroke.setWidth(1);
	}else{
		stroke.setWidth(originalWidth*sheet.scalingFactor);
	}
	outlinedImage = stroke.filter(outlinedImage,null);
	stroke.setWidth(originalWidth);
	sheet.paintImage(g,outlinedImage,regionKey);
}
function settingToArray(key){
/* Convert a setting to an array
	RETURNS: Array
*/
//	string = String( $( key ) ).replace( ' , ', ',' ); string = string.replace( ' ,', ',' );
//	string = string.replace( ', ', ',' ); string = string.split( ',' );
	var array = String($(key)).split(',');
	debug(
		'settingToArray: key: '+key,
		'settingToArray: array: '+array
	);
	return array;
}
function paintIcon(icon,g,sheet){
	var item = 'EmptyIcon';
	var key = String(PortraitList[icon].getBaseKey()).replace(Card+'-','');
	debug('paintIcon: key: '+key+': '+icon);
	switch(icon){
	case COLLECTION: item = $Collection; break;
	case ENCOUNTERSET: item = $EncounterSet; break;
	case ENCOUNTERSET1: item = $EncounterSet1; break;
	case ENCOUNTERSET2: item = $EncounterSet2; break;
	case ENCOUNTERSET3: item = $EncounterSet3; break;
	case ENCOUNTERSET4: item = $EncounterSet4; break;
	case ENCOUNTERSET5: item = $EncounterSet5; break;
	case CUSTOMSPHERE: item = $Template; break;
	default: throw new Error ('INVALID ICON');
	}
	switch(String(item)){
	case 'Neutral': case 'Boon': break;// for CustomSphere in Neutral and Boon cards
	case 'EmptyIcon': break;
	case 'CustomIcon': case 'CustomSphere':
		sheet.paintImage(g,
			PortraitList[icon].getImage(),
			checkKey(key+'-portrait-clip-region')
		);
		break;
	default:
		if(($Template == 'Nightmare')&&(key == 'EncounterSet')){
			var NightmareIcon = ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'-Nightmare.png', false, true);
			if(NightmareIcon == null){
				NightmareIcon = ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png');
				NightmareIcon = ImageUtils.invert(NightmareIcon);
			}
			sheet.paintImage(g,
				NightmareIcon,
				checkKey(key+'-portrait-clip-region')
			);
		}else{
			sheet.paintImage(g,
				ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'),
				checkKey(key+'-portrait-clip-region')
			);
		}
	}
}
function getIcon(icon){
	debug(
		'getIcon: index: '+icon,
		'getIcon: baseKey: '+PortraitList[icon].getBaseKey()
	);
	var item = 'EmptyIcon';
	switch(icon){
	case COLLECTION: item = $Collection; break;
	case ENCOUNTERSET: item = $EncounterSet; break;
	case ENCOUNTERSET1: item = $EncounterSet1; break;
	case ENCOUNTERSET2: item = $EncounterSet2; break;
	case ENCOUNTERSET3: item = $EncounterSet3; break;
	case ENCOUNTERSET4: item = $EncounterSet4; break;
	case ENCOUNTERSET5: item = $EncounterSet5; break;
	case CUSTOMSPHERE: item = $Template; break;
	default: throw new Error ('INVALID ICON');
	}
	switch(String(item)){
	case 'EmptyIcon': // case 'Neutral':
		return ImageUtils.get('TheLordOfTheRingsLCG/image/empty1x1.png');
		break;
	case 'CustomIcon': case 'CustomSphere':
		return PortraitList[icon].getImage();
		break;
	default:
		if(($Template == 'Nightmare')&&(icon == ENCOUNTERSET)){
			return ImageUtils.invert(ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'));
		}else{
			return ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png');
		}
	}
}
function paintLogo(g,sheet,diy){
	setLocales();
	debug('paintLogo: mainLocale: '+mainLocale);
	switch(String(mainLocale)){
	case 'es': 
		sheet.paintImage(g,
			diy.settings.getImageResource(checkKey('GameLogo-es')),
			checkKey('GameLogo-region')
		);
		break;
	case 'pl': 
		sheet.paintImage(g,
			diy.settings.getImageResource(checkKey('GameLogo-pl')),
			checkKey('GameLogo-region')
		);
		break;
	default: 
		sheet.paintImage(g,
			diy.settings.getImageResource(checkKey('GameLogo')),
			checkKey('GameLogo-region')
		);
	}
}
function setPortraitIndex(){
	PORTRAIT = PortraitListKey.indexOf('Portrait');
	PORTRAITV = PortraitListKey.indexOf('PortraitV');
	PORTRAITBACK = PortraitListKey.indexOf('PortraitBack');
	PORTRAITPROMO = PortraitListKey.indexOf('PortraitPromo');
	COLLECTION = PortraitListKey.indexOf('Collection');
	ENCOUNTERSET = PortraitListKey.indexOf('EncounterSet');
	ENCOUNTERSET1 = PortraitListKey.indexOf('EncounterSet1');
	ENCOUNTERSET2 = PortraitListKey.indexOf('EncounterSet2');
	ENCOUNTERSET3 = PortraitListKey.indexOf('EncounterSet3');
	ENCOUNTERSET4 = PortraitListKey.indexOf('EncounterSet4');
	ENCOUNTERSET5 = PortraitListKey.indexOf('EncounterSet5');
	BODYICON = PortraitListKey.indexOf('BodyIcon');
	CUSTOMSPHERE = PortraitListKey.indexOf('CustomSphere');
}
function savePortrait(diy){
	try{
	for(let index = 0;index<PortraitListKey.length;index++){
		key = PortraitListKey[index];
		diy.settings.set(
			Card+'-'+key+'-portrait-template',
			PortraitList[index].getSource()
		);
		diy.settings.set(
			Card+'-'+key+'-portrait-scale',
			PortraitList[index].getScale()
		);
		diy.settings.set(
			Card+'-'+key+'-portrait-rotation',
			PortraitList[index].getRotation()
		);
		diy.settings.set(
			Card+'-'+key+'-portrait-pany',
			PortraitList[index].getPanY()
		);
		diy.settings.set(
			Card+'-'+key+'-portrait-panx',
			PortraitList[index].getPanX()
		);
	}
	}catch(err){}
}
function PortraitMirrorButton(){
	return new repeaterButton(
		@LRL-mirror,'',
		function(){
			var scale = PortraitList[PORTRAIT].getScale();
			var panX = PortraitList[PORTRAIT].getPanX();
			var panY = PortraitList[PORTRAIT].getPanY();
			PortraitList[PORTRAIT].setImage(
				PortraitList[PORTRAIT].getSource(),
				ImageUtils.mirror(PortraitList[PORTRAIT].getImage(),true,false)
			);
			PortraitList[PORTRAIT].setScale(scale);
			PortraitList[PORTRAIT].setPanX(panX);
			PortraitList[PORTRAIT].setPanY(panY);
			Portrait_panel.updatePanel();
		}
	);
}
function addTextPart(text,key,diy){
	if(diy.settings.get(key,'') != ''){
		if(text != ''){text = text+'\n<vs>\n';}
		var format = '';
		var formatEnd = '';
		var alignment = '';
		switch(key){
		case 'Story': case 'StoryBack': case 'StoryLeft': case 'StoryRight':
			format = diy.settings.get('LRL-Story-format','<size 90%><i>');
			formatEnd = diy.settings.get('LRL-Story-formatEnd','</i><size 111%>');
			alignment = diy.settings.get('LRL-Story-alignment','<left>');
			break;
		case 'Trait':
			format = diy.settings.get('LRL-Trait-format','<size 111%><b><i>');
			formatEnd = diy.settings.get('LRL-Trait-formatEnd','</i></b><size 90%>');
			alignment = diy.settings.get('LRL-Trait-alignment','<center>');
			break;
		case 'Rules': case 'RulesBack': case 'RulesLeft': case 'RulesRight':
			format = diy.settings.get('LRL-Rules-format','');
			formatEnd = diy.settings.get('LRL-Rules-formatEnd','');
			alignment = diy.settings.get('LRL-Rules-alignment','<left>');
			break;
		case 'Condition': case 'ConditionBack':
			format = diy.settings.get('LRL-Condition-format','<b>');
			formatEnd = diy.settings.get('LRL-Condition-formatEnd','</b>');
			alignment = diy.settings.get('LRL-Rules-alignment','<left>');
			break;
		case 'Shadow':
			format = diy.settings.get('LRL-Shadow-format','<center><image res://TheLordOfTheRingsLCG/image/ShadowSeparator.png '+$ShadowSeparatorSize+'in>\n<size 90%><i>');
			formatEnd = diy.settings.get('LRL-Shadow-formatEnd','</i><size 111%>');
			alignment = diy.settings.get('LRL-Shadow-alignment','<center>');
			break;
		case 'Flavour': case 'FlavourBack': case 'FlavourLeft': case 'FlavourRight':
			format = diy.settings.get('LRL-Flavour-format','<size 80%><i>');
			formatEnd = diy.settings.get('LRL-Flavour-formatEnd','</i><size 125%>');
			alignment = diy.settings.get('LRL-Flavour-alignment','<right>');
			break;
		}
		return text+format+alignment+$(key)+formatEnd;
	}else{
		return text;
	}
}
function setLocales(){
	locale = String(Language.getGameLocale());
	mainLocale = locale.split('_');
	mainLocale = String(mainLocale[0]);
}
function create( diy ){
	setLocales();
	diy.extensionName = 'TheLordOfTheRingsLCG.seext';
	diy.version = LIBRARYVERSION+CARDVERSION;
	$VersionHistory = diy.version;
	setPortraitIndex();
/* load component's default strings and settings */
	diy.settings.addSettingsFrom('TheLordOfTheRingsLCG/settings/default-'+Card+'.settings');
	diy.settings.addSettingsFrom('TheLordOfTheRingsLCG/text/default-'+Card+'.properties');
	try{
		mainLocale = locale.split('_');
		diy.settings.addSettingsFrom('TheLordOfTheRingsLCG/text/default-'+Card+'_'+mainLocale[0]+'.properties');
	}catch(err){}
	try{diy.settings.addSettingsFrom('TheLordOfTheRingsLCG/text/default-'+Card+'_'+locale+'.properties');
	}catch(err){}
	/* settings depending on plugin preferences */
	if( diy.settings.get('LRL-Copyright','')!=''){
		$Copyright = $LRL-Copyright;
	}else{
		$Copyright = '\u00a9FFG \u00a9Middle-earth';
	}
	if( diy.settings.get('LRL-CollectionInfo','')!=''){
		$CollectionInfo = $LRL-CollectionInfo;
	}else{
		$CollectionInfo = 'Strange Eons';
	}
/* set template */
	diy.bleedMargin = 0;
	diy.customPortraitHandling = true;
	createTemplates(diy);
/* create portraits */
	for(let index = 0;index<PortraitListKey.length;index++){
		debug('onCreate: PortraitListKey: '+PortraitListKey[index]);
		let key = PortraitListKey[index];
		if(diy.settings.get(Card+'-'+key+'-portrait-template','')==''){
			diy.settings.set(Card+'-'+key+'-portrait-template','TheLordOfTheRingsLCG/image/empty1x1.png');
		}
		switch(key){
		case 'Portrait':
			if(diy.settings.get(Card+'-Portrait-portrait-rotation','')==''){
				diy.settings.set(Card+'-Portrait-portrait-rotation','0');
			}
			PortraitList[PORTRAIT] = new DefaultPortrait(diy,Card+'-Portrait',true);
			PortraitList[PORTRAIT].backgroundFilled = true;
			PortraitList[PORTRAIT].installDefault();
			break;
		case 'PortraitBack':
			if(diy.settings.get(Card+'-PortraitBack-portrait-rotation','')==''){
				diy.settings.set(Card+'-PortraitBack-portrait-rotation','0');
			}
			PortraitList[PORTRAITBACK] = new DefaultPortrait(diy,Card+'-PortraitBack',true);
			PortraitList[PORTRAITBACK].backgroundFilled = true;
			PortraitList[PORTRAITBACK].installDefault();
			break;
		case 'PortraitV':
			if(diy.settings.get(Card+'-PortraitV-portrait-rotation','')==''){
				diy.settings.set(Card+'-PortraitV-portrait-rotation','0');
			}
			PortraitList[PORTRAITV] = new DefaultPortrait(PortraitList[PORTRAIT],Card+'-PortraitV');
			PortraitList[PORTRAITV].backgroundFilled = true;
			PortraitList[PORTRAITV].installDefault();
			break;
		case 'PortraitPromo':
			if(diy.settings.get(Card+'-PortraitPromo-portrait-rotation','')==''){
				diy.settings.set(Card+'-PortraitPromo-portrait-rotation','0');
			}
			PortraitList[PORTRAITPROMO] = new DefaultPortrait(PortraitList[PORTRAIT],Card+'-PortraitPromo');
			PortraitList[PORTRAITPROMO].backgroundFilled = true;
			PortraitList[PORTRAITPROMO].installDefault();
			break;
		case 'Collection':
			switch(String($Collection)){
			case '': case 'null':
				switch(String($LRL-Collection)){
				case '': case 'null':
					$Collection = diy.settings.get('Collection','StrangeEonsIcon');
					break;
				case 'CustomIcon':
	//				PortraitList[COLLECTION].setSource($LRL-CollectionUser);
					diy.settings.set(Card+'-Collection-portrait-template',$LRL-CollectionUser);
					$Collection = $LRL-Collection;
					break;
				default:
					$Collection = $LRL-Collection;
				}
				break;
			default: break;
			}
			PortraitList[COLLECTION] = new DefaultPortrait(diy,Card+'-'+key,false);
			PortraitList[COLLECTION].backgroundFilled = false;
			PortraitList[COLLECTION].installDefault();
			diy.settings.set('CollectionNumber',diy.settings.get('LRL-CollectionNumber','0'));
			break;
		case 'EncounterSet':
			switch(String($EncounterSet)){
			case '': case 'null':
				switch(String($LRL-EncounterSet)){
				case '':
				case 'null':
					$EncounterSet = diy.settings.get('EncounterSet','StrangeEonsIcon');
					break;
				default:
					$EncounterSet = $LRL-EncounterSet;
				}
				break;
			default: break;
			}
			PortraitList[ENCOUNTERSET] = new DefaultPortrait(diy,Card+'-'+key,false);
			PortraitList[ENCOUNTERSET].backgroundFilled = false;
			PortraitList[ENCOUNTERSET].installDefault();
			if( diy.settings.get('LRL-EncounterSet','')=='CustomIcon'){
				PortraitList[ENCOUNTERSET].setSource($LRL-EncounterSetUser);
				diy.settings.set(Card+'-EncounterSet-portrait-template',$LRL-EncounterSetUser);
			}
			diy.settings.set('EncounterSetNumber',diy.settings.get('LRL-EncounterSetNumber','0'));
			diy.settings.set('EncounterSetTotal',diy.settings.get('LRL-EncounterSetTotal','0'));
			break;
		case 'EncounterSet1': case 'EncounterSet2': case 'EncounterSet3':
		case 'EncounterSet4': case 'EncounterSet5':
			switch(String($('LRL-'+key))){
			case '': case 'null':
				diy.settings.set(key,diy.settings.get(key,'EmptyIcon'));
				break;
			default:
				$EncounterSet = $LRL-EncounterSet;
			}
		default:
			PortraitList[index] = new DefaultPortrait(diy,Card+'-'+key,false);
			PortraitList[index].backgroundFilled = false;
			PortraitList[index].installDefault();
			break;
		}
	}
	$PortraitListKey = String(PortraitListKey);
	$PortraitListCount = getPortraitCount();
}
function loadPortraits(diy,ois){
	var portrait = 1 ;
	debug('onRead: loadPortraits: ',$PortraitListCount,' ',$PortraitListKey);
	if(typeof(SE2CARD)=='undefined'){
		while(portrait != null){ try{
			portrait = ois.readObject();
			let key = String(portrait.getBaseKey()).replace(Card+'-','');
			if(PortraitListKey.indexOf(String(key)) != -1){
				PortraitList[PortraitListKey.indexOf(key)] = portrait;
				debug('onRead: loadPortraits: loaded: '+PortraitList[PortraitListKey.indexOf(key)].getBaseKey());
			}
		}catch(err){
			portrait = null;
		}}
	}else{
		if(diy.version>10){
			while(portrait != null){ try{
				portrait = ois.readObject();
				let key = String(portrait.getBaseKey()).replace(Card+'-','');
				if(PortraitListKey.indexOf(String(key)) != -1){
					PortraitList[PortraitListKey.indexOf(key)] = portrait;
				}
			}catch(err){
				portrait = null;
			}}
		}
		//diy.customPortraitHandling = true;
	}
	for(let index = 0;index<PortraitListKey.length;index++){
		if(typeof(PortraitList[index]) == 'undefined'){
			let key = PortraitListKey[index];
			debug('createPortrait: '+key+' ...');
			if(diy.settings.get(Card+'-'+key+'-portrait-template','')==''){
				diy.settings.set(Card+'-'+key+'-portrait-template','TheLordOfTheRingsLCG/image/empty1x1.png');
			}
			switch(key){
			case 'Portrait': case 'PortraitBack':
				if(diy.settings.get(Card+'-'+key+'-portrait-rotation','')==''){
					diy.settings.set(Card+'-'+key+'-portrait-rotation','0');
				}
				PortraitList[index] = new DefaultPortrait(diy,Card+'-'+key,true);
				PortraitList[index].backgroundFilled = true;
				PortraitList[index].installDefault();
				break;
			case 'PortraitV': case 'PortraitPromo':
				if(diy.settings.get(Card+'-'+key+'-portrait-rotation','')==''){
					diy.settings.set(Card+'-'+key+'-portrait-rotation','0');
				}
				PortraitList[index] = new DefaultPortrait(PortraitList[PORTRAIT],Card+'-'+key);
				PortraitList[index].backgroundFilled = true;
				PortraitList[index].installDefault();
				break;
			default:
				PortraitList[index] = new DefaultPortrait(diy,Card+'-'+key,false);
				PortraitList[index].backgroundFilled = false;
				PortraitList[index].installDefault();
				break;
			}
			debug('createPortrait: OK: '+key);
		}
	}
	$PortraitListKey = String(PortraitListKey);
	$PortraitListCount = getPortraitCount();
}
function onRead(diy,ois){
	var portrait;
	debug('onRead: card version: '+diy.version);
	setLocales();
	setPortraitIndex();
	if(typeof(SE2CARD) != 'undefined'){
		if(diy.version < 10){
			useLibrary('res://LotR/LRL-SE2lib.js');
			onReadV2(diy,ois);
			$VersionHistory = diy.version;
			createTemplates(diy);
			diy.version = 10;
		}else{
			if(diy.version != Number(LIBRARYVERSION+CARDVERSION)){
				if(diy.settings.get('VersionHistory','')==''){
					$VersionHistory = diy.version;
				}
				diy.version = Number(LIBRARYVERSION+CARDVERSION);
				$VersionHistory=$VersionHistory+','+diy.version;
			}
		}
	}else{
		if(diy.version < 10){
			useLibrary('res://LotR/LRL-SE3betalib.js');
			onReadBeta(diy,ois);
			$VersionHistory = diy.version;
			createTemplates(diy);
		}
		if(diy.version != Number(LIBRARYVERSION+CARDVERSION)){
			if(diy.settings.get('VersionHistory','')==''){
				$VersionHistory = diy.version;
			}
			diy.version = Number(LIBRARYVERSION+CARDVERSION);
			$VersionHistory=$VersionHistory+','+diy.version;
		}
	}
	if(diy.version < 20){
		if($Sailing){
			$OptionSpecial = 'Sailing';
			diy.settings.reset('Sailing');
		}
	}
	loadPortraits(diy,ois);
	switch(String($LRL-locale-toLoad)){
	case 'current':
		for( let index = 0; index < LRL.LocalizableList.length; index++ ){
			let key = LRL.LocalizableList[index];
			if(diy.settings.get(key+'_'+locale,null)!=null){
				diy.settings.set(key,$(key+'_'+locale));
			}
		}
		break;
	case 'specified':
		for( let index = 0; index < LRL.LocalizableList.length; index++ ){
			let key = LRL.LocalizableList[index];
			if(diy.settings.get(key+'_'+$LRL-locale,null)!=null){
				diy.settings.set(key,$(key+'_'+$LRL-locale));
			}
		}
		break;
	}
	/* save PortraitListKey to look for included portraits onRead */
	$PortraitListKey = String(PortraitListKey);
	$PortraitListCount = getPortraitCount();
	setPortraitIndex();

	if( diy.settings.get('LRL-CollectionInfo','')!=''){
		$CollectionInfo = $LRL-CollectionInfo;
	}
}
function saveLocalized(diy){
//	savePortrait(diy);
	try{
		for( let index = 0; index < LRL.LocalizableList.length; index++ ){
			let key = LRL.LocalizableList[index];
			if(diy.settings.get(key,null)!=null){
				try{diy.settings.set(key+'_'+locale,$(key));}catch(err){}
			}
		}
	}catch(err){}
}
function onWrite(diy,oos){
	for( let index = 0; index < PortraitListKey.length; index++ ){	
		oos.writeObject( PortraitList[ PortraitListKey.indexOf( PortraitListKey[ index ] ) ] );
	}
}
function onClear( diy ){
	for( let index = 0; index < LRL.LocalizableList.length; index++ ){
		diy.settings.reset( LRL.LocalizableList[index] );
	}
}
