/* COMPONENT CONFIGURATION */
const Card = 'Presentation';
const PortraitListKey = new Array('Portrait','Collection');
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'Presentation-front';
	diy.backTemplateKey = 'Presentation-back';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('Standard','Nightmare');
	for(let index=0;index<combo.length;index++){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),eval('LRL.'+item+'Icon'));
	}
	Template_list = new comboBox(combo,null);
	GameName_text = new textArea($GameName,2,12,true);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
/* STATS */
/* TEXT */
	//diy.nameField = new textField($Name,12,null);
	diy.nameField = null;
	Name_text = new textArea($Name,2,20,true);
	Type_text = new textField($Type,12,null);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	var RulesTab = new Grid(); 
	RulesTab.editorTabScrolling = true;
	RulesTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',
		Name_text,'split',
		//diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',
		Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',
		new tipButton(@LRL-Rules-tip),'',
		Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',
		Flavour_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesTab.addToEditor(editor,@LRL-Rules);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Template,'newline,split',
		Template_list,'growx',
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
	var CollectionTab = new Grid(); 
	CollectionTab.editorTabScrolling = true;
	CollectionTab.place(
		separator(),'newline,growx',
		@LRL-Collection,'newline,split',
		Collection_list,'growx',
		Collection_panel,'newline,growx',
		@LRL-CollectionInfo,'newline,split',
		CollectionInfo_text,'growx',
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',
		Copyright_text,'growx',
		separator(),'newline,growx',
		@LRL-Type,'newline,split',
		new tipButton(@LRL-Type-tip),'split',
		Type_text,'growx,split',
		separator(),'newline,growx',
		@LRL-GameName,'newline,split',
		new tipButton(@LRL-GameName-tip),'split',
		GameName_text,'growx',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',Name_text,[0]);
	bindings.add('Collection',Collection_list,[1]);
	bindings.add('CollectionInfo',CollectionInfo_text,[1]);
	bindings.add('Type',Type_text,[1]);
	bindings.add('Copyright',Copyright_text,[1]);
	bindings.add('GameName',GameName_text,[0]);
	bindings.add('Template',Template_list,[0,1]);
	bindings.add('Artist',Artist_text,[1]);
	bindings.add('Story',Story_text,[1]);
	bindings.add('Rules',Rules_text,[1]);
	bindings.add('Flavour',Flavour_text,[1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
	GameName_box = markupBox(sheet);
	GameName_box.defaultStyle = diy.settings.getTextStyle(checkKey('GameName-style'),null);
	GameName_box.alignment = diy.settings.getTextAlignment(checkKey('GameName-alignment'));
/* ICONS */
/* STATS */
/* TEXT */
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
}
function createBackPainter( diy, sheet ){
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
	PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
/* TEMPLATE */
	if($Template == 'Nightmare'){
		sheet.paintImage(g,'Presentation-Nightmare-front-template',0,0);
	}else{
		sheet.paintTemplateImage(g);
	}
/* TEXTS */
	if($GameName != ''){
		GameName_box.markupText = '<loose>'+$GameName;
		drawTextOutlined('GameName',null,strokeMedium,diy,g,sheet);
	}else{
		paintLogo(g,sheet,diy);
	}
	Name_box.markupText = '<loose>'+$Name;
	drawTextOutlined('Name',null,strokeMedium,diy,g,sheet);
/*FINISH*/
	saveLocalized(diy);
	try{diy.setName(removeTags($Name));}catch(err){}
}
function paintBack( g, diy, sheet ){
/* PORTRAIT */
/* TEMPLATE */
	if($Template == 'Nightmare'){
		sheet.paintImage(g,'Presentation-Nightmare-back-template',0,0);
	}else{
		sheet.paintTemplateImage(g);
	}
/* ICONS */
	if(diy.settings.getBoolean('LRL-NoBottom',false) === false) paintIcon(COLLECTION,g,sheet);
/* STATS */
/* TEXT */
	drawBody(new Array('Story','Rules','Flavour'),g,diy);
	drawArtist(g,diy);
	drawType(g,diy);
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
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
