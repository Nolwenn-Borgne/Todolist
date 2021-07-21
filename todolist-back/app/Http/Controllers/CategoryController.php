<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function list()
    {
        // On demande au modèle de récupérer les catégories
        $categoriesList = Category::all();

        // on renvoie du JSON
        return $this->sendJsonResponse($categoriesList);
    }

    public function item($id)
    {
        $category = Category::find($id);

        if ($category) {
            return $this->sendJsonResponse($category);
        } else {
            // on retourne une réponse vide avec un code 404
            return $this->sendEmptyResponse(404);
        }
    }

    //
}
