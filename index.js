fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
.then(response => response.json())
.then(data => {
    // Parte 1
    donutWithMoreSugar(data);
    donutWithMoreIron(data);

    // Parte 2 
    listAllDonutsAndItsCarbs(data);

});

function donutWithMoreSugar(data){
    let sweeter;
    let gr = data.items.item[0].nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;
    for(let i = 0; i < data.items.item.length; i++){

        const donut = data.items.item[i];

        const sugar = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;

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
    for(let i = 0; i < data.items.item.length; i++){

        const donut = data.items.item[i];

        const vitamines  = donut.nutrition_facts.nutrition.vitamines;

        for(let k = 0; k < vitamines.length; k++){

            const vitamine = vitamines[k];
            
            if(vitamine.type === 'Iron'){

                const percent           = vitamine.percent.split('%');
                let   percentNumber     = parseInt(percent[0]);
                
                console.log(percentNumber);

                if(percentNumber > iron){
                    
                    iron = percentNumber;
                    name = donut.name;
                }
            }
        }
    }
    
    console.log("The donut with more iron is " + name + " with " + iron + "% percent of iron");
}

function listAllDonutsAndItsCarbs(data){

    for(let i = 0; i < data.items.item.length; i++){
        
        const donut = data.items.item[i];

        const carb  = donut.nutrition_facts.nutrition.carbohydrate.carbs_detail;

        console.log(donut.name);
        console.log(carb);

    }
}
