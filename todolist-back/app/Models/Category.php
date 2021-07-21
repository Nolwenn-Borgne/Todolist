<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Pour que cela fonctionne automatiquement
// il faut que notre modèle étende la classe Illuminate\Database\Eloquent\Model
// et suive les conventions suivantes :
// - la table contenant les données doit être au pluriel
// - la table en question possède un champ id qui soit autoincrément/clé primaire
// - il faut que la classe porte le nom de la table mais en PascalCase et au singulier. ex Category pour la table categories
// - il faut également avoir 2 champs created_at et updated_at de type timestamp
class Category extends Model
{
    // Ici on a défini qu'une catégorie pouvait être liée à plusieurs tâches
    public function tasks()
    {
        // l'un ou l'autre fonctionne
        // return $this->hasMany('App\Models\Task');
        // ou
        return $this->hasMany(Task::class);
    }
}
