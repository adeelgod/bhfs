define([
    'Magento_Ui/js/form/element/select',
], function (Select) {
    'use strict';

    return Select.extend({
        initialize: function () {
            this._super();
            this.fieldSet = require('uiRegistry').get(this.imports.fields);
            this.fieldSet.opened.subscribe(function (opened) {
                if (opened === true) {
                    this.checkVisibility(this.value());
                }
            }.bind(this));
        },

        onChange: function (value) {
            this.checkVisibility(value);
        },

        checkVisibility: function (value) {
            if (this.fieldSet) {
                _.each(this.fieldSet.elems(), function (container) {
                    if (this.parentName !== container.name) {
                        _.each(container.elems(), function (field) {
                            if (require('uiRegistry').get(field)) {
                                field.visible(value == this.imports.allowed);
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }
    });
});
