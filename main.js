$(document).ready(function() {
    $('#add_form').submit(function() {
        event.preventDefault()
    })
})

function fetchData(){
    var resultElement = document.getElementById('recipes');
    resultElement.innerHTML = "";

    axios.get('http://34.87.97.93/recipes')
     .then(function(response){
         console.log(response)
        response.data.forEach(list => {
            resultElement.innerHTML += generateSuccessHTMLOutput(list);
        })
     })
     .catch(function(error){
         console.log(error.message, '=======')
     })
}

function generateSuccessHTMLOutput(response){
    console.log('masukkkk')
    console.log(response.calories)
    return `<div  class="col-md-4 pt-5 pr-5">
        <div class="card mx-auto" style="width: 20rem;" id="">
            <img class="card-img-top" src="${response.imageLink}" alt="Card image cap" height="200px">
            <div class="card-body" style="overflow-y: auto; max-height: 300px;">
                <h3 class="card-title">${response.name}</h3>
                <h5>Ingredients</h5>
                <p class="card-text">${response.ingredient}</p>
                <h5>Steps To Prepare</h5>
                <p class="card-text">${response.howToCook}</p>
            </div>
        </div>
        </div>
    `
}

function createNewRecipe () {
    let inputDishName = $('#inputNameOfDish').val();
    let inputIngredients = $('#inputIngredients').val();
    let inputHowToCook = $('#inputHowToCook').val();
    let inputImageLink = $('#inputImageLink').val();
    console.log('add new', inputDishName, inputIngredients, inputHowToCook, inputImageLink);


    axios.post('http://34.87.97.93/recipes', {name: inputDishName, ingredient: inputIngredients, howToCook: inputHowToCook, imageLink:inputImageLink})
        .then(function(response){
            console.log("sukses add data");
            console.log(response, '-----------');
            fetchData();
            $('#inputNameOfDish').val('');
            
        })
        .catch(function(error){
            console.log("error add data");
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        })
}





