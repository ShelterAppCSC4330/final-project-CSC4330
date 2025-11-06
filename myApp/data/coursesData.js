


export const coursesData = {
  "Hurricane Basics": {
    id: 1,
    sections: [
      {
        title: "What is a Hurricane?",
        content: "A hurricane is a type of tropical cyclone with sustained winds of 74 mph or higher. Hurricanes form over warm ocean waters and can cause devastating damage through high winds, storm surge, and flooding.",
        image: require('../assets/hurricane.jpeg'),
      },
      {
        title: "Hurricane Categories",
        content: "Hurricanes are classified using the Saffir-Simpson Hurricane Wind Scale from Category 1 to 5.This scale is used to estimate the damage that may be caused by the storm and its area of effect. The scale is based on wind speed, Category 1 has winds of 74-95 mph and causes minimal damage. Category 5 has winds of 157 mph or higher and causes catastrophic damage.",
        image: require('../assets/hurricaneScale.jpeg'),
      },
      {
        title: "Spaghetti models",
        content:"Spaghetti models are models created by metorlogist that predict the path of a hurricane. These models are incredibily valuable in ealry warning if a hurricane is predictied to impact your area. Thes models can also predict when impact will happen and how long the hurricane will be over a certain area. When mointoring these models to stay prepared make sure to use reliable sources such as NOAA(National Oceanic and Atmospcheric Administartion)",
        image: require('../assets/hurricaneModel.webp')

      },
      {
        title: "Hurricane Season",
        content:"Hurricane season starts June 1st and ends November 30th",
        
      }
    ]
  },
  "Emergency Supplies": {
    id: 2,
    sections: [
      {
        title: "Why should I keep emergency supplies?",
        content: "Emergencies can strike at any time, whether due to natural disasters, accidents, or unexpected power outages. Having a well-prepared emergency kit ensures you and your loved ones can stay safe, secure, and self-sufficient for a critical period. Proper preparation reduces stress, allows for quicker response during a crisis, and can even save lives. Being proactive by maintaining emergency supplies gives you peace of mind and a higher level of resilience when disaster strikes."

      },

      {
        title: "Essential vs non essential",
        content: "Not all emergency supplies are created equal. Essential items are those you absolutely need to survive the first 72 hours of an emergency, such as food, water, and first aid materials. Non-essential items enhance comfort and convenience, like extra blankets, entertainment, or specialty cooking equipment. Prioritizing essentials ensures that you are ready for immediate survival, while non-essential items can be added gradually to improve your overall preparedness."
      },

      {
        title: "Food and Water",
        content: "Water is the most critical resource during an emergency. Aim for at least one gallon of water per person per day for drinking and basic sanitation. Pack non-perishable foods that are easy to prepare and high in calories, such as canned goods, dried fruits, nuts, and energy bars. Rotate your supplies regularly to maintain freshness, and consider options that do not require cooking, especially if you might lose access to power or fuel. We will discuss how to properly store and sanatize water in a later course",
      },

      {
        title: "First Aid",
        content: "First aid items are an essetial piece of your emergcy supplies list, as during an e,ergecny you may be seperated from profesional medical assitance. Having the proper training and supplies can save your life during a disaster.It is important to have a first aid kit readily available and stocked prior to an emergency. Below are a few items neccessary for a quality first aid kit, we will discuss more items in a later course",
        list: [
          "Any medications you or a family member require",
          "Bandages of various sizes",
          "Antiseptic oinment",
          "Over the counter medications such as, ibuprofen, anti-nausal, cold medicene",
          "Latex gloves",
          "Tweazers"
        ]
      },

      {
        title: "Power",
        content:"Electricity may not always be available during emergencies. Stock items such as flashlights, battery-powered lanterns, and extra batteries. A portable power bank or solar charger can keep essential electronics operational. If you use medical devices that require electricity, ensure backup power sources are available to prevent interruptions in care. While in most cases power is not an essential item it can be incredinly helpful in increasing comfort during a disaster as well as allowing you to operate neccessary equipment such as phones and radios"
      },

      {
        title: "Fuel",
        content: "During hurricane season it becomes imperative to ensure your veichle is fueled incase of a need to evacuate, as gas stations could be out of fuel for a week or more after a disaster depending on severity. Other types of fuel are also neccessary such as propane, diesel, and butane. These fuels can be used for stoves, generators, and heaters"
      }
    ]
  },
  "Evacuation Planning": {
    id: 3,
    sections: [
      {
        title: "Why Evacuation Planning Matters",
        content: "In any disaster — whether a wildfire, hurricane, flood, or chemical spill — the ability to evacuate quickly and safely can save lives. Having a plan in place eliminates confusion and reduces panic during stressful situations. An evacuation plan helps ensure every family member knows where to go, what to bring, and how to stay connected if separated. Preparing ahead of time allows you to make calm, informed decisions when minutes truly matter."
      },

      {
        title:"Know Your Hazards and Routes",
        content: "The first step in evacuation planning is understanding the specific threats in your region. Coastal areas may face hurricanes or tsunamis, while inland regions may deal with wildfires or tornadoes. Learn your community’s designated evacuation routes and practice using them. Identify multiple paths in case your main route becomes blocked. Keep printed maps in your vehicle and emergency kit — GPS and cell service may fail during a crisis.",
        list:[
            "Identify the most likely natural or man-made disasters in your area.",
            "Locate primary and secondary evacuation routes.",
            "Know where local shelters and safe zones are located.",
            "Keep a paper map in your emergency kit and car."
        ]
      },

      {
        title: "Creating a Family Communication Plan",
        content: "During an evacuation, communication networks can become unreliable. Establish a family meeting point and a secondary location in case the first is unsafe. Choose an out-of-area contact person everyone can check in with if you get separated. Teach children important phone numbers and ensure all family members know how to send a text message, which often works when calls do not. Having a clear communication plan ensures everyone can reunite safely after the danger has passed."
      },

      {
        title:"Preparing Your Home Before Leaving",
        content:"If time permits, take steps to protect your property before evacuating. Shut off utilities such as gas, water, and electricity if instructed by local authorities. Secure windows and doors, move outdoor furniture indoors, and unplug electronics to prevent damage from power surges. Take photographs of your home and important belongings for insurance purposes. Quick, organized action before leaving can reduce potential losses and make recovery easier.",
        list:[
             "Turn off utilities if advised (gas, electricity, water).",
             "Secure or bring in outdoor furniture and objects.",
             "Unplug electronics to prevent power surge damage.",
             "Close and lock all doors and windows.",
             "Take photos of property for insurance documentation."
        ]
      },

      {
        title:"What to Bring When You Evacuate",
        content:"Pack your essential supplies in an easy-to-grab 'go bag' for each family member. Include food, water, medications, identification, cash, and copies of important documents. Don’t forget comfort items for children or pets. Keep your vehicle fueled and ready to go, and have spare chargers, blankets, and first aid supplies available. Remember that space and time will be limited — focus on survival and recovery essentials first.",
        list:[
            "3 days of food and water per person.",
            "First aid kit and necessary prescriptions.",
            "Cash, identification, and important documents.",
            "Flashlight, extra batteries, and portable chargers.",
            "Pet food, leashes, and comfort items for kids."

        ]
      }
    ]
  },
  "First Aid Basics": {
    id: 4,
    sections: [
      {
        title: "Why First Aid Matters",
        content: "In the aftermath of an emergency, professional medical help might not be immediately available. Having basic first aid knowledge allows you to stabilize injuries, prevent infections, and even save lives before emergency responders arrive. A well-stocked first aid kit and the skills to use it can make the difference between a minor injury and a life-threatening situation."

      },

      {
      title: "Building Your First Aid Kit",
      content: "A proper first aid kit should be tailored to your environment, household size, and specific health needs. While store-bought kits provide a great foundation, customizing your kit ensures you’re ready for real-world scenarios. Check expiration dates regularly and restock supplies after each use.",
      list: [
            "Adhesive bandages (various sizes) and sterile gauze pads",
            "Antiseptic wipes, hydrogen peroxide, or iodine solution",
            "Medical tape, elastic bandages, and scissors",
            "Tweezers and safety pins",
            "Thermometer, gloves, and hand sanitizer",
            "Pain relievers (ibuprofen, acetaminophen, or aspirin)",
            "Burn ointment, hydrocortisone cream, and antibiotic ointment",
            "Any personal medications or prescriptions"
         ]
      },

       {
      title: "Basic First Aid Skills Everyone Should Know",
      content: "Having the right supplies is important, but knowing how to use them is essential. Learn the basics of wound care, CPR, and how to respond to common injuries. Many local organizations like the Red Cross or community health centers offer free or low-cost first aid training.",
      list: [
            "How to stop bleeding using direct pressure and bandages",
            "Recognizing and treating shock",
            "Performing CPR and using an AED (if available)",
            "Managing burns and fractures",
            "Handling allergic reactions and using an EpiPen",
            "Identifying heatstroke, hypothermia, and dehydration"
           ]
       },

       {
      title: "First Aid for Common Emergencies",
      content: "Some emergencies require quick and specific responses. Knowing what to do in the first few minutes can prevent complications and speed up recovery. Stay calm, assess the situation, and act confidently using your knowledge and supplies.",
      list: [
              "For cuts and scrapes: Clean with antiseptic and cover with sterile bandages.",
              "For burns: Cool the area with clean water and apply burn ointment.",
              "For sprains: Use the R.I.C.E. method — Rest, Ice, Compression, Elevation.",
              "For choking: Perform the Heimlich maneuver if the person cannot breathe or speak.",
              "For insect bites or stings: Remove the stinger, clean the area, and apply ice."
             ]
      },

      {
      title: "Maintaining and Updating Your Kit",
      content: "A first aid kit is only useful if it’s ready to go when you need it. Schedule regular checks to make sure all items are in good condition and medications haven’t expired. Keep smaller kits in your car, workplace, and go bag for convenience and accessibility.",
      list: [
              "Inspect and restock every 6 months or after any use.",
              "Replace expired medications and damaged supplies.",
              "Store your kit in a cool, dry place, easily accessible to all family members.",
              "Label the kit clearly and include basic instructions for use.",
              "Consider including a small first aid reference guide."
             ]
      }


    ]
  },
  "Food Preparation and Storage": {
    id: 5,
    sections: [
      {
       title: "Why Food Storage Matters",
      content: "Food is a fundamental part of disaster preparedness. During an emergency, access to grocery stores, restaurants, or supply chains may be interrupted for days or even weeks. Storing an adequate amount of non-perishable food ensures you and your family can remain nourished and healthy even when outside resources are limited. A good food supply provides both physical sustenance and peace of mind during uncertain times."

      },

     {
      title: "What Kind of Food to Store",
      content: "The best emergency foods are shelf-stable, easy to prepare, and high in nutrients. Variety is important — it prevents 'food fatigue' and helps maintain morale during stressful situations. When possible, select items that your household already enjoys eating to make meal preparation more familiar and less stressful.",
      list: [
                "Canned goods: meats, soups, vegetables, beans, and fruits",
                "Dry foods: rice, pasta, oats, lentils, and flour",
                "Ready-to-eat foods: protein bars, peanut butter, trail mix, and crackers",
                "Dehydrated or freeze-dried meals (long shelf life and lightweight)",
                "Comfort foods: coffee, tea, chocolate, or instant drink mixes",
                "Baby food or special dietary items, if needed"
      ]
       },

     {
      title: "How Much to Store",
      content: "A general guideline is to store at least a **two-week supply** of food for every person in your household. In disaster-prone areas or for long-term preparedness, aim for **one to three months** of shelf-stable food. Rotate your stock regularly to ensure freshness and minimize waste.",
      list: [
              "Plan for about 2,000 calories per person per day, adjusted for age and activity level.",
              "Include foods that don’t require refrigeration or extensive preparation.",
              "Label items with purchase or expiration dates for easy tracking.",
              "Use the 'first in, first out' method — consume the oldest items first."
        ]
    },

    {
      title: "How to Cook and Prepare Emergency Food",
      content: "Cooking during an emergency can be challenging, especially without power or gas. Plan ahead by identifying alternative cooking methods that are safe and efficient. Practice using your emergency cooking gear before you need it, so you’re familiar with setup and fuel needs.",
      list: [
              "Use portable camping stoves with propane or butane fuel.",
              "Grill or cook over charcoal or wood fires — but only outdoors in ventilated areas.",
              "Consider solar cookers for long-term or fuel-free cooking.",
              "Stock manual can openers, utensils, pots, and heat-safe gloves.",
              "Have backup fuels and know safe storage locations for each type."
          ]
    },

    {
      title: "How to Store Food Safely",
      content: "Proper storage keeps food fresh longer and prevents contamination from moisture, pests, or temperature fluctuations. Store food in sealed containers, keep it dry, and check your supplies regularly for spoilage. A little organization goes a long way toward long-term safety and usability.",
      list: [
              "Store food in a cool, dark, and dry place (50–70°F ideal).",
              "Use airtight containers or mylar bags with oxygen absorbers for bulk foods.",
              "Keep canned goods off concrete floors to avoid rusting.",
              "Separate foods by category for easier inventory management.",
              "Protect against pests with sealed bins or vacuum-sealed bags."
          ]
    }

    ]
  },

    "Water": {
    id: 6,
    sections: [
      {
      title: "The Importance of Water Preparedness",
      content: "Water is the single most critical survival resource. A person can survive for weeks without food but only a few days without water. During emergencies, public water systems may become contaminated or unavailable, making stored water and purification methods essential for health and survival. Reliable access to clean water ensures hydration, cooking, sanitation, and basic hygiene can continue even when infrastructure fails."
    },

    {
      title: "How Much Water to Store",
      content: "A good rule of thumb is to store at least **one gallon of water per person per day** — half for drinking and half for hygiene or cooking. For families, pets, and special medical needs, you may need more. Storing a **minimum three-day supply** is a starting point, but aiming for **two weeks or more** offers better security, especially in disaster-prone areas.",
      list: [
              "1 gallon per person per day = absolute minimum",
              "Store at least 14 gallons per person for a two-week supply",
              "Add extra for pets, cooking, cleaning, and first aid",
              "Adjust based on temperature, activity, and health needs"
      ]
    },

    {
      title: "How to Store Water Safely",
      content: "Water must be stored in clean, food-grade containers that are sealed tightly and kept away from heat and light. Not all plastics are suitable — choose BPA-free, food-safe containers or water-specific storage barrels. Label and rotate your stored water every six months to maintain freshness.",
      list: [
              "Use food-grade plastic, stainless steel, or glass containers",
              "Avoid milk jugs — they can degrade or harbor bacteria",
              "Store in a cool, dark location (50–70°F)",
              "Add 1/8 teaspoon of unscented household bleach per gallon if treating tap water",
              "Keep containers sealed and off the floor to prevent contamination"
      ]
    },

    {
      title: "Water Purification and Treatment",
      content: "If stored water runs out or is contaminated, having purification methods available is vital. Always assume natural water sources are unsafe unless treated. Combine multiple purification methods when possible for added safety.",
      list: [
            "Boiling: Bring water to a rolling boil for at least 1 minute (3 minutes above 6,500 ft).",
            "Filtration: Use portable filters that remove bacteria and protozoa.",
            "Chemical treatment: Use water purification tablets or unscented bleach.",
            "UV purification: Portable UV pens can destroy viruses and bacteria.",
            "Store purification tools with your emergency kit and practice using them."
      ]
    },

    {
      title: "Sanitation and Hygiene During Emergencies",
      content: "Clean water is not only for drinking — it’s essential for hygiene and disease prevention. During disasters, sanitation systems may be offline, increasing the risk of illness. Maintaining good hygiene practices and having alternative sanitation solutions protects your health and comfort.",
      list: [
              "Use hand sanitizer and disinfecting wipes when water is limited.",
              "Store extra soap, bleach, and disposable gloves.",
              "Keep a supply of heavy-duty trash bags for waste management.",
              "If toilets are unavailable, use portable camping toilets or lined buckets.",
              "Dispose of waste properly and away from water sources to prevent contamination."
            ]
    }
    ]
  }
};