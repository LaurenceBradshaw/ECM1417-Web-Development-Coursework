<?php 
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></head>
    <link href="../styles.css" rel="stylesheet"/>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.php" name="home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="paris.php" name="memory">Play Pairs</a>
                    </li>
                </ul>
            </div>
            <div class="col">
                <ul>
                    <li class="nav-item">
                    <?php 
                    if($_SESSION["registered"]){
                        echo "<a class=\"nav-link\" href=\"leaderboard.php\" name=\"leaderboard\">Leaderboard</a>";
                    } else{
                        echo "<a class=\"nav-link\" href=\"registration.php\" name=\"register\">Register</a>";
                    }
                    ?>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.php" name="home">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="paris.php" name="memory">Play Pairs</a>
            </li>
            <li class="nav-item">
            <?php 
            if($_SESSION["registered"]){
                echo "<a class=\"nav-link\" href=\"leaderboard.php\" name=\"leaderboard\">Leaderboard</a>";
            } else{
                echo "<a class=\"nav-link\" href=\"registration.php\" name=\"register\">Register</a>";
            }
            ?>
        </ul>
    </div>
    </nav>
</body>