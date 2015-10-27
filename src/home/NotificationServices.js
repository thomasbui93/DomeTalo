/**
 * Created by thoma on 10/22/2015.
 */
$module.factory('NotificationServices', ['$mdToast',function ($mdToast) {
    return {
        notifySelection: function (message) {

            $mdToast.show({
                controller: "ToastController",
                templateUrl: '/toast.html',
                parent : angular.element(document.body),
                hideDelay: 4000,
                position: 'bottom right',
                locals: {
                    message: message
                }
            });
        },
        changePackage: function (pack) {
            $mdToast.show({
                controller: "PackageToast",
                templateUrl: '/package.toast.html',
                parent : angular.element(document.body),
                hideDelay: 4000,
                position: 'bottom right',
                locals: {
                    package: pack
                }
            });
        }
    }
}])