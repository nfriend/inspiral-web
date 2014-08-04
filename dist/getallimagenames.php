<?php

foreach(glob('images/*.png') as $filename) {
	$time = filemtime($filename);
	$files[$time] = array(
		imagepath => $filename,
		timestamp => $time
	);
}
ksort($files);

print json_encode($files);

?>