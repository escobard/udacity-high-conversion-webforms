// This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('geo-address')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);

        // object created to generate second object API
        autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('diff-geo-address'), { types: [ 'geocode' ] });
        autocomplete2.addListener('place_changed', function() {
          fillInAddress();
        });
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }

// Set up the logic to change the progress bar
// From the instructor notes on : https://classroom.udacity.com/nanodegrees/nd802/parts/8021345401/modules/555574864975460/lessons/5243991811/concepts/54564686870923

var progressBar = document.querySelector('#progress-normal');

// updated progress bar when ship to a different address is ticked
var progressBarDiffAddress = document.querySelector('#progress-diff-address');

function ProgressTracker (inputs, progressBar) {
  var self = this;
  this.progressBar = progressBar;
  this.inputs = inputs;

  this.inputs.forEach(function (input) {
    input.element = document.querySelector(input.selector);
    input.added = false;
    input.isValid = null;

    input.element.oninput = function () {
      input.isValid = self.determineStatus(input);
      self.adjustProgressIfNecessary(input);
    };
  });
};

ProgressTracker.prototype = {
  determineStatus: function (input) {
    var isValid = false;
    
    if (input.element.value.length > 0) {
      isValid = true;
    } else {
      isValid = false;
    }

    try {
      isValid = isValid && input.element.validate();
    } catch (e) {
      console.log(e);
    }
    return isValid;
  },
  adjustProgressIfNecessary: function (input) {
    var newAmount = this.progressBar.value;

    if (input.added && !input.isValid) {
      newAmount = newAmount - input.amount;
      input.added = false;
    } else if (!input.added && input.isValid) {
      newAmount = newAmount + input.amount;
      input.added = true;
    }
    this.progressBar.value = newAmount;
  }
};

// If you're feeling ambitious, you could add the logic to handle changed billing addresses here!
var inputs = [
  {
    selector: '#user-name',
    amount: 25
  }, {
    selector: '#geo-address',
    amount: 25
  }, {
    selector: '#cc-number',
    amount: 25
  }, {
    selector: '#cc-expiration',
    amount: 25
  }, {
    selector: '#cc-cvc',
    amount: 25
  }
];

var inputsDiff = [
  {
    selector: '#user-name',
    amount: 16.6
  }, {
    selector: '#geo-address',
    amount: 16.6
  }, {
    selector: '#cc-number',
    amount: 16.6
  }, {
    selector: '#cc-expiration',
    amount: 16.6
  }, {
    selector: '#cc-cvc',
    amount: 16.6
  }, {
    selector: '#user-diffname',
    amount: 16.6
  }, {
    selector: '#diff-geo-address',
    amount: 16.6
  }  
];

var progressTracker = new ProgressTracker(inputs, progressBar);

// JavaScript code for the different address field activation
function diffAddressCheck() {

// Selects our Queries
        var checkContainer = document.getElementById('diff-address');
        var diffAddressContainer = document.getElementById('diff-address-container');

        checkContainer.addEventListener('change', function (e) {
        if (this.active) {
            diffAddressContainer.className += " active";
            var progressTrackerNewAddress = new ProgressTracker(inputsDiff, progressBarDiffAddress);
        } else {
            diffAddressContainer.classList.remove("active");
            progressTrackerNewAddress = new ProgressTracker(inputs, progressBar);
        }
      })
    } 
window.addEventListener("load", diffAddressCheck, false);