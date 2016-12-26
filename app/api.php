<?php

session_start();

$output = ['status' => 'security lock down, no token present in request.'];

/**
 * Handle get requests
 * token based, required to match $_SESSION['token']
 */
if (strtolower($_SERVER['REQUEST_METHOD']) === 'get') {

	if (isset($_GET['token']) && $_GET['token'] !== $_SESSION['token']) {

		$output['status'] = 'security lock down, bad token in request.';

	} else {

		$output['status'] = 'success';
		$db = new \PDO('mysql:host=localhost;dbname=angular;charset=UTF8', 'root', '');

		if (isset($_GET['login'])) {

			$output['message'] = 'logging in.';

			$hash = sha1($_GET['password']);
			$sql = "SELECT * FROM users WHERE email = ?";
			$result = $db->prepare($sql);
			$result->execute([$_GET['email']]);

			if ($result->rowCount()) {
				$output['login'] = $result->fetch(\PDO::FETCH_OBJ);
				$output['login']->done = true;
			} else {
				$output['login'] = (object)[
					'done'     => false,
					'email'    => $_GET['email'],
					'password' => $_GET['password']
				];
			}
		}

		if (isset($_GET['table'])) {

			$columns = '*';

			if (isset($shown) && !empty($shown)) {
				$columns = $shown;
			}

			$sql = "SELECT {$columns} FROM {$_GET['table']}";
			$result = $db->prepare($sql);
			$result->execute([]);
			$output['data'] = $result->fetchAll(\PDO::FETCH_OBJ);
			$sql = "SHOW FULL COLUMNS FROM {$_GET['table']}";
			$result = $db->prepare($sql);
			$result->execute([]);
			$output['columns'] = $result->fetchAll(\PDO::FETCH_OBJ);

		}
	}

	header("Content-Type: application/json");
	exit(json_encode($output));
}

if (strtolower($_SERVER['REQUEST_METHOD']) === 'post') {

	$post = [];
	parse_str(file_get_contents('php://input'), $post);

	if (isset($post['token']) && $post['token'] !== $_SESSION['token']) {

		$output['status'] = 'security lock down, bad token in request.';

	} else {

		if (isset($post['token']) && $post['token'] === $_SESSION['token']) {

			$output['status'] = 'success';
			$db = new \PDO('mysql:host=localhost;dbname=angular;charset=UTF8', 'root', '');

			// handle updates
			if (isset($post['table'], $post['columns'], $post['id'])) {

				$table = $post['table'];
				$id = isset($post['id']) ? $post['id'] : null;

				$columns = $values = $updates = [];

				foreach ($post['columns'] as $key => $value) {
					$columns[] = "`{$key}`";
					$values[] = '?';
					$updates[] = "{$key} = ?";
				}

				$columns = implode(',', $columns);
				$values = implode(',', $values);
				$updates = implode(',', $updates) . ", id = {$id}";
				$sql = "UPDATE `{$table}` SET {$updates} WHERE id = {$id}";
				$result = $db->prepare($sql);

				if ($result->execute(array_merge(array_values($post['columns'])))) {

					$output['status'] = 'success';

					if ($result->rowCount()) {

						$output['message'] = 'Record updated.';

					} else {

						$output['message'] = 'Data identical, database not updated.';

					}
				} else {

					$output['status'] = 'caution';
					$output['message'] = 'Couldn&apos;t update record!';
					$output['sql'] = $sql;
					$output['error-message'] = $result->errorInfo();

				}

				header("Content-Type: application/json");
				exit(json_encode($output));
			}

			// handle inserts
			if (isset($post['table'], $post['columns']) && !isset($post['id'])) {

				$table = $post['table'];
				$id = $post['id'];

				$columns = $values = $updates = [];

				foreach ($post['columns'] as $key => $value) {
					$columns[] = "`{$key}`";
					$values[] = '?';
					$updates[] = "{$key} = ?";
				}

				$columns = implode(',', $columns);
				$values = implode(',', $values);

				$sql = "INSERT INTO `{$table}` ({$columns}) VALUES ({$values})";
				$result = $db->prepare($sql);

				if ($result->execute(array_merge(array_values($post['columns']), array_values($post['columns'])))) {

					$output['status'] = 'success';

					if ($result->rowCount()) {
						$output['message'] = 'Record created.';
					}

				} else {

					$output['status'] = 'failure';
					$output['message'] = 'Couldn&apos;t update record!';
					$output['sql'] = $sql;
					$output['error-message'] = $result->errorInfo();

				}

				header("Content-Type: application/json");
				exit(json_encode($output));
			}
		}
	}

	header("Content-Type: application/json");
	exit(json_encode($output));
}

