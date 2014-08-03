<?php
header("Content-Disposition: attachment; filename=\"inspirograph.png\"");
readfile("images/" . $_GET["imagename"]);
?>
