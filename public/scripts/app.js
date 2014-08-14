!function ($) {

  var tmpl;
  var timeout;
  var value;
  var input;

  function FilterTable () {
    value = $.trim(value).toLowerCase();
    if (value) {
      $('#overview-table tbody tr').hide();
      var to_show = $('#overview-table tbody tr[data-search*="'+value+'"]');
      if (to_show.length > 0) {
        to_show.show();
        $('#overview-table tbody .empty').hide();
      } else {
        $('#overview-table tbody .empty').show();
      }
    } else {
      $('#overview-table tbody tr').show();
    }
  }

  function UpdateHistory () {
    if (typeof history !== 'undefined') {
      var params = ( value ) ? '/?'+$.param({ "q": value }) : '/';
      history.pushState(null, null, params);
    }
    FilterTable();
  }

  function GetText (text) {
    return text;
  }

  $(function () {

    $.get('/modal', function (data) {
      tmpl = swig.compile(data, { locals: { gettext: GetText } });
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
      placement: 'top',
      container: 'body',
      trigger: 'hover'
    });

    $('#overview-table tbody tr').on('click', function(event) {
      event.preventDefault();
      var json = $(this).data('json');
      $('#modal').remove();
      $(tmpl(json)).appendTo('body').modal();
    });
    $('#overview-table').fixedHeader({ topOffset: 0 });

    input = $('#search-form input[name="q"]');
    $('#search-form').on('submit', function (event) {
      event.preventDefault();
      clearTimeout(timeout);
      value = input.val();
      UpdateHistory();
    });
    input.on('keyup', function() {
      value = input.val();
      clearTimeout(timeout);
      timeout = setTimeout(UpdateHistory, 250);
    });

    // OK if there's a value here...
    value = input.val();
    if (value) {
      FilterTable();
    }
    $(window).on('popstate', FilterTable);

    $('#legend').scrollToFixed({
      marginTop: 20
    });

  });
}(window.jQuery);
