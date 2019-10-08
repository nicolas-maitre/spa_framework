<html>
    <head>
        <meta charset="UTF-8"/>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <link rel="stylesheet" href="css/renderer.css"/>
    </head>
    <body>
        
        <?php include("include/menu.php"); ?>
        <div class="pagesContainer">
            <div class="quizzPageContainer">
                <div class="quizzTitle">Tous les Quizz</div>
                <div class="quizzQuestionsContainer">
                    <div class="questionAnswerContainerSearch" >
                        <input class="questionAnswer questionAnswerSingleLine" id="test" type="text" placeholder="Search"/>
                        <i class="fas fa-sync-alt"></i>                       
                    </div>
                    <table>
                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                        <a href="quizz.php">Les objets en php</a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                     20.09.2019
                                </div>
                                <div class="DescriptionQuizz">
                                    Tous s'avoir sur les objets en php.
                                </div>   
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                        <a href="quizz.php">L'utilisation d'une classe.</a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                    15.08.2018
                                </div>
                                <div class="DescriptionQuizz">
                                    Comment bien utiliser une classe en POO.
                                </div>   
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                    <a href="quizz.php">L'orienté objet</a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                    12.04.2018
                                </div>
                                <div class="DescriptionQuizz">
                                    Tous s'avoir sur la programmation orienté objet.
                                </div>   
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                    <a href="quizz.php">les différents type de polymorphisme</a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                    11.02.2018
                                </div>
                                <div class="DescriptionQuizz">
                                    Tester vos connaissance dans le polymorphisme
                                </div>   
                           </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                    <a href="quizz.php">les boucles</a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                    30.02.2015
                                </div>
                                <div class="DescriptionQuizz">
                                    Tous s'avoir sur les boucles (for, while, do while)
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