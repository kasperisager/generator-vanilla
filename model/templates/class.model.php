<?php if (!defined('APPLICATION')) exit;

/**
 * <%= name %> Model<% if (addon) { %>
 *
 * @author    <%= addon.author.name %><% if (addon.author.email) { %> <<%= addon.author.email %>><% } %>
 * @copyright <%= year %> (c) <%= addon.author.name %>
 * @license   <%= addon.license %>
 * @since     <%= addon.version %><% } %>
 */
class <%= _(name).classify() %>Model extends Gdn_Model {
}
