var ebayAccount = "11676"; //"";
var paypalAccount = "saboteurwithin1@gmail.com"; //"";

if("https://open.inkfrog.com/list-auction-item" === window.location.href) {
	var index = 0
	var f = function() {
		var title = '2018 Nice photo - picture image wallpaper, Collectibles #' + getRandomSKU().toLowerCase()
        loadDoc('https://open.inkfrog.com/listings/new/?mp=8970', function(xhttp3) {
        	var tempid = xhttp3.responseText.substr(xhttp3.responseText.indexOf("var tempid"), 80);
            tempid = tempid.substring(tempid.indexOf("\'") + 1, tempid.length);
            tempid = tempid.split("\'")[0];
            loadDoc("https://open.inkfrog.com/images/ajax/attach.aspx?&tempid=" + tempid + "&productid=0&r=O9iPrKFiGRKvHtM3vKXVCMHvTVDtUxuLOUEeTmTGa&images=" + "325207409", function(xhttp3) {
            	var itemData = "__VIEWSTATEGENERATOR=4A7D6D78&listing_ebayaccount=" + ebayAccount + "&siteid=0&currency=USD&listing_title=" + title + "&listing_subtitle=&vin=&seller_provided_title=&listing_description=%3Cp%3E%3Cstrong%3E%3Cspan+style%3D%22%22%3E%3Cspan+style%3D%22color%3A+rgb(255%2C+0%2C+0)%3B%22%3ETerms+%26amp%3B+Conditions%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EPlease+do+note%2C+This+is+only+image+not+exist+physically.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EWe+will+NOT+ship+product+via+post+service%2C+We+will+NOT+send+product+via+e-mail.+You+can+LOCAL+PICKUP+ONLY.%26nbsp%3B%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EPlease+do+not+expect+any+shipment+actions+from+our+side.+This+listing+suppose+LOCAL+PICKUP+ONLY+-+NO+SHIPPING.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EPlease+bid+and+buy+this+item+only+if+you+understand+our+terms+%26amp%3B+condition+and+agree+with+it.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EWe+accept+PayPal+only!!!+Please+leave+a+note+in+PayPal+when+making+the+payment+if+you+have+any+special+requests.%26nbsp%3B+I+will+do+whatever+I+can+to+help!%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EFeedback%3A+We+request+our+valued+customers+to+send+us+a+positive+feedback+as+we+are+ever+depending+on+reviews+from+you+and+need+every+assistance.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EPositive+feedback+will+be+left+by+us+on+successful+transaction+and+upon+receiving+feedback(s)+from+you.+Please+do+not+leave+a+negative+or+neutral+feedback%2C+before+giving+us+a+chance+to+resolve+your+problem.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EPlease+feel+free+to+contact+me+if+you+have+any+questions.+ALL+problem+will+be+resolve+within+24+hours.....or+as+fast+as+humanly+possible%2C+and+I+haven't+broken+that+promise+yet!%26nbsp%3B+Whew!%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EWe+do+our+best+to+supply+quality+laser+products+to+our+customers+with+the+best+prices.%26nbsp%3B+BUT%2C+in+the+shipping+process+it+is+possible+for+damage+to+come+to+the+product.%26nbsp%3B+It+rarely+happens+as+most+shippers+are+really+good+at+their+job%2C+but+it+is+possible.+In+the+rare+instance+that+this+happens%2C+PLEASE+contact+us!%26nbsp%3B+We+will+replace+the+item+or+give+you+a+refund.%26nbsp%3B+Feedback+is+VERY+important+to+us%2C+so+please+do+contact+us+before+you+leave+negative+feedback.%26nbsp%3B+Pretty+please%3F%26nbsp%3B+We+are+dedicated+to+solving+the+problem+for+you+and+making+you+a+return+customer.%3C%2Fstrong%3E%3C%2Fp%3E%3Cp%3E%3Cstrong%3EThanks+for+visiting+my+eBay+store!%26nbsp%3B+Tell+all+your+friends!%26nbsp%3B+Come+back+soon+and+see+all+the+new+cool+stuff+I+will+be+adding!%26nbsp%3B+Have+yourself+an+awesome+day!!!!!%3C%2Fstrong%3E%3C%2Fp%3E&identifier=&identifier_type=MPN&identifier_brand=Unbranded+%2F+Genenic&listing_folder=0&auto_relist_setting=account&product_image_325207409=325207409&images_modified=true&multisku_images_modified=false&categoryid=14895&selected_category_path=Collectibles+%3E+Photographic+Images+%3E+Contemporary+(1940-Now)+%3E+Nature&secondary_categoryid=&secondary_selected_category_path=&listingtype=Chinese&listingduration=Days_5&charityid=&donation=&private=0&store_category1=1&store_category2=none&lotsize=&catalog_usestockphotoasgallery=on&catalog_showstockphoto=on&catalog_showdescription=on&catalog_enabled=0&catalog_productid=&catalog_productname=&catalog_detailsurl=&catalog_stockimageurl=&year=&manIDs=&manIDsDel=&variations_enabled=0&condition_description=New&h_condition=&h_conditionrequired=0&eBayItemSpecificValue_0=Original+Print&isholder0=Original%2FReprint&eBayItemSpecificValue_1=Artist&isholder1=Listed+By&eBayItemSpecificValue_2=Signed&isholder2=Signed&eBayItemSpecificValue_3=&isholder3=Date+of+Creation&eBayItemSpecificValue_4=&isholder4=Photo+Type&eBayItemSpecificValue_5=Black+%26+White&isholder5=Color&eBayItemSpecificValue_6=&isholder6=Framing&eBayItemSpecificValue_7=&isholder7=Size+Type%2FLargest+Dimension&eBayItemSpecificValue_8=&isholder8=Region+of+Origin&eBayItemSpecificValue_9=No&isholder9=Modified+Item&eBayItemSpecificValue_10=&isholder10=Modification+Description&eBayItemSpecificValue_11=Afghanistan&isholder11=Country%2FRegion+of+Manufacture&eBayItemSpecificValue_12=&isholder12=California+Prop+65+Warning&removedoption_0=Original%2FReprint&removedoption_1=Listed+By&removedoption_2=Signed&removedoption_3=Date+of+Creation&removedoption_4=Photo+Type&removedoption_5=Color&removedoption_6=Framing&removedoption_7=Size+Type%2FLargest+Dimension&removedoption_8=Region+of+Origin&removedoption_9=Modified+Item&removedoption_10=Modification+Description&removedoption_11=Country%2FRegion+of+Manufacture&removedoption_12=California+Prop+65+Warning&location_country=HK&location_zip=518000&location_description=Hong+Kong&templateid=0&builderId=&bestoffer=0&start_price=0.01&start_price_old=0.01&bin_price=&bin_price_old=&reserve_price=&saleprice=&saleprice_old=&salepricetype=1&cost_auction=0.00&price=0.01&price_old=0.01&quantity=1&totalquantity=1&oldtotalquantity=1&cost_fixed=0.00&fixedsaleprice=&fixedsaleprice_old=&fixedsalepricetype=1&sku=SWV_8991608959-1-1248-1&multisku_sku=&multisku-base-price=&multisku-base-quantity=1&multisku-base-sku=&variantsalepricetype=1&variantidentifiertype=MPN&variationidentifierbrand=Unbranded+%2F+Genenic&addvar_sku=&addvar_price=&addvar_quant=1&variations_reset=&returnpolicy=on&return_within=Days_60&return_refund_as=MoneyBack&return_actor=Seller&restocking_fee=NoRestockingFee&return_details=&return_businesspolicyid=&shippingtype=Flat&vehicle_shipping_option=buyer_responsible_for_shipping&dispatch_time=3&codcost=&item_shipto=worldwide&domestic_service1=US_EconomyShippingFromGC&domestic_service1_free=on&domestic_service2=&domestic_service2_cost1=&domestic_service2_cost2=&domestic_service2_surcharge=&domestic_service3=&domestic_service3_cost1=&domestic_service3_cost2=&domestic_service3_surcharge=&domestic_service4=&domestic_service4_cost1=&domestic_service4_cost2=&domestic_service4_surcharge=&domestic_handlingfee=&flat_discount_profile=0&calculated_discount_profile=0&has_promo_discount_profile=0&international_service1=US_IntlEconomyShippingFromGC&international_service1_free=on&international_service1_shipto=worldwide&international_service2=&international_service2_cost1=&international_service2_cost2=&international_service3=&international_service3_cost1=&international_service3_cost2=&international_service4=&international_service4_cost1=&international_service4_cost2=&international_service5=&international_service5_cost1=&international_service5_cost2=&international_handlingfee=&intl_flat_discount_profile=0&intl_calculated_discount_profile=0&has_intl_promo_discount_profile=0&shipping_businesspolicyid=&dimensions_depth=0&dimensions_length=0&dimensions_width=0&weight_major=0&weight_minor=0&packagetype=PackageThickEnvelope&pay_paypalemail=" + paypalAccount + "&pay_paypal=on&pay_payimmediately=on&vatpercent=&salestaxstate=&salestaxpercent=0&deposit_amount=&hours_to_deposit=48&days_to_full_payment=0&payment_businesspolicyid=&paymentinstructions=&buyer_requirements=allow_all&buyer_unpaid_strikecount=2&buyer_unpaid_days=30&buyer_policy_count=4&buyer_policy_days=30&buyer_feedback_score=-1&productid=0&tempid=" + tempid + "&relist=false&relist_id=&linked_profile_listing=&linked_profile_shipping=&linked_profile_return=&linked_profile_payment=&list_option_on=true&schedule_listing=true&lister_date=immediate&lister_hour=12&lister_minute=00&lister_ampm=AM"
            requestDOC("https://open.inkfrog.com/listings/new_edit/ajax/savelisting.aspx", itemData, function(xhttp) {
        		console.log("list item " + index + " done! " + title)
        		index++
        		if (index <= 72) {
        			f()
        		}
    		})
            })
            
        })
		
	}
	f()
}

function getRandomSKU() {
    var sku = "S";
    sku += makeid() + "_"
    for (i = 0; i < 10; i++) {
        sku += getRandomInt(0, 9).toString()
    }
    return sku
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (var i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}