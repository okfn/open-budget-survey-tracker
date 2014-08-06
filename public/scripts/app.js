!function ($) {
  $(function () {
    var modal = $('#modal');
    $('[data-toggle="tooltip"]').tooltip();
    $('#overview-table tr').on('click', function(event) {
      event.preventDefault();
      var json = $(this).data('json');
      $('.modal-title', modal).text(json.country);
      if (json.code) {
        $('.modal-footer a', modal).prop('href', '/country/'+json.code.toLowerCase())
        $('.modal-footer', modal).show();
      } else {
        $('.modal-footer', modal).hide();
      }
      modal.modal();
    });
    $('#overview-table').fixedHeader({ topOffset: 0 });
  });
}(window.jQuery);
