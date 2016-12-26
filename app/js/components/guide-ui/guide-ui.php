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
						<input type="email" class="form-control" data-ng-model="$ctrl.login.email">
					</div>
					<div class="form-group">
						<label>Password:</label>
						<input type="password" class="form-control" data-ng-model="$ctrl.login.password">
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
		<div class="col-md-9" data-ng-if="$ctrl.login.done">
			<div class="row">
				<div class="col-md-12">
					<h1>Welcome {{$ctrl.login.username}}</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<ul class="nav nav-pills">
						<li data-ng-click="$ctrl.doLogout()">
							<a><span class="glyphicon glyphicon-lock"></span> Logout</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<guide-filter-list data-table="users"></guide-filter-list>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<guide-filter-list data-table="roles"></guide-filter-list>
				</div>
				<div class="col-md-4">
					<guide-filter-list data-table="permissions"></guide-filter-list>
				</div>
				<div class="col-md-4">
					<guide-filter-list data-table="permissions_roles"></guide-filter-list>
				</div>
			</div>
		
		</div>
		<div class="col-md-3">
			<div class="alerts-container"></div>
		</div>
	</div>
</div>
