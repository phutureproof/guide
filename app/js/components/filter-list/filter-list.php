<div class="panel panel-default" data-ng-cloak>
    <div class="panel-heading">
        <button class="btn btn-default pull-right" data-ng-click="$ctrl.refresh()" ><span class="glyphicon glyphicon-refresh"></span></button>
        <button class="btn btn-primary pull-right" data-ng-click="$ctrl.getCreateForm()" style="margin-right: 2px;"><span class="glyphicon glyphicon-plus"></span></button>
        <p class="panel-title">{{$ctrl.getHeadingText()}}</p>
    </div>
    <div class="panel-body" style="display: none;">
        <div class="form-group">
            <label for="">Filter:</label>
            <input type="text" class="form-control" data-ng-model="search" data-ng-model-options="{debounce: 250}">
        </div>

        <div data-ng-if="!$ctrl.data.length">

            <img src="/img/spin.gif" alt="" style="width: 40px; height: 40px;">
            <p>Refreshing data source...</p>

        </div>

        <div class="table-responsive" data-ng-if="$ctrl.data.length">
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
                            <button data-ng-click="$ctrl.getEditForm(article)" class="btn btn-primary"><span class="glyphicon glyphicon-edit"></span></button>
                            <button data-ng-click="$ctrl.getDeleteForm(article)" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>
