<% if (addon) { %>/*!
 * <%= addon.name %><% if (addon.desc) { %> - <%= addon.desc %><% } %>
 *
 * @author    <%= addon.author.name %><% if (addon.author.email) { %> <<%= addon.author.email %>><% } %>
 * @copyright <%= year %> (c) <%= addon.author.name %>
 * @license   <%= addon.license %>
 */<% } %>
