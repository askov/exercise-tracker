'use strict';

var newUserForm;

document.addEventListener("DOMContentLoaded", function () {
  // Form #0
  newUserForm = (function () {
    var err = document.querySelector('#js-new-user-form .error-container');
    var fields = [
      {
        input: document.forms[0].name,
        validator: validateName,
      }
    ];
    return new Form(err, fields);
  })();
  // Form #1
  // TODO
});

var Form = function (errorContainer, fields) {
  this.errors = [];
  this.errorContainer = errorContainer;
  this.fields = this.initFields(fields);
};
Form.prototype.initFields = function (fields) {
  var tmp = [];
  for (var i = 0; i < fields.length; i++) {
    tmp.push(new FormInput(fields[i]));
    this.initInputEvents(fields[i].input);
  }
  return tmp;
};
Form.prototype.initInputEvents = function (input) {
  var form = this;
  input.oninput = function () {
    form.validate();
  }
};
Form.prototype.updateErrorDisplay = function () {
  this.errorContainer.innerHTML = this.errors[0] || '';
};
Form.prototype.clearErrors = function () {
  this.errors = [];
  this.updateErrorDisplay();
};
Form.prototype.addError = function (err) {
  this.errors.push(err);
};
Form.prototype.validate = function () {
  this.clearErrors();
  for (var i = 0; i < this.fields.length; i++) {
    const err = this.fields[i].validator(this.fields[i].el.value);
    if (err) {
      this.addError(err);
    }
  }
  this.updateErrorDisplay();
  return !this.errors.length;
};
Form.prototype.submit = function () {
  this.error.innerHTML = '';
};


var FormInput = function (field) {
  this.el = field.input;
  this.validator = field.validator;
  this.errClass = 'input-error';
};
FormInput.prototype.setErrorClass = function (err) {
  const tmp = this.el.className.split(' ');
  if (tmp.indexOf(this.errClass) === -1) {
    tmp.push(this.errClass);
  }
  this.el.className = tmp.join(' ');
};
FormInput.prototype.removeErrorClass = function () {
  const tmp = this.el.className.split(' ');
  var index = tmp.indexOf(this.errClass);
  if (index !== -1) {
    tmp.splice(index, 1);
  }
  this.el.className = tmp.join(' ');
};

// Validators
function validateName(name) {
  if (!/^[a-zA-Z]\w+$/.test(name)) {
    return '* User name must contain only alphanumeric characters, underscore and start with letter';
  }
  return null;
}