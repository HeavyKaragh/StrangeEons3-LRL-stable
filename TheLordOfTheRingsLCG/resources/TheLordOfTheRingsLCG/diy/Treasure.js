/* COMPONENT CONFIGURATION */
const Card = 'Treasure';
const PortraitListKey = new Array('Portrait','Collection','EncounterSet');
const CARDVERSION = 2;
//2: a\u00f1adido sheet a drawOption*
function createTemplates( diy ){
	diy.frontTemplateKey = 'Treasure-front';
	diy.backTemplateKey = 'Player-vertical';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet_panel = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+': '+@LRL-custom);
/* STATS */
	ResourceCost_list = new comboBox(LRL.combo99,null);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	Unique_button = new toggleButton('',LRL.UniqueIcon,diy.settings.getBoolean('Unique',false),null);
	Trait_text = new textField($Trait,12,null);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	OptionLeft_text = new textField($OptionLeft,12,null);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	CollectionNumber_text = new spinner(0,999,1,0,null);
	var RulesTab = new Grid();
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',Unique_button,'split',diy.nameField,'growx',
		separator(),'newline,growx',
		LRL.ResourceCostIcon,'newline,split',ResourceCost_list,'growx',
		separator(),'newline,growx',
		@LRL-Trait,'newline,split',new tipButton(@LRL-Trait-tip),'split',Trait_text,'growx,split',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'split',new tipButton(@LRL-Keyword-tip),'split',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-OptionLeft,'newline,split',new tipButton(@LRL-option-tip),'split',OptionLeft_text,'split,growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
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
	var EncounterSetTab = new Grid();
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet,'newline,split',EncounterSet_list,'growx',
		EncounterSet_panel,'newline,growx',
		separator(),'newline,growx'
	);
	EncounterSetTab.addToEditor(editor,@LRL-EncounterSet);
	var CollectionTab = new Grid();
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',Collection_list,'growx',
		Collection_panel,'newline',
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
	bindings.add('OptionLeft',OptionLeft_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	bindings.add('ResourceCost',ResourceCost_list,[0]);
	bindings.add('Type',Type_text,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('CollectionNumber',CollectionNumber_text,[0]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* STATS */
	ResourceCost_tinter = new TintCache(new TintFilter(),null);
	var hsb = diy.settings.getTint(checkKey('ResourceCost','-tint'));
	ResourceCost_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Name_box.setStyleForTag($LRLSymbols-tag,diy.settings.getTextStyle('LRLSymbols',null));
	OptionLeft_box = markupBox(sheet);
	OptionLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('OptionLeft-style'),null);
	OptionLeft_box.alignment = diy.settings.getTextAlignment(checkKey('OptionLeft-alignment'));
	Type_box = markupBox(sheet);
	Type_box.defaultStyle = diy.settings.getTextStyle(checkKey('Type-style'),null);
	Type_box.alignment = diy.settings.getTextAlignment(checkKey('Type-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
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
	const BODY_SHAPE = diy.settings.getCupShape('Treasure-Body-shape');
	Body_box.setPageShape(BODY_SHAPE);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		var item = LRL.TagList[index];
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
	sheet.paintTemplateImage(g);
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
	paintIcon(ENCOUNTERSET,g,sheet);
/* STATS */
	ResourceCost_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$ResourceCost+'.png'));
	sheet.paintImage(g,ResourceCost_tinter.getTintedImage(),checkKey('ResourceCost-region'));
/* TEXTS */
	drawName(g,diy);
	
	drawBody(new Array('Trait','Rules','Flavour'),g,diy);
	drawOptionLeft(g,diy,sheet);
	drawType(g,diy);
	drawArtist(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
	drawCollectionNumber(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
if(sourcefile == 'Quickscript'){
	useLibrary('project:TheLordOfTheRingsLCG/resources/TheLordOfTheRingsLCG/diy/LRL-library.js');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/settings/'+Card+'.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-B.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-I.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-P.settings');
	Settings.shared.addSettingsFrom('TheLordOfTheRingsLCG/LRL-PHD.settings');
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
