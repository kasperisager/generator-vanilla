<?php

$ApplicationInfo['<%= directory %>'] = array(
    'Name'        => "<%= name %>",<% if (description) { %>
    'Description' => "<%= description %>",<% } %>
    'Version'     => '1.0.0',
    'Author'      => "<%= author.name %>",<% if (author.email) { %>
    'AuthorEmail' => '<%= author.email %>',<% } if (author.url) { %>
    'AuthorUrl'   => '<%= author.url %>',<% } %>
    'License'     => '<%= license %>'
);
