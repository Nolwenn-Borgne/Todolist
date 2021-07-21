const categoriesList = {

    loadCategories: function() {
        
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        request = fetch(app.apiBaseUrl + '/categories', fetchOptions);
        
        request
            .then(categoriesList.decodeJson)
            .then(categoriesList.addOptionsToHeader)
            .then(categoriesList.addOptionsToForm)
        ;
    },

    decodeJson: function(response) {
        return response.json();
    },

    addOptionsToHeader: function(categoriesData) {
        
        // on peut intégrer ces données dans le DOM
        const selectElement = document.querySelector('.filters__task--category select');
        
        categoriesList.addOptionsToSelect(selectElement, categoriesData);
        
        return categoriesData;
    },

    addOptionsToForm: function(categoriesData) {
        const selectElement = document.querySelector('.task--add select');

        categoriesList.addOptionsToSelect(selectElement, categoriesData);
        
        // Ici on ne chaîne plus rien, le return est facultatif
        return categoriesData;
    },

    // on crée une fonction pour mutualiser le code d'ajout des infos
    // à chacun de nos select
    addOptionsToSelect: function(selectElement, categoriesData) {
        
        for (let categoryData of categoriesData) {
            const optionElement = document.createElement('option');
            optionElement.textContent = categoryData.name;
            optionElement.value = categoryData.id;
            selectElement.appendChild(optionElement);  
        }
    },

};