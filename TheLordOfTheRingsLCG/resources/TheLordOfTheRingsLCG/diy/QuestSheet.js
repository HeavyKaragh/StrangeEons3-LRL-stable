/* COMPONENT CONFIGURATION */
const Card = 'QuestSheet';
const PortraitListKey = new Array(
	'Portrait','Collection','EncounterSet',
	'EncounterSet1','EncounterSet2',
	'EncounterSet3','EncounterSet4','EncounterSet5' );
const CARDVERSION = 1;
function createTemplates( diy ){
	diy.frontTemplateKey = 'QuestSheet-front';
	diy.faceStyle = FaceStyle.ONE_FACE;
}
function createInterface( diy, editor, sheet ){
/* PORTRAIT */
	Portrait_panel = new portraitPanel(diy,PORTRAIT,@LRL-Portrait);
/* TEMPLATE */
	var combo = new Array('plain','logo','title','sets');
	for( let index = 0; index < combo.length; index++ ){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),null);
	}
	Layout_list = new comboBox(combo,null);
	combo = new Array('none','medium','small');
	for( let index = 0; index < combo.length; index++ ){
		let item = combo[index];
		combo[index] = ListItem(item,@('LRL-'+item),null);
	}
	Template_hsb = new HSBPanel();
	PortraitSize_list = new comboBox(combo,
		function(){
			switch(String($PortraitSize)){
			case 'small':
				PortraitList[PORTRAIT].setClipStencil(diy.settings.getImageResource(checkKey('stencil-small')));
				break;
			case 'medium': 
				PortraitList[PORTRAIT].setClipStencil(diy.settings.getImageResource(checkKey('stencil-medium')));
			}
			Portrait_panel.updatePanel();
		}
	);
	Page_spinner = new spinner(0,50,0,1,null);
/* ICONS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
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
	GameName_text = new textArea($GameName,2,12,true);
	StoryLeft_text = new textArea($StoryLeft,6,50,true);
	RulesLeft_text = new textArea($RulesLeft,10,50,true);
	FlavourLeft_text = new textArea($FlavourLeft,6,50,true);
	StoryRight_text = new textArea($StoryRight,6,50,true);
	RulesRight_text = new textArea($RulesRight,10,50,true);
	FlavourRight_text = new textArea($FlavourRight,6,50,true);
	Artist_text = new textField($Artist,12,null);
	Copyright_text = new textField($Copyright,12,null);
	CollectionInfo_text = new textField($CollectionInfo,12,null);
	var RulesLeftTab = new Grid(); 
	RulesLeftTab.editorTabScrolling = true;
	RulesLeftTab.place(
		separator(),'newline,growx',
		@LRL-Name,'newline,split',diy.nameField,'growx',
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryLeft_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesLeft_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourLeft_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesLeftTab.addToEditor(editor,@LRL-Rules+': '+@LRL-left);
	var RulesRightTab = new Grid(); 
	RulesRightTab.editorTabScrolling = true;
	RulesRightTab.place(
		separator(),'newline,growx',
		@LRL-Story,'newline,center',StoryRight_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Rules,'newline,center,split',new tipButton(@LRL-Rules-tip),'',RulesRight_text,'newline,growx',
		separator(),'newline,growx',
		@LRL-Flavour,'newline,center',FlavourRight_text,'newline,growx',
		separator(),'newline,growx'
	);
	RulesRightTab.addToEditor(editor,@LRL-Rules+': '+@LRL-right);
	var TemplateTab = new Grid();
	TemplateTab.editorTabScrolling = true;
	TemplateTab.place(
		separator(),'newline,growx',
		@LRL-Layout,'newline,split',Layout_list,'growx,split',
		@LRL-Portrait,'split',PortraitSize_list,'growx,split',
		@LRL-Page,'split',Page_spinner,'growx',
		separator(),'newline,growx',
		Template_hsb,'newline,growx',
		separator(),'newline,growx'
	);
	TemplateTab.addToEditor(editor,@LRL-Template);
	var PortraitTab = new Grid(); 
	PortraitTab.editorTabScrolling = true;
	PortraitTab.place(
		separator(),'newline,growx',
		Portrait_panel,'newline,growx',
		@LRL-Artist,'newline,split',Artist_text,'growx,split',
		PortraitMirrorButton(),'split',
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
		separator(),'newline,growx',
		@LRL-GameName,'newline,split',new tipButton(@LRL-GameName-tip),'split',GameName_text,'growx',
		separator(),'newline,growx'
	);
	CollectionTab.addToEditor(editor,@LRL-Collection);
	var bindings = new Bindings(editor,diy);
	bindings.add('Name',diy.nameField,[0]);
	bindings.add('GameName',GameName_text,[0]);
	bindings.add('StoryLeft',StoryLeft_text,[0]);
	bindings.add('RulesLeft',RulesLeft_text,[0]);
	bindings.add('FlavourLeft',FlavourLeft_text,[0]);
	bindings.add('StoryRight',StoryRight_text,[0]);
	bindings.add('RulesRight',RulesRight_text,[0]);
	bindings.add('FlavourRight',FlavourRight_text,[0]);
	bindings.add('PortraitSize',PortraitSize_list,[0]);
	bindings.add('Layout',Layout_list,[0]);
	bindings.add('Page',Page_spinner,[0]);
	bindings.add('Template-tint',Template_hsb,[0]);
	bindings.add('EncounterSet',EncounterSet_list,[0]);
	bindings.add('EncounterSet1',EncounterSet1_list,[0]);
	bindings.add('EncounterSet2',EncounterSet2_list,[0]);
	bindings.add('EncounterSet3',EncounterSet3_list,[0]);
	bindings.add('EncounterSet4',EncounterSet4_list,[0]);
	bindings.add('EncounterSet5',EncounterSet5_list,[0]);
	bindings.add('Artist',Artist_text,[0]);
	bindings.add('Copyright',Copyright_text,[0]);
	bindings.add('CollectionInfo',CollectionInfo_text,[0]);
	bindings.add('Collection',Collection_list,[0]);
	bindings.bind();
}
function createFrontPainter( diy, sheet ){
/* ICONS */
	NumberIcon_tinter = new TintCache(new TintFilter(),null);
	hsb = diy.settings.getTint(checkKey('NumberIcon','-tint'));
	NumberIcon_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	Template_tinter = new TintCache(new TintFilter(),diy.settings.getImageResource('tintable-campaignColour'));
	Page_tinter = new TintCache(new TintFilter(),null);
	let hsb = diy.settings.getTint('Page');
	Page_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	GameName_box = markupBox(sheet);
	GameName_box.defaultStyle = diy.settings.getTextStyle(checkKey('GameName-style'),null);
	GameName_box.alignment = diy.settings.getTextAlignment(checkKey('GameName-alignment'));
	GameName_box.setLineTightness(2.0);
	Name_box = markupBox(sheet);
	Name_box.defaultStyle = diy.settings.getTextStyle(checkKey('Name-style'),null);
	Name_box.alignment = diy.settings.getTextAlignment(checkKey('Name-alignment'));
	Copyright_box = markupBox(sheet);
	Copyright_box.defaultStyle = diy.settings.getTextStyle(checkKey('Copyright-style'),null);
	Copyright_box.alignment = diy.settings.getTextAlignment(checkKey('Copyright-alignment'));
	CollectionInfo_box = markupBox(sheet);
	CollectionInfo_box.defaultStyle = diy.settings.getTextStyle(checkKey('CollectionInfo-style'),null);
	CollectionInfo_box.alignment = diy.settings.getTextAlignment(checkKey('CollectionInfo-alignment'));
	Artist_box = markupBox(sheet);
	Artist_box.defaultStyle = diy.settings.getTextStyle(checkKey('Artist-style'),null);
	Artist_box.alignment = diy.settings.getTextAlignment(checkKey('Artist-alignment'));
	BodyLeft_box = markupBox(sheet);
	BodyLeft_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyLeft_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyLeft_box.setLineTightness($Body-tightness);
	BodyRight_box = markupBox(sheet);
	BodyRight_box.defaultStyle = diy.settings.getTextStyle(checkKey('Body','-style'),null);
	BodyRight_box.alignment = diy.settings.getTextAlignment(checkKey('Body','-alignment'));
	BodyRight_box.setLineTightness($Body-tightness);
	for( let index = 0; index < LRL.TagList.length; index++ ){
		let item = LRL.TagList[index];
		BodyLeft_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
		BodyRight_box.setReplacementForTag($(item+'-tag'),$(item+'-tag-replacement'));
	}
	for( let index = 0; index < LRL.StyleList.length; index++ ){
		let item = LRL.StyleList[index];
		BodyLeft_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
		BodyRight_box.setStyleForTag($(item+'-tag'),diy.settings.getTextStyle(item+'-style',null));
	}
}
function paintFront( g, diy, sheet ){
/* TEMPLATE */
	sheet.paintTemplateImage(g);
	var hsb = diy.settings.getTint('Template-tint');
	Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]);
	sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourTL-region'));
	sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourTR-region'));
	sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBL-region'));
	sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBR-region'));
/* PORTRAIT */
	if($PortraitSize !=  'none'){
		PortraitList[PORTRAIT].paint(g,sheet.getRenderTarget());
		sheet.paintImage(g,'QuestSheet-stencil-'+$PortraitSize,'QuestSheet-Portrait-portrait-clip');
	}
/* ICONS */
	paintIcon(COLLECTION,g,sheet);
	sheet.paintImage(g,getIcon(COLLECTION),'QuestSheet-CollectionBis-portrait-clip-region');
	switch(String($Layout)){
	case 'sets':
		let adapterList = new Array(
			'EncounterSet','EncounterSet1','EncounterSet2',
			'EncounterSet3','EncounterSet4','EncounterSet5' );
		let adapterSelector = 0;
		for(let index=0;index<adapterList.length;index++){
			if($(adapterList[index])!='EmptyIcon'){adapterSelector=index+1;}
		}
		let ESregion = settingToArray('QuestSheet-EncounterSet-portrait-clip-region');
		let ES1region = settingToArray('QuestSheet-EncounterSet1-portrait-clip-region');
		let ES2region = settingToArray('QuestSheet-EncounterSet2-portrait-clip-region');
		let ES3region = settingToArray('QuestSheet-EncounterSet3-portrait-clip-region');
		let ES4region = settingToArray('QuestSheet-EncounterSet4-portrait-clip-region');
		let ES5region = settingToArray('QuestSheet-EncounterSet5-portrait-clip-region');
		debug('adapterSelector: '+adapterSelector);
		switch(adapterSelector){
		case 0: break;
		case 1: case 3: case 5:
			ESregion[0] = Number(ESregion[0])+Number($QuestSheet-adapter-corrector);
			ES1region[0] = Number(ES1region[0])+Number($QuestSheet-adapter-corrector);
			ES2region[0] = Number(ES2region[0])+Number($QuestSheet-adapter-corrector);
			ES3region[0] = Number(ES3region[0])+Number($QuestSheet-adapter-corrector);
			ES4region[0] = Number(ES4region[0])+Number($QuestSheet-adapter-corrector);
			ES5region[0] = Number(ES5region[0])+Number($QuestSheet-adapter-corrector);
		case 2: case 4: case 6: 
			ESregion = new Region([Number(ESregion[0]),Number(ESregion[1]),Number(ESregion[2]),Number(ESregion[3])]);
			ES1region = new Region([Number(ES1region[0]),Number(ES1region[1]),Number(ES1region[2]),Number(ES1region[3])]);
			ES2region = new Region([Number(ES2region[0]),Number(ES2region[1]),Number(ES2region[2]),Number(ES2region[3])]);
			ES3region = new Region([Number(ES3region[0]),Number(ES3region[1]),Number(ES3region[2]),Number(ES3region[3])]);
			ES4region = new Region([Number(ES4region[0]),Number(ES4region[1]),Number(ES4region[2]),Number(ES4region[3])]);
			ES5region = new Region([Number(ES5region[0]),Number(ES5region[1]),Number(ES5region[2]),Number(ES5region[3])]);
			sheet.paintImage(g,'QuestSheet-adapter'+adapterSelector,'QuestSheet-adapter-region');
			sheet.paintImage(g,getIcon(ENCOUNTERSET),ESregion);
			sheet.paintImage(g,getIcon(ENCOUNTERSET1),ES1region);
			sheet.paintImage(g,getIcon(ENCOUNTERSET2),ES2region);
			sheet.paintImage(g,getIcon(ENCOUNTERSET3),ES3region);
			sheet.paintImage(g,getIcon(ENCOUNTERSET4),ES4region);
			sheet.paintImage(g,getIcon(ENCOUNTERSET5),ES5region);
		}
	case 'title':
		Name_box.markupText = $Name;
		drawTextLineOutlined('Name',null,strokeMedium,diy,g,sheet);
	case 'logo':
		if( $GameName != '' ){
			GameName_box.markupText = '<loose>'+$GameName;
			drawTextOutlined('GameName',null,strokeMedium,diy,g,sheet);
		}else{
			paintLogo(g,sheet,diy);
		}
	}
	BodyLeft = '';
	BodyLeft =  addTextPart(BodyLeft,'StoryLeft',diy);
	BodyLeft =  addTextPart(BodyLeft,'RulesLeft',diy);
	BodyLeft =  addTextPart(BodyLeft,'FlavourLeft',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyLeft = BodyLeft+'<justified>';}
	BodyLeft_box.markupText = BodyLeft;
	updateNameTags(BodyLeft_box,diy);
	BodyRight = '';
	BodyRight =  addTextPart(BodyRight,'StoryRight',diy);
	BodyRight =  addTextPart(BodyRight,'RulesRight',diy);
	BodyRight =  addTextPart(BodyRight,'FlavourRight',diy);
	if($('LRL-'+Card+'-justified') == 'yes'){BodyRight = BodyRight+'<justified>';}
	BodyRight_box.markupText = BodyRight;
	updateNameTags(BodyRight_box,diy);
	var regionLeft = settingToArray(checkKey('BodyLeft-region'));
	var regionRight = settingToArray(checkKey('BodyRight-region'));
	switch(String($PortraitSize)){
		case 'small':
			regionRight[3] = Number(regionRight[3])-524;
			break;
		case 'medium':
			regionLeft[3] = Number(regionLeft[3])-524;
			regionRight[3] = Number(regionRight[3])-524;
			break;
		default:
	}
	switch(String($Layout)){
		case 'logo':
			regionLeft[1] = Number(regionLeft[1])+280;
			regionLeft[3] = Number(regionLeft[3])-280;
			break;
		case 'title':
			regionLeft[1] = Number(regionLeft[1])+360;
			regionLeft[3] = Number(regionLeft[3])-360;
			break;
		case 'sets':
			regionLeft[1] = Number(regionLeft[1])+416;
			regionLeft[3] = Number(regionLeft[3])-416;
			break;
		default:
	}
	BodyLeft_box.draw(g,new Region(regionLeft));
	BodyRight_box.draw(g,new Region(regionRight));
	
	if(Number($Page)>0){
		Page_tinter.setImage(ImageUtils.get('TheLordOfTheRingsLCG/numbert/'+$Page+'.png'));
		hsb = diy.settings.getTint('Template-tint');
		Template_tinter.setFactors(hsb[0],hsb[1],hsb[2]/2);
		if(isOdd(Number($Page))){
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBR-region'));
			sheet.paintImage(g,
				Page_tinter.getTintedImage(),
				'QuestSheet-Page-odd-region'
			); 
		}else{
			sheet.paintImage(g,Template_tinter.getTintedImage(),checkKey('campaignColourBL-region'));
			sheet.paintImage(g,
				Page_tinter.getTintedImage(),
				'QuestSheet-Page-even-region'
			);
	} 
	}
	if( $PortraitSize != 'none' ){drawArtist(g,diy);}
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
