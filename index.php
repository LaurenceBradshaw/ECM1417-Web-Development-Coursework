<?php 
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
    <link href="../styles.css" rel="stylesheet"/>
</head>
<body>
    <?php require("navigationbar.php") ?>
    <div id="main">
        <div class="rounded-box">
            <?php 
                if($_SESSION["registered"]){
                    echo "<p>Welcome to Pairs</p>";
                    echo "<button type=\"button\" class=\"btn btn-success btn-lg\" onclick=\"window.location.href = 'pairs.php';\">Click here to play!</button>";
                } else{
                    echo "<p>You're not using a registered session?</p>";
                    echo "<button type=\"button\" class=\"btn btn-danger btn-lg\" onclick=\"window.location.href = 'registration.php';\">Register now</button>";
                }
            ?>
        </div>
    </div>
</body>