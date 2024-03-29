<?php 
include("session-close.php");
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
    <link href="../css/styles.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        var isRegistered = '<?php echo $_SESSION["registered"]; ?>';
    </script>
</head>
    <body>
    <?php require("navigationbar.php")?>
    <div id="main">
        <div class="bgimg"></div>
        <div class="container text-center">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="rounded-box info-area">
                        <p id="info"></p>
                    </div>
                    <div class="rounded-box play-area">
                        <div id="gameBoard">

                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
<script type="text/javascript" src="../js/pairs-logic.js"></script>
</body>