
var table =   $('#members').DataTable({
    "language": {
      "sProcessing":     "Traitement en cours...",
      "sSearch":         "Rechercher&nbsp;:",
        "sLengthMenu":     "Afficher _MENU_ membres",
      "sInfo":           "Affichage des membres de _START_ &agrave; _END_ sur _TOTAL_ membres",
      "sInfoEmpty":      "Aucun membre &agrave; afficher",
      "sInfoFiltered":   "(filtr&eacute; de _MAX_ membres au total)",
      "sInfoPostFix":    "",
      "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords":    "Aucun membre &agrave; afficher",
      "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
      "oPaginate": {
        "sFirst":      "Premier",
        "sPrevious":   "Pr&eacute;c&eacute;dent",
        "sNext":       "Suivant",
        "sLast":       "Dernier"
      },
      "oAria": {
        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
      }
    },
    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Tous"]]
} );

$('#level').change( function() {
   table.draw();
} );

$.fn.dataTable.ext.search.push(
   function( settings, data, dataIndex ) {
        var min = parseInt($('#level-min').val(), 10 );
        var max = parseInt($('#level-max').val(), 10 );
       var age = parseFloat( data[2] ) || 0; // use data for the age column

       if ( ( isNaN( min ) && isNaN( max ) ) ||
            ( isNaN( min ) && age <= max ) ||
            ( min <= age   && isNaN( max ) ) ||
            ( min <= age   && age <= max ) )
       {
           return true;
       }
       return false;
   }
);

$(function() {
   $( "#level-range" ).slider({
     range: true,
     min: 1,
     max: 100,
     values: [ 1, 100 ],
     slide: function( event, ui ) {
       $( "#level-min" ).val(ui.values[ 0 ]);
       $( "#level-max" ).val(ui.values[ 1 ]);
       table.draw();

     }
   });
   $( "#level-min" ).val($( "#level-range" ).slider( "values", 0 ));
   $( "#level-max" ).val($( "#level-range" ).slider( "values", 1 ));
 });
