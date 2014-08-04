<?php
// recreates all thumbnails, for maintenance purposes
foreach(glob('images/*.png') as $filename) {
	$image = imagecreatefrompng($filename);
	$imageWidth = imagesx($image);
	$imageHeight = imagesy($image);
	$thumbnail = imagecreatetruecolor(313, 201);
	imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, 313, 201, $imageWidth, $imageHeight);
	imagejpeg($thumbnail, str_replace('.png', '_thumb.jpg', $filename), 75);
}


?>