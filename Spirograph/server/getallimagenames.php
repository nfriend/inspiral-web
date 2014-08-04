<?php

foreach(glob('images/*.png') as $filename) {
	$time = filemtime($filename);
	$files[$time] = array(
		imagepath => $filename,
		timestamp => $time
	);
}
krsort($files);

print json_encode($files);

?>