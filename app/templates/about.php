<?php

$<%= type %>Info['<%= directory %>'] = array(
    'Name'        => "<%= name %>",<% if (desc) { %>
    'Description' => "<%= desc %>",<% } %>
    'Version'     => '1.0.0',<% if (url) { %>
    'Url'         => '<%= url %>',<% } %>
    'Author'      => "<%= author.name %>",<% if (author.email) { %>
    'AuthorEmail' => '<%= author.email %>',<% } if (author.url) { %>
    'AuthorUrl'   => '<%= author.url %>',<% } %>
    'License'     => '<%= license %>'
);
