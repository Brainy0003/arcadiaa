$(document).ready(function() {
  $('#buttonDeleteAccount').on('click', function() {
    bootbox.confirm({
      message: "Cette opération est irréversible. En êtes vous sûr ?",
      buttons: {
        confirm: {
          label: 'Oui',
          className: 'btn-success'
        },
        cancel: {
          label: 'Non',
          className: 'btn-danger'
        }
      },
      callback: function(result) {
        $('form').submit();
      }
    });
  });
});
