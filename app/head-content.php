		<meta charset="UTF-8">

		<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">

		<title>GUIDE | ANGULAR | PoC</title>

		<!-- styles -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
		<link rel="stylesheet" href="css/styles.css">

		<!-- jQuery -->
		<script src="//code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
        <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

		<!-- jQuery plugins & additional JS libraries -->
		<script src="js/third-party/cookie.js"></script>

		<!-- bootstrap JS -->
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

		<!-- angular JS -->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>

		<!-- global scoped data -->
		<script>
			window.token = '<?= $_SESSION['token']; ?>';
		</script>

		<!-- angular app -->
		<script src="js/guide.js"></script>

		<!-- custom services -->
		<script src="js/services/api.js"></script>
		<script src="js/services/html.js"></script>
		<script src="js/services/cookie.js"></script>

		<!-- custom components -->
		<script src="js/components/filter-list/filter.list.js"></script>
		<script src="js/components/guide-ui/guide-ui.js"></script>