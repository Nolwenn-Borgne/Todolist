<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function list()
    {
        // On demande au modèle de récupérer les tâches
        $tasksList = Task::all()->load('category');
        // ou $tasksList = Task::with('category')->get();

        // on renvoie du JSON
        return $this->sendJsonResponse($tasksList);
    }

    public function item($id)
    {
        $task = Task::find($id)->load('category');

        if ($task) {
            return $this->sendJsonResponse($task);
        } else {
            // on retourne une réponse vide avec un code 404
            return $this->sendEmptyResponse(404);
        }
    }

    // Ici, grâce au mécanisme d'injection de dépendance
    // Lumen peut nous injecter un objet de type Illuminate\Http\Request
    // modélisant la requête HTTP
    public function store(Request $request)
    {
        // on récupère les données envoyées en POST
        $title = $request->input('title');
        $category_id = $request->input('categoryId');
        $completion = $request->input('completion', 0);
        $status = $request->input('status', 1);

        // on crée un nouvel objet pour la classe Task
        $newTask = new Task();

        // on modifie les propriétés de cet objet
        $newTask->title = $title;
        $newTask->category_id = $category_id;
        $newTask->completion = $completion;
        $newTask->status = $status;

        // validation des entrées
        // ici, on voit une validation simple
        // on vérifie simplement que le titre et la catégorie sont renseignés
        if (empty($title) || empty($category_id)) {

            // Dans le cas où certaines entrées ne sont pas présentes
            // on indique à l'utilisateur que la requête est mal formatée
            // grâce à un code response adapté
            return $this->sendEmptyResponse(400);

        } else {
            // on sauvegarde l'objet
            // on demande à la couche modèle (notre classe Task)
            // de faire persister l'information
            if ( $newTask->save()) {
                return $this->sendJsonResponse($newTask->load('category'), 201);
            } else {
                // Ici on indique que c'est une erreur serveur
                return $this->sendEmptyResponse(500);
            }
        }
    }

    public function update(Request $request, $id)
    {
        // on récupère la tâche demandée
        $task = Task::find($id);



        // si elle existe
        if ($task) {

            // on récupère la méthode http
            $method = $request->method();



            if ($method == 'put') {
                 // on récupère et valide les données
                $this->validate($request, [
                    'title' => 'required',
                    'completion' => 'required|numeric|min:0|max:100',
                    'status' => 'required|in:1,2',
                    'categoryId' => 'required|exists:categories,id',
                ]);
                 // on met à jour les propriétés de cet objet
                $task->title = $request->input('title');
                $task->category_id = $request->input('categoryId');
                $task->completion = $request->input('completion');
                $task->status = $request->input('status');
            } else {
                // on part d'une validation hyper permissive
                // on laisse tout passer
                // par défaut on laisse tout passer
                $validators = [
                    'title' => '',
                    'completion' => '',
                    'status' => '',
                    'categoryId' => '',
                ];

                if ($request->has('title')) {
                    $validators['title'] = 'required';
                    $task->title = $request->input('title');
                }

                if ($request->has('completion')) {
                    $validators['completion'] = 'required|numeric|min:0|max:100';
                    $task->completion = $request->input('completion');
                }

                if ($request->has('status')) {
                    $validators['status'] = 'required|in:1,2';
                    $task->status = $request->input('status');
                }

                if ($request->has('categoryId')) {
                    $validators['categoryId'] = 'required|exists:categories,id';
                    $task->category_id = $request->input('categoryId');
                }

                $this->validate($request, $validators);
            }

            // on sauvegarde l'objet
            $task->save();
            return $this->sendJsonResponse($task, 200);

            // sinon, en fait pas besoin car le validate s'est déjà chargé de l'erreur
            // si la requête est mal formatée

        } else {
            // sinon
            return $this->sendEmptyResponse(404);

            // Si on avait voulu géré l'ajout en cas de non existence de la
            // tâche avec cet id, on l'aurai géré ici
        }
    }

    public function delete($id)
    {
        // on essaie de trouver la tâche en question
        $taskToDelete = Task::find($id);
        // si elle existe
        if ($taskToDelete) {
            // on la supprime
            $taskToDelete->destroy($id);
            $taskDeleted = Task::find($id);
            if(!$taskDeleted) {
                // on indique à l'utilisateur que tout s'est bien passé
                return $this->sendEmptyResponse(204);
            } else {
                // on indique à l'utilisateur une erreur
                return $this->sendEmptyResponse(500);
            }

        } else {
            // sinon
            // on indique à l'utilisateur que la tâche n'a pas été trouvée
            return $this->sendEmptyResponse(404);
        }
    }
}
