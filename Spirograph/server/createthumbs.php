<?php
// recreates all thumbnails, for maintenance purposes
foreach(glob('images/*.png') as $filename) {
	$image = imagecreatefrompng($filename);
	$imageWidth = imagesx($image);
	$imageHeight = imagesy($image);

// takes into account the different aspect ratios that have been used over the course of this project
  if ($imageWidth == 1568 && $imageHeight == 1008) {
    $thumbnailWidth = 313;
    $thumbnailHeight = 201;
  } else {
    $thumbnailWidth = 313;
    $thumbnailHeight = 221;
  }

	$thumbnail = imagecreatetruecolor($thumbnailWidth, $thumbnailHeight);
	imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, $thumbnailWidth, $thumbnailHeight, $imageWidth, $imageHeight);
	imagejpeg($thumbnail, str_replace('.png', '_thumb.jpg', $filename), 75);
}


?>