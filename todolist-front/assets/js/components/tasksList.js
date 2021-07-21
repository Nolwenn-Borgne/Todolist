const tasksList = {

    /*initializeTasksFromDOM: function(){

        // on récupère l'ensembles des tâches
        const tasksListElements = document.querySelectorAll(".tasks .task:not(.task--add)");

        // pour chacune de mes taches
        for (let taskElement of tasksListElements){
            task.addAllEventListeners(taskElement);
        }   
    },*/

    loadTasks: function() {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        request = fetch(app.apiBaseUrl + '/tasks', fetchOptions);
        
        request
            .then(tasksList.decodeJson)
            .then(tasksList.addTasks)
    },

    decodeJson: function(response) {
        return response.json();
    },

    addTasks: function(tasksData) {
        
        // on boucle sur tasksData
        for (let taskData of tasksData) {
            
            // on crée un objet task
            const newTask = {
                // informations sur lesquelles on s'appuyait jusqu'alors
                name: taskData.title,
                category: taskData.category.name,
                // on va ajouter de nouvelles infos qui vont nous être utiles
                completion: taskData.completion,
                status: taskData.status,
                id: taskData.id,
                categoryId: taskData.category.id
            };

            // on demande au module task de créer l'élément du DOM représentant la tâche
            const newTaskElement = task.createDOMElement(newTask);

            // on demande à takList d'ajouter l'élément créé dans la liste des tâches
            tasksList.addTaskInDOM(newTaskElement);
        }     
    },
    
    addTaskInDOM: function(newTaskElement) {
        const tasksElement =  document.querySelector('.tasks');

        // on l'ajoute en début de liste
        tasksElement.prepend(newTaskElement);
        
        // on l'ajoute avant le formulaire
        // tasksElement.insertBefore(newTaskElement, document.querySelector('.task--add'));
    },
};