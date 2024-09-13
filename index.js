fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
.then(response => response.json())
.then(data => {
    // Parte 1
    console.log("-------------------------------------");
    donutWithMoreSugar(data);

    console.log("-------------------------------------");
    donutWithMoreIron(data);

    console.log("-------------------------------------");
    donutWithMoreProtein(data);

    console.log("-------------------------------------");
    donutWithLessFiber(data);

    console.log("-------------------------------------");


    // Parte 2 
    console.log("-------------------------------------");
    console.log("-------------------------------------");
    console.log("-------------------------------------");


    listAllDonutsAndItsCarbs(data);
    console.log("-------------------------------------");
    listAllDonutsAndItsCals(data)
    console.log("-------------------------------------");
    showTheMeadiaOfCals(data);
    console.log("-------------------------------------");
    showTheTotalOfFatsSaturades(data);
    console.log("-------------------------------------");
    showTheMediaOfVitamines(data);

    console.log("-------------------------------------");
    console.log("-------------------------------------");
    console.log("-------------------------------------");

    listAllDonutsWithHisPosibleButters(data);

    console.log("-------------------------------------");
    calculateHowMuchDonutsPerTypeCanBuy(data);

    console.log("-------------------------------------");
    changeTheColesterol(data);
    console.log("-------------------------------------");
    changeTheAmountOfCarbohydrates(data);
    console.log("-------------------------------------");
    addAVitamineToADonut(data);
    console.log("-------------------------------------");
    changeTheDailyValueForAllDonuts(data); 
    console.log("-------------------------------------");
    addANewAtribute(data);
});

function donutWithMoreSugar(data){

    let sweeter;
    const donuts = listDonuts(data);
    let gr = separateStringAndReturnInt(donuts[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars, "g");


    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        const sugar = separateStringAndReturnInt(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars, "g");

        if(gr < sugar){

            gr = sugar;
            sweeter = donut.name;
        }
    }

    console.log("The sweeter donut is " + sweeter + " having " + gr + " of sugar");
}

function donutWithMoreIron(data){
    let name;
    let iron = 0;

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        const vitamines  = donut.nutrition_facts.nutrition.vitamines;

        for(let k = 0; k < vitamines.length; k++){

            const vitamine = vitamines[k];
            
            if(vitamine.type === 'Iron'){

                const percent           = separateStringAndReturnInt(vitamine.percent, '%');

                if(percent > iron){
                    
                    iron = percent;
                    name = donut.name;
                }
            }
        }
    }
    
    console.log("The donut with more iron is " + name + " with " + iron + "% percent of iron");
}

function donutWithMoreProtein(data){
    let name;
    let theMostProtein = 0;

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut       = donuts[i];
        const proteine    = separateStringAndReturnInt(donut.nutrition_facts.nutrition.proteine, "g");
        
        if(proteine > theMostProtein){

            theMostProtein = proteine;
            name           = donut.name;
        }
    }

    console.log("The donut with more proteine is " + name + " with " + theMostProtein + " g of proteine");
}

function donutWithLessFiber(data){
    let name;
    const donuts    = listDonuts(data);
    let lessFibre   = separateStringAndReturnInt(donuts[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre, "g");
    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];
        let fibre = separateStringAndReturnInt(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre, "g");

        if(fibre <= lessFibre){

            lessFibre = fibre;
            name = donut.name;
        }
    }

    console.log("The donut with less fibre is " + name + " with " + lessFibre + "g fibre");
}

function listAllDonutsAndItsCals(data){
    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut     = donuts[i];
        const calories  = donut.nutrition_facts.nutrition.calories;

        console.log(donut.name + " calories: " + calories);
    }
}

function showTheMeadiaOfCals(data){

    const donuts = listDonuts(data);
    let   totalCalories = 0;

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        const calories = donut.nutrition_facts.nutrition.calories;
        totalCalories += calories;

    }

    const media = totalCalories / donuts.length;

    console.log("The media of calories of the donuts is " + media);
}

function listAllDonutsAndItsCarbs(data){

    for(let i = 0; i < data.items.item.length; i++){
        
        const donut = data.items.item[i];

        const carb  = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail;

        
        console.log(donut.name + " carbohydrate amount " + carb.amount + " sugars: " + carb.type.sugars + "  fibre: " + carb.type.fibre );
    }
}

function listDonuts(data){
    const donuts = [];
    for(let i = 0; i < data.items.item.length; i++){

        const donut = data.items.item[i];

        donuts.push(donut);

    }

    return donuts;
}

function showTheTotalOfFatsSaturades(data){
    
    const donuts = listDonuts(data);
    let totalCalories = 0;

    for(let i = 0; i < donuts.length; i++){
        
        const donut = donuts[i];

        const fatsSaturades = separateStringAndReturnInt(donut.nutrition_facts.nutrition.fat.fat_type.saturated, "g");

        totalCalories += fatsSaturades;
    }

    console.log("La suma de la grasa saturada de todos los donuts es " + totalCalories);
}

function separateStringAndReturnInt(string, separator){

    const aux       = string.split(separator);

    const number    = parseInt(aux[0]);

    return number;
}

function showTheMediaOfVitamines(data){

    const donuts            = listDonuts(data);


    let vitaminATotal       = 0;
    let vitaminCTotal       = 0;
    let calciumTotal        = 0;
    let ironTotal           = 0;

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        const vitamines = donut.nutrition_facts.nutrition.vitamines;

        for(let k = 0; k < vitamines.length; k++){
            const vitamine = vitamines[k];

            switch(vitamine.type){

                case 'Vitamin A':
                    vitaminATotal += separateStringAndReturnInt(vitamine.percent, "%");
                    break;
                case 'Vitamin C':
                    vitaminCTotal += separateStringAndReturnInt(vitamine.percent, "%");
                    break;
                case 'Calcium':
                    calciumTotal += separateStringAndReturnInt(vitamine.percent, "%");
                    break;
                case 'Iron':
                    ironTotal += separateStringAndReturnInt(vitamine.percent, "%");
                    break;
            }
        }
    }

    const totalNumberOfDonuts = donuts.length;
    const vitaminAMedia       = vitaminATotal / totalNumberOfDonuts;
    const vitaminCMedia       = vitaminCTotal / totalNumberOfDonuts;
    const calciumMedia        = calciumTotal  / totalNumberOfDonuts;
    const ironMedia           = ironTotal     / totalNumberOfDonuts;

    console.log("The media of vitamin A is " + vitaminAMedia + " %");
    console.log("The media of vitamin C is " + vitaminCMedia + " %");
    console.log("The media of calcium is " + calciumMedia + " %");
    console.log("The media of iron is " + ironMedia + " %");
}

function listAllDonutsWithHisPosibleButters(data){

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut     = donuts[i];

        const batters   = donut.batters.batter;
        console.log("-------------------------------------");
        console.log("Posible batters for " + donut.name );
        console.log("-------------------------------------");
        
        for(let k = 0; k < batters.length; k++){

            const batter = batters[k];

            console.log(batter.type);
        }

    }
}

function listAllDonutsWithHisPosibleButters(data){

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut      = donuts[i];
        const toppings   = donut.topping;

        console.log("-------------------------------------");
        console.log("Posible extra toppings for " + donut.name );
        console.log("-------------------------------------");
        
        for(let k = 0; k < toppings.length; k++){

            const topping = toppings[k];

            console.log(topping.type);
        }

    }
}

function calculateHowMuchDonutsPerTypeCanBuy(data){
    
    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){
        
        const donut = donuts[i];
        const ppu   = donut.ppu;

        const money = 4;

        const numberOfDonuts = Math.floor(money / ppu);
        const change         = (money - numberOfDonuts * ppu).toFixed(2);

        console.log("You can buy " + numberOfDonuts + " Of " + donut.name + " ppu: " + ppu +" with " + money + " and the change is " + change);
    }
}

function changeTheColesterol(data){

    // const donutsOriginal = listDonuts(data);
    const donuts         = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        const cholesterol = separateStringAndReturnInt(donut.nutrition_facts.nutrition.cholesterol.amount, "mg");
        
        console.log("The cholesterol of " + donut.name + "is: " + cholesterol);
        console.log("The trans:" + donut.nutrition_facts.nutrition.fat.fat_type.trans);
        if(cholesterol > 12){

            donut.nutrition_facts.nutrition.fat.fat_type.trans = "3.2g";
        }
        console.log("Changed: " + donut.nutrition_facts.nutrition.fat.fat_type.trans); 
    }

}

function changeTheAmountOfCarbohydrates(data){

    const donuts    = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){
        
        const donut = donuts[i];

        const sugar = separateStringAndReturnInt(donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars, "g");
        console.log("The sugar of " + donut.name + " is " + sugar + "gr");

        if(sugar > 50){

            donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = "42g";
        }

        console.log("Changed: " + donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount);
    }
}

function addAVitamineToADonut(data){

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        if(donut.name === 'Magic Fusion'){

            const nictacina = {
                type: "Nictacina",
                percent: "2%"
            }

            donut.nutrition_facts.nutrition.vitamines.push(nictacina);
        }

        console.log(donut.nutrition_facts.nutrition.vitamines);
    }
}

function changeTheDailyValueForAllDonuts(data){

    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        console.log("Donut " + donut.name + " daily value:  " + donut.nutrition_facts.nutrition.carbohydrate.daily_value);
        donut.nutrition_facts.nutrition.carbohydrate.daily_value = "53%";
        console.log("Changes to: " + donut.nutrition_facts.nutrition.carbohydrate.daily_value);
    }
}


function addANewAtribute(data){
    const donuts = listDonuts(data);

    for(let i = 0; i < donuts.length; i++){

        const donut = donuts[i];

        if(donut.name === 'Relaxing Alchemy'){
            console.log("Adding new alergen to Relaxing Alchemy");
            donut.alergen = "Gluten Free";
            console.log(donut);
        }
    }

    
}