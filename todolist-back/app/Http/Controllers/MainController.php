<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function home()
    {
        // echo "Yatahhhhhh";

        // on peut lancer des requêtes SQL comme suit
        // inconvénient, on récupère des objets standards
        // $results = DB::select("SELECT * FROM categories");

        // grâce à Eloquent, on peut récupérer tous les enregistrements
        // d'une table sans rien coder grâce à la méthode all de la classe
        // Illuminate\Database\Eloquent\Model
        // $results = Category::all();
        // dump($results);

        // Si on veut rajouter des contraintes, on peut
        // utiliser le query builder
        // $results = Category::where('status', 1)->get();
        // dump($results);

        // grâce à Eloquent, on peut récupérer un enregistrement en fonction
        // de son id :
        //$category = Category::find(2);
        //dump($category);
        // Pour récupérer un champ particulier d'un enregistrement
        // echo $category->name;

        // insertion d'un enregistrement
        //$newCategory = new Category();
        //$newCategory->name = 'water poney';
        //$newCategory->status = 2;
        //$newCategory->save();

        // Mise à jour d'un enregistrement
        //$waterPoneyCategory = Category::find(6);
        //$waterPoneyCategory->name = 'aquaPoney';
        //$waterPoneyCategory->save();

        // Supprimer un enregistrement
        // Category::destroy(6);

        $task = Task::find(14);
        dump($task);
        

        echo $task->title;

        // maintenant, grâce à la définition des relations
        // dans le modèle, on accède directement à l'entité associée
        // grâce à une propriété dynamique. magique !
        echo $task->category->name;

        // ça marche aussi dans l'autre sens
        //dump($category->tasks);
    }

    //
}
