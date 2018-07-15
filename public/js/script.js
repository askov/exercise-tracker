'use strict';

var newUserForm;
var newExerciseForm;

document.addEventListener('DOMContentLoaded', function () {
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
  newExerciseForm = (function () {
    var err = document.querySelector('#js-new-exercise-form .error-container');
    var fields = [
      {
        input: document.forms[1].userid,
        validator: validateUserId,
      },
      {
        input: document.forms[1].description,
        validator: validateDescription,
      },
      {
        input: document.forms[1].duration,
        validator: validateDuration,
      },
      {
        input: document.forms[1].date,
        validator: validateDate,
      },
    ];
    return new Form(err, fields);
  })();
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
  };
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
      this.fields[i].setErrorClass();
    } else {
      this.fields[i].removeErrorClass();
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
FormInput.prototype.setErrorClass = function () {
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

function validateUserId(id) {
  if (!/^\w+$/.test(id)) {
    return '* Wrong user ID';
  }
  return null;
}

function validateDescription(description) {
  if (!description) {
    return '* Description required';
  }
  return null;
}

function validateDuration(duration) {
  if (!/^\d+$/.test(duration)) {
    return '* Duration should be number (mins)';
  }
  return null;
}

function validateDate(date) {
  if (date.trim() === '') {
    return null;
  }
  if (!Date.parse(date)) {
    return '* Should be valid date';
  }
  return null;
}