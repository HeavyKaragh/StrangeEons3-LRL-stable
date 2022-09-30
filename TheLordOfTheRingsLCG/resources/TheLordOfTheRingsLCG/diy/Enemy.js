/* COMPONENT CONFIGURATION */
const Card = 'Enemy';
const PortraitListKey = new Array('Portrait','Collection','EncounterSet');
const CARDVERSION = 4;
//2: a\u00f1adido sheet a drawOption*
//3: a\u00f1adido ShipEnemy (prog)
//4: a\u00f1adido paintOptionSpecial
function createTemplates( diy ){
	diy.frontTemplateKey = 'Enemy-front';
	diy.backTemplateKey = 'Encounter-vertical';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
}

function createInterface( diy, editor, sheet ){
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
	var combo = new Array(
		'Standard','Ship','Nightmare','Gold','CustomDifficulty'
	);
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	var hsb;
	Template_list = new comboBox(combo,null);
	Template_hsb = new HSBPanel();
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	OptionSpecial_list = new comboBox(LRL.OptionSpecialCombo,null);
/* STATS */
	Engagement_list = new comboBox(LRL.combo99,null);
	Threat_list = new comboBox(LRL.combo99,null);
	Attack_list = new comboBox(LRL.combo99,null);
	Defense_list = new comboBox(LRL.combo99,null);
	HitPoints_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Unique_button = new toggleButton('',LRL.UniqueIcon,diy.settings.getBoolean('Unique',false),null);
	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Shadow_text = new textArea($Shadow,6,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionLeft_text = new textField($OptionLeft,12,null);
	OptionRight_text = new textField($OptionRight,12,null);
	EncounterSetNumber_list = new spinner(0,99,1,0,null);
	EncounterSetTotal_list = new spinner(0,99,1,0,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		Unique_button,'split',
		diy.nameField,'growx',
		separator(),'newline,growx',
		LRL.EngagementIcon,'newline,split',
		Engagement_list,'growx',
		LRL.HitPointsIcon,'split',
		HitPoints_list,'growx',
		LRL.ThreatIcon,'newline,split',
		Threat_list,'growx',
		LRL.AttackIcon,'split',
		Attack_list,'growx',
		LRL.DefenseIcon,'split',
		Defense_list,'growx',
		separator(),'newline,growx',
		@LRL-Trait,'newline,split',
		new tipButton(@LRL-Trait-tip),'split',
		Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'split',
		new tipButton(@LRL-Keyword-tip),'',
		Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Shadow,'newline,center',
		Shadow_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',
		Flavour_text,'newline,growx',
		separator(),'newline,growx',
		OptionLeft_text,'newline,split,growx',
		@LRL-options,'split',
		new tipButton(@LRL-option-tip),'split',
		OptionRight_text,'split,growx',
		@LRL-OptionSpecial,'newline,split',OptionSpecial_list,'growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',
		Artist_text,'growx',
		PortraitMirrorButton(),'split',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid();
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',
		EncounterSet_list,'growx',
		new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom),'newline,growx',
		@LRL-EncounterSetNumber,'newline,split',
		EncounterSetNumber_list,'split',
		@LRL-of,'split',
		EncounterSetTotal_list,'split',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid();
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom),'newline',
		@LRL-CollectionInfo,'newline,split',CollectionInfo_text,'growx,split',
		@LRL-CollectionNumber,'split',CollectionNumber_text,'',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',new tipButton(@LRL-Type-tip),'split',Type_text,'growx,split',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Unique',Unique_button,[0]);
	bindings.add('Trait',Trait_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('Shadow',Shadow_text,[0]);
	bindings.add('OptionLeft',OptionLeft_text,[0]);
	bindings.add('OptionRight',OptionRight_text,[0]);
	bindings.add('OptionSpecial',OptionSpecial_list,[0]);
	bindings.add('Engagement',Engagement_list,[0]);
	bindings.add('Threat',Threat_list,[0]);
	bindings.add('Attack',Attack_list,[0]);
	bindings.add('Defense',Defense_list,[0]);
	bindings.add('HitPoints',HitPoints_list,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	bindings.add('EncounterSetNumber',EncounterSetNumber_list,[0]);
	bindings.add('EncounterSetTotal',EncounterSetTotal_list,[0]);
	bindings.add('Template',Template_list,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	bindings.bind();
}

function createFrontPainter( diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
	DifficultyDeco_tinter = new TintCache(new TintFilter(),
		diy.settings.getImageResource('tintable-difficultyDeco')
	);
/* ICONS */
/* STATS */
	Engagement_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('Engagement','-tint'));
	Engagement_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	HitPoints_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('HitPoints','-tint'));
	HitPoints_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setStyleForTag($LRLSymbols-tag,diy.settings.getTextStyle('LRLSymbols',null));
	OptionLeft_box = markupBox(sheet);
	OptionLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionLeft-style'),null);
	OptionLeft_box.alignment = diy.settings.getTextAlignment(checkKey('OptionLeft-alignment'));
	OptionRight_box = markupBox(sheet);
	OptionRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionRight-style'),null);
	OptionRight_box.alignment = diy.settings.getTextAlignment(checkKey('OptionRight-alignment'));
	EncounterSetNumber_box = markupBox(sheet);
	EncounterSetNumber_box.defaultStyle = diy.settings.getTextStyle(checkKey('EncounterSetNumber-style'),null);
	EncounterSetNumber_box.alignment = diy.settings.getTextAlignment(checkKey('EncounterSetNumber-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	CollectionNumber_box = markupBox(sheet);
	CollectionNumber_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionNumber-style'),null);
	CollectionNumber_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionNumber-alignment'));
	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body-alignment'));
	Body_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		Body_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		Body_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* PORTRAIT */
	if(typeof(SE2CARD) != 'undefined'){
		sheet.paintPortrait(g);
	}else{
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
	}
/* TEMPLATE */
	var hsb;
	switch(String($Template)){
	case 'Gold':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint($Template);
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'CustomDifficulty':
		sheet.paintTemplateImage(g);
		hsb = diy.settings.getTint('Template');
		DifficultyDeco_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
		sheet.paintImage(g,DifficultyDeco_tinter.getTintedImage(),checkKey('difficultyDeco-region'));
		break;
	case 'Nightmare':
		sheet.paintImage(g,Card+'-Nightmare-front-template',0,0);
		break;
	case 'Ship':
		sheet.paintImage(g,Card+'-Ship-front-template',0,0);
		break;
	default:
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
	paintOptionSpecial(g,diy,sheet);
/* STATS */
	Engagement_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Engagement+'.png'));
	sheet.paintImage(g,Engagement_tinter.getTintedImage(),checkKey('Engagement-region'));
	HitPoints_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$HitPoints+'.png'));
	sheet.paintImage(g,HitPoints_tinter.getTintedImage(),checkKey('HitPoints-region'));
	sheet.paintImage(g,ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Threat+'.png'),checkKey('Threat-region'));
	sheet.paintImage(g,ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Attack+'.png'),checkKey('Attack-region'));
	sheet.paintImage(g,ImageUtils.get('TheLordOfTheRingsLCG/number/'+$Defense+'.png'),checkKey('Defense-region'));
/* TEXTS */
	drawName(g,diy);
	drawBody(new Array('Trait','Rules','Shadow','Flavour'),g,diy);
	drawSetNumber(g,diy);
	drawOptionLeft(g,diy,sheet);
	drawOptionRight(g,diy,sheet);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-E.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-EHD.settings');
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/LRL.js');
	Eons.namedObjects.LRL = new gameObject();
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	GameLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-game');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-interface');
	InterfaceLanguage.addStrings('TheLordOfTheRingsLCG/text/LRL-icons');
	testDIYScript();
}else{
	useLibrary('res://TheLordOfTheRingsLCG/diy/LRL-library.js');
}
