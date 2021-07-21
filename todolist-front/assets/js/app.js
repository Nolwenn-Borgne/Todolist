const app = {
    // on définit l'adresse de base de notre api
    apiBaseUrl : 'http://0.0.0.0:8080',

    // on définit une propriété d'affichage des archives
    displayArchives: false,

    // on définit une propriété d'affichage des catégories
    displayCategoryId: 0,

    init: function(){
        console.log("App initialisée");

        //tasksList.initializeTasksFromDOM();

        // on demande au module taskForm de poser ses écouteurs d'événements
        taskForm.addAllEventListeners();   
        
        // on lance une méthode s'occupant des catégories en consommant l'API
        categoriesList.loadCategories();

        // on lance une méthode s'occupant des tâches en consommant l'API
        tasksList.loadTasks();

        // on cherche le premier élément qui a la classe filters__task--archived
        // dans le document
        const displayArchivesButtonElement = document.querySelector('.filters__task--archived a');
  
        // on écoute un click sur le bouton d'archivage
        displayArchivesButtonElement.addEventListener('click', app.handleDisplayArchives);

         // on cherche le premier élément qui a la classe filters__task--category dans le document
        const selectCategoryButtonElement = document.querySelector('.filters__task--category select');
  
        // on écoute un click sur le bouton de choix de catégorie
        selectCategoryButtonElement.addEventListener('click', app.handleSelectCategory);
    },

    handleDisplayArchives: function(evt) {
        evt.preventDefault();

        console.log('J\'ai cliqué sur le bouton voir toutes les archives');

        const currentTargetElement = evt.currentTarget;

        if (app.displayArchives == false) {
            app.displayArchives = true;
            currentTargetElement.textContent = 'Voir les tâches actives';

        } else {
            app.displayArchives = false;
            currentTargetElement.textContent = 'Voir les archives';
        }

        // on récupère l'ensembles des tâches
        const tasksListElements = document.querySelectorAll(".tasks .task:not(.task--add)");

        // pour chacune de mes taches
        for (let taskElement of tasksListElements){
            if (app.displayCategoryId == 0) {
                // on gère l'état de la tâche
                if (taskElement.classList.contains('task--archive')) {
                    // on gère l'affichage des archives
                    if (app.displayArchives == false) {
                        taskElement.style.display = 'none';
                    } else {
                        taskElement.style.display = 'block';
                    }
                } else {
                    // on gère l'affichage des tâches non archivées
                    if (app.displayArchives == false) {
                        taskElement.style.display = 'block';
                    } else {
                        taskElement.style.display = 'none';
                    }
                }
            } else {
                if (taskElement.classList.contains('task--archive')) {
                    // on gère l'affichage des archives
                    if (app.displayArchives == true  && taskElement.dataset.category == app.displayCategoryId) {
                        taskElement.style.display = 'block';
                    } else {
                        taskElement.style.display = 'none';
                    }
                } else {
                    // on gère l'affichage des tâches non archivées
                    if (app.displayArchives == false  && taskElement.dataset.category == app.displayCategoryId) {
                        taskElement.style.display = 'block';
                    } else {
                        taskElement.style.display = 'none';
                    }
                }
            }
           
        }  
    },

    handleSelectCategory: function(evt) {

        const currentTargetElement = evt.currentTarget;
        const selectedCategoryId = currentTargetElement.value;
        app.displayCategory = selectedCategoryId;
        
        // on récupère l'ensembles des tâches
        const tasksListElements = document.querySelectorAll(".tasks .task:not(.task--add)");

        // pour chacune de mes taches
        for (let taskElement of tasksListElements){
            // on récupère le dataset
            const datasetCategory = taskElement.dataset.category;
           // on gère l'état de la tâche
           if (app.displayArchives == false) {
                if (selectedCategoryId == 0 && !taskElement.classList.contains('task--archive')) {
                // on affiche toutes les tâches
                taskElement.style.display = 'block';
                } else {
                    if (datasetCategory == selectedCategoryId && !taskElement.classList.contains('task--archive')) {
                        taskElement.style.display = 'block';
                    } else {  
                        taskElement.style.display = 'none';
                    }
                }    
           } else {
            if (selectedCategoryId == 0 && taskElement.classList.contains('task--archive')) {
                // on affiche toutes les tâches
                taskElement.style.display = 'block';
                } else {
                    if (datasetCategory == selectedCategoryId && taskElement.classList.contains('task--archive')) {
                        taskElement.style.display = 'block';
                    } else {  
                        taskElement.style.display = 'none';
                    }
                }  
           }    
        }
    }, 
};

document.addEventListener("DOMContentLoaded", app.init);

