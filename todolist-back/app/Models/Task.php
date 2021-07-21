<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// cf commentaires dans Category pour les conventions de nommage
class Task extends Model
{
    // Ici on a défini qu'une tâche était lié à une catégorie
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
