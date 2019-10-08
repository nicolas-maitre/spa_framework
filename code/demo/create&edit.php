<html>

<head>
    <meta charset="UTF-8" />
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <link rel="stylesheet" href="css/renderer.css" />
</head>

<body>
    
    <?php include("include/menu.php"); ?>

    <!-- titre et description du Quizz-->
    <div class="pagesContainer">
        <div class="quizzPageContainer">
            <div class="quizzTitle">Create Quizz</div>
            <div class="quizzQuestionsContainer">
                <div class="questionContainer">
                    <div class="questionTitle">Titre</div>
                    <div class="questionAnswerContainer">
                        <input class="questionAnswer questionAnswerSingleLine" type="text" />
                    </div>
                </div>
                <div class="questionContainer">
                    <div class="questionTitle">Description</div>
                    <div class="questionAnswerContainer">
                        <textarea class="questionAnswer questionAnswerMultiLines"
                            placeholder="Entrez votre description ici"></textarea>
                    </div>
                </div>
            </div>
            <br>
            <!-- Question(s) du Quizz-->
            <div class="quizzQuestionsContainer">
                <table class="tablequizz">
                    <div class="quizzTitle">Questions</div>
                    <tr>
                        <td>
                            <div class="titreQuizz" style="display: inline">
                                <div class="questionTitle">Enoncé</div>
                                <div class="questionAnswerContainer">
                                    <input class="questionAnswer questionAnswerSingleLine" type="text" />
                                </div>
                            </div>
                            <div class="dateQuizz" style="display: inline">
                                <i class="fas fa-grip-lines"></i>
                            </div>
                            <div class="DescriptionQuizz">
                                <div class="questionTitle">type</div>
                                <div class="questionAnswerContainer">
                                    <select class="questionAnswerSingleLine2" style="display: inline">
                                        <option value="Text">Text</option>
                                        <option value="Choix multiple">Choix multiple</option>
                                    </select>
                                    <div class="dateQuizz" style="display: inline">
                                        <i class="fas fa-trash"></i>
                                    </div>                                    
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="titreQuizz" style="display: inline">
                                <div class="questionTitle">Enoncé</div>
                                <div class="questionAnswerContainer">
                                    <input class="questionAnswer questionAnswerSingleLine" type="text" />
                                </div>
                            </div>
                            <div class="dateQuizz" style="display: inline">
                                <i class="fas fa-grip-lines"></i>
                            </div>
                            <div class="DescriptionQuizz">
                                <div class="questionTitle">type</div>
                                <div class="questionAnswerContainer">
                                    <select class="questionAnswerSingleLine2" style="display: inline">
                                        <option value="Text">Text</option>
                                        <option value="Choix multiple">Choix multiple</option>
                                    </select>
                                    <div class="dateQuizz" style="display: inline">
                                        <i class="fas fa-trash"></i>
                                    </div>                                    
                                </div>

                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="footer">Pizza pizza team™</div>
</body>

</html>