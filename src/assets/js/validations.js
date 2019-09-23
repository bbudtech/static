var validations = {
  required: function(value) {
    return value !== "";
  },
  // phone: function(value) {
  //   return value.match(
  //     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  //   );
  // },
  email: function(value) {
    return value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
};
function validate() {
  var form = document.getElementById("signup-form"),
    inputsArr = form.querySelectorAll("input"),
    errorMessage = document.querySelector(".error.message"),
    successMessage = document.querySelector(".success.message");

  form.addEventListener(
    "submit",
    function(e) {
      var i = 0;
      while (i < inputsArr.length) {
        var attr = inputsArr[i].getAttribute("data-validation"),
          rules = attr ? attr.split(" ") : "",
          j = 0;
        while (j < rules.length) {
          if (!validations[rules[j]](inputsArr[i].value)) {
            e.preventDefault();

            errorMessage.className = "error message";
            errorMessage.innerHTML =
              "<p>Error: Please enter valid name and email address.</p>";
            return false;
          }
          errorMessage.className = "error message hidden";
          j++;
        }
        i++;
      }
      e.preventDefault();
      errorMessage.className = "error message hidden";
      errorMessage.innerHTML = "";
      successMessage.className = "success message";
      successMessage.innerHTML =
        "<p>You're all signed up! Please check your email and read our instructions carefully.</p>";
    },
    false
  );
}
validate();
