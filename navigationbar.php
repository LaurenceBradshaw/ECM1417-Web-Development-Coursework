<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container">
    <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="index.php" name="home">Home</a>
        </li>
    </ul>
</div>
<div class="container">
    <ul class="navbar-nav ms-auto justify-content-end">
        <li class="nav-item">
            <a class="nav-link" href="pairs.php" name="memory">Play Pairs</a>
        </li>
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
</nav>