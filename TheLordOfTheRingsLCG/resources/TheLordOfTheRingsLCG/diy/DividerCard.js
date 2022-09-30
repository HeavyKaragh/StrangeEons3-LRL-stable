/* COMPONENT CONFIGURATION */
const Card = 'DividerCard';
const PortraitListKey = new Array('Portrait','Collection','EncounterSet');
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'DividerCard-front';
	diy.backTemplateKey = 'DividerCard-front';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('CustomCycle');
	combo = combo.concat(LRL.CollectionList);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(
			item, @('LRL-'+item),
			ImageUtils.createIcon(ImageUtils.get('TheLordOfTheRingsLCG/icon/'+item+'.png'),IconSize,IconSize)
		);
	}
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
	TemplateOut_hsb = new HSBPanel();
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Artist_text = new textField($Artist,12,null);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx,split',
		separator(),'newline,growx',
		Template_hsb,'newline,growx',
		separator(),'newline,growx',
		TemplateOut_hsb,'newline,growx',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid(); 
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0,1]);
	bindings.add('Artist',Artist_text,[0,1]);
	bindings.add('Collection',Collection_list,[0,1]);
	bindings.add('EncounterSet',EncounterSet_list,[0,1]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Template-tint',Template_hsb,[0,1]);
	bindings.add('TemplateOut-tint',TemplateOut_hsb,[0,1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
	Template_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('DividerCard-tintable'));
	TemplateOut_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('DividerCard-out-tintable'));
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setLineTightness( 20.0 );
	Name_box.setTightnessLimit( 10.0 );
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
}
function createBackPainter( diy, sheet ){
	TemplateBack_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('DividerCard-tintable'));
	TemplateBackOut_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('DividerCard-out-tintable'));
	NameBack_box = markupBox(sheet);
	NameBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	NameBack_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	NameBack_box.setLineTightness( 20.0 );
	NameBack_box.setTightnessLimit( 10.0 );
	ArtistBack_box = markupBox(sheet);
	ArtistBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	ArtistBack_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	var hsb;
	var hsbOut;
	switch(String($Template)){
	case 'CustomCycle':
		hsb = diy.settings.getTint('Template-tint');
		Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		hsbOut = diy.settings.getTint('TemplateOut-tint');
		TemplateOut_tinter.setFactors(hsbOut[0],hsbOut[1],hsbOut[2]);
		break;
	default:
		hsb = diy.settings.getTint($Template+'-tint');
		Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		hsbOut = diy.settings.getTint($Template+'-out-tint');
		TemplateOut_tinter.setFactors(hsbOut[0],hsbOut[1],hsbOut[2]);
	}
	sheet.paintImage(g,
		Template_tinter.getTintedImage(),
		'DividerCard-tintable-region'
	);
	sheet.paintImage(g,
		TemplateOut_tinter.getTintedImage(),
		'DividerCard-out-tintable-region'
	);
	sheet.paintTemplateImage(g);
/* ICONS */
	switch(String($Collection)){
	case 'EmptyIcon': break;
	case 'CustomIcon':
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-Collection-ed'
		);
		sheet.paintImage(g,
			PortraitList[COLLECTION].getImage(),
			checkKey('Collection-portrait-clip-region')
		);
		break;
	default:
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-Collection-ed'
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/icon/'+String($Collection)+'.png'),
			checkKey('Collection-portrait-clip-region')
		);
	}
	switch(String($EncounterSet)){
	case 'EmptyIcon': break;
	case 'CustomIcon':
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-EncounterSet-ed'
		);
		sheet.paintImage(g,
			PortraitList[ENCOUNTERSET].getImage(),
			checkKey('EncounterSet-portrait-clip-region')
		);
		break;
	default:
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-EncounterSet-ed'
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/icon/'+String($EncounterSet)+'.png'),
			checkKey('EncounterSet-portrait-clip-region')
		);
	}
/* TEXT */
	Name_box.markupText = '<loose>'+$Name;
	drawTextOutlined('Name',null,strokeMedium,diy,g,sheet);
	if($Artist == ''){ 
		Artist_box.markupText = #LRL-IllustratorUnknown;
	}else{ 
		Artist_box.markupText = #LRL-IllustratorShort+' '+$Artist; 
		drawTextOutlined('Artist',null,strokeMedium,diy,g,sheet);
	}
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* PORTRAIT */
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	var hsb;
	var hsbOut;
	switch(String($Template)){
	case 'CustomCycle':
		hsb = diy.settings.getTint('Template-tint');
		TemplateBack_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		hsbOut = diy.settings.getTint('TemplateOut-tint');
		TemplateBackOut_tinter.setFactors(hsbOut[0],hsbOut[1],hsbOut[2]);
		break;
	default:
		hsb = diy.settings.getTint($Template+'-tint');
		TemplateBack_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		hsbOut = diy.settings.getTint($Template+'-out-tint');
		TemplateBackOut_tinter.setFactors(hsbOut[0],hsbOut[1],hsbOut[2]);
	}
	sheet.paintImage(g,
		TemplateBack_tinter.getTintedImage(),
		'DividerCard-tintable-region'
	);
	sheet.paintImage(g,
		TemplateBackOut_tinter.getTintedImage(),
		'DividerCard-out-tintable-region'
	);
	sheet.paintTemplateImage(g);
/* ICONS */
	switch(String($Collection)){
	case 'EmptyIcon': break;
	case 'CustomIcon':
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-CollectionBack-ed'
		);
		sheet.paintImage(g,
			PortraitList[COLLECTION].getImage(),
			checkKey('CollectionBack-portrait-clip-region')
		);
		break;
	default:
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-CollectionBack-ed'
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/icon/'+String($Collection)+'.png'),
			checkKey('CollectionBack-portrait-clip-region')
		);
	}
	switch(String($EncounterSet)){
	case 'EmptyIcon': break;
	case 'CustomIcon':
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-EncounterSetBack-ed'
		);
		sheet.paintImage(g,
			PortraitList[ENCOUNTERSET].getImage(),
			'DividerCard-EncounterSetBack-portrait-clip-region'
		);
		break;
	default:
		sheet.paintImage(g,
			'EncounterDeco',
			'DividerCard-EncounterSetBack-ed'
		);
		sheet.paintImage(g,
			ImageUtils.get('TheLordOfTheRingsLCG/icon/'+String($EncounterSet)+'.png'),
			'DividerCard-EncounterSetBack-portrait-clip-region'
		);
	}
/* TEXT */
	NameBack_box.markupText = '<loose>'+$Name;
	drawTextOutlined('NameBack',null,strokeMedium,diy,g,sheet);
	if($Artist == ''){ 
		ArtistBack_box.markupText = #LRL-IllustratorUnknown;
	}else{ 
		ArtistBack_box.markupText = #LRL-IllustratorShort+' '+$Artist; 
		drawTextOutlined('Artist',null,strokeMedium,diy,g,sheet);
	}
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-A.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-AHD.settings');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	LRL = Eons.namedObjects.LRL;
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}
