const taskForm = {

    addAllEventListeners: function() {
        // récupérer le formulaire
        let addTaskForm = document.querySelector('.task--add form');
        addTaskForm.addEventListener('submit', taskForm.handleAddTaskFormSubmit);
    },

    handleAddTaskFormSubmit: function(evt) {

        // on empêche que la soumission du formulaire provoque
        // un rechargement de la page
        evt.preventDefault();

        let addTaskForm = evt.currentTarget;

        // on récupère le nom de la tâche à créer
        let inputElement = addTaskForm.querySelector('input[name="name"]');
        let taskName = inputElement.value;

        // on récupère le nom de la catégorie de la tâche à créer
        let selectElement = addTaskForm.querySelector('select');
        let taskCategoryId = selectElement.value;

        const newTask = {
            title: taskName,
            categoryId: taskCategoryId
        };

        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(newTask)
        };

        // Exécuter la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks', fetchOptions)
        .then(taskForm.parseJsonResponseOrThrowError)   
        .then(taskForm.addTaskFromApi)   
        .catch(taskForm.showError)                
    },

    parseJsonResponseOrThrowError: function(response) {
        // Si HTTP status code à 201 => OK
        if (response.status == 201) {
            alert('ajout effectué');
            return response.json();    
        }
        else {
            alert('L\'ajout a échoué'); 
            
            // pour mémoire, pas au programme
            throw ('ajout échoué');
        }    
    },

    addTaskFromApi: function(data) {

        console.log(data);
        const taskData = {
            name: data.title,
            category: data.category.name,
            id: data.id,
            completion: data.completion,
            status: data.status, 
            categoryId: data.category.id
        };
        // on demande au module task de créer l'élément du DOM représentant la tâche
        const newTaskElement = task.createDOMElement(taskData);

        // on demande à takList d'ajouter l'élément créé dans la liste des tâches
        tasksList.addTaskInDOM(newTaskElement);
    },

    showError: function(error){
        console.log(error);
    },
};