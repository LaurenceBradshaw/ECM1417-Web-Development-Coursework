<?php 
include("session-close.php");
register_shutdown_function('logout');
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
    <link href="../css/styles.css" rel="stylesheet"/>
    <link href="../css/leaderboard.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <?php require("navigationbar.php")?>
    <div id="main">
        <div class="bgimg"></div>
        <div class="container text-center">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="rounded-box grey">
                        <p>Select Level: </p>
                            <form method="post" action="submit-register.php">
                                <select class="form-select drop-down" id="levelSelect" name="skin">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="total">Total</option>
                                </select>
                            </form>
                        <div id="leaderboard-area">
                            
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
<script type="text/javascript" src="../js/leaderboard.js"></script>
</body>