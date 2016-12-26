<div class="panel panel-default" data-ng-cloak>
	<div class="panel-heading">
		<p class="panel-title">{{$ctrl.getHeadingText()}}</p>
	</div>
	<div class="panel-body">
		<div class="form-group">
			<label for="">Filter:</label>
			<input type="text" class="form-control" data-ng-model="search" data-ng-model-options="{debounce: 250}">
		</div>
		<div class="table-responsive">
			<table class="table table-condensed table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th data-ng-repeat="i in $ctrl.getDataHeaders()">{{i}}</th>
					</tr>
				</thead>
				<tbody>
					<tr data-ng-repeat="article in $ctrl.data | filter:search">
						<td data-ng-repeat="i in article">{{i}}</td>
						<td class="options-td">
							<button data-ng-click="$ctrl.getEditForm(article)" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span> Edit</button>
						</td>
					</tr>
				</tbody>
			</table>

		</div>
	</div>
</div>
