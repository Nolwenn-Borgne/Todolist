<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    // on crée uneméthode dans la classe de base de nos controller
    // qui permet d'encapsuler le "helper" (fonction utilitaire)
    // appelé jusqu'alors
    protected function sendJsonResponse($data, $responseCode = 200)
    {
        return response()->json($data, $responseCode);
    }


    // on prévoit également une méthode qui permet de retourner
    // une réponse vide avec un code d'erreur particulier
    // sans doute pratique lors de la suppression d'un enregistrement
    // dans ce cas on ne retourne pas de donnée (puisque la demande était de les supprimer)
    // mais on souhaite indiquer que la suppression a bien eu lieu grâce à un code 204
    protected function sendEmptyResponse($responseCode = 200){
        return response()->json('', $responseCode);
    }
}
