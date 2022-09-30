/* COMPONENT CONFIGURATION */
const Card = 'RulesCard';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet',
	'EncounterSet1','EncounterSet2',
	'EncounterSet3','EncounterSet4','EncounterSet5' );
const CARDVERSION = 2;
//2: cambiado Name a strokeMedium
function createTemplates( diy ){
	diy.frontTemplateKey = 'RulesCard-front';
	diy.backTemplateKey = 'RulesCard-front';
	diy.faceStyle = FaceStyle.TWO_FACES;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('none','medium','small');
	for( let index = 0; index < combo.length; index++ ){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),null);
	}
	PortraitSize_list = new comboBox(combo,
		function(){
			if($PortraitSize != 'none'){
				PortraitList[PORTRAIT].setClipStencil(diy.settings.getImageResource(checkKey('stencil-'+$PortraitSize)));
			}
			Portrait_panel.updatePanel();
		}
	);
/* ICONS */
	Collection_list = new comboBox(LRL.CollectionCombo,null);
	Collection_panel = new portraitPanel(diy,COLLECTION,@LRL-Collection+': '+@LRL-custom);
	EncounterSet_list = new comboBox(LRL.EncounterSetCombo.concat(LRL.CollectionCombo),null);
	EncounterSet_portrait = new portraitPanel(diy,ENCOUNTERSET,@LRL-EncounterSet+' \/ '+@LRL-Collection+': '+@LRL-custom);
	EncounterSet1_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet1_portrait = new portraitPanel(diy,ENCOUNTERSET1,@LRL-EncounterSet+' 1: '+@LRL-custom);
	EncounterSet2_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet2_portrait = new portraitPanel(diy,ENCOUNTERSET2,@LRL-EncounterSet+' 2: '+@LRL-custom);
	EncounterSet3_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet3_portrait = new portraitPanel(diy,ENCOUNTERSET3,@LRL-EncounterSet+' 3: '+@LRL-custom);
	EncounterSet4_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet4_portrait = new portraitPanel(diy,ENCOUNTERSET4,@LRL-EncounterSet+' 4: '+@LRL-custom);
	EncounterSet5_list = new comboBox(LRL.EncounterSetCombo,null);
	EncounterSet5_portrait = new portraitPanel(diy,ENCOUNTERSET5,@LRL-EncounterSet+' 5: '+@LRL-custom);
/* TEXT */
	diy.nameField = new textField($Name,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	Copyright_text = new textField($Copyright,12,null);
	Artist_text = new textField($Artist,12,null);
	Story_text = new textArea($Story,6,50,true);
	Rules_text = new textArea($Rules,10,50,true);
	Flavour_text = new textArea($Flavour,6,50,true);
	StoryBack_text = new textArea($StoryBack,6,50,true);
	RulesBack_text = new textArea($RulesBack,10,50,true);
	FlavourBack_text = new textArea($FlavourBack,6,50,true);
	var RulesFrontTab = new Grid(); 
	RulesFrontTab.editorTabScrolling = true;
	RulesFrontTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',Story_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',Rules_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',Flavour_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesFrontTab.addToEditor(editor,@LRL-Rules+': '+@LRL-front);
	var RulesBackTab = new Grid(); 
	RulesBackTab.editorTabScrolling = true;
	RulesBackTab.place(
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesBack_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourBack_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesBackTab.addToEditor(editor,@LRL-Rules+': '+@LRL-back);
	var PortraitTab = new Grid();
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		@LRL-Portrait,'newline,split',PortraitSize_list,'growx',
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx,split',
		PortraitMirrorButton(),'',
		separator(),'newline,growx'
	);
	PortraitTab.addToEditor(editor,@LRL-Portrait);
	var EncounterSetTab = new Grid(); 
	EncounterSetTab.editorTabScrolling = true;
	EncounterSetTab.place(
		separator(),'newline,growx',
		@LRL-EncounterSet+' \/ '+@LRL-Collection,'newline,split',EncounterSet_list,'growx',
		EncounterSet_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet1,'newline,split',EncounterSet1_list,'growx',
		EncounterSet1_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet2,'newline,split',EncounterSet2_list,'growx',
		EncounterSet2_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet3,'newline,split',EncounterSet3_list,'growx',
		EncounterSet3_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet4,'newline,split',EncounterSet4_list,'growx',
		EncounterSet4_portrait,'newline,growx',
		separator(),'newline,growx',
		@LRL-EncounterSet5,'newline,split',EncounterSet5_list,'growx',
		EncounterSet5_portrait,'newline,growx',
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
		separator(),'newline,growx',
		@LRL-Copyright,'newline,split',Copyright_text,'growx',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('Story',Story_text,[0]);
	bindings.add('Rules',Rules_text,[0]);
	bindings.add('Flavour',Flavour_text,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	bindings.add('EncounterSet1',EncounterSet1_list,[0]);
	bindings.add('EncounterSet2',EncounterSet2_list,[0]);
	bindings.add('EncounterSet3',EncounterSet3_list,[0]);
	bindings.add('EncounterSet4',EncounterSet4_list,[0]);
	bindings.add('EncounterSet5',EncounterSet5_list,[0]);
	bindings.add('Artist',Artist_text,[1]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.add('StoryBack',StoryBack_text,[1]);
	bindings.add('RulesBack',RulesBack_text,[1]);
	bindings.add('FlavourBack',FlavourBack_text,[1]);
	bindings.add('PortraitSize',PortraitSize_list,[1]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	Body_box = markupBox(sheet);
	Body_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	Body_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
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
function createBackPainter( diy, sheet ){
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	BodyBack_box = markupBox(sheet);
	BodyBack_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyBack_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyBack_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		BodyBack_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		BodyBack_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* PORTRAIT */
/* ICONS */
	paintIcon(COLLECTION,g,sheet);
	var adapterList = new Array(
		'EncounterSet','EncounterSet1','EncounterSet2',
		'EncounterSet3','EncounterSet4','EncounterSet5' );
	var adapterSelector = 0;
	for(let index=0;index<adapterList.length;index++){
		if($(adapterList[index])!='EmptyIcon'){adapterSelector=index+1;}
	}
	var ESregion = settingToArray('RulesCard-EncounterSet-portrait-clip-region');
	var ES1region = settingToArray('RulesCard-EncounterSet1-portrait-clip-region');
	var ES2region = settingToArray('RulesCard-EncounterSet2-portrait-clip-region');
	var ES3region = settingToArray('RulesCard-EncounterSet3-portrait-clip-region');
	var ES4region = settingToArray('RulesCard-EncounterSet4-portrait-clip-region');
	var ES5region = settingToArray('RulesCard-EncounterSet5-portrait-clip-region');
	switch(adapterSelector){
	case 0: break;
	case 1: case 3: case 5:
		ESregion[0] = Number(ESregion[0])+Number($RulesCard-adapter-corrector);
		ES1region[0] = Number(ES1region[0])+Number($RulesCard-adapter-corrector);
		ES2region[0] = Number(ES2region[0])+Number($RulesCard-adapter-corrector);
		ES3region[0] = Number(ES3region[0])+Number($RulesCard-adapter-corrector);
		ES4region[0] = Number(ES4region[0])+Number($RulesCard-adapter-corrector);
		ES5region[0] = Number(ES5region[0])+Number($RulesCard-adapter-corrector);
	case 2: case 4: case 6: 
		ESregion = new Region([Number(ESregion[0]),Number(ESregion[1]),Number(ESregion[2]),Number(ESregion[3])]);
		ES1region = new Region([Number(ES1region[0]),Number(ES1region[1]),Number(ES1region[2]),Number(ES1region[3])]);
		ES2region = new Region([Number(ES2region[0]),Number(ES2region[1]),Number(ES2region[2]),Number(ES2region[3])]);
		ES3region = new Region([Number(ES3region[0]),Number(ES3region[1]),Number(ES3region[2]),Number(ES3region[3])]);
		ES4region = new Region([Number(ES4region[0]),Number(ES4region[1]),Number(ES4region[2]),Number(ES4region[3])]);
		ES5region = new Region([Number(ES5region[0]),Number(ES5region[1]),Number(ES5region[2]),Number(ES5region[3])]);
		sheet.paintImage(g,'RulesCard-adapter'+adapterSelector,'RulesCard-adapter-region');
		sheet.paintImage(g,getIcon(ENCOUNTERSET),ESregion);
		sheet.paintImage(g,getIcon(ENCOUNTERSET1),ES1region);
		sheet.paintImage(g,getIcon(ENCOUNTERSET2),ES2region);
		sheet.paintImage(g,getIcon(ENCOUNTERSET3),ES3region);
		sheet.paintImage(g,getIcon(ENCOUNTERSET4),ES4region);
		sheet.paintImage(g,getIcon(ENCOUNTERSET5),ES5region);
	}
//	paintIcon(COLLECTION,g,sheet);
	/* TEXT */
	Name_box.markupText = $Name;
	drawTextLineOutlined('Name',null,strokeMedium,diy,g,sheet);
	BodyText = '';
	BodyText =  addTextPart(BodyText,'Story',diy);
	BodyText =  addTextPart(BodyText,'Rules',diy);
	BodyText =  addTextPart(BodyText,'Flavour',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyText = BodyText+'<justified>';}
	Body_box.markupText = BodyText;
	updateNameTags(Body_box,diy);
	if(adapterSelector > 0){
		Body_box.draw(g,diy.settings.getRegion('RulesCard-Body-region'));
	}else{
		region = settingToArray('RulesCard-Body-region');
		if($Name == ''){
			region = new Region([Number(region[0]),Number(region[1])-86,Number(region[2]),Number(region[3])+86]);
		}else{
			region = new Region([Number(region[0]),Number(region[1])-38,Number(region[2]),Number(region[3])+38]);
		}
		Body_box.draw(g,region);
	}
	drawCopyright(g,diy);
	drawCollectionInfo(g,diy);
/*FINISH*/
	saveLocalized(diy);
}
function paintBack( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
/* PORTRAIT */
	if($PortraitSize != 'none'){
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		sheet.paintImage(g,'RulesCard-stencil-'+$PortraitSize,'RulesCard-Portrait-portrait-clip');
	}
/* TEXT */
	BodyBackText = '';
	BodyBackText =  addTextPart(BodyBackText,'StoryBack',diy);
	BodyBackText =  addTextPart(BodyBackText,'RulesBack',diy);
	BodyBackText =  addTextPart(BodyBackText,'FlavourBack',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyBackText = BodyBackText+'<justified>';}
	BodyBack_box.markupText = BodyBackText;
	updateNameTags(BodyBack_box,diy);
	var region;
	switch(String($PortraitSize)){
		case 'small':
			region = settingToArray('RulesCard-BodyBack-region');
			region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])-160]);
			BodyBack_box.draw(g,region);
			drawArtist(g,diy);
			break;
		case 'medium':
			region = settingToArray('RulesCard-BodyBack-region');
			region = new Region([Number(region[0]),Number(region[1]),Number(region[2]),Number(region[3])-230]);
			BodyBack_box.draw(g,region);
			drawArtist(g,diy);
			break;
		default:
			BodyBack_box.draw(g,diy.settings.getRegion('RulesCard-BodyBack-region'));
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
