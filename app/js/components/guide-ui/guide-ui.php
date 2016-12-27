<?php

require_once(__DIR__ . '/../../../../app.config.php');

$db = new \PDO("{$appConfig['database']['default']['driver']}:host={$appConfig['database']['default']['host']};dbname={$appConfig['database']['default']['dbname']};charset={$appConfig['database']['default']['charset']}", $appConfig['database']['default']['user'], $appConfig['database']['default']['pass']);

$sql = "SHOW TABLES FROM {$appConfig['database']['default']['dbname']}";
$result = $db->prepare($sql);
$result->execute([]);

$tables = [];
$column = "Tables_in_{$appConfig['database']['default']['dbname']}";

foreach($result->fetchAll(\PDO::FETCH_OBJ) as $row) {
    $tables[] = $row->$column;
}
?>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-9" data-ng-if="!$ctrl.login.done">
			<div class="panel panel-info">
				<div class="panel-heading">
					<p class="lead">Please login to continue...</p>
				</div>
				<div class="panel-body">
					<div class="form-group">
						<label>Email:</label>
						<input type="email" name="email" class="form-control" data-ng-model="$ctrl.login.email">
					</div>
					<div class="form-group">
						<label>Password:</label>
						<input type="password" name="password" class="form-control" data-ng-model="$ctrl.login.password">
					</div>
					<div class="form-group">
						<label>Remember Me: <input type="checkbox" data-ng-model="$ctrl.login.remember"></label>
					</div>
					<div class="form-group">
						<button class="btn btn-default" type="button" data-ng-click="$ctrl.doLogin()"><span class="glyphicon glyphicon-lock"></span> Login</button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-9 sortable" data-ng-if="$ctrl.login.done">
			<div class="row">
				<div class="col-md-12">
					<h1>Welcome {{$ctrl.login.username}}</h1>
				</div>
			</div>


            <?php foreach($tables as $table): ?>
                <div class="row">
                    <div class="col-md-12">
                        <guide-filter-list data-table="<?= $table; ?>" />
                    </div>
                </div>
            <?php endforeach; ?>


            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-pills">
                        <li data-ng-click="$ctrl.doLogout()">
                            <a><span class="glyphicon glyphicon-lock"></span> Logout</a>
                        </li>
                    </ul>
                </div>
            </div>



		</div>
		<div class="col-md-3" >
			<div class="alerts-container"></div>
		</div>
	</div>
</div>
<script>

</script>
