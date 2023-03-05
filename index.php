<?php 
include("session-close.php");
session_start();
if(isset($_COOKIE['logged-in']) && $_COOKIE['logged-in'] == true){
    $_SESSION["registered"] = true;
}
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
    <link href="../styles.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <?php require("navigationbar.php") ?>
    <div id="main">
        <div class="container text-center">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <div class="rounded-box">
                    <?php 
                        if($_SESSION["registered"]){
                            echo "<p id=\"title\">Welcome to Pairs</p>";
                            echo "<button type=\"button\" class=\"btn btn-success btn-lg\" onclick=\"window.location.href = 'pairs.php';\">Click here to play!</button>";
                        } else{
                            echo "<p id=\"title\">You're not using a registered session?</p>";
                            echo "<button type=\"button\" class=\"btn btn-danger btn-lg\" onclick=\"window.location.href = 'registration.php';\">Register now</button>";
                        }
                    ?>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>
</body>