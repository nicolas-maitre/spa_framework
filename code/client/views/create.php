
<div class="quizzTitle">
    Création de quizz
</div>
<!-- Quizz -->
<div class="createQuizzContainer">
    <div>
        <div>Titre</div>
        <input id="createQuizzTitle" class="largeInput" type="text"/>
    </div>
    <div>
        <div>Description</div>
        <textarea id="createQuizzDescription" class="largeInputMultiline" placeholder="Entrez votre description ici"></textarea>
    </div>
    <button id="createQuizz">Créer le quizz</button>
    <br>
    <!-- Questions -->
    <div class="sectionTitle">Questions</div>
    <div class="createQuestion"> 
        <div>Enoncé</div>
        <input class="largeInput" type="text"/>
        <!-- to change answer type
        <div class="questionTitle">type</div>
        <select class="questionAnswerSingleLine2" style="display: inline">
            <option value="Text">Text</option>
            <option value="Choix multiple">Choix multiple</option>
        </select>
        <i class="fas fa-grip-lines"></i>
        <i class="fas fa-trash"></i>
        -->
        <button>Supprimer</button>
    </div>
    <button>Ajouter une question</button>
    <button>Enregistrer les questions</button>
</div>
