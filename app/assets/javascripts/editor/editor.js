;(function() {
  var app = angular.module('editor', []);

  app.run(['$window', '$templateCache', function($window, $templateCache) {
    angular.forEach($window.JST, function(val, key) {
      $templateCache.put(key, val() || " ");
    });
  }]);

  app.factory('FieldCatalog', function(){
    return {
      fieldTypes: [
        {
          displayName: 'Single Line Text',
          name: 'text_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Paragraph Text',
          name: 'textarea_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Number',
          name: 'number_field',
          initial: {
            label: 'Number'
          }
        },
        {
          displayName: 'Checkboxes',
          name: 'checkbox_field',
          initial: {
            label: 'Check all that apply',
            choices: [
              'First Choice',
              'Second Choice',
              'Third Choice'
            ]
          }
        },
        {
          displayName: 'Multiple Choice',
          name: 'radio_field',
          initial: {
            label: 'Select a choice'
          }
        },
        {
          displayName: 'Drop Down',
          name: 'select_field',
          initial: {
            label: 'Select a choice'
          }
        },
        {
          displayName: 'Name',
          name: 'short_name_field',
          initial: {
            label: 'Name'
          }
        },
        {
          displayName: 'Phone',
          name: 'phone_field',
          initial: {
            label: 'Phone'
          }
        },
        {
          displayName: 'File Upload',
          name: 'file_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Address',
          name: 'address_field',
          initial: {
            label: 'Address'
          }
        },
        {
          displayName: 'Date',
          name: 'date_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Email',
          name: 'email_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Time',
          name: 'time_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Website',
          name: 'url_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Price',
          name: 'money_field',
          initial: {
            label: 'Untitled'
          }
        },
        {
          displayName: 'Likert',
          name: 'likert_field',
          initial: {
            label: 'Untitled'
          }
        }
      ]
    }
  });
  app.controller('EditorController', ['$scope', 'FieldCatalog', function($scope, FieldCatalog) {
    $scope.form = {
      title: "Untitled form",
      description: "Write your description here",
      fields: []
    };

    $scope.fieldTypes = FieldCatalog.fieldTypes;

    $scope.editField = function(field) {
      $scope.editingField = field;
    };

    $scope.removeField = function(field) {
      var index = $scope.form.fields.indexOf(field);
      if (index !== -1) {
        if (field == $scope.editingField) {
          $scope.editingField = undefined;
        }
        $scope.form.fields.splice(index, 1);
      }
    };
  }])
  .controller('SettingsController', ['$scope', function($scope) {
    $scope.currentTab = 'addField';
    $scope.select = function(tab) {
      $scope.currentTab = tab;
      if (tab != 'fieldSettings') {
        $scope.editField(undefined);
      }
    };

    $scope.addField = function(fieldType) {
      var newField = {
        type: fieldType.name,
        label: fieldType.initial.label
      };
      $scope.form.fields.push(newField);
      $scope.editField(newField);
    };
  }])
  .controller('PreviewFieldController', ['$scope', function($scope) {
    $scope.previewTemplate = 'editor/templates/' + $scope.editingField.type + '_preview';
  }])
  .controller('EditFieldController', ['$scope', function($scope) {
    $scope.editTemplate ='editor/templates/' + $scope.editingField.type + '_edit';

    $scope.newChoice = function() {
      if ($scope.editingField.choices === undefined) {
        $scope.editingField.choices = [];
      }
      $scope.editingField.choices.push({label: "new choice"});
    };

    $scope.removeChoice = function(choice) {
      var index = $scope.editingField.choices.indexOf(choice);
      if (index != -1) {
        $scope.editingField.choices.splice(index, 1);
      }
    };
  }])
  .directive('eatClick', function() {
    return function(scope, element, attrs) {
      $(element).click(function(event) {
        event.preventDefault();
      });
    };
  })

})();
