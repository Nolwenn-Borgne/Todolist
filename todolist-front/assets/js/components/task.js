const task = {
    addAllEventListeners: function (currentTask){
        
        // on affiche leur nom pour débug
        //console.log(currentTask.querySelector('.task__name').textContent);

        // on cherche le premier élément qui a la classe task__button--modify
        // dans l'élément currentTask
        const taskEditButtonElement = currentTask.querySelector('.task__button--modify');
        
        // on écoute un click sur le bouton d'édition
        taskEditButtonElement.addEventListener('click', task.handleDoEdit);

        // idem pour le nom de la tache
        const taskNameElement = currentTask.querySelector('.task__name-display');

        // on écoute un click sur le libellé de la tâche
        taskNameElement.addEventListener('click', task.handleDoEdit);

        // on récupère une référence au champ d'édition
        const inputTaskNameElement = currentTask.querySelector('.task__name-edit');

        //on écoute la perte de focus (blur) sur l'input d'édition du libellé
        inputTaskNameElement.addEventListener('blur', task.handleConfirmEdit);
        inputTaskNameElement.addEventListener('keydown', task.handleTaskNameKeyDown);

        // on cherche le premier élément qui a la classe task__button--validate
        // dans l'élément currentTask
        const taskValidateButtonElement = currentTask.querySelector('.task__button--validate');
        
        // on écoute un click sur le bouton de validation
        taskValidateButtonElement.addEventListener('click', task.handleDoValidate);

        // on cherche le premier élément qui a la classe task__button--incomplete
        // dans l'élément currentTask
        const taskIncompleteButtonElement = currentTask.querySelector('.task__button--incomplete');
        
        // on écoute un click sur le bouton de tâche incomplète
        taskIncompleteButtonElement.addEventListener('click', task.handleDoIncomplete);

        // on cherche le premier élément qui a la classe task__button--archive
        // dans l'élément currentTask
        const taskArchiveButtonElement = currentTask.querySelector('.task__button--archive');
        
        // on écoute un click sur le bouton d'archivage
        taskArchiveButtonElement.addEventListener('click', task.handleDoArchive);

        // on cherche le premier élément qui a la classe task__button--desarchive
        // dans l'élément currentTask
        const taskDesarchiveButtonElement = currentTask.querySelector('.task__button--desarchive');
        
        // on écoute un click sur le bouton d'archivage
        taskDesarchiveButtonElement.addEventListener('click', task.handleDoDesarchive);

        // on cherche le premier élément qui a la classe task__button--delete
        // dans l'élément currentTask
        const taskDeleteButtonElement = currentTask.querySelector('.task__button--delete');
        
        // on écoute un click sur le bouton d'archivage
        taskDeleteButtonElement.addEventListener('click', task.handleDelete);
        

    },

    handleDoEdit: function (evt){

        console.log('on est dans la méthode pour modifier le titre d\'une tâche !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task
        const taskElement = currentTargetElement.closest('.task');

        // on change la classe de la task (ajouter task--edit)
        taskElement.classList.add('task--edit');

        // accèder à l'input 
        const inputTaskNameElement = taskElement.querySelector('.task__name-edit');
        
        // lui donner le focus
        inputTaskNameElement.focus();
    },

    handleConfirmEdit: function (evt){

        // je récupère l'élément depuis lequel l'évènement a été déclenché
        const currentTargetElement = evt.currentTarget;

        // console.log("perte du focus", currentTargetElement);

        // on récupère la valeur saisie
        const newTaskName = currentTargetElement.value;

        // accéder à la task et à son id dans le dataset
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;

        // On stocke les données à transférer
        let data = {
            title: newTaskName
        };

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        // Exécuter la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('modification effectuée');

                    // on récupère l'élément qui contient le libellé de la tache
                    const taskNameElement = taskElement.querySelector('.task__name-display');

                    // je positionne son contenu textuel avec la valeur de l'input
                    taskNameElement.textContent = newTaskName;

                    // changer la classe de la task (supprimer task--edit)
                    taskElement.classList.remove('task--edit');
                }
                else {
                    alert('La modification a échouée');

                    // ici, on aurait pu réfléchir à la chose la plus logique à faire en cas d'échec
                    // par exemple, remettre la valeur de l'input avec la valeur précédente (stockée dansl'élément qui 
                    // a la classe task__name-display)

                    // on récupère l'élément qui contient le libellé de la tache
                    const taskNameElement = taskElement.querySelector('.task__name-display');

                    // on met à jour le champ d'édition avec l'ancienne valeur
                    currentTargetElement.value = taskNameElement.textContent;

                    // changer la classe de la task (supprimer task--edit)
                    taskElement.classList.remove('task--edit');
                }
            }
        )    
    },

    handleTaskNameKeyDown: function (evt){
        if (evt.key === 'Enter') {

            // on récupère une référence au champ de saisie
            const currentTargetElement = evt.currentTarget;
            // on enlève le focus
            currentTargetElement.blur();
        }

        // si c'est pas entrée, je fais rien !
    },

    handleDoValidate: function (evt){

        console.log('je suis dans la méthode handleDoValidate !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task et à son id
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;
        // console.log(taskId);

        // On stocke les données à transférer
        let data = {
            completion: 100
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP grâce à fetch
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('modification effectuée');
        
                    // on change la classe de la task (ajouter task--complete et enlever task--todo)
                    taskElement.classList.add('task--complete');
                    taskElement.classList.remove('task--todo');
                    const progressBar = taskElement.querySelector('.progress-bar__level');
                    progressBar.style.width = '100%';
                }
                else {
                    alert('La modification a échouée');
                }
            }
        )
    },

    handleDoIncomplete: function (evt){

        console.log('je suis dans la méthode handleDoIncomplete !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task et à son id
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;

        // On stocke les données à transférer
        let data = {
            completion: 0
        };

         // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('modification effectuée');
                    // on change la classe de la task (ajouter task--todo et enlever task--complete)
                    taskElement.classList.add('task--todo');
                    taskElement.classList.remove('task--complete');
                    const progressBar = taskElement.querySelector('.progress-bar__level');
                    progressBar.style.width = '0%';
                    
                }
                else {
                    alert('La modification a échouée');
                }
            }
        )   
    },

    handleDoArchive: function (evt){

        console.log('je suis dans la méthode handleDoArchive !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task et à son id
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;

        // On stocke les données à transférer
        let data = {
            status: 2
        };

         // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('la tâche est archivée');
                    // on change la classe de la task (ajouter task--todo et enlever task--complete)
                    taskElement.classList.add('task--archive');
                    taskElement.classList.remove('task--complete');
                    taskElement.classList.remove('task--todo');
                    taskElement.style.display = 'none';
                }
                else {
                    alert('L\'archivage a échoué');
                }
            }
        )   
    },

    handleDoDesarchive: function (evt){

        console.log('je suis dans la méthode handleDoDesarchive !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task et à son id
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;

        // On stocke les données à transférer
        let data = {
            status: 1
        };

         // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    alert('la tâche est déachivée');
                    // on change la classe de la task (ajouter task--todo et enlever task--complete)
                    taskElement.classList.remove('task--archive');
                    response.json().then(function(data) {
                        if (data.completion == 100) {
                            taskElement.classList.add('task--complete');
                        } else {
                            taskElement.classList.add('task--todo');
                        }
                        taskElement.style.display = 'none';
                    })     
                }
                else {
                    alert('La modification a échouée');
                }
            }
        )   
    },

    handleDelete: function (evt){

        console.log('je suis dans la méthode handleDelete !');
        // on récupère une référence sur le bouton cliquer 
        // (il s'agit de la source de l'évènement)
        const currentTargetElement = evt.currentTarget;

        // accéder à la task et à son id
        const taskElement = currentTargetElement.closest('.task');
        const taskDataset = taskElement.dataset;
        const taskId = taskDataset.id;

        
        // On consomme l'API pour supprimer en DB
        let fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
        };
        
        // Exécuter la requête HTTP via fetch
        fetch(app.apiBaseUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                //console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 204) {
                    alert('la tâche est supprimée');
                    // on supprime la task
                    taskElement.remove();
                }
                else {
                    alert('La suppression a échouée');
                }
            }
        )   
    },

    createDOMElement: function(newTask) {

        // récupérer le template
        const template = document.getElementById('newTask');

        // cloner le contenu du template (on effectue une copie profonde)
        // on obtient un "fragment de document"
        let newTaskElement = template.content.cloneNode(true);

        // on accède à l'élément qui nous intéresse grace à querySelector
        newTaskElement = newTaskElement.querySelector('.task');

        // mettre à jour la copie du contenu du template
        // avec les informations de la tâche à créer
        newTaskElement.querySelector('.task__name-display').textContent = newTask.name;
        newTaskElement.querySelector('.task__name-edit').value = newTask.name;
        newTaskElement.querySelector('.task__category p').textContent = newTask.category;
        newTaskElement.dataset.category = newTask.categoryId;

        // Informations supplémentaires (provenant de l'API - non utile pour la partie ajout tache depuis le formulaire)

        // on gère l'état de la tâche
        if (newTask.status == 2) {
            newTaskElement.classList.add('task--archive');
            newTaskElement.classList.remove('task--todo');
            newTaskElement.classList.remove('task--complete');

        // on gère l'affichage des archives
        if (app.displayArchives == false) {
            newTaskElement.style.display = 'none';
        } else {
            newTaskElement.style.display = 'block';
        }
        } else {
            // on gère l'affichage des tâches non archivées
            if (app.displayArchives == false) {
                newTaskElement.style.display = 'block';
            } else {
                newTaskElement.style.display = 'none';
            }
        }

        // on gère le % de completion
        if (newTask.completion) { 
            const progressBar = newTaskElement.querySelector('.progress-bar__level');
            progressBar.style.width = newTask.completion + '%';
            if (newTask.completion == 100 && newTask.status == 1) {
                newTaskElement.classList.add('task--complete');
                newTaskElement.classList.remove('task--todo');
            }
        }

        
        // on stocke l'id dans un dataset
        // nous servira plus tard quand nous intéragirons avec la bdd
        if (newTask.id) { 
            newTaskElement.dataset.id = newTask.id;
        }

        // attacher les événements sur la nouvelle tache
        task.addAllEventListeners(newTaskElement);

        // retourner la tache
        return newTaskElement;    
    },
    
};