<?php
    ob_start();
    include 'api/json.php';
    $result = ob_get_contents();
    ob_end_clean();

    $var = json_decode($result);
?>

<html>
    <head>
        <meta charset="UTF-8"/>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <script src="./js/functions.js"></script>
        <link rel="stylesheet" href="css/renderer.css"/>
    </head>
    <body>
        <div class="topMenu">
            Kaphoot
            <button  onclick="location.href='Home.html';" class="topMenuRightButton">Manage</button>
        </div>
        <div class="pagesContainer">
            <div class="quizzPageContainer">
                <div class="quizzTitle">Tous les Quizz</div>
                <div class="quizzQuestionsContainer">
                    <div class="questionAnswerContainer" >
                        <input class="questionAnswer questionAnswerSingleLine" type="text" placeholder="Search"/>
                        <i class="fas fa-sync-alt"></i>                       
                    </div>
                    <table>
                        <?php foreach($var as $quiz){ ?>

                        <tr>
                            <td>
                                <div class="titreQuizz" style="display: inline">
                                        <a href="quizz.html"><?= $quiz->name; ?></a>
                                </div>
                                <div class="dateQuizz" style="display: inline">
                                    <?= $quiz->datecreation; ?>
                                </div>
                                <div class="DescriptionQuizz">
                                    <?= $quiz->description; ?>
                                </div>   
                            </td>
                        </tr>
                        <?php } ?>
                    </table>
                </div>
            </div>
        </div>
        <div class="footer">Pizza pizza team™</div>
    </body>
</html>
