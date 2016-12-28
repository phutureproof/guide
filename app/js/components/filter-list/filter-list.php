<div class="panel panel-default" data-ng-cloak>
    <div class="panel-heading">
        <button class="btn btn-default pull-right" data-ng-click="$ctrl.refresh()"><span class="glyphicon glyphicon-refresh"></span></button>
        <button class="btn btn-primary pull-right" data-ng-click="$ctrl.getCreateForm()" style="margin-right: 2px;"><span class="glyphicon glyphicon-plus"></span></button>
        <p class="panel-title">{{$ctrl.getHeadingText()}}</p>
    </div>
    <div class="panel-body hidden">
        <div class="form-group">
            <label for="">Filter:</label>
            <div class="input-group">
                <span class="input-group-addon" data-ng-click="search = ''"><span class="glyphicon glyphicon-remove "></span></span>
                <input type="text" class="form-control" data-ng-model="search" data-ng-model-options="{debounce: 250}">
                <span class="input-group-addon">{{ ($ctrl.data | filter:search).length | number}} of {{ ($ctrl.data).length | number}}</span>
            </div>
        </div>

        <div data-ng-if="!$ctrl.data.length">

            <img src="/img/spin.gif" alt="" style="width: 40px; height: 40px;">
            <p>Refreshing data source...</p>

        </div>

        <div>
            <div class="alert alert-info" ng-if="($ctrl.data | filter:search).length == 0  && ($ctrl.data.length) > 0">
                <p>It appears your filter has stopped all further results and is too restrictive.</p>
                <p>Please try a less thorough filter.</p>
            </div>
        </div>

        <div>
            <div class="alert alert-warning" ng-if="($ctrl.data | filter:search).length >= 50">
                <p>We have a lot of data to digest, and have taken the liberty of hiding this process.</p>
                <p>Please provide a filter to narrow the results.</p>
                <p>Results will be shown when the amount of results is 50 or less.</p>
            </div>
        </div>

        <div>
            <div class="table-responsive" data-ng-if="($ctrl.data | filter:search).length <= 50 && ($ctrl.data | filter:search).length > 0">
                <table class="table table-condensed table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th data-ng-repeat="i in $ctrl.getDataHeaders()">{{i.replace('_', ' ')}}</th>
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
                    </tbody
                </table>
            </div>
        </div>






    </div>
</div>
