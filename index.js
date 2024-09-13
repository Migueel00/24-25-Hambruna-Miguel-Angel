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
    let protein = 0;

    for(let i = 0; i < data.items.item.length; i++){

        const donut                 = data.items.item[i];
        const proteines             = donut.nutrition_facts.nutrition.proteine;
        const proteinesGrams        = proteines.split("g");
        const proteinesGramsParse   = parseInt(proteinesGrams[0]);
        
        if(proteinesGramsParse > protein){

            protein = proteinesGramsParse;
            name    = donut.name;
        }
    }

    console.log("The donut with more proteine is " + name + " with " + protein + " g of proteine");
}

function donutWithLessFiber(data){
    let name;
    let fibreString = data.items.item[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre.split("g");
    let lessFibre   = parseInt(fibreString[0]);
    
    for(let i = 0; i < data.items.item.length; i++){

        const donut = data.items.item[i];

        let aux     = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre.split("g");
        let fibre   = parseInt(aux[0]);

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
