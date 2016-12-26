<?php

/**
 * :: REAL WORLD ::
 *
 * Would have a security routine here blocking access to anything below
 * We do have token support built in though, so there's a thing.
 *
 */
session_start();
$_SESSION['token'] = md5(microtime(true));
?>
<!doctype html>
<html lang="en" data-ng-app="guide">
	<head>
		<?php require_once(__DIR__ . '/head-content.php'); ?>
	</head>
	<body data-ng-cloak>

		<!-- guide ui -->
		<guide-ui></guide-ui>

	</body>
</html>
