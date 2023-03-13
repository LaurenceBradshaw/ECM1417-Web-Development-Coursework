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
</head>
    <body>
    <?php require("navigationbar.php")?>
    <div id="main">
        <div class="container text-center">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <div class="rounded-box">
                        <form method="post" action="submit-register.php">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">@</span>
                                <input type="text" name="username" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                            </div>
                            <div class="container mb-3">
                                <div class="row">
                                    <div class="col parent" id="pfpCol">
                                        <img src="../res/blank.jpg" class="reg-img image-behind"/>
                                    </div>
                                    <div class="col">
                                        <ul class="remove-list-style remove-padding">
                                        <li>
                                            <p>Skin</p>
                                            <select class="form-select" id="skinSelect" name="skin">
                                                <option selected>Choose...</option>
                                                <option value="green">Green</option>
                                                <option value="red">Red</option>
                                                <option value="yellow">Yellow</option>
                                            </select>
                                        </li>
                                        <li>
                                            <p>Eyes</p>
                                            <select class="form-select" id="eyesSelect" name="eyes">
                                                <option selected>Choose...</option>
                                                <option value="closed">Closed</option>
                                                <option value="laughing">Laughing</option>
                                                <option value="long">Long</option>
                                                <option value="normal">Normal</option>
                                                <option value="rolling">Rolling</option>
                                                <option value="winking">Winking</option>
                                            </select>
                                        </li>
                                        <li>
                                            <p>Mouth</p>
                                            <select class="form-select" id="mouthSelect" name="mouth">
                                                <option selected>Choose...</option>
                                                <option value="open">Open</option>
                                                <option value="sad">Sad</option>
                                                <option value="smiling">Smiling</option>
                                                <option value="straight">Straight</option>
                                                <option value="surprise">Surprise</option>
                                                <option value="teeth">Teeth</option>
                                            </select>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Register">
                        </form>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
        </div>
    </div>

<script type="text/javascript" src="../js/registration.js"></script>
</body>